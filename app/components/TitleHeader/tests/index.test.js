/**
 *
 * Tests for TitleHeader
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import TitleHeader from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

describe("<TitleHeader />", () => {
  configure({adapter: new Adapter()});
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <TitleHeader title={"Performance summary"} handleChangeCompareTimeRange={()=>{}} handleChangeTimeRange={()=>{}}   />
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
  it.skip("Should render and match the snapshot", () => {
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <TitleHeader />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
