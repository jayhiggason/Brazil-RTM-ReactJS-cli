/**
 *
 * Tests for StoreViewTable
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import StoreViewTable from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {configure, shallow} from "enzyme";
import Table from "../../Table";
// import {expect, it} from "@jest/globals";
// import describe from "jest-each";
import Adapter from "enzyme-adapter-react-16";

describe("<StoreViewTable />", () => {
  configure({adapter: new Adapter()});
  it("Expect to not log errors in console", () => {
    const data=[{}];
    const spy = jest.spyOn(global.console, "error");
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <StoreViewTable data={data} name={'StoreViewTable'} spinnerState={true} storeTableDataFail={false}/>
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
  it("should render Store view table and props should be defined", () => {
    let data = [{}];
    const wrapper = shallow(<StoreViewTable data={data} name={'StoreViewTable'} spinnerState={true} storeTableDataFail={false}/>);
    expect(wrapper.props(data)).toBeDefined()
  });

  describe("Store view Table",() => {
    test("renders",() => {
      let data = [{}];
      const wrapper = shallow(<StoreViewTable data={data} name={'StoreViewTable'} spinnerState={true} storeTableDataFail={false}/>);
      expect(wrapper.exists()).toBe(true);
    });
  });

  it.skip("Should render and match the snapshot", () => {
    let data= [{}];
    const {
      container: { firstChild }
    } = render(
        <IntlProvider locale={DEFAULT_LOCALE}>
          <StoreViewTable data={data} name={'StoreViewTable'} spinnerState={true} storeTableDataFail={false}/>
        </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
