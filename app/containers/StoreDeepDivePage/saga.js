// import { take, call, put, select } from 'redux-saga/effects';


import {makeSelectSelectedFilters} from "../App/selectors";
import {getTimeRangeFilterData} from "../../utils/utility";
import {getCookie, tokenExpired} from "../../utils/cookieUtilities";
import {rtmUrl} from "../../config.json";
import request from "../../utils/request";
import {
    paretoAnalysisFail,
    paretoAnalysisFetch,
    paretoAnalysisSuccess,
    productAnalysisFail,
    productAnalysisFetch,
    productAnalysisSuccess,
    productDistributionFail,
    productDistributionFetch,
    productDistributionSuccess,
    purchaseAnalysisBestMixFail,
    purchaseAnalysisBestMixFetch,
    purchaseAnalysisBestMixSuccess,
    purchaseAnalysisFail,
    purchaseAnalysisFetch,
    purchaseAnalysisSuccess,
    salesPerformanceFail,
    salesPerformanceFetch,
    salesPerformanceSuccess
} from "./actions";
import {call, put, select, takeLatest} from "redux-saga/effects";
import {
    PARETO_ANALYSIS_FETCH,
    PRODUCT_ANALYSIS_FETCH,
    PRODUCT_DISTRIBUTION_FETCH, PURCHASE_ANALYSIS_BEST_MIX_FETCH,
    PURCHASE_ANALYSIS_FETCH,
    SALES_PERFORMANCE_FETCH
} from "./constants";

import {
    makeSelectParetoAnalysisFilter,
    makeSelectProductAnalysisButton, makeSelectProductAnalysisKpiButton,
    makeSelectProductDistributionButton, makeSelectPurchaseAnalysisButton,
    makeSelectSalesPerformanceButton,
    makeSelectStoreProductTopFilter
} from "./selectors";
import {dataExceptionHandlingDialog} from "../App/actions";
import {decodeResponse, encodeRequestBody} from "../../utils/jwtUtils";
import {makeSelectLocale} from "../LanguageProvider/selectors";

let salesPerfCount = 0;
let purchaseCount = 0;
let paretoCount = 0;
let productCount = 0;
let proDistributionCount = 0;
let purchaseMixCount =0;
const apiTryLimit = 2;

//sales performance saga
export function* salesPerformanceSaga() {
    let selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let storeSelected = selectedFilters['store'].map(item => item.value);
    let selectedButton = yield select(makeSelectSalesPerformanceButton());
    let store = [...new Set([...storeSelected])];
    const locale = yield select(makeSelectLocale());
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        user: User['userID'],
        user_role: User['role'],
        selectionButtons: selectedButton,
        locale:locale
    });
    const apiUrl = rtmUrl + "/get_sales_performance/";
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
            yield put(salesPerformanceSuccess(data));
        } else {
            yield put(salesPerformanceFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (salesPerfCount <= apiTryLimit) {
            salesPerfCount++;
            yield put(salesPerformanceFetch())
        } else {
            salesPerfCount = 0;
            yield put(salesPerformanceFail())
        }
    }
}

//purchase analysis saga
export function* purchaseAnalysisSaga() {
    let selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let storeSelected = selectedFilters['store'].map(item => item.value);
    let store = [...new Set([...storeSelected])];
    let selectedPurchaseButton = yield select(makeSelectPurchaseAnalysisButton());
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        user: User['userID'],
        user_role: User['role'],
        selectionButtons: selectedPurchaseButton
    });
    const apiUrl = rtmUrl + "/get_store_purchase_analysis/";
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
            yield put(purchaseAnalysisSuccess(data));
        } else {
            yield put(purchaseAnalysisFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (purchaseCount <= apiTryLimit) {
            purchaseCount++;
            yield put(purchaseAnalysisFetch())
        } else {
            yield put(purchaseAnalysisFail())
        }
    }
}

//purchase analysis best product mix saga
export function* purchaseAnalysisBestMixSaga() {
    let selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let storeSelected = selectedFilters['store'].map(item => item.value);
    let selectedPurchaseButton = yield select(makeSelectPurchaseAnalysisButton());
    let store = [...new Set([...storeSelected])];
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        user: User['userID'],
        user_role: User['role'],
        selectionButtons: selectedPurchaseButton
    });
    const apiUrl = rtmUrl + "/get_best_product_mix/";
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
            yield put(purchaseAnalysisBestMixSuccess(data));
        } else {
            yield put(purchaseAnalysisBestMixFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (purchaseMixCount <= apiTryLimit) {
            purchaseMixCount++;
            yield put(purchaseAnalysisBestMixFetch())
        } else {
            yield put(purchaseAnalysisBestMixFail())
        }
    }
}

//pareto analysis saga
export function* paretoAnalysisSaga() {
    const selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let storeSelected = selectedFilters['store'].map(item => item.value);
    let store = [...new Set([...storeSelected])];
    const selectedParetoFilter = yield select(makeSelectParetoAnalysisFilter());
    const locale = yield select(makeSelectLocale());
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const body = encodeRequestBody({
        ...selectedFilters,
        user: User['userID'],
        user_role: User['role'],
        timeRange: TimeRange,
        store: store,
        selectionButtons: selectedParetoFilter,
        locale:locale
    });
    const apiUrl = rtmUrl + "/get_pareto_performance/";
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
            yield put(paretoAnalysisSuccess(data));
        } else {
            yield put(paretoAnalysisFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (paretoCount <= apiTryLimit) {
            paretoCount++;
            yield put(paretoAnalysisFetch())
        } else {
            paretoCount = 0;
            yield put(paretoAnalysisFail())
        }
        console.log(e);
    }
}

//product analysis saga
export function* productAnalysisSaga() {
    let selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let storeSelected = selectedFilters['store'].map(item => item.value);
    let store = [...new Set([...storeSelected])];
    const selectedProductAnalysisButton = yield select(makeSelectProductAnalysisButton());
    const selectedProductAnalysisKpiButton = yield select(makeSelectProductAnalysisKpiButton());
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        user: User['userID'],
        user_role: User['role'],
        topFilter: selectedProductAnalysisButton,
        selectionButtons:selectedProductAnalysisKpiButton

    });
    const apiUrl = rtmUrl + "/get_product_analysis/";
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
            yield put(productAnalysisSuccess(data));
        } else {
            yield put(productAnalysisFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (productCount <= apiTryLimit) {
            productCount++;
            yield put(productAnalysisFetch())
        } else {
            productCount = 0;
            yield put(productAnalysisFail())
        }
        console.log(e);
    }
}

//product distribution saga
export function* productDistributionSaga() {
    let selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let storeSelected = selectedFilters['store'].map(item => item.value);
    let store = [...new Set([...storeSelected])];
    const selectedProductDistributionButton = yield select(makeSelectProductDistributionButton());
    const selectedTopFilter = yield select(makeSelectStoreProductTopFilter());
    const locale = yield select(makeSelectLocale());
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        user: User['userID'],
        user_role: User['role'],
        selectionButtons: selectedProductDistributionButton,
        topFilter: selectedTopFilter,
        locale:locale

    });
    const apiUrl = rtmUrl + "/get_store_product_distribution/";
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
            yield put(productDistributionSuccess(data));
        } else {
            yield put(productDistributionFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (proDistributionCount <= apiTryLimit) {
            proDistributionCount++;
            yield put(productDistributionFetch())
        } else {
            proDistributionCount = 0;
            yield put(productDistributionFail())
        }
        console.log(e);
    }
}

// Individual exports for testing
export default function* storeDeepDivePageSaga() {
    yield takeLatest(SALES_PERFORMANCE_FETCH, salesPerformanceSaga);
    yield takeLatest(PURCHASE_ANALYSIS_FETCH, purchaseAnalysisSaga);
    yield takeLatest(PURCHASE_ANALYSIS_BEST_MIX_FETCH, purchaseAnalysisBestMixSaga);
    yield takeLatest(PARETO_ANALYSIS_FETCH, paretoAnalysisSaga);
    yield takeLatest(PRODUCT_ANALYSIS_FETCH, productAnalysisSaga);
    yield takeLatest(PRODUCT_DISTRIBUTION_FETCH, productDistributionSaga);
}
