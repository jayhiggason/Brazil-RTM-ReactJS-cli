/**
 *
 * Asynchronously loads the component for MyViews
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
