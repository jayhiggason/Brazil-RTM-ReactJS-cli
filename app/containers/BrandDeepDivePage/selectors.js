import { createSelector } from "reselect";
import { initialState } from "./reducer";


/**
 * Direct selector to the brandDeepDivePage state domain
 */

const selectBrandDeepDivePageDomain = state =>
  state.brandDeepDivePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BrandDeepDivePage
 */

const makeSelectBrandDeepDivePage = () =>
  createSelector(
    selectBrandDeepDivePageDomain,
    substate => substate
  );

// cards data
const makeSelectCardsSuccess = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.cardsData
    );

const makeSelectCardsFail = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.cardsDataFail
    );

const makeSelectCardsSpinnerState = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.cardsDataSpinnerState
    );

const makeSelectInvoiceToggle = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.invoiceToggle
    );
const makeSelectUnitsToggle = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.unitsToggle
    );

// see trends filters

const makeSelectCategoryFilterSuccess = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.categoryFilterData
    );

const makeSelectCategoryFilterFail = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.categoryFilterFail
    );

const makeSelectCategoryFilterSpinnerState = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.categoryFilterSpinnerState
    );


// see trend line
const makeSelectSeeTrendsLineSuccess = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.seeTrendLineData
    );

const makeSelectSeeTrendsLineFail = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.seeTrendLineFail
    );

const makeSelectSeeTrendsSpinnerState = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.seeTrendLineSpinnerState
    );

// product / sku Trend graph
const makeSelectProductTrendSuccess = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.productTrendData
    );
const makeSelectProductTrendFail = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.productTrendDataFail
    );
const makeSelectProductTrendSpinnerState = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.productTrendDataSpinnerState
    );

const makeSelectProductVsButton = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.productTrendButton
    );

const makeSelectProductFilter = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.productTrendFilter
    );

//PRODUCT UOM BUTTON
const  makeSelectProductUomButton = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.productTrendUomFilter
    );
//product sku filter

const makeSelectProductSkuTrendFilterSuccess = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.productSkuTrendFilterData
    );

const makeSelectProductSkuTrendFilterFail = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.productSkuTrendFilterFail
    );

const makeSelectProductSkuTrendSpinnerState = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.productSkuTrendFilterSpinnerState
    );


const makeSelectProductSkuTrendSelectedFilter  = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.selectedProductSkuTrendFilter
    );

// ITEM heatmap

const makeSelectItemHeatMapSuccess = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.itemHeatMapData
    );
const makeSelectItemHeatMapFail = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.itemHeatMapDataFail
    );
const makeSelectItemHeatMapSpinnerState = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.itemHeatMapDataSpinnerState
    );

const makeSelectHeatMapButton = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.itemHeatMapButton
    );

const makeSelectHeatMapFilter = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.itemHeatMapFilter
    );

const makeSelectHeatMapTimeFilter = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.itemHeatMapTimeFilter
    );

const makeSelectHeatMapPartitionFilter = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.itemHeatMapPartitionFilter
    );
//  sku table

const makeSelectSkuTableSuccess = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.skuTableData
    );

const makeSelectSkuTableFail = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.skuTableDataFail
    );

const makeSelectSkuTableSpinnerState = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.skuTableDataSpinnerState
    );

const makeSelectSkuTableFilter = () =>
    createSelector(
        selectBrandDeepDivePageDomain,
        substate => substate.skuFilter
    );



export default makeSelectBrandDeepDivePage;
export { selectBrandDeepDivePageDomain,
  makeSelectCardsSuccess,
  makeSelectCardsFail,
  makeSelectCardsSpinnerState,
  makeSelectInvoiceToggle,
  makeSelectUnitsToggle,
  makeSelectCategoryFilterFail,
  makeSelectCategoryFilterSuccess,
  makeSelectCategoryFilterSpinnerState,
  makeSelectSeeTrendsLineSuccess,
  makeSelectSeeTrendsLineFail,
  makeSelectSeeTrendsSpinnerState,
  makeSelectProductTrendSuccess,
  makeSelectProductTrendFail,
  makeSelectProductTrendSpinnerState,
  makeSelectProductVsButton,
  makeSelectProductFilter,
    makeSelectProductUomButton,
    makeSelectProductSkuTrendFilterSuccess,
    makeSelectProductSkuTrendFilterFail,
    makeSelectProductSkuTrendSpinnerState,
    makeSelectProductSkuTrendSelectedFilter,
  makeSelectItemHeatMapSuccess,
  makeSelectItemHeatMapFail,
  makeSelectItemHeatMapSpinnerState,
  makeSelectHeatMapButton,
    makeSelectHeatMapTimeFilter,
    makeSelectHeatMapPartitionFilter,
  makeSelectHeatMapFilter,
  makeSelectSkuTableSuccess,
  makeSelectSkuTableFail,
  makeSelectSkuTableSpinnerState,
  makeSelectSkuTableFilter

};
