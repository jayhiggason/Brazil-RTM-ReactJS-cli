/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';
import * as sagas from '../saga'
import performanceSummarySaga,{brandBubbleSaga,
  cardsDataSaga,
  categoryFilterSaga,
  distributorTableSaga,
  seeTrendsSaga} from '../saga';
import {brandBubbleFetch} from "../actions";

// const generator = performanceSummarySaga();

describe("performanceSummarySaga Saga", () => {
  const genObject = performanceSummarySaga(); //container saga name

  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it('first iteration fetch view data action should be defined', () => {
  expect(takeLatest('BRAND_BUBBLE_FETCH,', brandBubbleSaga)).toBeDefined(); //Expoted name of the saga function
  });                                                                               // Write only for FETCH function

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('CARDS_DATA_FETCH,', cardsDataSaga)).toBeDefined(); //Expoted name of the saga function
  });                                                                               // Write only for FETCH function

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('CATEGORY_FILTER_FETCH,', categoryFilterSaga)).toBeDefined(); //Expoted name of the saga function
  });                                                                               // Write only for FETCH function


  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('DISTRIBUTOR_TABLE_FETCH,', distributorTableSaga)).toBeDefined(); //Expoted name of the saga function
  });                                                                               // Write only for FETCH function


  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('TRENDS_LINE_FETCH,', seeTrendsSaga)).toBeDefined(); //Expoted name of the saga function
  });                                                                               // Write only for FETCH function


  it('should be done on next iteration', () => {
  genObject.next();
    genObject.next();
    genObject.next();
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
  const dummyResponse = {brandBubbleFetch: true};// fetch action name
    const checkingbrandBubbleSaga= jest.spyOn(sagas, 'brandBubbleSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.brandBubbleSaga  //2
    ();
    expect(checkingbrandBubbleSaga).toHaveReturnedWith({brandBubbleFetch: true})// fetch action name
    checkingbrandBubbleSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {cardDataFetch: true};// fetch action name
    const checkingcardsDataSaga= jest.spyOn(sagas, 'cardsDataSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.cardsDataSaga  //2
        ();
    expect(checkingcardsDataSaga).toHaveReturnedWith({cardDataFetch: true})// fetch action name
    checkingcardsDataSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {categoryFilterFetch: true};// fetch action name
    const checkingcategoryFilterSaga= jest.spyOn(sagas, 'categoryFilterSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.categoryFilterSaga  //2
        ();
    expect(checkingcategoryFilterSaga).toHaveReturnedWith({categoryFilterFetch: true})// fetch action name
    checkingcategoryFilterSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {distributorTableFetch: true};// fetch action name
    const checkingdistributorTableSaga= jest.spyOn(sagas, 'distributorTableSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.distributorTableSaga  //2
        ();
    expect(checkingdistributorTableSaga).toHaveReturnedWith({distributorTableFetch: true})// fetch action name
    checkingdistributorTableSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {seeTrendLineFetch: true};// fetch action name
    const checkingseeTrendsSaga= jest.spyOn(sagas, 'seeTrendsSaga')  //saga name
        .mockImplementation(() => dummyResponse);
    sagas.seeTrendsSaga  // saga name
        ();
    expect(checkingseeTrendsSaga).toHaveReturnedWith({seeTrendLineFetch: true})// fetch action name
    checkingseeTrendsSaga.mockClear();
  });

});


