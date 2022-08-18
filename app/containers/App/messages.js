/*
 * App Messages
 *
 * This contains all the text for the Overall App.
 */

import { defineMessages } from "react-intl";

export const scope = "app.RTM";

export default defineMessages({
    kpi_sales_strike: {
        id: `${scope}.kpi_sales_strike`,
        defaultMessage: "Sales strike"
    },
    kpi_invoice: {
        id: `${scope}.kpi_invoice`,
        defaultMessage: "Invoice"
    },
    kpi_wos: {
        id: `${scope}.kpi_wos`,
        defaultMessage: "Weeks of Stock"
    },
    kpi_gsv: {
        id: `${scope}.kpi_gsv`,
        defaultMessage: "GSV"
    },
    kpi_units: {
        id: `${scope}.kpi_units`,
        defaultMessage: "Units"
    },
    kpi_tonnes: {
        id: `${scope}.kpi_tonnes`,
        defaultMessage: "Tonnes"
    },
    kpi_pos: {
        id: `${scope}.kpi_pos`,
        defaultMessage: "Point of Sales"
    },
    kpi_target: {
        id: `${scope}.kpi_target`,
        defaultMessage: "Target"
    },kpi_eos: {
        id: `${scope}.kpi_eos`,
        defaultMessage: "Estimate of Sellout"
    },
    growth: {
        id: `${scope}.growth`,
        defaultMessage: "Growth"
    },
    top_ten: {
        id: `${scope}.top_ten`,
        defaultMessage: "Top 10"
    },
    bottom_ten: {
        id: `${scope}.bottom_ten`,
        defaultMessage: "Bottom 10"
    },
    brand: {
        id: `${scope}.brand`,
        defaultMessage: "Brand"
    },
    category: {
        id: `${scope}.category`,
        defaultMessage: "Category"
    },
    distributor: {
        id: `${scope}.distributor`,
        defaultMessage: "Distributor"
    },
    region: {
        id: `${scope}.region`,
        defaultMessage: "Region"
    },
    manager: {
        id: `${scope}.manager`,
        defaultMessage: "Manager"
    },
    coordinator: {
        id: `${scope}.coordinator`,
        defaultMessage: "Coordinator"
    },
    sales_rep: {
        id: `${scope}.sales_rep`,
        defaultMessage: "Sales Rep"
    },
    price_group: {
        id: `${scope}.price_group`,
        defaultMessage: "Price Group"
    },
    channel: {
        id: `${scope}.channel`,
        defaultMessage: "Channel"
    },
    chain: {
        id: `${scope}.chain`,
        defaultMessage: "Chain"
    },
    store: {
        id: `${scope}.store`,
        defaultMessage: "Store"
    },
    technology: {
        id: `${scope}.technology`,
        defaultMessage: "Technology"
    },
    filter_tab: {
        id: `${scope}.filter_tab`,
        defaultMessage: "Filter Tab"
    },
    filters: {
        id: `${scope}.filters`,
        defaultMessage: "Filters"
    },
    apply: {
        id: `${scope}.apply`,
        defaultMessage: "Apply"
    },
    reset: {
        id: `${scope}.reset`,
        defaultMessage: "Reset"
    },
    none_selected: {
        id: `${scope}.none_selected`,
        defaultMessage: "None selected"
    },
    select_all: {
        id: `${scope}.select_all`,
        defaultMessage: "Select All"
    },
    loading: {
        id: `${scope}.loading`,
        defaultMessage: "Loading"
    },
    no_option: {
        id: `${scope}.no_option`,
        defaultMessage: "No Options"
    },
    pin_the_component: {
        id: `${scope}.pin_the_component`,
        defaultMessage: "Pin the Component"
    }, no_data_combination: {
        id: `${scope}.no_data_combination`,
        defaultMessage: "No data is available for the selected combination"
    },
    click_to_download: {
        id: `${scope}.click_to_download`,
        defaultMessage: "Click to download"
    },
    performanceSummary: {
        id: `${scope}.performanceSummary`,
        defaultMessage: "Performance Summary"
    }, brandView: {
        id: `${scope}.brandView`,
        defaultMessage: "Brand View"
    },  distributorView: {
        id: `${scope}.distributorView`,
        defaultMessage: "Distributor View"
    }, storeView: {
        id: `${scope}.storeView`,
        defaultMessage: "Store View"
    }, admin: {
        id: `${scope}.admin`,
        defaultMessage: "Admin"
    },dataGlossary: {
        id: `${scope}.dataGlossary`,
        defaultMessage: "Data Glossary"
    }, period: {
        id: `${scope}.period`,
        defaultMessage: "Period"
    }, visualToolTipText:{
        id: `${scope}.visualToolTipText`,
        defaultMessage: "Click on Menu icon to download the visual in different formats"
    },  pinSuccess:{
        id: `${scope}.pinSuccess`,
        defaultMessage: "Pin Success"
    },
    performance_summary_cards: {
        id: `${scope}.performance_summary_cards`,
        defaultMessage: "Performance Summary - KPI Cards"
    }, performance_summary_guided_insights: {
        id: `${scope}.performance_summary_guided_insights`,
        defaultMessage: "Performance Summary - Guided Insights and Trend Analysis"
    },insightsAnalysis: {
        id: `${scope}.insightsAnalysis`,
        defaultMessage: "Insights and Analysis"
    },
    performance_summary_brand_insights: {
        id: `${scope}.performance_summary_brand_insights`,
        defaultMessage: "Performance Summary - Brand Insights"
    }, performance_summary_distributors_performance: {
        id: `${scope}.performance_summary_distributors_performance`,
        defaultMessage: "Performance Summary - Distributors Performance"
    },brand_view_trend_chart: {
        id: `${scope}.brand_view_trend_chart`,
        defaultMessage: "Brand View - Brands Trend"
    },brand_view_heat_map: {
        id: `${scope}.brand_view_heat_map`,
        defaultMessage: "Brand View - Brands Performance across Distributors"
    },brand_deep_dive_cards: {
        id: `${scope}.brand_deep_dive_cards`,
        defaultMessage: "Brand Deep Dive - KPI Cards"
    },product_sku_trend_chart: {
        id: `${scope}.product_sku_trend_chart`,
        defaultMessage: "Brand Deep Dive - Products Trend"
    },brand_deep_dive_sales_breakdown: {
        id: `${scope}.brand_deep_dive_sales_breakdown`,
        defaultMessage: "Brand Deep Dive - Products Performance across Distributors"
    },brand_deep_dive_co_related_products: {
        id: `${scope}.brand_deep_dive_co_related_products`,
        defaultMessage: "Brand Deep Dive - What sells with this product"
    },distributor_view_trend_chart: {
        id: `${scope}.distributor_view_trend_chart`,
        defaultMessage: "Distributor View - Distributors Trend"
    },distributor_view_distributor_table: {
        id: `${scope}.distributor_view_distributor_table`,
        defaultMessage: "Distributor View - Distributors Overview Table"
    },distributor_deep_dive_view_cards: {
        id: `${scope}.distributor_deep_dive_view_cards`,
        defaultMessage: "Distributor Deep Dive - KPI Cards"
    },distributor_deep_dive_view_visits_vs_sales_card: {
        id: `${scope}.distributor_deep_dive_view_visits_vs_sales_card`,
        defaultMessage: "Distributor Deep Dive - Visit vs. Sales"
    },distributor_deep_dive_sales_performance_view: {
        id: `${scope}.distributor_deep_dive_sales_performance_view`,
        defaultMessage: "Distributor Deep Dive - Distributors Sales Performance"
    },distributor_deep_dive_product_performance_view: {
        id: `${scope}.distributor_deep_dive_product_performance_view`,
        defaultMessage: "Distributor Deep Dive - Distributors Product Performance"
    },distributor_deep_dive_channel_performance_view: {
        id: `${scope}.distributor_deep_dive_channel_performance_view`,
        defaultMessage: "Distributor Deep Dive - Channel Performance"
    },distributor_deep_dive_view_store_performance_table: {
        id: `${scope}.distributor_deep_dive_view_store_performance_table`,
        defaultMessage: "Distributor Deep Dive - Store Purchase Analysis"
    },cy: {
        id: `${scope}.cy`,
        defaultMessage: "CY"
    },cp: {
        id: `${scope}.cp`,
        defaultMessage: "CP"
    },ly: {
        id: `${scope}.ly`,
        defaultMessage: "LY"
    },store_view_product_performance: {
        id: `${scope}.store_view_product_performance`,
        defaultMessage: "Store View - Product Performance across Stores"
    },store_view_geo_map: {
        id: `${scope}.store_view_geo_map`,
        defaultMessage: "Store View - Store Performance Geo Map"
    },store_view_trend_table: {
        id: `${scope}.store_view_trend_table`,
        defaultMessage: "Store View - Trend across Stores"
    },product: {
        id: `${scope}.product`,
        defaultMessage: "Product"
    },value: {
        id: `${scope}.value`,
        defaultMessage: "Value"
    },store_deep_dive_sales_performance_view: {
        id: `${scope}.store_deep_dive_sales_performance_view`,
        defaultMessage: "Store Deep Dive - Stores Sales Performance"
    },store_deep_dive_purchase_analysis_view: {
        id: `${scope}.store_deep_dive_purchase_analysis_view`,
        defaultMessage: "Store Deep Dive - Stores Purchase Analysis"
    },store_deep_dive_brand_analysis_view: {
        id: `${scope}.store_deep_dive_brand_analysis_view`,
        defaultMessage: "Store Deep Dive - Brand Analysis"
    },
    store_deep_dive_product_analysis_view: {
        id: `${scope}.store_deep_dive_product_analysis_view`,
        defaultMessage: "Store Deep Dive - Product Analysis"
    },store_deep_dive_product_distribution_view: {
        id: `${scope}.store_deep_dive_product_distribution_view`,
        defaultMessage: "Store Deep Dive - Product Distribution"
    },pinViewName: {
        id: `${scope}.pinViewName`,
        defaultMessage: "Pin View Name"
    }, pinDisclaimer:{
        id: `${scope}.pinDisclaimer`,
        defaultMessage: "The name must be of minimum 6 characters in length"
    },cancel:{
        id: `${scope}.cancel`,
        defaultMessage: "Cancel"
    },submit:{
        id: `${scope}.submit`,
        defaultMessage: "Submit"
    },maintenanceAlert:{
        id: `${scope}.maintenanceAlert`,
        defaultMessage: "Maintenance Alert"
    },underMaintenance:{
        id: `${scope}.underMaintenance`,
        defaultMessage: "The site is under maintenance"
    },maintenanceReason:{
        id: `${scope}.maintenanceReason`,
        defaultMessage: "Following reasons might be the cause"
    },maintenanceR1:{
        id: `${scope}.maintenanceR1`,
        defaultMessage: "Middleware deployment is in progress"
    },maintenanceR2:{
        id: `${scope}.maintenanceR2`,
        defaultMessage: "Data refresh is in progress"
    },maintenanceRefresh:{
        id: `${scope}.maintenanceRefresh`,
        defaultMessage: "Please try refreshing the page after a while"
    },bookMarkSuccess:{
        id: `${scope}.bookMarkSuccess`,
        defaultMessage: "Successfully Bookmarked this page"
    },bookMarkPage:{
        id: `${scope}.bookMarkPage`,
        defaultMessage: "Bookmark this page"
    },bookMarkName:{
        id: `${scope}.bookMarkName`,
        defaultMessage: "Bookmark Name"
    },bookMarkNameExist:{
        id: `${scope}.bookMarkNameExist`,
        defaultMessage: "Bookmark Name already exists!"
    },bookMarkNot:{
        id: `${scope}.bookMarkNot`,
        defaultMessage: "Could not Bookmark this page"
    },pinNot:{
        id: `${scope}.pinNot`,
        defaultMessage: "Could not pin the View"
    },unPinSuccess:{
        id: `${scope}.unPinSuccess`,
        defaultMessage: "Successfully Unpinned the View"
    },unPinNot:{
        id: `${scope}.unPinNot`,
        defaultMessage: "Could not Unpin the View"
    },removedSuccess:{
        id: `${scope}.removedSuccess`,
        defaultMessage: "Removed Successfully"
    },removedNot:{
        id: `${scope}.removedNot`,
        defaultMessage: "Could not be removed"
    },noViewPinned:{
        id: `${scope}.noViewPinned`,
        defaultMessage: "No views are pinned"
    },showing:{
        id: `${scope}.showing`,
        defaultMessage: "Showing"
    },to:{
        id: `${scope}.to`,
        defaultMessage: "to"
    },of:{
        id: `${scope}.of`,
        defaultMessage: "of"
    },results:{
        id: `${scope}.results`,
        defaultMessage: "Results"
    },first:{
        id: `${scope}.first`,
        defaultMessage: "First"
    },back:{
        id: `${scope}.back`,
        defaultMessage: "Back"
    },next:{
        id: `${scope}.next`,
        defaultMessage: "Next"
    },last:{
        id: `${scope}.last`,
        defaultMessage: "Last"
    },firstPage:{
        id: `${scope}.firstPage`,
        defaultMessage: "First Page"
    },prePage:{
        id: `${scope}.prePage`,
        defaultMessage: "Pre Page"
    },nextPage:{
        id: `${scope}.nextPage`,
        defaultMessage: "Next Page"
    },lastPage:{
        id: `${scope}.lastPage`,
        defaultMessage: "Last Page"
    },settings:{
        id: `${scope}.settings`,
        defaultMessage: "Settings"
    },


});
