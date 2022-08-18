/**
 *
 * Tests for BrandHeatMap
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";
// import 'jest-dom/extend-expect'; // add some helpful assertions

import BrandHeatMap from "../index";
import { DEFAULT_LOCALE } from "../../../i18n";
import {configure, shallow} from "enzyme";
import SideFilter from "../../SideFilter";
import Adapter from "enzyme-adapter-react-16";

let series = [{"name": "TRF - TRIUNFANTE PARANA ALIMENTOS LTDA.", "data": [{"x": "WHI SCKS", "y": 81, "Invoice": 26400}, {"x": "WHI PCH", "y": 95, "Invoice": 133329}, {"x": "WHI DRY", "y": 99, "Invoice": 310463}, {"x": "WHI CAST", "y": 91, "Invoice": 67708}, {"x": "WHI CAN", "y": 78, "Invoice": 19112}, {"x": "PEDBALNAT", "y": 84, "Invoice": 38332}, {"x": "PED SCKS", "y": 86, "Invoice": 44900}, {"x": "PED PCH", "y": 95, "Invoice": 141951}, {"x": "PED NE", "y": 73, "Invoice": 14121}, {"x": "PED DTX", "y": 71, "Invoice": 12622}, {"x": "PED DRY", "y": 100, "Invoice": 396623}, {"x": "PED CAN", "y": 78, "Invoice": 19457}, {"x": "OPT DOG PCH", "y": 0, "Invoice": 0}, {"x": "OPT DOG DRY", "y": 0, "Invoice": 0}, {"x": "OPT CAT PCH", "y": 14, "Invoice": 290}, {"x": "OPT CAT DRY", "y": 0, "Invoice": 0}, {"x": "KITEKAT PCH", "y": 53, "Invoice": 3953}, {"x": "KITEKAT", "y": 48, "Invoice": 2736}, {"x": "DREAMIES", "y": 48, "Invoice": 2696}, {"x": "CHAMP DR", "y": 70, "Invoice": 11093}]}, {"name": "TET - TETE ATACADISTA DE ALIMENTOS LTDA M", "data": [{"x": "WHI SCKS", "y": 42, "Invoice": 1987}, {"x": "WHI PCH", "y": 90, "Invoice": 64288}, {"x": "WHI DRY", "y": 98, "Invoice": 231820}, {"x": "WHI CAST", "y": 84, "Invoice": 38001}, {"x": "WHI CAN", "y": 62, "Invoice": 6533}, {"x": "PEDBALNAT", "y": 43, "Invoice": 2094}, {"x": "PED SCKS", "y": 57, "Invoice": 5438}, {"x": "PED PCH", "y": 91, "Invoice": 71924}, {"x": "PED NE", "y": 0, "Invoice": 0}, {"x": "PED DTX", "y": 36, "Invoice": 1337}, {"x": "PED DRY", "y": 98, "Invoice": 217909}, {"x": "PED CAN", "y": 64, "Invoice": 7201}, {"x": "OPT DOG PCH", "y": 8, "Invoice": 152}, {"x": "OPT DOG DRY", "y": 0, "Invoice": 0}, {"x": "OPT CAT PCH", "y": 9, "Invoice": 158}, {"x": "OPT CAT DRY", "y": 0, "Invoice": 0}, {"x": "KITEKAT PCH", "y": 59, "Invoice": 5740}, {"x": "KITEKAT", "y": 89, "Invoice": 57574}, {"x": "DREAMIES", "y": 13, "Invoice": 262}, {"x": "CHAMP DR", "y": 67, "Invoice": 8996}]}, {"name": "RIM - RIOMARKET DISTRIBUIDORA DE ALIMENTO", "data": [{"x": "WHI SCKS", "y": 58, "Invoice": 5508}, {"x": "WHI PCH", "y": 88, "Invoice": 56660}, {"x": "WHI DRY", "y": 97, "Invoice": 160787}, {"x": "WHI CAST", "y": 78, "Invoice": 19253}, {"x": "WHI CAN", "y": 77, "Invoice": 17550}, {"x": "PEDBALNAT", "y": 51, "Invoice": 3590}, {"x": "PED SCKS", "y": 76, "Invoice": 17262}, {"x": "PED PCH", "y": 84, "Invoice": 37289}, {"x": "PED NE", "y": 85, "Invoice": 41059}, {"x": "PED DTX", "y": 61, "Invoice": 6433}, {"x": "PED DRY", "y": 99, "Invoice": 264568}, {"x": "PED CAN", "y": 67, "Invoice": 8725}, {"x": "OPT DOG PCH", "y": 29, "Invoice": 905}, {"x": "OPT DOG DRY", "y": 0, "Invoice": 0}, {"x": "OPT CAT PCH", "y": 28, "Invoice": 783}, {"x": "OPT CAT DRY", "y": 0, "Invoice": 0}, {"x": "KITEKAT PCH", "y": 35, "Invoice": 1290}, {"x": "KITEKAT", "y": 69, "Invoice": 10907}, {"x": "DREAMIES", "y": 60, "Invoice": 5911}, {"x": "CHAMP DR", "y": 37, "Invoice": 1469}]}, {"name": "PRO - PROPEC DISTRIBUIDORA LTDA", "data": [{"x": "WHI SCKS", "y": 18, "Invoice": 408}, {"x": "WHI PCH", "y": 85, "Invoice": 41172}, {"x": "WHI DRY", "y": 97, "Invoice": 158905}, {"x": "WHI CAST", "y": 84, "Invoice": 38427}, {"x": "WHI CAN", "y": 44, "Invoice": 2177}, {"x": "PEDBALNAT", "y": 60, "Invoice": 5926}, {"x": "PED SCKS", "y": 54, "Invoice": 4514}, {"x": "PED PCH", "y": 94, "Invoice": 120827}, {"x": "PED NE", "y": 0, "Invoice": 0}, {"x": "PED DTX", "y": 31, "Invoice": 1011}, {"x": "PED DRY", "y": 98, "Invoice": 261275}, {"x": "PED CAN", "y": 57, "Invoice": 5191}, {"x": "OPT DOG PCH", "y": 0, "Invoice": 0}, {"x": "OPT DOG DRY", "y": 0, "Invoice": 0}, {"x": "OPT CAT PCH", "y": 9, "Invoice": 174}, {"x": "OPT CAT DRY", "y": 0, "Invoice": 0}, {"x": "KITEKAT PCH", "y": 30, "Invoice": 965}, {"x": "KITEKAT", "y": 0, "Invoice": 0}, {"x": "DREAMIES", "y": 60, "Invoice": 5921}, {"x": "CHAMP DR", "y": 0, "Invoice": 0}]}, {"name": "ONZ1 - ONIZ DISTRIBUIDORA LTDA", "data": [{"x": "WHI SCKS", "y": 45, "Invoice": 2252}, {"x": "WHI PCH", "y": 79, "Invoice": 22741}, {"x": "WHI DRY", "y": 97, "Invoice": 163704}, {"x": "WHI CAST", "y": 70, "Invoice": 11147}, {"x": "WHI CAN", "y": 3, "Invoice": 62}, {"x": "PEDBALNAT", "y": 24, "Invoice": 581}, {"x": "PED SCKS", "y": 62, "Invoice": 6597}, {"x": "PED PCH", "y": 91, "Invoice": 69635}, {"x": "PED NE", "y": 0, "Invoice": 0}, {"x": "PED DTX", "y": 49, "Invoice": 2801}, {"x": "PED DRY", "y": 98, "Invoice": 233667}, {"x": "PED CAN", "y": 74, "Invoice": 14709}, {"x": "OPT DOG PCH", "y": 58, "Invoice": 5596}, {"x": "OPT DOG DRY", "y": 0, "Invoice": 0}, {"x": "OPT CAT PCH", "y": 46, "Invoice": 2353}, {"x": "OPT CAT DRY", "y": 0, "Invoice": 0}, {"x": "KITEKAT PCH", "y": 46, "Invoice": 2347}, {"x": "KITEKAT", "y": 79, "Invoice": 19496}, {"x": "DREAMIES", "y": 0, "Invoice": 0}, {"x": "CHAMP DR", "y": 92, "Invoice": 87063}]}, {"name": "MWV - M W V DISTRIBUIDORA DE ESTIVAS LTDA", "data": [{"x": "WHI SCKS", "y": 23, "Invoice": 545}, {"x": "WHI PCH", "y": 83, "Invoice": 36470}, {"x": "WHI DRY", "y": 93, "Invoice": 87895}, {"x": "WHI CAST", "y": 79, "Invoice": 20790}, {"x": "WHI CAN", "y": 43, "Invoice": 2108}, {"x": "PEDBALNAT", "y": 69, "Invoice": 9703}, {"x": "PED SCKS", "y": 59, "Invoice": 5826}, {"x": "PED PCH", "y": 89, "Invoice": 59240}, {"x": "PED NE", "y": 0, "Invoice": 0}, {"x": "PED DTX", "y": 50, "Invoice": 3034}, {"x": "PED DRY", "y": 99, "Invoice": 360004}, {"x": "PED CAN", "y": 73, "Invoice": 13562}, {"x": "OPT DOG PCH", "y": 15, "Invoice": 343}, {"x": "OPT DOG DRY", "y": 0, "Invoice": 0}, {"x": "OPT CAT PCH", "y": 1, "Invoice": 35}, {"x": "OPT CAT DRY", "y": 0, "Invoice": 0}, {"x": "KITEKAT PCH", "y": 34, "Invoice": 1233}, {"x": "KITEKAT", "y": 67, "Invoice": 8687}, {"x": "DREAMIES", "y": 0, "Invoice": 0}, {"x": "CHAMP DR", "y": 57, "Invoice": 5103}]}, {"name": "MIL - MILENIO COMERCIO DE ALIMENTOS LTDA", "data": [{"x": "WHI SCKS", "y": 2, "Invoice": 36}, {"x": "WHI PCH", "y": 94, "Invoice": 108136}, {"x": "WHI DRY", "y": 95, "Invoice": 132142}, {"x": "WHI CAST", "y": 84, "Invoice": 38603}, {"x": "WHI CAN", "y": 81, "Invoice": 26420}, {"x": "PEDBALNAT", "y": 40, "Invoice": 1786}, {"x": "PED SCKS", "y": 82, "Invoice": 27626}, {"x": "PED PCH", "y": 93, "Invoice": 93831}, {"x": "PED NE", "y": 0, "Invoice": 0}, {"x": "PED DTX", "y": 58, "Invoice": 5580}, {"x": "PED DRY", "y": 96, "Invoice": 145692}, {"x": "PED CAN", "y": 73, "Invoice": 14128}, {"x": "OPT DOG PCH", "y": 15, "Invoice": 319}, {"x": "OPT DOG DRY", "y": 0, "Invoice": 0}, {"x": "OPT CAT PCH", "y": 26, "Invoice": 649}, {"x": "OPT CAT DRY", "y": 0, "Invoice": 0}, {"x": "KITEKAT PCH", "y": 39, "Invoice": 1692}, {"x": "KITEKAT", "y": 27, "Invoice": 744}, {"x": "DREAMIES", "y": 44, "Invoice": 2224}, {"x": "CHAMP DR", "y": 54, "Invoice": 4107}]}, {"name": "GBD - GB DISTRIBUI\u00c7AO LTDA ME", "data": [{"x": "WHI SCKS", "y": 59, "Invoice": 5698}, {"x": "WHI PCH", "y": 74, "Invoice": 15089}, {"x": "WHI DRY", "y": 94, "Invoice": 122185}, {"x": "WHI CAST", "y": 69, "Invoice": 10527}, {"x": "WHI CAN", "y": 58, "Invoice": 5534}, {"x": "PEDBALNAT", "y": 71, "Invoice": 12385}, {"x": "PED SCKS", "y": 70, "Invoice": 12132}, {"x": "PED PCH", "y": 82, "Invoice": 32937}, {"x": "PED NE", "y": 75, "Invoice": 15394}, {"x": "PED DTX", "y": 62, "Invoice": 6567}, {"x": "PED DRY", "y": 99, "Invoice": 296984}, {"x": "PED CAN", "y": 65, "Invoice": 8157}, {"x": "OPT DOG PCH", "y": 16, "Invoice": 357}, {"x": "OPT DOG DRY", "y": 0, "Invoice": 0}, {"x": "OPT CAT PCH", "y": 28, "Invoice": 838}, {"x": "OPT CAT DRY", "y": 0, "Invoice": 0}, {"x": "KITEKAT PCH", "y": 52, "Invoice": 3764}, {"x": "KITEKAT", "y": 74, "Invoice": 14910}, {"x": "DREAMIES", "y": 35, "Invoice": 1320}, {"x": "CHAMP DR", "y": 62, "Invoice": 6435}]}, {"name": "FRB - FRIOBOM COMERCIO DE FRIOS E TRANSPO", "data": [{"x": "WHI SCKS", "y": 13, "Invoice": 264}, {"x": "WHI PCH", "y": 86, "Invoice": 41669}, {"x": "WHI DRY", "y": 96, "Invoice": 154181}, {"x": "WHI CAST", "y": 89, "Invoice": 56739}, {"x": "WHI CAN", "y": 33, "Invoice": 1202}, {"x": "PEDBALNAT", "y": 4, "Invoice": 76}, {"x": "PED SCKS", "y": 32, "Invoice": 1194}, {"x": "PED PCH", "y": 85, "Invoice": 41119}, {"x": "PED NE", "y": 0, "Invoice": 0}, {"x": "PED DTX", "y": 16, "Invoice": 365}, {"x": "PED DRY", "y": 97, "Invoice": 208169}, {"x": "PED CAN", "y": 0, "Invoice": 0}, {"x": "OPT DOG PCH", "y": 0, "Invoice": 0}, {"x": "OPT DOG DRY", "y": 0, "Invoice": 0}, {"x": "OPT CAT PCH", "y": 19, "Invoice": 438}, {"x": "OPT CAT DRY", "y": 0, "Invoice": 0}, {"x": "KITEKAT PCH", "y": 15, "Invoice": 316}, {"x": "KITEKAT", "y": 0, "Invoice": 0}, {"x": "DREAMIES", "y": 20, "Invoice": 452}, {"x": "CHAMP DR", "y": 0, "Invoice": 0}]}, {"name": "BAS - BASTO M DISTRIBUICAO E LOG LTDA", "data": [{"x": "WHI SCKS", "y": 56, "Invoice": 4767}, {"x": "WHI PCH", "y": 95, "Invoice": 140753}, {"x": "WHI DRY", "y": 93, "Invoice": 96321}, {"x": "WHI CAST", "y": 75, "Invoice": 15393}, {"x": "WHI CAN", "y": 69, "Invoice": 10178}, {"x": "PEDBALNAT", "y": 76, "Invoice": 17472}, {"x": "PED SCKS", "y": 75, "Invoice": 15586}, {"x": "PED PCH", "y": 91, "Invoice": 75593}, {"x": "PED NE", "y": 56, "Invoice": 5042}, {"x": "PED DTX", "y": 70, "Invoice": 11797}, {"x": "PED DRY", "y": 91, "Invoice": 79146}, {"x": "PED CAN", "y": 74, "Invoice": 14613}, {"x": "OPT DOG PCH", "y": 0, "Invoice": 0}, {"x": "OPT DOG DRY", "y": 0, "Invoice": 0}, {"x": "OPT CAT PCH", "y": 0, "Invoice": 0}, {"x": "OPT CAT DRY", "y": 0, "Invoice": 0}, {"x": "KITEKAT PCH", "y": 53, "Invoice": 3997}, {"x": "KITEKAT", "y": 27, "Invoice": 751}, {"x": "DREAMIES", "y": 40, "Invoice": 1821}, {"x": "CHAMP DR", "y": 38, "Invoice": 1575}]}];
let option = {};

describe("<BrandHeatMap />", () => {
  configure({adapter: new Adapter()});
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    // this.node.getScreenCTM = jest.fn();
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <BrandHeatMap height={400} series={series} heatMapOption={option}/>
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
  it("should render Heatmap component and props should be defined", () => {


    const wrapper = shallow(        <BrandHeatMap height={400} series={data} heatMapOption={option}/>);
    expect(wrapper.props(data)).toBeDefined()
  });

  describe("Heatmap  component",() => {
    test("renders",() => {

      const wrapper = shallow(         <BrandHeatMap height={400} series={data} heatMapOption={option}/>);
      expect(wrapper.exists()).toBe(true);
    });
  });

  it.skip("Should render heatmap and match the snapshot", () => {
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <BrandHeatMap />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
