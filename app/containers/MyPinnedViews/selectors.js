import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the myPinnedViews state domain
 */

const selectMyPinnedViewsDomain = state => state.myPinnedViews || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MyPinnedViews
 */

const makeSelectMyPinnedViews = () =>
  createSelector(
    selectMyPinnedViewsDomain,
    substate => substate
  );

export default makeSelectMyPinnedViews;
export { selectMyPinnedViewsDomain };
