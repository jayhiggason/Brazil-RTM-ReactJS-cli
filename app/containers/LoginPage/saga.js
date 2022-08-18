import {call, put, takeLatest} from 'redux-saga/effects';
import {LOGIN_USER} from "./constants";
import {loginUser, loginUserFail, loginUserSuccess} from './actions'
import history from "../../utils/history";
import {getToken} from '../../adalConfig';
import {rtmUrl} from '../../config.json'
import request from "../../utils/request";
import {tokenExpired} from "../../utils/cookieUtilities";
import {dataExceptionHandlingDialog} from "../App/actions";
import {decodeResponse, encodeRequestBody} from "../../utils/jwtUtils";
import React from "react";

let loginUserApiCallCount = 0;

export function* loginUserSaga() {
    const aPIUrl = `${rtmUrl}/get_user_role/`;
    const ssoToken = getToken();
    const body = encodeRequestBody({token: ssoToken});
    // const decryptedSSOToken = jwtDecode(ssoToken);
    try {
        let data = yield call(request, aPIUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${ssoToken}`
            },
            body: JSON.stringify(body),
        });
        data = decodeResponse(data);
        switch (data["status"]) {
            case 0:
                yield put(loginUserFail(`requestPending`, 0));
                break;
            case 1:
                yield put(loginUserSuccess({
                    token: ssoToken,
                    // userId: `${decryptedSSOToken['given_name'].toLowerCase()}.${decryptedSSOToken['family_name'].toLowerCase()}`,
                    userId: data["email"].split('@')[0],
                    role: data["role"].trim(),
                    name: data["username"].trim(),
                    id: data["email"].trim(),
                    organisation: data["organisation"]
                }));
                if (data.organisation === "MARS") {
                    history.push("/RTM/PerformanceSummary");
                } else {
                    history.push("/RTM/POCView");
                }
                break;
            case -1:
                yield put(loginUserFail(`clickSubscribe`, -1));
                break;
        }


        // yield put(loginUserSuccess({
        //         token: ssoToken,
        //         userId: `${decryptedSSOToken['given_name'].toLowerCase()}.${decryptedSSOToken['family_name'].toLowerCase()}`,
        //         role: "super_user".trim(),
        //         name: decryptedSSOToken["name"].split("(")[0],
        //         id: decryptedSSOToken["upn"],
        //     }
        // ));
        // history.push("/RTM/PerformanceSummary");

    } catch
        (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && e.response.status === 580) {
            yield put(dataExceptionHandlingDialog());
        }

        loginUserApiCallCount++;
        if (loginUserApiCallCount < 5) {
            yield put(loginUser())
        } else {
            loginUserApiCallCount = 0;
            yield put(loginUserFail(`wentWrong`, -2));
        }


    }
// }
}

// Individual exports for testing
export default function* loginPageSaga() {
    yield takeLatest(LOGIN_USER, loginUserSaga);
}
