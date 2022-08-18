/*
 * BrandDeepDivePage Messages
 *
 * This contains all the text for the BrandDeepDivePage container.
 */

import {defineMessages} from "react-intl";

export const scope = "app.containers.BrandDeepDivePage";

export default defineMessages({
    header: {
        id: `${scope}.header`,
        defaultMessage: "Brand Deep Dive"
    },headerTooltipText: {
        id: `${scope}.headerTooltipText`,
        defaultMessage: "Brand deep dive gives detailed information of a specific brand and the products under them"
    }, productTrend_title: {
        id: `${scope}.productTrend_title`,
        defaultMessage: "Products' Trend"
    },productPerformance_title: {
        id: `${scope}.productPerformance_title`,
        defaultMessage: "Products' Performance across Distributors"
    },  brandCardsHeaderInfoTooltipText: {
        id: `${scope}.brandCardsHeaderInfoTooltipText`,
        defaultMessage: "Click on See Trends to see the graphical comparison of the Metrics"
    }, vsBrandAverage: {
        id: `${scope}.vsBrandAverage`,
        defaultMessage: "vs. Brand Average"
    }, vsTarget: {
        id: `${scope}.vsTarget`,
        defaultMessage: "vs. Target"
    }, vsHistoricalPerformance: {
        id: `${scope}.vsHistoricalPerformance`,
        defaultMessage: "vs. Historical Performance"
    },product: {
        id: `${scope}.product`,
        defaultMessage: "Product"
    },productTooltipText: {
        id: `${scope}.productTooltipText`,
        defaultMessage: "Click on Menu icon to download the visual in different formats"
    },productPerformanceTooltipText: {
        id: `${scope}.productPerformanceTooltipText`,
        defaultMessage: "Click on the box to see the product selling with the selected item in the adjacent table and Click on Menu icon to download the visual in different formats"
    },actual: {
        id: `${scope}.actual`,
        defaultMessage: "Actual"
    },growth: {
        id: `${scope}.growth`,
        defaultMessage: "Growth"
    },selloutTarget: {
        id: `${scope}.selloutTarget`,
        defaultMessage: "Sellout vs. Target"
    },partitionBy: {
        id: `${scope}.partitionBy`,
        defaultMessage: "Partition by:"
    },overall: {
        id: `${scope}.overall`,
        defaultMessage: "Overall"
    },
});
