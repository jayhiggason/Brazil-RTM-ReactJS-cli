import {createSelector} from "reselect";
import {initialState} from "./reducer";


/**
 * Direct selector to the distributorDeepDivePage state domain
 */

const selectDistributorDeepDivePageDomain = state =>
    state.distributorDeepDivePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DistributorDeepDivePage
 */

const makeSelectDistributorDeepDivePage = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate
    );

// dist chart
const makeSelectDistributorCardsSuccess = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.distributorCardsData
    );


//visit vs sales
const makeSelectVisitSalesBubbleSuccess = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.visitSalesBubbleData
    );
const makeSelectVisitSalesBubbleFilter = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.visitSalesFilter
    );

// dist sales performance graph
const makeSelectDistributorSalesPerformanceSuccess = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.distributorSalesPerformanceData
    );
const makeSelectDistributorSalesPerformanceFail = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.distributorSalesPerformanceDataFail
    );
const makeSelectDistributorSalesPerformanceSpinnerState = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.distributorSalesPerformanceDataSpinnerState
    );

const makeSelectDistributorSalesPerformanceVsButton = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.distributorSalesPerformanceButton
    );

const makeSelectDistributorSalesPerformanceKpiButton = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.distributorSalesPerformanceKpiButton
    );

// product sales perf - pareto

const makeSelectProductPerformanceSuccess = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.productPerformanceData
    );
const makeSelectProductPerformanceFail = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.productPerformanceDataFail
    );
const makeSelectProductPerformanceSpinnerState = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.productPerformanceDataSpinnerState
    );

const makeSelectProductPerformanceButton = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.productPerformanceButton
    );
//channel perf
const makeSelectChannelPerformanceSuccess = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.channelPerformanceData
    );

const makeSelectChannelFilter = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.channelFilter
    );
const makeSelectChannelPerformanceButton = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.channelPerformanceButton
    );

//SELECTED channel name

const makeSelectChannelName = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.selectedChannelName
    );
//store perf

const makeSelectStorePerformanceSuccess = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.storePerformanceData
    );

const makeSelectStoreFilter = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.storeFilter
    );
const makeSelectStorePerformanceButton = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.storePerformanceButton
    );

//store table
const makeSelectStoreTableSuccess = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.storeTableData
    );
const makeSelectStoreTableButton = () =>
    createSelector(
        selectDistributorDeepDivePageDomain,
        substate => substate.storeTableButton
    );

export default makeSelectDistributorDeepDivePage;
export {
    selectDistributorDeepDivePageDomain,
    makeSelectDistributorCardsSuccess,
    makeSelectVisitSalesBubbleSuccess,
    makeSelectVisitSalesBubbleFilter,
    makeSelectDistributorSalesPerformanceSuccess,
    makeSelectDistributorSalesPerformanceFail,
    makeSelectDistributorSalesPerformanceSpinnerState,
    makeSelectDistributorSalesPerformanceVsButton,
    makeSelectDistributorSalesPerformanceKpiButton,
    makeSelectProductPerformanceSuccess,
    makeSelectProductPerformanceFail,
    makeSelectProductPerformanceSpinnerState,
    makeSelectProductPerformanceButton,
    makeSelectChannelPerformanceSuccess,
    makeSelectChannelPerformanceButton,
    makeSelectChannelFilter,
    makeSelectChannelName,
    makeSelectStorePerformanceSuccess,
    makeSelectStorePerformanceButton,
    makeSelectStoreFilter,
    makeSelectStoreTableSuccess,
    makeSelectStoreTableButton

};
