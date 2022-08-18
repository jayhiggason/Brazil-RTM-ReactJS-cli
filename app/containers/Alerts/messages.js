/*
 * Alerts Messages
 *
 * This contains all the text for the Alerts container.
 */

import {defineMessages} from "react-intl";

export const scope = "app.containers.Alerts";

export default defineMessages({
    header: {
        id: `${scope}.header`,
        defaultMessage: "This is the Alerts container!"
    },
    alert1: {
        id: `${scope}.alert1`,
        defaultMessage: "1. Pedigree stock is at High Risk!"
    },
    alert2: {
        id: `${scope}.alert2`,
        defaultMessage: "2. M & M's are at OOS Risk!"
    },
    alert3: {
        id: `${scope}.alert3`,
        defaultMessage: "3. The products at high risk are above threshold value!"
    },
    alert4: {
        id: `${scope}.alert4`,
        defaultMessage: "4. The products at OOS risk are above threshold value!"
    },
    answer1: {
        id: `${scope}.answer1`,
        defaultMessage: "The alert generated above is...\n " +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,\n" +
            "              sit amet blandit leo lobortis eget."
    }
});
