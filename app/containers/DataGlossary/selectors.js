import {createSelector} from "reselect";
import {initialState} from "./reducer";

/**
 * Direct selector to the dataGlossary state domain
 */

const selectDataGlossaryDomain = state => state.dataGlossary || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DataGlossary
 */

const makeSelectDataGlossary = () =>
    createSelector(
        selectDataGlossaryDomain,
        substate => substate
    );

const makeSelectDataGlossaryDetailedData = () =>
    createSelector(
        selectDataGlossaryDomain,
        substate => substate.dataGlossaryDetailedData
    );

const makeSelectDataGlossaryData = () =>
    createSelector(
        selectDataGlossaryDomain,
        substate => substate.dataGlossaryData
    );

const makeSelectDataGlossaryFetchSpinnerState = () =>
    createSelector(
        selectDataGlossaryDomain,
        substate => substate.dataGlossaryFetchSpinnerState
    );

const makeSelectDataGlossaryFetchFailed = () =>
    createSelector(
        selectDataGlossaryDomain,
        substate => substate.dataGlossaryFetchFailed
    );

const makeSelectGlossaryTobeModified = () =>
    createSelector(
        selectDataGlossaryDomain,
        substate => substate.glossaryTobeModified
    );

const makeSelectDataGlossaryCrudOperationSpinnerState = () =>
    createSelector(
        selectDataGlossaryDomain,
        substate => substate.dataGlossaryCrudOperationSpinnerState
    );

export default makeSelectDataGlossary;
export {
    selectDataGlossaryDomain,
    makeSelectDataGlossaryDetailedData,
    makeSelectDataGlossaryData,
    makeSelectDataGlossaryFetchSpinnerState,
    makeSelectDataGlossaryFetchFailed,
    makeSelectGlossaryTobeModified,
    makeSelectDataGlossaryCrudOperationSpinnerState
};
