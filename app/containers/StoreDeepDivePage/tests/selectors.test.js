import { selectStoreDeepDivePageDomain,
  makeSelectParetoAnalysisFilter,
  makeSelectParetoAnalysisSuccess,
  makeSelectProductAnalysisButton,
  makeSelectProductAnalysisSuccess,
  makeSelectProductDistributionButton,
  makeSelectProductDistributionSuccess,
  makeSelectPurchaseAnalysisSuccess,
  makeSelectSalesPerformanceSuccess,
  makeSelectStoreProductTopFilter } from '../selectors';
import {makeSelectBrandBubbleFail} from "../../PerformanceSummary/selectors";

describe("selectStoreDeepDivePageDomain", () => {
  const mockParameters = { //sales performance
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
  }
      it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it("Expect makeSelectParetoAnalysisFilter to return state", () => {
    const selected = makeSelectParetoAnalysisFilter().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.paretoAnalysisButton)
  });

  it("Expect makeSelectParetoAnalysisSuccess to return state", () => {
    const selected = makeSelectParetoAnalysisSuccess().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.paretoAnalysisData)
  });

  it("Expect makeSelectProductAnalysisButton to return state", () => {
    const selected = makeSelectProductAnalysisButton().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.productAnalysisFilter)
  });

  it("Expect makeSelectProductAnalysisSuccess to return state", () => {
    const selected = makeSelectProductAnalysisSuccess().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.productAnalysisData)
  });

  it("Expect makeSelectProductDistributionButton to return state", () => {
    const selected = makeSelectProductDistributionButton().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.productDistributionButton)
  });

  it("Expect makeSelectProductDistributionSuccess to return state", () => {
    const selected = makeSelectProductDistributionSuccess().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.productDistributionData)
  });

  it("Expect makeSelectPurchaseAnalysisSuccess to return state", () => {
    const selected = makeSelectPurchaseAnalysisSuccess().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.purchaseAnalysisData)
  });

  it("Expect makeSelectSalesPerformanceSuccess to return state", () => {
    const selected = makeSelectSalesPerformanceSuccess().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.salesPerformanceData)
  });

  it("Expect makeSelectStoreProductTopFilter to return state", () => {
    const selected = makeSelectStoreProductTopFilter().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.storeProductTopFilter)
  });

});
