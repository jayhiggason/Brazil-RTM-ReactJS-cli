import {createSelector} from "reselect";
import {initialState} from "./reducer";
import {selectBrandDeepDivePageDomain} from "../BrandDeepDivePage/selectors";

/**
 * Direct selector to the performanceSummary state domain
 */

const selectPerformanceSummaryDomain = state =>
    state.performanceSummary || initialState;


/**
 * Default selector used by PerformanceSummary
 */

const makeSelectPerformanceSummary = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate
    );

/**
 * Other specific selectors
 */


// brand bubble

const makeSelectBrandBubbleSuccess = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.brandBubbleData
    );

const makeSelectBrandBubbleFail = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.brandBubbleDataFail
    );

const makeSelectBrandBubbleSpinnerState = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.brandBubbleDataFail
    );

const makeSelectBrandBubbleTimeFilterOnChange = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.brandBubbleTimeFilter
    );

const makeSelectBrandBubbleButtonOnChange = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.brandBubbleButton
    );

//  distributor table
const makeSelectDistributorTableSuccess = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.distributorTableData
    );

const makeSelectDistributorTableFail = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.distributorTableDataFail
    );

const makeSelectDistributorTableSpinnerState = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.distributorTableDataSpinnerState
    );

const makeSelectDistributorKpiButtons = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.distributorKpiButtons
    );

const makeSelectDistributorTableFilter = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.topFilter
    );


// cards data
const makeSelectCardsSuccess = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.cardsData
    );

const makeSelectCardsFail = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.cardsDataFail
    );

const makeSelectCardsSpinnerState = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.cardsDataSpinnerState
    );

const makeSelectInvoiceToggle = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.invoiceToggle
    );
const makeSelectUnitsToggle = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.unitsToggle
    );

// see trends filters

const makeSelectCategoryFilterSuccess = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.categoryFilterData
    );

const makeSelectCategoryFilterFail = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.categoryFilterFail
    );

const makeSelectCategoryFilterSpinnerState = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.categoryFilterSpinnerState
    );

const makeSelectGuidedInsightsSuccess = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.guidedInsightsData
    );

const makeSelectGuidedInsightsFail = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.guidedInsightsDataFail
    );

const makeSelectGuidedInsightsSpinnerState = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.guidedInsightsDataSpinnerState
    );
const makeSelectGuidedInsightsFilter = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.guidedInsightsFilter
    );
const makeSelectGuidedInsightsButton = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.guidedInsightsButton
    );
const makeSelectGuidedInsightsTypeFilter =
    () =>
        createSelector(
            selectPerformanceSummaryDomain,
            substate => substate.guidedInsightsTypeFilter
        );
const makeSelectGuidedInsightsToggle = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.guidedInsightsToggle
    );
//year period filter

const makeSelectYearPeriodFilterSuccess = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.yearPeriodFilterData
    );

const makeSelectYearPeriodSelectedFilterData = () =>
    createSelector(
        selectPerformanceSummaryDomain,
        substate => substate.selectedYearPeriodFilter
    );
export default makeSelectPerformanceSummary;
export {
    selectPerformanceSummaryDomain,
    makeSelectBrandBubbleSuccess,
    makeSelectBrandBubbleFail,
    makeSelectBrandBubbleTimeFilterOnChange,
    makeSelectBrandBubbleButtonOnChange,
    makeSelectBrandBubbleSpinnerState,
    makeSelectDistributorTableSuccess,
    makeSelectDistributorTableFail,
    makeSelectDistributorTableSpinnerState,
    makeSelectCardsSuccess,
    makeSelectCardsFail,
    makeSelectCardsSpinnerState,
    makeSelectInvoiceToggle,
    makeSelectUnitsToggle,
    makeSelectDistributorKpiButtons,
    makeSelectDistributorTableFilter,
    makeSelectCategoryFilterSuccess,
    makeSelectCategoryFilterFail,
    makeSelectCategoryFilterSpinnerState,
    makeSelectGuidedInsightsSuccess,
    makeSelectGuidedInsightsFail,
    makeSelectGuidedInsightsSpinnerState,
    makeSelectGuidedInsightsFilter,
    makeSelectGuidedInsightsButton,
    makeSelectGuidedInsightsTypeFilter,
    makeSelectGuidedInsightsToggle,
    makeSelectYearPeriodFilterSuccess,
    makeSelectYearPeriodSelectedFilterData
};
