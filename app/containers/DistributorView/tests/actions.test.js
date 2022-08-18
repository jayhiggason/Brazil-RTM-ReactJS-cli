import { defaultAction,
  distributorTrendChartDataFetch,
  distributorTrendChartDataFetchFail,
  distributorTrendChartDataFetchSuccess,
  distributorTrendChartOnFilterChange,
  distributorTrendTableDataFetch,
  distributorTrendTableDataFetchFail,
  distributorTrendTableDataFetchSuccess} from "../actions";

import { DEFAULT_ACTION,
  DISTRIBUTOR_TREND_CHART_DATA_FETCH,
  DISTRIBUTOR_TREND_CHART_DATA_FETCH_FAIL,
  DISTRIBUTOR_TREND_CHART_DATA_FETCH_SUCCESS,
  DISTRIBUTOR_TREND_CHART_ON_FILTER_CHANGE,
  DISTRIBUTOR_TREND_TABLE_DATA_FETCH,
  DISTRIBUTOR_TREND_TABLE_DATA_FETCH_FAIL,
  DISTRIBUTOR_TREND_TABLE_DATA_FETCH_SUCCESS } from "../constants";
import {SKU_TABLE_FAIL, SKU_TABLE_SUCCESS} from "../../BrandDeepDivePage/constants";
import {skuTableFail, skuTableSuccess} from "../../BrandDeepDivePage/actions";

describe("DistributorView actions", () => {
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
describe("distributorTrendChartOnFilterChange", () => {   //mention action name
  it("has a type of DISTRIBUTOR_TREND_CHART_ON_FILTER_CHANGE", () => {   // mention const name
    const expected = {
      type: DISTRIBUTOR_TREND_CHART_ON_FILTER_CHANGE  //const name
    };
    expect(distributorTrendChartOnFilterChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("distributorTrendTableDataFetch", () => {   //mention action name
  it("has a type of DISTRIBUTOR_TREND_TABLE_DATA_FETCH", () => {   // mention const name
    const expected = {
      type: DISTRIBUTOR_TREND_TABLE_DATA_FETCH  //const name
    };
    expect(distributorTrendTableDataFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("distributorTrendTableDataFetchFail", () => {   //mention action name
  it("has a type of DISTRIBUTOR_TREND_TABLE_DATA_FETCH_FAIL", () => {   // mention const name
    const expected = {
      type: DISTRIBUTOR_TREND_TABLE_DATA_FETCH_FAIL  //const name
    };
    expect(distributorTrendTableDataFetchFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("distributorTrendTableDataFetchSuccess", () => {   //mention action name
  it("has a type of DISTRIBUTOR_TREND_TABLE_DATA_FETCH_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: DISTRIBUTOR_TREND_TABLE_DATA_FETCH_SUCCESS,  //const name
      data,
    };
    expect(distributorTrendTableDataFetchSuccess(data)).toEqual(expected);   //action name
  });
});











//ACTION WHICH DOESN'T HAVE DATA
describe("distributorTrendChartDataFetch", () => {   //mention action name
  it("has a type of DISTRIBUTOR_TREND_CHART_DATA_FETCH", () => {   // mention const name
    const expected = {
      type: DISTRIBUTOR_TREND_CHART_DATA_FETCH  //const name
    };
    expect(distributorTrendChartDataFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("distributorTrendChartDataFetchFail", () => {   //mention action name
  it("has a type of DISTRIBUTOR_TREND_CHART_DATA_FETCH_FAIL", () => {   // mention const name
    const expected = {
      type: DISTRIBUTOR_TREND_CHART_DATA_FETCH_FAIL  //const name
    };
    expect(distributorTrendChartDataFetchFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("distributorTrendChartDataFetchSuccess", () => {   //mention action name
  it("has a type of DISTRIBUTOR_TREND_CHART_DATA_FETCH_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: DISTRIBUTOR_TREND_CHART_DATA_FETCH_SUCCESS,  //const name
      data,
    };
    expect(distributorTrendChartDataFetchSuccess(data)).toEqual(expected);   //action name
  });
});
