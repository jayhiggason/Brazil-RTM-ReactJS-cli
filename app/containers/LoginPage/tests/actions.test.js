import {
  closeGFailedWarningDialog,
  defaultAction,
  loginUser,
  loginUserFail,
  loginUserSuccess,
} from "../actions";
import {DEFAULT_ACTION, LOGIN_USER, LOGIN_USER_CLOSE_DIALOG, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS} from "../constants";

describe("LoginPage actions", () => {
  describe("Default Action", () => {
    it("has a type of DEFAULT_ACTION", () => {
      const expected = {
        type: DEFAULT_ACTION
      };
      expect(defaultAction()).toEqual(expected);
    });
  });

  describe(" login_User Action", () => {
    it("has a type of LOGIN_USER", () => {
      let UserCred="data";
      const expected = {
        type: LOGIN_USER,
        UserCred
      };
      expect( loginUser(UserCred)).toEqual(expected);
    });
  });

  describe(" login user success Action", () => {
    it("has a type of LOGIN_USER_SUCCESS", () => {

      const expected = {
        type: LOGIN_USER_SUCCESS,

      };
      expect( loginUserSuccess()).toEqual(expected);
    });
  });

  describe(" login user fail Action", () => {
    it("has a type of LOGIN_USER_FAIL", () => {

      const expected = {
        type: LOGIN_USER_FAIL,

      };
      expect( loginUserFail()).toEqual(expected);
    });
  });

  describe(" login user close dialog Action", () => {
    it("has a type of LOGIN_USER_CLOSE_DIALOG", () => {

      const expected = {
        type: LOGIN_USER_CLOSE_DIALOG,

      };
      expect( closeGFailedWarningDialog()).toEqual(expected);
    });
  });

});

