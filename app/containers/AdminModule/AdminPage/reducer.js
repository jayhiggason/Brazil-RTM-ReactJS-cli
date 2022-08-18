/*
 *
 * AdminPage reducer
 *
 */
import produce from "immer";
import {
    ADMIN_GET_REQUESTED_USERS_FETCH,
    ADMIN_GET_REQUESTED_USERS_FETCH_FAIL,
    ADMIN_GET_REQUESTED_USERS_FETCH_SUCCESS,
    ADMIN_PAGE_HANDLE_REQUEST,
    ADMIN_PAGE_HANDLE_TABS,
    DEFAULT_ACTION
} from "./constants";

export const initialState = {
    userRequestsTableData: [],
    userRequestsFetchSpinner: false,
    userRequestsFetchFailed: false,
    userDataTobeModified: {},
    currentUserManagementTab: 0,
    users: [],
};

/* eslint-disable default-case, no-param-reassign */
const adminPageReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case DEFAULT_ACTION:
                break;
            case ADMIN_GET_REQUESTED_USERS_FETCH:
                draft.userRequestsFetchSpinner = true;
                draft.userRequestsFetchFailed = false;
                break;
            case ADMIN_GET_REQUESTED_USERS_FETCH_SUCCESS:
                if (draft.currentUserManagementTab === 0) {
                    draft.userRequestsTableData = action.data;
                } else {
                    draft.users = action.data;
                }
                draft.userRequestsFetchSpinner = false;
                draft.userRequestsFetchFailed = false;
                break;
            case ADMIN_GET_REQUESTED_USERS_FETCH_FAIL:
                draft.userRequestsFetchSpinner = false;
                draft.userRequestsFetchFailed = true;
                break;
            case ADMIN_PAGE_HANDLE_REQUEST:
                draft.userDataTobeModified = action.userRequest;
                break;
            case ADMIN_PAGE_HANDLE_TABS:
                draft.currentUserManagementTab = action.tab;
                break;
        }
    });

export default adminPageReducer;
