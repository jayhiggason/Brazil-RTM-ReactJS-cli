/*
 *
 * PerformanceSummary actions
 *
 */

import {
    BRAND_BUBBLE_BUTTON,
    BRAND_BUBBLE_FAIL,
    BRAND_BUBBLE_FETCH,
    BRAND_BUBBLE_SUCCESS,
    BRAND_BUBBLE_TIME_FILTER,
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
    DISTRIBUTOR_TABLE_BUTTONS,
    DISTRIBUTOR_TABLE_FAIL,
    DISTRIBUTOR_TABLE_FETCH,
    DISTRIBUTOR_TABLE_FILTER,
    DISTRIBUTOR_TABLE_SUCCESS,
    GUIDED_INSIGHTS_BUTTON,
    GUIDED_INSIGHTS_FAIL,
    GUIDED_INSIGHTS_FETCH,
    GUIDED_INSIGHTS_FILTER,
    GUIDED_INSIGHTS_SUCCESS,
    GUIDED_INSIGHTS_TOGGLE,
    GUIDED_INSIGHTS_TYPE_FILTER,
    INVOICE_TOGGLE,
    SALES_STRIKE_CARDS_DATA_FAIL,
    SALES_STRIKE_CARDS_DATA_FETCH,
    SALES_STRIKE_CARDS_DATA_SUCCESS,
    SELECTED_CATEGORY,
    SELECTED_CATEGORY_COMPARISON,
    TOGGLE_CARD,
    TRENDS_LINE_FAIL,
    TRENDS_LINE_FETCH,
    TRENDS_LINE_SUCCESS,
    UNITS_TOGGLE,
    YEAR_PERIOD_FILTER_FAIL,
    YEAR_PERIOD_FILTER_FETCH,
    YEAR_PERIOD_FILTER_SUCCESS,
    YEAR_PERIOD_SELECTED_FILTER
} from "./constants";

export function defaultAction() {
    return {
        type: DEFAULT_ACTION
    };
}

// brand bubble

export function brandBubbleFetch() {
    return {
        type: BRAND_BUBBLE_FETCH
    };
}

export function brandBubbleSuccess(data) {
    return {
        type: BRAND_BUBBLE_SUCCESS,
        data
    };
}

export function brandBubbleFail() {
    return {
        type: BRAND_BUBBLE_FAIL
    };
}

export function brandBubbleTimeFilterOnChange(data) {
    return {
        type: BRAND_BUBBLE_TIME_FILTER,
        data
    };
}

export function brandBubbleButtonOnChange(data) {
    return {
        type: BRAND_BUBBLE_BUTTON,
        data
    };
}

// distributor table

export function distributorTableFetch() {
    return {
        type: DISTRIBUTOR_TABLE_FETCH
    };
}

export function distributorTableSuccess(data) {
    return {
        type: DISTRIBUTOR_TABLE_SUCCESS,
        data
    };
}

export function distributorTableFail() {
    return {
        type: DISTRIBUTOR_TABLE_FAIL
    };
}

export function distributorButtonsOnChange(data) {
    return {
        type: DISTRIBUTOR_TABLE_BUTTONS,
        data
    };
}

export function distributorFilterOnChange(data) {
    return {
        type: DISTRIBUTOR_TABLE_FILTER,
        data
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

//guided insights
export function guidedInsightsFetch() {
    return {
        type: GUIDED_INSIGHTS_FETCH,
    };
}

export function guidedInsightsSuccess(data) {
    return {
        type: GUIDED_INSIGHTS_SUCCESS,
        data
    };
}

export function guidedInsightsFail() {
    return {
        type: GUIDED_INSIGHTS_FAIL
    };
}

export function guidedInsightsFilterOnChange(data) {
    return {
        type: GUIDED_INSIGHTS_FILTER,
        data
    };
}

export function guidedInsightsButtonOnChange(data) {
    return {
        type: GUIDED_INSIGHTS_BUTTON,
        data
    };
}

export function guidedInsightsTypeFilterOnChange(data) {
    return {
        type: GUIDED_INSIGHTS_TYPE_FILTER,
        data
    };
}

export function guidedInsightsToggle(data) {
    return {
        type: GUIDED_INSIGHTS_TOGGLE,
        data
    };
}
//guided insights time period filter

export function yearPeriodFilterFetch() {
    return {
        type: YEAR_PERIOD_FILTER_FETCH
    };
}

export function yearPeriodFilterSuccess(data) {
    return {
        type: YEAR_PERIOD_FILTER_SUCCESS,
        data
    };
}

export function yearPeriodFilterFail() {
    return {
        type: YEAR_PERIOD_FILTER_FAIL
    };
}

export function yearPeriodFilterOnChange(data) {
    return {
        type: YEAR_PERIOD_SELECTED_FILTER,
        data
    };
}
