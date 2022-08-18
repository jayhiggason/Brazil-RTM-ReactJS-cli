// import produce from 'immer';
import storeViewReducer from "../reducer";
import {storeTrendTableSuccess,
  storeTrendTableFetch,
  storeTrendTableFail,
  storeTopFilterOnChange,
  storeTimeFilterHeatmapOnChange,
  storeHeatMapSuccess,
  storeHeatMapFilterChange,
  storeHeatMapFetch,
  storeHeatMapFail,
  storeHeatMapButtonOnChange,
  storeGeoMapSuccess,
  storeGeoMapFetch,
  storeGeoMapFail,
  storeGeoMapClick} from '../actions';
import storeDeepDivePageReducer from "../../StoreDeepDivePage/reducer";
import {salesPerformanceFetch} from "../../StoreDeepDivePage/actions";

/* eslint-disable default-case, no-param-reassign */
describe("storeViewReducer", () => {
  let state;
  beforeEach(() => {
    state = {
      // default state params here
      //store trend table
      storeTrendTableData: [],
      storeTrendTableDataFail: false,
      storeTrendTableDataSpinnerState: true,
      storeTopFilter:"Top 10",
      //store geo map

      storeGeoMapData: [],
      storeGeoMapDataFail: false,
      storeGeoMapDataSpinnerState: true,
      //store heat map
      storeHeatMapData: [],
      storeHeatMapDataFail: false,
      storeHeatMapDataSpinnerState: true,

      storeHeatMapButton: "Invoice",
      storeHeatMapFilter: "Actual",
      storeHeatMapTimeFilter:"Period",
    };
  });

  it("returns the initial state", () => {
    const expectedResult = state;
    expect(storeViewReducer(undefined, {})).toEqual(expectedResult);
  });

  it("returns the correct state for STORE_TREND_TABLE_SUCCESS case", () => {
    const data ='data';
    expect(storeViewReducer(state, storeTrendTableSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for STORE_TREND_TABLE_FETCH case", () => {
    const data ='data';
    expect(storeViewReducer(state, storeTrendTableFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for STORE_TREND_TABLE_FAIL case", () => {
    const data ='data';
    expect(storeViewReducer(state, storeTrendTableFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for STORE_TREND_TABLE_FILTER case", () => {
    const data ='data';
    expect(storeViewReducer(state, storeTopFilterOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for STORE_HEATMAP_TIME_FILTER case", () => {
    const data ='data';
    expect(storeViewReducer(state, storeTimeFilterHeatmapOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for STORE_HEATMAP_SUCCESS case", () => {
    const data ='data';
    expect(storeViewReducer(state, storeHeatMapSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for STORE_HEATMAP_FILTER case", () => {
    const data ='data';
    expect(storeViewReducer(state, storeHeatMapFilterChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for STORE_HEATMAP_FETCH case", () => {
    const data ='data';
    expect(storeViewReducer(state, storeHeatMapFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for STORE_HEATMAP_FAIL case", () => {
    const data ='data';
    expect(storeViewReducer(state, storeHeatMapFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for STORE_HEATMAP_BUTTON case", () => {
    const data ='data';
    expect(storeViewReducer(state, storeHeatMapButtonOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for STORE_GEOMAP_SUCCESS case", () => {
    const data ='data';
    expect(storeViewReducer(state, storeGeoMapSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for STORE_GEOMAP_FETCH case", () => {
    const data ='data';
    expect(storeViewReducer(state, storeGeoMapFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for STORE_GEOMAP_FAIL case", () => {
    const data ='data';
    expect(storeViewReducer(state, storeGeoMapFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for STORE_GEOMAP_CLICK case", () => {
    const data ='data';
    expect(storeViewReducer(state, storeGeoMapClick(data))).toMatchSnapshot()
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
