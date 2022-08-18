// import produce from 'immer';
import brandViewReducer from "../reducer";
import { topFilterHeatmapOnChange,
  brandUomButtonOnChange,
  brandTrendSuccess,
  brandTrendFetch,
  brandTrendFail,
  brandTrendClickOnChange,
  brandTopFilterOnChange,
  brandHeatSuccess,
  brandHeatmapTimeFilterOnChange,
  brandHeatmapButtonOnChange,
  brandHeatFetch,
  brandHeatFail,
  brandButtonVsOnChange } from '../actions';
import performanceSummaryReducer from "../../PerformanceSummary/reducer";
import {toggleCard} from "../../PerformanceSummary/actions";

/* eslint-disable default-case, no-param-reassign */
describe("brandViewReducer", () => {
  let state;
  beforeEach(() => {
    state = {
      // default state params here
      // brand trend graph
      brandTrendData: [],
      brandWholeData:[],
      brandTrendDataFail: false,
      brandTrendDataSpinnerState: true,

      brandTrendButton: "target",
      brandTopFilter: "Top 10",
      brandTrendUomButton:"Invoice",
      selectedBrandName: "",
      // brand heatmap graph

      brandHeatMapData: [],
      brandHeatMapDataFail: false,
      brandHeatMapDataSpinnerState: true,

      brandHeatMapButton: "Invoice",
      brandTopHeatmapFilter: "Actual",
      brandHeatmapTimeFilter: "Period",
    };
  });

  it("returns the initial state", () => {
    const expectedResult = state;
    expect(brandViewReducer(undefined, {})).toEqual(expectedResult);
  });

  it("returns the correct state for BRAND_HEATMAP_TOP case", () => {
    const data ='data';
    expect(brandViewReducer(state, topFilterHeatmapOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for BRAND_UOM_BUTTON case", () => {
    const data ='data';
    expect(brandViewReducer(state, brandUomButtonOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for BRAND_TREND_SUCCESS case", () => {
    const data ='data';
    expect(brandViewReducer(state, brandTrendSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for BRAND_TREND_FETCH case", () => {
    const data ='data';
    expect(brandViewReducer(state, brandTrendFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for BRAND_TREND_FAIL case", () => {
    const data ='data';
    expect(brandViewReducer(state, brandTrendFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for BRAND_TREND_CLICK_ON_CHANGE case", () => {
    const data ='data';
    expect(brandViewReducer(state, brandTrendClickOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for BRAND_TREND_TOP case", () => {
    const data ='data';
    expect(brandViewReducer(state, brandTopFilterOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for BRAND_HEATMAP_SUCCESS case", () => {
    const data ='data';
    expect(brandViewReducer(state, brandHeatSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for BRAND_HEATMAP_TIME_FILTER case", () => {
    const data ='data';
    expect(brandViewReducer(state, brandHeatmapTimeFilterOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for BRAND_HEATMAP_BUTTON case", () => {
    const data ='data';
    expect(brandViewReducer(state, brandHeatmapButtonOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for BRAND_HEATMAP_FETCH case", () => {
    const data ='data';
    expect(brandViewReducer(state, brandHeatFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for BRAND_HEATMAP_FAIL case", () => {
    const data ='data';
    expect(brandViewReducer(state, brandHeatFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for BRAND_BUTTON_VS case", () => {
    const data ='data';
    expect(brandViewReducer(state, brandButtonVsOnChange(data))).toMatchSnapshot()
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
