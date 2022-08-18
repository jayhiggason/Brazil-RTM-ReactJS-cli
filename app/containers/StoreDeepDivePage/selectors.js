import {createSelector} from "reselect";
import {initialState} from "./reducer";

/**
 * Direct selector to the storeDeepDivePage state domain
 */

const selectStoreDeepDivePageDomain = state =>
    state.storeDeepDivePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by StoreDeepDivePage
 */

const makeSelectStoreDeepDivePage = () =>
    createSelector(
        selectStoreDeepDivePageDomain,
        substate => substate
    );

//sales performance
const makeSelectSalesPerformanceSuccess = () =>
    createSelector(
        selectStoreDeepDivePageDomain,
        substate => substate.salesPerformanceData
    );
const makeSelectSalesPerformanceButton = () =>
    createSelector(
        selectStoreDeepDivePageDomain,
        substate => substate.salesPerformanceButton
    );

//purchase analysis
const makeSelectPurchaseAnalysisSuccess = () =>
    createSelector(
        selectStoreDeepDivePageDomain,
        substate => substate.purchaseAnalysisData
    );
const makeSelectPurchaseAnalysisButton = () =>
    createSelector(
        selectStoreDeepDivePageDomain,
        substate => substate.purchaseAnalysisButton
    );
//PURCHASE ANALYSIS BEST PRODUCT MIX
//purchase analysis
const makeSelectPurchaseAnalysisBestMixSuccess = () =>
    createSelector(
        selectStoreDeepDivePageDomain,
        substate => substate.purchaseAnalysisBestMixData
    );
//pareto analysis
const makeSelectParetoAnalysisSuccess = () =>
    createSelector(
        selectStoreDeepDivePageDomain,
        substate => substate.paretoAnalysisData
    );
//pareto filter
const makeSelectParetoAnalysisFilter = () =>
    createSelector(
        selectStoreDeepDivePageDomain,
        substate => substate.paretoAnalysisButton
    );
//product analysis
const makeSelectProductAnalysisSuccess = () =>
    createSelector(
        selectStoreDeepDivePageDomain,
        substate => substate.productAnalysisData
    );
//product analysis FILTER button
const makeSelectProductAnalysisButton = () =>
    createSelector(
        selectStoreDeepDivePageDomain,
        substate => substate.productAnalysisFilter
    );
//product analysis KPI button
const makeSelectProductAnalysisKpiButton = () =>
    createSelector(
        selectStoreDeepDivePageDomain,
        substate => substate.productAnalysisKpiButton
    );
//product distribution
const makeSelectProductDistributionSuccess = () =>
    createSelector(
        selectStoreDeepDivePageDomain,
        substate => substate.productDistributionData
    );
//product distribution button
const makeSelectProductDistributionButton = () =>
    createSelector(
        selectStoreDeepDivePageDomain,
        substate => substate.productDistributionButton
    );
//prod dist filter
const makeSelectStoreProductTopFilter = () =>
    createSelector(
        selectStoreDeepDivePageDomain,
        substate => substate.storeProductTopFilter
    );
export default makeSelectStoreDeepDivePage;
export {
    selectStoreDeepDivePageDomain,
    makeSelectSalesPerformanceSuccess,
    makeSelectSalesPerformanceButton,
    makeSelectPurchaseAnalysisSuccess,
    makeSelectPurchaseAnalysisButton,
    makeSelectPurchaseAnalysisBestMixSuccess,
    makeSelectParetoAnalysisSuccess,
    makeSelectParetoAnalysisFilter,
    makeSelectProductAnalysisSuccess,
    makeSelectProductAnalysisButton,
    makeSelectProductDistributionSuccess,
    makeSelectProductDistributionButton,
    makeSelectProductAnalysisKpiButton,
    makeSelectStoreProductTopFilter
};
