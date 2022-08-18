/*
 * DistributorDeepDivePage Messages
 *
 * This contains all the text for the DistributorDeepDivePage container.
 */

import {defineMessages} from "react-intl";

export const scope = "app.containers.DistributorDeepDivePage";

export default defineMessages({
    header: {
        id: `${scope}.header`,
        defaultMessage: "Distributor Deep Dive"
    },distributorDeepDiveTooltipText: {
        id: `${scope}.distributorDeepDiveTooltipText`,
        defaultMessage: "Distributor Deep dive facilitate to analyse Distributors performance across Customer, Brand, Channel, Store"
    },visitVsSales: {
        id: `${scope}.visitVsSales`,
        defaultMessage: "Visit vs. Sales"
    },trendChartsTooltipText: {
        id: `${scope}.trendChartsTooltipText`,
        defaultMessage: "Click on Menu icon to download the visual in different formats"
    },distributorSalesPerformance: {
        id: `${scope}.distributorSalesPerformance`,
        defaultMessage: "Distributors' Sales Performance"
    },vsTarget: {
        id: `${scope}.vsTarget`,
        defaultMessage: "vs. Target"
    },vsHistoricalPerformance: {
        id: `${scope}.vsHistoricalPerformance`,
        defaultMessage: "vs. Historical Performance"
    },productPerformance: {
        id: `${scope}.productPerformance`,
        defaultMessage: "Products' Performance"
    },cumulativePercent: {
        id: `${scope}.cumulativePercent`,
        defaultMessage: "Cumulative %"
    },channelPerformance: {
        id: `${scope}.channelPerformance`,
        defaultMessage: "Channel Performance"
    },channelTooptipText: {
        id: `${scope}.channelTooptipText`,
        defaultMessage: "Click on the bar to see the Stores sales performance of the Channel and Click on Menu icon to download the visual in different formats"
    },storeSalesPerformance: {
        id: `${scope}.storeSalesPerformance`,
        defaultMessage: "Stores' Sales Performance"
    },storeSalesPerformanceTooltipText: {
        id: `${scope}.storeSalesPerformanceTooltipText`,
        defaultMessage: "Click on the bar to navigate to the respective Store deep dive and Click on Menu icon to download the visual in different formats"
    },
});
