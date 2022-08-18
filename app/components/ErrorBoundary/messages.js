/*
 * ErrorBoundary Messages
 *
 * This contains all the text for the ErrorBoundary component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.ErrorBoundary";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the ErrorBoundary component!"
  },reportCrash: {
    id: `${scope}.reportCrash`,
    defaultMessage: "Report this Crash"
  },reload: {
    id: `${scope}.reload`,
    defaultMessage: "Oops,Something went wrong! Please Reload and if this error persists, please contact admin"
  },
});
