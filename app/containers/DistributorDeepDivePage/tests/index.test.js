/**
 *
 * Tests for DistributorDeepDivePage
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { DistributorDeepDivePage,mapDispatchToProps } from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {TOGGLE_CARD} from "../../BrandDeepDivePage/constants";
import {
  CHANNEL_PERFORMANCE_CLICK_ON_CHANGE,
  CHANNEL_PERFORMANCE_FETCH,
  CHANNEL_PERFORMANCE_FILTER,
  DISTRIBUTOR_CARDS_DATA_FETCH,
  DISTRIBUTOR_SALES_PERFORMANCE_BUTTON_VS,
  DISTRIBUTOR_SALES_PERFORMANCE_FETCH,
  PRODUCT_PERFORMANCE_FETCH,
  STORE_PERFORMANCE_FETCH,
  STORE_PERFORMANCE_FILTER,
  STORE_TABLE_FETCH,
  VISIT_SALES_BUBBLE_FETCH
} from "../constants";

describe("<DistributorDeepDivePage />", () => {
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    const dispatch = jest.fn();
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <DistributorDeepDivePage  dispatch = {dispatch} />
      </IntlProvider>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it("Expect to have additional unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it("distributorCardsDataFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).distributorCardsDataFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: DISTRIBUTOR_CARDS_DATA_FETCH}) // const name
  });

  it("visitSalesBubbleDataFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).visitSalesBubbleDataFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: VISIT_SALES_BUBBLE_FETCH}) // const name
  });

  it("distributorSalesPerformanceDataFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).distributorSalesPerformanceDataFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: DISTRIBUTOR_SALES_PERFORMANCE_FETCH}) // const name
  });

  it("productPerformanceDataFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).productPerformanceDataFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: PRODUCT_PERFORMANCE_FETCH}) // const name
  });

  it("distributorSalesPerformanceButtonOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).distributorSalesPerformanceButtonOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: DISTRIBUTOR_SALES_PERFORMANCE_BUTTON_VS}) // const name
  });

  it("channelPerformanceDataFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).channelPerformanceDataFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: CHANNEL_PERFORMANCE_FETCH}) // const name
  });

  it("channelFilterOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).channelFilterOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: CHANNEL_PERFORMANCE_FILTER}) // const name
  });

  it("channelClickOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).channelClickOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: CHANNEL_PERFORMANCE_CLICK_ON_CHANGE}) // const name
  });

  it("storePerformanceDataFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).storePerformanceDataFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: STORE_PERFORMANCE_FETCH}) // const name
  });

  it("storePerformanceFilterOnChange should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).storePerformanceFilterOnChange(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: STORE_PERFORMANCE_FILTER}) // const name
  });

  it("storeTableDataFetch should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).storeTableDataFetch(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: STORE_TABLE_FETCH}) // const name
  });

  it("toggleCard should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).toggleCard(); //action name
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: TOGGLE_CARD}) // const name
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
        <DistributorDeepDivePage />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
