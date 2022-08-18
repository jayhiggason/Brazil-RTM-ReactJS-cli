import {call, put, select, takeLatest} from 'redux-saga/effects';
import {ADMIN_GET_REQUESTED_USERS_FETCH, ADMIN_PAGE_HANDLE_REQUEST} from "./constants";
import {getCookie, tokenExpired} from "../../../utils/cookieUtilities";
import url from "../../../config.json";
import request from "../../../utils/request";
import {
    adminGetRequestedUsersFetch,
    adminGetRequestedUsersFetchFail,
    adminGetRequestedUsersFetchSuccess,
    adminHandleRequest
} from "./actions";
import {makeSelectAdminPageCurrentTab, makeSelectAdminPageUserDataTobeModified} from "./selectors";
import {getToken} from "../../../adalConfig";
import jwtDecode from "jwt-decode";
import {dataExceptionHandlingDialog, showAppAlert} from "../../App/actions";
import {decodeResponse, encodeRequestBody} from "../../../utils/jwtUtils";

const {rtmUrl} = url;

let adminGetRequestedUsersFetchApiCallCount = 0;
let adminHandleRequestApiCallCount = 0;

// Individual exports for testing
export default function* adminPageSaga() {
    // See example in containers/LandingModule/saga.js
    yield takeLatest(ADMIN_GET_REQUESTED_USERS_FETCH, adminGetRequestedUsersFetchSaga);
    yield takeLatest(ADMIN_PAGE_HANDLE_REQUEST, adminHandleRequestSaga)
}

export function* adminGetRequestedUsersFetchSaga() {
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const apiUrl = rtmUrl + "/rtm_get_request_table/";
    const tab = yield select(makeSelectAdminPageCurrentTab());
    const ssoToken = getToken();
    const decryptedSSOToken = jwtDecode(ssoToken);
    const body = encodeRequestBody({
        user: User.userID,
        user_role: User.role,
        status: tab,
        email: decryptedSSOToken["unique_name"]
    });
    try {
        let data = yield call(request, apiUrl,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });
        data = decodeResponse(data);
        yield put(adminGetRequestedUsersFetchSuccess(data["user_table"]))
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        adminGetRequestedUsersFetchApiCallCount++;
        if (adminGetRequestedUsersFetchApiCallCount < 5) {
            yield put(adminGetRequestedUsersFetch())
        } else {
            adminGetRequestedUsersFetchApiCallCount = 0;
            yield put(adminGetRequestedUsersFetchFail())
        }
    }
}

export function* adminHandleRequestSaga() {
    const apiUrl = rtmUrl + "/rtm_assign_user_roles/";
    const token = JSON.parse(getCookie("token"));
    let user = JSON.parse(getCookie("UserCred"));
    let userInfo = yield select(makeSelectAdminPageUserDataTobeModified());
    userInfo = encodeRequestBody({...userInfo, user_role: user.role});
    try {
        let data = yield call(request, apiUrl,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(userInfo)
            });
        data = decodeResponse(data);
        let alert = {
            open: true,
            severity: "success",
            message: data["status"]
        };
        yield put(showAppAlert(alert));
        yield put(adminGetRequestedUsersFetch());
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        adminHandleRequestApiCallCount++;
        if (adminHandleRequestApiCallCount < 5) {
            yield put(adminHandleRequest(userInfo));
        } else {
            adminHandleRequestApiCallCount = 0;
            let alert = {
                open: true,
                severity: "error",
                message: "something went wrong"
            };
            yield put(showAppAlert(alert));
        }
    }
}
