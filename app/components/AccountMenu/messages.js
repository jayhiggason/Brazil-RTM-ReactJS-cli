/*
 * AccountMenu Messages
 *
 * This contains all the text for the AccountMenu component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.AccountMenu";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the AccountMenu component!"
  }, logOut: {
    id: `${scope}.logOut`,
    defaultMessage: "Log Out"
  },  preferences: {
    id: `${scope}.preferences`,
    defaultMessage: "Preferences"
  },
});
