/**
 *
 * Tests for StoreDeepDiveTrendLine
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import StoreDeepDiveTrendLine from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

let data= [{"xAxis": [202009, 202010, 202011, 202012, 202013], "series": [{"name": "Sellout Invoice", "data": [299383.42, 92344.76, 115511.01, 415088.96, 177322.36]}]}];
describe("<StoreDeepDiveTrendLine />", () => {
  configure({adapter: new Adapter()});

  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <StoreDeepDiveTrendLine data={data[0]} series={data[0]['series']}  />
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

  it("should render simple trend chart component and props should be defined", () => {


    const wrapper = shallow(        <StoreDeepDiveTrendLine data={data[0]} series={data[0]['series']}  />
    );
    expect(wrapper.props(data)).toBeDefined()
  });

  describe("Simple trend line chart component",() => {
    test("renders",() => {

      const wrapper = shallow(             <StoreDeepDiveTrendLine data={data[0]} series={data[0]['series']}  /> );
      expect(wrapper.exists()).toBe(true);
    });
  });

  it.skip("Should render and match the snapshot", () => {
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <StoreDeepDiveTrendLine data={data[0]} series={data[0]['series']}  />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
