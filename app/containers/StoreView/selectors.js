import {createSelector} from "reselect";
import {initialState} from "./reducer";

/**
 * Direct selector to the storeView state domain
 */

const selectStoreViewDomain = state => state.storeView || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by StoreView
 */

const makeSelectStoreView = () =>
    createSelector(
        selectStoreViewDomain,
        substate => substate
    );

// STORE TREND table
const makeSelectStoreTrendTableSuccess = () =>
    createSelector(
        selectStoreViewDomain,
        substate => substate.storeTrendTableData
    );

const makeSelectStoreTopFilter = () =>
    createSelector(
        selectStoreViewDomain,
        substate => substate.storeTopFilter
    );

const makeSelectStoreTrendButton = () =>
    createSelector(
        selectStoreViewDomain,
        substate => substate.storeTrendButton
    );


// store geomap
const makeSelectStoreGeoMapSuccess = () =>
    createSelector(
        selectStoreViewDomain,
        substate => substate.storeGeoMapData
    );

//store geomap click

// store heatmap
const makeSelectStoreHeatMapSuccess = () =>
    createSelector(
        selectStoreViewDomain,
        substate => substate.storeHeatMapData
    );

const makeSelectStoreHeatmapButton = () =>
    createSelector(
        selectStoreViewDomain,
        substate => substate.storeHeatMapButton
    );

const makeSelectStoreHeatMapFilter = () =>
    createSelector(
        selectStoreViewDomain,
        substate => substate.storeHeatMapFilter
    );

const makeSelectStoreHeatMapTimeFilter = () =>
    createSelector(
        selectStoreViewDomain,
        substate => substate.storeHeatMapTimeFilter
    );
const makeSelectStoreHeatMapPartitionFilter = () =>
    createSelector(
        selectStoreViewDomain,
        substate => substate.storeHeatMapPartitionFilter
    );
export default makeSelectStoreView;
export {
    selectStoreViewDomain,
    makeSelectStoreTrendTableSuccess,
    makeSelectStoreGeoMapSuccess,
    makeSelectStoreHeatMapSuccess,
    makeSelectStoreHeatmapButton,
    makeSelectStoreHeatMapFilter,
    makeSelectStoreTrendButton,
    makeSelectStoreTopFilter,
    makeSelectStoreHeatMapTimeFilter,
    makeSelectStoreHeatMapPartitionFilter

};
