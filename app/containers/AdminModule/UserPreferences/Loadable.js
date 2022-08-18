/**
 *
 * Asynchronously loads the component for UserPreferences
 *
 */

import loadable from "../../../utils/loadable";

export default loadable(() => import("./index"));
