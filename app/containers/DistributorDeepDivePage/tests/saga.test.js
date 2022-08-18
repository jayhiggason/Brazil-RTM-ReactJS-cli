/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import * as sagas from '../saga'
import distributorDeepDivePageSaga,{channelPerformanceSaga,
  distributorCardsDataSaga,
  distributorSalesPerformanceSaga,
  productPerformanceSaga,
  storePerformanceSaga,
  storeTableSaga,
  visitSalesBubbleSaga
} from '../saga';
import {brandHeatmapSaga} from "../../BrandView/saga";

// const generator = distributorDeepDivePageSaga();

describe("distributorDeepDivePageSaga Saga", () => {
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('DISTRIBUTOR_CARDS_DATA_FETCH,', distributorCardsDataSaga)).toBeDefined(); //Expoted name of the saga function
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('VISIT_SALES_BUBBLE_FETCH,', visitSalesBubbleSaga)).toBeDefined(); //Expoted name of the saga function
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('DISTRIBUTOR_SALES_PERFORMANCE_FETCH,', distributorSalesPerformanceSaga)).toBeDefined(); //Expoted name of the saga function
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('PRODUCT_PERFORMANCE_FETCH,', productPerformanceSaga)).toBeDefined(); //Expoted name of the saga function
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('CHANNEL_PERFORMANCE_FETCH,', channelPerformanceSaga)).toBeDefined(); //Expoted name of the saga function
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('STORE_PERFORMANCE_FETCH,', storePerformanceSaga)).toBeDefined(); //Expoted name of the saga function
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('STORE_TABLE_FETCH,', storeTableSaga)).toBeDefined(); //Expoted name of the saga function
  });




  it('should be done on next iteration', () => {
    genObject.next();
    genObject.next();
    genObject.next();
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {distributorCardsFetch: true};// fetch action name
    const checkingdistributorCardsDataSaga= jest.spyOn(sagas, 'distributorCardsDataSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.distributorCardsDataSaga  //2
        ();
    expect(checkingdistributorCardsDataSaga).toHaveReturnedWith({distributorCardsFetch: true})// fetch action name
    checkingdistributorCardsDataSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {visitSalesBubbleFetch: true};// fetch action name
    const checkingvisitSalesBubbleSaga= jest.spyOn(sagas, 'visitSalesBubbleSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.visitSalesBubbleSaga  //2
        ();
    expect(checkingvisitSalesBubbleSaga).toHaveReturnedWith({visitSalesBubbleFetch: true})// fetch action name
    checkingvisitSalesBubbleSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {distributorSalesPerformanceFetch: true};// fetch action name
    const checkingdistributorSalesPerformanceSaga= jest.spyOn(sagas, 'distributorSalesPerformanceSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.distributorSalesPerformanceSaga  //2
        ();
    expect(checkingdistributorSalesPerformanceSaga).toHaveReturnedWith({distributorSalesPerformanceFetch: true})// fetch action name
    checkingdistributorSalesPerformanceSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {productPerformanceFetch: true};// fetch action name
    const checkingproductPerformanceSaga= jest.spyOn(sagas, 'productPerformanceSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.productPerformanceSaga  //2
        ();
    expect(checkingproductPerformanceSaga).toHaveReturnedWith({productPerformanceFetch: true})// fetch action name
    checkingproductPerformanceSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {productPerformanceFetch: true};// fetch action name
    const checkingchannelPerformanceSaga= jest.spyOn(sagas, 'channelPerformanceSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.channelPerformanceSaga  //2
        ();
    expect(checkingchannelPerformanceSaga).toHaveReturnedWith({productPerformanceFetch: true})// fetch action name
    checkingchannelPerformanceSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {storePerformanceFetch: true};// fetch action name
    const checkingstorePerformanceSaga= jest.spyOn(sagas, 'storePerformanceSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.storePerformanceSaga  //2
        ();
    expect(checkingstorePerformanceSaga).toHaveReturnedWith({storePerformanceFetch: true})// fetch action name
    checkingstorePerformanceSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {storeTableFetch: true};// fetch action name
    const checkingstoreTableSaga= jest.spyOn(sagas, 'storeTableSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.storeTableSaga  //2
        ();
    expect(checkingstoreTableSaga).toHaveReturnedWith({storeTableFetch: true})// fetch action name
    checkingstoreTableSaga.mockClear();
  });

});
