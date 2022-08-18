import {call, put, takeLatest} from 'redux-saga/effects';
import {FETCH_PINNED_VIEWS} from "./constants";
import {getCookie, tokenExpired} from "../../utils/cookieUtilities";
import {rtmUrl} from "../../config.json";
import request from "../../utils/request";
import {fetchPinnedViews, fetchPinnedViewsFail, fetchPinnedViewsSuccess} from "./actions";
import {dataExceptionHandlingDialog} from "../App/actions";
import {decodeResponse, encodeRequestBody} from "../../utils/jwtUtils";

let fetchPinnedViewsApiCallCount = 0;
const apiRetryLimit = 5;

// Individual exports for testing
export default function* myPinnedViewsSaga() {
    yield takeLatest(FETCH_PINNED_VIEWS, fetchPinnedViewsSaga)

}

export function* fetchPinnedViewsSaga() {
    try {
        let User = JSON.parse(getCookie("UserCred"));
        const token = JSON.parse(getCookie("token"));
        const apiUrl = rtmUrl + "/populate_my_page/";
        const body = encodeRequestBody({
            user: User['userID'],
            user_role: User['role'],
        });
        let data = yield call(request, apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        data = decodeResponse(data);
        yield put(fetchPinnedViewsSuccess(data));

    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        fetchPinnedViewsApiCallCount++;
        if (fetchPinnedViewsApiCallCount > apiRetryLimit) {
            fetchPinnedViewsApiCallCount = 0;
            yield put(fetchPinnedViewsFail());
        } else {
            yield put(fetchPinnedViews());
        }

    }
}
