/**
 *
 * Tests for PurchaseAnalysisCard
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import PurchaseAnalysisCard from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

let data = [
  {
    "percentage_of_tot_sellout_cy": 100.0,
    "percentage_of_tot_sellout_ly": 100.0,
    "percentage_of_tot_sellout_growth": 0.0,
    "average_purchase_amount_cy": 1413250.29,
    "average_purchase_frequency_cy": 1956,
    "average_purchase_amount_ly": 35219411.75,
    "average_purchase_frequency_ly": 38487,
    "average_purchase_amount_growth": -95.99,
    "average_purchase_frequency_growth": 0,
    "next_expected_purchase": "2021-02-08",
    "best_product_mix": {
      "product_1": "WHISKAS DRY ADULTO CARNE 1X10,1KG RE18",
      "product_2": "WHISKAS DRY ADULTO PEIXE 1X10,1KG RE18",
      "common_invoice": 803,
      "total_sales": 380954.36000000016
    }
  }
];
describe("<PurchaseAnalysisCard />", () => {
  configure({adapter: new Adapter()});

  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <PurchaseAnalysisCard data={data}/>
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
  it("should render purchase analysis component and props should be defined", () => {


    const wrapper = shallow(         <PurchaseAnalysisCard data={data} />
    );
    expect(wrapper.props(data)).toBeDefined()
  });

  describe("Purchase analysis component",() => {
    test("renders",() => {

      const wrapper = shallow(             <PurchaseAnalysisCard data={data}/>);
      expect(wrapper.exists()).toBe(true);
    });
  });

  it.skip("Should render and match the snapshot", () => {
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <PurchaseAnalysisCard data={data}/>
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
