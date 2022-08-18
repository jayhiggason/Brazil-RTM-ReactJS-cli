/*
 *
 * DataGlossary actions
 *
 */

import {
    DATA_GLOSSARY_CRUD_OPERATION,
    DATA_GLOSSARY_CRUD_OPERATION_COMPLETED,
    DATA_GLOSSARY_DATA_FETCH,
    DATA_GLOSSARY_DATA_FETCH_FAIL,
    DATA_GLOSSARY_DATA_FETCH_SUCCESS,
    DEFAULT_ACTION
} from "./constants";

export function defaultAction() {
    return {
        type: DEFAULT_ACTION
    };
}

export function dataGlossaryDataFetch() {
    return {
        type: DATA_GLOSSARY_DATA_FETCH
    };
}

export function dataGlossaryDataFetchSuccess(data) {
    return {
        type: DATA_GLOSSARY_DATA_FETCH_SUCCESS,
        data
    }
}

export function dataGlossaryDataFetchFail() {
    return {
        type: DATA_GLOSSARY_DATA_FETCH_FAIL
    }
}

export function dataGlossaryCrudOperation(data) {
    return {
        type: DATA_GLOSSARY_CRUD_OPERATION,
        data
    }
}

export function dataGlossaryCrudOperationCompleted() {
    return {
        type: DATA_GLOSSARY_CRUD_OPERATION_COMPLETED
    }
}
