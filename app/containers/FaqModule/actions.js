/*
 *
 * FaqModule actions
 *
 */

import {
  DEFAULT_ACTION,
  FAQ_FETCH_DATA,
  FAQ_FETCH_DATA_FAIL,
  FAQ_FETCH_DATA_SUCCESS,
  FAQ_HANDLE_OPERATIONS, FAQ_HANDLE_OPERATIONS_COMPLETED
} from "./constants";

export function defaultAction() {
    return {
        type: DEFAULT_ACTION
    };
}

export function faqFetchData() {
    return {
        type: FAQ_FETCH_DATA
    };
}

export function faqFetchDataSuccess(data) {
    return {
        type: FAQ_FETCH_DATA_SUCCESS,
        data
    };
}

export function faqFetchDataFail() {
    return {
        type: FAQ_FETCH_DATA_FAIL
    };
}

export function faqHandleOperations(state) {
    return {
        type: FAQ_HANDLE_OPERATIONS,
        state
    };
}

export function faqHandleOperationsCompleted() {
  return {
    type: FAQ_HANDLE_OPERATIONS_COMPLETED
  };
}