/*
 *
 * BrandView actions
 *
 */

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

export function defaultAction() {
    return {
        type: DEFAULT_ACTION
    };
}

// brandTrend graph

export function brandTrendFetch() {
    return {
        type: BRAND_TREND_FETCH
    };
}

export function brandTrendFail() {
    return {
        type: BRAND_TREND_FAIL
    };
}

export function brandTrendSuccess(data) {
    return {
        type: BRAND_TREND_SUCCESS,
        data
    };
}

//BRAND TREND CLICK
export function brandTrendClickOnChange(data) {
    return {
        type: BRAND_TREND_CLICK_ON_CHANGE,
        data
    };
}

// button on change
export function brandButtonVsOnChange(data) {
    return {
        type: BRAND_BUTTON_VS,
        data
    };
}

// top filter
export function brandTopFilterOnChange(data) {
    return {
        type: BRAND_TREND_TOP,
        data
    };
}

//brand uom button
export function brandUomButtonOnChange(data) {
    return {
        type: BRAND_UOM_BUTTON,
        data
    };
}

// brand heatmap

export function brandHeatFetch() {
    return {
        type: BRAND_HEATMAP_FETCH
    };
}

export function brandHeatFail() {
    return {
        type: BRAND_HEATMAP_FAIL
    };
}

export function brandHeatSuccess(data) {
    return {
        type: BRAND_HEATMAP_SUCCESS,
        data
    };
}

// button on change
export function brandHeatmapButtonOnChange(data) {
    return {
        type: BRAND_HEATMAP_BUTTON,
        data
    };
}

// top filter
export function topFilterHeatmapOnChange(data) {
    return {
        type: BRAND_HEATMAP_TOP,
        data
    };
}

//heatmap time filter
export function brandHeatmapTimeFilterOnChange(data) {
    return {
        type: BRAND_HEATMAP_TIME_FILTER,
        data
    };

}

//heatmap partition filter
export function brandHeatmapPartitionFilterOnChange(data) {
    return {
        type: BRAND_PARTITION_HEATMAP_FILTER,
        data
    };

}
