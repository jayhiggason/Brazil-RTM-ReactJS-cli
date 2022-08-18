/**
 *
 * Tests for DistributorView
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { DistributorView, mapDispatchToProps } from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {VISIT_SALES_BUBBLE_FETCH} from "../../DistributorDeepDivePage/constants";
import {
  DISTRIBUTOR_TREND_CHART_DATA_FETCH,
  DISTRIBUTOR_TREND_CHART_ON_FILTER_CHANGE,
  DISTRIBUTOR_TREND_TABLE_DATA_FETCH
} from "../constants";

describe("<DistributorView />", () => {
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    const dispatch = jest.fn();
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <DistributorView dispatch={dispatch} />
      </IntlProvider>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it("Expect to have additional unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it("distributorTrendChartDataFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).distributorTrendChartDataFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: DISTRIBUTOR_TREND_CHART_DATA_FETCH}) // const name
  });

  it("distributorTrendChartOnFilterChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).distributorTrendChartOnFilterChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: DISTRIBUTOR_TREND_CHART_ON_FILTER_CHANGE}) // const name
  });

  it("distributorTrendTableDataFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).distributorTrendTableDataFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: DISTRIBUTOR_TREND_TABLE_DATA_FETCH}) // const name
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
        <DistributorView />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
