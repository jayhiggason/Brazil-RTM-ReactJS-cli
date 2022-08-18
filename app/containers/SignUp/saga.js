import {call, put, select, takeLatest} from 'redux-saga/effects';
import {ADD_NEW_ORG, FETCH_APPROVER, FETCH_ORG_LIST, SUBMIT_USER_ACCESS_REQUEST} from "./constants";
import {
    addNewOrg, fetchApprover, fetchApproverfail, fetchApproverSuccess,
    fetchOrgList,
    fetchOrgListFail,
    fetchOrgListSuccess,
    showSignUpAlert,
    submitUserAccessRequest
} from "./actions";
import url from "../../config.json";
import makeSelectSignUp, {makeSelectSignUpUserInfo} from "./selectors";
import request from "../../utils/request";
import {getToken} from "../../adalConfig";
import {tokenExpired} from "../../utils/cookieUtilities";
import jwtDecode from "jwt-decode";
import {dataExceptionHandlingDialog} from "../App/actions";
import {decodeResponse, encodeRequestBody} from "../../utils/jwtUtils";
import messages from "./messages";
import {FormattedMessage} from "react-intl";
import React from "react";
import {makeSelectLocale} from "../LanguageProvider/selectors";

const {rtmUrl, logicAppUrl} = url;
let submitUserAccessRequestApiCallCount = 0;
let fetchApproverAPICallCount = 0;
let fetchOrgListAPICallCount = 0;
let addNewOrgAPICallCount = 0;
const apiTryLimit = 5;

// Individual exports for testing
export default function* signUpSaga() {
    yield takeLatest(SUBMIT_USER_ACCESS_REQUEST, submitUserAccessRequestSaga);
    yield takeLatest(FETCH_ORG_LIST, fetchOrgListSaga);
    yield takeLatest(ADD_NEW_ORG, addNewOrgSaga);
    yield takeLatest(FETCH_APPROVER, fetchApproverSaga);
}

export function* submitUserAccessRequestSaga() {
    const apiUrl = rtmUrl + "/request_access/";
    const userInfo = yield select(makeSelectSignUpUserInfo());
    const ssoToken = getToken();
    const decryptedSSOToken = jwtDecode(ssoToken);
    const locale = yield select(makeSelectLocale());
const body =encodeRequestBody({...userInfo, locale:locale});
    try {

        let data = yield call(request, apiUrl,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${ssoToken}`
                },
                body: JSON.stringify(body)
            });
        data = decodeResponse(data);
        let alert = {};
        if (data["message"] === "Request raised, waiting for approval" || data["message"] === "Pedido levantado, aguardando aprovação" || data["message"] === "Solicitação enviada, aguardando aprovação") {
            alert = Object.assign(alert, {
                open: true,
                severity: "success",
                message: data["message"]
            });
            try {
                let logicAppBody = {
                    "userName":decryptedSSOToken['name'],
                    "userMail":decryptedSSOToken['unique_name'],
                    "organisation":userInfo['organization'],
                    "approver":userInfo['approver_name'],
                    "approverMail":userInfo['approved_by']
                };
                const mail = yield call(request, logicAppUrl,
                    {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(logicAppBody)
                    });
            } catch (e) {
                console.log(e);
            }
        } else {
            alert = Object.assign(alert, {
                open: true,
                severity: "error",
                message: data["message"]
            });
        }
        yield put(showSignUpAlert(alert));
    } catch (e) {
        submitUserAccessRequestApiCallCount++;
        if (submitUserAccessRequestApiCallCount < apiTryLimit) {
            yield put(submitUserAccessRequest(userInfo));
        } else {
            submitUserAccessRequestApiCallCount = 0;
            yield put(showSignUpAlert({
                open: true,
                severity: "error",
                message: <FormattedMessage {...messages[`requestFailed`]} />
            }));
        }
    }
}


export function* fetchOrgListSaga() {
    const userInfo = yield select(makeSelectSignUpUserInfo());
    const apiUrl = rtmUrl + "/rtm_get_org/";
    const ssoToken = getToken();
    const body =encodeRequestBody(userInfo);
    try {
        let data = yield call(request, apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${ssoToken}`
            },
            body: JSON.stringify(body)
        });
        data = decodeResponse(data);
        yield put(fetchOrgListSuccess(data))
    } catch (e) {
        fetchOrgListAPICallCount++;
        if (fetchOrgListAPICallCount > apiTryLimit) {
            fetchOrgListAPICallCount = 0;
            yield put(fetchOrgListFail());
        } else {
            yield put(fetchOrgList());
        }
    }
}

export function* addNewOrgSaga() {
    const state = yield select(makeSelectSignUp());
    const org = state['newOrg'];
    const apiUrl = rtmUrl + "/rtm_update_org/";
    const ssoToken = getToken();
    const body = encodeRequestBody({orgName: org});
    try {
        let data = yield call(request, apiUrl,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${ssoToken}`
                },
                body: JSON.stringify(body)
            });
        data = decodeResponse(data);
        if (data['status'].trim() === 'Inserted successfully') {
            yield put(fetchOrgList());
            yield put(showSignUpAlert({
                open: true,
                severity: "success",
                message: <FormattedMessage {...messages[`inserted`]} />
            }));
        } else {
            yield put(showSignUpAlert({
                open: true,
                severity: "error",
                message:  <FormattedMessage {...messages[`orgNotCreated`]} />
            }));
        }
    } catch (e) {

        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && e.response.status === 580) {
            yield put(dataExceptionHandlingDialog());
        }

        addNewOrgAPICallCount++;
        if (addNewOrgAPICallCount > apiTryLimit) {
            addNewOrgAPICallCount = 0;
        } else {
            yield put(addNewOrg(org))
        }
    }
}

export function* fetchApproverSaga() {
    const userInfo = yield select(makeSelectSignUpUserInfo());
    const apiUrl = rtmUrl + "/get_super_user/";
    const ssoToken = getToken();
    const body = encodeRequestBody(userInfo);
    try {
        let data = yield call(request, apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${ssoToken}`
            },
            body: JSON.stringify(body)
        });
        data = decodeResponse(data);
        yield put(fetchApproverSuccess(data))
    } catch (e) {
        fetchApproverAPICallCount++;
        if (fetchApproverAPICallCount > apiTryLimit) {
            fetchApproverAPICallCount = 0;
            yield put(fetchApproverfail());
        } else {
            yield put(fetchApprover());
        }
    }
}
