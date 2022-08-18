import {createSelector} from "reselect";
import {initialState} from "./reducer";

/**
 * Direct selector to the faqModule state domain
 */

const selectFaqModuleDomain = state => state.faqModule || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FaqModule
 */

const makeSelectFaqModule = () =>
    createSelector(
        selectFaqModuleDomain,
        substate => substate
    );

const makeSelectFaqModuleTableData = () =>
    createSelector(
        selectFaqModuleDomain,
        substate => substate.faqTableData
    );

const makeSelectFaqModuleFetchDataSpinnerState = () =>
    createSelector(
        selectFaqModuleDomain,
        substate => substate.faqFetchDataSpinnerState
    );

const makeSelectFaqModuleFetchDataFailed = () =>
    createSelector(
        selectFaqModuleDomain,
        substate => substate.faqFetchDataFailed
    );

const makeSelectFaqModuleFaqToBeOperated = () =>
    createSelector(
        selectFaqModuleDomain,
        substate => substate.faqToBeOperated
    );

const makeSelectFaqModuleOperationSpinnerState = () =>
    createSelector(
        selectFaqModuleDomain,
        substate => substate.operationSpinnerState
    );

export default makeSelectFaqModule;
export {
    selectFaqModuleDomain,
    makeSelectFaqModuleTableData,
    makeSelectFaqModuleFetchDataSpinnerState,
    makeSelectFaqModuleFetchDataFailed,
    makeSelectFaqModuleFaqToBeOperated,
    makeSelectFaqModuleOperationSpinnerState
};
