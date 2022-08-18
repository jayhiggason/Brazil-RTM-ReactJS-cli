// import produce from 'immer';
import loginPageReducer from "../reducer";
import {loginUser} from "../actions";
// import { someAction } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe("loginPageReducer", () => {
  let state;
  beforeEach(() => {
    state = {
      // default state params here
      userCred:{
        userID:"",
        password:"",
        role:""
      },
      IsAuth: false,
      Loading: false,
      Failed: false,
      FailedMessage:'',
      TokenObj:{}
    }
  });

  it("returns the initial state for reducer", () => {
    const expectedResult = state;
    expect(loginPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it("returns the correct state for user login", () => {
    const UserCred = "data";
    expect(loginPageReducer(state, loginUser(UserCred))).toMatchSnapshot();
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
