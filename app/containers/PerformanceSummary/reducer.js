/*
 *
 * PerformanceSummary reducer
 *
 */
import produce from "immer";
import {
    BRAND_BUBBLE_BUTTON,
    BRAND_BUBBLE_FAIL,
    BRAND_BUBBLE_FETCH,
    BRAND_BUBBLE_SUCCESS,
    BRAND_BUBBLE_TIME_FILTER,
    CARDS_DATA_FAIL,
    CARDS_DATA_FETCH,
    CARDS_DATA_SUCCESS,
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
import {TransformPerformanceSummaryCardsData} from "../../utils/utility";

export const initialState = {

    // brand bubble graph
    brandBubbleData: {data: [], xMin: 20, XMax: 30, yMax: 30, yMin: 50},
    brandBubbleDataSpinnerState: true,
    brandBubbleDataFail: false,
    brandBubbleTimeFilter: "Period",
    brandBubbleButton:"GSV",
    // distributor table
    distributorTableData: [],
    distributorTableDataFail: false,
    distributorTableDataSpinnerState: true,
    distributorKpiButtons: "Invoice",
    topFilter: "Top 10",
    distributorsPerformanceFilter: {
        topFilter: "Top 10",
        kpiName: "invoice"
    },

    // cards data
    cardsData: {},
    cardsTransformedData: [],
    cardsDataFail: false,
    cardsDataSpinnerState: true,
    invoiceToggle: true,
    unitsToggle: true,
    cardToggleState: {
        invoice: true,
        units: true
    },


    // see trends filter
    categoryKpiList: ["brand", "category", "distributor"],
    selectedCategoryKpi: "brand",
    categoryFilterData: [],
    categorySelectedFilterData: [],
    categoryFilterFail: false,
    categoryFilterSpinnerState: true,

    // see trends line
    kpiCard: "",
    trendLineData: {
        xAxis: [],
        series: []
    },
    trendLineFail: false,
    trendLineSpinnerState: true,

//GUIDED INSIGHTS
    guidedInsightsData: [],
    guidedInsightsDataFail: false,
    guidedInsightsDataSpinnerState: true,
    guidedInsightsFilter: "Brand",
    guidedInsightsButton: "GSV",
    guidedInsightsTypeFilter: "Growth",
    guidedInsightsToggle: true,

    //GUIDED INSIGHTS YEAR PERIOD FILTER

    yearPeriodFilterData: [],
    yearPeriodFilterFail: false,
    yearPeriodFilterSpinnerState: true,
    selectedYearPeriodFilter: [],

};


/* eslint-disable default-case, no-param-reassign */
const performanceSummaryReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case DEFAULT_ACTION:
                break;
            case BRAND_BUBBLE_FETCH:
                draft.brandBubbleDataSpinnerState = true;
                draft.brandBubbleDataFail = false;
                break;
            case BRAND_BUBBLE_SUCCESS:
                draft.brandBubbleDataSpinnerState = false;
                draft.brandBubbleData = action.data;
                draft.brandBubbleDataFail = false;
                break;
            case BRAND_BUBBLE_FAIL:
                draft.brandBubbleDataSpinnerState = false;
                draft.brandBubbleDataFail = true;
                break;
            case BRAND_BUBBLE_BUTTON:
                draft.brandBubbleButton = action.data;
                break;
            case DISTRIBUTOR_TABLE_FETCH:
                draft.distributorTableDataSpinnerState = true;
                draft.distributorTableDataFail = false;
                break;
            case BRAND_BUBBLE_TIME_FILTER:
                draft.brandBubbleTimeFilter = action.data;
                break;
            case DISTRIBUTOR_TABLE_SUCCESS:
                draft.distributorTableDataSpinnerState = false;
                draft.distributorTableData = action.data;
                draft.distributorTableDataFail = false;
                break;
            case DISTRIBUTOR_TABLE_FAIL:
                draft.distributorTableDataSpinnerState = false;
                draft.distributorTableDataFail = true;
                break;
            case DISTRIBUTOR_TABLE_BUTTONS:
                draft.distributorKpiButtons = action.data;
                break;
            case DISTRIBUTOR_TABLE_FILTER:
                draft.distributorsPerformanceFilter = action.data;
                break;
            case CARDS_DATA_FETCH:
                draft.cardsDataSpinnerState = true;
                draft.cardsDataFail = false;
                break;
            case CARDS_DATA_SUCCESS:
                draft.cardsDataSpinnerState = false;
                draft.cardsData = action.data;
                draft.cardsDataFail = false;
                break;
            case CARDS_DATA_FAIL:
                draft.cardsDataSpinnerState = false;
                draft.cardsDataFail = true;
                break;
            case INVOICE_TOGGLE:
                draft.invoiceToggle = action.data;
                break;
            case UNITS_TOGGLE:
                draft.unitsToggle = action.data;
                break;
            case TOGGLE_CARD:
                draft.cardToggleState = action.data;
                draft.cardsTransformedData = TransformPerformanceSummaryCardsData(draft.cardsData, action.data.units, action.data.invoice);
                break;
            case CATEGORY_FILTER_FETCH:
                draft.categoryFilterData = [];
                draft.categorySelectedFilterData = [];
                draft.categoryFilterSpinnerState = true;
                draft.categoryFilterFail = false;
                break;
            case CATEGORY_FILTER_SUCCESS:
                draft.categoryFilterSpinnerState = false;
                draft.categoryFilterData = action.data;
                draft.categoryFilterFail = false;
                break;
            case CATEGORY_FILTER_FAIL:
                draft.categoryFilterSpinnerState = false;
                draft.categoryFilterFail = true;
                break;

            case SELECTED_CATEGORY:
                draft.categoryFilterData = [];
                draft.categorySelectedFilterData = [];
                draft.categoryFilterSpinnerState = true;
                draft.categoryFilterFail = false;
                draft.selectedCategoryKpi = action.data;
                break;

            case SELECTED_CATEGORY_COMPARISON:
                draft.categorySelectedFilterData = action.data;
                break;
            case TRENDS_LINE_FETCH:
                draft.kpiCard = action.data;
                draft.trendLineSpinnerState = true;
                draft.trendLineFail = false;
                break;
            case TRENDS_LINE_SUCCESS:
                draft.trendLineSpinnerState = false;
                draft.trendLineData = action.data;
                draft.trendLineFail = false;
                break;
            case TRENDS_LINE_FAIL:
                draft.trendLineSpinnerState = false;
                draft.trendLineFail = true;
                break;
            case GUIDED_INSIGHTS_FETCH:
                draft.guidedInsightsDataSpinnerState = true;
                draft.guidedInsightsDataFail = false;
                break;
            case GUIDED_INSIGHTS_SUCCESS:
                draft.guidedInsightsDataSpinnerState = false;
                draft.guidedInsightsData = action.data.Content;
                draft.yearPeriodFilterData = action.data['YearPeriod'];
                draft.guidedInsightsDataFail = false;
                break;
            case GUIDED_INSIGHTS_FAIL:
                draft.guidedInsightsDataSpinnerState = false;
                draft.guidedInsightsDataFail = true;
                break;
            case GUIDED_INSIGHTS_BUTTON:
                draft.guidedInsightsButton = action.data;
                break;
            case GUIDED_INSIGHTS_FILTER:
                draft.guidedInsightsFilter = action.data;
                break;
            case GUIDED_INSIGHTS_TYPE_FILTER:
                draft.guidedInsightsTypeFilter = action.data;
                break;
            case YEAR_PERIOD_FILTER_FETCH:
                draft.yearPeriodFilterSpinnerState = true;
                draft.yearPeriodFilterFail = false;
                break;
            case YEAR_PERIOD_FILTER_SUCCESS:
                draft.yearPeriodFilterSpinnerState = false;
                draft.yearPeriodFilterFail = false;
                draft.yearPeriodFilterData = action.data;
                break;
            case YEAR_PERIOD_FILTER_FAIL:
                draft.yearPeriodFilterSpinnerState = false;
                draft.yearPeriodFilterFail = true;
                break;
            case YEAR_PERIOD_SELECTED_FILTER:
                draft.selectedYearPeriodFilter = action.data;
                break;
            case GUIDED_INSIGHTS_TOGGLE:
                draft.guidedInsightsToggle = action.data;
                break;
        }
    });

export default performanceSummaryReducer;
