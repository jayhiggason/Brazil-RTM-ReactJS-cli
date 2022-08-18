/*
 * BrandView Messages
 *
 * This contains all the text for the BrandView container.
 */

import {defineMessages} from "react-intl";

export const scope = "app.containers.BrandView";

export default defineMessages({
    header: {
        id: `${scope}.header`,
        defaultMessage: "Brand View"
    },
    headerTooltipText: {
        id: `${scope}.headerTooltipText`,
        defaultMessage: "Brand view provides brand level trends across different metrics and its performance across Distributors"
    },
    brand_trend_title: {
        id: `${scope}.brand_trend_title`,
        defaultMessage: "Brands' Trend"
    },
    brand_trend_tooltip_text: {
        id: `${scope}.brand_trend_tooltip_text`,
        defaultMessage: "Click on the bar to navigate to the respective Brand deep dive and Click on Menu icon to download the visual in different formats"
    },
    brand_trend_vs_tech_avg: {
        id: `${scope}.brand_trend_vs_tech_avg`,
        defaultMessage: "vs. Technology Average"
    },
    brand_performance_title: {
        id: `${scope}.brand_performance_title`,
        defaultMessage: "Brands' Performance across Distributors"
    },
    brand_performance_tooltip_text: {
        id: `${scope}.brand_performance_tooltip_text`,
        defaultMessage: "Click on the box to navigate to the respective Brand deep dive and Click on Menu icon to download the visual in different formats"
    },
});
