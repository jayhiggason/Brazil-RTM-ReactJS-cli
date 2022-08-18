/**
 *
 * Tests for Table
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions
import {shallow} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Table from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";

describe("<Table />", () => {

  configure({adapter: new Adapter()});

  it.skip("Expect to not log errors in console", () => {
    let data= [];
    const spy = jest.spyOn(global.console, "error");
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Table data={data}/>
      </IntlProvider>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it("Expect to have additional unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it.skip("should render Table and props should be defined", () => {
    let data = [];
    const wrapper = shallow(<Table data={data}/>);
    expect(wrapper.props(data)).toBeDefined()
  });

  describe.skip("Table",() => {
    test("renders",() => {
      let data = [];
      const wrapper = shallow(<Table data={data}/>);
      expect(wrapper.exists()).toBe(true);
    });
  });

  it.skip("Should render and match the snapshot", () => {
    let data= [];
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Table data={data}/>
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
