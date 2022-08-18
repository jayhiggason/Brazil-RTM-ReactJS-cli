import {call, put, select, takeLatest} from 'redux-saga/effects';

import {BRAND_HEATMAP_FETCH, BRAND_TREND_FETCH} from "./constants";

import {
    brandHeatFail,
    brandHeatFetch,
    brandHeatSuccess,
    brandTrendFail,
    brandTrendFetch,
    brandTrendSuccess
} from "./actions";

import {
    makeSelectBrandTopFilter,
    makeSelectBrandUomButton,
    makeSelectBrandVsButton,
    makeSelectHeatmapButton,
    makeSelectHeatmapPartitionFilter,
    makeSelectHeatmapTimeFilter,
    makeSelectHeatmapTopFilter
} from "./selectors";

import {makeSelectSelectedFilters} from "../App/selectors";


import {rtmUrl} from "../../config.json";
import request from "../../utils/request";
import {getCookie, tokenExpired} from "../../utils/cookieUtilities";
import {getTimeRangeFilterData} from "../../utils/utility";
import {dataExceptionHandlingDialog} from "../App/actions";
import {decodeResponse, encodeRequestBody} from "../../utils/jwtUtils";
import {makeSelectLocale} from "../LanguageProvider/selectors";


const apiTryLimit = 2;
let brandTrendCount = 0;
let brandHeatmapCount = 0;


//Saga function for Brand trend - bar chart

export function* brandTrendSaga() {
    const selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let store = selectedFilters['store'].map(item => item.value);
    const selectedVSButton = yield select(makeSelectBrandVsButton());
    const selectedTopFilter = yield select(makeSelectBrandTopFilter());
    const selectedUomButton = yield select(makeSelectBrandUomButton());
    const locale = yield select(makeSelectLocale());
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        user: User['userID'],
        user_role: User['role'],
        topFilter: selectedTopFilter,
        uomButton: selectedUomButton,
        vsFilter: selectedVSButton,
        locale: locale
    });
    const apiUrl = rtmUrl + "/get_brand_trend/";
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
            yield put(brandTrendSuccess(data));
        } else {
            yield put(brandTrendFail())
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
            yield put(brandTrendFetch())
        } else {
            brandTrendCount = 0;
            yield put(brandTrendFail())
        }
        console.log(e);
    }
}

//Saga function for Brand performance across distributors - heat map

export function* brandHeatmapSaga() {
    const selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let store = selectedFilters['store'].map(item => item.value);
    const selectedHeatmapButton = yield select(makeSelectHeatmapButton());
    const selectedTopFilter = yield select(makeSelectHeatmapTopFilter());
    const selectedHeatmapTimeFilter = yield select(makeSelectHeatmapTimeFilter());
    const selectedHeatmapPartitionFilter = yield select(makeSelectHeatmapPartitionFilter());
    let partitionByFilter = selectedHeatmapPartitionFilter === "Overall" ? "" : selectedHeatmapPartitionFilter;
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        selectionButtons: selectedHeatmapButton,
        selectionDropdown: selectedTopFilter,
        growthSelect: selectedHeatmapTimeFilter,
        user: User['userID'],
        user_role: User['role'],
        selectPartition: partitionByFilter,
    });
    const apiUrl = rtmUrl + "/get_brand_performance/";

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
            yield put(brandHeatSuccess(data));
        } else {
            yield put(brandHeatFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (brandHeatmapCount <= apiTryLimit) {
            brandHeatmapCount++;
            yield put(brandHeatFetch())
        } else {
            brandHeatmapCount = 0;
            yield put(brandHeatFail())
        }
        console.log(e);
    }
}


// Individual exports for testing
export default function* brandViewSaga() {
    yield takeLatest(BRAND_TREND_FETCH, brandTrendSaga);
    yield takeLatest(BRAND_HEATMAP_FETCH, brandHeatmapSaga);
}
