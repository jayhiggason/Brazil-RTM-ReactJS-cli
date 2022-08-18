import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the homepage state domain
 */

const selectHomepageDomain = state => state.homepage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Homepage
 */

const makeSelectHomepage = () =>
  createSelector(
    selectHomepageDomain,
    substate => substate
  );

export default makeSelectHomepage;
export { selectHomepageDomain };
