/*
 *
 * StoreDeepDivePage reducer
 *
 */
import produce from "immer";
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

export const initialState = {

    //sales performance
    salesWholeData: [],
    salesPerformanceData: [],
    salesPerformanceDataSpinnerState: true,
    salesPerformanceDataFail: false,
    salesPerformanceButton: "Invoice",
    //purchase analysis
    purchaseAnalysisData: [],
    purchaseAnalysisDataSpinnerState: true,
    purchaseAnalysisDataFail: false,
    purchaseAnalysisButton:"Invoice",
//PURCHASE ANALYSIS BEST PRODUCT MIX
    purchaseAnalysisBestMixData: [],
    purchaseAnalysisBestMixDataSpinnerState: true,
    purchaseAnalysisBestMixDataFail: false,
    //pareto analysis:
    paretoAnalysisData: {
        xAxis: [], series: []
    },
    paretoAnalysisDataSpinnerState: true,
    paretoAnalysisDataFail: false,
    paretoAnalysisButton: "Invoice",
    // paretoAnalysisFilter: "Invoice",

    //product analysis
    productAnalysisData: [],
    productAnalysisDataSpinnerState: true,
    productAnalysisDataFail: false,
    productAnalysisFilter: "Top 10",
    productAnalysisKpiButton:"Invoice",

    //product distribution
    productDistributionData: {
        xAxis: [], series: []
    },
    productDistributionDataSpinnerState: true,
    productDistributionDataFail: false,
    productDistributionButton: "Invoice",
    storeProductTopFilter: "Top 10",


};

/* eslint-disable default-case, no-param-reassign */
const storeDeepDivePageReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case DEFAULT_ACTION:
                break;
            case SALES_PERFORMANCE_FETCH:
                draft.salesPerformanceDataSpinnerState = true;
                draft.salesPerformanceDataFail = false;
                break;
            case SALES_PERFORMANCE_SUCCESS:
                draft.salesPerformanceDataSpinnerState = false;
                draft.salesPerformanceData = action.data;
                draft.salesPerformanceDataFail = false;
                break;
            case SALES_PERFORMANCE_FAIL:
                draft.salesPerformanceDataSpinnerState = false;
                draft.salesPerformanceDataFail = true;
                break;
            case SALES_PERFORMANCE_BUTTON:
                draft.salesPerformanceButton = action.data;
                break;
            case PURCHASE_ANALYSIS_FETCH:
                draft.purchaseAnalysisDataSpinnerState = true;
                draft.purchaseAnalysisDataFail = false;
                break;
            case PURCHASE_ANALYSIS_SUCCESS:
                draft.purchaseAnalysisDataSpinnerState = false;
                draft.purchaseAnalysisData = action.data;
                draft.purchaseAnalysisDataFail = false;
                break;
            case PURCHASE_ANALYSIS_FAIL:
                draft.purchaseAnalysisDataSpinnerState = false;
                draft.purchaseAnalysisDataFail = true;
                break;
            case PURCHASE_ANALYSIS_BUTTON:
                draft.purchaseAnalysisButton = action.data;
                break;
            case PURCHASE_ANALYSIS_BEST_MIX_FETCH:
                draft.purchaseAnalysisBestMixDataSpinnerState = true;
                draft.purchaseAnalysisBestMixDataFail = false;
                break;
            case PURCHASE_ANALYSIS_BEST_MIX_SUCCESS:
                draft.purchaseAnalysisBestMixDataSpinnerState = false;
                draft.purchaseAnalysisBestMixData = action.data;
                draft.purchaseAnalysisBestMixDataFail = false;
                break;
            case PURCHASE_ANALYSIS_BEST_MIX_FAIL:
                draft.purchaseAnalysisBestMixDataSpinnerState = false;
                draft.purchaseAnalysisBestMixDataFail = true;
                break;
            case PARETO_ANALYSIS_FETCH:

                draft.paretoAnalysisDataSpinnerState = true;
                draft.paretoAnalysisDataFail = false;
                break;
            case PARETO_ANALYSIS_SUCCESS:

                draft.paretoAnalysisDataSpinnerState = false;
                draft.paretoAnalysisData = action.data;
                draft.paretoAnalysisDataFail = false;
                break;
            case PARETO_ANALYSIS_FAIL:
                draft.paretoAnalysisDataSpinnerState = false;
                draft.paretoAnalysisDataFail = true;
                break;
            case PARETO_ANALYSIS_FILTER:
                draft.paretoAnalysisButton = action.data;
                break;
            case PRODUCT_ANALYSIS_FETCH:
                draft.productAnalysisDataSpinnerState = true;
                draft.productAnalysisDataFail = false;
                break;
            case PRODUCT_ANALYSIS_SUCCESS:
                draft.productAnalysisDataSpinnerState = false;
                draft.productAnalysisData = action.data;
                draft.productAnalysisDataFail = false;
                break;
            case PRODUCT_ANALYSIS_FAIL:
                draft.productAnalysisDataSpinnerState = false;
                draft.productAnalysisDataFail = true;
                break;
            case PRODUCT_ANALYSIS_BUTTON:
                draft.productAnalysisFilter = action.data;
                break;
            case PRODUCT_ANALYSIS_KPI_BUTTON:
                draft.productAnalysisKpiButton = action.data;
                break;
            case PRODUCT_DISTRIBUTION_FETCH:
                draft.productDistributionDataSpinnerState = true;
                draft.productDistributionDataFail = false;
                break;
            case PRODUCT_DISTRIBUTION_SUCCESS:

                draft.productDistributionDataSpinnerState = false;
                draft.productDistributionData = action.data;
                draft.productDistributionDataFail = false;
                break;
            case PRODUCT_DISTRIBUTION_FAIL:
                draft.productDistributionDataSpinnerState = false;
                draft.productDistributionDataFail = true;
                break;
            case PRODUCT_DISTRIBUTION_BUTTON:
                draft.productDistributionButton = action.data;
                break;
            case PRODUCT_DISTRIBUTION_FILTER:
                draft.storeProductTopFilter = action.data;
                break;
        }
    });

export default storeDeepDivePageReducer;
