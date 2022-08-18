/**
 *
 * Asynchronously loads the component for InsightTab
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
