/*
 *
 * MyPage reducer
 *
 */
import produce from "immer";
import {
    DEFAULT_ACTION,
    FETCH_MY_PAGE_PINNED_VIEW,
    FETCH_MY_PAGE_PINNED_VIEW_FAIL,
    FETCH_MY_PAGE_PINNED_VIEW_SUCCESS, REMOVE_PINNED_VIEW
} from "./constants";

export const initialState = {
    pinnedViewTableData: [],
    pinnedViewTableDataFetchSpinnerState: false,
    pinnedViewTableDataFetchFailed: false,

    removePinnedViewParams: {}
};

/* eslint-disable default-case, no-param-reassign */
const myPageReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case DEFAULT_ACTION:
                break;
            case FETCH_MY_PAGE_PINNED_VIEW:
                draft.pinnedViewTableDataFetchSpinnerState = true;
                draft.pinnedViewTableDataFetchFailed = false;
                break;
            case FETCH_MY_PAGE_PINNED_VIEW_SUCCESS:
                draft.pinnedViewTableDataFetchSpinnerState = false;
                draft.pinnedViewTableDataFetchFailed = false;
                draft.pinnedViewTableData = action.data;
                break;
            case FETCH_MY_PAGE_PINNED_VIEW_FAIL:
                draft.pinnedViewTableDataFetchSpinnerState = false;
                draft.pinnedViewTableDataFetchFailed = true;
                break;
            case REMOVE_PINNED_VIEW:
                draft.removePinnedViewParams = action.data;
                break;
        }
    });

export default myPageReducer;
