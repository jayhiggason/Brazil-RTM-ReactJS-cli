/**
 *
 * Tests for StoreDeepDiveTable
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import StoreDeepDiveTable from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {configure, shallow} from "enzyme";
import PerformanceBubbleApex from "../../PerformanceBubbleApex";
import Adapter from "enzyme-adapter-react-16";
let data=[];
describe("<StoreDeepDiveTable />", () => {
  configure({adapter: new Adapter()});
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <StoreDeepDiveTable data={data} name={"store deep dive"} spinnerState={true} storeTableDataFail={false} handlePinView={()=>{}} onChangeFilter={()=>{}} onOpenFilter={()=>{}} onCloseFilter={()=>{}} openFilter={true} filterValue={"Top 10"}/>
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

  it("should render Brand Bubble chart component and props should be defined", () => {


    const wrapper = shallow(      <StoreDeepDiveTable data={data} name={"store deep dive"} spinnerState={true} storeTableDataFail={false} handlePinView={()=>{}} onChangeFilter={()=>{}} onOpenFilter={()=>{}} onCloseFilter={()=>{}} openFilter={()=>{}} filterValue={"Top 10"}/>
    );
    expect(wrapper.props(data)).toBeDefined()
  });

  describe("Brand bubble chart component",() => {
    test("renders",() => {

      const wrapper = shallow(        <StoreDeepDiveTable data={data} name={"store deep dive"} spinnerState={true} storeTableDataFail={false} handlePinView={()=>{}} onChangeFilter={()=>{}} onOpenFilter={()=>{}} onCloseFilter={()=>{}} openFilter={()=>{}} filterValue={"Top 10"}/>
      );
      expect(wrapper.exists()).toBe(true);
    });
  });
  it.skip("Should render and match the snapshot", () => {
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <StoreDeepDiveTable data={data} name={"store deep dive"} spinnerState={true} storeTableDataFail={false} handlePinView={()=>{}} onChangeFilter={()=>{}} onOpenFilter={()=>{}} onCloseFilter={()=>{}} openFilter={()=>{}} filterValue={"Top 10"}/>
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
