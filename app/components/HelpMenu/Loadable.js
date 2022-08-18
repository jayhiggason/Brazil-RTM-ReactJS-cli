/**
 *
 * Asynchronously loads the component for HelpMenu
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
