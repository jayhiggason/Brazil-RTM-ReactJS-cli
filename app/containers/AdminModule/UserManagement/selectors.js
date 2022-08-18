import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the userManagement state domain
 */

const selectUserManagementDomain = state =>
  state.userManagement || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserManagement
 */

const makeSelectUserManagement = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate
  );

export default makeSelectUserManagement;
export { selectUserManagementDomain };
