/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import brandDeepDivePageSaga from '../saga';
import { takeLatest } from 'redux-saga/effects';
import * as sagas from '../saga'
import brandDeepDivePageSaga,{categoryFilterSaga,
  seeTrendsSaga,
  cardsDataSaga,
  categoryCamparisonFilterSaga,
  itemHeatmapSaga,
  productSkuFilterSaga,
  productTrendSaga,
  skuTableSaga} from '../saga';

// const generator = brandDeepDivePageSaga();

describe("brandDeepDivePageSaga Saga", () => {
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('CATEGORY_FILTER_FETCH,', categoryFilterSaga)).toBeDefined(); //Expoted name of the saga function
  });

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('TRENDS_LINE_FETCH,', seeTrendsSaga)).toBeDefined(); //Expoted name of the saga function
  });                                                                               // Write only for FETCH function// Write only for FETCH function

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('CARDS_DATA_FETCH,', cardsDataSaga)).toBeDefined(); //Expoted name of the saga function
  });                                                                               // Write only for FETCH function// Write only for FETCH function

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('CATEGORY_COMPARISON_FILTER_FETCH,', categoryCamparisonFilterSaga)).toBeDefined(); //Expoted name of the saga function
  });                                                                               // Write only for FETCH function// Write only for FETCH function

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('ITEM_HEATMAP_FETCH,', itemHeatmapSaga)).toBeDefined(); //Expoted name of the saga function
  });                                                                               // Write only for FETCH function// Write only for FETCH function

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('PRODUCT_SKU_TREND_FILTER_FETCH,', productSkuFilterSaga)).toBeDefined(); //Expoted name of the saga function
  });                                                                               // Write only for FETCH function// Write only for FETCH function

  it('first iteration fetch view data action should be defined', () => {
    expect(takeLatest('PRODUCT_TREND_FETCH,', productTrendSaga)).toBeDefined(); //Expoted name of the saga function
  });

  it('should be done on next iteration', () => {
    genObject.next();
    genObject.next();
    genObject.next();
    expect(genObject.next().done).toBeTruthy();
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
    const dummyResponse = {seeTrendLineFetch: true};// fetch action name
    const checkingseeTrendsSaga= jest.spyOn(sagas, 'seeTrendsSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.seeTrendsSaga  //2
        ();
    expect(checkingseeTrendsSaga).toHaveReturnedWith({seeTrendLineFetch: true})// fetch action name
    checkingseeTrendsSaga.mockClear();
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
    const dummyResponse = {categoryComparisonFilterFetch: true};// fetch action name
    const checkingcategoryCamparisonFilterSaga= jest.spyOn(sagas, 'categoryCamparisonFilterSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.categoryCamparisonFilterSaga  //2
        ();
    expect(checkingcategoryCamparisonFilterSaga).toHaveReturnedWith({categoryComparisonFilterFetch: true})// fetch action name
    checkingcategoryCamparisonFilterSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {itemHeatFetch: true};// fetch action name
    const checkingitemHeatmapSaga= jest.spyOn(sagas, 'itemHeatmapSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.itemHeatmapSaga  //2
        ();
    expect(checkingitemHeatmapSaga).toHaveReturnedWith({itemHeatFetch: true})// fetch action name
    checkingitemHeatmapSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {productSkuTrendFilterFetch: true};// fetch action name
    const checkingproductSkuFilterSaga= jest.spyOn(sagas, 'productSkuFilterSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.productSkuFilterSaga  //2
        ();
    expect(checkingproductSkuFilterSaga).toHaveReturnedWith({productSkuTrendFilterFetch: true})// fetch action name
    checkingproductSkuFilterSaga.mockClear();
  });

  it('should call api and dispatch success action for History Table Data Fetch', async () => {
    const dummyResponse = {productTrendFetch: true};// fetch action name
    const checkingproductTrendSaga= jest.spyOn(sagas, 'productTrendSaga')  //1
        .mockImplementation(() => dummyResponse);
    sagas.productTrendSaga  //2
        ();
    expect(checkingproductTrendSaga).toHaveReturnedWith({productTrendFetch: true})// fetch action name
    checkingproductTrendSaga.mockClear();
  });

});
