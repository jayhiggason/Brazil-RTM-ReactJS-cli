/*
 *
 * Inbox reducer
 *
 */
import produce from "immer";
import { DEFAULT_ACTION } from "./constants";

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const inboxReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    if (action.type === DEFAULT_ACTION) {
        // empty
    }
  });

export default inboxReducer;
