import {call, put, select, takeLatest} from 'redux-saga/effects';
import {FILTER_DATA_FETCH, PIN_MY_PAGE, PIN_MY_VIEW_CONFIRM, STORE_FILTER_DATA_FETCH, UNPIN_MY_VIEW} from "./constants";
import {rtmUrl} from "../../config.json";
import {
    makeSelectFilterDataPayLoad,
    makeSelectPinMyPageParams,
    makeSelectPinMyViewParams,
    makeSelectPinMyViewPinName,
    makeSelectSelectedFilters
} from "./selectors";
import {getTimeRangeFilterData} from "../../utils/utility";
import request from "../../utils/request";
import {
    dataExceptionHandlingDialog,
    filterDataFail,
    filterDataFetch,
    filterDataSuccess,
    pinMyPage,
    pinMyView,
    showAppAlert,
    storeFilterDataFailed,
    storeFilterDataFetch,
    storeFilterDataSuccess,
    unpinMyView
} from "./actions";
import {getCookie, tokenExpired} from "../../utils/cookieUtilities";
import {fetchPinnedViews} from "../MyPinnedViews/actions";
import {decodeResponse, encodeRequestBody} from "../../utils/jwtUtils";
import AppMessages from "./messages";
import {FormattedMessage} from "react-intl";
import React from "react";
import {makeSelectLocale} from "../LanguageProvider/selectors";

// rtm filters
let filtersCount = 0;
let storeFiltersCount = 0;
let apiTryLimit = 5;

export default function* mainAppSaga() {
    yield takeLatest(FILTER_DATA_FETCH, filterDataSaga);
    yield takeLatest(STORE_FILTER_DATA_FETCH, storeFilterDataSaga);
    yield takeLatest(PIN_MY_PAGE, pinMyPageSaga);
    yield takeLatest(PIN_MY_VIEW_CONFIRM, pinMyViewSaga);
    yield takeLatest(UNPIN_MY_VIEW, unpinMyViewSaga);

}

//  rtm filters

export function* filterDataSaga() {
    const apiUrl = rtmUrl + "/get_filters/";
    const FilterDataPayLoad = yield select(makeSelectFilterDataPayLoad());
    // const selectedFilters = yield select(makeSelectSelectedFilters());
    let store = FilterDataPayLoad['store'].map(item => item.value);
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const body = encodeRequestBody({
        user: User['userID'],
        user_role: User['role'],
        ...FilterDataPayLoad,
        store: store
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
        if (data !== null || data !== {}) {
            yield put(filterDataSuccess({
                "chain": data['Chain'],
                "manager": data['Manager'],
                "coordinator": data['Coordinator'],
                "timeRange": data['TimeRange'],
                "brand": data['Brand'],
                "category": data['Category'],
                "distributor": data['Distributor'],
                "technology": data['Technology'],
                "channel": data['Channel'],
                "region": data['Region'],
                "store": [],
                "customer": [],
                "gp": data['GP'],
                "salesRep": data['SalesRep'],
                "compare": []
            }));
        } else {
            yield put(filterDataFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (filtersCount <= apiTryLimit) {
            filtersCount++;
            yield put(filterDataFetch())
        } else {
            yield put(filterDataFail())
        }
        console.log(e);
    }
}

//rtm store filter
export function* storeFilterDataSaga() {
    const apiUrl = rtmUrl + "/";
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const body = encodeRequestBody({
        user: User['userID'], user_role: User['role'],
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
        if (data !== null || data !== {}) {
            yield put(storeFilterDataSuccess());
        } else {
            yield put(storeFilterDataFailed())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (storeFiltersCount <= apiTryLimit) {
            storeFiltersCount++;
            yield put(storeFilterDataFetch())
        } else {
            yield put(storeFilterDataFailed())
        }
        console.log(e);
    }
}

let pinMyPageApiCallCount = 0;

export function* pinMyPageSaga() {
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const apiUrl = rtmUrl + "/pin_the_view/";
    const params = yield select(makeSelectPinMyPageParams());
    const selectedFilters = yield select(makeSelectSelectedFilters());
    let filters = JSON.stringify(selectedFilters);
    const body = encodeRequestBody({
        user: User['userID'],
        user_role: User['role'],
        ...params,
        filters: filters
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
                message: <FormattedMessage {...AppMessages[`bookMarkSuccess`]} />
            }));
        } else {
            if (data['msg'] === "Duplicate name") {
                yield put(showAppAlert({
                    open: true,
                    severity: "error",
                    message: <FormattedMessage {...AppMessages[`bookMarkNameExist`]} />
                }));
            } else {
                yield put(showAppAlert({
                    open: true,
                    severity: "error",
                    message: <FormattedMessage {...AppMessages[`bookMarkNot`]} />
                }));
            }
        }

    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (pinMyPageApiCallCount > apiTryLimit) {
            pinMyPageApiCallCount = 0;
            yield put(showAppAlert({
                open: true,
                severity: "error",
                message: <FormattedMessage {...AppMessages[`bookMarkNot`]} />
            }));
        } else {
            pinMyPageApiCallCount++;
            yield put(pinMyPage(params));
        }
    }

}

let pinMyViewApiCallCount = 0;

export function* pinMyViewSaga() {
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const apiUrl = rtmUrl + "/pin_all_views/";
    const params = yield select(makeSelectPinMyViewParams());
    const pinName = yield select(makeSelectPinMyViewPinName());
    const selectedFilters = yield select(makeSelectSelectedFilters());
    const locale = yield select(makeSelectLocale());
    let store = selectedFilters['store'].map(item => item.value);
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    const body = encodeRequestBody({
        user: User['userID'],
        ...params,
        filters: JSON.stringify({
            ...selectedFilters,
            timeRange: TimeRange,
            store: store,
            user: User['userID'],
            user_role: User['role'],
            locale:locale,
            ...params['filters'],

        }),
        pinName: pinName,

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
                // message: "Successfully pinned the View"
                message: <FormattedMessage {...AppMessages[`pinSuccess`]} />
            }));
            yield put(fetchPinnedViews());
        } else {
            yield put(showAppAlert({
                open: true,
                severity: "error",
                message: <FormattedMessage {...AppMessages[`pinNot`]} />
            }));
        }

    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (pinMyViewApiCallCount > apiTryLimit) {
            pinMyViewApiCallCount = 0;
            yield put(showAppAlert({
                open: true,
                severity: "error",
                message: <FormattedMessage {...AppMessages[`pinNot`]} />
            }));
        } else {
            pinMyViewApiCallCount++;
            yield put(pinMyView(params));
        }
    }

}

let unpinMyViewApiCallCount = 0;

export function* unpinMyViewSaga() {
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const apiUrl = rtmUrl + "/delete_pinned_views/";
    const params = yield select(makeSelectPinMyViewParams());
    // const selectedFilters = yield select(makeSelectSelectedFilters());
    // let filters = JSON.stringify(selectedFilters);
    const body =  encodeRequestBody({
        user: User['userID'],
        user_role: User['role'],
        ...params,
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
                message: <FormattedMessage {...AppMessages[`unPinSuccess`]} />
            }));
            yield put(fetchPinnedViews());
        } else {

            yield put(showAppAlert({
                open: true,
                severity: "error",
                message: <FormattedMessage {...AppMessages[`unPinNot`]} />
            }));
        }

    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        unpinMyViewApiCallCount++;
        if (unpinMyViewApiCallCount > apiTryLimit) {
            unpinMyViewApiCallCount = 0;
            yield put(showAppAlert({
                open: true,
                severity: "error",
                message: <FormattedMessage {...AppMessages[`unPinNot`]} />
            }));
        } else {

            yield put(unpinMyView(params));
        }
    }

}
