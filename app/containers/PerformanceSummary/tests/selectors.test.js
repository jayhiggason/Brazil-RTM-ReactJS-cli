import { selectPerformanceSummaryDomain,
    makeSelectBrandBubbleFail,
    makeSelectBrandBubbleSpinnerState,
    makeSelectBrandBubbleSuccess,
    makeSelectBrandBubbleTimeFilterOnChange,
    makeSelectCardsFail,
    makeSelectCardsSpinnerState,
    makeSelectCardsSuccess,
    makeSelectCategoryFilterFail,
    makeSelectCategoryFilterSpinnerState,
    makeSelectCategoryFilterSuccess,
    makeSelectDistributorKpiButtons,
    makeSelectDistributorTableFail,
    makeSelectDistributorTableFilter,
    makeSelectDistributorTableSpinnerState,
    makeSelectDistributorTableSuccess,
    makeSelectInvoiceToggle,
    makeSelectUnitsToggle} from '../selectors';

describe("selectPerformanceSummaryDomain", () => {
  const mockParameters = {// brand bubble graph
      brandBubbleData: [],
      brandBubbleDataSpinnerState: true,
      brandBubbleDataFail: false,
      brandBubbleTimeFilter:"Period",
      // distributor table
      distributorTableData: [],
      distributorTableDataFail: false,
      distributorTableDataSpinnerState: true,
      distributorKpiButtons: "Invoice",
      topFilter: "Top 10",
      distributorsPerformanceFilter:{
          topFilter: "Top 10",
          kpiName:"invoice"
      },

      // cards data
      cardsData :{},
      cardsTransformedData: [],
      cardsDataFail: false,
      cardsDataSpinnerState: true,
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
  }
   it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });


  it("Expect makeSelectBrandBubbleFail to return state", () => {
  const selected = makeSelectBrandBubbleFail().resultFunc(mockParameters);
    expect(selected).toEqual(mockParameters.brandBubbleDataFail)
  });

    it("Expect makeSelectBrandBubbleSpinnerState to return state", () => {
        const selected = makeSelectBrandBubbleSpinnerState().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.brandBubbleDataSpinnerState)
    });

    it("Expect makeSelectBrandBubbleSuccess to return state", () => {
        const selected = makeSelectBrandBubbleSuccess().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.brandBubbleData)
    });

    it("Expect makeSelectBrandBubbleTimeFilterOnChange to return state", () => {
        const selected = makeSelectBrandBubbleTimeFilterOnChange().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.brandBubbleTimeFilter)
    });

    it("Expect makeSelectDistributorTableSuccess to return state", () => {
        const selected = makeSelectDistributorTableSuccess().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.distributorTableData)
    });

    it("Expect makeSelectDistributorTableFail to return state", () => {
        const selected = makeSelectDistributorTableFail().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.distributorTableDataFail)
    });

    it("Expect makeSelectDistributorTableSpinnerState to return state", () => {
        const selected = makeSelectDistributorTableSpinnerState().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.distributorTableDataSpinnerState)
    });

    it("Expect makeSelectDistributorKpiButtons to return state", () => {
        const selected = makeSelectDistributorKpiButtons().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.distributorKpiButtons)
    });

    it("Expect makeSelectDistributorTableFilter to return state", () => {
        const selected = makeSelectDistributorTableFilter().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.topFilter)
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

    it("Expect makeSelectCategoryFilterSpinnerState to return state", () => {
        const selected = makeSelectCategoryFilterSpinnerState().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.categoryFilterSpinnerState)
    });

    it("Expect makeSelectCategoryFilterSpinnerStatey to return state", () => {
        const selected = makeSelectCategoryFilterSpinnerStatey().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.categoryFilterSpinnerState)
    });

});



