/*
 * ChatBot Messages
 *
 * This contains all the text for the ChatBot component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.ChatBot";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the ChatBot component!"
  }
});
