/*
 * TitleHeader Messages
 *
 * This contains all the text for the TitleHeader component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.TitleHeader";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the TitleHeader component!"
  },
  time_range: {
    id: `${scope}.time_range`,
    defaultMessage: "Time Range"
  },
  compare_with: {
    id: `${scope}.compare_with`,
    defaultMessage: "Compare with"
  },
  last_year: {
    id: `${scope}.last_year`,
    defaultMessage: "Last Year"
  },
  current_year: {
    id: `${scope}.current_year`,
    defaultMessage: "Current Year"
  },
  views_button_tooltip: {
    id: `${scope}.views_button_tooltip`,
    defaultMessage: "Pinned views"
  },
  views: {
    id: `${scope}.views`,
    defaultMessage: "Views"
  },
  bookmarks: {
    id: `${scope}.bookmarks`,
    defaultMessage: "Bookmarks"
  },
  bookmarks_button_tooltip: {
    id: `${scope}.bookmarks_button_tooltip`,
    defaultMessage: "Bookmark this page"
  },
  bookmarks_view_button_tooltip: {
    id: `${scope}.bookmarks_view_button_tooltip`,
    defaultMessage: "view Bookmarked pages"
  },
  export_button: {
    id: `${scope}.export_button`,
    defaultMessage: "Export"
  }, QTD: {
    id: `${scope}.QTD`,
    defaultMessage: "QTD"
  }, PTD: {
    id: `${scope}.PTD`,
    defaultMessage: "PTD"
  },YTD: {
    id: `${scope}.YTD`,
    defaultMessage: "YTD"
  },
});
