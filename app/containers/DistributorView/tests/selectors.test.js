 import { selectDistributorViewDomain,
   makeSelectDistributorName } from '../selectors';
 import {makeSelectBrandTrendSuccess} from "../../BrandView/selectors";

describe("selectDistributorViewDomain", () => {
  const mockParameters= { //distributor trend chart
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
    trendTableDataFetchFailed:false,}
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(false);
  });

  it("Expect makeSelectDistributorName to return state", () => {
    const selected = makeSelectDistributorName().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.selectedDistributorName)
  });

});
