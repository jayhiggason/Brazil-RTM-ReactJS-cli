import {call, put, select, takeLatest} from 'redux-saga/effects';
import {rtmUrl} from "../../config.json";
import request from "../../utils/request";
import {getCookie, tokenExpired} from "../../utils/cookieUtilities";
import {
    faqFetchData,
    faqFetchDataFail,
    faqFetchDataSuccess,
    faqHandleOperations,
    faqHandleOperationsCompleted
} from "./actions";
import {makeSelectFaqModuleFaqToBeOperated} from "./selectors";
import {FAQ_FETCH_DATA, FAQ_HANDLE_OPERATIONS} from "./constants";
import {dataExceptionHandlingDialog, showAppAlert} from "../App/actions";
import {decodeResponse, encodeRequestBody} from "../../utils/jwtUtils";


let faqFetchDataSagaApiCallCount = 0;
let faqHandleOperationsSagaApiCallCount = 0;

// Individual exports for testing
export default function* faqModuleSaga() {
    yield takeLatest(FAQ_FETCH_DATA, faqFetchDataSaga);
    yield takeLatest(FAQ_HANDLE_OPERATIONS, faqHandleOperationsSaga);
}

export function* faqFetchDataSaga() {
    const apiUrl = rtmUrl + "/get_faq_module/";
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const body = encodeRequestBody({
        user: User['userID'],
        user_role: User['role'],
        status: "2"
    });
    try {
        let data = yield call(request, apiUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        data = decodeResponse(data);
        yield put(faqFetchDataSuccess(data["faq_table_data"]));

    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        faqFetchDataSagaApiCallCount++;
        if (faqFetchDataSagaApiCallCount > 5) {
            faqFetchDataSagaApiCallCount = 0;
            yield put(faqFetchDataFail())
        } else {
            yield put(faqFetchData());
        }
    }

}

export function* faqHandleOperationsSaga() {
    const apiUrl = rtmUrl + "/get_faq_module/";
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const faqParams = yield select(makeSelectFaqModuleFaqToBeOperated());
    const body = encodeRequestBody({
        user: User['userID'],
        user_role: User['role'],
        ...faqParams
    });
    try {
        let data = yield call(request, apiUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        data = decodeResponse(data);
        yield put(faqHandleOperationsCompleted());
        yield put(faqFetchData());

        yield put(showAppAlert({
            open: true,
            severity: "success",
            message: data['status']
        }));


    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        faqHandleOperationsSagaApiCallCount++;
        if (faqHandleOperationsSagaApiCallCount > 5) {
            faqHandleOperationsSagaApiCallCount = 0;
            yield put(faqHandleOperationsCompleted());
            yield put(showAppAlert({
                open: true,
                severity: "error",
                message: "something went wrong"
            }));
        } else {
            yield put(faqHandleOperations(faqParams));
        }
    }
}
