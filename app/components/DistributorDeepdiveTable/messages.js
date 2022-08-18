/*
 * DistributorDeepdiveTable Messages
 *
 * This contains all the text for the DistributorDeepdiveTable component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.DistributorDeepdiveTable";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "Store Purchase Analysis"
  },storePurchaseAnalysisToolTipText: {
    id: `${scope}.storePurchaseAnalysisToolTipText`,
    defaultMessage: "Click on Menu icon to download the visual in different formats"
  },avgPurchaseFreq: {
    id: `${scope}.avgPurchaseFreq`,
    defaultMessage: "Average Purchase Frequency/ Period"
  },avgPurchaseAmt: {
    id: `${scope}.avgPurchaseAmt`,
    defaultMessage: "Average Purchase Amount/ Period"
  },nextPurchase: {
    id: `${scope}.nextPurchase`,
    defaultMessage: "Next Expected Purchase"
  },
});
