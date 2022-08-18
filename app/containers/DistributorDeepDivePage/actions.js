/*
 *
 * DistributorDeepDivePage actions
 *
 */

import {
    CHANNEL_PERFORMANCE_BUTTON,
    CHANNEL_PERFORMANCE_CLICK_ON_CHANGE,
    CHANNEL_PERFORMANCE_FAIL,
    CHANNEL_PERFORMANCE_FETCH,
    CHANNEL_PERFORMANCE_FILTER,
    CHANNEL_PERFORMANCE_SUCCESS,
    DEFAULT_ACTION,
    DISTRIBUTOR_CARDS_DATA_FAIL,
    DISTRIBUTOR_CARDS_DATA_FETCH,
    DISTRIBUTOR_CARDS_DATA_SUCCESS,
    DISTRIBUTOR_SALES_PERFORMANCE_BUTTON_VS,
    DISTRIBUTOR_SALES_PERFORMANCE_FAIL,
    DISTRIBUTOR_SALES_PERFORMANCE_FETCH,
    DISTRIBUTOR_SALES_PERFORMANCE_KPI_BUTTON,
    DISTRIBUTOR_SALES_PERFORMANCE_SUCCESS,
    PRODUCT_PERFORMANCE_BUTTON,
    PRODUCT_PERFORMANCE_FAIL,
    PRODUCT_PERFORMANCE_FETCH,
    PRODUCT_PERFORMANCE_SUCCESS, STORE_PERFORMANCE_BUTTON,
    STORE_PERFORMANCE_FAIL,
    STORE_PERFORMANCE_FETCH,
    STORE_PERFORMANCE_FILTER,
    STORE_PERFORMANCE_SUCCESS, STORE_TABLE_BUTTON,
    STORE_TABLE_FAIL,
    STORE_TABLE_FETCH,
    STORE_TABLE_SUCCESS,
    TOGGLE_CARD,
    VISIT_SALES_BUBBLE_FAIL,
    VISIT_SALES_BUBBLE_FETCH, VISIT_SALES_BUBBLE_FILTER,
    VISIT_SALES_BUBBLE_SUCCESS
} from "./constants";

export function defaultAction() {
    return {
        type: DEFAULT_ACTION
    };
}

//dist chart
export function distributorCardsFetch() {
    return {
        type: DISTRIBUTOR_CARDS_DATA_FETCH
    };
}

export function distributorCardsFail() {
    return {
        type: DISTRIBUTOR_CARDS_DATA_FAIL
    };
}

export function distributorCardsSuccess(data) {
    return {
        type: DISTRIBUTOR_CARDS_DATA_SUCCESS,
        data
    };
}

export function toggleCard(data) {
    return {
        type: TOGGLE_CARD,
        data
    };
}

//visit vs sales chart
export function visitSalesBubbleFetch() {
    return {
        type: VISIT_SALES_BUBBLE_FETCH
    };
}

export function visitSalesBubbleFail() {
    return {
        type: VISIT_SALES_BUBBLE_FAIL
    };
}

export function visitSalesBubbleSuccess(data) {
    return {
        type: VISIT_SALES_BUBBLE_SUCCESS,
        data
    };
}
export function visitSalesBubbleFilterOnChange(data) {
    return {
        type: VISIT_SALES_BUBBLE_FILTER,
        data
    };
}


// dist sales performance graph

export function distributorSalesPerformanceFetch() {
    return {
        type: DISTRIBUTOR_SALES_PERFORMANCE_FETCH
    };
}

export function distributorSalesPerformanceFail() {
    return {
        type: DISTRIBUTOR_SALES_PERFORMANCE_FAIL
    };
}

export function distributorSalesPerformanceSuccess(data) {
    return {
        type: DISTRIBUTOR_SALES_PERFORMANCE_SUCCESS,
        data
    };
}

// button on change dist sales performance graph
export function distributorSalesPerformanceButtonVsOnChange(data) {
    return {
        type: DISTRIBUTOR_SALES_PERFORMANCE_BUTTON_VS,
        data
    };
}


export function distributorSalesPerformanceKpiButtonOnChange(data) {
    return {
        type: DISTRIBUTOR_SALES_PERFORMANCE_KPI_BUTTON,
        data
    };
}

//Product sales performance chart - pareto
export function productPerformanceFetch() {
    return {
        type: PRODUCT_PERFORMANCE_FETCH
    };
}

export function productPerformanceFail() {
    return {
        type: PRODUCT_PERFORMANCE_FAIL
    };
}

export function productPerformanceSuccess(data) {
    return {
        type: PRODUCT_PERFORMANCE_SUCCESS,
        data
    };
}

export function productPerformanceButtonOnChange(data) {
    return {
        type: PRODUCT_PERFORMANCE_BUTTON,
        data
    };
}


//channel perf chart
export function channelPerformanceFetch() {
    return {
        type: CHANNEL_PERFORMANCE_FETCH
    };
}

export function channelPerformanceFail() {
    return {
        type: CHANNEL_PERFORMANCE_FAIL
    };
}

export function channelPerformanceSuccess(data) {
    return {
        type: CHANNEL_PERFORMANCE_SUCCESS,
        data
    };
}
export function channelPerformanceButtonOnChange(data) {
    return {
        type: CHANNEL_PERFORMANCE_BUTTON,
        data
    };
}


//Channel CLICK
export function channelPerformanceClickOnChange(data) {
    return {
        type: CHANNEL_PERFORMANCE_CLICK_ON_CHANGE,
        data
    };
}

//channel filter
export function channelPerformanceFilter(data) {
    return {
        type: CHANNEL_PERFORMANCE_FILTER,
        data
    };
}

//store perf chart
export function storePerformanceFetch(data) {
    return {
        type: STORE_PERFORMANCE_FETCH,
        data
    };
}

export function storePerformanceFail() {
    return {
        type: STORE_PERFORMANCE_FAIL
    };
}

export function storePerformanceSuccess(data) {
    return {
        type: STORE_PERFORMANCE_SUCCESS,
        data
    };
}
export function storePerformanceButtonOnChange(data) {
    return {
        type: STORE_PERFORMANCE_BUTTON,
        data
    };
}
//STORE filter
export function storePerformanceFilter(data) {
    return {
        type: STORE_PERFORMANCE_FILTER,
        data
    };
}

// store table

export function storeTableFetch() {
    return {
        type: STORE_TABLE_FETCH
    };
}

export function storeTableFail() {
    return {
        type: STORE_TABLE_FAIL
    };
}

export function storeTableSuccess(data) {
    return {
        type: STORE_TABLE_SUCCESS,
        data
    };
}
export function storeTableOnChange(data) {
    return {
        type: STORE_TABLE_BUTTON,
        data
    };
}
