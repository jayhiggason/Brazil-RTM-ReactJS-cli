// import produce from 'immer';
import storeDeepDivePageReducer from "../reducer";
import {storeProductTopFilterOnChange,
  salesPerformanceSuccess,
  salesPerformanceFetch,
  salesPerformanceFail,
  purchaseAnalysisSuccess,
  purchaseAnalysisFetch,
  purchaseAnalysisFail,
  productDistributionSuccess,
  productDistributionFetch,
  productDistributionFail,
  productDistributionButtonChange,
  productAnalysisSuccess,
  productAnalysisFetch,
  productAnalysisFail,
  productAnalysisButtonChange,
  paretoAnalysisSuccess,
  paretoAnalysisFilterChange,
  paretoAnalysisFetch,
  paretoAnalysisFail } from '../actions';
import distributorDeepDivePageReducer from "../../DistributorDeepDivePage/reducer";
import {distributorSalesPerformanceSuccess} from "../../DistributorDeepDivePage/actions";

/* eslint-disable default-case, no-param-reassign */
describe("storeDeepDivePageReducer", () => {
  let state;
  beforeEach(() => {
    state = {
      // default state params here
      //sales performance
      salesWholeData:[],
      salesPerformanceData: [],
      salesPerformanceDataSpinnerState: true,
      salesPerformanceDataFail: false,

      //purchase analysis
      purchaseAnalysisData:[],
      purchaseAnalysisDataSpinnerState: true,
      purchaseAnalysisDataFail: false,

      //pareto analysis:
      paretoAnalysisData:[],
      paretoAnalysisDataSpinnerState: true,
      paretoAnalysisDataFail: false,
      paretoAnalysisButton:"Invoice",
      // paretoAnalysisFilter: "Invoice",

      //product analysis
      productAnalysisData:[],
      productAnalysisDataSpinnerState: true,
      productAnalysisDataFail: false,
      productAnalysisFilter: "Top Selling",

      //product distribution
      productDistributionWholeData:[],
      productDistributionData: [],
      productDistributionDataSpinnerState: true,
      productDistributionDataFail: false,
      productDistributionButton:"Invoice",
      storeProductTopFilter:"Top 10",
      // trendChartFilter: {
      //     topFilter: "Top 10",
      //     kpiName:"invoice"
      // },

    };
  });

  it("returns the initial state", () => {
    const expectedResult = state;
    expect(storeDeepDivePageReducer(undefined, {})).toEqual(expectedResult);
  });

  it("returns the correct state for PRODUCT_DISTRIBUTION_FILTER case", () => {
    const data ='data';
    expect(storeDeepDivePageReducer(state, storeProductTopFilterOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_DISTRIBUTION_FILTER case", () => {
    const data ='data';
    expect(storeDeepDivePageReducer(state, storeProductTopFilterOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for SALES_PERFORMANCE_SUCCESS case", () => {
    const data ='data';
    expect(storeDeepDivePageReducer(state, salesPerformanceSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for SALES_PERFORMANCE_FETCH case", () => {
    const data ='data';
    expect(storeDeepDivePageReducer(state, salesPerformanceFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for SALES_PERFORMANCE_FAIL case", () => {
    const data ='data';
    expect(storeDeepDivePageReducer(state, salesPerformanceFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for PURCHASE_ANALYSIS_SUCCESS case", () => {
    const data ='data';
    expect(storeDeepDivePageReducer(state, purchaseAnalysisSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for PURCHASE_ANALYSIS_FETCH case", () => {
    const data ='data';
    expect(storeDeepDivePageReducer(state, purchaseAnalysisFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for PURCHASE_ANALYSIS_FAIL case", () => {
    const data ='data';
    expect(storeDeepDivePageReducer(state, purchaseAnalysisFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_DISTRIBUTION_SUCCESS case", () => {
    const data ='data';
    expect(storeDeepDivePageReducer(state, productDistributionSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_DISTRIBUTION_FETCH case", () => {
    const data ='data';
    expect(storeDeepDivePageReducer(state, productDistributionFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_DISTRIBUTION_FAIL case", () => {
    const data ='data';
    expect(storeDeepDivePageReducer(state, productDistributionFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_DISTRIBUTION_BUTTON case", () => {
    const data ='data';
    expect(storeDeepDivePageReducer(state, productDistributionButtonChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_ANALYSIS_SUCCESS case", () => {
    const data ='data';
    expect(storeDeepDivePageReducer(state, productAnalysisSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_ANALYSIS_FETCH case", () => {
    const data ='data';
    expect(storeDeepDivePageReducer(state, productAnalysisFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_ANALYSIS_FAIL case", () => {
    const data ='data';
    expect(storeDeepDivePageReducer(state, productAnalysisFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_ANALYSIS_BUTTON case", () => {
    const data ='data';
    expect(storeDeepDivePageReducer(state, productAnalysisButtonChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for PARETO_ANALYSIS_SUCCESS case", () => {
    const data ='data';
    expect(storeDeepDivePageReducer(state, paretoAnalysisSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for PARETO_ANALYSIS_FILTER case", () => {
    const data ='data';
    expect(storeDeepDivePageReducer(state, paretoAnalysisFilterChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for PARETO_ANALYSIS_FETCH case", () => {
    const data ='data';
    expect(storeDeepDivePageReducer(state, paretoAnalysisFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for PARETO_ANALYSIS_FAIL case", () => {
    const data ='data';
    expect(storeDeepDivePageReducer(state, paretoAnalysisFail(data))).toMatchSnapshot()
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
