/*
 * AdminPage Messages
 *
 * This contains all the text for the AdminPage container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.AdminPage";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the AdminPage container!"
  },accessRequest: {
    id: `${scope}.accessRequest`,
    defaultMessage: "Access Requests"
  },userManagement: {
    id: `${scope}.userManagement`,
    defaultMessage: "User Management"
  },deleteUser: {
    id: `${scope}.deleteUser`,
    defaultMessage: "Delete this user"
  },rejectRequest: {
    id: `${scope}.rejectRequest`,
    defaultMessage: "Reject this request"
  },delete: {
    id: `${scope}.delete`,
    defaultMessage: "Delete"
  },setRole: {
    id: `${scope}.setRole`,
    defaultMessage: "Set Role for"
  },role: {
    id: `${scope}.role`,
    defaultMessage: "Role"
  },
});
