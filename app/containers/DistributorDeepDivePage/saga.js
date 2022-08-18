// import { take, call, put, select } from 'redux-saga/effects';


import {makeSelectSelectedFilters} from "../App/selectors";

import {rtmUrl} from "../../config.json";
import request from "../../utils/request";
import {getCookie, tokenExpired} from "../../utils/cookieUtilities";
import {call, put, select, takeLatest} from "redux-saga/effects";
import makeSelectDistributorDeepDivePage, {
    makeSelectChannelFilter,
    makeSelectChannelName,
    makeSelectChannelPerformanceButton,
    makeSelectDistributorSalesPerformanceKpiButton,
    makeSelectDistributorSalesPerformanceVsButton,
    makeSelectProductPerformanceButton,
    makeSelectStoreFilter,
    makeSelectStorePerformanceButton,
    makeSelectStoreTableButton, makeSelectVisitSalesBubbleFilter
} from "./selectors";
import {
    channelPerformanceFail,
    channelPerformanceFetch,
    channelPerformanceSuccess,
    distributorCardsFail,
    distributorCardsFetch,
    distributorCardsSuccess,
    distributorSalesPerformanceFail,
    distributorSalesPerformanceFetch,
    distributorSalesPerformanceSuccess,
    productPerformanceFail,
    productPerformanceFetch,
    productPerformanceSuccess,
    storePerformanceFail,
    storePerformanceFetch,
    storePerformanceSuccess,
    storeTableFail,
    storeTableFetch,
    storeTableSuccess,
    toggleCard,
    visitSalesBubbleFail,
    visitSalesBubbleFetch,
    visitSalesBubbleSuccess
} from "./actions";

import {
    CHANNEL_PERFORMANCE_FETCH,
    DISTRIBUTOR_CARDS_DATA_FETCH,
    DISTRIBUTOR_SALES_PERFORMANCE_FETCH,
    PRODUCT_PERFORMANCE_FETCH,
    STORE_PERFORMANCE_FETCH,
    STORE_TABLE_FETCH,
    VISIT_SALES_BUBBLE_FETCH
} from "./constants";
import {getTimeRangeFilterData} from "../../utils/utility";
import {dataExceptionHandlingDialog} from "../App/actions";
import {decodeResponse, encodeRequestBody} from "../../utils/jwtUtils";
import {makeSelectLocale} from "../LanguageProvider/selectors";


const apiTryLimit = 2;
let brandTrendCount = 0;
let cardsDataCount = 0;
let visitBubbleCount = 0;
let storeTableCount = 0;

//distributor cards saga
export function* distributorCardsDataSaga() {
    const distSelector = yield select(makeSelectDistributorDeepDivePage());
    const selectedFilters = yield select(makeSelectSelectedFilters());
    let store = selectedFilters['store'].map(item => item.value);
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    const view = "distributor_deep_dive";
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const apiUrl = rtmUrl + "/get_distributor_cards/";
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        user: User['userID'],
        user_role: User['role'],
        view: view,
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
            yield put(distributorCardsSuccess(data));
            yield put(toggleCard(
                {
                    eos: distSelector['cardToggleState']['eos'],
                    invoice: distSelector['cardToggleState']['invoice']
                }
            ))
        } else {
            yield put(distributorCardsFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (cardsDataCount <= apiTryLimit) {
            cardsDataCount++;
            yield put(distributorCardsFetch())
        } else {
            yield put(distributorCardsFail())
        }
        console.log(e);
    }
}

//visit vs sales bubble chart

export function* visitSalesBubbleSaga() {
    const selectedFilters = yield select(makeSelectSelectedFilters());
    let store = selectedFilters['store'].map(item => item.value);
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    const selectedVisitFilter = yield select(makeSelectVisitSalesBubbleFilter());
    const apiUrl = rtmUrl + "/get_visit_vs_sales/";
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const locale = yield select(makeSelectLocale());
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        user: User['userID'],
        user_role: User['role'],
        selectionButtons:selectedVisitFilter,
        locale:locale
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
            yield put(visitSalesBubbleSuccess(data));
        } else {
            yield put(visitSalesBubbleFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (visitBubbleCount <= apiTryLimit) {
            visitBubbleCount++;
            yield put(visitSalesBubbleFetch())
        } else {
            yield put(visitSalesBubbleFail())
        }
        console.log(e);
    }
}

//distributor sales performance graph saga

export function* distributorSalesPerformanceSaga() {
    const selectedFilters = yield select(makeSelectSelectedFilters());
    const selectedVSButton = yield select(makeSelectDistributorSalesPerformanceVsButton());
    const selectedKpiButton = yield select(makeSelectDistributorSalesPerformanceKpiButton());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let store = selectedFilters['store'].map(item => item.value);
    let User = JSON.parse(getCookie("UserCred"));
    const locale = yield select(makeSelectLocale());
    const token = JSON.parse(getCookie("token"));
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        user: User['userID'],
        user_role: User['role'],
        selectionButtons: selectedVSButton,
        kpiButtons: selectedKpiButton,
        locale:locale
    });
    const apiUrl = rtmUrl + "/get_distributor_performance/";
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
            yield put(distributorSalesPerformanceSuccess(data));
        } else {
            yield put(distributorSalesPerformanceFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (brandTrendCount <= apiTryLimit) {
            brandTrendCount++;
            yield put(distributorSalesPerformanceFetch())
        } else {
            brandTrendCount = 0;
            yield put(distributorSalesPerformanceFail())
        }
        console.log(e);
    }
}


// product performance - pareto chart saga

export function* productPerformanceSaga() {
    const selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let store = selectedFilters['store'].map(item => item.value);
    const selectedProductPerformanceButton = yield select(makeSelectProductPerformanceButton());
    const locale = yield select(makeSelectLocale());
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const apiUrl = rtmUrl + "/get_product_performance/";
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        user: User['userID'],
        user_role: User['role'],
        selectionButtons: selectedProductPerformanceButton,
        locale:locale
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

            yield put(productPerformanceSuccess(data));
        } else {
            yield put(productPerformanceFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (brandTrendCount <= apiTryLimit) {
            brandTrendCount++;
            yield put(productPerformanceFetch())
        } else {
            brandTrendCount = 0;
            yield put(productPerformanceFail())
        }
        console.log(e);
    }
}

//channel perf saga

export function* channelPerformanceSaga() {
    const selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let store = selectedFilters['store'].map(item => item.value);
    const selectedChannelFilter = yield select(makeSelectChannelFilter());
    const selectedChannelPerformanceButton = yield select(makeSelectChannelPerformanceButton());
    const locale = yield select(makeSelectLocale());
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        user: User['userID'],
        user_role: User['role'],
        topFilter: selectedChannelFilter,
        selectionButtons:selectedChannelPerformanceButton,
        locale:locale
    });
    const apiUrl = rtmUrl + "/get_distributor_channel_performance/";
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
            yield put(channelPerformanceSuccess(data));
        } else {
            yield put(channelPerformanceFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (brandTrendCount <= apiTryLimit) {
            brandTrendCount++;
            yield put(channelPerformanceFetch())
        } else {
            brandTrendCount = 0;
            yield put(channelPerformanceFail())
        }
        console.log(e);
    }
}


//store perf saga

export function* storePerformanceSaga() {
    const selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    const selectedChannelName = yield select(makeSelectChannelName());
    const selectedStoreFilter = yield select(makeSelectStoreFilter());
    const selectedStorePerformanceButton = yield select(makeSelectStorePerformanceButton());
    const locale = yield select(makeSelectLocale());
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const apiUrl = rtmUrl + "/get_distributor_channel_store_performance/";
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        user: User['userID'],
        user_role: User['role'],
        topFilter: selectedStoreFilter,
        selectionButtons: selectedStorePerformanceButton,
        channel: [...selectedFilters['channel'], selectedChannelName],
        locale:locale
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
            yield put(storePerformanceSuccess(data));
        } else {
            yield put(storePerformanceFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (brandTrendCount <= apiTryLimit) {
            brandTrendCount++;
            yield put(storePerformanceFetch())
        } else {
            brandTrendCount = 0;
            yield put(storePerformanceFail())
        }
        console.log(e);
    }
}

//store table saga

export function* storeTableSaga() {
    const selectedFilters = yield select(makeSelectSelectedFilters());
    const selectedStoreTableButton = yield select(makeSelectStoreTableButton());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let store = selectedFilters['store'].map(item => item.value);
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const apiUrl = rtmUrl + "/get_store_performance/";
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        user: User['userID'],
        user_role: User['role'],
        selectionButtons: selectedStoreTableButton
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
            yield put(storeTableSuccess(data));
        } else {
            yield put(storeTableFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (storeTableCount <= apiTryLimit) {
            storeTableCount++;
            yield put(storeTableFetch())
        } else {
            yield put(storeTableFail())
        }
        console.log(e);
    }
}


// Individual exports for testing
export default function* distributorDeepDivePageSaga() {
    yield takeLatest(DISTRIBUTOR_CARDS_DATA_FETCH, distributorCardsDataSaga);
    yield takeLatest(VISIT_SALES_BUBBLE_FETCH, visitSalesBubbleSaga);
    yield takeLatest(DISTRIBUTOR_SALES_PERFORMANCE_FETCH, distributorSalesPerformanceSaga);
    yield takeLatest(PRODUCT_PERFORMANCE_FETCH, productPerformanceSaga);
    yield takeLatest(CHANNEL_PERFORMANCE_FETCH, channelPerformanceSaga);
    yield takeLatest(STORE_PERFORMANCE_FETCH, storePerformanceSaga);
    yield takeLatest(STORE_TABLE_FETCH, storeTableSaga);

}
