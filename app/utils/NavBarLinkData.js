import React from "react";
import {getCookie} from "./cookieUtilities";
import AppMessages from "../containers/App/messages";
import {FormattedMessage} from "react-intl";

export const navBarLinkData = (module) => {


    switch (module) {
        case "settings":
            return [
                {label: <FormattedMessage {...AppMessages[`admin`]} />, link: "/settings/admin", id: "seleniumSettingsAdmin"},
            ];
        case "RTM":
           let userInfo = JSON.parse(getCookie("UserCred"));
           if(userInfo['organisation'] === "MARS") {


               return [
                   {label: <FormattedMessage {...AppMessages[`performanceSummary`]} />, link: "/RTM/PerformanceSummary", id: "seleniumPerformanceSummary"},
                   {
                       label: <FormattedMessage {...AppMessages[`brandView`]} />,
                       link: "/RTM/BrandView",
                       id: "seleniumBrandView",
                   },

                   {
                       label:<FormattedMessage {...AppMessages[`distributorView`]} />,
                       link: "/RTM/DistributorView",
                       id: "seleniumDistributorView",
                   },
                   {
                       label: <FormattedMessage {...AppMessages[`storeView`]} />,
                       link: "/RTM/StoreView",
                       id: "seleniumStoreView",
                   },
                   // {
                   //     label: "My Page",
                   //     link: "/RTM/MyPage",
                   //     id: "seleniumMyPage",
                   // },

               ];
           }
           else{
               return [
                   {
                       label: "POC View",
                       link: "/RTM/POCView",
                       id: "seleniumPOCView",
                   },

               ]
           }
        case "extras":
            return [
                {label: "FAQ", link: "/RTM/extras/FAQ", id: "seleniumExtrasFAQ"},
                {
                    label: <FormattedMessage {...AppMessages[`dataGlossary`]} />,
                    link: "/RTM/extras/DataGlossary",
                    id: "seleniumExtrasDataGlossary",
                },
                // {
                //     label: "Training",
                //     link: "/RTM/extras/Training",
                //     id: "seleniumExtrasTraining",
                // },

            ];


    }
};
