import {
    selectDistributorDeepDivePageDomain,
    makeSelectChannelFilter,
    makeSelectChannelName,
    makeSelectChannelPerformanceSuccess,
    makeSelectDistributorCardsSuccess,
    makeSelectDistributorSalesPerformanceFail,
    makeSelectDistributorSalesPerformanceSpinnerState,
    makeSelectDistributorSalesPerformanceSuccess,
    makeSelectDistributorSalesPerformanceVsButton,
    makeSelectProductPerformanceFail,
    makeSelectProductPerformanceSpinnerState,
    makeSelectProductPerformanceSuccess,
    makeSelectStoreFilter,
    makeSelectStorePerformanceSuccess,
    makeSelectStoreTableSuccess,
    makeSelectVisitSalesBubbleSuccess
} from '../selectors';
import {makeSelectDistributorName} from "../../DistributorView/selectors";

describe("selectDistributorDeepDivePageDomain", () => {
    const mockParameters = {//dist cards
        cardsData: {},
        distributorCardsData: [],
        distributorCardsDataFail: false,
        distributorCardsDataSpinnerState: false,
        cardToggleState: {
            eos: true,
            invoice: true
        },

        //visit vs sales chart
        visitSalesBubbleData: [{
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
        productPerformanceData: {},

        productPerformanceDataFail: false,
        productPerformanceDataSpinnerState: true,

        //channel perf chart
        channelPerformanceData: [],
        channelPerformanceDataFail: false,
        channelPerformanceDataSpinnerState: false,

        channelFilter: "Top 10",
        selectedChannelName: "",
        //store perf chart
        storePerformanceData: [],
        storePerformanceDataFail: false,
        storePerformanceDataSpinnerState: false,
        storeFilter: "Top 10",
        //store table
        storeTableData: [],
        storeTableDataFail: false,
        storeTableDataSpinnerState: true,
    };
    it("Expect to have unit tests specified", () => {
        expect(true).toEqual(true);
    });

    it("Expect makeSelectChannelFilter to return state", () => {
        const selected = makeSelectChannelFilter().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.channelFilter)
    });

    it("Expect makeSelectChannelName to return state", () => {
        const selected = makeSelectChannelName().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.selectedChannelName)
    });

    it("Expect makeSelectChannelPerformanceSuccess to return state", () => {
        const selected = makeSelectChannelPerformanceSuccess().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.channelPerformanceData)
    });

    it("Expect makeSelectDistributorCardsSuccess to return state", () => {
        const selected = makeSelectDistributorCardsSuccess().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.distributorCardsData)
    });

    it("Expect makeSelectDistributorSalesPerformanceFail to return state", () => {
        const selected = makeSelectDistributorSalesPerformanceFail().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.distributorSalesPerformanceDataFail)
    });

    it("Expect makeSelectDistributorSalesPerformanceSpinnerState to return state", () => {
        const selected = makeSelectDistributorSalesPerformanceSpinnerState().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.distributorSalesPerformanceDataSpinnerState)
    });

    it("Expect makeSelectDistributorSalesPerformanceSuccess to return state", () => {
        const selected = makeSelectDistributorSalesPerformanceSuccess().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.distributorSalesPerformanceData)
    });

    it("Expect makeSelectDistributorSalesPerformanceVsButton to return state", () => {
        const selected = makeSelectDistributorSalesPerformanceVsButton().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.distributorSalesPerformanceButton)
    });

    it("Expect makeSelectProductPerformanceFail to return state", () => {
        const selected = makeSelectProductPerformanceFail().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.productPerformanceDataFail)
    });

    it("Expect makeSelectProductPerformanceSpinnerState to return state", () => {
        const selected = makeSelectProductPerformanceSpinnerState().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.productPerformanceDataSpinnerState)
    });

    it("Expect makeSelectProductPerformanceSuccess to return state", () => {
        const selected = makeSelectProductPerformanceSuccess().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.productPerformanceData)
    });

    it("Expect makeSelectStoreFilter to return state", () => {
        const selected = makeSelectStoreFilter().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.storeFilter)
    });

    it("Expect makeSelectStorePerformanceSuccess to return state", () => {
        const selected = makeSelectStorePerformanceSuccess().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.storePerformanceData)
    });

    it("Expect makeSelectStoreTableSuccess to return state", () => {
        const selected = makeSelectStoreTableSuccess().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.storeTableData)
    });

    it("Expect makeSelectVisitSalesBubbleSuccess to return state", () => {
        const selected = makeSelectVisitSalesBubbleSuccess().resultFunc(mockParameters);
        expect(selected).toEqual(mockParameters.visitSalesBubbleData)
    });

});
