/*
 *
 * LoginPage actions
 *
 */

import {DEFAULT_ACTION, LOGIN_USER, LOGIN_USER_CLOSE_DIALOG, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS,} from "./constants";

export function defaultAction() {
    return {
        type: DEFAULT_ACTION
    };
}

export function loginUser(UserCred) {
    return {
        type: LOGIN_USER,
        UserCred
    }
}


export function loginUserSuccess(data) {
    return {
        type: LOGIN_USER_SUCCESS,
        data
    }
}

export function loginUserFail(message, status) {
    return {
        type: LOGIN_USER_FAIL,
        message: message,
        status: status
    }
}

export function closeGFailedWarningDialog() {
    return {
        type: LOGIN_USER_CLOSE_DIALOG,
    }
}