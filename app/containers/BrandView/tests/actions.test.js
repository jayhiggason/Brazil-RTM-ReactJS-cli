import { defaultAction,
  brandButtonVsOnChange,
  brandHeatFail,
  brandHeatFetch,
  brandHeatmapButtonOnChange,
  brandHeatmapTimeFilterOnChange,
  brandHeatSuccess,
  brandTopFilterOnChange,
  brandTrendClickOnChange,
  brandTrendFail,
  brandTrendFetch,
  brandTrendSuccess,
  brandUomButtonOnChange,
  topFilterHeatmapOnChange} from "../actions";
import { DEFAULT_ACTION, BRAND_BUTTON_VS,
  BRAND_HEATMAP_BUTTON,
  BRAND_HEATMAP_FAIL,
  BRAND_HEATMAP_FETCH,
  BRAND_HEATMAP_SUCCESS,
  BRAND_HEATMAP_TIME_FILTER,
  BRAND_HEATMAP_TOP,
  BRAND_TREND_CLICK_ON_CHANGE,
  BRAND_TREND_FAIL,
  BRAND_TREND_FETCH,
  BRAND_TREND_SUCCESS,
  BRAND_TREND_TOP,
  BRAND_UOM_BUTTON } from "../constants";
import {BRAND_BUBBLE_FAIL, BRAND_BUBBLE_SUCCESS} from "../../PerformanceSummary/constants";
import {brandBubbleFail, brandBubbleSuccess} from "../../PerformanceSummary/actions";

describe("BrandView actions", () => {
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
describe("brandButtonVsOnChange", () => {   //mention action name
  it("has a type of BRAND_BUTTON_VS", () => {   // mention const name
    const expected = {
      type: BRAND_BUTTON_VS  //const name
    };
    expect(brandButtonVsOnChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("brandHeatFail", () => {   //mention action name
  it("has a type of BRAND_HEATMAP_FAIL", () => {   // mention const name
    const expected = {
      type: BRAND_HEATMAP_FAIL  //const name
    };
    expect(brandHeatFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("brandHeatSuccess", () => {   //mention action name
  it("has a type of BRAND_HEATMAP_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: BRAND_HEATMAP_SUCCESS,  //const name
      data,
    };
    expect(brandHeatSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("brandHeatFetch", () => {   //mention action name
  it("has a type of BRAND_HEATMAP_FETCH", () => {   // mention const name
    const expected = {
      type: BRAND_HEATMAP_FETCH  //const name
    };
    expect(brandHeatFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("brandHeatmapButtonOnChange", () => {   //mention action name
  it("has a type of BRAND_HEATMAP_BUTTON", () => {   // mention const name
    const expected = {
      type: BRAND_HEATMAP_BUTTON  //const name
    };
    expect(brandHeatmapButtonOnChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("brandHeatmapTimeFilterOnChange", () => {   //mention action name
  it("has a type of BRAND_HEATMAP_TIME_FILTER", () => {   // mention const name
    const expected = {
      type: BRAND_HEATMAP_TIME_FILTER  //const name
    };
    expect(brandHeatmapTimeFilterOnChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("brandTopFilterOnChange", () => {   //mention action name
  it("has a type of BRAND_TREND_TOP", () => {   // mention const name
    const expected = {
      type: BRAND_TREND_TOP  //const name
    };
    expect(brandTopFilterOnChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("brandTrendClickOnChange", () => {   //mention action name
  it("has a type of BRAND_TREND_CLICK_ON_CHANGE", () => {   // mention const name
    const expected = {
      type: BRAND_TREND_CLICK_ON_CHANGE  //const name
    };
    expect(brandTrendClickOnChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("brandTrendFetch", () => {   //mention action name
  it("has a type of BRAND_TREND_FETCH", () => {   // mention const name
    const expected = {
      type: BRAND_TREND_FETCH  //const name
    };
    expect(brandTrendFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("brandTrendFail", () => {   //mention action name
  it("has a type of BRAND_TREND_FAIL", () => {   // mention const name
    const expected = {
      type: BRAND_TREND_FAIL  //const name
    };
    expect(brandTrendFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("brandTrendSuccess", () => {   //mention action name
  it("has a type of BRAND_TREND_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: BRAND_TREND_SUCCESS,  //const name
      data,
    };
    expect(brandTrendSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("brandUomButtonOnChange", () => {   //mention action name
  it("has a type of BRAND_UOM_BUTTON", () => {   // mention const name
    const expected = {
      type: BRAND_UOM_BUTTON  //const name
    };
    expect(brandUomButtonOnChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("topFilterHeatmapOnChange", () => {   //mention action name
  it("has a type of BRAND_HEATMAP_TOP", () => {   // mention const name
    const expected = {
      type: BRAND_HEATMAP_TOP  //const name
    };
    expect(topFilterHeatmapOnChange()).toEqual(expected);   //action name
  });
});