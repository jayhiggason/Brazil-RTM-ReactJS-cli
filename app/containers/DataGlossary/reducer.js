/*
 *
 * DataGlossary reducer
 *
 */
import produce from "immer";
import {
    DATA_GLOSSARY_CRUD_OPERATION,
    DATA_GLOSSARY_CRUD_OPERATION_COMPLETED,
    DATA_GLOSSARY_DATA_FETCH,
    DATA_GLOSSARY_DATA_FETCH_FAIL,
    DATA_GLOSSARY_DATA_FETCH_SUCCESS,
    DEFAULT_ACTION
} from "./constants";

export const initialState = {
    dataGlossaryDetailedData: [],
    dataGlossaryData: [],
    dataGlossaryFetchSpinnerState: false,
    dataGlossaryFetchFailed: false,
    glossaryTobeModified: {},
    dataGlossaryCrudOperationSpinnerState: false,
};

/* eslint-disable default-case, no-param-reassign */
const dataGlossaryReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case DEFAULT_ACTION:
                break;
            case DATA_GLOSSARY_DATA_FETCH:
                draft.dataGlossaryFetchSpinnerState = true;
                draft.dataGlossaryFetchFailed = false;
                break;
            case DATA_GLOSSARY_DATA_FETCH_SUCCESS:
                draft.dataGlossaryDetailedData = action.data["data_glossary_table_data"];
                draft.dataGlossaryData = action.data["glossary"];
                draft.dataGlossaryFetchSpinnerState = false;
                draft.dataGlossaryFetchFailed = false;
                break;
            case DATA_GLOSSARY_DATA_FETCH_FAIL:
                draft.dataGlossaryFetchSpinnerState = false;
                draft.dataGlossaryFetchFailed = true;
                break;
            case DATA_GLOSSARY_CRUD_OPERATION:
                draft.glossaryTobeModified = action.data;
                draft.dataGlossaryCrudOperationSpinnerState = true;
                break;
            case DATA_GLOSSARY_CRUD_OPERATION_COMPLETED:
                draft.glossaryTobeModified = {};
                draft.dataGlossaryCrudOperationSpinnerState = false;
                break;
        }
    });

export default dataGlossaryReducer;
