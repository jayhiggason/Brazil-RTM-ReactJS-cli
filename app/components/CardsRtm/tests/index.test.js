/**
 *
 * Tests for CardsRtm
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import CardsRtm from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {configure, shallow} from "enzyme";
import Table from "../../Table";
import {describe, expect, it} from "@jest/globals";
import Adapter from "enzyme-adapter-react-16";
let data={};
let  cardToggleState={
  invoice:true,
  units:true
};
let   trendLineData= {
      xAxis:[],
      series:[]
    };
let selectedCategoryKpi="brand";
let    categoryFilterData=[];
 let   categorySelectedFilterData=[];
let  categoryKpiList=["brand","category","distributor"];
describe("<CardsRtm />", () => {
  it("Expect to not log errors in console", () => {
    configure({adapter: new Adapter()});
    const spy = jest.spyOn(global.console, "error");
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <CardsRtm data={data} categoryFilterOnChange={()=>{}} categoryFilterFetchFailed={false} categoryFilterFetchSpinner={true} trendLineDataFetchFailed={false} trendLineSpinner={true}
        trendLineFetch={()=>{}} categoryFilterData={categoryFilterData} categoryKpiList={categoryKpiList} categoryKpiOnChange={()=>{}} trendLineData={trendLineData}
                  categorySelectedFilterData={categorySelectedFilterData} selectedCategoryKpi={selectedCategoryKpi} toggleCard={()=>{}} toggleState={cardToggleState}/>
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


it("should render Cards and props should be defined", () => {

  const wrapper = shallow( <CardsRtm data={data} categoryFilterOnChange={()=>{}} categoryFilterFetchFailed={false} categoryFilterFetchSpinner={true} trendLineDataFetchFailed={false} trendLineSpinner={true}
                                     trendLineFetch={()=>{}} categoryFilterData={categoryFilterData} categoryKpiList={categoryKpiList} categoryKpiOnChange={()=>{}} trendLineData={trendLineData}
                                     categorySelectedFilterData={categorySelectedFilterData} selectedCategoryKpi={selectedCategoryKpi} toggleCard={()=>{}} toggleState={cardToggleState}/>
  );
  expect(wrapper.props(data)).toBeDefined()
});

describe("RTM Card component",() => {
  test("renders",() => {

    const wrapper = shallow( <CardsRtm data={data} categoryFilterOnChange={()=>{}} categoryFilterFetchFailed={false} categoryFilterFetchSpinner={true} trendLineDataFetchFailed={false} trendLineSpinner={true}
                                       trendLineFetch={()=>{}} categoryFilterData={categoryFilterData} categoryKpiList={categoryKpiList} categoryKpiOnChange={()=>{}} trendLineData={trendLineData}
                                       categorySelectedFilterData={categorySelectedFilterData} selectedCategoryKpi={selectedCategoryKpi} toggleCard={()=>{}} toggleState={cardToggleState}/>
    );
    expect(wrapper.exists()).toBe(true);
  });
});

it.skip("Should render and match the snapshot", () => {
  let data= [];
  const {
    container: { firstChild }
  } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <CardsRtm data={data}/>
      </IntlProvider>
  );
  expect(firstChild).toMatchSnapshot();
});
});

