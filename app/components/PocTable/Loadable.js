/**
 *
 * Asynchronously loads the component for PocTable
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
