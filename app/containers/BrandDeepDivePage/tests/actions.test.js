import { defaultAction,
  unitsToggle,
  toggleCard,
  seeTrendLineSuccess,
  seeTrendLineFetch,
  seeTrendLineFail,
  invoiceToggle,
  categoryFilterSuccess,
  categoryFilterFetch,
  categoryFilterFail,
  categoryComparisonFilterSuccess,
  categoryComparisonFilterFetch,
  categoryComparisonFilterFail,
  cardDataSuccess, cardDataFetch,
  cardDataFail,
  itemFilterHeatmapOnChange,
  itemHeatFail,
  itemHeatFetch,
  itemHeatmapButtonOnChange,
  itemHeatSuccess,
  itemTimeFilterHeatmapOnChange,
  productSkuTrendFilterFail,
  productSkuTrendFilterFetch,
  productSkuTrendFilterOnChange,
  productSkuTrendFilterSuccess,
  productTrendClickOnChange,
  productTrendFail,
  productTrendFetch,
  productTrendFilterOnChange,
  productTrendSuccess,
  productTrendUomFilterOnChange,
  skuFilterOnChange,
  skuTableFail,
  skuTableFetch,
  skuTableSuccess } from "../actions";

import { DEFAULT_ACTION,
  CARDS_DATA_FAIL,
  CARDS_DATA_FETCH,
  CARDS_DATA_SUCCESS,
  CATEGORY_COMPARISON_FILTER_FAIL,
  CATEGORY_COMPARISON_FILTER_FETCH,
  CATEGORY_COMPARISON_FILTER_SUCCESS,
  CATEGORY_FILTER_FAIL,
  CATEGORY_FILTER_FETCH,
  CATEGORY_FILTER_SUCCESS,
  INVOICE_TOGGLE,
  ITEM_HEATMAP_BUTTON,
  ITEM_HEATMAP_FAIL,
  ITEM_HEATMAP_FETCH,
  ITEM_HEATMAP_FILTER,
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
  PRODUCT_UOM_FILTER ,
  SKU_TABLE_FAIL,
  SKU_TABLE_FETCH,
  SKU_TABLE_FILTER,
  SKU_TABLE_SUCCESS,
  TOGGLE_CARD,
  TRENDS_LINE_FAIL,
  TRENDS_LINE_FETCH,
  TRENDS_LINE_SUCCESS,
  UNITS_TOGGLE} from "../constants";
import {BRAND_BUBBLE_FAIL, BRAND_BUBBLE_SUCCESS} from "../../PerformanceSummary/constants";
import {brandBubbleFail, brandBubbleSuccess} from "../../PerformanceSummary/actions";

describe("BrandDeepDivePage actions", () => {
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
describe("productTrendUomFilterOnChange", () => {   //mention action name
  it("has a type of PRODUCT_UOM_FILTER", () => {   // mention const name
    const expected = {
      type: PRODUCT_UOM_FILTER  //const name
    };
    expect(skuTableFproductTrendUomFilterOnChangeetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("skuFilterOnChange", () => {   //mention action name
  it("has a type of SKU_TABLE_FILTER", () => {   // mention const name
    const expected = {
      type: SKU_TABLE_FILTER  //const name
    };
    expect(skuFilterOnChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("skuTableFetch", () => {   //mention action name
  it("has a type of SKU_TABLE_FETCH", () => {   // mention const name
    const expected = {
      type: SKU_TABLE_FETCH  //const name
    };
    expect(skuTableFetch()).toEqual(expected);   //action name
  });
});


//ACTION WHICH DOESN'T HAVE DATA
describe("skuTableFail", () => {   //mention action name
  it("has a type of SKU_TABLE_FAIL", () => {   // mention const name
    const expected = {
      type: SKU_TABLE_FAIL  //const name
    };
    expect(skuTableFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("skuTableSuccess", () => {   //mention action name
  it("has a type of SKU_TABLE_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: SKU_TABLE_SUCCESS,  //const name
      data,
    };
    expect(skuTableSuccess(data)).toEqual(expected);   //action name
  });
});
















//ACTION WHICH DOESN'T HAVE DATA
describe("productTrendFilterOnChange", () => {   //mention action name
  it("has a type of PRODUCT_TREND_FILTER", () => {   // mention const name
    const expected = {
      type: PRODUCT_TREND_FILTER  //const name
    };
    expect(productTrendFilterOnChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("productTrendFail", () => {   //mention action name
  it("has a type of PRODUCT_TREND_FAIL", () => {   // mention const name
    const expected = {
      type: PRODUCT_TREND_FAIL  //const name
    };
    expect(productTrendFail()).toEqual(expected);   //action name
  });
});


//ACTION WHICH DOESN'T HAVE DATA
describe("productTrendFetch", () => {   //mention action name
  it("has a type of PRODUCT_TREND_FETCH", () => {   // mention const name
    const expected = {
      type: PRODUCT_TREND_FETCH  //const name
    };
    expect(productTrendFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("productTrendSuccess", () => {   //mention action name
  it("has a type of PRODUCT_TREND_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: PRODUCT_TREND_SUCCESS,  //const name
      data,
    };
    expect(productTrendSuccess(data)).toEqual(expected);   //action name
  });
});


//ACTION WHICH DOESN'T HAVE DATA
describe("productTrendClickOnChange", () => {   //mention action name
  it("has a type of PRODUCT_BUTTON_VS", () => {   // mention const name
    const expected = {
      type: PRODUCT_BUTTON_VS  //const name
    };
    expect(productTrendClickOnChange()).toEqual(expected);   //action name
  });
});


//ACTION WHICH DOESN'T HAVE DATA
describe("productSkuTrendFilterFail", () => {   //mention action name
  it("has a type of PRODUCT_SKU_TREND_FILTER_FAIL", () => {   // mention const name
    const expected = {
      type: PRODUCT_SKU_TREND_FILTER_FAIL  //const name
    };
    expect(productSkuTrendFilterFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("productSkuTrendFilterSuccess", () => {   //mention action name
  it("has a type of PRODUCT_SKU_TREND_FILTER_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: PRODUCT_SKU_TREND_FILTER_SUCCESS,  //const name
      data,
    };
    expect(productSkuTrendFilterSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("productSkuTrendFilterOnChange", () => {   //mention action name
  it("has a type of PRODUCT_SKU_TREND_FILTER_SELECTED_FILTER", () => {   // mention const name
    const expected = {
      type: PRODUCT_SKU_TREND_FILTER_SELECTED_FILTER  //const name
    };
    expect(productSkuTrendFilterOnChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("productSkuTrendFilterFetch", () => {   //mention action name
  it("has a type of PRODUCT_SKU_TREND_FILTER_FETCH", () => {   // mention const name
    const expected = {
      type: PRODUCT_SKU_TREND_FILTER_FETCH  //const name
    };
    expect(productSkuTrendFilterFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("itemTimeFilterHeatmapOnChange", () => {   //mention action name
  it("has a type of ITEM_HEATMAP_TIME_FILTER", () => {   // mention const name
    const expected = {
      type: ITEM_HEATMAP_TIME_FILTER  //const name
    };
    expect(itemTimeFilterHeatmapOnChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("itemHeatmapButtonOnChange", () => {   //mention action name
  it("has a type of ITEM_HEATMAP_BUTTON", () => {   // mention const name
    const expected = {
      type: ITEM_HEATMAP_BUTTON  //const name
    };
    expect(itemHeatmapButtonOnChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("itemHeatFetch", () => {   //mention action name
  it("has a type of ITEM_HEATMAP_FETCH", () => {   // mention const name
    const expected = {
      type: ITEM_HEATMAP_FETCH  //const name
    };
    expect(itemHeatFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("itemHeatFail", () => {   //mention action name
  it("has a type of ITEM_HEATMAP_FAIL", () => {   // mention const name
    const expected = {
      type: ITEM_HEATMAP_FAIL  //const name
    };
    expect(itemHeatFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("itemHeatSuccess", () => {   //mention action name
  it("has a type of ITEM_HEATMAP_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: ITEM_HEATMAP_SUCCESS,  //const name
      data,
    };
    expect(itemHeatSuccess(data)).toEqual(expected);   //action name
  });
});







//ACTION WHICH DOESN'T HAVE DATA
describe("  itemFilterHeatmapOnChange", () => {   //mention action name
  it("has a type of ITEM_HEATMAP_FILTER", () => {   // mention const name
    const expected = {
      type: ITEM_HEATMAP_FILTER  //const name
    };
    expect(itemFilterHeatmapOnChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("cardDataFail", () => {   //mention action name
  it("has a type of CARDS_DATA_FAIL", () => {   // mention const name
    const expected = {
      type: CARDS_DATA_FAIL  //const name
    };
    expect(cardDataFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("cardDataSuccess", () => {   //mention action name
  it("has a type of CARDS_DATA_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: CARDS_DATA_SUCCESS,  //const name
      data,
    };
    expect(cardDataSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("cardDataFetch", () => {   //mention action name
  it("has a type of CARDS_DATA_FETCH", () => {   // mention const name
    const expected = {
      type: CARDS_DATA_FETCH  //const name
    };
    expect(cardDataFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("categoryComparisonFilterFail", () => {   //mention action name
  it("has a type of CATEGORY_COMPARISON_FILTER_FAIL", () => {   // mention const name
    const expected = {
      type: CATEGORY_COMPARISON_FILTER_FAIL  //const name
    };
    expect(categoryComparisonFilterFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("categoryComparisonFilterSuccess", () => {   //mention action name
  it("has a type of CATEGORY_COMPARISON_FILTER_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: CATEGORY_COMPARISON_FILTER_SUCCESS,  //const name
      data,
    };
    expect(categoryComparisonFilterSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("categoryComparisonFilterFetch", () => {   //mention action name
  it("has a type of CATEGORY_COMPARISON_FILTER_FETCH", () => {   // mention const name
    const expected = {
      type: CATEGORY_COMPARISON_FILTER_FETCH  //const name
    };
    expect(categoryComparisonFilterFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("categoryFilterFail", () => {   //mention action name
  it("has a type of CATEGORY_FILTER_FAIL", () => {   // mention const name
    const expected = {
      type: CATEGORY_FILTER_FAIL  //const name
    };
    expect(categoryFilterFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("categoryFilterSuccess", () => {   //mention action name
  it("has a type of CATEGORY_FILTER_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: CATEGORY_FILTER_SUCCESS,  //const name
      data,
    };
    expect(categoryFilterSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("categoryFilterFetch", () => {   //mention action name
  it("has a type of CATEGORY_FILTER_FETCH", () => {   // mention const name
    const expected = {
      type: CATEGORY_FILTER_FETCH  //const name
    };
    expect(categoryFilterFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("seeTrendLineFail", () => {   //mention action name
  it("has a type of TRENDS_LINE_FAIL", () => {   // mention const name
    const expected = {
      type: TRENDS_LINE_FAIL  //const name
    };
    expect(seeTrendLineFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("seeTrendLineSuccess", () => {   //mention action name
  it("has a type of TRENDS_LINE_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: TRENDS_LINE_SUCCESS,  //const name
      data,
    };
    expect(seeTrendLineSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("seeTrendLineFetch", () => {   //mention action name
  it("has a type of TRENDS_LINE_FETCH", () => {   // mention const name
    const expected = {
      type: TRENDS_LINE_FETCH  //const name
    };
    expect(seeTrendLineFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("invoiceToggle", () => {   //mention action name
  it("has a type of INVOICE_TOGGLE", () => {   // mention const name
    const expected = {
      type: INVOICE_TOGGLE  //const name
    };
    expect(invoiceToggle()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("toggleCard", () => {   //mention action name
  it("has a type of TOGGLE_CARD", () => {   // mention const name
    const expected = {
      type: TOGGLE_CARD  //const name
    };
    expect(toggleCard()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("unitsToggle", () => {   //mention action name
  it("has a type of UNITS_TOGGLE", () => {   // mention const name
    const expected = {
      type: UNITS_TOGGLE  //const name
    };
    expect(unitsToggle()).toEqual(expected);   //action name
  });
});



