/*
 *
 * FaqModule reducer
 *
 */
import produce from "immer";
import {
    FAQ_FETCH_DATA,
    FAQ_FETCH_DATA_FAIL,
    FAQ_FETCH_DATA_SUCCESS,
    FAQ_HANDLE_OPERATIONS, FAQ_HANDLE_OPERATIONS_COMPLETED
} from "./constants";

export const initialState = {
    faqTableData: [],
    faqFetchDataSpinnerState: false,
    faqFetchDataFailed: false,
    faqToBeOperated: {},
    operationSpinnerState:false,
};

/* eslint-disable default-case, no-param-reassign */
const faqModuleReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case FAQ_FETCH_DATA:
                draft.faqFetchDataSpinnerState = true;
                draft.faqFetchDataFailed = false;
                break;
            case FAQ_FETCH_DATA_SUCCESS:
                draft.faqTableData = action.data;
                draft.faqFetchDataSpinnerState = false;
                draft.faqFetchDataFailed = false;
                break;
            case FAQ_FETCH_DATA_FAIL:
                draft.faqFetchDataSpinnerState = false;
                draft.faqFetchDataFailed = true;
                break;
            case FAQ_HANDLE_OPERATIONS:
                draft.faqToBeOperated = action.state;
                draft.operationSpinnerState = true;
                break;
            case FAQ_HANDLE_OPERATIONS_COMPLETED:
                draft.faqToBeOperated = {};
                draft.operationSpinnerState = false;
        }

    });

export default faqModuleReducer;
