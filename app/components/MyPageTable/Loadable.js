/**
 *
 * Asynchronously loads the component for MyPageTable
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
