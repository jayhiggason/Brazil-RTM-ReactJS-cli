/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.LoginPage";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the LoginPage container!"
  }, continue: {
    id: `${scope}.continue`,
    defaultMessage: "Continue"
  }, tokenExpired: {
    id: `${scope}.tokenExpired`,
    defaultMessage: "Token Expired"
  }, authenticating: {
    id: `${scope}.authenticating`,
    defaultMessage: "Authenticating..."
  }, authenticationFailed: {
    id: `${scope}.authenticationFailed`,
    defaultMessage: "Authentication Failed"
  }, subscribe: {
    id: `${scope}.subscribe`,
    defaultMessage: "Subscribe"
  },requestPending: {
    id: `${scope}.requestPending`,
    defaultMessage: "Your request is still pending, please contact admin for approval"
  },clickSubscribe: {
    id: `${scope}.clickSubscribe`,
    defaultMessage: "You dont have access to the RTM Brazil, click on the 'Subscribe' to raise request"
  },wentWrong: {
    id: `${scope}.wentWrong`,
    defaultMessage: "Something went wrong"
  },
});
