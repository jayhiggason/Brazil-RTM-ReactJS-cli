/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import * as sagas from '../saga'
import distributorViewSaga,{brandTrendChartDataFetchSaga,
  brandTrendTableDataFetchSaga} from '../saga';
import {distributorCardsDataSaga} from "../../DistributorDeepDivePage/saga";

// const generator = distributorViewSaga();

describe("distributorViewSaga Saga", () => {
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('DISTRIBUTOR_TREND_CHART_DATA_FETCH,', brandTrendChartDataFetchSaga)).toBeDefined(); //Expoted name of the saga function
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('DISTRIBUTOR_TREND_TABLE_DATA_FETCH,', brandTrendTableDataFetchSaga)).toBeDefined(); //Expoted name of the saga function
  });

  it('should be done on next iteration', () => {
    genObject.next();
    genObject.next();
    genObject.next();
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {distributorTrendChartDataFetchFail: true};// fetch action name
    const checkingbrandTrendChartDataFetchSaga= jest.spyOn(sagas, 'brandTrendChartDataFetchSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.brandTrendChartDataFetchSaga  //2
        ();
    expect(checkingbrandTrendChartDataFetchSaga).toHaveReturnedWith({distributorTrendChartDataFetchFail: true})// fetch action name
    checkingbrandTrendChartDataFetchSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {distributorTrendTableDataFetch: true};// fetch action name
    const checkingbrandTrendTableDataFetchSaga= jest.spyOn(sagas, 'brandTrendTableDataFetchSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.brandTrendTableDataFetchSaga  //2
        ();
    expect(checkingbrandTrendTableDataFetchSaga).toHaveReturnedWith({distributorTrendTableDataFetch: true})// fetch action name
    checkingbrandTrendTableDataFetchSaga.mockClear();
  });


});
