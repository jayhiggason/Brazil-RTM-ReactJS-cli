import {createSelector} from "reselect";
import {initialState} from "./reducer";

/**
 * Direct selector to the alerts state domain
 */

const selectAlertsDomain = state => state.alerts || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Alerts
 */

const makeSelectAlerts = () =>
    createSelector(
        selectAlertsDomain,
        substate => substate
    );

export default makeSelectAlerts;
export {selectAlertsDomain};
