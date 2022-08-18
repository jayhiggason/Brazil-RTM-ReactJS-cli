/**
 *
 * InsightTab
 *
 */

import React, {memo} from "react";
import {createStyles, makeStyles, withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Button, FormControl, MenuItem, Select, Tooltip} from "@material-ui/core";
import clsx from "clsx";
import {SyncLoader} from "react-spinners";
import NoDataAlert from "../NoDataAlert";
import {Markup} from 'interweave';
import IconButton from "@material-ui/core/IconButton";
import Icon from "@mdi/react";
import {mdiPin} from "@mdi/js";
import Switch from "@material-ui/core/Switch";
import history from "../../utils/history";
import {exportCSVFile} from "../../utils/utility";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import InfoIcon from "@material-ui/icons/Info";
import messages from "./messages";
import appMessages from "../../containers/App/messages";
import {FormattedMessage, injectIntl} from "react-intl";
import ReactPickyModified from "../ReactPickyModified/Loadable";

/** Styles class*/
const useStyles = makeStyles(({
    filterPanelHeading: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: "1.1vw",
        textAlign: "left",
        color: "#0000a0e6",
        margin: "1vw 1vw 0.5vw 1vw",

    },
    title: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1vw',
        color: '#0000a0e6',
        padding: '1vw',
        // margin: '1vmin'

    },
    markup: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '1vw',
        color: '#0000a0e6',
        padding: '0.2vw',
        align: 'left',
    },
    content: {
        "& p": {
            margin: '0.1vw',
            padding: 0
        },
        "& a": {
            margin: 0,
            color: '#0000a0e6',
            textDecoration: 'underline',
            fontFamily: 'MarsCentra-Book',
        },
        fontFamily: 'MarsCentra-Book',
        fontSize: '1vw',
        color: "#000",
        padding: 0,
        align: 'left',
    },
    kpiButtons: {
        margin: "1vmin",
        color: "black",
        backgroundColor: "#fff",
        fontFamily: "MarsCentra-Book",
        fontSize: '0.7vw',
        textTransform: 'none',
        border: '0.2vmin solid #0000a0',
        borderRadius: "1vmin",
        // borderBlockColor:"#0000a0e6",
        // borderColor:"#0000a0e6",
        '&:hover': {
            color: "white",
            backgroundColor: "#0000a0",
        },
        '&:disabled': {
            border: "none"
        }
    },
    formControl: {
        minWidth: '5.5vw',
        fontSize: '0.9vw',
        fontFamily: 'MarsCentra-Book',
        color: 'rgb(0,0,0)',
        textAlign: "center",
        marginRight: '0.5vw'
    },
    formControlTimeRange:{
        minWidth: '10.5vw',
        maxWidth: "11vw",
        fontSize: '0.9vw',
        fontFamily: 'MarsCentra-Book',
        color: 'rgb(0,0,0)',
        textAlign: "center",
        marginRight: '0.5vw'
    },
    kpiButtonsActive: {
        margin: "1vmin",
        color: "white",
        backgroundColor: "#0000a0",
        fontFamily: "MarsCentra-Book",
        fontSize: '0.7vw',
        textTransform: 'none',
        borderRadius: "1vmin",
        border: '0.2vmin solid #0000a0',
        '&:hover': {
            color: "white",
            backgroundColor: "#0000a0",
        },
        '&:disabled': {
            border: "none"
        }
    },
    divider: {
        backgroundColor: "#000"
    },
    menuItem: {
        fontFamily: "MarsCentra-Book",
        fontSize: "0.7vw",
    },
    filterHeading: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '0.8vw',
        color: '#0000a0e6',
        padding: '0.5vw'
    },
    pinButton: {
        margin: "1vmin",
        outline: "none",
        fontSize: "0.7vw",
        fontFamily: 'MarsCentra-Book',
        backgroundColor: 'rgb(255,255,255) ',
        color: 'rgb(0,215,185)',
        textTransform: 'none',
        '&:hover': {
            color: 'rgb(255,255,255)',
            backgroundColor: 'rgb(0,215,180)',
            borderRadius: '0.3vw',
            padding: "0.2vw"
        }
    },
    csvButtonStyle: {
        margin: "0 1vmin",
        outline: "none",
        fontSize: "0.7vw",
        fontFamily: 'MarsCentra-Book',
        backgroundColor: 'rgb(255,255,255) ',
        color: 'rgb(0,215,185)',
        textTransform: 'none',
        '&:hover': {
            color: 'rgb(255,255,255)',
            backgroundColor: 'rgb(0,215,180)',
            borderRadius: '0.3vw',
            padding: "0.2vw",
            outline: "none",
        }
    },
}));


const AntSwitch = withStyles((theme) =>
    createStyles({
        root: {
            width: 28,
            height: 16,
            padding: 0,
            display: 'flex',
        },
        switchBase: {
            padding: 2,
            color: theme.palette.grey[500],
            '&$checked': {
                transform: 'translateX(12px)',
                color: theme.palette.common.white,
                '& + $track': {
                    opacity: 1,
                    backgroundColor: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                },
            },
        },
        thumb: {
            width: 12,
            height: 12,
            boxShadow: 'none',
        },
        track: {
            border: `1px solid ${theme.palette.grey[500]}`,
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor: theme.palette.common.white,
        },
        checked: {},
    }),
)(Switch);

/** InsightTab function  is used to render the Guided Insights/ Trend analysis component in the performance summary page */


function InsightTab({
                        data, buttonData, filterData, spinnerState, fetchFailed,
                        fetchData, buttonChange, filterChange, filterTypeData, filterTypeChange, toggleInsights, toggleData, handlePinView, intl, yearPeriodData,
                        yearPeriodChange, yearPeriod
                    }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleChange = (event) => {
        filterChange(event.target.value);
        fetchData();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const [openType, setOpenType] = React.useState(false);
    const handleTypeChange = (event) => {
        if (event.target.value === 'Target achieved in latest period' || event.target.value === 'Target not achieved in last 3 periods') {
            filterChange('Distributor');
        } else {
            filterChange('Brand');

        }
        filterTypeChange(event.target.value);
        fetchData();
    };

    const handleTypeClose = () => {
        setOpenType(false);
    };

    const handleTypeOpen = () => {
        setOpenType(true);
    };

    const onClickDistributorsPerformanceKpiNameButtons = (data) => {
        buttonChange(data);
        fetchData();
    };
    const handleYearPeriodChange = (value) => {
        yearPeriodChange(value);
        fetchData();
    };
    const handleInsightToggle = () => {
        if(toggleData){
            filterTypeChange("");
        } else {
            yearPeriodChange([]);
            filterTypeChange("Growth");
        }

        toggleInsights(!(toggleData));
        fetchData();
    };


    const exportToCsv = () => {
        let header = [{text: intl.formatMessage({...appMessages[`insightsAnalysis`]}), dataField: "csvSentence"}, {
            dataField: 'category',
            text: intl.formatMessage({...appMessages[`category`]})
        },];
        let insightData = data.map((i) => {
            if (i['color'] === 'green') {
                return ({
                    ...i,
                    ['category']: 'Top'
                });
            } else {
                return ({
                    ...i,
                    ['category']: 'Bottom'
                });
            }

        });
        exportCSVFile(insightData, `${intl.formatMessage({...appMessages[`performance_summary_guided_insights`]})}_
        (${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()}_${new Date().getMinutes()}_${new Date().getSeconds()}).csv`, header);
    };

    return (
        <div style={{boxSizing: 'border-box', width: '100%', overflowY: 'visible'}}>
            <Paper elevation={4} style={{
                height: '59.5vh',
                width: "100%",
                padding: '0.4vw',
                marginTop: "3vmin",
                overflowY: 'visible'
            }}>
                <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={{textAlign: "start"}}>
                        <Grid item container justify="left" xs={12} sm={12} md={12} lg={12}
                              style={{paddingLeft: "1.7vmin"}}>
                            <Grid component="label" container spacing={1} style={{paddingTop: "2vmin"}}>
                                <Grid item
                                      className={classes.title}>
                                    {toggleData ?
                                        intl.formatMessage({...messages[`header`]}) :
                                        intl.formatMessage({...messages[`header_guided_insights`]})
                                    }
                                </Grid>
                                <Grid item>
                                    <AntSwitch checked={toggleData} onChange={handleInsightToggle}/>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item container xs={9} sm={9} md={9} lg={9} xl={9} style={{textAlign: "end"}}
                          justify="flex-end"
                          alignItems="center">

                        <Typography hidden={!(toggleData)}
                                    className={classes.filterHeading}>
                            {intl.formatMessage({...messages[`insight_label_type`]})}:
                        </Typography>

                        <FormControl className={classes.formControl}
                                     id={"guided-insights-type-filter"} hidden={!(toggleData)}>
                            <Select className={classes.menuItem}
                                    labelId="guided-insights-dim-type-filter"
                                    id="demo-controlled-open-select"
                                    open={openType}
                                    onClose={handleTypeClose}
                                    onOpen={handleTypeOpen}
                                    value={filterTypeData}
                                    onChange={handleTypeChange}
                                // disabled={!(toggleData)}
                            >
                                <MenuItem value={'Growth'} className={classes.menuItem}>
                                    <FormattedMessage {...appMessages.growth} />
                                </MenuItem>
                                <MenuItem value={'Tech Growth'} className={classes.menuItem}>
                                    <FormattedMessage {...messages.insight_tech_growth} />
                                </MenuItem>
                                <MenuItem value={'WOS'}
                                          className={classes.menuItem}>
                                    <FormattedMessage {...appMessages[`kpi_wos`]} />
                                </MenuItem>
                                <MenuItem value={'Target achieved in latest period'}
                                          className={classes.menuItem}>
                                    <FormattedMessage {...messages.insight_target_achieved} />
                                </MenuItem>
                                <MenuItem value={'Target not achieved in last 3 periods'}
                                          className={classes.menuItem}>
                                    <FormattedMessage {...messages.insight_target_not_achieved} />
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <Typography className={classes.filterHeading}
                                    hidden={(toggleData)}>  {intl.formatMessage({...messages[`yearPeriod`]})}:</Typography>
                        <FormControl className={classes.formControlTimeRange} hidden={(toggleData)} >
                            <ReactPickyModified
                                id={"yearPeriod"}
                                options={yearPeriodData}
                                multiple={true}
                                includeFilter
                                includeSelectAll
                                value={yearPeriod}
                                onChange={value => handleYearPeriodChange(value)}
                                allSelectedPlaceholder={yearPeriod.length === yearPeriodData.length ? 'All' : "%s selected"}
                                manySelectedPlaceholder={'%s selected'}
                                numberDisplayed={2}
                                clearFilterOnClose={true}
                                selectAllMode={"filtered"}
                                placeholder={<FormattedMessage {...appMessages[`none_selected`]} />}
                            />
                            {/*<Picky*/}
                            {/*    id={"rtmPeriod"}*/}
                            {/*    placeholder={'YP'}*/}
                            {/*    options={['202103','202102','Select All']}*/}
                            {/*    multiple={true}*/}
                            {/*    includeFilter*/}
                            {/*    value={openPinPage}*/}
                            {/*    onChange={handleChangeYearPeriod}*/}
                            {/*    manySelectedPlaceholder={'%s selected'}*/}
                            {/*    numberDisplayed={2}*/}
                            {/*    clearFilterOnClose={true}*/}
                            {/*    selectAllMode={"filtered"}*/}
                            {/*/>*/}
                        </FormControl>

                        <Typography
                            className={classes.filterHeading}>
                            {intl.formatMessage({...messages[`insight_label_dimension`]})}:</Typography>
                        <FormControl className={classes.formControl}
                                     id={"guided-insights-filter"}>
                            <Select className={classes.menuItem}
                                    labelId="guided-insights-dim-filter"
                                    id="demo-controlled-open-select"
                                    open={open}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    value={filterData}
                                    onChange={handleChange}
                            >
                                {((["WOS", "Growth", "Tech Growth"].indexOf(filterTypeData) > -1 && (toggleData)) || !(toggleData)) &&
                                <MenuItem value={'Brand'} className={classes.menuItem}>
                                    <FormattedMessage {...appMessages.brand} />
                                </MenuItem>}
                                <MenuItem value={'Distributor'} className={classes.menuItem}>
                                    <FormattedMessage {...appMessages.distributor} />
                                </MenuItem>
                                {(["WOS", "Growth", "Tech Growth"].indexOf(filterTypeData) > -1 && (toggleData)) &&
                                <MenuItem value={'Distributor-Brand'}
                                          className={classes.menuItem}>
                                    <FormattedMessage {...appMessages.distributor} />-<FormattedMessage {...appMessages.brand} />
                                </MenuItem>}
                            </Select>
                        </FormControl>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => onClickDistributorsPerformanceKpiNameButtons('GSV')}
                            className={clsx({
                                [classes.kpiButtons]: buttonData !== 'GSV',
                                [classes.kpiButtonsActive]: buttonData === 'GSV'
                            })}
                            disabled={(toggleData) && filterTypeData === "WOS"}>
                            <FormattedMessage {...appMessages.kpi_gsv} />
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => onClickDistributorsPerformanceKpiNameButtons('Tonnes')}
                            className={clsx({
                                [classes.kpiButtons]: buttonData !== 'Tonnes',
                                [classes.kpiButtonsActive]: buttonData === 'Tonnes'
                            })}
                            disabled={(toggleData) && filterTypeData === "WOS"}>
                            <FormattedMessage {...appMessages.kpi_tonnes} />
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => onClickDistributorsPerformanceKpiNameButtons('Invoice')}
                            className={clsx({
                                [classes.kpiButtons]: buttonData !== 'Invoice',
                                [classes.kpiButtonsActive]: buttonData === 'Invoice'
                            })}
                            disabled={((toggleData) && filterTypeData === "WOS") || ((toggleData) && filterTypeData === "Target achieved in latest period" && filterData === "Distributor") || ((toggleData) && filterTypeData === "Target not achieved in last 3 periods" && filterData === "Distributor")}>
                            <FormattedMessage {...appMessages.kpi_invoice} /></Button>
                        <Tooltip title={<FormattedMessage {...appMessages[`click_to_download`]} />}>
                            <IconButton size={"small"} className={classes.csvButtonStyle} onClick={exportToCsv}>
                                <SystemUpdateAltIcon fontSize={"small"}/>
                            </IconButton>
                        </Tooltip>
                        {
                            history.location.pathname !== "/RTM/MyPinnedViews" &&
                            <Tooltip title={<FormattedMessage {...appMessages[`pin_the_component`]} />}>
                                <IconButton size="small" className={classes.pinButton}
                                            onClick={handlePinView}>
                                    <Icon
                                        path={mdiPin}
                                        size={"1vw"}/>
                                </IconButton>
                            </Tooltip>
                        }

                        <Tooltip title={<FormattedMessage {...messages.insight_tooltip_info_text} />}>
                            <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                        </Tooltip>
                    </Grid>
                    {
                        (() => {
                            if (!fetchFailed) {
                                if (!spinnerState) {
                                    return (
                                        (() => {
                                            if (toggleData) {
                                                return (
                                                    <Grid container style={{}} alignItems={"flex-start"}
                                                          justify={"space-around"}>
                                                        <Grid item container xs={12} sm={12} md={6} lg={6} xl={6}
                                                              justify="flex-start" alignItems={"flex-start"}
                                                              style={{padding: '0.5vmin'}}>

                                                            <Paper elevation={2} style={{
                                                                margin: '0.5vw',
                                                                minHeight: "45vh",
                                                                maxHeight: "45vh",
                                                                minWidth: '36vw',
                                                                maxWidth: '36vw',
                                                                paddingBottom: '1vmin'
                                                            }}>
                                                                <Grid item xs={12} style={{textAlign: 'center'}}>
                                                                    <Typography className={classes.title}>
                                                                        {intl.formatMessage({...messages[`insight_top_performing`]})}
                                                                    </Typography>
                                                                </Grid>
                                                                {
                                                                    (() => {
                                                                        let topData = data.filter(i => i['color'] === 'green');
                                                                        if (topData.length !== 0) {
                                                                            return (
                                                                                <Paper elevation={0} style={{
                                                                                    maxHeight: '37vh',
                                                                                    minHeight: "37vh",
                                                                                    overflowY: 'auto',
                                                                                    minWidth: '36vw',
                                                                                    maxWidth: '36vw',
                                                                                    paddingRight: "0.5vw"
                                                                                }}>
                                                                                    <ol>
                                                                                        {topData.map(item => {
                                                                                            return (
                                                                                                <Grid container xs={12}>
                                                                                                    <li>
                                                                                                        <Grid item
                                                                                                              xs={12}
                                                                                                              sm={12}
                                                                                                              md={12}
                                                                                                              lg={12}
                                                                                                              xl={12}
                                                                                                              container
                                                                                                              alignItems={"center"}
                                                                                                              justify={"flex-start"}
                                                                                                              style={{textAlign: 'left'}}>
                                                                                                            <Typography
                                                                                                                className={classes.content}>
                                                                                                                <Markup
                                                                                                                    content={item['sentence']}/>
                                                                                                            </Typography>
                                                                                                        </Grid>
                                                                                                    </li>

                                                                                                </Grid>
                                                                                            )
                                                                                        })}
                                                                                    </ol>
                                                                                </Paper>

                                                                            )
                                                                        } else {
                                                                            return (
                                                                                <div style={{
                                                                                    maxHeight: '37vh',
                                                                                    minHeight: "37vh",
                                                                                    minWidth: '36vw',
                                                                                    maxWidth: '36vw',
                                                                                    paddingRight: "0.5vw"
                                                                                }}>
                                                                                    <Typography
                                                                                        className={classes.title}>
                                                                                        {intl.formatMessage({...messages[`insight_no_data_indicator_text`]})}
                                                                                    </Typography>
                                                                                </div>);
                                                                        }
                                                                    })()
                                                                }

                                                            </Paper>
                                                        </Grid>

                                                        <Grid item container xs={12} sm={12} md={6} lg={6} xl={6}
                                                              justify="flex-start" alignItems={"flex-start"}
                                                              style={{padding: '0.5vmin'}}>
                                                            <Paper elevation={2} style={{
                                                                margin: '0.5vw',
                                                                minHeight: "45vh",
                                                                maxHeight: "45vh",
                                                                minWidth: '36vw',
                                                                maxWidth: '36vw',
                                                                paddingBottom: '1vmin'
                                                            }}>
                                                                <Grid item xs={12} style={{textAlign: 'center'}}>
                                                                    <Typography className={classes.title}>
                                                                        {intl.formatMessage({...messages[`insight_bottom_performing`]})}
                                                                    </Typography>
                                                                </Grid>
                                                                {
                                                                    (() => {
                                                                        let bottomData = data.filter(i => i['color'] === 'red');
                                                                        if (bottomData.length !== 0) {
                                                                            return (
                                                                                <Paper elevation={0} style={{
                                                                                    maxHeight: '37vh',
                                                                                    minHeight: "37vh",

                                                                                    overflowY: 'auto',
                                                                                    minWidth: '36vw',
                                                                                    maxWidth: '36vw',
                                                                                    paddingRight: "0.5vw"
                                                                                }}>
                                                                                    <ol>
                                                                                        {bottomData.map(item => {
                                                                                            return (
                                                                                                <Grid container xs={12}>
                                                                                                    <li>
                                                                                                        <Grid item
                                                                                                              xs={12}
                                                                                                              sm={12}
                                                                                                              md={12}
                                                                                                              lg={12}
                                                                                                              xl={12}
                                                                                                              container
                                                                                                              alignItems={"center"}
                                                                                                              justify={"flex-start"}
                                                                                                              style={{textAlign: 'left'}}>
                                                                                                            <Typography
                                                                                                                className={classes.content}>
                                                                                                                <Markup
                                                                                                                    content={item['sentence']}/>
                                                                                                            </Typography>
                                                                                                        </Grid>
                                                                                                    </li>

                                                                                                </Grid>
                                                                                            )
                                                                                        })}
                                                                                    </ol>
                                                                                </Paper>
                                                                            )
                                                                        } else {
                                                                            return (
                                                                                <div style={{
                                                                                    maxHeight: '37vh',
                                                                                    minHeight: "37vh",
                                                                                    minWidth: '36vw',
                                                                                    maxWidth: '36vw',
                                                                                    paddingRight: "0.5vw"
                                                                                }}>
                                                                                    <Typography
                                                                                        className={classes.title}>
                                                                                        {intl.formatMessage({...messages[`insight_no_data_indicator_text`]})}
                                                                                    </Typography>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })()
                                                                }


                                                            </Paper>
                                                        </Grid>
                                                    </Grid>
                                                )
                                            } else if (!(toggleData)) {
                                                return (
                                                    <Grid container xs={12} style={{}} alignItems={"center"}
                                                          justify={"space-around"}>
                                                        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}
                                                              justify="flex-start" alignItems={"flex-start"}
                                                              style={{padding: '0.5vmin'}}>

                                                            <Paper elevation={2} style={{
                                                                margin: '0.5vw',
                                                                minHeight: "45vh",
                                                                maxHeight: "45vh",
                                                                minWidth: '75vw',
                                                                maxWidth: '75vw',
                                                                paddingBottom: '1vmin'
                                                            }}>
                                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                                                                      style={{textAlign: 'center'}}>
                                                                    <Typography className={classes.title}>

                                                                        {/*<FormattedMessage {...messages.insight_top_performing} />*/}
                                                                    </Typography>
                                                                </Grid>
                                                                {
                                                                    (() => {
                                                                        let Data = data.filter(i => i['color'] === 'green');
                                                                        if (Data.length !== 0) {
                                                                            return (
                                                                                <Paper elevation={0} style={{
                                                                                    maxHeight: '37vh',
                                                                                    minHeight: "37vh",
                                                                                    overflowY: 'auto',
                                                                                    minWidth: '72vw',
                                                                                    maxWidth: '73vw',
                                                                                    paddingRight: "0.5vw"
                                                                                }}>
                                                                                    <ol>
                                                                                        {Data.map(item => {
                                                                                            return (
                                                                                                <Grid container xs={12}>
                                                                                                    <li>
                                                                                                        <Grid item
                                                                                                              xs={12}
                                                                                                              sm={12}
                                                                                                              md={12}
                                                                                                              lg={12}
                                                                                                              xl={12}
                                                                                                              container
                                                                                                              alignItems={"center"}
                                                                                                              justify={"flex-start"}
                                                                                                              style={{textAlign: 'left'}}>
                                                                                                            <Typography
                                                                                                                className={classes.content}>
                                                                                                                <Markup
                                                                                                                    content={item['sentence']}/>
                                                                                                            </Typography>
                                                                                                        </Grid>
                                                                                                    </li>

                                                                                                </Grid>
                                                                                            )
                                                                                        })}
                                                                                    </ol>
                                                                                </Paper>

                                                                            )
                                                                        } else {
                                                                            return (
                                                                                <div style={{
                                                                                    maxHeight: '37vh',
                                                                                    minHeight: "37vh",
                                                                                    // minWidth: '36vw',
                                                                                    // maxWidth: '36vw',
                                                                                    paddingRight: "0.5vw",
                                                                                    textAlign:"center"
                                                                                }}>
                                                                                    <Typography
                                                                                        className={classes.title}>
                                                                                        <FormattedMessage {...messages.insight_no_data_indicator_text} />
                                                                                    </Typography>
                                                                                </div>);
                                                                        }
                                                                    })()
                                                                }

                                                            </Paper>
                                                        </Grid>


                                                    </Grid>
                                                )
                                            }
                                        })());

                                } else {
                                    return (
                                        <Grid item xs={12} sm={12} md={12} lg={12}
                                              className={classes.grid}
                                              style={{marginTop: "2vmin"}}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    height: '20vh',
                                                }}>
                                                <SyncLoader size={15} margin={2} color="#0000a0"
                                                            loading/>
                                            </div>
                                        </Grid>
                                    )
                                }
                            } else {
                                return <NoDataAlert/>
                            }

                        })()
                    }

                </Grid>

            </Paper>
        </div>
    );
}

InsightTab.propTypes = {};

export default memo(injectIntl(InsightTab));

