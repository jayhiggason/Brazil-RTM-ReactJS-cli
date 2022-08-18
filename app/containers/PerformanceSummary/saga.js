import {call, put, select, takeLatest} from 'redux-saga/effects';

import {
    BRAND_BUBBLE_FETCH,
    CARDS_DATA_FETCH,
    DISTRIBUTOR_TABLE_FETCH,
    GUIDED_INSIGHTS_FETCH,
    SELECTED_CATEGORY,
    TRENDS_LINE_FETCH, YEAR_PERIOD_FILTER_FETCH
} from "./constants";

import {
    brandBubbleFail,
    brandBubbleFetch,
    brandBubbleSuccess,
    cardDataFail,
    cardDataFetch,
    cardDataSuccess,
    categoryFilterFail,
    categoryFilterFetch,
    categoryFilterSuccess,
    distributorTableFail,
    distributorTableFetch,
    distributorTableSuccess,
    guidedInsightsFail,
    guidedInsightsFetch,
    guidedInsightsSuccess,
    seeTrendLineFail,
    seeTrendLineFetch,
    seeTrendLineSuccess,
    toggleCard, yearPeriodFilterFail, yearPeriodFilterFetch, yearPeriodFilterSuccess
} from "./actions";

import makeSelectPerformanceSummary, {
    makeSelectBrandBubbleButtonOnChange,
    makeSelectBrandBubbleTimeFilterOnChange,
    makeSelectGuidedInsightsButton,
    makeSelectGuidedInsightsFilter,
    makeSelectGuidedInsightsToggle,
    makeSelectGuidedInsightsTypeFilter, makeSelectYearPeriodSelectedFilterData
} from "./selectors";

import {makeSelectSelectedFilters} from "../App/selectors";

import {rtmUrl} from "../../config.json";
import request from "../../utils/request";
import {getCookie, tokenExpired} from "../../utils/cookieUtilities";
import {getTimeRangeFilterData, transformTrendLine} from "../../utils/utility";
import {dataExceptionHandlingDialog} from "../App/actions";
import {decodeResponse, encodeRequestBody} from "../../utils/jwtUtils";
import {makeSelectLocale} from "../LanguageProvider/selectors";
import {
    productSkuTrendFilterFail,
    productSkuTrendFilterFetch,
    productSkuTrendFilterSuccess
} from "../BrandDeepDivePage/actions";


const apiTryLimit = 2;
let brandBubbleCount = 0;
let distributorTableCount = 0;
let cardsDataCount = 0;
// let salesCardsDataCount = 0;
let categoryFilterCount = 0;
let seeTrendLineCount = 0;
let guidedInsightsCount = 0;

// saga function for Brand insights - bubble chart

export function* brandBubbleSaga() {

    const selectedFilters = yield select(makeSelectSelectedFilters());

    let store = selectedFilters['store'].map(item => item.value);
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    const apiUrl = rtmUrl + "/brand_insights/";
    const selectedBubbleTimeFilter = yield select(makeSelectBrandBubbleTimeFilterOnChange());
    const selectedBubbleButton = yield select(makeSelectBrandBubbleButtonOnChange());
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        growthSelect: selectedBubbleTimeFilter,
        selectionButtons:selectedBubbleButton,
        user: User['userID'],
        user_role: User['role'],
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
            yield put(brandBubbleSuccess(data));
        } else {
            yield put(brandBubbleFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (brandBubbleCount <= apiTryLimit) {
            brandBubbleCount++;
            yield put(brandBubbleFetch())
        } else {
            yield put(brandBubbleFail())
        }
        console.log(e);
    }
}

// Saga function for Distributors Performance Table

export function* distributorTableSaga() {
    const selectedFilters = yield select(makeSelectSelectedFilters());
    let store = selectedFilters['store'].map(item => item.value);
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    const State = yield select(makeSelectPerformanceSummary());
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const apiUrl = rtmUrl + "/distributors_performance/";
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        ...State['distributorsPerformanceFilter'],
        user: User['userID'],
        user_role: User['role'],
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
            yield put(distributorTableSuccess(data));
        } else {
            yield put(distributorTableFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (distributorTableCount <= apiTryLimit) {
            distributorTableCount++;
            yield put(distributorTableFetch())
        } else {
            yield put(distributorTableFail())
        }
        console.log(e);
    }
}

// Saga function for the Performance cards

export function* cardsDataSaga() {
    const selectedFilters = yield select(makeSelectSelectedFilters());
    let store = selectedFilters['store'].map(item => item.value);
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    const view = "performance_summary";
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const apiUrl = rtmUrl + "/performance_cards/";
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
            yield put(cardDataSuccess(data));
            yield put(toggleCard({
                invoice: true,
                units: true
            }));
        } else {
            yield put(cardDataFail())
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
            yield put(cardDataFetch())
        } else {
            yield put(cardDataFail())
        }
        console.log(e);
    }
}

// Saga function for Category filter data of See trends

export function* categoryFilterSaga() {
    const selectedFilters = yield select(makeSelectSelectedFilters());
    let store = selectedFilters['store'].map(item => item.value);
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    const state = yield select(makeSelectPerformanceSummary());
    let user = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const apiUrl = rtmUrl + "/get_comparison_data/";
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        'information': state['selectedCategoryKpi'],
        'user': user['userID'],
        'user_role': user['role'],
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
            yield put(categoryFilterSuccess(data['filter']));
        } else {
            yield put(categoryFilterFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (categoryFilterCount <= apiTryLimit) {
            categoryFilterCount++;
            yield put(categoryFilterFetch())
        } else {
            yield put(categoryFilterFail())
        }
    }
}

// Saga function for See trends visual in performance cards

export function* seeTrendsSaga() {
    const state = yield select(makeSelectPerformanceSummary());
    const selectedFilters = yield select(makeSelectSelectedFilters());
    let store = selectedFilters['store'].map(item => item.value);
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let user = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const view = "performance_summary";
    const apiUrl = rtmUrl + "/get_trends/";
    const locale = yield select(makeSelectLocale());
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        'user': user['userID'],
        'user_role': user['role'],
        'kpi': state['kpiCard'],
        'filter_key': state['selectedCategoryKpi'],
        'filter_array': state['categorySelectedFilterData'],
        view: view,
        locale: locale
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
            const transformedData = transformTrendLine(data);
            yield put(seeTrendLineSuccess(transformedData));
        } else {
            yield put(seeTrendLineFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (seeTrendLineCount <= apiTryLimit) {
            seeTrendLineCount++;
            yield put(seeTrendLineFetch())
        } else {
            yield put(seeTrendLineFail())
        }
    }
}

//Saga for guided insights tab
export function* guidedInsightsSaga() {

    const selectedFilters = yield select(makeSelectSelectedFilters());
    let store = selectedFilters['store'].map(item => item.value);
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    const apiUrl = rtmUrl + "/guided_insights/";
    const selectedGuidedInsightsFilter = yield select(makeSelectGuidedInsightsFilter());
    const selectedGuidedInsightsButton = yield select(makeSelectGuidedInsightsButton());
    const selectedGuidedInsightsTypeFilter = yield select(makeSelectGuidedInsightsTypeFilter());
    const selectedGuidedInsightsToggle = yield select(makeSelectGuidedInsightsToggle());
    const selectedYearPeriod = yield select(makeSelectYearPeriodSelectedFilterData());
    const locale = yield select(makeSelectLocale());
    const insightsToggleData = selectedGuidedInsightsToggle ? "Finding" : "Insight";
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        user: User['userID'],
        user_role: User['role'],
        kpi: selectedGuidedInsightsButton,
        dimension: selectedGuidedInsightsFilter,
        type: selectedGuidedInsightsTypeFilter,
        analysis: insightsToggleData,
        locale:locale,
        yearPeriod:selectedYearPeriod

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
            yield put(guidedInsightsSuccess(data));
        } else {
            yield put(guidedInsightsFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (guidedInsightsCount <= apiTryLimit) {
            guidedInsightsCount++;
            yield put(guidedInsightsFetch())
        } else {
            yield put(guidedInsightsFail())
        }
        console.log(e);
    }
}

//Guided insights year period filter data
export function* yearPeriodFilterSaga() {
    let selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let store = selectedFilters['store'].map(item => item.value);
    const apiUrl = rtmUrl + "/";
    let user = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        user: user['userID'],
        user_role: user['role'],
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
            yield put(yearPeriodFilterSuccess(data));
        } else {
            yield put(yearPeriodFilterFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (guidedInsightsCount <= apiTryLimit) {
            guidedInsightsCount++;
            yield put(yearPeriodFilterFetch())
        } else {
            yield put(yearPeriodFilterFail())
        }
    }
}

// Individual exports for testing
export default function* performanceSummarySaga() {
    yield takeLatest(BRAND_BUBBLE_FETCH, brandBubbleSaga);
    yield takeLatest(DISTRIBUTOR_TABLE_FETCH, distributorTableSaga);
    yield takeLatest(CARDS_DATA_FETCH, cardsDataSaga);
    yield takeLatest(SELECTED_CATEGORY, categoryFilterSaga);
    yield takeLatest(TRENDS_LINE_FETCH, seeTrendsSaga);
    yield takeLatest(GUIDED_INSIGHTS_FETCH, guidedInsightsSaga);
    yield takeLatest(YEAR_PERIOD_FILTER_FETCH, yearPeriodFilterSaga);
}
