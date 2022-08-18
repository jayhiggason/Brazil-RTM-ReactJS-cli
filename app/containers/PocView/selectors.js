import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the pocView state domain
 */

const selectPocViewDomain = state => state.pocView || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PocView
 */

const makeSelectPocView = () =>
  createSelector(
    selectPocViewDomain,
    substate => substate
  );

export default makeSelectPocView;
export { selectPocViewDomain };
