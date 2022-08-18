import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the inbox state domain
 */

const selectInboxDomain = state => state.inbox || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Inbox
 */

const makeSelectInbox = () =>
  createSelector(
    selectInboxDomain,
    substate => substate
  );

export default makeSelectInbox;
export { selectInboxDomain };
