/**
 *
 * Tests for StoreView
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { StoreView,mapDispatchToProps } from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {
  STORE_GEOMAP_FETCH,
  STORE_HEATMAP_BUTTON,
  STORE_HEATMAP_FETCH,
  STORE_HEATMAP_FILTER, STORE_HEATMAP_TIME_FILTER,
  STORE_TREND_TABLE_FETCH, STORE_TREND_TABLE_FILTER
} from "../constants";

describe("<StoreView />", () => {
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    const dispatch = jest.fn();
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <StoreView dispatch={dispatch} />
      </IntlProvider>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it("Expect to have additional unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it("storeTrendTableFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).storeTrendTableFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: STORE_TREND_TABLE_FETCH}) // const name
  });

  it("storeGeoMapFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).storeGeoMapFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: STORE_GEOMAP_FETCH}) // const name
  });

  it("storeHeatMapFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).storeHeatMapFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: STORE_HEATMAP_FETCH}) // const name
  });

  it("storeHeatMapFilterOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).storeHeatMapFilterOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: STORE_HEATMAP_FILTER}) // const name
  });

  it("storeHeatMapButtonOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).storeHeatMapButtonOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: STORE_HEATMAP_BUTTON}) // const name
  });

  it("storeTopFilterOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).storeTopFilterOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: STORE_TREND_TABLE_FILTER}) // const name
  });

  it("storeTimeFilterHeatmapOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).storeTimeFilterHeatmapOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: STORE_HEATMAP_TIME_FILTER}) // const name
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
        <StoreView />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
