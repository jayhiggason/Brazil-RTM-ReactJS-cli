/**
 *
 * Asynchronously loads the component for Training
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
