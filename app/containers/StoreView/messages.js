/*
 * StoreView Messages
 *
 * This contains all the text for the StoreView container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.StoreView";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "Store View"
  },headerTooltipText: {
    id: `${scope}.headerTooltipText`,
    defaultMessage: "Store view gives the overview of Stores, Product performance across the stores"
  },geoMapTitle: {
    id: `${scope}.geoMapTitle`,
    defaultMessage: "Top and Bottom Stores' Performance Geo Map"
  },geoMapToolTipText: {
    id: `${scope}.geoMapToolTipText`,
    defaultMessage: "Hover on the Store to see the store details,Click on the store to navigate to the respective deep dive pages"
  },productPerformanceStore: {
    id: `${scope}.productPerformanceStore`,
    defaultMessage: "Products' Performance across Stores"
  },productPerformanceStoreToolTipText: {
    id: `${scope}.productPerformanceStoreToolTipText`,
    defaultMessage: "Click on the box to navigate to the respective Store Deep dive and Click on Menu icon to download the visual in different formats"
  },
});
