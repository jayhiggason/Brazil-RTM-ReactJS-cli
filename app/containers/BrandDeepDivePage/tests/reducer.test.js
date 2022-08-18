// import produce from 'immer';
import brandDeepDivePageReducer from "../reducer";
import {unitsToggle,
  seeTrendLineSuccess,
  seeTrendLineFetch,
  seeTrendLineFail,
  invoiceToggle,
  categoryOnChange,
  categoryFilterSuccess,
  categoryFilterFetch,
  categoryFilterFail,
  categoryComparisonFilterSuccess,
  categoryComparisonFilterFetch,
  categoryComparisonFilterFail,
  cardDataSuccess,
  cardDataFetch,
  cardDataFail,
  categoryComparisonOnChange,
  toggleCard,
  skuTableSuccess,
  skuTableFetch,
  skuTableFail,
  skuFilterOnChange,
  productTrendUomFilterOnChange,
  productTrendSuccess,
  productTrendFilterOnChange,
  productTrendFetch,
  productTrendFail,
  productTrendClickOnChange,
  productSkuTrendFilterSuccess,
  productSkuTrendFilterOnChange,
  productSkuTrendFilterFetch,
  productSkuTrendFilterFail,
  itemTimeFilterHeatmapOnChange,
  itemHeatSuccess,
  itemHeatmapButtonOnChange,
  itemHeatFetch,
  itemHeatFail,
  itemFilterHeatmapOnChange } from '../actions';
import brandViewReducer from "../../BrandView/reducer";
import {topFilterHeatmapOnChange} from "../../BrandView/actions";

/* eslint-disable default-case, no-param-reassign */
describe("brandDeepDivePageReducer", () => {
  let state;
  beforeEach(() => {
    state = {
      // default state params here
      // cards data
      cardsData :{},
      sampleCardsTransformedData:[ { title: 'Invoice', valueTY: '$ 960000', valueLY: '$ 2220053', currentYear: 2020, change: '$ 100000' },
        { title: 'Units', valueTY: '45000', valueLY: 45652, currentYear: 2020, change: '75000' },
        { title: 'Weeks Of Stock', valueTY: 9, valueLY: 12, currentYear: 2020, change: '10' },
        { title: 'Point of Sales', valueTY: '300', valueLY: '55', currentYear: 2020 },],
      cardsTransformedData: [],
      cardsDataFail: false,
      cardsDataSpinnerState: false,
      invoiceToggle: true,
      unitsToggle: true,
      cardToggleState:{
        invoice:true,
        units:true
      },

      // see trends filter
      categoryKpiList:["brand","category","distributor"],
      selectedCategoryKpi: "brand",
      categoryFilterData: [],
      categorySelectedFilterData:[],
      categoryFilterFail: false,
      categoryFilterSpinnerState: true,

      // see trends line
      kpiCard:"",
      trendLineData: {
        xAxis:[],
        series:[]
      },
      trendLineFail: false,
      trendLineSpinnerState: true,

      /// see trends line-old
      seeTrendLineData: [],
      seeTrendLineFail: false,
      seeTrendLineSpinnerState: true,

      // product/sku trend graph
      productWholeData:[],
      productTrendData: [],
      productTrendDataFail: false,
      productTrendDataSpinnerState: true,

      productTrendButton: "brand",
      productTrendFilter: "Top 10",
      productTrendUomFilter:"Invoice",
      //product/sku filter

      productSkuTrendFilterData:[],
      productSkuTrendFilterFail: false,
      productSkuTrendFilterSpinnerState: true,
      selectedProductSkuTrendFilter: [],


      // item heatmap graph
      itemHeatMapData: [],
      itemHeatMapDataFail: false,
      itemHeatMapDataSpinnerState: true,

      itemHeatMapButton: "Invoice",
      itemHeatMapFilter: "Actual",
      itemHeatMapTimeFilter:"Period",

      // sku table
      skuTableData: {},
      skuTableDataFail: true,
      skuTableDataSpinnerState: false,
      skuFilter: "",


    };
  });

  it("returns the initial state", () => {
    const expectedResult = state;
    expect(brandDeepDivePageReducer(undefined, {})).toEqual(expectedResult);
  });

  it("returns the correct state for UNITS_TOGGLE case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, unitsToggle(data))).toMatchSnapshot()
  });

  it("returns the correct state for TRENDS_LINE_SUCCESS case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, seeTrendLineSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for TRENDS_LINE_FETCH case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, seeTrendLineFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for TRENDS_LINE_FAIL case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, seeTrendLineFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for INVOICE_TOGGLE case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, invoiceToggle(data))).toMatchSnapshot()
  });

  it("returns the correct state for SELECTED_CATEGORY case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, categoryOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for CATEGORY_FILTER_SUCCESS case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, categoryFilterSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for CATEGORY_FILTER_FETCH case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, categoryFilterFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for CATEGORY_FILTER_FAIL case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, categoryFilterFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for CATEGORY_COMPARISON_FILTER_SUCCESS case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, categoryComparisonFilterSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for CATEGORY_COMPARISON_FILTER_FETCH case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, categoryComparisonFilterFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for CATEGORY_COMPARISON_FILTER_FAIL case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, categoryComparisonFilterFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for CARDS_DATA_SUCCESS case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, cardDataSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for CARDS_DATA_FETCH case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, cardDataFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for CARDS_DATA_FAIL case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, cardDataFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for SELECTED_CATEGORY_COMPARISON case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, categoryComparisonOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for TOGGLE_CARD case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, toggleCard(data))).toMatchSnapshot()
  });

  it("returns the correct state for SKU_TABLE_SUCCESS case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, skuTableSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for SKU_TABLE_FETCH case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, skuTableFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for SKU_TABLE_FAIL case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, skuTableFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for SKU_TABLE_FILTER case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, skuFilterOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_UOM_FILTER case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, productTrendUomFilterOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_TREND_SUCCESS case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, productTrendSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_TREND_FILTER case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, productTrendFilterOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_TREND_FETCH case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, productTrendFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_TREND_FAIL case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, productTrendFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_BUTTON_VS case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, productTrendClickOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_SKU_TREND_FILTER_SUCCESS case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, productSkuTrendFilterSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_SKU_TREND_FILTER_SELECTED_FILTER case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, productSkuTrendFilterOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_SKU_TREND_FILTER_FETCH case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, productSkuTrendFilterFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_SKU_TREND_FILTER_FAIL case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, productSkuTrendFilterFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for ITEM_HEATMAP_TIME_FILTER case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, itemTimeFilterHeatmapOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for ITEM_HEATMAP_TIME_FILTER case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, itemTimeFilterHeatmapOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for ITEM_HEATMAP_SUCCESS case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, itemHeatSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for ITEM_HEATMAP_BUTTON case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, itemHeatmapButtonOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for ITEM_HEATMAP_FETCH case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, itemHeatFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for ITEM_HEATMAP_FAIL case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, itemHeatFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for ITEM_HEATMAP_FILTER case", () => {
    const data ='data';
    expect(brandDeepDivePageReducer(state, itemFilterHeatmapOnChange(data))).toMatchSnapshot()
  });

  /**
   * Example state change comparison
   *
   * it('should handle the someAction action correctly', () => {
   *   const expectedResult = produce(state, draft => {
   *     draft.loading = true;
   *     draft.error = false;
   *     draft.userData.nested = false;
   *   });
   *
   *   expect(appReducer(state, someAction())).toEqual(expectedResult);
   * });
   */
});
