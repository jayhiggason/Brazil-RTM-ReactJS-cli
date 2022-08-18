import {
  selectBrandDeepDivePageDomain,
  makeSelectSkuTableSuccess,
  makeSelectSkuTableSpinnerState,
  makeSelectCardsSuccess,
  makeSelectSkuTableFilter,
  makeSelectSkuTableFail,
  makeSelectSelectedCategoryFilter,
  makeSelectSelectedCategoryComparisonFilter,
  makeSelectSeeTrendsSpinnerState,
  makeSelectSeeTrendsLineSuccess,
  makeSelectSeeTrendsLineFail,
  makeSelectProductVsButton,
  makeSelectProductUomButton ,
  makeSelectProductTrendSuccess,
  makeSelectProductTrendSpinnerState,
  makeSelectProductTrendFail,
  makeSelectProductSkuTrendSpinnerState,
  makeSelectProductSkuTrendSelectedFilter,
  makeSelectProductSkuTrendFilterSuccess,
  makeSelectProductSkuTrendFilterFail,
  makeSelectProductFilter,
  makeSelectItemHeatMapSuccess,
  makeSelectItemHeatMapSpinnerState,
  makeSelectItemHeatMapFail,
  makeSelectHeatMapTimeFilter,
  makeSelectCardsFail,
  makeSelectHeatMapFilter,
  makeSelectInvoiceToggle,
  makeSelectHeatMapButton,
  makeSelectCategoryComparisonFilterSuccess,
  makeSelectCategoryComparisonFilterSpinnerState,
  makeSelectCategoryComparisonFilterFail,
  makeSelectCardsSpinnerState,
  makeSelectUnitsToggle,
  makeSelectCategoryFilterSuccess,
  makeSelectCategoryFilterSuccess,
  makeSelectCategoryFilterFail,
  makeSelectCategoryFilterSpinnerState} from '../selectors';

describe("selectBrandDeepDivePageDomain", () => {
  const mockParameters ={  // cards data
    cardsData :{},
    sampleCardsTransformedData:[ { title: 'Invoice', valueTY: '$ 960000', valueLY: '$ 2220053', currentYear: 2020, change: '$ 100000' },
      { title: 'Units', valueTY: '45000', valueLY: 45652, currentYear: 2020, change: '75000' },
      { title: 'Weeks Of Stock', valueTY: 9, valueLY: 12, currentYear: 2020, change: '10' },
      { title: 'Point of Sales', valueTY: '300', valueLY: '55', currentYear: 2020 },],
    cardsTransformedData: [],
    cardsDataFail: false,
    cardsDataSpinnerState: false,
    invoiceToggle: true,
    unitsToggle: true,
    cardToggleState:{
      invoice:true,
      units:true
    },

    // see trends filter
    categoryKpiList:["brand","category","distributor"],
    selectedCategoryKpi: "brand",
    categoryFilterData: [],
    categorySelectedFilterData:[],
    categoryFilterFail: false,
    categoryFilterSpinnerState: true,

    // see trends line
    kpiCard:"",
    trendLineData: {
      xAxis:[],
      series:[]
    },
    trendLineFail: false,
    trendLineSpinnerState: true,

    /// see trends line-old
    seeTrendLineData: [],
    seeTrendLineFail: false,
    seeTrendLineSpinnerState: true,

    // product/sku trend graph
    productWholeData:[],
    productTrendData: [],
    productTrendDataFail: false,
    productTrendDataSpinnerState: true,

    productTrendButton: "brand",
    productTrendFilter: "Top 10",
    productTrendUomFilter:"Invoice",
    //product/sku filter

    productSkuTrendFilterData:[],
    productSkuTrendFilterFail: false,
    productSkuTrendFilterSpinnerState: true,
    selectedProductSkuTrendFilter: [],


    // item heatmap graph
    itemHeatMapData: [],
    itemHeatMapDataFail: false,
    itemHeatMapDataSpinnerState: true,

    itemHeatMapButton: "Invoice",
    itemHeatMapFilter: "Actual",
    itemHeatMapTimeFilter:"Period",

    // sku table
    skuTableData: {},
    skuTableDataFail: true,
    skuTableDataSpinnerState: false,
    skuFilter: "",

  }
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it("Expect makeSelectCardsSuccess to return state", () => {
    const selected = makeSelectCardsSuccess().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.cardsData)
  });

  it("Expect makeSelectCardsFail to return state", () => {
    const selected = makeSelectCardsFail().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.cardsDataFail)
  });

  it("Expect makeSelectCardsSpinnerState to return state", () => {
    const selected = makeSelectCardsSpinnerState().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.cardsDataSpinnerState)
  });

  it("Expect makeSelectInvoiceToggle to return state", () => {
    const selected = makeSelectInvoiceToggle().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.invoiceToggle)
  });

  it("Expect makeSelectUnitsToggle to return state", () => {
    const selected = makeSelectUnitsToggle().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.unitsToggle)
  });

  it("Expect makeSelectCategoryFilterSuccess to return state", () => {
    const selected = makeSelectCategoryFilterSuccess().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.categoryFilterData)
  });

  it("Expect makeSelectCategoryFilterFail to return state", () => {
    const selected = makeSelectCategoryFilterFail().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.categoryFilterFail)
  });

  it("Expect makeSelectCategoryFilterFail to return state", () => {
    const selected = makeSelectCategoryFilterFail().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.categoryFilterFail)
  });

  it("Expect makeSelectCategoryFilterSpinnerState to return state", () => {
    const selected = makeSelectCategoryFilterSpinnerState().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.categoryFilterSpinnerState)
  });

  it("Expect makeSelectSelectedCategoryFilter to return state", () => {
    const selected = makeSelectSelectedCategoryFilter().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.selectedCategory)
  });

  it("Expect makeSelectCategoryComparisonFilterSuccess to return state", () => {
    const selected = makeSelectCategoryComparisonFilterSuccess().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.categoryComparisonFilterData)
  });

  it("Expect makeSelectCategoryComparisonFilterFail to return state", () => {
    const selected = makeSelectCategoryComparisonFilterFail().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.categoryComparisonFilterFail)
  });

  it("Expect makeSelectCategoryComparisonFilterSpinnerState to return state", () => {
    const selected = makeSelectCategoryComparisonFilterSpinnerState().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.categoryComparisonFilterSpinnerState)
  });

  it("Expect makeSelectSelectedCategoryComparisonFilter to return state", () => {
    const selected = makeSelectSelectedCategoryComparisonFilter().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.selectedCategoryComparison)
  });

  it("Expect makeSelectSeeTrendsLineSuccess to return state", () => {
    const selected = makeSelectSeeTrendsLineSuccess().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.seeTrendLineData)
  });

  it("Expect makeSelectSeeTrendsLineFail to return state", () => {
    const selected = makeSelectSeeTrendsLineFail().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.seeTrendLineFail)
  });


  it("Expect makeSelectSeeTrendsSpinnerState to return state", () => {
    const selected = makeSelectSeeTrendsSpinnerState().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.seeTrendLineSpinnerState)
  });

  it("Expect makeSelectSkuTableSuccess to return state", () => {
    const selected = makeSelectSkuTableSuccess().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.skuTableData)
  });

  it("Expect makeSelectSkuTableSpinnerState to return state", () => {
    const selected = makeSelectSkuTableSpinnerState().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.skuTableDataSpinnerState)
  });

  it("Expect makeSelectSkuTableFilter to return state", () => {
    const selected = makeSelectSkuTableFilter().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.skuFilter)
  });

  it("Expect makeSelectSkuTableFail to return state", () => {
    const selected = makeSelectSkuTableFail().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.skuTableDataFail)
  });

  it("Expect makeSelectProductVsButton to return state", () => {
    const selected = makeSelectProductVsButton().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.productTrendButton)
  });

  it("Expect makeSelectProductUomButton to return state", () => {
    const selected = makeSelectProductUomButton().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.productTrendUomFilter)
  });

  it("Expect makeSelectProductTrendSpinnerState to return state", () => {
    const selected = makeSelectProductTrendSpinnerState().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.productTrendDataSpinnerState)
  });

  it("Expect makeSelectProductTrendSuccess to return state", () => {
    const selected = makeSelectProductTrendSuccess().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.productTrendData)
  });

  it("Expect makeSelectProductTrendFail to return state", () => {
    const selected = makeSelectProductTrendFail().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.productTrendDataFail)
  });

  it("Expect makeSelectProductSkuTrendSpinnerState to return state", () => {
    const selected = makeSelectProductSkuTrendSpinnerState().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.productSkuTrendFilterSpinnerState)
  });

  it("Expect makeSelectProductSkuTrendSelectedFilter to return state", () => {
    const selected = makeSelectProductSkuTrendSelectedFilter().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.selectedProductSkuTrendFilter)
  });

  it("Expect makeSelectProductSkuTrendFilterSuccess to return state", () => {
    const selected = makeSelectProductSkuTrendFilterSuccess().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.productSkuTrendFilterData)
  });

  it("Expect makeSelectProductSkuTrendFilterFail to return state", () => {
    const selected = makeSelectProductSkuTrendFilterFail().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.productSkuTrendFilterFail)
  });

  it("Expect makeSelectProductFilter to return state", () => {
    const selected = makeSelectProductFilter().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.productTrendFilter)
  });

  it("Expect makeSelectItemHeatMapSuccess to return state", () => {
    const selected = makeSelectItemHeatMapSuccess().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.itemHeatMapData)
  });

  it("Expect makeSelectItemHeatMapSpinnerState to return state", () => {
    const selected = makeSelectItemHeatMapSpinnerState().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.itemHeatMapDataSpinnerState)
  });

  it("Expect makeSelectItemHeatMapFail to return state", () => {
    const selected = makeSelectItemHeatMapFail().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.itemHeatMapDataFail)
  });

  it("Expect makeSelectHeatMapTimeFilter to return state", () => {
    const selected = makeSelectHeatMapTimeFilter().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.itemHeatMapTimeFilter)
  });

  it("Expect makeSelectHeatMapFilter to return state", () => {
    const selected = makeSelectHeatMapFilter().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.itemHeatMapFilter)
  });

  it("Expect makeSelectHeatMapButton to return state", () => {
    const selected = makeSelectHeatMapButton().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.itemHeatMapButton)
  });

  it("Expect makeSelectDistributorKpiButtons to return state", () => {
    const selected = makeSelectDistributorKpiButtons().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.itemHeatMapButton)
  });


});
