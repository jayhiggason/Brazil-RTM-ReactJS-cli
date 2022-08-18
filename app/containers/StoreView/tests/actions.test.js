import { defaultAction,
  storeGeoMapClick,
  storeGeoMapFail,
  storeGeoMapFetch,
  storeGeoMapSuccess,
  storeHeatMapFail,
  storeHeatMapFetch,
  storeHeatMapFilterChange,
  storeHeatMapSuccess,
  storeTimeFilterHeatmapOnChange,
  storeTopFilterOnChange,
  storeTrendTableFail,
  storeTrendTableFetch,
  storeTrendTableSuccess } from "../actions";
import { DEFAULT_ACTION,
  STORE_GEOMAP_CLICK,
  STORE_GEOMAP_FAIL,
  STORE_GEOMAP_FETCH,
  STORE_GEOMAP_SUCCESS,
  STORE_HEATMAP_FAIL,
  STORE_HEATMAP_FETCH,
  STORE_HEATMAP_FILTER,
  STORE_HEATMAP_SUCCESS,
  STORE_HEATMAP_TIME_FILTER,
  STORE_TREND_TABLE_FAIL,
  STORE_TREND_TABLE_FETCH,
  STORE_TREND_TABLE_FILTER,
  STORE_TREND_TABLE_SUCCESS} from "../constants";
import {BRAND_BUBBLE_FAIL, BRAND_BUBBLE_SUCCESS} from "../../PerformanceSummary/constants";
import {brandBubbleFail, brandBubbleSuccess} from "../../PerformanceSummary/actions";

describe("StoreView actions", () => {
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
describe("storeTopFilterOnChange", () => {   //mention action name
  it("has a type of STORE_TREND_TABLE_FILTER", () => {   // mention const name
    const expected = {
      type: STORE_TREND_TABLE_FILTER  //const name
    };
    expect(storeTopFilterOnChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("storeTrendTableFail", () => {   //mention action name
  it("has a type of STORE_TREND_TABLE_FAIL", () => {   // mention const name
    const expected = {
      type: STORE_TREND_TABLE_FAIL  //const name
    };
    expect(storeTrendTableFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("storeTrendTableFetch", () => {   //mention action name
  it("has a type of STORE_TREND_TABLE_FETCH", () => {   // mention const name
    const expected = {
      type: STORE_TREND_TABLE_FETCH  //const name
    };
    expect(storeTrendTableFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("storeTrendTableSuccess", () => {   //mention action name
  it("has a type of STORE_TREND_TABLE_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: STORE_TREND_TABLE_SUCCESS,  //const name
      data,
    };
    expect(storeTrendTableSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("storeHeatMapFail", () => {   //mention action name
  it("has a type of STORE_HEATMAP_FAIL", () => {   // mention const name
    const expected = {
      type: STORE_HEATMAP_FAIL  //const name
    };
    expect(storeHeatMapFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("storeHeatMapFetch", () => {   //mention action name
  it("has a type of STORE_HEATMAP_FETCH", () => {   // mention const name
    const expected = {
      type: STORE_HEATMAP_FETCH  //const name
    };
    expect(storeHeatMapFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("storeHeatMapFilterChange", () => {   //mention action name
  it("has a type of STORE_HEATMAP_FILTER", () => {   // mention const name
    const expected = {
      type: STORE_HEATMAP_FILTER  //const name
    };
    expect(storeHeatMapFilterChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("storeTimeFilterHeatmapOnChange", () => {   //mention action name
  it("has a type of STORE_HEATMAP_TIME_FILTER", () => {   // mention const name
    const expected = {
      type: STORE_HEATMAP_TIME_FILTER  //const name
    };
    expect(storeTimeFilterHeatmapOnChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("storeHeatMapSuccess", () => {   //mention action name
  it("has a type of STORE_HEATMAP_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: STORE_HEATMAP_SUCCESS,  //const name
      data,
    };
    expect(storeHeatMapSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("storeGeoMapClick", () => {   //mention action name
  it("has a type of STORE_GEOMAP_CLICK", () => {   // mention const name
    const expected = {
      type: STORE_GEOMAP_CLICK  //const name
    };
    expect(storeGeoMapClick()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("storeGeoMapFail", () => {   //mention action name
  it("has a type of STORE_GEOMAP_FAIL", () => {   // mention const name
    const expected = {
      type: STORE_GEOMAP_FAIL  //const name
    };
    expect(storeGeoMapFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("storeGeoMapFetch", () => {   //mention action name
  it("has a type of STORE_GEOMAP_FETCH", () => {   // mention const name
    const expected = {
      type: STORE_GEOMAP_FETCH  //const name
    };
    expect(storeGeoMapFetch()).toEqual(expected);   //action name
  });
});


//ACTION WHICH HAS DATA
describe("storeGeoMapSuccess", () => {   //mention action name
  it("has a type of STORE_GEOMAP_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: STORE_GEOMAP_SUCCESS,  //const name
      data,
    };
    expect(storeGeoMapSuccess(data)).toEqual(expected);   //action name
  });
});
