/*
 *
 * BrandView reducer
 *
 */
import produce from "immer";
import {
    BRAND_BUTTON_VS,
    BRAND_HEATMAP_BUTTON,
    BRAND_HEATMAP_FAIL,
    BRAND_HEATMAP_FETCH,
    BRAND_HEATMAP_SUCCESS,
    BRAND_HEATMAP_TIME_FILTER,
    BRAND_HEATMAP_TOP,
    BRAND_PARTITION_HEATMAP_FILTER,
    BRAND_TREND_CLICK_ON_CHANGE,
    BRAND_TREND_FAIL,
    BRAND_TREND_FETCH,
    BRAND_TREND_SUCCESS,
    BRAND_TREND_TOP,
    BRAND_UOM_BUTTON,
    DEFAULT_ACTION
} from "./constants";

export const initialState = {
    // brand trend graph
    brandTrendData: {xAxis: [], series: []},
    brandWholeData: [],
    brandTrendDataFail: false,
    brandTrendDataSpinnerState: true,
    brandTrendButton: "technology",
    brandTopFilter: "Top 10",
    brandTrendUomButton: "Invoice",
    selectedBrandName: "",

    // brand heatmap graph
    brandHeatMapData: [],
    brandHeatMapDataFail: false,
    brandHeatMapDataSpinnerState: true,
    brandHeatMapButton: "Invoice",
    brandTopHeatmapFilter: "Actual",
    brandPartitionHeatmapFilter: "Brand",
    brandHeatmapTimeFilter: "Period",
};

/* eslint-disable default-case, no-param-reassign */
const brandViewReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case DEFAULT_ACTION:
                break;

            case BRAND_TREND_FETCH:
                draft.brandTrendDataSpinnerState = true;
                draft.brandTrendDataFail = false;
                break;
            case BRAND_TREND_SUCCESS:
                draft.brandTrendDataSpinnerState = false;
                draft.brandTrendData = action.data;
                draft.brandTrendDataFail = false;
                break;
            case BRAND_TREND_FAIL:
                draft.brandTrendDataSpinnerState = false;
                draft.brandTrendDataFail = true;
                break;
            case BRAND_BUTTON_VS:
                draft.brandTrendButton = action.data;
                break;
            case BRAND_UOM_BUTTON:
                draft.brandTrendUomButton = action.data;
                break;
            case BRAND_TREND_TOP:
                draft.brandTopFilter = action.data;
                break;
            case BRAND_TREND_CLICK_ON_CHANGE:
                draft.selectedBrandName = action.data;
                break;

            case BRAND_HEATMAP_FETCH:
                draft.brandHeatMapDataSpinnerState = true;
                draft.brandHeatMapDataFail = false;
                break;
            case BRAND_HEATMAP_SUCCESS:
                draft.brandHeatMapDataSpinnerState = false;
                draft.brandHeatMapData = action.data;
                draft.brandHeatMapDataFail = false;
                break;
            case BRAND_HEATMAP_FAIL:
                draft.brandHeatMapDataSpinnerState = false;
                draft.brandHeatMapDataFail = true;
                break;
            case BRAND_HEATMAP_BUTTON:
                draft.brandHeatMapButton = action.data;
                break;
            case BRAND_HEATMAP_TOP:
                draft.brandTopHeatmapFilter = action.data;
                break;
            case BRAND_HEATMAP_TIME_FILTER:
                draft.brandHeatmapTimeFilter = action.data;
                break;
            case BRAND_PARTITION_HEATMAP_FILTER:
                draft.brandPartitionHeatmapFilter = action.data;
                break;
        }


    });

export default brandViewReducer;
