/*
 *
 * MyPinnedViews reducer
 *
 */
import produce from "immer";
import {DEFAULT_ACTION, FETCH_PINNED_VIEWS, FETCH_PINNED_VIEWS_FAIL, FETCH_PINNED_VIEWS_SUCCESS} from "./constants";

export const initialState = {
    myViewsData: [
        // {
        //     name: "",
        //     id: "brand_view_trend_chart",
        //     api: "https://brazil-rtm.eastus2.cloudapp.azure.com/middleware-dev/api/get_brand_trend/",
        //     filters: {
        //         "recent_selected": "",
        //         "recent_selected_dropdown_values": [],
        //         "chain": [],
        //         "manager": [],
        //         "coordinator": [],
        //         "timeRange": ["YTD", "QTD"],
        //         "brand": [],
        //         "category": [],
        //         "distributor": [],
        //         "technology": [],
        //         "channel": [],
        //         "region": [],
        //         "store": [],
        //         "customer": [],
        //         "gp": [],
        //         "salesRep": [],
        //         "compare": "Current Year",
        //         "user": "chethan.s",
        //         "topFilter": "Top 10",
        //         "uomButton": "GSV",
        //         "compareButton": "target"
        //     }
        // },
        // {
        //     name: "Brand View Heat Map",
        //     viewName: "Brand View Heat Map",
        //     id: "brand_view_heat_map",
        //     api: "https://brazil-rtm.eastus2.cloudapp.azure.com/middleware-dev/api/get_brand_performance/",
        //     filters: {
        //         "recent_selected": "",
        //         "recent_selected_dropdown_values": [],
        //         "chain": [],
        //         "manager": [],
        //         "coordinator": [],
        //         "timeRange": ["YTD", "QTD"],
        //         "brand": [],
        //         "category": [],
        //         "distributor": [],
        //         "technology": [],
        //         "channel": [],
        //         "region": [],
        //         "store": [],
        //         "customer": [],
        //         "gp": [],
        //         "salesRep": [],
        //         "compare": "Current Year",
        //         "selectionButtons": "GSV",
        //         "selectionDropdown": "Actual",
        //         "growthSelect": "Period",
        //         "user": "chethan.s",
        //         "selectPartition": ""
        //     }
        // },
        // {
        //     name: "Performance Summary ",
        //     viewName: "Performance Summary  Cards",
        //     id: "performance_summary_cards",
        //     api: "https://brazil-rtm.eastus2.cloudapp.azure.com/middleware-dev/api/performance_cards/",
        //     filters: {
        //         "recent_selected": "",
        //         "recent_selected_dropdown_values": [],
        //         "chain": [],
        //         "manager": [],
        //         "coordinator": [],
        //         "timeRange": ["YTD", "QTD"],
        //         "brand": [],
        //         "category": [],
        //         "distributor": [],
        //         "technology": [],
        //         "channel": [],
        //         "region": [],
        //         "store": [],
        //         "customer": [],
        //         "gp": [],
        //         "salesRep": [],
        //         "compare": "Current Year",
        //         "user": "chethan.s",
        //         "view": "performance_summary",
        //         "toggleState": {
        //             invoice: true,
        //             units: true
        //         }
        //     }
        // },
        // {
        //     name: "Performance Summary Brand Insights",
        //     viewName: "Performance Summary  Brand Insights",
        //     id: "performance_summary_brand_insights",
        //     api: "https://brazil-rtm.eastus2.cloudapp.azure.com/middleware-dev/api/brand_insights/",
        //     filters: {
        //         "recent_selected": "",
        //         "recent_selected_dropdown_values": [],
        //         "chain": [],
        //         "manager": [],
        //         "coordinator": [],
        //         "timeRange": ["YTD", "QTD"],
        //         "brand": [],
        //         "category": [],
        //         "distributor": [],
        //         "technology": [],
        //         "channel": [],
        //         "region": [],
        //         "store": [],
        //         "customer": [],
        //         "gp": [],
        //         "salesRep": [],
        //         "compare": "Current Year",
        //         "growthSelect": "Period",
        //         "user": "chethan.s"
        //     }
        // },
        // {
        //     viewName: "Performance Summary  Distributors Performance",
        //     viewId: "performance_summary_distributors_performance",
        //     apiEnd: "distributors_performance",
        //     filters: {
        //         "recent_selected": "",
        //         "recent_selected_dropdown_values": [],
        //         "chain": [],
        //         "manager": [],
        //         "coordinator": [],
        //         "timeRange": ["YTD", "QTD"],
        //         "brand": [],
        //         "category": [],
        //         "distributor": [],
        //         "technology": [],
        //         "channel": [],
        //         "region": [],
        //         "store": [],
        //         "customer": [],
        //         "gp": [],
        //         "salesRep": [],
        //         "compare": "Current Year",
        //         "topFilter": "Top 10",
        //         "kpiName": "invoice",
        //         "user": "chethan.s"
        //     }
        // }

    ],
    fetchViewsSpinnerState:false,
    fetchViewsFailed:false
};

/* eslint-disable default-case, no-param-reassign */
const myPinnedViewsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
        case FETCH_PINNED_VIEWS:
            draft.fetchViewsSpinnerState = true;
            draft.fetchViewsFailed = false;
            break;
        case FETCH_PINNED_VIEWS_SUCCESS:
            draft.myViewsData = action.data;
            draft.fetchViewsSpinnerState = false;
            draft.fetchViewsFailed = false;
            break;
        case FETCH_PINNED_VIEWS_FAIL:
            draft.fetchViewsSpinnerState = false;
            draft.fetchViewsFailed = true;
            break;
    }
  });

export default myPinnedViewsReducer;
