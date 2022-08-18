import {createSelector} from "reselect";
import {initialState} from "./reducer";

/**
 * Direct selector to the brandView state domain
 */

const selectBrandViewDomain = state => state.brandView || initialState;


/**
 * Default selector used by BrandView
 */

const makeSelectBrandView = () =>
    createSelector(
        selectBrandViewDomain,
        substate => substate
    );

/**
 * Other specific selectors
 */

// brandTrend graph
const makeSelectBrandTrendSuccess = () =>
    createSelector(
        selectBrandViewDomain,
        substate => substate.brandTrendData
    );
const makeSelectBrandTrendFail = () =>
    createSelector(
        selectBrandViewDomain,
        substate => substate.brandTrendDataFail
    );
const makeSelectBrandTrendSpinnerState = () =>
    createSelector(
        selectBrandViewDomain,
        substate => substate.brandTrendDataSpinnerState
    );

const makeSelectBrandVsButton = () =>
    createSelector(
        selectBrandViewDomain,
        substate => substate.brandTrendButton
    );

const makeSelectBrandTopFilter = () =>
    createSelector(
        selectBrandViewDomain,
        substate => substate.brandTopFilter
    );

const makeSelectBrandUomButton = () =>
    createSelector(
        selectBrandViewDomain,
        substate => substate.brandTrendUomButton
    );

//SELECTED BRAND NAME
const makeSelectBrandName = () =>
    createSelector(
        selectBrandViewDomain,
        substate => substate.selectedBrandName
    );

// brand heatmap

const makeSelectBrandHeatmapSuccess = () =>
    createSelector(
        selectBrandViewDomain,
        substate => substate.brandHeatMapData
    );
const makeSelectBrandHeatmapFail = () =>
    createSelector(
        selectBrandViewDomain,
        substate => substate.brandHeatMapDataFail
    );
const makeSelectBrandHeatmapSpinnerState = () =>
    createSelector(
        selectBrandViewDomain,
        substate => substate.brandHeatMapDataSpinnerState
    );

const makeSelectHeatmapButton = () =>
    createSelector(
        selectBrandViewDomain,
        substate => substate.brandHeatMapButton
    );

const makeSelectHeatmapTopFilter = () =>
    createSelector(
        selectBrandViewDomain,
        substate => substate.brandTopHeatmapFilter
    );
const makeSelectHeatmapTimeFilter = () =>
    createSelector(
        selectBrandViewDomain,
        substate => substate.brandHeatmapTimeFilter
    );
const makeSelectHeatmapPartitionFilter = () =>
    createSelector(
        selectBrandViewDomain,
        substate => substate.brandPartitionHeatmapFilter
    );

export default makeSelectBrandView;
export {
    selectBrandViewDomain,
    makeSelectBrandTrendSuccess,
    makeSelectBrandTrendFail,
    makeSelectBrandTrendSpinnerState,
    makeSelectBrandVsButton,
    makeSelectBrandTopFilter,
    makeSelectBrandUomButton,
    makeSelectBrandName,
    makeSelectBrandHeatmapSuccess,
    makeSelectBrandHeatmapFail,
    makeSelectBrandHeatmapSpinnerState,
    makeSelectHeatmapButton,
    makeSelectHeatmapTopFilter,
    makeSelectHeatmapTimeFilter,
    makeSelectHeatmapPartitionFilter
};
