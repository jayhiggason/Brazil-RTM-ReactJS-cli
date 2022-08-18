/*
 * NoAccess Messages
 *
 * This contains all the text for the NoAccess component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.NoAccess";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the NoAccess component!"
  },  accessDenied: {
    id: `${scope}.accessDenied`,
    defaultMessage: "Access Denied!"
  },
});
