/*
 *
 * SignUp actions
 *
 */

import {
  ADD_NEW_ORG,
  DEFAULT_ACTION, FETCH_APPROVER, FETCH_APPROVER_FAIL, FETCH_APPROVER_SUCCESS,
  FETCH_ORG_LIST, FETCH_ORG_LIST_FAIL,
  FETCH_ORG_LIST_SUCCESS,
  SHOW_SIGN_UP_ALERT,
  SUBMIT_USER_ACCESS_REQUEST
} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function submitUserAccessRequest(userInfo) {
return{
  type:SUBMIT_USER_ACCESS_REQUEST,
  userInfo
}
}

export function showSignUpAlert(alerts) {
  return{
    type:SHOW_SIGN_UP_ALERT,
    alerts
  }
}

export function fetchOrgList() {
  return{
    type:FETCH_ORG_LIST
  }
}

export function fetchOrgListSuccess(data) {
  return{
    type:FETCH_ORG_LIST_SUCCESS,
    data
  }
}

export function fetchOrgListFail() {
  return{
    type:FETCH_ORG_LIST_FAIL
  }
}

export function addNewOrg(data) {
  return{
    type:ADD_NEW_ORG,
    data
  }
}

export function fetchApprover(data) {
  return{
    type:FETCH_APPROVER,
    data
  }
}

export function fetchApproverSuccess(data) {
  return{
    type:FETCH_APPROVER_SUCCESS,
    data
  }
}

export function fetchApproverfail() {
  return{
    type:FETCH_APPROVER_FAIL,
  }
}