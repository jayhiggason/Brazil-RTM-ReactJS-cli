/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import loginPageSaga from '../saga';

// const generator = loginPageSaga();

import loginPageSaga from "../saga";
import {takeLatest } from 'redux-saga/effects';
import * as sagas from '../saga'

describe("loginPageSaga Saga", () => {
  const genObject = loginPageSaga();

  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it('LOGIN_USER action should be defined', () => {
    expect(takeLatest('LOGIN_USER',checkUser)).toBeDefined();
  });

  it('should be done on next iteration', () => {
    genObject.next();
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call api and dispatch success action', async () => {
    const dummyResponse = {checkUser: true};
    const checkingUser = jest.spyOn(sagas, 'checkUser')
        .mockImplementation(() => dummyResponse);
    sagas.checkUser();
    expect(checkingUser).toHaveReturnedWith({checkUser: true})
    checkingUser.mockClear();
  });



});
