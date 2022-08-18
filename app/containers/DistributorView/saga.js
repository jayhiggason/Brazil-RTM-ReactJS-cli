import {call, put, select, takeLatest} from 'redux-saga/effects';
import {getCookie, tokenExpired} from "../../utils/cookieUtilities";
import {rtmUrl} from "../../config.json";
import makeSelectDistributorView from "./selectors";
import {makeSelectSelectedFilters} from "../App/selectors";
import request from "../../utils/request";
import {
    distributorTrendChartDataFetch,
    distributorTrendChartDataFetchFail,
    distributorTrendChartDataFetchSuccess,
    distributorTrendTableDataFetch,
    distributorTrendTableDataFetchFail,
    distributorTrendTableDataFetchSuccess
} from "./actions";
import {DISTRIBUTOR_TREND_CHART_DATA_FETCH, DISTRIBUTOR_TREND_TABLE_DATA_FETCH} from "./constants";
import {getTimeRangeFilterData} from "../../utils/utility";
import {dataExceptionHandlingDialog} from "../App/actions";
import {decodeResponse, encodeRequestBody} from "../../utils/jwtUtils";
import {makeSelectLocale} from "../LanguageProvider/selectors";


const apiTryLimit = 5;
let distTrendApiCallCount = 0;
let distTableApiCallCount = 0;


// Individual exports for testing
export default function* distributorViewSaga() {
    yield takeLatest(DISTRIBUTOR_TREND_CHART_DATA_FETCH, brandTrendChartDataFetchSaga);
    yield takeLatest(DISTRIBUTOR_TREND_TABLE_DATA_FETCH, brandTrendTableDataFetchSaga);
}

export function* brandTrendChartDataFetchSaga() {
    const selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let store = selectedFilters['store'].map(item => item.value);
    const state = yield select(makeSelectDistributorView());
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const apiUrl = rtmUrl + "/get_distributor_trend/";
    const locale = yield select(makeSelectLocale());
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        kpiName: state['trendChartFilter']['kpiName'],
        topFilter: state['trendChartFilter']['topFilter'],
        user: User['userID'],
        user_role: User['role'],
        vsFilter: state['trendChartFilter']['kpiFilter'],
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
        yield put(distributorTrendChartDataFetchSuccess(data))
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (distTrendApiCallCount > apiTryLimit) {
            distTrendApiCallCount = 0;
            yield put(distributorTrendChartDataFetchFail());
        } else {
            distTrendApiCallCount++;
            yield put(distributorTrendChartDataFetch());
        }
    }

}

export function* brandTrendTableDataFetchSaga() {
    const selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let store = selectedFilters['store'].map(item => item.value);
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const apiUrl = rtmUrl + "/get_distributor_table/";
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
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
        yield put(distributorTrendTableDataFetchSuccess(data))
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (distTableApiCallCount > apiTryLimit) {
            distTableApiCallCount = 0;
            yield put(distributorTrendTableDataFetchFail());
        } else {
            distTableApiCallCount++;
            yield put(distributorTrendTableDataFetch());
        }
    }
}
