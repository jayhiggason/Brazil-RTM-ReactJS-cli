import {
    mdiAccountGroup,
    mdiAccountMultiple,
    mdiBulletinBoard,
    mdiCart, mdiCartVariant,
    mdiHomeAnalytics,
    mdiPackageVariant, mdiPaw, mdiStorefront,
    mdiTableNetwork,
} from "@mdi/js";
import React from "react";
import {getCookie} from "./cookieUtilities";

import AppMessages from "../containers/App/messages";
import {FormattedMessage} from "react-intl";

export const collapsibleMenuData = () => {
    let userInfo = JSON.parse(getCookie("UserCred"));
    return [


        {
            panel: "RTM",
            Title: "RTM",
            panelIcon: mdiPaw,
            id: "SeleniumBrazilRTMPanel",

            apps: userInfo.organisation === "MARS" ? [
                {
                    App: <FormattedMessage {...AppMessages[`performanceSummary`]} />,
                    id: "SeleniumPromotionsCollapsibleMenu",
                    link: "/RTM/PerformanceSummary",
                    icon: mdiHomeAnalytics,
                },
                {
                    App:  <FormattedMessage {...AppMessages[`brandView`]} />,
                    id: "SeleniumProductMasterSearchCollapsibleMenu",
                    link: "/RTM/BrandView",
                    icon: mdiCart,
                },
                {
                    App: <FormattedMessage {...AppMessages[`distributorView`]} />,
                    id: "SeleniumCustomerCollapsibleMenu",
                    link: "/RTM/DistributorView",
                    icon: mdiAccountGroup,
                },
                {
                    App:  <FormattedMessage {...AppMessages[`storeView`]} />,
                    id: "SeleniumAddRiskAppCollapsibleMenu",
                    link: "/RTM/StoreView",
                    icon: mdiStorefront,
                }
            ]:
                [
                    {
                        App: "POC View ",
                        id: "SeleniumPromotionsCollapsibleMenu",
                        link: "/RTM/POCView",
                        icon: mdiHomeAnalytics,
                    },
                ] ,      },

    ];
}

