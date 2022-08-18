/*
 *
 * MyPage actions
 *
 */

import {
    DEFAULT_ACTION,
    FETCH_MY_PAGE_PINNED_VIEW,
    FETCH_MY_PAGE_PINNED_VIEW_FAIL,
    FETCH_MY_PAGE_PINNED_VIEW_SUCCESS, REMOVE_PINNED_VIEW
} from "./constants";

export function defaultAction() {
    return {
        type: DEFAULT_ACTION
    };
}

export function fetchMyPagePinnedView() {
    return {
        type: FETCH_MY_PAGE_PINNED_VIEW
    };
}

export function fetchMyPagePinnedViewSuccess(data) {
    return {
        type: FETCH_MY_PAGE_PINNED_VIEW_SUCCESS,
        data
    };
}

export function fetchMyPagePinnedViewFail() {
    return {
        type: FETCH_MY_PAGE_PINNED_VIEW_FAIL
    };
}

export function removePinnedView(data) {
    return {
        type: REMOVE_PINNED_VIEW,
        data
    };
}