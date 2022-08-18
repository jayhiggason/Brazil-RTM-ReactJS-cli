import {createSelector} from "reselect";
import {initialState} from "./reducer";

/**
 * Direct selector to the adminPage state domain
 */

const selectAdminPageDomain = state => state.Adminpage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminPage
 */

const makeSelectAdminPage = () =>
    createSelector(
        selectAdminPageDomain,
        substate => substate
    );

const makeSelectRequests = () =>
    createSelector(
        selectAdminPageDomain,
        substate => substate.userRequestsTableData
    );
const makeSelectAdminPageUserRequestsFetchSpinner = () =>
    createSelector(
        selectAdminPageDomain,
        substate => substate.userRequestsFetchSpinner
    );
const makeSelectAdminPageUserRequestsFetchFailed = () =>
    createSelector(
        selectAdminPageDomain,
        substate => substate.userRequestsFetchFailed
    );
const makeSelectAdminPageUserDataTobeModified = () =>
    createSelector(
        selectAdminPageDomain,
        substate => substate.userDataTobeModified
    );

const makeSelectAdminPageCurrentTab = () =>
    createSelector(
        selectAdminPageDomain,
        substate => substate.currentUserManagementTab
    );
const makeSelectAdminPageUsers = () =>
    createSelector(
        selectAdminPageDomain,
        substate => substate.users
    );

export default makeSelectAdminPage;
export {
    selectAdminPageDomain, makeSelectRequests,
    makeSelectAdminPageUserRequestsFetchSpinner,
    makeSelectAdminPageUserRequestsFetchFailed,
    makeSelectAdminPageUserDataTobeModified,
    makeSelectAdminPageCurrentTab,
    makeSelectAdminPageUsers
};
