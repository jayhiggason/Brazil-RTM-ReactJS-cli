// Individual exports for testing
import {call, put, select, takeLatest} from "redux-saga/effects";
import {makeSelectSelectedFilters} from "../App/selectors";
import {getCookie, tokenExpired} from "../../utils/cookieUtilities";
import {rtmUrl} from "../../config.json";
import request from "../../utils/request";

import {
    CARDS_DATA_FETCH,
    CATEGORY_COMPARISON_FILTER_FETCH,
    ITEM_HEATMAP_FETCH,
    PRODUCT_SKU_TREND_FILTER_FETCH,
    PRODUCT_TREND_FETCH,
    SELECTED_CATEGORY,
    SKU_TABLE_FETCH,
    TRENDS_LINE_FETCH
} from "./constants";

import {
    cardDataFail,
    cardDataFetch,
    cardDataSuccess,
    categoryComparisonFilterFail,
    categoryComparisonFilterFetch,
    categoryComparisonFilterSuccess,
    categoryFilterFail,
    categoryFilterFetch,
    categoryFilterSuccess,
    itemHeatFail,
    itemHeatFetch,
    itemHeatSuccess,
    productSkuTrendFilterFail,
    productSkuTrendFilterFetch,
    productSkuTrendFilterSuccess,
    productTrendFail,
    productTrendFetch,
    productTrendSuccess,
    seeTrendLineFail,
    seeTrendLineFetch,
    seeTrendLineSuccess,
    skuFilterOnChange,
    skuTableFail,
    skuTableFetch,
    skuTableSuccess,
    toggleCard,
} from "./actions";

import makeSelectBrandDeepDivePage, {
    makeSelectHeatMapButton,
    makeSelectHeatMapFilter,
    makeSelectHeatMapPartitionFilter,
    makeSelectProductFilter,
    makeSelectProductSkuTrendSelectedFilter,
    makeSelectProductUomButton,
    makeSelectProductVsButton,
    makeSelectSelectedCategoryFilter,
    makeSelectSkuTableFilter,
} from "./selectors";
import {getTimeRangeFilterData, transformTrendLine} from "../../utils/utility";
import {dataExceptionHandlingDialog} from "../App/actions";
import {decodeResponse, encodeRequestBody} from "../../utils/jwtUtils";
import {makeSelectLocale} from "../LanguageProvider/selectors";

const apiTryLimit = 2;
let skuTableCount = 0;
let cardsDataCount = 0;
let categoryFilterCount = 0;
let categoryComparisonCount = 0;
let seeTrendLineCount = 0;
let productTrendCount = 0;
let itemHeatmapCount = 0;


// cards saga

export function* cardsDataSaga() {
    let selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let store = selectedFilters['store'].map(item => item.value);
    let user = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const view = "brand_deep_dive";
    const apiUrl = rtmUrl + "/performance_cards/";
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        user: user['userID'],
        user_role: user['role'],
        view: view,
    });
    try {
        let data = yield call(request, apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        data = decodeResponse(data);
        if (data !== null || data !== {}) {
            yield put(cardDataSuccess(data));
            yield put(toggleCard({
                invoice: true,
                units: true
            }));
        } else {
            yield put(cardDataFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (cardsDataCount <= apiTryLimit) {
            cardsDataCount++;
            yield put(cardDataFetch())
        } else {
            yield put(cardDataFail())
        }
        console.log(e);
    }
}

// category filter - see trends saga

export function* categoryFilterSaga() {
    let selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let store = selectedFilters['store'].map(item => item.value);
    const state = yield select(makeSelectBrandDeepDivePage());
    let user = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const apiUrl = rtmUrl + "/get_comparison_data/";
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        'information': state['selectedCategoryKpi'],
        'user': user['userID'],
        user_role: user['role'],
    });
    try {
        let data = yield call(request, apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        data = decodeResponse(data);
        if (data !== null || data !== {}) {
            yield put(categoryFilterSuccess(data['filter']));
        } else {
            yield put(categoryFilterFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (categoryFilterCount <= apiTryLimit) {
            categoryFilterCount++;
            yield put(categoryFilterFetch())
        } else {
            yield put(categoryFilterFail())
        }
        console.log(e);
    }
}

// category comparison filter in see trends saga

export function* categoryCamparisonFilterSaga() {
    const selectedComparisonFilter = yield select(makeSelectSelectedCategoryFilter());
    const selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    const cardInfo = yield select();
    const apiUrl = rtmUrl + "";
    let user = JSON.parse(getCookie("UserCred"));
    const body = encodeRequestBody({
        selectedFilters: {...selectedFilters, timeRange: TimeRange,},
        cardInfo: cardInfo,
        selectedComparisonFilter: selectedComparisonFilter,
        user_role: user['role'],
    });
    try {
        let data = yield call(request, apiUrl, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
        data = decodeResponse(data);
        if (data !== null || data !== {}) {
            yield put(categoryComparisonFilterSuccess(data));
        } else {
            yield put(categoryComparisonFilterFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (categoryComparisonCount <= apiTryLimit) {
            categoryComparisonCount++;
            yield put(categoryComparisonFilterFetch())
        } else {
            yield put(categoryComparisonFilterFail())
        }
        console.log(e);
    }
}

// see trends saga

export function* seeTrendsSaga() {
    const state = yield select(makeSelectBrandDeepDivePage());
    // let brand = decodeURIComponent(window.location.search).substring(1);
    let selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let store = selectedFilters['store'].map(item => item.value);
    let user = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const view = "brand_deep_dive";
    const apiUrl = rtmUrl + "/get_trends/";
    const locale = yield select(makeSelectLocale());
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        'user': user['userID'],
        user_role: user['role'],
        'kpi': state['kpiCard'],
        'filter_key': state['selectedCategoryKpi'],
        'filter_array': state['categorySelectedFilterData'],
        view: view,
        locale:locale
    });
    try {
        let data = yield call(request, apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        data = decodeResponse(data);
        if (data !== null || data !== {}) {
            const transformedData = transformTrendLine(data);
            yield put(seeTrendLineSuccess(transformedData));
        } else {
            yield put(seeTrendLineFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (seeTrendLineCount <= apiTryLimit) {
            seeTrendLineCount++;
            yield put(seeTrendLineFetch())
        } else {
            yield put(seeTrendLineFail())
        }
        console.log(e);
    }
}

//product trend saga
export function* productTrendSaga() {
    let selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let store = selectedFilters['store'].map(item => item.value);
    const selectedVSButton = yield select(makeSelectProductVsButton());
    const selectedProductFilter = yield select(makeSelectProductFilter());
    const selectedUomButton = yield select(makeSelectProductUomButton());
    const selectedProductSkuTrendFilter = yield select(makeSelectProductSkuTrendSelectedFilter());
    const locale = yield select(makeSelectLocale());
    let user = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        // brand: brand,
        user: user['userID'],
        user_role: user['role'],
        topFilter: selectedProductFilter,
        productSkuTrendFilter: selectedProductSkuTrendFilter,
        uomButton: selectedUomButton,
        vsFilter: selectedVSButton,
        locale:locale
    });
    const apiUrl = rtmUrl + "/get_brand_deep_dive_prod_trend/";
    try {
        let data = yield call(request, apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        data = decodeResponse(data);
        if (data !== null || data !== {}) {
            yield put(productTrendSuccess(data));

        } else {
            yield put(productTrendFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (productTrendCount <= apiTryLimit) {
            productTrendCount++;
            yield put(productTrendFetch())
        } else {
            yield put(productTrendFail())
        }
        console.log(e);
    }
}

//product/sku filter saga

export function* productSkuFilterSaga() {
    let selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let store = selectedFilters['store'].map(item => item.value);
    const apiUrl = rtmUrl + "/get_product_details/";
    let user = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        user: user['userID'],
        user_role: user['role'],
    });
    try {
        let data = yield call(request, apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        data = decodeResponse(data);
        if (data !== null || data !== {}) {
            yield put(productSkuTrendFilterSuccess(data['product']));
        } else {
            yield put(productSkuTrendFilterFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (categoryComparisonCount <= apiTryLimit) {
            categoryComparisonCount++;
            yield put(productSkuTrendFilterFetch())
        } else {
            yield put(productSkuTrendFilterFail())
        }
    }
}


//item heat map saga
export function* itemHeatmapSaga() {
    let selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let store = selectedFilters['store'].map(item => item.value);
    const selectedHeatMapButton = yield select(makeSelectHeatMapButton());
    const selectedHeatMapFilter = yield select(makeSelectHeatMapFilter());
    const selectedHeatMapPartitionFilter = yield select(makeSelectHeatMapPartitionFilter());
    let partitionByFilter = selectedHeatMapPartitionFilter === "Overall" ? "" : selectedHeatMapPartitionFilter;
    let user = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const apiUrl = rtmUrl + "/get_brand_deep_dive_sales_breakdown/";
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        user: user['userID'],
        user_role: user['role'],
        selectionButtons: selectedHeatMapButton,
        selectionDropdown: selectedHeatMapFilter,
        selectPartition: partitionByFilter,
    });
    try {
        let data = yield call(request, apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        data = decodeResponse(data);
        if (data !== null || data !== {}) {
            yield put(itemHeatSuccess(data));
            if (data.length !== 0) {
                let prod = data[0]['data'][0]['x'];
                yield put(skuFilterOnChange(prod));
                yield put(skuTableFetch());
            } else {
                yield put(skuFilterOnChange('Deselect'));
                yield put(skuTableFetch());
            }

        } else {
            yield put(itemHeatFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (itemHeatmapCount <= apiTryLimit) {
            itemHeatmapCount++;
            yield put(itemHeatFetch())
        } else {
            itemHeatmapCount = 0;
            yield put(itemHeatFail())
        }
        console.log(e);
    }
}

// sku table saga
export function* skuTableSaga() {
    let selectedFilters = yield select(makeSelectSelectedFilters());
    const TimeRange = getTimeRangeFilterData(selectedFilters['timeRange']);
    let store = selectedFilters['store'].map(item => item.value);
    let user = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const skuTableFilter = yield select(makeSelectSkuTableFilter());
    const body = encodeRequestBody({
        ...selectedFilters,
        timeRange: TimeRange,
        store: store,
        user: user['userID'],
        user_role: user['role'],
        product: skuTableFilter
    });
    const apiUrl = rtmUrl + "/get_correlated_products/";
    try {
        let data = yield call(request, apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        data = decodeResponse(data);
        if (data !== null || data !== {}) {
            yield put(skuTableSuccess(data));
        } else {
            yield put(skuTableFail())
        }
    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        if (skuTableCount <= apiTryLimit) {
            skuTableCount++;
            yield put(skuTableFetch())
        } else {
            yield put(skuTableFail())
        }
        console.log(e);
    }
}

// Individual exports for testing
export default function* brandDeepDivePageSaga() {
    yield takeLatest(CARDS_DATA_FETCH, cardsDataSaga);
    yield takeLatest(SELECTED_CATEGORY, categoryFilterSaga);
    yield takeLatest(CATEGORY_COMPARISON_FILTER_FETCH, categoryCamparisonFilterSaga);
    yield takeLatest(TRENDS_LINE_FETCH, seeTrendsSaga);
    yield takeLatest(PRODUCT_TREND_FETCH, productTrendSaga);
    yield takeLatest(ITEM_HEATMAP_FETCH, itemHeatmapSaga);
    yield takeLatest(SKU_TABLE_FETCH, skuTableSaga);
    yield takeLatest(PRODUCT_SKU_TREND_FILTER_FETCH, productSkuFilterSaga);

}
