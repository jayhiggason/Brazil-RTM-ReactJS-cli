import { selectStoreViewDomain,
  makeSelectStoreGeoMapSuccess,
  makeSelectStoreHeatmapButton,
  makeSelectStoreHeatMapFilter,
  makeSelectStoreHeatMapSuccess,
  makeSelectStoreHeatMapTimeFilter,
  makeSelectStoreTopFilter,
  makeSelectStoreTrendTableSuccess } from '../selectors';
import {makeSelectBrandBubbleFail} from "../../PerformanceSummary/selectors";

describe("selectStoreViewDomain", () => {
  const mockParameters = { //store trend table
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
  }
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it("Expect makeSelectStoreGeoMapSuccess to return state", () => {
    const selected = makeSelectStoreGeoMapSuccess().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.storeGeoMapData)
  });

  it("Expect makeSelectStoreHeatmapButton to return state", () => {
    const selected = makeSelectStoreHeatmapButton().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.storeHeatMapButton)
  });

  it("Expect makeSelectStoreHeatMapFilter to return state", () => {
    const selected = makeSelectStoreHeatMapFilter().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.storeHeatMapFilter)
  });

  it("Expect makeSelectStoreHeatMapSuccess to return state", () => {
     const selected = makeSelectStoreHeatMapSuccess().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.storeHeatMapData)
  });

  it("Expect makeSelectStoreHeatMapTimeFilter to return state", () => {
    const selected = makeSelectStoreHeatMapTimeFilter().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.storeHeatMapTimeFilter)
  });

  it("Expect makeSelectStoreTopFilter to return state", () => {
    const selected = makeSelectStoreTopFilter().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.storeTopFilter)
  });

  it("Expect makeSelectStoreTrendTableSuccess to return state", () => {
    const selected = makeSelectStoreTrendTableSuccess().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.storeTrendTableData)
  });

});
