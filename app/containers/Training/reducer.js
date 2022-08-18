/*
 *
 * Training reducer
 *
 */
import produce from "immer";
import {DEFAULT_ACTION} from "./constants";

export const initialState = {
    dummyState: ""
};

/* eslint-disable default-case, no-param-reassign */
const trainingReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        if (action.type === DEFAULT_ACTION) {
            draft.dummyState = "";
        }
    });

export default trainingReducer;
