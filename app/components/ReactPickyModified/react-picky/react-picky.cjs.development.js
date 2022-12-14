'use strict';

var React = require('react');

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _extends() {
    _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
}

function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }

    return target;
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
}

var debounce = function debounce(fn, delay) {
    var timeoutID = null;
    return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if (timeoutID) {
            clearTimeout(timeoutID);
        } //@ts-ignore


        var that = this;
        timeoutID = setTimeout(function () {
            fn.apply(that, args);
        }, delay);
    };
};

/**
 * Check if a string contains a value
 */
function includes(str, term, caseSensitive) {
    if (caseSensitive === void 0) {
        caseSensitive = false;
    }
    if (!caseSensitive) {
        var convertedTerm ;
        if (term.includes(",")) {
            convertedTerm = term.split(",").filter(i => i).map(i => i.toLowerCase().trim());
        } else {
            convertedTerm = term.split(" ").filter(i => i).map(i => i.toLowerCase().trim());
        }

        if (convertedTerm.length === 1) {
            return (
                String(str)
                    .toLowerCase()
                    .indexOf(String(convertedTerm[0]).toLowerCase()) > -1
            );
        } else {
            return convertedTerm.includes(String(str)
                .toLowerCase());
        }
    } else {
        return String(str).indexOf(String(term)) > -1;
    }
}

var isDataObject = function isDataObject(obj, valueKey, labelKey) {
    if (typeof labelKey === 'undefined' || typeof valueKey === 'undefined') {
        return false;
    }

    return typeof obj === 'object' && obj.hasOwnProperty(valueKey) && obj.hasOwnProperty(labelKey);
};
var hasItem = function hasItem(all, item, valueKey, labelKey, returnIndex) {
    if (returnIndex === void 0) {
        returnIndex = false;
    }

    if (!all || !item) return false;

    if (Array.isArray(all)) {
        if (isDataObject(item, valueKey, labelKey)) {
            var find = all.findIndex(function (opt) {
                return opt[valueKey] === item[valueKey];
            });

            if (returnIndex) {
                return find;
            }

            return find > -1;
        } else {
            var indexOfItem = all.indexOf(item);

            if (returnIndex) {
                return indexOfItem;
            }

            return indexOfItem > -1;
        }
    } else {
        if (isDataObject(item, valueKey, labelKey)) {
            return all[valueKey] === item[valueKey];
        }

        return all === item;
    }
};
var hasItemIndex = function hasItemIndex(all, item, valueKey, labelKey) {
    return hasItem(all, item, valueKey, labelKey, true);
};
var keyExtractor = function keyExtractor(item, valueKey, labelKey) {
    return isDataObject(item, valueKey, labelKey) ? item[valueKey] : item;
};

function sortCollection(array, valueKey) {
    if (valueKey) {
        return array.sort(function (a, b) {
            return a[valueKey] < b[valueKey] ? -1 : 1;
        });
    } else {
        return array.sort(function (a, b) {
            return a < b ? -1 : 1;
        });
    }
}

function arraysEqual(left, right) {
    if (left.length !== right.length) return false;
    var leftLen = left.length;
    var i = leftLen;

    while (i) {
        if (left[i] !== right[i]) return false;
        i--;
    }

    return true;
}

var asArray = function asArray(obj) {
    return obj || [];
};

function split(str) {
    var a = 1;
    var res = '';
    var parts = (str || '').split('%');
    var len = parts.length;

    if (len > 0) {
        res += parts[0];
    }

    for (var i = 1; i < len; i++) {
        if (parts[i][0] === 's' || parts[i][0] === 'd') {
            var value = arguments[a++];
            res += parts[i][0] === 'd' ? Math.floor(value) : value;
        } else if (parts[i][0]) {
            res += '%' + parts[i][0];
        } else {
            i++;
            res += '%' + parts[i][0];
        }

        res += parts[i].substring(1);
    }

    return res;
}

var regex = /%[sdj]/;

function format(message) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    if (regex.test(message)) {
        return split.apply(null, arguments);
    }

    return Array.from(args).join(' ');
}

var isEmptyValue = function isEmptyValue(value) {
    return value === null || value === undefined || Array.isArray(value) && !value.length;
};

var Placeholder =
    /*#__PURE__*/
    React.memo(function (_ref) {
        var placeholder = _ref.placeholder,
            value = _ref.value,
            numberDisplayed = _ref.numberDisplayed,
            multiple = _ref.multiple,
            valueKey = _ref.valueKey,
            labelKey = _ref.labelKey,
            manySelectedPlaceholder = _ref.manySelectedPlaceholder,
            allSelectedPlaceholder = _ref.allSelectedPlaceholder,
            allSelected = _ref.allSelected;
        var message = '';

        if (isEmptyValue(value)) {
            message = placeholder || '';
        } else {
            if (Array.isArray(value) && multiple) {
                // If type is array and values length less than number displayed
                // join the values
                if (value.length <= numberDisplayed) {
                    message = value.map(function (opt) {
                        if (isDataObject(opt, valueKey, labelKey)) {
                            return opt[labelKey];
                        }

                        return opt;
                    }).join(', ');
                } else {
                    // if many selected and not all selected then use the placeholder
                    if (manySelectedPlaceholder && allSelected !== 'all') {
                        // if it doesn't include the sprintf token then just use the placeholder
                        message = includes(manySelectedPlaceholder, '%s') ? format(manySelectedPlaceholder, value.length) : manySelectedPlaceholder; //If all selected and there is an allselectedplaceholder use that
                    } else if (allSelected && allSelectedPlaceholder) {
                        // if it doesn't include the sprintf token then just use the placeholder
                        message = includes(allSelectedPlaceholder, '%s') ? format(allSelectedPlaceholder, value.length) : allSelectedPlaceholder;
                    }
                }
            } else {
                var tempValue = Array.isArray(value) ? value[0] : value;

                if (isDataObject(tempValue, valueKey, labelKey)) {
                    message = tempValue[labelKey];
                } else {
                    message = String(tempValue);
                }
            }
        }

        return React.createElement("span", {
            className: isEmptyValue(value) ? 'picky__placeholder' : undefined,
            "data-testid": "picky_placeholder"
        }, message);
    }, areEqual);
Placeholder.defaultProps = {
    placeholder: 'None selected',
    allSelectedPlaceholder: '%s selected',
    manySelectedPlaceholder: '%s selected'
};
Placeholder.displayName = 'Picky(Placeholder)';

function areEqual(prevProps, nextProps) {
    return prevProps.multiple === nextProps.multiple && prevProps.value === nextProps.value && prevProps.numberDisplayed === nextProps.numberDisplayed && prevProps.allSelected === nextProps.allSelected && prevProps.allSelectedPlaceholder === nextProps.allSelectedPlaceholder;
}

var Filter =
    /*#__PURE__*/
    React.forwardRef(function (_ref, ref) {
        var placeholder = _ref.placeholder,
            tabIndex = _ref.tabIndex,
            onFilterChange = _ref.onFilterChange;
        return React.createElement("div", {
            className: "picky__filter"
        }, React.createElement("input", {
            ref: ref,
            type: "text",
            className: "picky__filter__input",
            "data-testid": "picky__filter__input",
            placeholder: placeholder,
            tabIndex: tabIndex,
            "aria-label": "filter options",
            onChange: function onChange(e) {
                return onFilterChange(e.target.value);
            }
        }));
    });
Filter.defaultProps = {
    placeholder: 'Filter...'
};
Filter.displayName = 'Picky(Filter)';

var Option =
    /*#__PURE__*/
    React.memo(function (_ref) {
        var id = _ref.id,
            item = _ref.item,
            isSelected = _ref.isSelected,
            labelKey = _ref.labelKey,
            valueKey = _ref.valueKey,
            selectValue = _ref.selectValue,
            style = _ref.style,
            multiple = _ref.multiple,
            tabIndex = _ref.tabIndex,
            disabled = _ref.disabled;
        var cssClass = isSelected ? 'option selected' : 'option';
        var body = isDataObject(item, labelKey, valueKey) ? item[labelKey] : item;
        var inputType = multiple ? 'checkbox' : 'radio';

        var select = function select() {
            return !disabled && selectValue(item);
        };

        return React.createElement("div", {
            tabIndex: tabIndex,
            id: id,
            role: "option",
            style: style,
            "data-testid": "option",
            "data-selected": isSelected ? 'selected' : '',
            "aria-selected": isSelected,
            className: cssClass,
            onClick: select,
            onKeyPress: function onKeyPress(e) {
                e.preventDefault();

                if (!disabled) {
                    selectValue(item);
                }
            }
        }, React.createElement("input", {
            type: inputType,
            readOnly: true,
            tabIndex: -1,
            disabled: disabled,
            checked: isSelected,
            "aria-label": body,
            "data-testid": 'option-checkbox'
        }), body);
    }, areEqual$1);
Option.displayName = 'Picky(Option)';

function areEqual$1(prevProps, nextProps) {
    return prevProps.multiple === nextProps.multiple && prevProps.isSelected === nextProps.isSelected && prevProps.id === nextProps.id && prevProps.item === nextProps.item && prevProps.tabIndex === nextProps.tabIndex && prevProps.disabled === nextProps.disabled;
}

var SelectAll =
    /*#__PURE__*/
    React.memo(function (_ref) {
        var tabIndex = _ref.tabIndex,
            disabled = _ref.disabled,
            allSelected = _ref.allSelected,
            id = _ref.id,
            selectAllText = _ref.selectAllText,
            toggleSelectAll = _ref.toggleSelectAll,
            visible = _ref.visible;
        var checkboxRef = React.createRef();

        if (!visible) {
            return null;
        }

        React.useEffect(function () {
            if (checkboxRef.current === null) return;
            checkboxRef.current.indeterminate = allSelected === 'partial';
        }, [allSelected]);
        return React.createElement("div", {
            tabIndex: tabIndex,
            role: "option",
            "data-testid": "selectall",
            id: id + '-option-' + 'selectall',
            "data-selectall": "true",
            "aria-selected": allSelected === 'all',
            className: allSelected === 'all' ? 'option selected' : 'option',
            onClick: toggleSelectAll,
            onKeyPress: toggleSelectAll
        }, React.createElement("input", {
            type: "checkbox",
            ref: checkboxRef,
            readOnly: true,
            "data-testid": "selectall-checkbox",
            tabIndex: -1,
            checked: allSelected === 'all',
            "aria-label": "select all",
            disabled: disabled
        }), React.createElement("span", {
            "data-testid": "select-all-text"
        }, selectAllText));
    }, areEqual$2);
SelectAll.displayName = 'Picky(SelectAll)';

function areEqual$2(prevProps, nextProps) {
    return prevProps.tabIndex === nextProps.tabIndex && prevProps.disabled === nextProps.disabled && prevProps.allSelected === nextProps.allSelected && prevProps.selectAllText === nextProps.selectAllText && prevProps.visible === nextProps.visible;
}

var Button = function Button(_ref) {
    var id = _ref.id,
        disabled = _ref.disabled,
        onClick = _ref.onClick,
        children = _ref.children,
        className = _ref.className,
        rest = _objectWithoutPropertiesLoose(_ref, ["id", "disabled", "onClick", "children", "className"]);

    var buttonId = id + "__button";
    var classes = ['picky__input', disabled ? 'picky__input--disabled' : '', className].join(' ');
    return React.createElement("button", Object.assign({
        id: buttonId,
        type: "button",
        className: classes,
        onClick: onClick,
        "data-testid": "picky-input",
        disabled: disabled
    }, rest), children);
};

Button.displayName = 'Picky(Button)';

var Picky =
    /*#__PURE__*/
    function (_React$PureComponent) {
        _inheritsLoose(Picky, _React$PureComponent);

        function Picky(props) {
            var _this;

            _this = _React$PureComponent.call(this, props) || this;
            _this.node = null;
            _this.filter = null;
            _this.state = {
                selectedValue: props.value || (props.multiple ? [] : null),
                open: props.open,
                filtered: false,
                filteredOptions: [],
                allSelected: 'none'
            };
            _this.toggleDropDown = _this.toggleDropDown.bind(_assertThisInitialized(_this));
            _this.toggleSelectAll = _this.toggleSelectAll.bind(_assertThisInitialized(_this));
            _this.onFilterChange = _this.onFilterChange.bind(_assertThisInitialized(_this));
            _this.selectValue = _this.selectValue.bind(_assertThisInitialized(_this));
            _this.allSelected = _this.allSelected.bind(_assertThisInitialized(_this));
            _this.handleOutsideClick = _this.handleOutsideClick.bind(_assertThisInitialized(_this));
            _this.isItemSelected = _this.isItemSelected.bind(_assertThisInitialized(_this));
            _this.focusFilterInput = _this.focusFilterInput.bind(_assertThisInitialized(_this));
            _this.getValue = _this.getValue.bind(_assertThisInitialized(_this));
            return _this;
        }

        var _proto = Picky.prototype;

        _proto.componentDidMount = function componentDidMount() {
            this.setState({
                allSelected: this.allSelected()
            });
            this.focusFilterInput(!!this.state.open);
        };

        _proto.componentWillUnmount = function componentWillUnmount() {
            document.removeEventListener('click', this.handleOutsideClick, false);
        };

        _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
            var _this2 = this;

            if (this.props.options !== prevProps.options || this.props.value !== prevProps.value) {
                if (!this.props.multiple) return;
                var valuesEqual = Array.isArray(prevProps.value) ? arraysEqual(prevProps.value, this.props.value) : prevProps.value === this.props.value;
                var optsEqual = arraysEqual(prevProps.options, this.props.options);
                var currentOptions = this.state.filtered ? this.state.filteredOptions : this.props.options;
                var currentValues = this.state.filtered ? this.state.filteredOptions.filter(function (value) {
                    if (Array.isArray(_this2.props.value)) {
                        return _this2.props.value.includes(value);
                    }

                    return true;
                }) : this.props.value;
                this.setState({
                    allSelected: !(valuesEqual && optsEqual) ? this.allSelected(currentValues, currentOptions) : this.allSelected()
                });
            }
        };

        _proto.selectValue = function selectValue(val) {
            var _this3 = this;

            var valueLookup = this.props.value;

            if (this.props.multiple && Array.isArray(valueLookup)) {
                var itemIndex = hasItemIndex(valueLookup, val, this.props.valueKey, this.props.labelKey);
                var selectedValue = [];

                if (itemIndex > -1) {
                    selectedValue = [].concat(valueLookup.slice(0, itemIndex), valueLookup.slice(itemIndex + 1));
                } else {
                    selectedValue = [].concat(this.props.value, [val]);
                }

                this.setState({
                    allSelected: this.allSelected(selectedValue)
                }, function () {
                    _this3.props.onChange(selectedValue);
                });
            } else {
                this.props.onChange(val);
            }
        }
        /**
         * Get the value of a given option or value safely
         *
         * @param {*} option
         * @returns
         * @memberof Picky
         */
        ;

        _proto.getValue = function getValue(option) {
            return typeof this.props.valueKey !== 'undefined' ? option[this.props.valueKey] : option;
        }
        /**
         * Determine whether all items are selected
         *
         * @returns {Boolean}
         * @memberof Picky
         */
        ;

        _proto.allSelected = function allSelected(overrideSelected, overrideOptions) {
            var _this$props = this.props,
                value = _this$props.value,
                options = _this$props.options;
            var selectedValue = overrideSelected || value;
            var selectedOptions = overrideOptions || options; // If there are no options we are getting a false positive for all items being selected

            if (selectedOptions && selectedOptions.length === 0) {
                return 'none';
            }

            var copiedOptions = selectedOptions.map(this.getValue);
            var copiedValues = Array.isArray(selectedValue) ? selectedValue.map(this.getValue) : [];
            var areEqual = arraysEqual(sortCollection(copiedValues), sortCollection(copiedOptions));

            if (areEqual) {
                return 'all';
            } else if (copiedValues.length > 0) {
                return 'partial';
            } else {
                return 'none';
            }
        }
        /**
         * Toggles select all
         *
         * @memberof Picky
         */
        ;

        _proto.toggleSelectAll = function toggleSelectAll() {
            var _this4 = this;

            if (this.props.disabled) return;
            this.setState(function (state) {
                return _extends({}, state, {
                    allSelected: _this4.state.allSelected === 'all' ? 'none' : 'all'
                });
            }, function () {
                if (_this4.state.allSelected !== 'all') {
                    if (_this4.state.filtered) {
                        var diff = asArray(_this4.props.value).filter(function (item) {
                            return !_this4.state.filteredOptions.includes(item);
                        });

                        _this4.props.onChange(diff);
                    } else {
                        _this4.props.onChange([]);
                    }
                } else {
                    if (_this4.state.filtered) {
                        var newValues = [].concat(_this4.props.value, _this4.state.filteredOptions);

                        _this4.props.onChange(newValues);
                    } else {
                        _this4.props.onChange(_this4.props.options);
                    }
                }
            });
        };

        _proto.isItemSelected = function isItemSelected(item) {
            return hasItem(this.props.value, item, this.props.valueKey, this.props.labelKey);
        };

        _proto.renderOptions = function renderOptions() {
            var _this5 = this;

            var items = this.state.filtered ? this.state.filteredOptions : this.props.options;
            var _this$props2 = this.props,
                labelKey = _this$props2.labelKey,
                valueKey = _this$props2.valueKey,
                multiple = _this$props2.multiple,
                render = _this$props2.render,
                tabIndex = _this$props2.tabIndex,
                renderList = _this$props2.renderList,
                disabled = _this$props2.disabled;

            if (renderList) {
                return renderList({
                    items: items,
                    selected: this.props.value,
                    multiple: multiple,
                    tabIndex: tabIndex,
                    getIsSelected: this.isItemSelected,
                    selectValue: this.selectValue,
                    disabled: disabled
                });
            }

            return items.map(function (item, index) {
                // Create a key based on the options value
                var key = keyExtractor(item, valueKey, labelKey);

                var isSelected = _this5.isItemSelected(item); // If render prop supplied for items call that.


                if (typeof render === 'function') {
                    return render({
                        index: index,
                        item: item,
                        isSelected: isSelected,
                        selectValue: _this5.selectValue,
                        labelKey: labelKey,
                        valueKey: valueKey,
                        multiple: multiple,
                        disabled: disabled
                    });
                } else {
                    // Render a simple option
                    return React.createElement(Option, {
                        key: key,
                        item: item,
                        isSelected: isSelected,
                        selectValue: _this5.selectValue,
                        labelKey: labelKey,
                        valueKey: valueKey,
                        multiple: Boolean(multiple),
                        tabIndex: tabIndex,
                        disabled: Boolean(disabled),
                        id: _this5.props.id + '-option-' + index
                    });
                }
            });
        }
        /**
         * Called when Filter term changes. Sets filteredOptions and filtered state.
         *
         * @param {any} term
         * @returns
         * @memberof Picky
         */
        ;

        _proto.onFilterChange = function onFilterChange(term) {
            var _this6 = this;

            var processedTerm = typeof this.props.filterTermProcessor === 'function' ? this.props.filterTermProcessor(term) : term;
            /**
             * getFilterValue function will provide the input value of filter to the picky dropdown, so that if we have a larger list of options then we can only supply the matching options based on this value
             */

            if (this.props.getFilterValue) {
                this.props.getFilterValue(processedTerm);
            }

            if (!processedTerm.trim()) {
                return this.setState({
                    filtered: false,
                    filteredOptions: [],
                    allSelected: asArray(this.props.value).length > 0 ? 'partial' : 'none'
                });
            }

            var isObject = isDataObject(this.props.options && this.props.options[0], this.props.valueKey, this.props.labelKey);
            var filteredOptions = this.props.options.filter(function (option) {
                if (isObject) {
                    return includes(option[_this6.props.labelKey], processedTerm, !!_this6.props.caseSensitiveFilter);
                }

                return includes(option, processedTerm, _this6.props.caseSensitiveFilter);
            });
            this.setState({
                filtered: true,
                filteredOptions: filteredOptions
            }, function () {
                if (_this6.props.onFiltered) {
                    _this6.props.onFiltered(filteredOptions);
                }
            });
        }
        /**
         *
         * Called by a click event listener. Used to determine any clicks that occur outside of the component.
         * @param {MouseEvent} e
         * @returns
         * @memberof Picky
         */
        ;

        _proto.handleOutsideClick = function handleOutsideClick(e) {
            // If keep open then don't toggle dropdown
            // If radio and not keepOpen then auto close it on selecting a value
            // If radio and click to the filter input then don't toggle dropdown
            var keepOpen = this.props.keepOpen || this.props.multiple;

            if (this.node && this.node.contains(e.target) && keepOpen) {
                return;
            }

            if (this.filter && this.filter.contains(e.target)) {
                return;
            }

            this.toggleDropDown();
        };

        _proto.focusFilterInput = function focusFilterInput(isOpen) {
            if (!this.filter) return;

            if (isOpen && this.props.defaultFocusFilter) {
                this.filter.focus();
            }

            if (!isOpen && this.props.clearFilterOnClose === true) {
                this.filter.value = '';
            }
        }
        /**
         * Toggle state of dropdown
         *
         * @memberof Picky
         */
        ;

        _proto.toggleDropDown = function toggleDropDown() {
            var _this7 = this;

            if (!this.state.open) {
                // Add event listener to listen for clicks to determine if click occured outside the component or not
                document.addEventListener('click', this.handleOutsideClick, false);
            } else {
                // Remove
                document.removeEventListener('click', this.handleOutsideClick, false);
            }

            this.setState(function (state) {
                return _extends({}, state, {
                    // Toggle open state
                    open: !state.open,
                    filtered: _this7.props.clearFilterOnClose ? false : state.filtered,
                    filteredOptions: _this7.props.clearFilterOnClose ? [] : state.filteredOptions
                });
            }, function () {
                var isOpen = !!_this7.state.open; // Prop callbacks

                _this7.focusFilterInput(isOpen);

                if (isOpen && _this7.props.onOpen) {
                    _this7.props.onOpen();
                } else if (!isOpen && _this7.props.onClose) {
                    _this7.props.onClose();
                }
            });
        };

        _proto.render = function render() {
            var _this8 = this;

            var _this$props3 = this.props,
                className = _this$props3.className,
                placeholder = _this$props3.placeholder,
                value = _this$props3.value,
                multiple = _this$props3.multiple,
                numberDisplayed = _this$props3.numberDisplayed,
                includeFilter = _this$props3.includeFilter,
                valueKey = _this$props3.valueKey,
                labelKey = _this$props3.labelKey,
                tabIndex = _this$props3.tabIndex,
                dropdownHeight = _this$props3.dropdownHeight,
                renderSelectAll = _this$props3.renderSelectAll,
                filterPlaceholder = _this$props3.filterPlaceholder,
                disabled = _this$props3.disabled,
                buttonProps = _this$props3.buttonProps;
            var open = this.state.open;
            var ariaOwns = '';

            if (open) {
                ariaOwns += this.props.id + '-list';
            }

            var buttonId = this.props.id + "__button";
            var dropdownStyle = {
                maxHeight: dropdownHeight,
                overflowY: 'scroll'
            };
            return React.createElement("div", {
                ref: function ref(node) {
                    _this8.node = node;
                },
                className: ['picky', className].join(' '),
                id: this.props.id,
                role: "combobox",
                "aria-controls": buttonId,
                "aria-expanded": open,
                "aria-haspopup": open,
                "aria-owns": ariaOwns,
                tabIndex: tabIndex
            }, React.createElement(Button, Object.assign({
                id: this.props.id + "__button",
                disabled: disabled,
                onClick: this.toggleDropDown
            }, buttonProps), React.createElement(Placeholder, {
                allSelected: this.state.allSelected,
                placeholder: placeholder,
                manySelectedPlaceholder: this.props.manySelectedPlaceholder,
                allSelectedPlaceholder: this.props.allSelectedPlaceholder,
                value: value,
                multiple: Boolean(multiple),
                numberDisplayed: numberDisplayed,
                valueKey: valueKey,
                labelKey: labelKey,
                "data-testid": "placeholder-component"
            })), React.createElement("div", {
                className: "picky__dropdown",
                id: this.props.id + '-list',
                "aria-hidden": !open,
                hidden: !open,
                style: open ? dropdownStyle : {
                    visibility: 'hidden'
                }
            }, includeFilter && React.createElement(Filter, {
                tabIndex: tabIndex,
                ref: function ref(filter) {
                    return _this8.filter = filter;
                },
                placeholder: filterPlaceholder,
                onFilterChange: this.filterDebounce
            }), renderSelectAll ? renderSelectAll({
                filtered: Boolean(this.state.filtered),
                allSelected: this.state.allSelected,
                toggleSelectAll: this.toggleSelectAll,
                tabIndex: tabIndex,
                multiple: Boolean(multiple),
                disabled: Boolean(disabled)
            }) : React.createElement(SelectAll, {
                visible: this.showSelectAll,
                tabIndex: tabIndex,
                disabled: !!disabled,
                allSelected: this.state.allSelected,
                id: this.props.id,
                selectAllText: this.props.selectAllText,
                toggleSelectAll: this.toggleSelectAll
            }), open && React.createElement("div", {
                "data-testid": "dropdown"
            }, this.renderOptions())));
        };

        _createClass(Picky, [{
            key: "filterDebounce",
            get: function get() {
                var filterDebounce = this.props.filterDebounce;
                var amount = filterDebounce || 0;
                return (amount || 0) > 0 ? debounce(this.onFilterChange, amount) : this.onFilterChange;
            }
        }, {
            key: "showSelectAll",
            get: function get() {
                var _this$props4 = this.props,
                    renderSelectAll = _this$props4.renderSelectAll,
                    multiple = _this$props4.multiple,
                    includeSelectAll = _this$props4.includeSelectAll;
                return Boolean(!renderSelectAll && includeSelectAll && multiple && (this.props.selectAllMode === 'default' && !this.state.filtered || this.props.selectAllMode === 'filtered'));
            }
        }]);

        return Picky;
    }(React.PureComponent);

Picky.defaultProps = {
    id: 'picky',
    numberDisplayed: 3,
    options: [],
    filterDebounce: 150,
    dropdownHeight: 300,
    onChange: function onChange() {
    },
    tabIndex: 0,
    keepOpen: true,
    selectAllText: 'Select all',
    selectAllMode: 'default',
    filterTermProcessor: function filterTermProcessor(term) {
        return term;
    }
};

exports.Picky = Picky;
//# sourceMappingURL=react-picky.cjs.development.js.map
