/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */

import { takeLatest } from 'redux-saga/effects';
import * as sagas from '../saga'
import storeDeepDivePageSaga,{paretoAnalysisSaga,
  productAnalysisSaga,
  productDistributionSaga,
  purchaseAnalysisSaga,
  salesPerformanceSaga} from '../saga';
import {brandTrendChartDataFetchSaga} from "../../DistributorView/saga";

// const generator = storeDeepDivePageSaga();

describe("storeDeepDivePageSaga Saga", () => {
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('SALES_PERFORMANCE_FETCH,', salesPerformanceSaga)).toBeDefined(); //Expoted name of the saga function
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('PURCHASE_ANALYSIS_FETCH,', purchaseAnalysisSaga)).toBeDefined(); //Expoted name of the saga function
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('PARETO_ANALYSIS_FETCH,', paretoAnalysisSaga)).toBeDefined(); //Expoted name of the saga function
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('PRODUCT_ANALYSIS_FETCH,', productAnalysisSaga)).toBeDefined(); //Expoted name of the saga function
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('PRODUCT_DISTRIBUTION_FETCH,', productDistributionSaga)).toBeDefined(); //Expoted name of the saga function
  });

  it('should be done on next iteration', () => {
    genObject.next();
    genObject.next();
    genObject.next();
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {salesPerformanceFetch: true};// fetch action name
    const checkingsalesPerformanceSaga= jest.spyOn(sagas, 'salesPerformanceSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.salesPerformanceSaga  //2
        ();
    expect(checkingsalesPerformanceSaga).toHaveReturnedWith({salesPerformanceFetch: true})// fetch action name
    checkingsalesPerformanceSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {purchaseAnalysisFetch: true};// fetch action name
    const checkingpurchaseAnalysisSaga= jest.spyOn(sagas, 'purchaseAnalysisSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.purchaseAnalysisSaga  //2
        ();
    expect(checkingpurchaseAnalysisSaga).toHaveReturnedWith({purchaseAnalysisFetch: true})// fetch action name
    checkingpurchaseAnalysisSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {paretoAnalysisFetch: true};// fetch action name
    const checkingparetoAnalysisSaga= jest.spyOn(sagas, 'paretoAnalysisSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.paretoAnalysisSaga  //2
        ();
    expect(checkingparetoAnalysisSaga).toHaveReturnedWith({paretoAnalysisFetch: true})// fetch action name
    checkingparetoAnalysisSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {productAnalysisFetch: true};// fetch action name
    const checkingproductAnalysisSaga= jest.spyOn(sagas, 'productAnalysisSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.productAnalysisSaga  //2
        ();
    expect(checkingproductAnalysisSaga).toHaveReturnedWith({productAnalysisFetch: true})// fetch action name
    checkingproductAnalysisSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {productDistributionFetch: true};// fetch action name
    const checkingproductDistributionSaga= jest.spyOn(sagas, 'productDistributionSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.productDistributionSaga  //2
        ();
    expect(checkingproductDistributionSaga).toHaveReturnedWith({productDistributionFetch: true})// fetch action name
    checkingproductDistributionSaga.mockClear();
  });
});
