/**
 *
 * Tests for PerformanceLineApex
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import PerformanceLineApex from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PerformanceBubbleApex from "../../PerformanceBubbleApex";

let data = {
      xAxis:[],
      series:[]
    };

describe("<PerformanceLineApex />", () => {
  configure({adapter: new Adapter()});
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <PerformanceLineApex data={data} yLabel={"sales"} />
      </IntlProvider>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it("Expect to have additional unit tests specified", () => {
    expect(true).toEqual(true);
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */

  it("should render See trends chart component and props should be defined", () => {


    const wrapper = shallow(      <PerformanceLineApex data={data} yLabel={"sales"} />
    );
    expect(wrapper.props(data)).toBeDefined()
  });

  describe("See Trends chart component",() => {
    test("renders",() => {

      const wrapper = shallow(         <PerformanceLineApex data={data} yLabel={"sales"} />    );
      expect(wrapper.exists()).toBe(true);
    });
  });
  it.skip("Should render and match the snapshot", () => {
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <PerformanceLineApex data={data} yLabel={"sales"} />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
