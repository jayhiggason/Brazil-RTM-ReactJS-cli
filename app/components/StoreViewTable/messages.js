/*
 * StoreViewTable Messages
 *
 * This contains all the text for the StoreViewTable component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.StoreViewTable";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage:"Trend across Stores'"
  },headerTooltipText: {
    id: `${scope}.headerTooltipText`,
    defaultMessage:"Click on the Store name to navigate to the respective Store deep dive"
  },sales: {
    id: `${scope}.sales`,
    defaultMessage:"Sales"
  },periodicTrend: {
    id: `${scope}.periodicTrend`,
    defaultMessage:"Periodic Trend"
  },periodicSalesTrend: {
    id: `${scope}.periodicSalesTrend`,
    defaultMessage:"Periodic Sales Trend"
  },
});
