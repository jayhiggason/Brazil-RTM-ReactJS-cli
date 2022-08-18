/*
 *
 * LoginPage reducer
 *
 */
import produce from "immer";
import {DEFAULT_ACTION, LOGIN_USER, LOGIN_USER_CLOSE_DIALOG, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS,} from "./constants";

import {setCookie} from '../../utils/cookieUtilities'

export const initialState = {
    userCred: {
        userID: "",
        password: "",
        role: ""
    },
    IsAuth: false,
    Loading: false,
    Failed: false,
    FailedMessage: '',
    TokenObj: {},
    status: 0
};


const loginPageReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case DEFAULT_ACTION:
                break;
            case LOGIN_USER:
                draft.userCred = action.UserCred;
                draft.Loading = true;
                break;
            case LOGIN_USER_SUCCESS:
                draft.TokenObj = action.data.token;
                draft.userCred = {
                    userID: action.data.userId,
                    role: action.data.role,
                    name: action.data.name,
                    id: action.data.id,
                    organisation: action.data.organisation
                };
                setCookie("UserCred", JSON.stringify(draft.userCred), 2);
                setCookie("token", JSON.stringify(draft.TokenObj), 2);
                // setCookie("views", JSON.stringify(action.data.views), 2);
                draft.Loading = false;
                break;
            case LOGIN_USER_FAIL:
                draft.Loading = false;
                draft.Failed = true;
                draft.FailedMessage = action.message;
                draft.status = action.status;
                break;
            case LOGIN_USER_CLOSE_DIALOG:
                draft.Failed = false;
                break;
        }
    });

export default loginPageReducer;
