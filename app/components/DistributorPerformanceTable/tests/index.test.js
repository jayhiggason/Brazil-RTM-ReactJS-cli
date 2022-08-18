/**
 *
 * Tests for DistributorPerformanceTable
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import DistributorPerformanceTable from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DistributorDeepdiveTable from "../../DistributorDeepdiveTable";
let data=[];

describe("<DistributorPerformanceTable />", () => {
  configure({adapter: new Adapter()});
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <DistributorPerformanceTable data={data} dataFetchFail={false} spinnerState={true} onClickButton={()=>{}} handlePinView={()=>{}} kpiName={"Invoice"} onCloseFilter={()=>{}} onOpenFilter={()=>{}} openFilter={()=>{}} filterChange={()=>{}}  />
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


  it("should render Distributor performance table and props should be defined", () => {
    let data = [{}];
    const wrapper = shallow(        <DistributorPerformanceTable data={data} dataFetchFail={false} spinnerState={true} onClickButton={()=>{}} handlePinView={()=>{}} kpiName={"Invoice"} onCloseFilter={()=>{}} onOpenFilter={()=>{}} openFilter={()=>{}} filterChange={()=>{}}  />
    );
    expect(wrapper.props(data)).toBeDefined()
  });

  describe("Distributor performance Table - performance summary view Table",() => {
    test("renders",() => {
      let data = [{}];
      const wrapper = shallow(      <DistributorPerformanceTable data={data} dataFetchFail={false} spinnerState={true} onClickButton={()=>{}} handlePinView={()=>{}} kpiName={"Invoice"} onCloseFilter={()=>{}} onOpenFilter={()=>{}} openFilter={()=>{}} filterChange={()=>{}}  />
      );
      expect(wrapper.exists()).toBe(true);
    });
  });
  it.skip("Should render and match the snapshot", () => {
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <DistributorPerformanceTable data={data} dataFetchFail={false} spinnerState={true} onClickButton={()=>{}} handlePinView={()=>{}} kpiName={"Invoice"} onCloseFilter={()=>{}} onOpenFilter={()=>{}} openFilter={()=>{}} filterChange={()=>{}}  />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
