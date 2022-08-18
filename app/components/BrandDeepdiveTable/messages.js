/*
 * BrandDeepdiveTable Messages
 *
 * This contains all the text for the BrandDeepdiveTable component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.BrandDeepdiveTable";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "What sells with this Product"
  }, deselect: {
    id: `${scope}.deselect`,
    defaultMessage: "Deselect"
  }, product: {
    id: `${scope}.product`,
    defaultMessage: "Product"
  }, commonInvoice: {
    id: `${scope}.commonInvoice`,
    defaultMessage: "Common Invoice %"
  },noProductSelected: {
    id: `${scope}.noProductSelected`,
    defaultMessage: "No Product/SKU is selected"
  },
});
