/**
 *
 * ReactPickyModified
 *
 */

import React, {memo} from "react";
import {Picky} from './react-picky';
import './react-picky/picky.css'
import {FormattedMessage} from "react-intl";
import AppMessages from "../../containers/App/messages";
import FormLabel from "@material-ui/core/FormLabel";

/** ReactPickyModified function is used to render the Drop down in all the filters that is used across the tool */

function ReactPickyModified({
                                id,
                                options,
                                multiple,
                                includeFilter,
                                includeSelectAll,
                                value,
                                onChange,
                                allSelectedPlaceholder,
                                manySelectedPlaceholder,
                                numberDisplayed,
                                clearFilterOnClose,
                                selectAllMode,
                                ...props
                            }) {
    return (
        <Picky
            id={id}
            options={options}
            multiple={multiple}
            includeFilter={includeFilter}
            includeSelectAll={includeSelectAll}
            value={value}
            onChange={onChange}
            allSelectedPlaceholder={allSelectedPlaceholder}
            manySelectedPlaceholder={manySelectedPlaceholder}
            numberDisplayed={numberDisplayed}
            clearFilterOnClose={clearFilterOnClose}
            selectAllMode={selectAllMode}
            renderSelectAll={({
                                  filtered,
                                  tabIndex,
                                  allSelected,
                                  toggleSelectAll,
                                  multiple,
                              }) => {
                if (multiple && !filtered) {
                    return (
                        <div
                            tabIndex={tabIndex}
                            role="option"
                            className={allSelected ? 'option selected' : 'option'}
                            onClick={toggleSelectAll}
                            onKeyPress={toggleSelectAll}
                        >
                            <input type="checkbox" checked={allSelected === "all"} readOnly />
                            <span >
                                <FormattedMessage {...AppMessages[`select_all`]} />
                            </span>
                        </div>
                    );
                }
            }}
            {...props}
        />
    );
}

ReactPickyModified.propTypes = {};

export default memo(ReactPickyModified);
