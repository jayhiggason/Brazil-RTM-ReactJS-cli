import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the training state domain
 */

const selectTrainingDomain = state => state.training || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Training
 */

const makeSelectTraining = () =>
  createSelector(
    selectTrainingDomain,
    substate => substate
  );

export default makeSelectTraining;
export { selectTrainingDomain };
