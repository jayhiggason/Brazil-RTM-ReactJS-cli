/*
 * Table Messages
 *
 * This contains all the text for the Table component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.Table";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the Table component!"
  },approve: {
    id: `${scope}.approve`,
    defaultMessage: "Approve"
  },reject: {
    id: `${scope}.reject`,
    defaultMessage: "Reject"
  },edit: {
    id: `${scope}.edit`,
    defaultMessage: "Edit"
  },delete: {
    id: `${scope}.delete`,
    defaultMessage: "Delete"
  },userName: {
    id: `${scope}.userName`,
    defaultMessage: "User"
  },email: {
    id: `${scope}.email`,
    defaultMessage: "E-mail"
  },organization: {
    id: `${scope}.organization`,
    defaultMessage: "Organization"
  },role: {
    id: `${scope}.role`,
    defaultMessage: "Role"
  },status: {
    id: `${scope}.status`,
    defaultMessage: "Status"
  },statusActive: {
    id: `${scope}.statusActive`,
    defaultMessage: "Active"
  },statusPending: {
    id: `${scope}.statusPending`,
    defaultMessage: "Pending"
  },actionButtons: {
    id: `${scope}.actionButtons`,
    defaultMessage: "Action"
  },allCaughtUp: {
    id: `${scope}.allCaughtUp`,
    defaultMessage: "All caught up"
  },noData: {
    id: `${scope}.noData`,
    defaultMessage: "No data available"
  },searchUser: {
    id: `${scope}.searchUser`,
    defaultMessage: "Search User"
  },
});
