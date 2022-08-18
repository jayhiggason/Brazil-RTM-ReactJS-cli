/*
 *
 * DistributorDeepDivePage reducer
 *
 */
import produce from "immer";
import {
    CHANNEL_PERFORMANCE_BUTTON,
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
import {TransformDistDeepDiveCardsData} from "../../utils/utility";


export const initialState = {
    //dist cards
    cardsData: {},
    distributorCardsData: [],
    distributorCardsDataFail: false,
    distributorCardsDataSpinnerState: false,
    cardToggleState: {
        eos: true,
        invoice: true
    },

    //visit vs sales chart
    visitSalesBubbleData: {
        xAxis: [],
        series: []
    },
    visitSalesBubbleDataSpinnerState: false,
    visitSalesBubbleDataFail: false,
    visitSalesFilter:"Invoice",

    // distributor sales perf graph

    distributorSalesPerformanceData: {xAxis: [], series: []},
    distributorSalesPerformanceDataFail: false,
    distributorSalesPerformanceDataSpinnerState: true,
    distributorSalesPerformanceButton: "target",
    distributorSalesPerformanceKpiButton: "GSV",

    //product perf pareto chart
    productPerformanceData: {
        xAxis: [],
        series: []
    },
    productPerformanceButton: "Invoice",
    productPerformanceDataFail: false,
    productPerformanceDataSpinnerState: true,

    //channel perf chart
    channelPerformanceData: {xAxis: [], series: []},
    channelPerformanceDataFail: false,
    channelPerformanceDataSpinnerState: false,
    channelPerformanceButton: "Invoice",

    channelFilter: "Top 10",
    selectedChannelName: "",
    //store perf chart
    storePerformanceData: {xAxis: [], series: []},
    storePerformanceDataFail: false,
    storePerformanceDataSpinnerState: false,
    storeFilter: "Top 10",
    storePerformanceButton: "Invoice",
    //store table
    storeTableData: [],
    storeTableDataFail: false,
    storeTableDataSpinnerState: true,
    storeTableButton: "Invoice"
};

/* eslint-disable default-case, no-param-reassign */
const distributorDeepDivePageReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case DEFAULT_ACTION:
                break;
            case DISTRIBUTOR_CARDS_DATA_FETCH:
                draft.distributorCardsDataSpinnerState = true;
                draft.distributorCardsDataFail = false;
                break;
            case DISTRIBUTOR_CARDS_DATA_SUCCESS:
                draft.distributorCardsDataSpinnerState = false;
                draft.cardsData = action.data;
                draft.distributorCardsDataFail = false;
                break;
            case DISTRIBUTOR_CARDS_DATA_FAIL:
                draft.distributorCardsDataSpinnerState = false;
                draft.distributorCardsDataFail = true;
                break;
            case TOGGLE_CARD:
                draft.cardToggleState = action.data;
                draft.distributorCardsData = TransformDistDeepDiveCardsData(draft.cardsData, action.data['eos'], action.data['invoice']);
                break;
            case VISIT_SALES_BUBBLE_FETCH:
                draft.visitSalesBubbleDataSpinnerState = true;
                draft.visitSalesBubbleDataFail = false;
                break;
            case VISIT_SALES_BUBBLE_SUCCESS:
                draft.visitSalesBubbleDataSpinnerState = false;
                draft.visitSalesBubbleData = action.data;
                draft.visitSalesBubbleDataFail = false;
                break;
            case VISIT_SALES_BUBBLE_FAIL:
                draft.visitSalesBubbleDataSpinnerState = false;
                draft.visitSalesBubbleDataFail = true;
                break;
            case VISIT_SALES_BUBBLE_FILTER:
                draft.visitSalesFilter = action.data;
                break;
            case CHANNEL_PERFORMANCE_FETCH:
                draft.channelPerformanceDataSpinnerState = true;
                draft.channelPerformanceDataFail = false;
                break;
            case CHANNEL_PERFORMANCE_SUCCESS:
                draft.channelPerformanceDataSpinnerState = false;
                draft.channelPerformanceData = action.data;
                draft.channelPerformanceDataFail = false;
                break;
            case CHANNEL_PERFORMANCE_FAIL:
                draft.channelPerformanceDataSpinnerState = false;
                draft.channelPerformanceDataFail = true;
                break;
            case CHANNEL_PERFORMANCE_FILTER:
                draft.channelFilter = action.data;
                break;
            case CHANNEL_PERFORMANCE_BUTTON:
                draft.channelPerformanceButton = action.data;
                break;
            case STORE_PERFORMANCE_FETCH:
                draft.storePerformanceDataSpinnerState = true;
                draft.storePerformanceDataFail = false;
                draft.selectedChannelName = action.data;
                break;
            case STORE_PERFORMANCE_SUCCESS:
                draft.storePerformanceDataSpinnerState = false;
                draft.storePerformanceData = action.data;
                draft.storePerformanceDataFail = false;
                break;
            case STORE_PERFORMANCE_FAIL:
                draft.storePerformanceDataSpinnerState = false;
                draft.storePerformanceDataFail = true;
                break;
            case STORE_PERFORMANCE_FILTER:
                draft.storeFilter = action.data;
                break;
            case STORE_PERFORMANCE_BUTTON:
                draft.storePerformanceButton = action.data;
                break;
            case DISTRIBUTOR_SALES_PERFORMANCE_FETCH:
                draft.distributorSalesPerformanceDataSpinnerState = true;
                draft.distributorSalesPerformanceDataFail = false;
                break;
            case DISTRIBUTOR_SALES_PERFORMANCE_SUCCESS:
                draft.distributorSalesPerformanceDataSpinnerState = false;
                draft.distributorSalesPerformanceData = action.data;
                draft.distributorSalesPerformanceDataFail = false;
                break;
            case DISTRIBUTOR_SALES_PERFORMANCE_FAIL:
                draft.distributorSalesPerformanceDataSpinnerState = false;
                draft.distributorSalesPerformanceDataFail = true;
                break;
            case DISTRIBUTOR_SALES_PERFORMANCE_BUTTON_VS:
                draft.distributorSalesPerformanceButton = action.data;
                break;
            case DISTRIBUTOR_SALES_PERFORMANCE_KPI_BUTTON:
                draft.distributorSalesPerformanceKpiButton = action.data;
                break;
            case PRODUCT_PERFORMANCE_FETCH:
                draft.productPerformanceDataSpinnerState = true;
                draft.productPerformanceDataFail = false;
                break;
            case PRODUCT_PERFORMANCE_SUCCESS:
                draft.productPerformanceDataSpinnerState = false;
                draft.productPerformanceData = action.data;
                draft.productPerformanceDataFail = false;
                break;
            case PRODUCT_PERFORMANCE_FAIL:
                draft.productPerformanceDataSpinnerState = false;
                draft.productPerformanceDataFail = true;
                break;
            case PRODUCT_PERFORMANCE_BUTTON:
                draft.productPerformanceButton = action.data;
                break;
            case STORE_TABLE_FETCH:
                draft.storeTableDataSpinnerState = true;
                draft.storeTableDataFail = false;
                break;
            case STORE_TABLE_SUCCESS:
                draft.storeTableDataSpinnerState = false;
                draft.storeTableData = action.data;
                draft.storeTableDataFail = false;
                break;
            case STORE_TABLE_FAIL:
                draft.storeTableDataSpinnerState = false;
                draft.storeTableDataFail = true;
                break;
            case STORE_TABLE_BUTTON:
                draft.storeTableButton = action.data;
                break;
        }
    });

export default distributorDeepDivePageReducer;
