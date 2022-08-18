/*
 * DistributorView Messages
 *
 * This contains all the text for the DistributorView container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.DistributorView";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "Distributor View"
  },
  header_tooltip_info_text: {
    id: `${scope}.header_tooltip_info_text`,
    defaultMessage: "Distributor view helps to get the overview of the Distributors along with their performance"
  },
  dist_trend_header: {
    id: `${scope}.dist_trend_header`,
    defaultMessage: "Distributors' Trend"
  },
  dist_trend_tooltip_info: {
    id: `${scope}.dist_trend_tooltip_info`,
    defaultMessage: "Click on the bar to navigate to the respective Distributor deep dive and Click on Menu icon to download the visual in different formats"
  },
});
