/**
 *
 * Tests for PerformanceSummary
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { PerformanceSummary,mapDispatchToProps } from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {CARDS_DATA_FETCH,
  TOGGLE_CARD,
  TRENDS_LINE_FETCH,
  SELECTED_CATEGORY_COMPARISON,
  SELECTED_CATEGORY,
  BRAND_BUBBLE_FETCH,
  BRAND_BUBBLE_TIME_FILTER,
  DISTRIBUTOR_TABLE_FETCH,
  DISTRIBUTOR_TABLE_FILTER} from "../constants";
//import {} from "../../App/actions";  // Import all the constants

describe("<PerformanceSummary />", () => {
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    const dispatch = jest.fn();
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <PerformanceSummary dispatch={dispatch} />
      </IntlProvider>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it("Expect to have additional unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it("cardDataFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).cardDataFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: CARDS_DATA_FETCH}) // const name
  });

  it("toggleCard should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).toggleCard(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: TOGGLE_CARD}) // const name
  });

  it("brandBubbleTimeFilterOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).brandBubbleTimeFilterOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: BRAND_BUBBLE_TIME_FILTER}) // const name
  });

  it("brandInsightFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).brandInsightFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: BRAND_BUBBLE_FETCH}) // const name
  });

  it("distributorFilterOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).distributorFilterOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: DISTRIBUTOR_TABLE_FILTER}) // const name
  });

  it("distributorTableFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).distributorTableFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: DISTRIBUTOR_TABLE_FETCH}) // const name
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
        <PerformanceSummary />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
