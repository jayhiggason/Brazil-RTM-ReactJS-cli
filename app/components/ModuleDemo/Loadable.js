/**
 *
 * Asynchronously loads the component for ModuleDemo
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
