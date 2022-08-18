/*
 *
 * DistributorView actions
 *
 */

import {
    DEFAULT_ACTION,
    DISTRIBUTOR_TREND_CHART_DATA_FETCH,
    DISTRIBUTOR_TREND_CHART_DATA_FETCH_FAIL,
    DISTRIBUTOR_TREND_CHART_DATA_FETCH_SUCCESS,
    DISTRIBUTOR_TREND_CHART_ON_FILTER_CHANGE,
    DISTRIBUTOR_TREND_TABLE_DATA_FETCH,
    DISTRIBUTOR_TREND_TABLE_DATA_FETCH_FAIL,
    DISTRIBUTOR_TREND_TABLE_DATA_FETCH_SUCCESS
} from "./constants";


export function defaultAction() {
    return {
        type: DEFAULT_ACTION
    };
}

export function distributorTrendChartDataFetch() {
    return {
        type: DISTRIBUTOR_TREND_CHART_DATA_FETCH,
    };
}

export function distributorTrendChartDataFetchSuccess(data) {
    return {
        type: DISTRIBUTOR_TREND_CHART_DATA_FETCH_SUCCESS,
        data
    };
}

export function distributorTrendChartDataFetchFail() {
    return {
        type: DISTRIBUTOR_TREND_CHART_DATA_FETCH_FAIL,
    };
}

export function distributorTrendChartOnFilterChange(data) {
    return {
        type: DISTRIBUTOR_TREND_CHART_ON_FILTER_CHANGE,
        data
    };
}

export function distributorTrendTableDataFetch() {
    return {
        type: DISTRIBUTOR_TREND_TABLE_DATA_FETCH
    };
}

export function distributorTrendTableDataFetchSuccess(data) {
    return {
        type: DISTRIBUTOR_TREND_TABLE_DATA_FETCH_SUCCESS,
        data
    };
}

export function distributorTrendTableDataFetchFail() {
    return {
        type: DISTRIBUTOR_TREND_TABLE_DATA_FETCH_FAIL
    };
}
