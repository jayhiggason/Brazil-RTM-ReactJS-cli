/*
 * MyPageTable Messages
 *
 * This contains all the text for the MyPageTable component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.MyPageTable";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the MyPageTable component!"
  },view: {
    id: `${scope}.view`,
    defaultMessage: "View"
  },delete: {
    id: `${scope}.delete`,
    defaultMessage: "Delete"
  },user: {
    id: `${scope}.user`,
    defaultMessage: "User"
  },name: {
    id: `${scope}.name`,
    defaultMessage: "Name"
  },pageName: {
    id: `${scope}.pageName`,
    defaultMessage: "Page Name"
  },filters: {
    id: `${scope}.filters`,
    defaultMessage: "Filters"
  },date: {
    id: `${scope}.date`,
    defaultMessage: "Date"
  },actions: {
    id: `${scope}.actions`,
    defaultMessage: "Actions"
  },searchBar: {
    id: `${scope}.searchBar`,
    defaultMessage: "Type Pin name or Page name here"
  },noPin: {
    id: `${scope}.noPin`,
    defaultMessage: "No pages are pinned"
  },
});
