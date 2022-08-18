/*
 *
 * productDeepDivePage reducer
 *
 */
import produce from "immer";
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
    UNITS_TOGGLE,
} from "./constants";
import {TransformBrandDeepDiveCardsData,} from "../../utils/utility";

export const initialState = {
    // cards data
    cardsData: {},
    sampleCardsTransformedData: [{
        title: 'Invoice',
        valueTY: '$ 960000',
        valueLY: '$ 2220053',
        currentYear: 2020,
        change: '$ 100000'
    },
        {title: 'Units', valueTY: '45000', valueLY: 45652, currentYear: 2020, change: '75000'},
        {title: 'Weeks Of Stock', valueTY: 9, valueLY: 12, currentYear: 2020, change: '10'},
        {title: 'Point of Sales', valueTY: '300', valueLY: '55', currentYear: 2020},],
    cardsTransformedData: [],
    cardsDataFail: false,
    cardsDataSpinnerState: false,
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

    /// see trends line-old
    seeTrendLineData: [],
    seeTrendLineFail: false,
    seeTrendLineSpinnerState: true,

    // product/sku trend graph
    productWholeData: [],
    productTrendData: {
        xAxis: [],
        series: []
    },
    productTrendDataFail: false,
    productTrendDataSpinnerState: true,

    productTrendButton: "brand",
    productTrendFilter: "Top 10",
    productTrendUomFilter: "Invoice",
    //product/sku filter

    productSkuTrendFilterData: [],
    productSkuTrendFilterFail: false,
    productSkuTrendFilterSpinnerState: true,
    selectedProductSkuTrendFilter: [],


    // item heatmap graph
    itemHeatMapData: [],
    itemHeatMapDataFail: false,
    itemHeatMapDataSpinnerState: true,

    itemHeatMapButton: "Invoice",
    itemHeatMapFilter: "Actual",
    itemHeatMapTimeFilter: "Period",
    itemHeatMapPartitionFilter: "Product",

    // sku table
    skuTableData: [],
    skuTableDataFail: false,
    skuTableDataSpinnerState: false,
    skuFilter: "Deselect",


};

/* eslint-disable default-case, no-param-reassign */
const productDeepDivePageReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case DEFAULT_ACTION:
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
                draft.cardsTransformedData = TransformBrandDeepDiveCardsData(draft.cardsData, action.data.units, action.data.invoice);
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

            case CATEGORY_COMPARISON_FILTER_FETCH:
                draft.categoryComparisonFilterSpinnerState = true;
                draft.categoryComparisonFilterFail = false;
                break;
            case CATEGORY_COMPARISON_FILTER_SUCCESS:
                draft.categoryComparisonFilterSpinnerState = false;
                draft.categoryComparisonFilterData = action.data;
                draft.categoryComparisonFilterFail = false;
                break;
            case CATEGORY_COMPARISON_FILTER_FAIL:
                draft.categoryComparisonFilterSpinnerState = false;
                draft.categoryComparisonFilterFail = true;
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
            case PRODUCT_TREND_FETCH:
                draft.productTrendDataSpinnerState = true;
                draft.productTrendDataFail = false;
                break;
            case PRODUCT_TREND_SUCCESS:
                draft.productTrendDataSpinnerState = false;
                draft.productTrendData = action.data;
                draft.productTrendDataFail = false;
                break;
            case PRODUCT_TREND_FAIL:
                draft.productTrendDataSpinnerState = false;
                draft.productTrendDataFail = true;
                break;
            case PRODUCT_BUTTON_VS:
                draft.productTrendButton = action.data;
                break;
            case PRODUCT_TREND_FILTER:
                draft.productTrendFilter = action.data;
                break;
            case PRODUCT_UOM_FILTER:
                draft.productTrendUomFilter = action.data;
                break;
            case PRODUCT_SKU_TREND_FILTER_FETCH:
                draft.productSkuTrendFilterSpinnerState = true;
                draft.productSkuTrendFilterFail = false;
                break;
            case PRODUCT_SKU_TREND_FILTER_SUCCESS:
                draft.productSkuTrendFilterSpinnerState = false;
                draft.productSkuTrendFilterFail = false;
                draft.productSkuTrendFilterData = action.data;
                break;
            case PRODUCT_SKU_TREND_FILTER_FAIL:
                draft.productSkuTrendFilterSpinnerState = false;
                draft.productSkuTrendFilterFail = true;
                break;
            case PRODUCT_SKU_TREND_FILTER_SELECTED_FILTER:
                draft.selectedProductSkuTrendFilter = action.data;
                break;
            case ITEM_HEATMAP_FETCH:
                draft.itemHeatMapDataSpinnerState = true;
                draft.itemHeatMapDataFail = false;
                break;
            case ITEM_HEATMAP_SUCCESS:
                draft.itemHeatMapDataSpinnerState = false;
                draft.itemHeatMapData = action.data;
                draft.itemHeatMapDataFail = false;
                break;
            case ITEM_HEATMAP_FAIL:
                draft.itemHeatMapDataSpinnerState = false;
                draft.itemHeatMapDataFail = true;
                break;
            case ITEM_HEATMAP_BUTTON:
                draft.itemHeatMapButton = action.data;
                break;
            case ITEM_HEATMAP_FILTER:
                draft.itemHeatMapFilter = action.data;
                break;
            case ITEM_HEATMAP_TIME_FILTER:
                draft.itemHeatMapTimeFilter = action.data;
                break;
            case ITEM_HEATMAP_PARTITION_FILTER:
                draft.itemHeatMapPartitionFilter = action.data;
                break;
            case SKU_TABLE_FETCH:
                draft.skuTableDataSpinnerState = true;
                draft.skuTableDataFail = false;
                break;
            case SKU_TABLE_SUCCESS:
                draft.skuTableDataSpinnerState = false;
                draft.skuTableData = action.data;
                draft.skuTableDataFail = false;
                break;
            case SKU_TABLE_FAIL:
                draft.skuTableDataSpinnerState = false;
                draft.skuTableDataFail = true;
                break;
            case SKU_TABLE_FILTER:
                draft.skuFilter = action.data;
                break;
        }
    });

export default productDeepDivePageReducer;
