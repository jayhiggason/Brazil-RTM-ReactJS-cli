/**
 *
 * Tests for InsightTab
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import InsightTab from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

let data=[];
describe("<InsightTab />", () => {
  configure({adapter: new Adapter()});
  it("Expect to not log errors in console", () => {

    const spy = jest.spyOn(global.console, "error");
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <InsightTab/>
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
  it("should render Insight component and props should be defined", () => {


    const wrapper = shallow(          <InsightTab/>);
    expect(wrapper.props(data)).toBeDefined()
  });

  describe("Insight tab component",() => {
    test("renders",() => {

      const wrapper = shallow(          <InsightTab/>);
      expect(wrapper.exists()).toBe(true);
    });
  });

  it.skip("Should render and match the snapshot", () => {
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <InsightTab />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
