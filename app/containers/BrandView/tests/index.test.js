/**
 *
 * Tests for BrandView
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import {PropTypes} from 'prop-types';
import {Plot} from 'react-plotly.js';
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { BrandView, mapDispatchToProps } from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {BRAND_UOM_BUTTON,
  BRAND_TREND_TOP,
  BRAND_TREND_FETCH,
  BRAND_TREND_CLICK_ON_CHANGE,
  BRAND_HEATMAP_TOP,
  BRAND_HEATMAP_TIME_FILTER,
  BRAND_HEATMAP_BUTTON,
  BRAND_BUTTON_VS} from "../constants";
import {CARDS_DATA_FETCH} from "../../PerformanceSummary/constants";
describe("<BrandView />", () => {
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    const dispatch = jest.fn();
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <BrandView dispatch={dispatch} />
      </IntlProvider>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it("Expect to have additional unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it("brandTrendClickOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).brandTrendClickOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: BRAND_TREND_CLICK_ON_CHANGE}) // const name
  });

  it("brandTrendFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).brandTrendFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: BRAND_TREND_FETCH}) // const name
  });

  it("brandButtonVsOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).brandButtonVsOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: BRAND_BUTTON_VS}) // const name
  });

  it("brandTopFilterOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).brandTopFilterOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: BRAND_TREND_TOP}) // const name
  });

  it("brandUomButtonOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).brandUomButtonOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: BRAND_UOM_BUTTON}) // const name
  });

  it("brandHeatmapFilterOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).brandHeatmapFilterOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: BRAND_HEATMAP_TOP}) // const name
  });

  it("brandHeatmapButtonOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).brandHeatmapButtonOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: BRAND_HEATMAP_BUTTON}) // const name
  });

  it("brandHeatmapTimeFilterOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).brandHeatmapTimeFilterOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: BRAND_HEATMAP_TIME_FILTER}) // const name
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
        <BrandView />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
