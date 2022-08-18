import {createSelector} from "reselect";
import {initialState} from "./reducer";

/**
 * Direct selector to the userPreferences state domain
 */

const selectUserPreferencesDomain = state =>
    state.userPreferences || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserPreferences
 */

const makeSelectUserPreferences = () =>
    createSelector(
        selectUserPreferencesDomain,
        substate => substate
    );

export default makeSelectUserPreferences;
export {selectUserPreferencesDomain};
