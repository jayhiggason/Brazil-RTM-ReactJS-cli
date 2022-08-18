/*
 * PurchaseAnalysisCard Messages
 *
 * This contains all the text for the PurchaseAnalysisCard component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.PurchaseAnalysisCard";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the PurchaseAnalysisCard component!"
  }, lastYear: {
    id: `${scope}.lastYear`,
    defaultMessage: "Last Year"
  }, currentYear: {
    id: `${scope}.currentYear`,
    defaultMessage: "Current Year"
  },variance: {
    id: `${scope}.variance`,
    defaultMessage: "Variance"
  },clientRepresent: {
    id: `${scope}.clientRepresent`,
    defaultMessage: "% Clients represent in Distributor's SellOut"
  },purchaseFreq: {
    id: `${scope}.purchaseFreq`,
    defaultMessage: "Average Purchase Frequency/Period"
  },purchaseAmt: {
    id: `${scope}.purchaseAmt`,
    defaultMessage: "Average Purchase Amount/Period"
  },nextPurchase: {
    id: `${scope}.nextPurchase`,
    defaultMessage: "Next Expected Purchase"
  },bestMix: {
    id: `${scope}.bestMix`,
    defaultMessage: "Best Product Mix"
  },commonInvoice: {
    id: `${scope}.commonInvoice`,
    defaultMessage: "Common Invoice"
  },totSelloutInvoice: {
    id: `${scope}.totSelloutInvoice`,
    defaultMessage: "Total Sellout Invoice"
  },totSelloutGSV: {
    id: `${scope}.totSelloutGSV`,
    defaultMessage: "Total Sellout GSV"
  },totSelloutUnits: {
    id: `${scope}.totSelloutUnits`,
    defaultMessage: "Total Sellout Units"
  },totSelloutTonnes: {
    id: `${scope}.totSelloutTonnes`,
    defaultMessage: "Total Sellout Tonnes"
  },
});
