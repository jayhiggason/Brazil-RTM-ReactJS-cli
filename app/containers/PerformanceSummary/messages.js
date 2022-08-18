/*
 * PerformanceSummary Messages
 *
 * This contains all the text for the PerformanceSummary container.
 */

import {defineMessages} from "react-intl";

export const scope = "app.containers.PerformanceSummary";

export default defineMessages({
    header: {
        id: `${scope}.header`,
        defaultMessage: "Performance Summary"
    },
    headerTooltipText: {
        id: `${scope}.headerTooltipText`,
        defaultMessage: "Performance Summary gives the overview of different metrics performance, Guided Insights & Trend Analysis to identify the risks and opportunities"
    },
    cardsHeaderInfoTooltipText: {
        id: `${scope}.cardsHeaderInfoTooltipText`,
        defaultMessage: "Click on See Trends to see the graphical comparison of the Metrics"
    },
    brand_insights_header: {
        id: `${scope}.brand_insights_header`,
        defaultMessage: "Brand Insights"
    },
    brand_insights_tooltip_info_text: {
        id: `${scope}.brand_insights_tooltip_info_text`,
        defaultMessage: "Click on the bubble to navigate to the respective Brand deep dive and Click on Menu icon to download the visual in different formats"
    },performance_summary_cards: {
        id: `${scope}.performance_summary_cards`,
        defaultMessage: "Performance Summary KPI Cards"
    }
});
