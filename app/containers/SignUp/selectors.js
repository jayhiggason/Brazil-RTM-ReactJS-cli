import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the signUp state domain
 */

const selectSignUpDomain = state => state.signUp || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SignUp
 */

const makeSelectSignUp = () =>
  createSelector(
    selectSignUpDomain,
    substate => substate
  );
const makeSelectSignUpUserInfo = () =>
    createSelector(
        selectSignUpDomain,
        substate => substate.userInfo
    );

const makeSelectSignUpAlerts = () =>
    createSelector(
        selectSignUpDomain,
        substate => substate.alerts
    );

export default makeSelectSignUp;
export { selectSignUpDomain, makeSelectSignUpUserInfo,makeSelectSignUpAlerts };
