/**
 *
 * Asynchronously loads the component for DistributorView
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
