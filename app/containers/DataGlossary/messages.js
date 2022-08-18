/*
 * DataGlossary Messages
 *
 * This contains all the text for the DataGlossary container.
 */

import {defineMessages} from "react-intl";

export const scope = "app.containers.DataGlossary";

export default defineMessages({
    header: {
        id: `${scope}.header`,
        defaultMessage: "Coming Soon!"
    },
    searchGlossary: {
        id: `${scope}.searchGlossary`,
        defaultMessage: "Search here..."
    },  editGlossary: {
        id: `${scope}.editGlossary`,
        defaultMessage: "Edit Glossary"
    },  addNewGlossary: {
        id: `${scope}.addNewGlossary`,
        defaultMessage: "Add New Glossary"
    }, word: {
        id: `${scope}.word`,
        defaultMessage: "Word"
    }, definition: {
        id: `${scope}.definition`,
        defaultMessage: "Definition"
    }, cancel: {
        id: `${scope}.cancel`,
        defaultMessage: "Cancel"
    }, submit: {
        id: `${scope}.submit`,
        defaultMessage: "Submit"
    },delete: {
        id: `${scope}.delete`,
        defaultMessage: "Delete"
    },deleteThisGlossary: {
        id: `${scope}.deleteThisGlossary`,
        defaultMessage: "Delete this Glossary?"
    }
});
