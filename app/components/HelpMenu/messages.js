/*
 * HelpMenu Messages
 *
 * This contains all the text for the HelpMenu component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.HelpMenu";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the HelpMenu component!"
  },
  toolTip: {
    id: `${scope}.toolTip`,
    defaultMessage: "Help"
  },
  faq: {
    id: `${scope}.faq`,
    defaultMessage: "FAQ"
  },
  glossary: {
    id: `${scope}.glossary`,
    defaultMessage: "Glossary"
  }
});
