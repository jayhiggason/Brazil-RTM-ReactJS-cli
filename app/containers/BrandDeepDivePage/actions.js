/*
 *
 * BrandDeepDivePage actions
 *
 */

import {
    CARDS_DATA_FAIL,
    CARDS_DATA_FETCH,
    CARDS_DATA_SUCCESS,
    CATEGORY_COMPARISON_FILTER_FAIL,
    CATEGORY_COMPARISON_FILTER_FETCH,
    CATEGORY_COMPARISON_FILTER_SUCCESS,
    CATEGORY_FILTER_FAIL,
    CATEGORY_FILTER_FETCH,
    CATEGORY_FILTER_SUCCESS,
    DEFAULT_ACTION,
    INVOICE_TOGGLE,
    ITEM_HEATMAP_BUTTON,
    ITEM_HEATMAP_FAIL,
    ITEM_HEATMAP_FETCH,
    ITEM_HEATMAP_FILTER,
    ITEM_HEATMAP_PARTITION_FILTER,
    ITEM_HEATMAP_SUCCESS,
    ITEM_HEATMAP_TIME_FILTER,
    PRODUCT_BUTTON_VS,
    PRODUCT_SKU_TREND_FILTER_FAIL,
    PRODUCT_SKU_TREND_FILTER_FETCH,
    PRODUCT_SKU_TREND_FILTER_SELECTED_FILTER,
    PRODUCT_SKU_TREND_FILTER_SUCCESS,
    PRODUCT_TREND_FAIL,
    PRODUCT_TREND_FETCH,
    PRODUCT_TREND_FILTER,
    PRODUCT_TREND_SUCCESS,
    PRODUCT_UOM_FILTER,
    SELECTED_CATEGORY,
    SELECTED_CATEGORY_COMPARISON,
    SKU_TABLE_FAIL,
    SKU_TABLE_FETCH,
    SKU_TABLE_FILTER,
    SKU_TABLE_SUCCESS,
    TOGGLE_CARD,
    TRENDS_LINE_FAIL,
    TRENDS_LINE_FETCH,
    TRENDS_LINE_SUCCESS,
    UNITS_TOGGLE
} from "./constants";

export function defaultAction() {
    return {
        type: DEFAULT_ACTION
    };
}

// cards data

export function cardDataFetch() {
    return {
        type: CARDS_DATA_FETCH
    };
}

export function cardDataSuccess(data) {
    return {
        type: CARDS_DATA_SUCCESS,
        data
    };
}

export function cardDataFail() {
    return {
        type: CARDS_DATA_FAIL
    };
}

export function invoiceToggle(data) {
    return {
        type: INVOICE_TOGGLE,
        data
    };
}

export function unitsToggle(data) {
    return {
        type: UNITS_TOGGLE,
        data
    };
}

export function toggleCard(data) {
    return {
        type: TOGGLE_CARD,
        data
    };
}

// see trends filters

export function categoryFilterFetch() {
    return {
        type: CATEGORY_FILTER_FETCH
    };
}

export function categoryFilterSuccess(data) {
    return {
        type: CATEGORY_FILTER_SUCCESS,
        data
    };
}

export function categoryFilterFail() {
    return {
        type: CATEGORY_FILTER_FAIL
    };
}

export function categoryOnChange(data) {
    return {
        type: SELECTED_CATEGORY,
        data
    };
}

export function categoryComparisonFilterFetch() {
    return {
        type: CATEGORY_COMPARISON_FILTER_FETCH
    };
}

export function categoryComparisonFilterSuccess(data) {
    return {
        type: CATEGORY_COMPARISON_FILTER_SUCCESS,
        data
    };
}

export function categoryComparisonFilterFail() {
    return {
        type: CATEGORY_COMPARISON_FILTER_FAIL
    };
}

export function categoryComparisonOnChange(data) {
    return {
        type: SELECTED_CATEGORY_COMPARISON,
        data
    };
}

// see trends line

export function seeTrendLineFetch(data) {
    return {
        type: TRENDS_LINE_FETCH,
        data
    };
}

export function seeTrendLineSuccess(data) {
    return {
        type: TRENDS_LINE_SUCCESS,
        data
    };
}

export function seeTrendLineFail() {
    return {
        type: TRENDS_LINE_FAIL
    };
}


// PRODUCT/SKU graph

export function productTrendFetch() {
    return {

        type: PRODUCT_TREND_FETCH
    };
}

export function productTrendFail() {
    return {
        type: PRODUCT_TREND_FAIL
    };
}

export function productTrendSuccess(data) {
    return {
        type: PRODUCT_TREND_SUCCESS,
        data
    };
}

//Product trend buttons
export function productTrendClickOnChange(data) {
    return {
        type: PRODUCT_BUTTON_VS,
        data
    };
}


// PRODUCT TREND filter
export function productTrendFilterOnChange(data) {
    return {
        type: PRODUCT_TREND_FILTER,
        data
    };
}

//product uom filter
export function productTrendUomFilterOnChange(data) {
    return {
        type: PRODUCT_UOM_FILTER,
        data
    };
}

//product sku trend filter
export function productSkuTrendFilterFetch() {
    return {
        type: PRODUCT_SKU_TREND_FILTER_FETCH
    };
}

export function productSkuTrendFilterSuccess(data) {
    return {
        type: PRODUCT_SKU_TREND_FILTER_SUCCESS,
        data
    };
}

export function productSkuTrendFilterFail() {
    return {
        type: PRODUCT_SKU_TREND_FILTER_FAIL
    };
}

export function productSkuTrendFilterOnChange(data) {
    return {
        type: PRODUCT_SKU_TREND_FILTER_SELECTED_FILTER,
        data
    };
}

// ITEM heat map

export function itemHeatFetch() {
    return {
        type: ITEM_HEATMAP_FETCH
    };
}

export function itemHeatFail() {
    return {
        type: ITEM_HEATMAP_FAIL
    };
}

export function itemHeatSuccess(data) {
    return {
        type: ITEM_HEATMAP_SUCCESS,
        data
    };
}

// ITEM HEATMAP button
export function itemHeatmapButtonOnChange(data) {
    return {
        type: ITEM_HEATMAP_BUTTON,
        data
    };
}

// ITEM HEATMAP filter
export function itemFilterHeatmapOnChange(data) {
    return {
        type: ITEM_HEATMAP_FILTER,
        data
    };
}

//item heatmap time filter
export function itemTimeFilterHeatmapOnChange(data) {
    return {
        type: ITEM_HEATMAP_TIME_FILTER,
        data

    }
}

// item heatmap partition filter
export function itemPartitionFilterHeatmapOnChange(data) {
    return {
        type: ITEM_HEATMAP_PARTITION_FILTER,
        data

    }
}

//SKU TABLE

export function skuTableFetch() {
    return {
        type: SKU_TABLE_FETCH
    };
}

export function skuTableSuccess(data) {
    return {
        type: SKU_TABLE_SUCCESS,
        data
    };
}

export function skuTableFail() {
    return {
        type: SKU_TABLE_FAIL
    };
}


export function skuFilterOnChange(data) {
    return {
        type: SKU_TABLE_FILTER,
        data
    };
}

