/**
 *
 * Asynchronously loads the component for StoreView
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
