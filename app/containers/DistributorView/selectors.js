import {createSelector} from "reselect";
import {initialState} from "./reducer";

/**
 * Direct selector to the distributorView state domain
 */

const selectDistributorViewDomain = state =>
    state.distributorView || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DistributorView
 */

const makeSelectDistributorView = () =>
    createSelector(
        selectDistributorViewDomain,
        substate => substate
    );
//SELECTED DISTRIBUTOR NAME
const makeSelectDistributorName = () =>
    createSelector(
        selectDistributorViewDomain,
        substate => substate.selectedDistributorName
    );

const makeSelectDistributorTrendFilter = () => createSelector(
    selectDistributorViewDomain,
    substate => substate.trendChartFilter.kpiFilter
);


export default makeSelectDistributorView;
export {selectDistributorViewDomain,makeSelectDistributorName,makeSelectDistributorTrendFilter};
