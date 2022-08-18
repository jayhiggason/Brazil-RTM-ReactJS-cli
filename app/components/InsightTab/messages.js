/*
 * InsightTab Messages
 *
 * This contains all the text for the InsightTab component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.InsightTab";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "Trend Analysis"
  },
  header_guided_insights: {
    id: `${scope}.header_guided_insights`,
    defaultMessage: "Guided insights"
  },
  insight_label_type: {
    id: `${scope}.insight_label_type`,
    defaultMessage: "Type"
  },
  insight_label_dimension: {
    id: `${scope}.insight_label_dimension`,
    defaultMessage: "Dimension"
  },
  insight_tech_growth: {
    id: `${scope}.insight_tech_growth`,
    defaultMessage: "Tech Growth"
  },
  insight_target_achieved: {
    id: `${scope}.insight_target_achieved`,
    defaultMessage: "Target achieved in latest period"
  },
  insight_target_not_achieved: {
    id: `${scope}.insight_target_not_achieved`,
    defaultMessage: "Target not achieved in last 3 periods"
  },
  insight_tooltip_info_text: {
    id: `${scope}.insight_tooltip_info_text`,
    defaultMessage: "Click on the highlighted name to navigate to the respective deep dive page"
  },
  insight_top_performing: {
    id: `${scope}.insight_top_performing`,
    defaultMessage: "Top Performing"
  },
  insight_bottom_performing: {
    id: `${scope}.insight_bottom_performing`,
    defaultMessage: "Bottom Performing"
  },
  insight_no_data_indicator_text: {
    id: `${scope}.insight_no_data_indicator_text`,
    defaultMessage: "No finding is available for the selected combination"
  }, yearPeriod: {
    id: `${scope}.yearPeriod`,
    defaultMessage: "Year Period"
  },
});
