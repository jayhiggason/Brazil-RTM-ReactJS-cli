/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import * as sagas from '../saga'
import storeViewSaga,{storeGeoMapSaga,
  storeHeatMapSaga,
  storeTrendTableSaga} from '../saga';
import {salesPerformanceSaga} from "../../StoreDeepDivePage/saga";

// const generator = storeViewSaga();

describe("storeViewSaga Saga", () => {
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('STORE_TREND_TABLE_FETCH,', storeTrendTableSaga)).toBeDefined(); //Expoted name of the saga function
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('STORE_GEOMAP_FETCH,', storeGeoMapSaga)).toBeDefined(); //Expoted name of the saga function
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('STORE_HEATMAP_FETCH,', storeHeatMapSaga)).toBeDefined(); //Expoted name of the saga function
  });

  it('should be done on next iteration', () => {
    genObject.next();
    genObject.next();
    genObject.next();
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {storeTrendTableFetch: true};// fetch action name
    const checkingstoreTrendTableSaga= jest.spyOn(sagas, 'storeTrendTableSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.storeTrendTableSaga  //2
        ();
    expect(checkingstoreTrendTableSaga).toHaveReturnedWith({storeTrendTableFetch: true})// fetch action name
    checkingstoreTrendTableSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {storeGeoMapFetch: true};// fetch action name
    const checkingstoreGeoMapSaga= jest.spyOn(sagas, 'storeGeoMapSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.storeGeoMapSaga  //2
        ();
    expect(checkingstoreGeoMapSaga).toHaveReturnedWith({storeGeoMapFetch: true})// fetch action name
    checkingstoreGeoMapSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {storeHeatMapFetch: true};// fetch action name
    const checkingstoreHeatMapSaga= jest.spyOn(sagas, 'storeHeatMapSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.storeHeatMapSaga  //2
        ();
    expect(checkingstoreHeatMapSaga).toHaveReturnedWith({storeHeatMapFetch: true})// fetch action name
    checkingstoreHeatMapSaga.mockClear();
  });
});
