/*
 *
 * MyPinnedViews actions
 *
 */

import {DEFAULT_ACTION, FETCH_PINNED_VIEWS, FETCH_PINNED_VIEWS_FAIL, FETCH_PINNED_VIEWS_SUCCESS} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function fetchPinnedViews() {
  return {
    type: FETCH_PINNED_VIEWS
  };
}

export function fetchPinnedViewsSuccess(data) {
  return {
    type: FETCH_PINNED_VIEWS_SUCCESS,
    data
  };
}

export function fetchPinnedViewsFail() {
  return {
    type: FETCH_PINNED_VIEWS_FAIL
  };
}
