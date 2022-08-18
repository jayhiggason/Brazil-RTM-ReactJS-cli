/**
 *
 * Asynchronously loads the component for MyPinnedViews
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
