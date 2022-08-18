// import produce from 'immer';
import adminPageReducer from "../reducer";
import {ADMIN_DATA} from "../constants";
// import { someAction } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe("adminPageReducer", () => {
  let state;
  beforeEach(() => {
    state = {
      requests:ADMIN_DATA
    };
  });

  it.skip("returns the initial state", () => {
    const expectedResult = state;
    expect(adminPageReducer(undefined, {})).toEqual(expectedResult);
  });

  /**
   * Example state change comparison
   *
   * it('should handle the someAction action correctly', () => {
   *   const expectedResult = produce(state, draft => {
   *     draft.loading = true;
   *     draft.error = false;
   *     draft.userData.nested = false;
   *   });
   *
   *   expect(appReducer(state, someAction())).toEqual(expectedResult);
   * });
   */
});
