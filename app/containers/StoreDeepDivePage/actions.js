/*
 *
 * StoreDeepDivePage actions
 *
 */

import {
    DEFAULT_ACTION,
    PARETO_ANALYSIS_FAIL,
    PARETO_ANALYSIS_FETCH,
    PARETO_ANALYSIS_FILTER,
    PARETO_ANALYSIS_SUCCESS,
    PRODUCT_ANALYSIS_BUTTON,
    PRODUCT_ANALYSIS_FAIL,
    PRODUCT_ANALYSIS_FETCH, PRODUCT_ANALYSIS_KPI_BUTTON,
    PRODUCT_ANALYSIS_SUCCESS,
    PRODUCT_DISTRIBUTION_BUTTON,
    PRODUCT_DISTRIBUTION_FAIL,
    PRODUCT_DISTRIBUTION_FETCH,
    PRODUCT_DISTRIBUTION_FILTER,
    PRODUCT_DISTRIBUTION_SUCCESS,
    PURCHASE_ANALYSIS_BEST_MIX_FAIL,
    PURCHASE_ANALYSIS_BEST_MIX_FETCH,
    PURCHASE_ANALYSIS_BEST_MIX_SUCCESS, PURCHASE_ANALYSIS_BUTTON,
    PURCHASE_ANALYSIS_FAIL,
    PURCHASE_ANALYSIS_FETCH,
    PURCHASE_ANALYSIS_SUCCESS,
    SALES_PERFORMANCE_BUTTON,
    SALES_PERFORMANCE_FAIL,
    SALES_PERFORMANCE_FETCH,
    SALES_PERFORMANCE_SUCCESS
} from "./constants";

export function defaultAction() {
    return {
        type: DEFAULT_ACTION
    };
}

//sales performance

export function salesPerformanceFetch() {
    return {
        type: SALES_PERFORMANCE_FETCH
    };
}

export function salesPerformanceFail() {
    return {
        type: SALES_PERFORMANCE_FAIL
    };
}

export function salesPerformanceSuccess(data) {
    return {
        type: SALES_PERFORMANCE_SUCCESS,
        data
    };
}

export function salesPerformanceButtonChange(data) {
    return {
        type: SALES_PERFORMANCE_BUTTON,
        data
    };
}

// purchase analysis
export function purchaseAnalysisFetch() {
    return {
        type: PURCHASE_ANALYSIS_FETCH
    };
}

export function purchaseAnalysisFail() {
    return {
        type: PURCHASE_ANALYSIS_FAIL
    };
}

export function purchaseAnalysisSuccess(data) {
    return {
        type: PURCHASE_ANALYSIS_SUCCESS,
        data
    };
}


export function purchaseAnalysisButtonChange(data) {
    return {
        type: PURCHASE_ANALYSIS_BUTTON,
        data
    };
}

// purchase analysis BEST PRODUCT MIX
export function purchaseAnalysisBestMixFetch() {
    return {
        type: PURCHASE_ANALYSIS_BEST_MIX_FETCH
    };
}

export function purchaseAnalysisBestMixFail() {
    return {
        type: PURCHASE_ANALYSIS_BEST_MIX_FAIL
    };
}

export function purchaseAnalysisBestMixSuccess(data) {
    return {
        type: PURCHASE_ANALYSIS_BEST_MIX_SUCCESS,
        data
    };
}
//pareto analysis

export function paretoAnalysisFetch() {
    return {
        type: PARETO_ANALYSIS_FETCH
    };
}

export function paretoAnalysisFail() {
    return {
        type: PARETO_ANALYSIS_FAIL
    };
}

export function paretoAnalysisSuccess(data) {
    return {
        type: PARETO_ANALYSIS_SUCCESS,
        data
    };
}

//pareto filter
export function paretoAnalysisFilterChange(data) {
    return {
        type: PARETO_ANALYSIS_FILTER,
        data
    };
}

//product analysis table
export function productAnalysisFetch() {
    return {
        type: PRODUCT_ANALYSIS_FETCH
    };
}

export function productAnalysisFail() {
    return {
        type: PRODUCT_ANALYSIS_FAIL
    };
}

export function productAnalysisSuccess(data) {
    return {
        type: PRODUCT_ANALYSIS_SUCCESS,
        data
    };
}

//product analysis FILTER button

export function productAnalysisButtonChange(data) {
    return {
        type: PRODUCT_ANALYSIS_BUTTON,
        data
    };
}

//product analysis button

export function productAnalysisKpiButtonChange(data) {
    return {
        type: PRODUCT_ANALYSIS_KPI_BUTTON,
        data
    };
}
//product distribution
export function productDistributionFetch() {
    return {
        type: PRODUCT_DISTRIBUTION_FETCH
    };
}

export function productDistributionFail() {
    return {
        type: PRODUCT_DISTRIBUTION_FAIL
    };
}

export function productDistributionSuccess(data) {
    return {
        type: PRODUCT_DISTRIBUTION_SUCCESS,
        data
    };
}

//product distribution button
export function productDistributionButtonChange(data) {
    return {

        type: PRODUCT_DISTRIBUTION_BUTTON,
        data
    };
}

//prod dist filter
export function storeProductTopFilterOnChange(data) {
    return {
        type: PRODUCT_DISTRIBUTION_FILTER,
        data
    }

}


