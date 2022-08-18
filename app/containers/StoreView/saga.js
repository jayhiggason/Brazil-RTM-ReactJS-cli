// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import {call, put, select, takeLatest} from "redux-saga/effects";
import {STORE_GEOMAP_FETCH, STORE_HEATMAP_FETCH, STORE_TREND_TABLE_FETCH} from "./constants";
import {makeSelectSelectedFilters} from "../App/selectors";
import {getTimeRangeFilterData} from "../../utils/utility";
import {getCookie, tokenExpired} from "../../utils/cookieUtilities";
import {rtmUrl} from "../../config.json";
import request from "../../utils/request";
import {
    makeSelectStoreHeatmapButton,
    makeSelectStoreHeatMapFilter,
    makeSelectStoreHeatMapPartitionFilter,
    makeSelectStoreHeatMapTimeFilter,
    makeSelectStoreTopFilter,
    makeSelectStoreTrendButton
} from "./selectors";
import {
    storeGeoMapFail,
    storeGeoMapFetch,
    storeGeoMapSuccess,
    storeHeatMapFail,
    storeHeatMapFetch,
    storeHeatMapSuccess,
    storeTrendTableFail,
    storeTrendTableFetch,
    storeTrendTableSuccess
} from "./actions";
import {dataExceptionHandlingDialog} from "../App/actions";
import {decodeResponse, encodeRequestBody} from "../../utils/jwtUtils";
import {makeSelectLocale} from "../LanguageProvider/selectors";

let HeatmapCount = 0;
const apiTryLimit = 2;
let TableCount = 0;
let GeoMapCount = 0;

//store trend table
export function* storeTrendTableSaga() {
    const selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let store = selectedFilters['store'].map(item => item.value);
    const selectedTopFilter = yield select(makeSelectStoreTopFilter());
    const selectedButton = yield select(makeSelectStoreTrendButton());
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
        selectionButtons: selectedButton,
        locale:locale
    });
    const apiUrl = rtmUrl + "/get_trend_across_stores/";
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
            yield put(storeTrendTableSuccess(data));
        } else {
            yield put(storeTrendTableFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (TableCount <= apiTryLimit) {
            TableCount++;
            yield put(storeTrendTableFetch())
        } else {
            yield put(storeTrendTableFail())
        }
        console.log(e);
    }
}


//store geomap

export function* storeGeoMapSaga() {
    const selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let store = selectedFilters['store'].map(item => item.value);
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        user: User['userID'],
        user_role: User['role'],
    });
    const apiUrl = rtmUrl + "/get_geomap/";
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
            yield put(storeGeoMapSuccess(data));
        } else {
            yield put(storeGeoMapFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (GeoMapCount <= apiTryLimit) {
            GeoMapCount++;
            yield put(storeGeoMapFetch())
        } else {
            yield put(storeGeoMapFail())
        }
        console.log(e);
    }
}


// store heatmap

export function* storeHeatMapSaga() {
    const selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let store = selectedFilters['store'].map(item => item.value);
    const selectedHeatMapButton = yield select(makeSelectStoreHeatmapButton());
    const selectedFilter = yield select(makeSelectStoreHeatMapFilter());
    const selectedHeatMapTimeFilter = yield select(makeSelectStoreHeatMapTimeFilter());
    const selectedHeatMapPartitionFilter = yield select(makeSelectStoreHeatMapPartitionFilter());
    let partitionByFilter = selectedHeatMapPartitionFilter === "Overall" ? "" : selectedHeatMapPartitionFilter;
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        selectionButtons: selectedHeatMapButton,
        selectionDropdown: selectedFilter,
        growthSelect: selectedHeatMapTimeFilter,
        user: User['userID'],
        user_role: User['role'],
        selectPartition: partitionByFilter,
    });
    const apiUrl = rtmUrl + "/get_cust_vs_product/";

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
            yield put(storeHeatMapSuccess(data));
        } else {
            yield put(storeHeatMapFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (HeatmapCount <= apiTryLimit) {
            HeatmapCount++;
            yield put(storeHeatMapFetch())
        } else {
            HeatmapCount = 0;
            yield put(storeHeatMapFail())
        }
        console.log(e);
    }
}


export default function* storeViewSaga() {

    yield takeLatest(STORE_TREND_TABLE_FETCH, storeTrendTableSaga);
    yield takeLatest(STORE_GEOMAP_FETCH, storeGeoMapSaga);
    yield takeLatest(STORE_HEATMAP_FETCH, storeHeatMapSaga);
}
