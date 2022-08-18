/*
 *
 * DistributorView reducer
 *
 */
import produce from "immer";
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

export const initialState = {
    //distributor trend chart
    trendChartData: {
        xAxis: [],
        series: []
    },
    trendChartFilter: {
        topFilter: "Top 10",
        kpiName: "GSV",
        kpiFilter: "target",
    },
    trendChartDataFetchSpinnerState: false,
    trendChartDataFetchFailed: false,
    //distributor trend table
    trendTableData: [
    ],
    trendTableDataFetchSpinnerState: false,
    trendTableDataFetchFailed: false,
};

/* eslint-disable default-case, no-param-reassign */
const distributorViewReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case DEFAULT_ACTION:
                break;
            case DISTRIBUTOR_TREND_CHART_DATA_FETCH:
                draft.trendChartDataFetchSpinnerState = true;
                draft.trendChartDataFetchFailed = false;
                break;
            case DISTRIBUTOR_TREND_CHART_DATA_FETCH_SUCCESS:
                draft.trendChartData = action.data;
                draft.trendChartDataFetchSpinnerState = false;
                draft.trendChartDataFetchFailed = false;
                break;
            case DISTRIBUTOR_TREND_CHART_DATA_FETCH_FAIL:
                draft.trendChartDataFetchSpinnerState = false;
                draft.trendChartDataFetchFailed = true;
                break;
            case DISTRIBUTOR_TREND_CHART_ON_FILTER_CHANGE:
                draft.trendChartFilter = action.data;
                break;
            case DISTRIBUTOR_TREND_TABLE_DATA_FETCH:
                draft.trendTableDataFetchSpinnerState = true;
                draft.trendTableDataFetchFailed = false;
                break;
            case DISTRIBUTOR_TREND_TABLE_DATA_FETCH_SUCCESS:
                draft.trendTableData = action.data;
                draft.trendTableDataFetchSpinnerState = false;
                draft.trendTableDataFetchFailed = false;
                break;
            case DISTRIBUTOR_TREND_TABLE_DATA_FETCH_FAIL:
                draft.trendTableDataFetchSpinnerState = false;
                draft.trendTableDataFetchFailed = true;
                break;
        }
    });

export default distributorViewReducer;
