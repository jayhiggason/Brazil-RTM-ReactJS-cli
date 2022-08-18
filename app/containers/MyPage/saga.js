import {call, put, select, takeLatest} from 'redux-saga/effects';
import {FETCH_MY_PAGE_PINNED_VIEW, REMOVE_PINNED_VIEW} from "./constants";
import {getCookie, tokenExpired} from "../../utils/cookieUtilities";
import {rtmUrl} from "../../config.json";
import request from "../../utils/request";
import {
    fetchMyPagePinnedView,
    fetchMyPagePinnedViewFail,
    fetchMyPagePinnedViewSuccess,
    removePinnedView
} from "./actions";
import makeSelectMyPage from "./selectors";
import {dataExceptionHandlingDialog, showAppAlert} from "../App/actions";
import {decodeResponse, encodeRequestBody} from "../../utils/jwtUtils";
import AppMessages from "../App/messages";
import {FormattedMessage} from "react-intl";
import React from "react";
const retryLimit = 5;
let fetchMyPagePinnedViewApiCallCount = 0;
let removePinApiCallCount = 0;

export function* fetchMyPagePinnedViewSaga() {
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const apiUrl = rtmUrl + "/my_page_view/";
    const body = encodeRequestBody({
        user: User['userID'],
        user_role: User['role']
    });
    try {
        let data = yield call(request, apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        data = decodeResponse(data);
        yield put(fetchMyPagePinnedViewSuccess(data))
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (fetchMyPagePinnedViewApiCallCount > retryLimit) {
            fetchMyPagePinnedViewApiCallCount = 0;
            yield put(fetchMyPagePinnedViewFail())
        } else {
            fetchMyPagePinnedViewApiCallCount++;
            yield put(fetchMyPagePinnedView())
        }
    }

}

export function* removePinnedViewSaga() {
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    let params = yield select(makeSelectMyPage());
    const apiUrl = rtmUrl + "/del_pin/";
    const body = encodeRequestBody({
        user: User['userID'],
        user_role: User['role'],
        ...params['removePinnedViewParams']
    });
    try {
        let data = yield call(request, apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        data = decodeResponse(data);
        if (data['status'] === 200) {
            yield put(showAppAlert({
                open: true,
                severity: "success",
                message: <FormattedMessage {...AppMessages[`removedSuccess`]} />
            }));
            yield put(fetchMyPagePinnedView());
        } else {
            yield put(showAppAlert({
                open: true,
                severity: "error",
                message: <FormattedMessage {...AppMessages[`removedNot`]} />
            }));
        }


    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (removePinApiCallCount > retryLimit) {
            fetchMyPagePinnedViewApiCallCount = 0;
            yield put(showAppAlert({
                open: true,
                severity: "error",
                message: <FormattedMessage {...AppMessages[`removedNot`]} />
            }));
        } else {
            fetchMyPagePinnedViewApiCallCount++;
            yield put(removePinnedView(params['removePinnedViewParams']))
        }
    }

}

export default function* myPageSaga() {
    yield takeLatest(FETCH_MY_PAGE_PINNED_VIEW, fetchMyPagePinnedViewSaga);
    yield takeLatest(REMOVE_PINNED_VIEW, removePinnedViewSaga)
}
