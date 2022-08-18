/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */

import { takeLatest } from 'redux-saga/effects';
import * as sagas from '../saga'
import brandViewSaga,{ brandHeatmapSaga,
  brandTrendSaga} from '../saga';
// const generator = brandViewSaga();

describe("brandViewSaga Saga", () => {
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('BRAND_HEATMAP_FETCH,', brandHeatmapSaga)).toBeDefined(); //Expoted name of the saga function
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('BRAND_TREND_FETCH,', brandTrendSaga)).toBeDefined(); //Expoted name of the saga function
  });


  it('should be done on next iteration', () => {
    genObject.next();
    genObject.next();
    genObject.next();
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {brandHeatFetch: true};// fetch action name
    const checkingbrandHeatmapSaga= jest.spyOn(sagas, 'brandHeatmapSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.brandHeatmapSaga  //2
        ();
    expect(checkingbrandHeatmapSaga).toHaveReturnedWith({brandHeatFetch: true})// fetch action name
    checkingbrandHeatmapSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {brandTrendFetch: true};// fetch action name
    const checkingbrandTrendSaga= jest.spyOn(sagas, 'brandTrendSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.brandTrendSaga  //2
        ();
    expect(checkingbrandTrendSaga).toHaveReturnedWith({brandTrendFetch: true})// fetch action name
    checkingbrandTrendSaga.mockClear();
  });

});
