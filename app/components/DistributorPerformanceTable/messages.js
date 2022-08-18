/*
 * DistributorPerformanceTable Messages
 *
 * This contains all the text for the DistributorPerformanceTable component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.DistributorPerformanceTable";

export default defineMessages({
  dist_performance_header: {
    id: `${scope}.dist_performance_header`,
    defaultMessage: "Distributors Performance"
  },
  dist_performance_tooltip_info_text: {
    id: `${scope}.dist_performance_tooltip_info_text`,
    defaultMessage: "Click on the Distributor name to navigate to the respective Distributor deep dive"
  },
  dist_performance_pos: {
    id: `${scope}.dist_performance_pos`,
    defaultMessage: "Point of Sales"
  },
  dist_performance_tdp: {
    id: `${scope}.dist_performance_tdp`,
    defaultMessage: "Total Distribution Points"
  }
});
