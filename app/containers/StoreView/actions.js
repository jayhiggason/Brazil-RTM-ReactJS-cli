/*
 *
 * StoreView actions
 *
 */

import {
    DEFAULT_ACTION,
    STORE_GEOMAP_CLICK,
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

export function defaultAction() {
    return {
        type: DEFAULT_ACTION
    };
}

//store trend table
export function storeTrendTableFetch() {
    return {
        type: STORE_TREND_TABLE_FETCH
    };
}

export function storeTrendTableFail() {
    return {
        type: STORE_TREND_TABLE_FAIL
    };
}

export function storeTrendTableSuccess(data) {
    return {
        type: STORE_TREND_TABLE_SUCCESS,
        data
    };
}

//store filter
export function storeTopFilterOnChange(data) {
    return {
        type: STORE_TREND_TABLE_FILTER,
        data
    }
}

//store trend table button
export function storeTrendButtonOnChange(data) {
    return {
        type: STORE_TREND_TABLE_BUTTON,
        data
    }
}

//STORE GEO MAP
export function storeGeoMapFetch() {
    return {
        type: STORE_GEOMAP_FETCH
    };
}

export function storeGeoMapFail() {
    return {
        type: STORE_GEOMAP_FAIL
    };
}

export function storeGeoMapSuccess(data) {
    return {
        type: STORE_GEOMAP_SUCCESS,
        data
    };
}

//BRAND TREND CLICK
export function storeGeoMapClick(data) {
    return {
        type: STORE_GEOMAP_CLICK,
        data
    };
}

// store heat map
export function storeHeatMapFetch() {
    return {
        type: STORE_HEATMAP_FETCH
    };
}

export function storeHeatMapFail() {
    return {
        type: STORE_HEATMAP_FAIL
    };
}

export function storeHeatMapSuccess(data) {
    return {
        type: STORE_HEATMAP_SUCCESS,
        data
    };
}

//heatmap filter

export function storeHeatMapFilterChange(data) {
    return {
        type: STORE_HEATMAP_FILTER,
        data
    };
}


// button on change
export function storeHeatMapButtonOnChange(data) {
    return {
        type: STORE_HEATMAP_BUTTON,
        data
    };
}

// heatmap time filter

export function storeTimeFilterHeatmapOnChange(data) {
    return {
        type: STORE_HEATMAP_TIME_FILTER,
        data
    };
}

//heatmap partition filter

export function storePartitionFilterHeatmapOnChange(data) {
    return {
        type: STORE_HEATMAP_PARTITION,
        data
    };
}
