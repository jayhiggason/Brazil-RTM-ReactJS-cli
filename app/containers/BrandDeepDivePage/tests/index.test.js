/**
 *
 * Tests for BrandDeepDivePage
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { BrandDeepDivePage,mapDispatchToProps } from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {
  CARDS_DATA_FETCH,
  ITEM_HEATMAP_BUTTON,
  ITEM_HEATMAP_FETCH,
  ITEM_HEATMAP_FILTER,
  ITEM_HEATMAP_TIME_FILTER,
  PRODUCT_BUTTON_VS,
  PRODUCT_SKU_TREND_FILTER_FETCH,
  PRODUCT_SKU_TREND_FILTER_SELECTED_FILTER,
  PRODUCT_TREND_FETCH,
  PRODUCT_TREND_FILTER,
  PRODUCT_UOM_FILTER,
  SELECTED_CATEGORY,
  SELECTED_CATEGORY_COMPARISON,
  SKU_TABLE_FETCH,
  SKU_TABLE_FILTER,
  TOGGLE_CARD,
  TRENDS_LINE_FETCH
} from "../constants";  // Import all the constants

describe("<BrandDeepDivePage />", () => {
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    const dispatch = jest.fn();
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <BrandDeepDivePage dispatch={dispatch} />
      </IntlProvider>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it("Expect to have additional unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it("toggleCard should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).toggleCard(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: TOGGLE_CARD}) // const name
  });

  it("cardDataFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).cardDataFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: CARDS_DATA_FETCH}) // const name
  });

  it("productTrendDataFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).productTrendDataFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: PRODUCT_TREND_FETCH}) // const name
  });

  it("productTrendFilterOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).productTrendFilterOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: PRODUCT_TREND_FILTER}) // const name
  });

  it("productTrendClickOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).productTrendClickOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: PRODUCT_BUTTON_VS}) // const name
  });

  it("productSkuTrendFilterOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).productSkuTrendFilterOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: PRODUCT_SKU_TREND_FILTER_SELECTED_FILTER}) // const name
  });

  it("productTrendUomFilterOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).productTrendUomFilterOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: PRODUCT_UOM_FILTER}) // const name
  });

  it("productSkuFilterDataFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).productSkuFilterDataFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: PRODUCT_SKU_TREND_FILTER_FETCH}) // const name
  });

  it("itemHeatMapDataFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).itemHeatMapDataFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: ITEM_HEATMAP_FETCH}) // const name
  });

  it("itemHeatMapFilterOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).itemHeatMapFilterOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: ITEM_HEATMAP_FILTER}) // const name
  });

  it("itemTimeFilterHeatmapOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).itemTimeFilterHeatmapOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: ITEM_HEATMAP_TIME_FILTER}) // const name
  });

  it("itemHeatMapButtonOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).itemHeatMapButtonOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: ITEM_HEATMAP_BUTTON}) // const name
  });

  it("categoryKpiOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).categoryKpiOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: SELECTED_CATEGORY}) // const name
  });

  it("categoryFilterOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).categoryFilterOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: SELECTED_CATEGORY_COMPARISON}) // const name
  });

  it("trendLineFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).trendLineFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: TRENDS_LINE_FETCH}) // const name
  });

  it("skuTableFilterOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).skuTableFilterOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: SKU_TABLE_FILTER}) // const name
  });

  it("skuTableFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).skuTableFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: SKU_TABLE_FETCH}) // const name
  });


  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip("Should render and match the snapshot", () => {
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <BrandDeepDivePage />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
