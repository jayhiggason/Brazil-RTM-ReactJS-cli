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


export function openMainDrawer() {
    return {
        type: OPEN_MAIN_DRAWER
    };
}

export function closeMainDrawer() {
    return {
        type: CLOSE_MAIN_DRAWER
    };
}

export function changePanel(data) {
    return {
        type: CHANGE_PANEL,
        data
    }
}


export function setPIFilter(data) {
    return {
        type: PI_FILTER_SET,
        data
    }
}

export function onOpeningPIGlobalSettings() {
    return {
        type: ON_OPENING_PI_GLOBAL_SETTINGS,
    };
}

export function onClosingPIGlobalSettings() {
    return {
        type: ON_CLOSING_PI_GLOBAL_SETTINGS,
    };
}

export function PIRiskControlPanelDataOnChange(data) {
    return {
        type: ON_CHANGE_PI_RISK_CONTROL_PANEL_DATA,
        data
    };
}

export function PIShelfLifeRiskControlPanelDataOnChange(data) {
    return {
        type: ON_CHANGE_PI_SHELF_LIFE_RISK_CONTROL_PANEL_DATA,
        data
    };
}

export function PIRiskControlPanelOnChangeDataLoadedChangeStatus(data) {
    return {
        type: PI_RISK_CONTROL_ON_CHANGE_DATA_LOADED_CHANGE_STATUS,
        data
    };
}

export function PIShelfLifeRiskControlPanelOnChangeDataLoadedChangeStatus(data) {
    return {
        type: PI_SHELF_LIFE_RISK_CONTROL_ON_CHANGE_DATA_LOADED_CHANGE_STATUS,
        data
    };
}

export function riskControlPanelSaveRisks() {
    return {
        type: RISK_CONTROL_PANEL_SAVE_RISKS
    }
}

export function showAppAlert(alerts) {
    return {
        type: SHOW_APP_ALERT,
        alerts
    }
}

export function handleExplainModule(state) {
    return {
        type: HANDLE_EXPLAIN_MODULE,
        state
    }
}

export function scmosBrandTechRiskClassificationDataFetch() {
    return {
        type: SCMOS_BRAND_TECH_RISK_CLASSIFICATION_DATA_FETCH,
    }
}

export function scmosBrandTechRiskClassificationDataFetchSuccess(data) {
    return {
        type: SCMOS_BRAND_TECH_RISK_CLASSIFICATION_DATA_FETCH_SUCCESS,
        data
    }
}

export function scmosBrandTechRiskClassificationDataFetchFail() {
    return {
        type: SCMOS_BRAND_TECH_RISK_CLASSIFICATION_DATA_FETCH_FAIL,
    }
}


export function riskControlPanelSaveShelfLifeRisks() {
    return {
        type: RISK_CONTROL_PANEL_SAVE_SHELF_LIFE_RISKS,
    }
}

export function riskControlPanelSaveShelfLifeRisksCompleted() {
    return {
        type: RISK_CONTROL_PANEL_SAVE_SHELF_LIFE_RISKS_COMPLETED,
    }
}

export function riskControlPanelSaveRisksCompleted() {
    return {
        type: RISK_CONTROL_PANEL_SAVE_RISKS_COMPLETED,
    }
}


// rtm filters
export function filterDataFetch(data) {
    return {
        type: FILTER_DATA_FETCH,
        data
    };
}

export function filterDataFail() {
    return {
        type: FILTER_DATA_FAIL
    };
}

export function filterDataSuccess(data) {
    return {
        type: FILTER_DATA_SUCCESS,
        data
    };
}

export function selectedFilterOnChange(data) {
    return {
        type: SELECTED_FILTERS_APPLY,
        data
    }
}

//rtm store filter
export function storeFilterDataFetch() {
    return {
        type: STORE_FILTER_DATA_FETCH
    };
}

export function storeFilterDataFailed() {
    return {
        type: STORE_FILTER_DATA_FAIL
    };
}

export function storeFilterDataSuccess(data) {
    return {
        type: STORE_FILTER_DATA_SUCCESS,
        data
    };
}

export function pinMyPage(data) {
    return {
        type: PIN_MY_PAGE,
        data
    };
}

export function changeDataLoadStatus(data) {
    return {
        type: CHANGE_DATA_LOAD_STATUS,
        data
    };
}

export function pinMyView(data) {
    return {
        type: PIN_MY_VIEW,
        data
    };
}

export function unpinMyView(data) {
    return {
        type: UNPIN_MY_VIEW,
        data
    };
}

export function pinMyViewConfirm(data) {
    return {
        type: PIN_MY_VIEW_CONFIRM,
        data
    };
}

export function pinMyViewCloseDialog() {
    return {
        type: PIN_MY_VIEW_CLOSE_DIALOG,
    };
}

export function resetDeepDive(data) {
    return {
        type: RESET_DEEP_DIVE,
        data
    };
}

//data exception handling

export function dataExceptionHandlingDialog() {
    return {
        type: DATA_EXCEPTION_ALERT,
    };
}
