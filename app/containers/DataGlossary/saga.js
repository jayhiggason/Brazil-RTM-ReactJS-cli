import {call, put, select, takeLatest} from 'redux-saga/effects';
import {rtmUrl} from "../../config.json";
import {DATA_GLOSSARY_CRUD_OPERATION, DATA_GLOSSARY_DATA_FETCH} from "./constants";
import {getCookie, tokenExpired} from "../../utils/cookieUtilities";
import request from "../../utils/request";
import {
    dataGlossaryCrudOperation,
    dataGlossaryCrudOperationCompleted,
    dataGlossaryDataFetch,
    dataGlossaryDataFetchFail,
    dataGlossaryDataFetchSuccess
} from "./actions";
import {makeSelectGlossaryTobeModified} from "./selectors";
import {dataExceptionHandlingDialog, showAppAlert} from "../App/actions";
import {decodeResponse, encodeRequestBody} from "../../utils/jwtUtils";

let dataGlossaryDataFetchSApiCallCount = 0;

let dataGlossaryCrudOperationApiCallCount = 0;

// Individual exports for testing
export default function* dataGlossarySaga() {
    yield takeLatest(DATA_GLOSSARY_DATA_FETCH, dataGlossaryDataFetchSaga);
    yield takeLatest(DATA_GLOSSARY_CRUD_OPERATION, dataGlossaryCrudOperationSaga);
}


export function* dataGlossaryDataFetchSaga() {
    const apiUrl = rtmUrl + "/get_data_glossary_module/";
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
        yield put(dataGlossaryDataFetchSuccess(data));

    } catch (e) {
        if (e.response && e.response.status === 401) {
            tokenExpired();
        }
        if (e.response && (e.response.status === 502 || e.response.status === 503)) {
            yield put(dataExceptionHandlingDialog());
        }
        dataGlossaryDataFetchSApiCallCount++;

        if (dataGlossaryDataFetchSApiCallCount > 5) {
            dataGlossaryDataFetchSApiCallCount = 0;
            yield put(dataGlossaryDataFetchFail());

        } else {

            yield put(dataGlossaryDataFetch());

        }
    }
}

export function* dataGlossaryCrudOperationSaga() {
    const apiUrl = rtmUrl + "/get_data_glossary_module/";
    let User = JSON.parse(getCookie("UserCred"));
    const token = JSON.parse(getCookie("token"));
    const glossaryTobeModified = yield select(makeSelectGlossaryTobeModified());
    const body = encodeRequestBody({
        user: User['userID'],
        user_role: User['role'],
        ...glossaryTobeModified
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
        yield put(dataGlossaryCrudOperationCompleted());
        yield put(dataGlossaryDataFetch());
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
        dataGlossaryCrudOperationApiCallCount++;
        if (dataGlossaryCrudOperationApiCallCount > 5) {
            dataGlossaryCrudOperationApiCallCount = 0;
            yield put(dataGlossaryCrudOperationCompleted());
            yield put(showAppAlert({
                open: true,
                severity: "error",
                message: "something went wrong"
            }));
        } else {
            yield put(dataGlossaryCrudOperation(glossaryTobeModified));
        }
    }
}
