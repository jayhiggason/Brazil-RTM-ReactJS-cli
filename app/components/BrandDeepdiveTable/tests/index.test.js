/**
 *
 * Tests for BrandDeepdiveTable
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import BrandDeepdiveTable from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import StoreViewTable from "../../StoreViewTable";

describe("<BrandDeepdiveTable />", () => {
  configure({adapter: new Adapter()});
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    const data=[{}];
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <BrandDeepdiveTable data={data} spinnerState={true} skuTableDataFail={false}/>
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
  it("should render Brand deep dive view table and props should be defined", () => {
    let data = [{}];
    const wrapper = shallow(  <BrandDeepdiveTable data={data} spinnerState={true} skuTableDataFail={false}/>);
    expect(wrapper.props(data)).toBeDefined()
  });

  describe("Brand deep dive view Table",() => {
    test("renders",() => {
      let data = [{}];
      const wrapper = shallow(  <BrandDeepdiveTable data={data} spinnerState={true} skuTableDataFail={false}/>);
      expect(wrapper.exists()).toBe(true);
    });
  });
  it.skip("Should render and match the snapshot", () => {
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <BrandDeepdiveTable />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
