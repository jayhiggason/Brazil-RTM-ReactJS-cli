import {createSelector} from 'reselect';

import {initialState} from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectMainDrawerState = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.mainDrawerState,
    );
const makeSelectCurrentPanel = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.currentPanel
    );

const makeSelectLocation = () =>
    createSelector(
        selectRouter,
        routerState => routerState.location,
    );

const makeSelectPIFilterData = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.PIFilterData
    );

const makeSelectPISelectedFilterData = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.PISelectedFilterData
    );

const makeSelectPIGlobalSettingsDrawer = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.PIGlobalSettingsDrawer
    );
const makeSelectPIRiskControlPanelData = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.PIRiskControlPanelData
    );

const makeSelectPIShelfLifeRiskControlPanelData = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.PIShelfLifeRiskControlPanelData
    );
const makeSelectPIDataLoadedDetailsForRiskControlPanelChange = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.DataLoadedDetailsForRiskControlPanelChange
    );
const makeSelectPIDataLoadedDetailsForShelfLifeRiskControlPanelChange = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.DataLoadedDetailsForShelfLifeRiskControlPanelChange
    );

const makeSelectAppAlerts = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.alerts
    );

const makeSelectExplainModuleState = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.explainModuleState
    );

const makeSelectBrandTechRiskClassificationData = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.brandTechRiskClassificationData
    );

const makeSelectBrandTechRiskClassificationDataFetchSpinnerState = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.brandTechRiskClassificationDataFetchSpinnerState
    );

const makeSelectBrandTechRiskClassificationDataFetchFailed = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.brandTechRiskClassificationDataFetchFailed
    );
const makeSelectPIBrandTechData = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.brandTech
    );
const makeSelectPISaveRisksSpinnerState = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.saveRisksSpinnerState
    );

// rtm filters

const makeSelectFilterData = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.filtersData
    );

const makeSelectFilterDataPayLoad = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.filterDataPayLoad
    );

const makeSelectFilterDataFail = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.filterDataFailed
    );

const makeSelectFilterDataSpinnerState = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.filterDataSpinnerState
    );

const makeSelectSelectedFilters = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.selectedFiltersData
    );
//rtm store filter
const makeSelectStoreFilterData = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.storeFilterData
    );

const makeSelectStoreFilterDataFail = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.storeFilterDataFail
    );

const makeSelectStoreFilterDataSpinnerState = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.storeFilterDataSpinnerState
    );

const makeSelectPinMyPageParams = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.pinMyPageParams
    );

const makeSelectDataLoadStatus = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.dataLoadDetails
    );

const makeSelectPinMyViewParams = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.pinMyViewParams
    );

const makeSelectPinMyViewPinName = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.pinName
    );

const makeSelectPinMyViewPinNameDialogOpen = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.PinNameOpen
    );

const makeSelectDataExceptionHandlingDialogOpen = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.dataExceptionAlert
    );

export {
    makeSelectLocation,
    makeSelectMainDrawerState,
    makeSelectCurrentPanel,
    makeSelectPIFilterData,
    makeSelectPISelectedFilterData,
    makeSelectPIGlobalSettingsDrawer,
    makeSelectPIRiskControlPanelData,
    makeSelectPIShelfLifeRiskControlPanelData,
    makeSelectPIDataLoadedDetailsForRiskControlPanelChange,
    makeSelectPIDataLoadedDetailsForShelfLifeRiskControlPanelChange,
    makeSelectAppAlerts,
    makeSelectExplainModuleState,
    makeSelectBrandTechRiskClassificationData,
    makeSelectBrandTechRiskClassificationDataFetchSpinnerState,
    makeSelectBrandTechRiskClassificationDataFetchFailed,
    makeSelectPIBrandTechData,
    makeSelectPISaveRisksSpinnerState,

    // rtm
    makeSelectFilterData,
    makeSelectFilterDataPayLoad,
    makeSelectFilterDataFail,
    makeSelectFilterDataSpinnerState,
    makeSelectSelectedFilters,
    makeSelectStoreFilterData,
    makeSelectStoreFilterDataFail,
    makeSelectStoreFilterDataSpinnerState,
    makeSelectPinMyPageParams,
    makeSelectDataLoadStatus,
    makeSelectPinMyViewParams,
    makeSelectPinMyViewPinName,
    makeSelectPinMyViewPinNameDialogOpen,
    makeSelectDataExceptionHandlingDialogOpen
};
