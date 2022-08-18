import { defaultAction, brandBubbleFail, brandBubbleSuccess,
  brandBubbleFetch,
  brandBubbleTimeFilterOnChange,
  cardDataFail, cardDataFetch,
  cardDataSuccess,
  categoryComparisonFilterFail,
  categoryComparisonFilterFetch,
  categoryComparisonFilterSuccess ,
  categoryComparisonOnChange,
  categoryFilterFail,
  categoryFilterFetch,
  categoryFilterSuccess,
  categoryOnChange,
  distributorButtonsOnChange,
  distributorFilterOnChange,
  distributorTableFail,
  distributorTableFetch,
  distributorTableSuccess,
   invoiceToggle,
  seeTrendLineFail,
  seeTrendLineFetch,
  seeTrendLineSuccess,
  toggleCard,
  unitsToggle } from "../actions";
import { DEFAULT_ACTION , BRAND_BUBBLE_FETCH,
  BRAND_BUBBLE_SUCCESS,
  BRAND_BUBBLE_FAIL,
  DISTRIBUTOR_TABLE_FETCH,
  DISTRIBUTOR_TABLE_SUCCESS,
  DISTRIBUTOR_TABLE_FAIL,
  DISTRIBUTOR_TABLE_BUTTONS,
  DISTRIBUTOR_TABLE_FILTER,
  CARDS_DATA_FETCH,
  CARDS_DATA_SUCCESS,
  CARDS_DATA_FAIL,
  INVOICE_TOGGLE,
  UNITS_TOGGLE,
  CATEGORY_FILTER_FETCH,
  CATEGORY_FILTER_SUCCESS,
  CATEGORY_FILTER_FAIL,
  SELECTED_CATEGORY,
  CATEGORY_COMPARISON_FILTER_FETCH,
  CATEGORY_COMPARISON_FILTER_SUCCESS,
  CATEGORY_COMPARISON_FILTER_FAIL,
  SELECTED_CATEGORY_COMPARISON,
  TRENDS_LINE_FETCH,
  TRENDS_LINE_SUCCESS,
  TRENDS_LINE_FAIL, TOGGLE_CARD, BRAND_BUBBLE_TIME_FILTER } from "../constants";

describe("PerformanceSummary actions", () => {
  describe("Default Action", () => {
    it("has a type of DEFAULT_ACTION", () => {
      const expected = {
        type: DEFAULT_ACTION
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
});


//ACTION WHICH DOESN'T HAVE DATA
  describe("brandBubbleFail", () => {   //mention action name
    it("has a type of BRAND_BUBBLE_FAIL", () => {   // mention const name
      const expected = {
        type: BRAND_BUBBLE_FAIL  //const name
      };
      expect(brandBubbleFail()).toEqual(expected);   //action name
    });
  });

//ACTION WHICH HAS DATA
describe("brandBubbleSuccess", () => {   //mention action name
  it("has a type of BRAND_BUBBLE_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: BRAND_BUBBLE_SUCCESS,  //const name
      data,
    };
    expect(brandBubbleSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("brandBubbleFetch", () => {   //mention action name
  it("has a type of BRAND_BUBBLE_FETCH", () => {   // mention const name
    const expected = {
      type: BRAND_BUBBLE_FETCH  //const name
    };
    expect(brandBubbleFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("brandBubbleTimeFilterOnChange", () => {   //mention action name
  it("has a type of BRAND_BUBBLE_TIME_FILTER", () => {   // mention const name
    const expected = {
      type: BRAND_BUBBLE_TIME_FILTER  //const name
    };
    expect(brandBubbleTimeFilterOnChange()).toEqual(expected);   //action name
  });
});


//ACTION WHICH DOESN'T HAVE DATA
describe("cardDataFail", () => {   //mention action name
  it("has a type of CARDS_DATA_FAIL", () => {   // mention const name
    const expected = {
      type: CARDS_DATA_FAIL  //const name
    };
    expect(cardDataFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("cardDataSuccess", () => {   //mention action name
  it("has a type of CARDS_DATA_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: CARDS_DATA_SUCCESS,  //const name
      data,
    };
    expect(cardDataSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("cardDataFetch", () => {   //mention action name
  it("has a type of CARDS_DATA_FETCH", () => {   // mention const name
    const expected = {
      type: CARDS_DATA_FETCH  //const name
    };
    expect(cardDataFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("categoryComparisonFilterFail", () => {   //mention action name
  it("has a type of CATEGORY_COMPARISON_FILTER_FAIL", () => {   // mention const name
    const expected = {
      type: CATEGORY_COMPARISON_FILTER_FAIL  //const name
    };
    expect(categoryComparisonFilterFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("categoryComparisonFilterSuccess", () => {   //mention action name
  it("has a type of CATEGORY_COMPARISON_FILTER_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: CATEGORY_COMPARISON_FILTER_SUCCESS,  //const name
      data,
    };
    expect(categoryComparisonFilterSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("categoryComparisonFilterFetch", () => {   //mention action name
  it("has a type of CATEGORY_COMPARISON_FILTER_FETCH", () => {   // mention const name
    const expected = {
      type: CATEGORY_COMPARISON_FILTER_FETCH  //const name
    };
    expect(categoryComparisonFilterFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("categoryComparisonOnChange", () => {   //mention action name
  it("has a type of SELECTED_CATEGORY_COMPARISON", () => {   // mention const name
    const expected = {
      type: SELECTED_CATEGORY_COMPARISON  //const name
    };
    expect(categoryComparisonOnChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("categoryFilterFail", () => {   //mention action name
  it("has a type of CATEGORY_FILTER_FAIL", () => {   // mention const name
    const expected = {
      type: CATEGORY_FILTER_FAIL  //const name
    };
    expect(categoryFilterFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("categoryFilterSuccess", () => {   //mention action name
  it("has a type of CATEGORY_FILTER_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: CATEGORY_FILTER_SUCCESS,  //const name
      data,
    };
    expect(categoryFilterSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("categoryFilterFetch", () => {   //mention action name
  it("has a type of CATEGORY_FILTER_FETCH", () => {   // mention const name
    const expected = {
      type: CATEGORY_FILTER_FETCH  //const name
    };
    expect(categoryFilterFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("categoryOnChange", () => {   //mention action name
  it("has a type of SELECTED_CATEGORY", () => {   // mention const name
    const expected = {
      type: SELECTED_CATEGORY  //const name
    };
    expect(categoryOnChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("distributorTableFail", () => {   //mention action name
  it("has a type of DISTRIBUTOR_TABLE_FAIL", () => {   // mention const name
    const expected = {
      type: DISTRIBUTOR_TABLE_FAIL  //const name
    };
    expect(distributorTableFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("distributorTableSuccess", () => {   //mention action name
  it("has a type of DISTRIBUTOR_TABLE_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: DISTRIBUTOR_TABLE_SUCCESS,  //const name
      data,
    };
    expect(distributorTableSuccess(data)).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("distributorButtonsOnChange", () => {   //mention action name
  it("has a type of DISTRIBUTOR_TABLE_BUTTONS", () => {   // mention const name
    const expected = {
      type: DISTRIBUTOR_TABLE_BUTTONS  //const name
    };
    expect(distributorButtonsOnChange()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("distributorFilterOnChange", () => {   //mention action name
  it("has a type of DISTRIBUTOR_TABLE_FILTER", () => {   // mention const name
    const expected = {
      type: DISTRIBUTOR_TABLE_FILTER  //const name
    };
    expect(distributorFilterOnChange()).toEqual(expected);   //action name
  });
});


//ACTION WHICH DOESN'T HAVE DATA
describe("distributorTableFetch", () => {   //mention action name
  it("has a type of DISTRIBUTOR_TABLE_FETCH", () => {   // mention const name
    const expected = {
      type: DISTRIBUTOR_TABLE_FETCH  //const name
    };
    expect(distributorTableFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("invoiceToggle", () => {   //mention action name
  it("has a type of INVOICE_TOGGLE", () => {   // mention const name
    const expected = {
      type: INVOICE_TOGGLE  //const name
    };
    expect(invoiceToggle()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("toggleCard", () => {   //mention action name
  it("has a type of TOGGLE_CARD", () => {   // mention const name
    const expected = {
      type: TOGGLE_CARD  //const name
    };
    expect(toggleCard()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("unitsToggle", () => {   //mention action name
  it("has a type of UNITS_TOGGLE", () => {   // mention const name
    const expected = {
      type: UNITS_TOGGLE  //const name
    };
    expect(unitsToggle()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("seeTrendLineFetch", () => {   //mention action name
  it("has a type of TRENDS_LINE_FETCH", () => {   // mention const name
    const expected = {
      type: TRENDS_LINE_FETCH  //const name
    };
    expect(seeTrendLineFetch()).toEqual(expected);   //action name
  });
});

//ACTION WHICH DOESN'T HAVE DATA
describe("seeTrendLineFail", () => {   //mention action name
  it("has a type of TRENDS_LINE_FAIL", () => {   // mention const name
    const expected = {
      type: TRENDS_LINE_FAIL  //const name
    };
    expect(seeTrendLineFail()).toEqual(expected);   //action name
  });
});

//ACTION WHICH HAS DATA
describe("seeTrendLineSuccess", () => {   //mention action name
  it("has a type of TRENDS_LINE_SUCCESS", () => {   // mention const name
    const data="data"
    const expected = {
      type: TRENDS_LINE_SUCCESS,  //const name
      data,
    };
    expect(seeTrendLineSuccess(data)).toEqual(expected);   //action name
  });
});