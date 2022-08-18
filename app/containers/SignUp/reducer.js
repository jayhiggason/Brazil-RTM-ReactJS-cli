/*
 *
 * SignUp reducer
 *
 */
import produce from "immer";
import {
    ADD_NEW_ORG,
    DEFAULT_ACTION, FETCH_APPROVER, FETCH_APPROVER_FAIL, FETCH_APPROVER_SUCCESS,
    FETCH_ORG_LIST,
    FETCH_ORG_LIST_FAIL,
    FETCH_ORG_LIST_SUCCESS,
    SHOW_SIGN_UP_ALERT,
    SUBMIT_USER_ACCESS_REQUEST
} from "./constants";

export const initialState = {
    userInfo: {},
    alerts: {
        open: false,
        severity: "",
        message: ""
    },
    orgList: [],
    orgListFetchSpinnerState: false,
    orgListFetchDataFailed: false,
    newOrg: "",
    approverList:[],
    approverFetchSpinnerState:false,
    approverFetchDataFailed:false
};

/* eslint-disable default-case, no-param-reassign */
const signUpReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case DEFAULT_ACTION:
                break;
            case SUBMIT_USER_ACCESS_REQUEST:
                draft.userInfo = action.userInfo;
                break;
            case SHOW_SIGN_UP_ALERT:
                draft.alerts = action.alerts;
                break;
            case FETCH_ORG_LIST:
                draft.orgListFetchSpinnerState = true;
                draft.orgListFetchDataFailed = false;
                break;
            case FETCH_ORG_LIST_SUCCESS:
                draft.orgList = action.data;
                draft.orgListFetchSpinnerState = false;
                draft.orgListFetchDataFailed = false;
                break;
            case FETCH_ORG_LIST_FAIL:
                draft.orgListFetchSpinnerState = false;
                draft.orgListFetchDataFailed = true;
                break;
            case ADD_NEW_ORG:
                draft.newOrg = action.data;
                break;
            case FETCH_APPROVER:
                draft.approverFetchSpinnerState = true;
                draft.approverFetchDataFailed = false;
                break;
            case FETCH_APPROVER_SUCCESS:
                draft.approverList = action.data;
                draft.approverFetchSpinnerState = false;
                draft.approverFetchDataFailed = false;
                break;
            case FETCH_APPROVER_FAIL:
                draft.approverFetchSpinnerState = false;
                draft.approverFetchDataFailed = true;
                break;
        }
    });

export default signUpReducer;
