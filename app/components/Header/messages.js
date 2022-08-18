/*
 * Header Messages
 *
 * This contains all the text for the Header component.
 */

import { defineMessages } from "react-intl";
import PerformanceSummary from "../../containers/PerformanceSummary/Loadable";

export const scope = "app.components.Header";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the Header component!"
  }, PerformanceSummary: {
    id: `${scope}.PerformanceSummary`,
    defaultMessage: "Performance Summary"
  },BrandView: {
    id: `${scope}.BrandView`,
    defaultMessage: "Brand View"
  },BrandDeepDive: {
    id: `${scope}.BrandDeepDive`,
    defaultMessage: "Brand Deep Dive"
  },DistributorView: {
    id: `${scope}.DistributorView`,
    defaultMessage: "Distributor View"
  },DistributorDeepDive: {
    id: `${scope}.DistributorDeepDive`,
    defaultMessage: "Distributor Deep Dive"
  },StoreView: {
    id: `${scope}.StoreView`,
    defaultMessage: "Store View"
  },StoreDeepDive: {
    id: `${scope}.StoreDeepDive`,
    defaultMessage: "Store Deep Dive"
  },MyPage: {
    id: `${scope}.MyPage`,
    defaultMessage: "My Page"
  },MyPinnedViews: {
    id: `${scope}.MyPinnedViews`,
    defaultMessage: "My Pinned Views"
  },FAQ: {
    id: `${scope}.FAQ`,
    defaultMessage: "FAQ"
  },extras: {
    id: `${scope}.extras`,
    defaultMessage: "Extras"
  },DataGlossary: {
    id: `${scope}.DataGlossary`,
    defaultMessage: "Data Glossary"
  },Training: {
    id: `${scope}.Training`,
    defaultMessage: "Training"
  },admin: {
    id: `${scope}.admin`,
    defaultMessage: "Admin"
  },UserManagement: {
    id: `${scope}.UserManagement`,
    defaultMessage: "User Management"
  },UserPreferences: {
    id: `${scope}.UserPreferences`,
    defaultMessage: "User Preferences"
  },notifications: {
    id: `${scope}.notifications`,
    defaultMessage: "Notifications"
  },inbox: {
    id: `${scope}.inbox`,
    defaultMessage: "Inbox"
  },alerts: {
    id: `${scope}.alerts`,
    defaultMessage: "Alerts"
  },POCView: {
    id: `${scope}.POCView`,
    defaultMessage: "POC View"
  },
 RTM: {
    id: `${scope}.RTM`,
    defaultMessage: "RTM"
  },settings: {
    id: `${scope}.settings`,
    defaultMessage: "Settings"
  },
});
