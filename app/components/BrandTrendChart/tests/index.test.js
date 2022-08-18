/**
 *
 * Tests for BrandTrendChart
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import BrandTrendChart from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {configure, shallow} from "enzyme";
import StoreViewTable from "../../StoreViewTable";
import Adapter from "enzyme-adapter-react-16";

let data =[];
let brandLayout = {
  width: window.outerWidth / 1.35,
  height: window.outerHeight / 1.5,
  barmode: 'group',
  autosize: true,
  hovermode: true,
  xaxis: {
    title: 'Brand',
    font: {size: 13, fontFamily: "MarsCentra-Book"},
    tickfont: {size: 12, fontFamily: "MarsCentra-Book"},
    titlefont: {size: 16, fontFamily: "MarsCentra-Bold", color: 'rgb(0,0,0)'},
    tickangle: -12,
  },
  yaxis: {
    title: brandView['brandTrendUomButton'],
    font: {size: 12, fontFamily: "MarsCentra-Book"},
    titlefont: {size: 16, fontFamily: "MarsCentra-Bold", color: 'rgb(0,0,0)'},
    autosize: true

  },
  legend: {orientation: "h", x: 0, y: 1.2, fontFamily: "MarsCentra-Book"},

};
let layout={};
describe("<BrandTrendChart />", () => {
  configure({adapter: new Adapter()});
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <BrandTrendChart data={data} brandTrendClickOnChange={()=>{}} layout={layout}/>
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
  it("should render Trend chart - grouped bar and props should be defined", () => {

    const wrapper = shallow(<BrandTrendChart data={data} brandTrendClickOnChange={()=>{}} layout={brandLayout}/>);
    expect(wrapper.props(data)).toBeDefined()
  });

  describe("bRAND TREND CHART component",() => {
    test("renders",() => {

      const wrapper = shallow(<BrandTrendChart data={data} brandTrendClickOnChange={()=>{}} layout={brandLayout}/>);
      expect(wrapper.exists()).toBe(true);
    });
  });

  it.skip("Should render and match the snapshot", () => {
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <BrandTrendChart data={data} brandTrendClickOnChange={()=>{}} layout={brandLayout}/>
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
