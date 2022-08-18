/**
 *
 * Tests for DistributorDeepdiveTable
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import DistributorDeepdiveTable from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BrandDeepdiveTable from "../../BrandDeepdiveTable";
let data = [];

describe("<DistributorDeepdiveTable />", () => {
  configure({adapter: new Adapter()});
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <DistributorDeepdiveTable data={data} spinnerState={true} dataFetchFail={false} name={"distributor deep dive"} handlePinView={()=>{}}/>
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

  it("should render Distributor deep dive view table and props should be defined", () => {
    let data = [{}];
    const wrapper = shallow(    <DistributorDeepdiveTable data={data} spinnerState={true} dataFetchFail={false} name={"distributor deep dive"} handlePinView={()=>{}} />
    );
    expect(wrapper.props(data)).toBeDefined()
  });

  describe("Distributor deep dive view Table",() => {
    test("renders",() => {
      let data = [{}];
      const wrapper = shallow(   <DistributorDeepdiveTable data={data} spinnerState={true} dataFetchFail={false} name={"distributor deep dive"} handlePinView={()=>{}} />
      );
      expect(wrapper.exists()).toBe(true);
    });
  });
  it.skip("Should render and match the snapshot", () => {
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <DistributorDeepdiveTable data={data} spinnerState={true} dataFetchFail={false} name={"distributor deep dive"} handlePinView={()=>{}} />

      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
