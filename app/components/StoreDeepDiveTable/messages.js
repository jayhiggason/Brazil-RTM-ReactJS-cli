/*
 * StoreDeepDiveTable Messages
 *
 * This contains all the text for the StoreDeepDiveTable component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.StoreDeepDiveTable";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "Stores' Product Analysis"
  },product: {
    id: `${scope}.product`,
    defaultMessage:"Product"
  },growthPercent: {
    id: `${scope}.growthPercent`,
    defaultMessage: "Growth %"
  },brandAvg: {
    id: `${scope}.brandAvg`,
    defaultMessage: "Brand Average"
  },
});
