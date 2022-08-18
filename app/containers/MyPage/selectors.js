import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the myPage state domain
 */

const selectMyPageDomain = state => state.myPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MyPage
 */

const makeSelectMyPage = () =>
  createSelector(
    selectMyPageDomain,
    substate => substate
  );

export default makeSelectMyPage;
export { selectMyPageDomain };
