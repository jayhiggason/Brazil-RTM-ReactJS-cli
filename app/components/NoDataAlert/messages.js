/*
 * NoDataAlert Messages
 *
 * This contains all the text for the NoDataAlert component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.NoDataAlert";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the NoDataAlert component!"
  }, noDataAlert: {
    id: `${scope}.noDataAlert`,
    defaultMessage: "Failed Fetch Data. Please Refresh or Contact Admin"
  },
});
