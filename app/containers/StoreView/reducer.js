/*
 *
 * StoreView reducer
 *
 */
import produce from "immer";
import {
    DEFAULT_ACTION,
    STORE_GEOMAP_FAIL,
    STORE_GEOMAP_FETCH,
    STORE_GEOMAP_SUCCESS,
    STORE_HEATMAP_BUTTON,
    STORE_HEATMAP_FAIL,
    STORE_HEATMAP_FETCH,
    STORE_HEATMAP_FILTER,
    STORE_HEATMAP_PARTITION,
    STORE_HEATMAP_SUCCESS,
    STORE_HEATMAP_TIME_FILTER,
    STORE_TREND_TABLE_BUTTON,
    STORE_TREND_TABLE_FAIL,
    STORE_TREND_TABLE_FETCH,
    STORE_TREND_TABLE_FILTER,
    STORE_TREND_TABLE_SUCCESS
} from "./constants";


export const initialState = {
    //store trend table
    storeTrendTableData: [],
    storeTrendTableDataFail: false,
    storeTrendTableDataSpinnerState: true,
    storeTopFilter: "Top 10",
    storeTrendButton: "Invoice",
    //store geo map

    storeGeoMapData: [],
    storeGeoMapDataFail: false,
    storeGeoMapDataSpinnerState: true,
    //store heat map
    storeHeatMapData: [],
    storeHeatMapDataFail: false,
    storeHeatMapDataSpinnerState: true,

    storeHeatMapButton: "Invoice",
    storeHeatMapFilter: "Actual",
    storeHeatMapTimeFilter: "Period",
    storeHeatMapPartitionFilter: "Store",

};

/* eslint-disable default-case, no-param-reassign */
const storeViewReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case DEFAULT_ACTION:
                break;
            case STORE_TREND_TABLE_FETCH:
                draft.storeTrendTableDataSpinnerState = true;
                draft.storeTrendTableDataFail = false;
                break;
            case STORE_TREND_TABLE_SUCCESS:
                draft.storeTrendTableDataSpinnerState = false;
                draft.storeTrendTableData = action.data;
                draft.storeTrendTableDataFail = false;
                break;
            case STORE_TREND_TABLE_FAIL:
                draft.storeTrendTableDataSpinnerState = false;
                draft.storeTrendTableDataFail = true;
                break;
            case STORE_TREND_TABLE_FILTER:
                draft.storeTopFilter = action.data;
                break;
            case STORE_TREND_TABLE_BUTTON:
                draft.storeTrendButton = action.data;
                break;
            case STORE_GEOMAP_FETCH:
                draft.storeGeoMapDataSpinnerState = true;
                draft.storeGeoMapDataFail = false;
                break;
            case STORE_GEOMAP_SUCCESS:
                draft.storeGeoMapDataSpinnerState = false;
                draft.storeGeoMapData = action.data;
                draft.storeGeoMapDataFail = false;
                break;
            case STORE_GEOMAP_FAIL:
                draft.storeGeoMapDataSpinnerState = false;
                draft.storeGeoMapDataFail = true;
                break;
            case STORE_HEATMAP_FETCH:
                draft.storeHeatMapDataSpinnerState = true;
                draft.storeHeatMapDataFail = false;
                break;
            case STORE_HEATMAP_SUCCESS:
                draft.storeHeatMapDataSpinnerState = false;
                draft.storeHeatMapData = action.data;
                draft.storeHeatMapDataFail = false;
                break;
            case STORE_HEATMAP_FAIL:
                draft.storeHeatMapDataSpinnerState = false;
                draft.storeHeatMapDataFail = true;
                break;
            case STORE_HEATMAP_BUTTON:
                draft.storeHeatMapButton = action.data;
                break;
            case STORE_HEATMAP_FILTER:
                draft.storeHeatMapFilter = action.data;
                break;
            case STORE_HEATMAP_TIME_FILTER:
                draft.storeHeatMapTimeFilter = action.data;
                break;
            case STORE_HEATMAP_PARTITION:
                draft.storeHeatMapPartitionFilter = action.data;
        }
    });

export default storeViewReducer;
