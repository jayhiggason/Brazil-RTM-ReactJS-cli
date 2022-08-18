/**
 *
 * Tests for LoginPage
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
import {shallow} from 'enzyme';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import {LoginPage, mapDispatchToProps} from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {LOGIN_USER} from "../constants";

describe("<LoginPage />", () => {

  configure({adapter: new Adapter()});

  it.skip("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    const dispatch = jest.fn();
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <LoginPage dispatch={dispatch} />
      </IntlProvider>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it("Expect to have additional unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it("should render Login Page and props should be defined", () => {
    const wrapper = shallow(<LoginPage/>);
    expect(wrapper.props()).toBeDefined()
  });

  it("LoginUser should be triggered from mapDispatchToProps", () => {
    const dispatch = jest.fn();
    const data={
      username: "abc",
      password: 123,
    }

    mapDispatchToProps(dispatch).LoginUser(data);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({type: LOGIN_USER,UserCred: {
        username: "abc",
        password: 123
      }})
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
        <LoginPage />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
