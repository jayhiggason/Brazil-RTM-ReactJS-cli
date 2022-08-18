// import produce from 'immer';
import performanceSummaryReducer from "../reducer";
import {toggleCard,
  categoryComparisonOnChange,
  cardDataFail,
  cardDataFetch,
  cardDataSuccess,
  categoryComparisonFilterFail,
  categoryComparisonFilterFetch,
  categoryComparisonFilterSuccess,
  categoryFilterFail,
  categoryFilterFetch,
  categoryFilterSuccess,
  categoryOnChange,
  invoiceToggle,
  seeTrendLineFail,
  seeTrendLineFetch,
  seeTrendLineSuccess,
  unitsToggle,
  distributorTableSuccess,
  distributorTableFetch,
  distributorTableFail,
  distributorButtonsOnChange,
  brandBubbleTimeFilterOnChange,
  brandBubbleFetch,
  brandBubbleSuccess,
  brandBubbleFail,
  defaultAction,
  distributorFilterOnChange } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe("performanceSummaryReducer", () => {
  let state;
  beforeEach(() => {
    state = {
      // default state params here
      // brand bubble graph
      brandBubbleData: [],
      brandBubbleDataSpinnerState: true,
      brandBubbleDataFail: false,
      brandBubbleTimeFilter:"Period",
      // distributor table
      distributorTableData: [],
      distributorTableDataFail: false,
      distributorTableDataSpinnerState: true,
      distributorKpiButtons: "Invoice",
      topFilter: "Top 10",
      distributorsPerformanceFilter:{
        topFilter: "Top 10",
        kpiName:"invoice"
      },

      // cards data
      cardsData :{},
      cardsTransformedData: [],
      cardsDataFail: false,
      cardsDataSpinnerState: true,
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
    };
  });

  it("returns the initial state", () => {
    const expectedResult = state;
    expect(performanceSummaryReducer(undefined, {})).toEqual(expectedResult);
  });

  it("returns the correct state for TOGGLE_CARD case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, toggleCard(data))).toMatchSnapshot()
  });

  it("returns the correct state for SELECTED_CATEGORY_COMPARISON case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, categoryComparisonOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for CARDS_DATA_FAIL case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, cardDataFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for CARDS_DATA_FETCH case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, cardDataFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for CARDS_DATA_SUCCESS case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, cardDataSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for CATEGORY_COMPARISON_FILTER_FAIL case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, categoryComparisonFilterFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for CATEGORY_COMPARISON_FILTER_FETCH case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, categoryComparisonFilterFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for CATEGORY_COMPARISON_FILTER_SUCCESS case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, categoryComparisonFilterSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for CATEGORY_FILTER_FAIL case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, categoryFilterFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for CATEGORY_FILTER_FETCH case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, categoryFilterFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for CATEGORY_FILTER_SUCCESS case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, categoryFilterSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for SELECTED_CATEGORY case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, categoryOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for INVOICE_TOGGLE case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, invoiceToggle(data))).toMatchSnapshot()
  });

  it("returns the correct state for TRENDS_LINE_FAIL case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, seeTrendLineFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for TRENDS_LINE_FETCH case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, seeTrendLineFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for TRENDS_LINE_SUCCESS case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, seeTrendLineSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for UNITS_TOGGLE case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, unitsToggle(data))).toMatchSnapshot()
  });

  it("returns the correct state for DISTRIBUTOR_TABLE_SUCCESS case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, distributorTableSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for DISTRIBUTOR_TABLE_FETCH case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, distributorTableFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for DISTRIBUTOR_TABLE_FAIL case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, distributorTableFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for DISTRIBUTOR_TABLE_BUTTONS case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, distributorButtonsOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for BRAND_BUBBLE_TIME_FILTER case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, brandBubbleTimeFilterOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for BRAND_BUBBLE_FETCH case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, brandBubbleFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for BRAND_BUBBLE_SUCCESS case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, brandBubbleSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for BRAND_BUBBLE_FAIL case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, brandBubbleFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for DEFAULT_ACTION case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, defaultAction(data))).toMatchSnapshot()
  });

  it("returns the correct state for DISTRIBUTOR_TABLE_FILTER case", () => {
    const data ='data';
    expect(performanceSummaryReducer(state, distributorFilterOnChange(data))).toMatchSnapshot()
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
