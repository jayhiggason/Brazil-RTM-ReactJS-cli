/**
 *
 * SideFilter
 *
 */

import React, {memo} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core/styles";
import './style.css';
import {SyncLoader} from "react-spinners";
import 'react-picky/dist/picky.css';
import Divider from "@material-ui/core/Divider";
import ReactPickyModified from "../ReactPickyModified/Loadable";
import NoDataAlert from "../NoDataAlert";
import AsyncSelect from "react-select/async";
import {components} from "react-select";
import {rtmUrl} from "../../config.json";
import request from "../../utils/request";
import {getCookie} from "../../utils/cookieUtilities";
import OverLaySpinner from "../OverLaySpinner";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {decodeResponse, encodeRequestBody} from "../../utils/jwtUtils";
import {FormattedMessage} from "react-intl";
import AppMessages from "../../containers/App/messages";
import messages from "./messages";
import {injectIntl} from "react-intl";
/** Styles class*/
const useStyles = makeStyles(({
    filterPanelHeading: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: "1vw",
        textAlign: "center",
        color: "#0000a0e6",
        margin: "1vw 1vw 0.5vw 1vw",
    },
    filterHeading: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: "0.8vw",
        color: "#0000a0e6",
        margin: "1vw 1vw 0.5vw 0vw",
    },
    heading: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: "1.1vw",
        color: "#444",
    },
    select: {
        fontFamily: 'MarsCentra-Book',
    },
    button: {
        background: "#fff",
        color: '#0000a0e6',
        fontFamily: 'MarsCentra-Bold',
        padding: "0.3vw",
        fontSize: "0.8vw",
        minWidth: "2vw",
        maxWidth: "3.6vw",
        maxHeight: "1.7vw",
        outline: "none",
        textTransform: "none"
    },
    hide: {
        display: "none",
    },
    subHeading: {
        fontSize: "1vw",
        fontFamily: 'MarsCentra-Bold',
    },
    PanelSwitch: {
        fontSize: '0.8vw',
        fontFamily: "MarsCentra-Book",
        padding: '0px',
        color: '#000',
    },
    gridStyle: {
        padding: "0.2vw 0.2vw",
        marginBottom: "0.1vw"
    },
    largeFormControl: {
        minWidth: "12vw",
        maxWidth: "13vw"
    },
    storeFormControl: {
        minWidth: "12vw",
        maxWidth: "12vw"
    },
    storeDropDown: {
        fontFamily: 'MarsCentra-Book',
        fontSize: "0.8vw",
    },
    formLabel: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: "0.8vw",
        margin: '0.8vw 0px',
        color: '#0000a0e6',
        letterSpacing: 0,
        borderBottom: 0,
        textAlign: 'center'
    },
    storePlaceHolder: {
        fontFamily: 'MarsCentra-Book',
        fontSize: "0.7vw",
        letterSpacing: 0,
        borderBottom: 0,
        textAlign: 'center'
    },
    textFieldInput: {
        fontSize: '0.8vw',
        fontFamily: 'MarsCentra-Book',
        color: "#000"
    },
    smallFormControl: {
        minWidth: "6.2vw",
        maxWidth: "6.2vw"
    },
    divider: {
        marginLeft: '0.7vw',
        marginRight: '0.7vw',
    }
}));

/** SideFilter function is used to render the Filter panel that is used across the tool */


function SideFilter({filterData, selectedFilter, fetchData, onFilterChange, spinnerState, dataFetchFailed, filterDataFetch, reset,intl}) {
    const classes = useStyles();

    const applyFilters = () => {
        fetchData();
    };

    const resetFilters = () => {
        reset();
        // onFilterChange({
        //     "recent_selected": "",
        //     "recent_selected_dropdown_values": [],
        //     "chain": [],
        //     "manager": [],
        //     "coordinator": [],
        //     "timeRange": "YTD",
        //     "compare": "Last Year",
        //     "brand": [],
        //     "category": [],
        //     "distributor": [],
        //     "technology": [],
        //     "channel": [],
        //     "region": [],
        //     "store": [],
        //     "customer": [],
        //     "gp": [],
        //     "salesRep": []
        // });
        // fetchData();
        // filterDataFetch();
        // filterDataFetch(
        //     {
        //         "recent_selected": "",
        //         "recent_selected_dropdown_values": [],
        //         "chain": [],
        //         "manager": [],
        //         "coordinator": [],
        //         "timeRange": "YTD",
        //         "compare": "Last Year",
        //         "brand": [],
        //         "category": [],
        //         "distributor": [],
        //         "technology": [],
        //         "channel": [],
        //         "region": [],
        //         "store": [],
        //         "customer": [],
        //         "gp": [],
        //         "salesRep": []
        //     }
        // );
    };

    const handleMultiSelectChange = (key, value) => {
        onFilterChange({
            ...selectedFilter,
            [key]: value,
            'recent_selected': (key === 'gp') ? key.toUpperCase() : key[0].toUpperCase() + key.substring(1),
            'recent_selected_dropdown_values': filterData[key]
        });
        // filterDataFetch();
        filterDataFetch(
            {
                ...selectedFilter,
                [key]: value,
                'recent_selected': (key === 'gp') ? key.toUpperCase() : key[0].toUpperCase() + key.substring(1),
                'recent_selected_dropdown_values': filterData[key]
            }
        );
    };

    const promiseOptions = (inputValue) => {

        if (inputValue.length >= 3) {
            return new Promise((resolve, reject) => {
                const apiUrl = rtmUrl + "/store_dropdown/";
                let User = JSON.parse(getCookie("UserCred"));
                const token = JSON.parse(getCookie("token"));
                const body = encodeRequestBody(
                    {
                        ...selectedFilter,
                        user: User['userID'],
                        user_role: User['role'],
                        inputFormat: inputValue
                    });
                const options = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(body)
                };

                request(apiUrl, options).then((data) => {
                    let result = decodeResponse(data);
                    resolve(result)
                }).catch(e => {
                    reject();
                });


            });
        }

    };


    const [inputValue, setInputValue] = React.useState('');

    const handleInputChange = async (inputValue, {action}) => {
        if (action !== "set-value") {
            setInputValue(inputValue);
        }
    };

    const handleChange = (values) => {
        if (values) {
            onFilterChange({
                ...selectedFilter,
                'store': values,
                'recent_selected': 'Store',
                'recent_selected_dropdown_values': []
            });
            filterDataFetch(
                {
                    ...selectedFilter,
                    'store': values,
                    'recent_selected': 'Store',
                    'recent_selected_dropdown_values': []
                }
            );

        } else {
            onFilterChange({
                ...selectedFilter,
                'store': [],
                'recent_selected': 'Store',
                'recent_selected_dropdown_values': []
            });
            filterDataFetch(
                {
                    ...selectedFilter,
                    'store': [],
                    'recent_selected': 'Store',
                    'recent_selected_dropdown_values': []
                }
            );

        }
        // filterDataFetch();
    };

    const DropdownIndicator = props => {
        return (
            <components.DropdownIndicator {...props}>
                <ArrowDropDownIcon style={{color: "#000", fontSize: "18"}}/>
            </components.DropdownIndicator>
        );
    };

    const LoadIndicator = props => {
        return (
            <components.LoadingMessage {...props}>
                <FormattedMessage {...AppMessages[`loading`]} />
            </components.LoadingMessage>
        );
    };

    const NoOptionsIndicator = props => {
        return (
            <components.NoOptionsMessage {...props}>
                <FormattedMessage {...AppMessages[`no_option`]} />
            </components.NoOptionsMessage>
        );
    };

    return (
        <Paper elevation={1} style={{width: "100%", padding: 0, minHeight: "100vh", backgroundColor: "#eceeed"}}>
            {
                (() => {
                    if (!dataFetchFailed) {
                        if (!(spinnerState && filterData['region'].length === 0)) {
                            return (
                                <OverLaySpinner
                                    active={spinnerState && filterData['region'].length !== 0}>
                                    <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} justify="center"
                                              alignItems="center">
                                            <Typography className={classes.filterPanelHeading}>
                                                {intl.formatMessage({...AppMessages[`filter_tab`]})}
                                            </Typography>
                                            <Divider variant='middle' className={classes.divider}/>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} justify="flex-start"
                                              alignItems="left">
                                            <Typography
                                                className={classes.filterHeading}>
                                                {intl.formatMessage({...AppMessages[`filters`]})}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={4} lg={4} xl={4} container justify="center"
                                              alignItems="center">
                                            <Button variant="contained" size='small'
                                                    id="seleniumPackFormatApplyButton"
                                                    className={classes.button}
                                                    onClick={applyFilters}
                                            >
                                                {intl.formatMessage({...AppMessages[`apply`]})}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={4} lg={4} xl={4} container justify="center"
                                              alignItems="center">
                                            <Button variant="contained" size='small'
                                                    id="seleniumPackFormatResetButton"
                                                    className={classes.button}
                                                    onClick={resetFilters}
                                            >
                                                {intl.formatMessage({...AppMessages[`reset`]})}
                                            </Button>
                                        </Grid>


                                        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}
                                              className={classes.gridStyle} justify='center'>
                                            <FormControl className={classes.largeFormControl}>
                                                <FormLabel component="legend"
                                                           className={classes.formLabel}>
                                                    {intl.formatMessage({...AppMessages[`region`]})}
                                                </FormLabel>
                                                <ReactPickyModified
                                                    id={"rtmRegion"}
                                                    options={filterData.region}
                                                    multiple={true}
                                                    includeFilter
                                                    includeSelectAll
                                                    value={selectedFilter.region}
                                                    onChange={value => handleMultiSelectChange('region', value)}
                                                    allSelectedPlaceholder={selectedFilter.region.length === filterData.region.length ? 'All' : "%s selected"}
                                                    manySelectedPlaceholder={'%s selected'}
                                                    numberDisplayed={2}
                                                    clearFilterOnClose={true}
                                                    selectAllMode={"filtered"}
                                                    placeholder={intl.formatMessage({...AppMessages[`none_selected`]})}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}
                                              className={classes.gridStyle} justify='center'>
                                            <FormControl className={classes.largeFormControl}>
                                                <FormLabel component="legend"
                                                           className={classes.formLabel}>
                                                    {intl.formatMessage({...AppMessages[`manager`]})}
                                                </FormLabel>
                                                <ReactPickyModified
                                                    id={"rtmManager"}
                                                    options={filterData.manager}
                                                    multiple={true}
                                                    includeFilter
                                                    includeSelectAll
                                                    value={selectedFilter.manager}
                                                    onChange={value => handleMultiSelectChange('manager', value)}
                                                    allSelectedPlaceholder={selectedFilter.manager.length === filterData.manager.length ? 'All' : "%s selected"}
                                                    manySelectedPlaceholder={'%s selected'}
                                                    numberDisplayed={2}
                                                    clearFilterOnClose={true}
                                                    selectAllMode={"filtered"}
                                                    placeholder={intl.formatMessage({...AppMessages[`none_selected`]})}
                                                />
                                            </FormControl>
                                        </Grid>


                                        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}
                                              className={classes.gridStyle} justify='center'>
                                            <FormControl className={classes.largeFormControl}>
                                                <FormLabel component="legend"
                                                           className={classes.formLabel}>
                                                    {intl.formatMessage({...AppMessages[`coordinator`]})}
                                                </FormLabel>
                                                <ReactPickyModified
                                                    id={"rtmCoordinator"}
                                                    options={filterData.coordinator}
                                                    multiple={true}
                                                    includeFilter
                                                    includeSelectAll
                                                    value={selectedFilter.coordinator}
                                                    onChange={value => handleMultiSelectChange('coordinator', value)}
                                                    allSelectedPlaceholder={selectedFilter.coordinator.length === filterData.coordinator.length ? 'All' : "%s selected"}
                                                    manySelectedPlaceholder={'%s selected'}
                                                    numberDisplayed={2}
                                                    clearFilterOnClose={true}
                                                    selectAllMode={"filtered"}
                                                    placeholder={intl.formatMessage({...AppMessages[`none_selected`]})}
                                                />
                                            </FormControl>

                                        </Grid>

                                        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}
                                              className={classes.gridStyle} justify='center'>
                                            <FormControl className={classes.largeFormControl}>
                                                <FormLabel component="legend"
                                                           className={classes.formLabel}>
                                                    {intl.formatMessage({...AppMessages[`sales_rep`]})}
                                                </FormLabel>
                                                <ReactPickyModified
                                                    id={"rtmSalesRep"}
                                                    options={filterData.salesRep}
                                                    multiple={true}
                                                    includeFilter
                                                    includeSelectAll
                                                    value={selectedFilter.salesRep}
                                                    onChange={value => handleMultiSelectChange('salesRep', value)}
                                                    allSelectedPlaceholder={selectedFilter.salesRep.length === filterData.salesRep.length ? 'All' : "%s selected"}
                                                    manySelectedPlaceholder={'%s selected'}
                                                    numberDisplayed={2}
                                                    clearFilterOnClose={true}
                                                    selectAllMode={"filtered"}
                                                    placeholder={intl.formatMessage({...AppMessages[`none_selected`]})}
                                                />
                                            </FormControl>

                                        </Grid>

                                        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}
                                              className={classes.gridStyle} justify='center'>
                                            <FormControl className={classes.largeFormControl}>
                                                <FormLabel component="legend"
                                                           className={classes.formLabel}>
                                                    {intl.formatMessage({...AppMessages[`price_group`]})}
                                                </FormLabel>
                                                <ReactPickyModified
                                                    id={"rtmPriceGroup"}
                                                    options={filterData.gp}
                                                    multiple={true}
                                                    includeFilter
                                                    includeSelectAll
                                                    value={selectedFilter.gp}
                                                    onChange={value => handleMultiSelectChange('gp', value)}
                                                    allSelectedPlaceholder={selectedFilter.gp.length === filterData.gp.length ? 'All' : "%s selected"}
                                                    manySelectedPlaceholder={'%s selected'}
                                                    numberDisplayed={2}
                                                    clearFilterOnClose={true}
                                                    selectAllMode={"filtered"}
                                                    placeholder={intl.formatMessage({...AppMessages[`none_selected`]})}
                                                />
                                            </FormControl>

                                        </Grid>

                                        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}
                                              className={classes.gridStyle} justify='center'>

                                            <Grid container justify="center">
                                                <FormControl className={classes.largeFormControl}>
                                                    <FormLabel component="legend"
                                                               className={classes.formLabel}>
                                                        {intl.formatMessage({...AppMessages[`distributor`]})}
                                                    </FormLabel>
                                                    <ReactPickyModified
                                                        id={"rtmDistributor"}
                                                        options={filterData.distributor}
                                                        multiple={true}
                                                        includeFilter
                                                        includeSelectAll
                                                        value={selectedFilter.distributor}
                                                        onChange={value => handleMultiSelectChange('distributor', value)}
                                                        allSelectedPlaceholder={selectedFilter.distributor.length === filterData.distributor.length ? 'All' : "%s selected"}
                                                        manySelectedPlaceholder={'%s selected'}
                                                        numberDisplayed={2}
                                                        clearFilterOnClose={true}
                                                        selectAllMode={"filtered"}
                                                        placeholder={
                                                            intl.formatMessage({...AppMessages[`none_selected`]})}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>


                                        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}
                                              className={classes.gridStyle} justify='center'>
                                            <FormControl className={classes.largeFormControl}>
                                                <FormLabel component="legend"
                                                           className={classes.formLabel}>
                                                    {intl.formatMessage({...AppMessages[`channel`]})}
                                                </FormLabel>
                                                <ReactPickyModified
                                                    id={"rtmChannel"}
                                                    options={filterData.channel}
                                                    multiple={true}
                                                    includeFilter
                                                    includeSelectAll
                                                    value={selectedFilter.channel}
                                                    onChange={value => handleMultiSelectChange('channel', value)}
                                                    allSelectedPlaceholder={selectedFilter.channel.length === filterData.channel.length ? 'All' : "%s selected"}
                                                    manySelectedPlaceholder={'%s selected'}
                                                    numberDisplayed={2}
                                                    clearFilterOnClose={true}
                                                    selectAllMode={"filtered"}
                                                    placeholder={intl.formatMessage({...AppMessages[`none_selected`]})}
                                                />
                                            </FormControl>

                                        </Grid>

                                        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}
                                              className={classes.gridStyle} justify='center'>

                                            <FormControl className={classes.largeFormControl}>
                                                <FormLabel component="legend"
                                                           className={classes.formLabel}>
                                                    {intl.formatMessage({...AppMessages[`chain`]})}
                                                </FormLabel>
                                                <ReactPickyModified
                                                    id={"rtmChannel"}
                                                    options={filterData.chain}
                                                    multiple={true}
                                                    includeFilter
                                                    includeSelectAll
                                                    value={selectedFilter.chain}
                                                    onChange={value => handleMultiSelectChange('chain', value)}
                                                    allSelectedPlaceholder={selectedFilter.chain.length === filterData.chain.length ? 'All' : "%s selected"}
                                                    manySelectedPlaceholder={'%s selected'}
                                                    numberDisplayed={2}
                                                    clearFilterOnClose={true}
                                                    selectAllMode={"filtered"}
                                                    placeholder={intl.formatMessage({...AppMessages[`none_selected`]})}
                                                />
                                            </FormControl>

                                        </Grid>

                                        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}
                                              className={classes.gridStyle} justify='center'>

                                            <FormControl className={classes.storeFormControl}>
                                                <FormLabel component="legend"
                                                           className={classes.formLabel}>
                                                    {intl.formatMessage({...AppMessages[`store`]})}
                                                </FormLabel>
                                                <AsyncSelect
                                                    className={classes.storeDropDown}
                                                    isMulti
                                                    defaultOptions
                                                    components={{IndicatorSeparator: () => null, DropdownIndicator,LoadingMessage:LoadIndicator,NoOptionsMessage:NoOptionsIndicator}}
                                                    placeholder={<Typography className={classes.storePlaceHolder}>
                                                        {intl.formatMessage({...messages[`search_store`]})}
                                                    </Typography>}
                                                    inputValue={inputValue}
                                                    onInputChange={handleInputChange}
                                                    loadOptions={promiseOptions}
                                                    isClearable
                                                    onChange={handleChange}
                                                    value={selectedFilter.store}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}
                                              className={classes.gridStyle} justify='center'>
                                            <FormControl className={classes.largeFormControl}>
                                                <FormLabel component="legend"
                                                           className={classes.formLabel}>
                                                    {intl.formatMessage({...AppMessages[`category`]})}
                                                </FormLabel>
                                                <ReactPickyModified
                                                    id={"rtmCategory"}
                                                    options={filterData.category}
                                                    multiple={true}
                                                    includeFilter
                                                    includeSelectAll
                                                    value={selectedFilter.category}
                                                    onChange={value => handleMultiSelectChange('category', value)}
                                                    allSelectedPlaceholder={selectedFilter.category.length === filterData.category.length ? 'All' : "%s selected"}
                                                    manySelectedPlaceholder={'%s selected'}
                                                    numberDisplayed={2}
                                                    clearFilterOnClose={true}
                                                    selectAllMode={"filtered"}
                                                    placeholder={intl.formatMessage({...AppMessages[`none_selected`]})}
                                                />
                                            </FormControl>

                                        </Grid>

                                        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}
                                              className={classes.gridStyle} justify='center'>
                                            <FormControl className={classes.largeFormControl}>
                                                <FormLabel component="legend"
                                                           className={classes.formLabel}>
                                                    {intl.formatMessage({...AppMessages[`technology`]})}
                                                </FormLabel>
                                                <ReactPickyModified
                                                    id={"rtmTechnology"}
                                                    options={filterData.technology}
                                                    multiple={true}
                                                    includeFilter
                                                    includeSelectAll
                                                    value={selectedFilter.technology}
                                                    onChange={value => handleMultiSelectChange('technology', value)}
                                                    allSelectedPlaceholder={selectedFilter.technology.length === filterData.technology.length ? 'All' : "%s selected"}
                                                    manySelectedPlaceholder={'%s selected'}
                                                    numberDisplayed={2}
                                                    clearFilterOnClose={true}
                                                    selectAllMode={"filtered"}
                                                    placeholder={intl.formatMessage({...AppMessages[`none_selected`]})}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}
                                              className={classes.gridStyle} justify='center'>
                                            <FormControl className={classes.largeFormControl}>
                                                <FormLabel component="legend"
                                                           className={classes.formLabel}>
                                                    {intl.formatMessage({...AppMessages[`brand`]})}
                                                </FormLabel>
                                                <ReactPickyModified
                                                    id={"rtmBrand"}
                                                    options={filterData.brand}
                                                    multiple={true}
                                                    includeFilter
                                                    includeSelectAll
                                                    value={selectedFilter.brand}
                                                    onChange={value => handleMultiSelectChange('brand', value)}
                                                    allSelectedPlaceholder={selectedFilter.brand.length === filterData.brand.length ? 'All' : "%s selected"}
                                                    manySelectedPlaceholder={'%s selected'}
                                                    numberDisplayed={2}
                                                    clearFilterOnClose={true}
                                                    selectAllMode={"filtered"}
                                                    placeholder={intl.formatMessage({...AppMessages[`none_selected`]})}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </OverLaySpinner>

                            );
                        } else {
                            return (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100vh',
                                    }}>
                                    <SyncLoader size={15} margin={2} color="#0000a0" loading/>
                                </div>
                            )
                        }
                    } else {
                        return <NoDataAlert/>
                    }

                })()
            }

        </Paper>
    )
}

SideFilter.propTypes = {};

export default memo(injectIntl(SideFilter));

