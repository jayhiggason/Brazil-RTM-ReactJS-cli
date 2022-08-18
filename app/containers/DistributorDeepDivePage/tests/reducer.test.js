// import produce from 'immer';
import distributorDeepDivePageReducer from "../reducer";
import {toggleCard,
  visitSalesBubbleSuccess,
  visitSalesBubbleFetch,
  visitSalesBubbleFail,
  storeTableSuccess,
  storeTableFetch,
  storeTableFail,
  storePerformanceSuccess,
  storePerformanceFilter,
  storePerformanceFetch,
  storePerformanceFail,
  productPerformanceSuccess,
  productPerformanceFetch,
  productPerformanceFail,
  distributorSalesPerformanceFetch,
  distributorSalesPerformanceFail,
  distributorSalesPerformanceButtonVsOnChange,
  distributorCardsSuccess,
  distributorCardsFetch,
  distributorCardsFail,
  channelPerformanceSuccess,
  channelPerformanceFilter,
  channelPerformanceFetch,
  channelPerformanceFail,
  channelPerformanceClickOnChange,
  distributorSalesPerformanceSuccess} from '../actions';
import distributorViewReducer from "../../DistributorView/reducer";
import {distributorTrendTableDataFetchSuccess} from "../../DistributorView/actions";

/* eslint-disable default-case, no-param-reassign */
describe("distributorDeepDivePageReducer", () => {
  let state;
  beforeEach(() => {
    state = {
      // default state params here
      //dist cards
      cardsData:{},
      distributorCardsData:[
        // {title: 'Estimate of Sellout', valueTY: 30000, valueLY: 40055},
        // {title: 'Weeks Of Stock', valueTY: 9, valueLY: 12, currentYear: 2020, change: 10},
        // {title: 'Invoice', valueTY: 960000, valueLY: 40055},
      ],
      distributorCardsDataFail: false,
      distributorCardsDataSpinnerState: false,
      cardToggleState:{
        eos:true,
        invoice:true
      },

      //visit vs sales chart
      visitSalesBubbleData: [ {
        name: 'Visit vs sales',
        data: [{
          x: 20,
          y: 54,
          z: 30
        }, {
          x: 30,
          y: 66,
          z: 10
        }]
      },],
      visitSalesBubbleDataSpinnerState: false,
      visitSalesBubbleDataFail: false,

      // distributor sales perf graph
      distributorSalesPerformanceData: [],
      distributorSalesPerformanceDataFail: false,
      distributorSalesPerformanceDataSpinnerState: true,
      distributorSalesPerformanceButton: "target",

      //product perf pareto chart
      productPerformanceData:{
        // "productPerformance": {
        //     "PED DRY FIL RMG 20KG RE19": 30768821.41,
        //     "WHISKAS DRY ADULTO CARNE 1X10,1KG RE18": 19367087.21,
        //     "WHISKAS DRY ADULTO PEIXE 1X10,1KG RE18": 14306140.13,
        //     "PEDIGREE DRY AD CARNE&FRANGO 20KG": 8453166.62,
        //     "PEDIGREE DRY AD RPEQ 20KG": 6824375.02,
        //     "PED DRY AD CARNE&VEGETAIS 20KG RE19": 6032666.09,
        //     "WHISKAS DRY GATO CAST CARNE 10,1KG RE20": 5661272.4,
        //     "PED SCH AD RP CARNE MOL 2X18X100G 2020": 5128095.51,
        //     "WHISKAS DRY FILHOTE CARNE 1X10,1KG RE18": 5046531.25,
        //     "PED SCH AD RM CARNE MOL 2X18X100G 2020": 4481874.55
        // }
      },

      productPerformanceDataFail: false,
      productPerformanceDataSpinnerState: true,

      //channel perf chart
      channelPerformanceData:[
        //     {
        //     type: 'bar',
        //     x: ['Dist 1', 'Dist 2', 'Dist 3', 'Dist 4', 'Dist 5', 'Dist 6', 'Dist 7', 'Dist 8', 'Dist 9', 'Dist 10'],
        //     y: [6, 2, 3, 4, 6, 8, 9, 10, 7, 9],
        //     name: 'Current year',
        //     marker: {"color": 'rgb(0,0,160)'}
        // }
      ],
      channelPerformanceDataFail: false,
      channelPerformanceDataSpinnerState: false,

      channelFilter:"Top 10",
      selectedChannelName:"",
      //store perf chart
      storePerformanceData:[
        // {
        // type: 'bar',
        // x: ['Store 1', 'Store 2', 'Store 3', 'Store 4', 'Store 5', 'Store 6', 'Store 7', 'Store 8', 'Store 9', 'Store 10'],
        // y: [6, 2, 3, 4, 6, 8, 9, 10, 7, 9],
        // name: 'Current year',
        // marker: {"color": 'rgb(0,0,160)'}
        // }
      ],
      storePerformanceDataFail: false,
      storePerformanceDataSpinnerState: false,
      storeFilter:"Top 10",
      //store table
      storeTableData: [],
      storeTableDataFail: false,
      storeTableDataSpinnerState: true,
    };
  });

  it("returns the initial state", () => {
    const expectedResult = state;
    expect(distributorDeepDivePageReducer(undefined, {})).toEqual(
      expectedResult
    );
  });

  it("returns the correct state for TOGGLE_CARD case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, toggleCard(data))).toMatchSnapshot()
  });

  it("returns the correct state for VISIT_SALES_BUBBLE_SUCCESS case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, visitSalesBubbleSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for VISIT_SALES_BUBBLE_FETCH case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, visitSalesBubbleFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for VISIT_SALES_BUBBLE_FAIL case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, visitSalesBubbleFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for STORE_TABLE_SUCCESS case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, storeTableSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for STORE_TABLE_FETCH case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, storeTableFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for STORE_TABLE_FAIL case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, storeTableFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for STORE_PERFORMANCE_SUCCESS case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, storePerformanceSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for STORE_PERFORMANCE_FILTER case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, storePerformanceFilter(data))).toMatchSnapshot()
  });

  it("returns the correct state for STORE_PERFORMANCE_FETCH case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, storePerformanceFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for STORE_PERFORMANCE_FAIL case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, storePerformanceFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_PERFORMANCE_SUCCESS case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, productPerformanceSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_PERFORMANCE_FETCH case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, productPerformanceFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for PRODUCT_PERFORMANCE_FAIL case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, productPerformanceFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for DISTRIBUTOR_SALES_PERFORMANCE_FETCH case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, distributorSalesPerformanceFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for DISTRIBUTOR_SALES_PERFORMANCE_FAIL case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, distributorSalesPerformanceFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for DISTRIBUTOR_SALES_PERFORMANCE_BUTTON_VS case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, distributorSalesPerformanceButtonVsOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for DISTRIBUTOR_CARDS_DATA_SUCCESS case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, distributorCardsSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for DISTRIBUTOR_CARDS_DATA_FETCH case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, distributorCardsFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for DISTRIBUTOR_CARDS_DATA_FAIL case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, distributorCardsFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for CHANNEL_PERFORMANCE_SUCCESS case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, channelPerformanceSuccess(data))).toMatchSnapshot()
  });

  it("returns the correct state for CHANNEL_PERFORMANCE_FILTER case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, channelPerformanceFilter(data))).toMatchSnapshot()
  });

  it("returns the correct state for CHANNEL_PERFORMANCE_FETCH case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, channelPerformanceFetch(data))).toMatchSnapshot()
  });

  it("returns the correct state for CHANNEL_PERFORMANCE_FAIL case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, channelPerformanceFail(data))).toMatchSnapshot()
  });

  it("returns the correct state for CHANNEL_PERFORMANCE_CLICK_ON_CHANGE case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, channelPerformanceClickOnChange(data))).toMatchSnapshot()
  });

  it("returns the correct state for DISTRIBUTOR_SALES_PERFORMANCE_SUCCESS case", () => {
    const data ='data';
    expect(distributorDeepDivePageReducer(state, distributorSalesPerformanceSuccess(data))).toMatchSnapshot()
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
