/**
 *
 * Asynchronously loads the component for GeoMapSimple
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
