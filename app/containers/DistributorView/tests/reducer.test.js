// import produce from 'immer';
import distributorViewReducer from "../reducer";
import {distributorTrendTableDataFetchSuccess,
  distributorTrendTableDataFetchFail,
  distributorTrendTableDataFetch,
  distributorTrendChartOnFilterChange,
  distributorTrendChartDataFetchSuccess,
  distributorTrendChartDataFetchFail,
  distributorTrendChartDataFetch } from '../actions';
import brandDeepDivePageReducer from "../../BrandDeepDivePage/reducer";
import {unitsToggle} from "../../BrandDeepDivePage/actions";

/* eslint-disable default-case, no-param-reassign */
describe("distributorViewReducer", () => {
  let state;
  beforeEach(() => {
    state = {
      // default state params here
      //distributor trend chart
      trendChartData : [
        // {
        //     type: 'scatter',
        //     mode: 'markers',
        //     x: ['Distributor 1', 'Distributor 2', 'Distributor 3', 'Distributor 4', 'Distributor 5', 'Distributor 6', 'Distributor 7', 'Distributor 8', 'Distributor 9', 'Distributor 10'],
        //     y: [6, 2, 3, 5, 7, 8, 2, 4, 9, 10],
        //     name: 'Target',
        //     marker: {
        //         color: '#d23226',
        //         symbol: 'line-ew-open',
        //         size: 18,
        //         width: 20
        //     },
        // },
        // {
        //     type: 'bar',
        //     x: ['Distributor 1', 'Distributor 2', 'Distributor 3', 'Distributor 4', 'Distributor 5', 'Distributor 6', 'Distributor 7', 'Distributor 8', 'Distributor 9', 'Distributor 10'],
        //     y: [6, 2, 3, 4, 6, 8, 9, 10, 7, 9],
        //     name: 'Current year',
        //     marker: {"color": '#949ecd'}
        // },
        // {
        //     type: 'bar',
        //     x: ['Distributor 1', 'Distributor 2', 'Distributor 3', 'Distributor 4', 'Distributor 5', 'Distributor 6', 'Distributor 7', 'Distributor 8', 'Distributor 9', 'Distributor 10'],
        //     y: [5, 4, 7, 4, 4, 6, 6, 2, 3, 7, 9],
        //     name: 'Last year',
        //     marker: {"color": '#5364af'}
        // }
      ],
      trendChartFilter: {
        topFilter: "Top 10",
        kpiName:"invoice"
      },
      trendChartDataFetchSpinnerState:false,
      trendChartDataFetchFailed:false,
      //distributor trend table
      trendTableData : [
        // {distributor:"D1", POS:"3", invoice:"300", units:"200", GSV:"3000", target_GSV:"4000", perc_target_GSV:"90", tonnes:"1000", target_tonnes:"2000", perc_target_tonnes:"50", WOS:"212", stock:"2000"}
      ],
      trendTableDataFetchSpinnerState:false,
      trendTableDataFetchFailed:false,
    };
  });

  it("returns the initial state", () => {
    const expectedResult = state;
    expect(distributorViewReducer(undefined, {})).toEqual(expectedResult);
  });

  it("returns the correct state for DISTRIBUTOR_TREND_TABLE_DATA_FETCH_SUCCESS case", () => {
    const data ='data';
    expect(distributorViewReducer(state, distributorTrendTableDataFetchSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for DISTRIBUTOR_TREND_TABLE_DATA_FETCH_FAIL case", () => {
    const data ='data';
    expect(distributorViewReducer(state, distributorTrendTableDataFetchFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for DISTRIBUTOR_TREND_TABLE_DATA_FETCH case", () => {
    const data ='data';
    expect(distributorViewReducer(state, distributorTrendTableDataFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for DISTRIBUTOR_TREND_CHART_ON_FILTER_CHANGE case", () => {
    const data ='data';
    expect(distributorViewReducer(state, distributorTrendChartOnFilterChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for DISTRIBUTOR_TREND_CHART_DATA_FETCH_SUCCESS case", () => {
    const data ='data';
    expect(distributorViewReducer(state, distributorTrendChartDataFetchSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for DISTRIBUTOR_TREND_CHART_DATA_FETCH_FAIL case", () => {
    const data ='data';
    expect(distributorViewReducer(state, distributorTrendChartDataFetchFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for DISTRIBUTOR_TREND_CHART_DATA_FETCH case", () => {
    const data ='data';
    expect(distributorViewReducer(state, distributorTrendChartDataFetch(data))).toMatchSnapshot()
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
