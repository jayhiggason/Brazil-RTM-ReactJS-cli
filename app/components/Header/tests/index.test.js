/**
 *
 * Tests for Header
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import Header from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import { configure, shallow } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";

describe("<Header />", () => {
  configure({adapter: new Adapter()});
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Header />
      </IntlProvider>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it("Expect to have additional unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it("should render header and props should be defined", () => {
    const wrapper = shallow(<Header userInfo='user' showLinearProgress handleDrawerOpen hideLogo />);
    expect(wrapper.props('user')).toBeDefined()
  });

  describe("Header",() => {
    test("renders",() => {
      const wrapper = shallow(<Header userInfo='user' showLinearProgress handleDrawerOpen hideLogo />);
      expect(wrapper.exists()).toBe(true);
    });
  });

  it("Should render and match the snapshot", () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Header userInfo='user' showLinearProgress handleDrawerOpen hideLogo />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
