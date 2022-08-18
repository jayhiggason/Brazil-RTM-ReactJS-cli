/**
 *
 * Tests for DistributorTable
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import DistributorTable from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {configure, shallow} from "enzyme";
import StoreViewTable from "../../StoreViewTable";
import Adapter from "enzyme-adapter-react-16";

describe("<DistributorTable />", () => {
  configure({adapter: new Adapter()});
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    const data = [{}];
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <DistributorTable data={data} spinnerState={true} name={'Distributor'} kpiName={'WOS'}/>
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

  it("should render Distributor table and props should be defined", () => {

    let data = [{}];
    const wrapper = shallow(<DistributorTable data={data} spinnerState={true} name={'Distributor'} kpiName={'WOS'}/>);
    expect(wrapper.props(data)).toBeDefined()
  });

  describe("Distributor Table component",() => {
    test("renders",() => {
      let data = [{}];
      const wrapper = shallow(<DistributorTable data={data} spinnerState={true} name={'Distributor'} kpiName={'WOS'}/>);
      expect(wrapper.exists()).toBe(true);
    });
  });

  it.skip("Should render and match the snapshot", () => {
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <DistributorTable />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
