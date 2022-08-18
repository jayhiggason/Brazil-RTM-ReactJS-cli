/**
 *
 * Asynchronously loads the component for NotificationsDrawer
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
