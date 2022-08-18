/*
 * StoreDeepDivePage Messages
 *
 * This contains all the text for the StoreDeepDivePage container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.StoreDeepDivePage";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "Store Deep Dive"
  },storeDeepDiveToolText: {
    id: `${scope}.storeDeepDiveToolText`,
    defaultMessage: "Store Deep dive provides detailed information of the specific store using different analysis"
  },storeSalesPerformanceTitle: {
    id: `${scope}.storeSalesPerformanceTitle`,
    defaultMessage: "Stores' Sales Performance"
  },storePurchaseAnalysisTitle: {
    id: `${scope}.storePurchaseAnalysisTitle`,
    defaultMessage: "Stores' Purchase Analysis"
  },storePurchaseAnalysisToolTipText: {
    id: `${scope}.storePurchaseAnalysisToolTipText`,
    defaultMessage: "Hover on the Best Product Mix to see the Common Invoice, Total Sales"
  },storeBrandAnalysisTitle: {
    id: `${scope}.storeBrandAnalysisTitle`,
    defaultMessage: "Stores' Brand Analysis"
  }, cumulativePercent: {
    id: `${scope}.cumulativePercent`,
    defaultMessage: "Cumulative %"
  },storeProductDistributionTitle: {
    id: `${scope}.storeProductDistributionTitle`,
    defaultMessage: "Stores' Product Distribution"
  },products: {
    id: `${scope}.products`,
    defaultMessage: "Products"
  },
});
