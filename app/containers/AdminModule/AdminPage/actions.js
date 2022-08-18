/*
 *
 * AdminPage actions
 *
 */

import {
    ADMIN_GET_REQUESTED_USERS_FETCH,
    ADMIN_GET_REQUESTED_USERS_FETCH_FAIL,
    ADMIN_GET_REQUESTED_USERS_FETCH_SUCCESS,
    ADMIN_PAGE_HANDLE_REQUEST,
    ADMIN_PAGE_HANDLE_TABS,
    DEFAULT_ACTION
} from "./constants";

export function defaultAction() {
    return {
        type: DEFAULT_ACTION
    };
}

export function adminGetRequestedUsersFetch() {
    return {
        type: ADMIN_GET_REQUESTED_USERS_FETCH,
    };
}

export function adminGetRequestedUsersFetchSuccess(data) {
    return {
        type: ADMIN_GET_REQUESTED_USERS_FETCH_SUCCESS,
        data
    };
}

export function adminGetRequestedUsersFetchFail() {
    return {
        type: ADMIN_GET_REQUESTED_USERS_FETCH_FAIL,
    };
}

export function adminHandleRequest(userRequest) {
    return {
        type: ADMIN_PAGE_HANDLE_REQUEST,
        userRequest
    };
}

export function adminHandleTabs(tab) {
    return {
        type: ADMIN_PAGE_HANDLE_TABS,
        tab
    };
}
