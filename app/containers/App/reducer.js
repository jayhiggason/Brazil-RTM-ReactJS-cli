import {
    CHANGE_DATA_LOAD_STATUS,
    CHANGE_PANEL,
    CLOSE_MAIN_DRAWER, DATA_EXCEPTION_ALERT,
    FILTER_DATA_FAIL,
    FILTER_DATA_FETCH,
    FILTER_DATA_SUCCESS,
    HANDLE_EXPLAIN_MODULE,
    ON_CHANGE_PI_RISK_CONTROL_PANEL_DATA,
    ON_CHANGE_PI_SHELF_LIFE_RISK_CONTROL_PANEL_DATA,
    ON_CLOSING_PI_GLOBAL_SETTINGS,
    ON_OPENING_PI_GLOBAL_SETTINGS,
    OPEN_MAIN_DRAWER,
    PI_FILTER_DATA_FETCH,
    PI_FILTER_DATA_FETCH_SUCCESS,
    PI_FILTER_SET,
    PI_RISK_CONTROL_ON_CHANGE_DATA_LOADED_CHANGE_STATUS,
    PI_SHELF_LIFE_RISK_CONTROL_ON_CHANGE_DATA_LOADED_CHANGE_STATUS,
    PIN_MY_PAGE,
    PIN_MY_VIEW,
    PIN_MY_VIEW_CLOSE_DIALOG,
    PIN_MY_VIEW_CONFIRM,
    RESET_DEEP_DIVE,
    RISK_CONTROL_PANEL_SAVE_RISKS,
    RISK_CONTROL_PANEL_SAVE_RISKS_COMPLETED,
    RISK_CONTROL_PANEL_SAVE_SHELF_LIFE_RISKS,
    RISK_CONTROL_PANEL_SAVE_SHELF_LIFE_RISKS_COMPLETED,
    SCMOS_BRAND_TECH_RISK_CLASSIFICATION_DATA_FETCH,
    SCMOS_BRAND_TECH_RISK_CLASSIFICATION_DATA_FETCH_FAIL,
    SCMOS_BRAND_TECH_RISK_CLASSIFICATION_DATA_FETCH_SUCCESS,
    SELECTED_FILTERS_APPLY,
    SHOW_APP_ALERT,
    STORE_FILTER_DATA_FAIL,
    STORE_FILTER_DATA_FETCH,
    STORE_FILTER_DATA_SUCCESS,
    UNPIN_MY_VIEW
} from "./constants";
import {produce} from "immer";
import history from "../../utils/history";
import _ from "lodash";

export const initialState = {
    mainDrawerState: false,
    currentPanel: 'home',
    alerts: {
        open: false,
        severity: "",
        message: ""
    },
    PIGlobalSettingsDrawer: false,
    PIRiskControlPanelData: {
        "highStockRisk": 250,
        "lowRisk": 70,
        "oosRisk": 0,
        "mediumRisk": 40,
        "transit": false,
        "predictedArrival": false,
        "maturation": false,
        "qi": false,
        "riskAcross": 12,
        "daysWeeks": true,
        "TNIorSSV": true,
        "brandTechRisk": []
    },
    PIShelfLifeRiskControlPanelData: {
        "highRisk": 120,
        "lowRisk": 160,
        "expiredBatches": false,
        "brandTechRisk": []
    },
    DataLoadedDetailsForRiskControlPanelChange: {
        "overview": false,
        "stockProjection": false,
        "packFormat": false
    },
    DataLoadedDetailsForShelfLifeRiskControlPanelChange: {
        "shelfLifeOverview": false,
        "shelfLifeSpecific": false,
    },
    explainModuleState: false,
    brandTechRiskClassificationData: [],
    brandTechRiskClassificationDataFetchSpinnerState: false,
    brandTechRiskClassificationDataFetchFailed: false,
    brandTech: [],
    saveRisksSpinnerState: false,
    // rtm filters
    filtersData: {
        "chain": [],
        "manager": [],
        "coordinator": [],
        "timeRange": ["YTD", "QTD", "PTD"],
        "brand": [],
        "category": [],
        "distributor": [],
        "technology": [],
        "channel": [],
        "region": [],
        "store": [],
        "customer": [],
        "gp": [],
        "salesRep": [],
        "compare": ["Last Year", "Current Year"]
    },
    filterDataPayLoad: {},
    filterDataFailed: false,
    filterDataSpinnerState: true,
    selectedFiltersData: {
        "recent_selected": "",
        "recent_selected_dropdown_values": [],
        "chain": [],
        "manager": [],
        "coordinator": [],
        "timeRange": "YTD",
        "brand": [],
        "category": [],
        "distributor": [],
        "technology": [],
        "channel": [],
        "region": [],
        "store": [],
        "customer": [],
        "gp": [],
        "salesRep": [],
        "compare": "Last Year"
    },

// Store filter data
    storeFilterData: [],
    storeFilterDataSpinnerState: true,
    storeFilterDataFail: false,
    // Pin My Page
    pinMyPageParams: {},
    // loading details
    dataLoadDetails: {
        "performanceSummary": false,
        "brandView": false,
        "distView": false,
        "storeView": false
    },
    //Pin My View
    pinMyViewParams: {},
    pinName: "",
    PinNameOpen: false,

    //DATA EXCEPTION HANDLING ALERT
    dataExceptionAlert: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
    produce(state, draft => {
        let path = history.location.pathname;
        switch (action.type) {
            case OPEN_MAIN_DRAWER:
                draft.mainDrawerState = true;
                break;
            case CLOSE_MAIN_DRAWER:
                draft.mainDrawerState = false;
                break;
            case CHANGE_PANEL:
                draft.currentPanel = action.data;
                break;
            case PI_FILTER_DATA_FETCH:
                draft.PIFilterDataLoading = true;
                break;
            case PI_FILTER_DATA_FETCH_SUCCESS:
                draft.PIFilterData = action.data;
                break;
            case PI_FILTER_SET:
                draft.PISelectedFilterData = action.data;
                break;
            case ON_OPENING_PI_GLOBAL_SETTINGS:
                draft.PIGlobalSettingsDrawer = true;
                break;
            case ON_CLOSING_PI_GLOBAL_SETTINGS:
                draft.PIGlobalSettingsDrawer = false;
                break;
            case ON_CHANGE_PI_RISK_CONTROL_PANEL_DATA:
                switch (path) {
                    case "/SCMOS/PI/Overview":
                        draft.DataLoadedDetailsForRiskControlPanelChange = {
                            "overview": true,
                            "stockProjection": false,
                            "packFormat": false
                        };
                        break;
                    case "/SCMOS/PI/Stock-Projections-Per-Warehouse":
                        draft.DataLoadedDetailsForRiskControlPanelChange = {
                            "overview": false,
                            "stockProjection": true,
                            "packFormat": false
                        };
                        break;
                    case "/SCMOS/PI/Pack-Format":
                        draft.DataLoadedDetailsForRiskControlPanelChange = {
                            "overview": false,
                            "stockProjection": false,
                            "packFormat": true
                        };
                        break;
                }
                draft.PIRiskControlPanelData = action.data;
                break;
            case ON_CHANGE_PI_SHELF_LIFE_RISK_CONTROL_PANEL_DATA:
                switch (path) {
                    case "/SCMOS/PI/Shelf-Life-Overview":
                        draft.DataLoadedDetailsForShelfLifeRiskControlPanelChange = {
                            "shelfLifeOverview": true,
                            "shelfLifeSpecific": false,
                        };
                        break;
                    case "/SCMOS/PI/Shelf-Life-Specific-Product":
                        draft.DataLoadedDetailsForShelfLifeRiskControlPanelChange = {
                            "shelfLifeOverview": false,
                            "shelfLifeSpecific": true,
                        };
                        break;
                }
                draft.PIShelfLifeRiskControlPanelData = action.data;
                break;
            case PI_RISK_CONTROL_ON_CHANGE_DATA_LOADED_CHANGE_STATUS:
                draft.DataLoadedDetailsForRiskControlPanelChange = action.data;
                break;
            case PI_SHELF_LIFE_RISK_CONTROL_ON_CHANGE_DATA_LOADED_CHANGE_STATUS:
                draft.DataLoadedDetailsForShelfLifeRiskControlPanelChange = action.data;
                break;
            case RISK_CONTROL_PANEL_SAVE_RISKS:
                draft.saveRisksSpinnerState = true;
                break;
            case SHOW_APP_ALERT:
                draft.alerts = action.alerts;
                break;
            case HANDLE_EXPLAIN_MODULE:
                draft.explainModuleState = action.state;
                break;
            case SCMOS_BRAND_TECH_RISK_CLASSIFICATION_DATA_FETCH:
                draft.brandTechRiskClassificationDataFetchSpinnerState = true;
                draft.brandTechRiskClassificationDataFetchFailed = false;
                break;
            case SCMOS_BRAND_TECH_RISK_CLASSIFICATION_DATA_FETCH_SUCCESS:
                draft.brandTechRiskClassificationData = _.orderBy(action.data["tableData"], ['BrandTech'], ['asc']);
                draft.brandTech = action.data["brandTech"];
                draft.brandTechRiskClassificationDataFetchSpinnerState = false;
                draft.brandTechRiskClassificationDataFetchFailed = false;
                break;
            case SCMOS_BRAND_TECH_RISK_CLASSIFICATION_DATA_FETCH_FAIL:
                draft.brandTechRiskClassificationDataFetchSpinnerState = false;
                draft.brandTechRiskClassificationDataFetchFailed = true;
                break;
            case RISK_CONTROL_PANEL_SAVE_SHELF_LIFE_RISKS:
                draft.saveRisksSpinnerState = true;
                break;
            case RISK_CONTROL_PANEL_SAVE_SHELF_LIFE_RISKS_COMPLETED:
                draft.saveRisksSpinnerState = false;
                break;
            case RISK_CONTROL_PANEL_SAVE_RISKS_COMPLETED:
                draft.saveRisksSpinnerState = false;
                break;

            // rtm filters

            case FILTER_DATA_FETCH:
                draft.filterDataFailed = false;
                draft.filterDataSpinnerState = true;
                draft.filterDataPayLoad = action.data;
                break;
            case FILTER_DATA_FAIL:
                draft.filterDataFailed = true;
                draft.filterDataSpinnerState = false;
                break;
            case FILTER_DATA_SUCCESS:
                draft.filterDataFailed = false;
                draft.filterDataSpinnerState = false;
                draft.filtersData = action.data;
                break;
            case SELECTED_FILTERS_APPLY:
                switch (path) {
                    case "/RTM/PerformanceSummary":
                        draft.dataLoadDetails = {
                            "performanceSummary": true,
                            "brandView": false,
                            "distView": false,
                            "storeView": false
                        };
                        break;
                    case "/RTM/BrandView":
                        draft.dataLoadDetails = {
                            "performanceSummary": false,
                            "brandView": true,
                            "distView": false,
                            "storeView": false
                        };
                        break;
                    case "/RTM/DistributorView":
                        draft.dataLoadDetails = {
                            "performanceSummary": false,
                            "brandView": false,
                            "distView": true,
                            "storeView": false
                        };
                        break;
                    case "/RTM/StoreView":
                        draft.dataLoadDetails = {
                            "performanceSummary": false,
                            "brandView": false,
                            "distView": false,
                            "storeView": true
                        };
                        break;
                    default:
                        draft.dataLoadDetails = {
                            "performanceSummary": false,
                            "brandView": false,
                            "distView": false,
                            "storeView": false
                        };
                        break;

                }
                draft.selectedFiltersData = action.data;
                break;

            case RESET_DEEP_DIVE:
                switch (action.data) {
                    case 'brand':
                        draft.selectedFiltersData.brand = [];
                        break;
                    case 'distributor':
                        draft.selectedFiltersData.distributor = [];
                        break;
                    case 'store':
                        draft.selectedFiltersData.store = [];
                        break;
                }
                break;
            //rtm store filter
            case STORE_FILTER_DATA_FETCH:
                draft.storeFilterDataFail = false;
                draft.storeFilterDataSpinnerState = true;
                break;
            case STORE_FILTER_DATA_FAIL:
                draft.storeFilterDataFail = true;
                draft.storeFilterDataSpinnerState = false;
                break;
            case STORE_FILTER_DATA_SUCCESS:
                draft.storeFilterDataFail = false;
                draft.storeFilterDataSpinnerState = false;
                draft.storeFilterData = action.data;
                break;
            case PIN_MY_PAGE:
                draft.pinMyPageParams = action.data;
                break;
            case CHANGE_DATA_LOAD_STATUS:
                draft.dataLoadDetails = action.data;
                break;
            case PIN_MY_VIEW:
                draft.pinMyViewParams = action.data;
                draft.PinNameOpen = true;
                break;
            case UNPIN_MY_VIEW:
                draft.pinMyViewParams = action.data;
                break;
            case PIN_MY_VIEW_CONFIRM:
                draft.pinName = action.data;
                break;
            case PIN_MY_VIEW_CLOSE_DIALOG:
                draft.PinNameOpen = false;
                break;
            case DATA_EXCEPTION_ALERT:
                draft.dataExceptionAlert = true;
                break;
        }
    });

export default appReducer;
