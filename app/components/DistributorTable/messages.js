/*
 * DistributorTable Messages
 *
 * This contains all the text for the DistributorTable component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.DistributorTable";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "Distributors' Overview Table"
  },
  tooltip_info_text: {
    id: `${scope}.tooltip_info_text`,
    defaultMessage: "Click on the Distributor name to navigate to the respective Distributor deep dive"
  },
  search_placeholder: {
    id: `${scope}.search_placeholder`,
    defaultMessage: "Search Distributor"
  },
  col_header_stock: {
    id: `${scope}.col_header_stock`,
    defaultMessage: "Stock"
  }
});
