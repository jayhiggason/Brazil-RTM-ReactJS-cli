/**
 *
 * Tests for StoreDeepDivePage
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { StoreDeepDivePage, mapDispatchToProps } from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {DISTRIBUTOR_TREND_CHART_DATA_FETCH} from "../../DistributorView/constants";
import {
  PARETO_ANALYSIS_FILTER, PRODUCT_ANALYSIS_BUTTON,
  PRODUCT_ANALYSIS_FETCH, PRODUCT_DISTRIBUTION_BUTTON, PRODUCT_DISTRIBUTION_FETCH, PRODUCT_DISTRIBUTION_FILTER,
  PURCHASE_ANALYSIS_FETCH,
  SALES_PERFORMANCE_FETCH
} from "../constants";

describe("<StoreDeepDivePage />", () => {
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    const dispatch = jest.fn();
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <StoreDeepDivePage dispatch={dispatch} />
      </IntlProvider>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it("Expect to have additional unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it("salesPerformanceDataFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).salesPerformanceDataFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: SALES_PERFORMANCE_FETCH}) // const name
  });

  it("purchaseAnalysisDataFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).purchaseAnalysisDataFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: PURCHASE_ANALYSIS_FETCH}) // const name
  });

  it("paretoAnalysisFilterOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).paretoAnalysisFilterOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: PARETO_ANALYSIS_FILTER}) // const name
  });

  it("prodAnalysisDataFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).prodAnalysisDataFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: PRODUCT_ANALYSIS_FETCH}) // const name
  });

  it("productAnalysisButtonOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).productAnalysisButtonOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: PRODUCT_ANALYSIS_BUTTON}) // const name
  });

  it("productDistributionDataFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).productDistributionDataFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: PRODUCT_DISTRIBUTION_FETCH}) // const name
  });

  it("productDistributionButtonOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).productDistributionButtonOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: PRODUCT_DISTRIBUTION_BUTTON}) // const name
  });

  it("storeProductTopFilterOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).storeProductTopFilterOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: PRODUCT_DISTRIBUTION_FILTER}) // const name
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
        <StoreDeepDivePage />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
