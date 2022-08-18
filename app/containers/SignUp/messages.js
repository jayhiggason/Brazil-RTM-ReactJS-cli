/*
 * SignUp Messages
 *
 * This contains all the text for the SignUp container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.SignUp";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the SignUp container!"
  },signUp: {
    id: `${scope}.signUp`,
    defaultMessage: "Sign Up"
  },firstName: {
    id: `${scope}.firstName`,
    defaultMessage: "First Name"
  },lastName: {
    id: `${scope}.lastName`,
    defaultMessage: "Last Name"
  },email: {
    id: `${scope}.email`,
    defaultMessage: "Email Address"
  },fetchFail: {
    id: `${scope}.fetchFail`,
    defaultMessage: "Failed to Fetch Data, Please refresh or Contact Admin"
  },requestRaised: {
    id: `${scope}.requestRaised`,
    defaultMessage: "Request raised, waiting for approval"
  },requestFailed: {
    id: `${scope}.requestFailed`,
    defaultMessage: "Request Failed"
  },orgNotCreated: {
    id: `${scope}.orgNotCreated`,
    defaultMessage: "Organization could not be created"
  },inserted: {
    id: `${scope}.inserted`,
    defaultMessage: "Inserted Successfully"
  },
});
