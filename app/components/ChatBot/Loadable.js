/**
 *
 * Asynchronously loads the component for ChatBot
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
