/*
 * GeoMapSimple Messages
 *
 * This contains all the text for the GeoMapSimple component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.GeoMapSimple";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the GeoMapSimple component!"
  },toolTipDetails:{
    id: `${scope}.toolTipDetails`,
    defaultMessage: "Tooltip Details"
  },toolTipDisclaimer:{
    id: `${scope}.toolTipDisclaimer`,
    defaultMessage: "Click on Store or Distributor to navigate to the respective deep dive page"
  },
});
