import { defaultAction,
  paretoAnalysisFail,
  paretoAnalysisFetch,
  paretoAnalysisFilterChange,
  paretoAnalysisSuccess,
  productAnalysisButtonChange,
  productAnalysisFail,
  productAnalysisFetch,
  productAnalysisSuccess,
  productDistributionButtonChange,
  productDistributionFail,
  productDistributionFetch,
  productDistributionSuccess,
  purchaseAnalysisFail,
  purchaseAnalysisFetch,
  purchaseAnalysisSuccess,
  salesPerformanceFail,
  salesPerformanceFetch,
  salesPerformanceSuccess,
  storeProductTopFilterOnChange } from "../actions";
import { DEFAULT_ACTION,
  PARETO_ANALYSIS_FAIL,
  PARETO_ANALYSIS_FETCH,
  PARETO_ANALYSIS_FILTER,
  PARETO_ANALYSIS_SUCCESS,
  PRODUCT_ANALYSIS_BUTTON,
  PRODUCT_ANALYSIS_FAIL,
  PRODUCT_ANALYSIS_FETCH,
  PRODUCT_ANALYSIS_SUCCESS,
  PRODUCT_DISTRIBUTION_BUTTON,
  PRODUCT_DISTRIBUTION_FAIL,
  PRODUCT_DISTRIBUTION_FETCH,
  PRODUCT_DISTRIBUTION_SUCCESS,
  PURCHASE_ANALYSIS_FAIL,
  PURCHASE_ANALYSIS_FETCH,
  PURCHASE_ANALYSIS_SUCCESS,
  SALES_PERFORMANCE_FAIL,
  SALES_PERFORMANCE_FETCH,
  SALES_PERFORMANCE_SUCCESS } from "../constants";
import {BRAND_BUBBLE_FAIL, BRAND_BUBBLE_SUCCESS} from "../../PerformanceSummary/constants";
import {brandBubbleFail, brandBubbleSuccess} from "../../PerformanceSummary/actions";

describe("StoreDeepDivePage actions", () => {
  describe("Default Action", () => {
    it("has a type of DEFAULT_ACTION", () => {
      const expected = {
        type: DEFAULT_ACTION
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("salesPerformanceFetch", () => {   //mention action name
  it("has a type of SALES_PERFORMANCE_FETCH", () => {   // mention const name
    const expected = {
      type: SALES_PERFORMANCE_FETCH  //const name
    };
    expect(salesPerformanceFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("salesPerformanceFail", () => {   //mention action name
  it("has a type of SALES_PERFORMANCE_FAIL", () => {   // mention const name
    const expected = {
      type: SALES_PERFORMANCE_FAIL  //const name
    };
    expect(salesPerformanceFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("salesPerformanceSuccess", () => {   //mention action name
  it("has a type of SALES_PERFORMANCE_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: SALES_PERFORMANCE_SUCCESS,  //const name
      data,
    };
    expect(salesPerformanceSuccess(data)).toEqual(expected);   //action name
  });
});









//ACTION WHICH DOESN'T HAVE DATA
describe("purchaseAnalysisFetch", () => {   //mention action name
  it("has a type of PURCHASE_ANALYSIS_FETCH", () => {   // mention const name
    const expected = {
      type: PURCHASE_ANALYSIS_FETCH  //const name
    };
    expect(purchaseAnalysisFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("purchaseAnalysisFail", () => {   //mention action name
  it("has a type of PURCHASE_ANALYSIS_FAIL", () => {   // mention const name
    const expected = {
      type: PURCHASE_ANALYSIS_FAIL  //const name
    };
    expect(purchaseAnalysisFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("purchaseAnalysisSuccess", () => {   //mention action name
  it("has a type of PURCHASE_ANALYSIS_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: PURCHASE_ANALYSIS_SUCCESS,  //const name
      data,
    };
    expect(purchaseAnalysisSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("productDistributionFetch", () => {   //mention action name
  it("has a type of PRODUCT_DISTRIBUTION_FETCH", () => {   // mention const name
    const expected = {
      type: PRODUCT_DISTRIBUTION_FETCH  //const name
    };
    expect(productDistributionFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("productDistributionButtonChange", () => {   //mention action name
  it("has a type of PRODUCT_DISTRIBUTION_BUTTON", () => {   // mention const name
    const expected = {
      type: PRODUCT_DISTRIBUTION_BUTTON  //const name
    };
    expect(productDistributionButtonChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("productDistributionFail", () => {   //mention action name
  it("has a type of PRODUCT_DISTRIBUTION_FAIL", () => {   // mention const name
    const expected = {
      type: PRODUCT_DISTRIBUTION_FAIL  //const name
    };
    expect(productDistributionFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("productDistributionSuccess", () => {   //mention action name
  it("has a type of PRODUCT_DISTRIBUTION_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: PRODUCT_DISTRIBUTION_SUCCESS,  //const name
      data,
    };
    expect(productDistributionSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("productAnalysisFetch", () => {   //mention action name
  it("has a type of PRODUCT_ANALYSIS_FETCH", () => {   // mention const name
    const expected = {
      type: PRODUCT_ANALYSIS_FETCH  //const name
    };
    expect(productAnalysisFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("productAnalysisButtonChange", () => {   //mention action name
  it("has a type of PRODUCT_ANALYSIS_BUTTON", () => {   // mention const name
    const expected = {
      type: PRODUCT_ANALYSIS_BUTTON  //const name
    };
    expect(productAnalysisButtonChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("productAnalysisFail", () => {   //mention action name
  it("has a type of PRODUCT_ANALYSIS_FAIL", () => {   // mention const name
    const expected = {
      type: PRODUCT_ANALYSIS_FAIL  //const name
    };
    expect(productAnalysisFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("productAnalysisSuccess", () => {   //mention action name
  it("has a type of PRODUCT_ANALYSIS_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: PRODUCT_ANALYSIS_SUCCESS,  //const name
      data,
    };
    expect(productAnalysisSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("paretoAnalysisFilterChange", () => {   //mention action name
  it("has a type of PARETO_ANALYSIS_FILTER", () => {   // mention const name
    const expected = {
      type: PARETO_ANALYSIS_FILTER  //const name
    };
    expect(paretoAnalysisFilterChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("paretoAnalysisFetch", () => {   //mention action name
  it("has a type of PARETO_ANALYSIS_FETCH", () => {   // mention const name
    const expected = {
      type: PARETO_ANALYSIS_FETCH  //const name
    };
    expect(paretoAnalysisFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("paretoAnalysisFail", () => {   //mention action name
  it("has a type of PARETO_ANALYSIS_FAIL", () => {   // mention const name
    const expected = {
      type: PARETO_ANALYSIS_FAIL  //const name
    };
    expect(paretoAnalysisFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("paretoAnalysisSuccess", () => {   //mention action name
  it("has a type of PARETO_ANALYSIS_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: PARETO_ANALYSIS_SUCCESS,  //const name
      data,
    };
    expect(paretoAnalysisSuccess(data)).toEqual(expected);   //action name
  });
});


