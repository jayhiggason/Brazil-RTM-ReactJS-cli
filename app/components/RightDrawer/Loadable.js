/**
 *
 * Asynchronously loads the component for RightDrawer
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
