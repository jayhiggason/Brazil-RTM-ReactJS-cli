/**
 *
 * Tests for SideFilter
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import SideFilter from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {configure, shallow} from "enzyme";
import DistributorTable from "../../DistributorTable";
import Adapter from "enzyme-adapter-react-16";
let filtersData ={
  "chain": [],
  "manager": [],
  "coordinator": [],
  "timeRange": ["YTD", "QTD", "PTD"],
  "brand": [],
  "category": [],
  "distributor": [],
  "technology": [],
  "channel": [],
  "region": [],
  "store": [],
  "customer": [],
  "GP":[],
  "SalesRep":[],
  "compare":["Current Year","Last Year"]
};

let    selectedFiltersData={
  "recent_selected": "",
  "recent_selected_dropdown_values": [],
  "chain": [],
  "manager": [],
  "coordinator": [],
  "timeRange": "YTD",
  "brand": [],
  "category": [],
  "distributor": [],
  "technology": [],
  "channel": [],
  "region": [],
  "store": [],
  "customer": [],
  "GP":[],
  "SalesRep":[],
  "compare":"Current Year"
};

describe("<SideFilter />", () => {
  configure({adapter: new Adapter()});
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <SideFilter spinnerState={true} dataFetchFailed={false} selectedFilter={selectedFiltersData} filterData={filtersData} filterDataFetch={()=>{}} onFilterChange={()=>{}} fetchData={()=>{}} />
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

  it("should render Side Filter component and props should be defined", () => {

    let data = [{}];
    const wrapper = shallow(<SideFilter spinnerState={true} dataFetchFailed={false} selectedFilter={selectedFiltersData} filterData={filtersData} filterDataFetch={()=>{}} onFilterChange={()=>{}} fetchData={()=>{}} />);
    expect(wrapper.props(data)).toBeDefined()
  });

  describe("Side Filter component",() => {
    test("renders",() => {
      let data = [{}];
      const wrapper = shallow(<SideFilter spinnerState={true} dataFetchFailed={false} selectedFilter={selectedFiltersData} filterData={filtersData} filterDataFetch={()=>{}} onFilterChange={()=>{}} fetchData={()=>{}} />);
      expect(wrapper.exists()).toBe(true);
    });
  });

  it.skip("Should render the side filter component and match the snapshot", () => {
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <SideFilter spinnerState={true} dataFetchFailed={false} selectedFilter={selectedFiltersData} filterData={filtersData} filterDataFetch={()=>{}} onFilterChange={()=>{}} fetchData={()=>{}} />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
