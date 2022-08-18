/**
 *
 * Asynchronously loads the component for Homepage
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
