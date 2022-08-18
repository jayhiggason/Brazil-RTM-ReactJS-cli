/**
 *
 * Asynchronously loads the component for DataGlossary
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
