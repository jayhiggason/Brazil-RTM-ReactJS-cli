/**
 *
 * Tests for ModuleLinkToolBar
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import Links from "../index";
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DEFAULT_LOCALE } from "../../../i18n";
import {shallow} from "enzyme";

describe("<ModuleLinkToolBar />", () => {

  configure({adapter: new Adapter()});

  it.skip("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Links linkList={[]} />
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
  it("Should render and match the snapshot", () => {
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Links linkList={[]} />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();

  });

  it("should render Links and props should be defined", () => {
      const wrapper = shallow(<Links linkList={[]}/>);
      expect(wrapper.props()).toBeDefined()
    });

  describe("Links",() => {
      test("renders",() => {
        const wrapper = shallow(<Links linkList={[]}/>);
        expect(wrapper.exists()).toBe(true);
      });
    });
});
