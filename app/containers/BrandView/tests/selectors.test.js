import { selectBrandViewDomain,
  makeSelectBrandHeatmapFail,
  makeSelectBrandHeatmapSpinnerState,
  makeSelectBrandHeatmapSuccess,
  makeSelectBrandName,
  makeSelectBrandTopFilter,
  makeSelectBrandTrendFail,
  makeSelectBrandTrendSpinnerState,
  makeSelectBrandTrendSuccess,
  makeSelectBrandUomButton,
  makeSelectBrandVsButton,
  makeSelectHeatmapButton,
  makeSelectHeatmapTimeFilter,
  makeSelectHeatmapTopFilter } from '../selectors';
import {makeSelectBrandBubbleFail} from "../../PerformanceSummary/selectors";

describe("selectBrandViewDomain", () => {
  const mockParameters ={ // brand trend graph
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
    brandHeatmapTimeFilter: "Period",}
      it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });


  it("Expect makeSelectBrandTrendSuccess to return state", () => {
    const selected = makeSelectBrandTrendSuccess().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.brandTrendData)
  });

  it("Expect makeSelectBrandTrendFail to return state", () => {
    const selected = makeSelectBrandTrendFail().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.brandTrendDataFail)
  });

  it("Expect makeSelectBrandTrendSpinnerState to return state", () => {
    const selected = makeSelectBrandTrendSpinnerState().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.brandTrendDataSpinnerState)
  });

  it("Expect makeSelectBrandTopFilter to return state", () => {
    const selected = makeSelectBrandTopFilter().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.brandTopFilter)
  });

  it("Expect makeSelectBrandUomButton to return state", () => {
    const selected = makeSelectBrandUomButton().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.brandTrendUomButton)
  });

  it("Expect makeSelectBrandName to return state", () => {
    const selected = makeSelectBrandName().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.selectedBrandName)
  });

  it("Expect makeSelectBrandHeatmapSuccess to return state", () => {
    const selected = makeSelectBrandHeatmapSuccess().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.brandHeatMapData)
  });

  it("Expect makeSelectBrandHeatmapFail to return state", () => {
    const selected = makeSelectBrandHeatmapFail().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.brandHeatMapDataFail)
  });

  it("Expect makeSelectBrandHeatmapSpinnerState to return state", () => {
    const selected = makeSelectBrandHeatmapSpinnerState().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.brandHeatMapDataSpinnerState)
  });

  it("Expect makeSelectHeatmapButton to return state", () => {
    const selected = makeSelectHeatmapButton().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.brandHeatMapButton)
  });

  it("Expect makeSelectHeatmapTopFilter to return state", () => {
    const selected = makeSelectHeatmapTopFilter().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.brandTopHeatmapFilter)
  });

  it("Expect makeSelectHeatmapTimeFilter to return state", () => {
    const selected = makeSelectHeatmapTimeFilter().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.brandHeatmapTimeFilter)
  });

  it("Expect makeSelectBrandVsButton to return state", () => {
    const selected = makeSelectBrandVsButton().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.brandTrendButton)
  });

});
