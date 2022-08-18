/**
 *
 * Asynchronously loads the component for NoAccess
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
