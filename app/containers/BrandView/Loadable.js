/**
 *
 * Asynchronously loads the component for BrandView
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
