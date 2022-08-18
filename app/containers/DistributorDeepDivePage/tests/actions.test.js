import { defaultAction,
  channelPerformanceClickOnChange,
  channelPerformanceFail,
  channelPerformanceFetch,
  channelPerformanceFilter,
  channelPerformanceSuccess,
  distributorCardsFail,
  distributorCardsFetch,
  distributorCardsSuccess,
  distributorSalesPerformanceButtonVsOnChange,
  distributorSalesPerformanceFail,
  distributorSalesPerformanceFetch,
  toggleCard,
  distributorSalesPerformanceSuccess,
  productPerformanceFail,
  productPerformanceFetch,
  productPerformanceSuccess,
  storePerformanceFail,
  storePerformanceFetch,
  storePerformanceFilter,
  storePerformanceSuccess,
  storeTableFail,
  storeTableFetch,
  storeTableSuccess,
  visitSalesBubbleFail,
  visitSalesBubbleFetch,
  visitSalesBubbleSuccess } from "../actions";

import { DEFAULT_ACTION,
  TOGGLE_CARD,
  CHANNEL_PERFORMANCE_CLICK_ON_CHANGE,
  CHANNEL_PERFORMANCE_FAIL,
  CHANNEL_PERFORMANCE_FETCH,
  CHANNEL_PERFORMANCE_FILTER,
  CHANNEL_PERFORMANCE_SUCCESS,
  DISTRIBUTOR_CARDS_DATA_FAIL,
  DISTRIBUTOR_CARDS_DATA_FETCH,
  DISTRIBUTOR_CARDS_DATA_SUCCESS,
  DISTRIBUTOR_SALES_PERFORMANCE_BUTTON_VS,
  DISTRIBUTOR_SALES_PERFORMANCE_FAIL,
  DISTRIBUTOR_SALES_PERFORMANCE_FETCH,
  DISTRIBUTOR_SALES_PERFORMANCE_SUCCESS,
  PRODUCT_PERFORMANCE_FAIL,
  PRODUCT_PERFORMANCE_FETCH,
  PRODUCT_PERFORMANCE_SUCCESS,
  STORE_PERFORMANCE_FAIL,
  STORE_PERFORMANCE_FETCH,
  STORE_PERFORMANCE_FILTER,
  STORE_PERFORMANCE_SUCCESS,
  STORE_TABLE_FAIL,
  STORE_TABLE_FETCH,
  STORE_TABLE_SUCCESS,
  VISIT_SALES_BUBBLE_FAIL,
  VISIT_SALES_BUBBLE_FETCH,
  VISIT_SALES_BUBBLE_SUCCESS} from "../constants";
import {BRAND_BUBBLE_FAIL, BRAND_BUBBLE_SUCCESS} from "../../PerformanceSummary/constants";
import {brandBubbleFail, brandBubbleSuccess} from "../../PerformanceSummary/actions";

describe("DistributorDeepDivePage actions", () => {
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
describe("visitSalesBubbleFail", () => {   //mention action name
  it("has a type of VISIT_SALES_BUBBLE_FAIL", () => {   // mention const name
    const expected = {
      type: VISIT_SALES_BUBBLE_FAIL  //const name
    };
    expect(visitSalesBubbleFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("visitSalesBubbleFetch", () => {   //mention action name
  it("has a type of VISIT_SALES_BUBBLE_FETCH", () => {   // mention const name
    const expected = {
      type: VISIT_SALES_BUBBLE_FETCH  //const name
    };
    expect(visitSalesBubbleFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("visitSalesBubbleSuccess", () => {   //mention action name
  it("has a type of VISIT_SALES_BUBBLE_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: VISIT_SALES_BUBBLE_SUCCESS,  //const name
      data,
    };
    expect(visitSalesBubbleSuccess(data)).toEqual(expected);   //action name
  });
});









//ACTION WHICH DOESN'T HAVE DATA
describe("storeTableFail", () => {   //mention action name
  it("has a type of STORE_TABLE_FAIL", () => {   // mention const name
    const expected = {
      type: STORE_TABLE_FAIL  //const name
    };
    expect(storeTableFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("storeTableFetch", () => {   //mention action name
  it("has a type of STORE_TABLE_FETCH", () => {   // mention const name
    const expected = {
      type: STORE_TABLE_FETCH  //const name
    };
    expect(storeTableFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("storeTableSuccess", () => {   //mention action name
  it("has a type of STORE_TABLE_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: STORE_TABLE_SUCCESS,  //const name
      data,
    };
    expect(storeTableSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("storePerformanceFail", () => {   //mention action name
  it("has a type of STORE_PERFORMANCE_FAIL", () => {   // mention const name
    const expected = {
      type: STORE_PERFORMANCE_FAIL  //const name
    };
    expect(storePerformanceFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("storePerformanceFetch", () => {   //mention action name
  it("has a type of STORE_PERFORMANCE_FETCH", () => {   // mention const name
    const expected = {
      type: STORE_PERFORMANCE_FETCH  //const name
    };
    expect(storePerformanceFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("storePerformanceFilter", () => {   //mention action name
  it("has a type of STORE_PERFORMANCE_FILTER", () => {   // mention const name
    const expected = {
      type: STORE_PERFORMANCE_FILTER  //const name
    };
    expect(storePerformanceFilter()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("storePerformanceSuccess", () => {   //mention action name
  it("has a type of STORE_PERFORMANCE_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: STORE_PERFORMANCE_SUCCESS,  //const name
      data,
    };
    expect(storePerformanceSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("productPerformanceFail", () => {   //mention action name
  it("has a type of PRODUCT_PERFORMANCE_FAIL", () => {   // mention const name
    const expected = {
      type: PRODUCT_PERFORMANCE_FAIL  //const name
    };
    expect(productPerformanceFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("productPerformanceFetch", () => {   //mention action name
  it("has a type of PRODUCT_PERFORMANCE_FETCH", () => {   // mention const name
    const expected = {
      type: PRODUCT_PERFORMANCE_FETCH  //const name
    };
    expect(productPerformanceFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("productPerformanceSuccess", () => {   //mention action name
  it("has a type of PRODUCT_PERFORMANCE_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: PRODUCT_PERFORMANCE_SUCCESS,  //const name
      data,
    };
    expect(productPerformanceSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("toggleCard", () => {   //mention action name
  it("has a type of TOGGLE_CARD", () => {   // mention const name
    const expected = {
      type: TOGGLE_CARD//const name
    };
    expect(toggleCard()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("distributorSalesPerformanceButtonVsOnChange", () => {   //mention action name
  it("has a type of TOGGLE_CARD", () => {   // mention const name
    const expected = {
      type: DISTRIBUTOR_SALES_PERFORMANCE_BUTTON_VS  //const name
    };
    expect(distributorSalesPerformanceButtonVsOnChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("distributorSalesPerformanceFetch", () => {   //mention action name
  it("has a type of DISTRIBUTOR_SALES_PERFORMANCE_FETCH", () => {   // mention const name
    const expected = {
      type: DISTRIBUTOR_SALES_PERFORMANCE_FETCH  //const name
    };
    expect(distributorSalesPerformanceFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("distributorSalesPerformanceFail", () => {   //mention action name
  it("has a type of DISTRIBUTOR_SALES_PERFORMANCE_FAIL", () => {   // mention const name
    const expected = {
      type: DISTRIBUTOR_SALES_PERFORMANCE_FAIL  //const name
    };
    expect(distributorSalesPerformanceFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("distributorSalesPerformanceSuccess", () => {   //mention action name
  it("has a type of DISTRIBUTOR_SALES_PERFORMANCE_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: DISTRIBUTOR_SALES_PERFORMANCE_SUCCESS,  //const name
      data,
    };
    expect(distributorSalesPerformanceSuccess(data)).toEqual(expected);   //action name
  });
});











//ACTION WHICH DOESN'T HAVE DATA
describe("distributorCardsFail", () => {   //mention action name
  it("has a type of DISTRIBUTOR_CARDS_DATA_FAIL", () => {   // mention const name
    const expected = {
      type: DISTRIBUTOR_CARDS_DATA_FAIL  //const name
    };
    expect(distributorCardsFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("distributorCardsFetch", () => {   //mention action name
  it("has a type of DISTRIBUTOR_CARDS_DATA_FETCH", () => {   // mention const name
    const expected = {
      type: DISTRIBUTOR_CARDS_DATA_FETCH  //const name
    };
    expect(distributorCardsFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("distributorCardsSuccess", () => {   //mention action name
  it("has a type of DISTRIBUTOR_CARDS_DATA_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: DISTRIBUTOR_CARDS_DATA_SUCCESS,  //const name
      data,
    };
    expect(distributorCardsSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("channelPerformanceClickOnChange", () => {   //mention action name
  it("has a type of CHANNEL_PERFORMANCE_CLICK_ON_CHANGE", () => {   // mention const name
    const expected = {
      type: CHANNEL_PERFORMANCE_CLICK_ON_CHANGE  //const name
    };
    expect(channelPerformanceClickOnChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("channelPerformanceFetch", () => {   //mention action name
  it("has a type of CHANNEL_PERFORMANCE_FAIL", () => {   // mention const name
    const expected = {
      type: CHANNEL_PERFORMANCE_FAIL  //const name
    };
    expect(channelPerformanceFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("channelPerformanceFail", () => {   //mention action name
  it("has a type of CHANNEL_PERFORMANCE_FETCH", () => {   // mention const name
    const expected = {
      type: CHANNEL_PERFORMANCE_FETCH  //const name
    };
    expect(channelPerformanceFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("channelPerformanceFilter", () => {   //mention action name
  it("has a type of CHANNEL_PERFORMANCE_FILTER", () => {   // mention const name
    const expected = {
      type: CHANNEL_PERFORMANCE_FILTER  //const name
    };
    expect(channelPerformanceFilter()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("channelPerformanceSuccess", () => {   //mention action name
  it("has a type of CHANNEL_PERFORMANCE_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: CHANNEL_PERFORMANCE_SUCCESS,  //const name
      data,
    };
    expect(channelPerformanceSuccess(data)).toEqual(expected);   //action name
  });
});