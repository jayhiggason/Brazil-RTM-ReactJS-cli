/**
 *
 * DistributorView
 *
 */

import React, {memo, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";

import {useInjectSaga} from "../../utils/injectSaga";
import {useInjectReducer} from "../../utils/injectReducer";
import makeSelectDistributorView from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import {makeStyles} from '@material-ui/core/styles';
import SideFilter from "../../components/SideFilter";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Box, Button, Grid, Paper, TextField, Tooltip, Typography} from "@material-ui/core";
import DistributorTable from "../../components/DistributorTable";
import history from "../../utils/history";
import {
    makeSelectDataLoadStatus,
    makeSelectFilterData,
    makeSelectFilterDataFail,
    makeSelectFilterDataSpinnerState,
    makeSelectSelectedFilters
} from "../App/selectors";
import {changeDataLoadStatus, filterDataFetch, pinMyPage, pinMyView, selectedFilterOnChange} from "../App/actions";
import {
    distributorTrendChartDataFetch,
    distributorTrendChartOnFilterChange,
    distributorTrendTableDataFetch
} from "./actions";
import clsx from "clsx";
import NoDataAlert from "../../components/NoDataAlert";
import {SyncLoader} from "react-spinners";
import {exportPdf} from "../../utils/utility";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import ApexGroupedBarChart from "../../components/ApexGroupedBarChart";
import TitleHeader from "../../components/TitleHeader/Loadable";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@mdi/react";
import {mdiPin} from "@mdi/js";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import InfoIcon from "@material-ui/icons/Info";
import {injectIntl} from "react-intl";
import AppMessages from "../App/messages";
import brandDeepDiveMessages from "../BrandDeepDivePage/messages";
import messages from './messages';
import {makeSelectLocale} from "../LanguageProvider/selectors";


/** Styles class*/
const useStyles = makeStyles(theme => ({
    scrollButton: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(1),
        fontFamily: "MarsCentra-Book",
        fontSize: "0.7vw",
    },
    paper: {
        width: "fit-content",
        textAlign: "center",
        verticalAlign: "middle",
        height: "fit-content"
    },
    title: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1vw',
        color: '#0000a0e6',
        padding: '1vw',
        margin: "1vmin"
    },
    formControl: {
        margin: '1vmin',
        minWidth: '4vw',
        fontSize: '0.9vw',
        fontFamily: 'MarsCentra-Book',
        color: 'rgb(0,215,185)'
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {},
        },
    },
    KPIButtons: {
        margin: "1vmin",
        color: "black",
        backgroundColor: "#fff",
        border: '0.2vmin solid #0000a0',
        fontFamily: "MarsCentra-Book",
        fontSize: '0.7vw',
        textTransform: 'none',
        borderRadius: "1vmin",
        '&:hover': {
            color: "white",
            backgroundColor: "#0000a0",
        }
    },
    KPIButtonsActive: {
        margin: "1vmin",
        color: "white",
        backgroundColor: "#0000a0",
        fontFamily: "MarsCentra-Book",
        textTransform: 'none',
        borderRadius: "1vmin",
        fontSize: '0.7vw',
        '&:hover': {
            color: "white",
            backgroundColor: "#0000a0",
        }
    },

    largeFormControlCompareRange: {
        minWidth: "10vw",
        maxWidth: "12vw",
        margin: "0.8vh"
    },
    largeFormControlTimeRange: {
        minWidth: "9vw",
        maxWidth: "10vw",
        margin: "0.8vh"
    },
    textField: {
        backgroundColor: "#fff",
        width: '100%',
        float: 'left',
        borderRadius: '0.3vw'
    },
    textFieldInput: {
        fontSize: '0.7vw',
        fontFamily: 'MarsCentra-Book',
        color: "#000",
        backgroundColor: "#FFF",

    },
    dialogHeading: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1vw',
    },
    dialogLabel: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.9vw',
    },
    buttonStyle: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.8vw',
    },
    utilityButtons: {
        margin: "1vmin",
        fontFamily: "MarsCentra-Bold",
        fontSize: "0.8vw",
        textTransform: 'none',
        borderRadius: "1vmin"
    },
    brandTrendChartSyncLoader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30vh',
    },
    menuItem: {
        fontFamily: "MarsCentra-Book",
        fontSize: "0.7vw",
    },
    pinButton: {
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
            padding: "0.2vw"
        }
    },
}));


function ScrollTop(props) {
    const {children, window} = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#app');
        if (anchor) {
            anchor.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'start'});
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.scrollButton}>
                {children}
            </div>
        </Zoom>
    );
}

export const DistributorTrendChartView = (props) => {

    const classes = useStyles();

    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`distributor_view_trend_chart`]}),
            viewId: "distributor_view_trend_chart",
            apiEnd: "get_distributor_trend",
            filters:
                {
                    kpiName: props['trendChartFilter']['kpiName'],
                    topFilter: props['trendChartFilter']['topFilter'],
                    vsFilter: props['trendChartFilter']['kpiFilter'],
                }
        })
    };

    const getLabel = () => {
        switch (props['trendChartFilter']['kpiName']) {
            case 'GSV':
                return props.intl.formatMessage({...AppMessages[`kpi_gsv`]});
            case 'invoice':
                return props.intl.formatMessage({...AppMessages[`kpi_invoice`]});
            case 'units':
                return props.intl.formatMessage({...AppMessages[`kpi_units`]});
            case 'tonnes':
                return props.intl.formatMessage({...AppMessages[`kpi_tonnes`]});
            case 'WOS':
                return 'WOS';
            case 'POS':
                return 'POS';
        }
    };

    const events = {
        click: function (event, chartContext, config,) {
            let dataPointIndex = config['dataPointIndex'];
            let series = config['config']['xaxis']['categories'];
            let name = series[dataPointIndex];
            if (dataPointIndex !== -1) {
                props.onFilterChange({
                    ...props.selectedFilterData,
                    distributor: [...props.selectedFilterData['distributor'], name],
                });
                history.push(`/RTM/DistributorDeepDive?${name}`);
            }
        }
    };

    const options = {
        colors: ['#00d7b9', '#0000a0'],
        chart: {
            type: 'bar',
            toolbar: {
                show: true,
                export: {
                    csv: {
                        filename: `${props.intl.formatMessage({...AppMessages[`distributor_view_trend_chart`]})}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                        columnDelimiter: ',',
                        headerCategory: props.intl.formatMessage({...AppMessages[`distributor`]}),
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: `${props.intl.formatMessage({...AppMessages[`distributor_view_trend_chart`]})}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                    png: {
                        filename: `${props.intl.formatMessage({...AppMessages[`distributor_view_trend_chart`]})}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    }
                },
            },
            events: events,
        },
        noData: {
            text: props.intl.formatMessage({...AppMessages[`click_to_download`]}),
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
                color: "#0000a0",
                fontSize: '1vw',
                fontFamily: "MarsCentra-Bold"
            }
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'left',
            fontSize: 14,
            fontFamily: 'MarsCentra-Book',
            offsetX: 0,
            offsetY: 0,

        },
        plotOptions: {
            bar: {
                columnWidth: '95%',
                horizontal: false,
                dataLabels: {
                    position: 'top',
                },
            }
        },
        dataLabels: {
            enabled: true,
            offsetX: -1,
            offsetY: -20,
            style: {
                fontSize: 12,
                colors: ['#000'],
                fontFamily: 'MarsCentra-Book',
            },
            formatter: function (value) {
                if (value < 1000) return new Intl.NumberFormat('pt-BR').format(value.toFixed(0));
                else if (value > 1000 && value < 1000000) return new Intl.NumberFormat('pt-BR').format((value / 1000).toFixed(1)) + "K";
                else if (value >= 1000000) return new Intl.NumberFormat('pt-BR').format((value / 1000000).toFixed(2)) + "M";
            },
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff']
        },
        yaxis: {
            show: true,
            labels: {
                formatter: function (value) {
                    if (value) {

                        if ((value >= 1000 && value < 100000) || (value <= -1000 && value > -100000)) {
                            return new Intl.NumberFormat('pt-BR').format((value / 1000).toFixed(1)) + "K";
                        } else if (value >= 100000 || value <= -100000) {
                            return new Intl.NumberFormat('pt-BR').format((value / 1000000).toFixed(1)) + "M";
                        } else if (value < 1000 || value > -1000) {
                            return new Intl.NumberFormat('pt-BR').format(value.toFixed(0));
                        }
                    }
                },
                style: {
                    fontSize: '0.7vw',
                    fontFamily: 'MarsCentra-Book',
                },
            },
            title: {
                text: getLabel(),
                rotate: -90,
                offsetX: 9,
                offsetY: 0,
                style: {
                    color: '#000',
                    fontSize: '0.9vw',
                    fontFamily: 'MarsCentra-Bold',

                },
            }
        },
        xaxis: {
            categories: props['trendChartData']['xAxis'],
            labels: {
                trim: true,
                rotateAlways: false,
                rotate: -30,
                hideOverlappingLabels: true,
                maxHeight: 100,
                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book',
                },
            },
            title: {
                text: props.intl.formatMessage({...AppMessages[`distributor`]}),
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: '#000',
                    fontSize: '0.9vw',
                    fontFamily: 'MarsCentra-Bold',
                    // fontWeight: 600,
                },
            },
        },
        tooltip: {
            enabled: true,
            theme: 'dark',
            x: {
                show: true,
                formatter: function (value) {
                    return value ? value.substring(0, 60) : value;
                },
            },
            y: {
                show: true,

                formatter: (label) => {
                    return label ? new Intl.NumberFormat('pt-BR').format(label.toFixed(2)) : label;
                },

            },
        }
    };

    return (
        <Paper style={{margin: "2vmin"}} elevation={3}>
            <Grid container>
                <Grid container item xs={12}>
                    <Grid item container xs={2} sm={2} md={2} lg={2} style={{textAlign: "start"}} justify={"flex-start"}
                          alignItems={"center"}>
                        <Typography className={classes.title}>
                            {props.intl.formatMessage({...messages[`dist_trend_header`]})}
                        </Typography>
                    </Grid>
                    <Grid item container xs={10} sm={10} md={10} lg={10} style={{textAlign: "end"}} justify={"flex-end"}
                          alignItems={"center"}>

                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => props.handleKPIButtonClick("invoice")}
                            className={clsx({
                                [classes.KPIButtons]: props['trendChartFilter']['kpiName'] !== 'invoice',
                                [classes.KPIButtonsActive]: props['trendChartFilter']['kpiName'] === 'invoice'
                            })}
                        >
                            {props.intl.formatMessage({...AppMessages[`kpi_invoice`]})}
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => props.handleKPIButtonClick("GSV")}
                            className={clsx({
                                [classes.KPIButtons]: props['trendChartFilter']['kpiName'] !== 'GSV',
                                [classes.KPIButtonsActive]: props['trendChartFilter']['kpiName'] === 'GSV'
                            })}
                        >
                            {props.intl.formatMessage({...AppMessages[`kpi_gsv`]})}
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => props.handleKPIButtonClick("units")}
                            className={clsx({
                                [classes.KPIButtons]: props['trendChartFilter']['kpiName'] !== 'units',
                                [classes.KPIButtonsActive]: props['trendChartFilter']['kpiName'] === 'units'
                            })}
                        >
                            {props.intl.formatMessage({...AppMessages[`kpi_units`]})}
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => props.handleKPIButtonClick("tonnes")}
                            className={clsx({
                                [classes.KPIButtons]: props['trendChartFilter']['kpiName'] !== 'tonnes',
                                [classes.KPIButtonsActive]: props['trendChartFilter']['kpiName'] === 'tonnes'
                            })}
                        >
                            {props.intl.formatMessage({...AppMessages[`kpi_tonnes`]})}
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => props.handleKPIButtonClick("WOS")}
                            className={clsx({
                                [classes.KPIButtons]: props['trendChartFilter']['kpiName'] !== 'WOS',
                                [classes.KPIButtonsActive]: props['trendChartFilter']['kpiName'] === 'WOS'
                            })}
                        >
                            WOS
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => props.handleKPIButtonClick("POS")}
                            className={clsx({
                                [classes.KPIButtons]: props['trendChartFilter']['kpiName'] !== 'POS',
                                [classes.KPIButtonsActive]: props['trendChartFilter']['kpiName'] === 'POS'
                            })}
                        >
                            POS
                        </Button>
                        <FormControl className={classes.formControl}
                                     id={"dist-trend-kpi-filter"}>
                            <Select
                                labelId="dist-kpi-filter"
                                id="demo-controlled-open-select"
                                defaultValue={"target"}
                                open={props.distTrendTopKpiFilterOpen}
                                onClose={props.handleCloseTrendTopKpiFilter}
                                onOpen={props.handleOpenTrendTopKpiFilter}
                                value={props['trendChartFilter']['kpiFilter']}
                                onChange={props.handleChangeTopKpiFilter}
                                className={classes.menuItem}
                            >
                                {["GSV", "tonnes"].indexOf(props['trendChartFilter']['kpiName']) > -1 &&
                                <MenuItem value={"target"} className={classes.menuItem}>
                                    {props.intl.formatMessage({...brandDeepDiveMessages[`vsTarget`]})}
                                </MenuItem>}
                                <MenuItem value={"lastYear"} className={classes.menuItem}>
                                    {props.intl.formatMessage({...brandDeepDiveMessages[`vsHistoricalPerformance`]})}
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl className={classes.formControl}
                                     id={"distributor-trend-filter"}>
                            <Select className={classes.menuItem}
                                    labelId="distributor-filter"
                                    id="demo-controlled-open-select"
                                    defaultValue={"Top 10"}
                                    open={props.topFilterOpen}
                                    onClose={props.handleCloseTopFilterOpen}
                                    onOpen={props.handleOpenTopFilterOpen}
                                    value={props['trendChartFilter']['topFilter']}
                                    onChange={props.handleChangeTopFilter}
                            >
                                <MenuItem className={classes.menuItem} value={"Top 10"}>
                                    {props.intl.formatMessage({...AppMessages[`top_ten`]})}
                                </MenuItem>
                                <MenuItem className={classes.menuItem} value={"Bottom 10"}>
                                    {props.intl.formatMessage({...AppMessages[`bottom_ten`]})}
                                </MenuItem>
                            </Select>
                        </FormControl>

                        {
                            history.location.pathname !== "/RTM/MyPinnedViews" &&
                            <Tooltip title={props.intl.formatMessage({...AppMessages[`pin_the_component`]})}>
                                <IconButton size="small" className={classes.pinButton} onClick={handlePinView}>
                                    <Icon
                                        path={mdiPin}
                                        size={"1vw"}/>
                                </IconButton>
                            </Tooltip>
                        }
                        <Tooltip
                            title={props.intl.formatMessage({...messages[`dist_trend_tooltip_info`]})}>
                            <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                        </Tooltip>
                    </Grid>

                </Grid>
            </Grid>
            <div style={{padding: '1vw'}}>
                {
                    (() => {
                        if (!props['dataFailed']) {
                            if (!props['spinnerState']) {
                                return (
                                    <Grid item xs={12} style={{padding: '2vmin'}}>
                                        <ApexGroupedBarChart height={window.outerHeight / 2}
                                                             options={options}
                                                             series={props['trendChartData']['series']}/>
                                    </Grid>
                                );
                            } else {
                                return <div className={classes.brandTrendChartSyncLoader}>
                                    <SyncLoader size={15} margin={2} color="#0000a0"
                                                loading/>
                                </div>
                            }
                        } else {
                            return <NoDataAlert/>
                        }
                    })()
                }
            </div>
        </Paper>
    );
};

export const DistributorDetailsTable = (props) => {

    useEffect(() => {
        setDistTable(props['trendTableData']);
    }, [props['trendTableData']]);

    const [distTable, setDistTable] = React.useState([]);

    const handleSearchBar = (e) => {
        if (e.target.value) {
            setDistTable(props['trendTableData'].filter((i) => i.distributor.toLowerCase().includes(e.target.value.toLowerCase())));
        } else {
            setDistTable(props['trendTableData']);
        }
    };
    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`distributor_view_distributor_table`]}),
            viewId: "distributor_view_distributor_table",
            apiEnd: "get_distributor_table",
            filters: {}
        })
    };

    return (
        <Paper style={{margin: "2vmin"}} elevation={3}>

            <Grid item xs={12} justify={"center"}>
                {
                    props['dataFailed'] && <NoDataAlert/>
                }
                {
                    !props['dataFailed'] &&
                    <DistributorTable data={distTable}
                                      name={"DistributorView"}
                                      spinnerState={props['spinnerState']}
                                      dataFetchFailed={props['dataFailed']}
                                      selectedFilterData={props.selectedFilterData}
                                      handleSearch={handleSearchBar}
                                      onFilterChange={props.onFilterChange}
                                      handlePinView={handlePinView}/>
                }

            </Grid>
        </Paper>
    );
};

/**
 * THE DISTRIBUTOR VIEW CONTAINER FUNCTION IS USED TO RENDER ALL THE COMPONENTS INSIDE IT AND ALSO TO PASS THE REQUIRED PARAMETERS AND THE DATA TO THE COMPONENTS USED */

export function DistributorView({ //selectors
                                    filterData, selectedFilterData, filterDataFetchFailed, filterDataFetchSpinnerState, distributorView, dataLoadStatus,selectedlocale,
                                    //actions
                                    onFilterChange, filterDataFetch, distributorTrendChartDataFetch, distributorTrendChartOnFilterChange, distributorTrendTableDataFetch,
                                    pinMyPage, changeDataLoadStatus, pinMyView, window, ...props
                                }) {
    useInjectReducer({key: "distributorView", reducer});
    useInjectSaga({key: "distributorView", saga});

    const [filterState, setFilterState] = React.useState({
        "recent_selected": "",
        "recent_selected_dropdown_values": [],
        "chain": [],
        "manager": [],
        "coordinator": [],
        "timeRange": "YTD",
        "brand": [],
        "category": [],
        "distributor": [],
        "technology": [],
        "channel": [],
        "region": [],
        "store": [],
        "customer": [],
        "gp": [],
        "salesRep": [],
        "compare": "Last Year"
    });
    useEffect(() => {
        setFilterState(selectedFilterData);
    }, [selectedFilterData]);

    useEffect(() => {
        if (filterData['region'].length === 0) {
            filterDataFetch(selectedFilterData);
        }
        if (selectedFilterData['pinPage']) {
            distributorTrendChartDataFetch();
            distributorTrendTableDataFetch();
            onFilterChange({...selectedFilterData, pinPage: false});
        } else if (!dataLoadStatus.distView) {
            distributorTrendChartDataFetch();
            distributorTrendTableDataFetch();
            changeDataLoadStatus({...dataLoadStatus, distView: true});
        } else {
            if (distributorView['trendChartData'].length === 0) {
                distributorTrendChartDataFetch();
            }
            if (distributorView['trendTableData'].length === 0) {
                distributorTrendTableDataFetch();
            }
        }

    }, []);
    useEffect(()=>{
        distributorTrendChartDataFetch();
    },[selectedlocale]);

    const fetchData = () => {

        onFilterChange(filterState);


        distributorTrendChartDataFetch();
        distributorTrendTableDataFetch();
    };
    const reset = () => {
        onFilterChange({
            "recent_selected": "",
            "recent_selected_dropdown_values": [],
            "chain": [],
            "manager": [],
            "coordinator": [],
            "timeRange": "YTD",
            "compare": "Last Year",
            "brand": [],
            "category": [],
            "distributor": [],
            "technology": [],
            "channel": [],
            "region": [],
            "store": [],
            "customer": [],
            "gp": [],
            "salesRep": []
        });

        distributorTrendChartDataFetch();
        distributorTrendTableDataFetch();

        filterDataFetch(
            {
                "recent_selected": "",
                "recent_selected_dropdown_values": [],
                "chain": [],
                "manager": [],
                "coordinator": [],
                "timeRange": "YTD",
                "compare": "Last Year",
                "brand": [],
                "category": [],
                "distributor": [],
                "technology": [],
                "channel": [],
                "region": [],
                "store": [],
                "customer": [],
                "gp": [],
                "salesRep": []
            }
        );
    };
    const [topFilterOpen, setTopFilterOpen] = React.useState(false);
    const handleOpenTopFilterOpen = () => setTopFilterOpen(true);
    const handleCloseTopFilterOpen = () => setTopFilterOpen(false);
    const handleChangeTopFilter = (e) => {
        distributorTrendChartOnFilterChange({...distributorView['trendChartFilter'], 'topFilter': e.target.value});
        distributorTrendChartDataFetch();
    };
    const handleKPIButtonClick = (kpi) => {
        if (kpi === "invoice" || kpi === "units" || kpi === "WOS" || kpi === "POS") {
            distributorTrendChartOnFilterChange({
                ...distributorView['trendChartFilter'],
                'kpiFilter': 'lastYear',
                'kpiName': kpi
            });
        } else {
            distributorTrendChartOnFilterChange({
                ...distributorView['trendChartFilter'],
                'kpiFilter': 'target',
                'kpiName': kpi
            });

        }
        distributorTrendChartDataFetch();
    };
    const classes = useStyles();

    const handleChangeTimeRange = (value) => {
        if (value.value === 'YTD') {
            // onFilterChange({...selectedFilterData, 'timeRange': value, 'compare': 'Last Year'});
            onFilterChange({...filterState, 'timeRange': value.value, 'compare': 'Last Year'});
        } else {
            // onFilterChange({...selectedFilterData, 'timeRange': value, 'compare': 'Current Year'});
            onFilterChange({...filterState, 'timeRange': value.value, 'compare': 'Current Year'});
        }
        // fetchData();
        distributorTrendChartDataFetch();
        distributorTrendTableDataFetch();
    };

    const handleChangeCompareTimeRange = (value) => {
        // onFilterChange({...selectedFilterData, 'compare': value});
        onFilterChange({...filterState, 'compare': value.value});
        // fetchData();
        distributorTrendChartDataFetch();
        distributorTrendTableDataFetch();
    };

    const [openPinPage, setOpenPinPage] = React.useState(false);

    const [pinPageParams, setPinPageParams] = React.useState({pinName: ""});

    const handlePinPageNameInput = (event) => {
        setPinPageParams({...pinPageParams, "pinName": event.target.value});
    };
    const [distTrendTopKpiFilterOpen, setDistTrendTopKpiFilter] = React.useState(false);
    const handleCloseTrendTopKpiFilter = () => {
        setDistTrendTopKpiFilter(false);
    };
    const handleOpenTrendTopKpiFilter = () => {
        setDistTrendTopKpiFilter(true);
    };

    const handleChangeTopKpiFilter = (e) => {
        distributorTrendChartOnFilterChange({...distributorView['trendChartFilter'], 'kpiFilter': e.target.value});
        distributorTrendChartDataFetch();
    };

    return (
        <div id={"distributorView"}>
            <Helmet>
                <title>DistributorView</title>
                <meta name="description" content="Description of DistributorView"/>
            </Helmet>

            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <Box boxShadow={4} elevation={3} style={{margin: "2vmin"}}>
                            <SideFilter filterData={filterData}
                                // selectedFilter={selectedFilterData}
                                        selectedFilter={filterState}
                                        spinnerState={filterDataFetchSpinnerState}
                                        dataFetchFailed={filterDataFetchFailed} fetchData={fetchData}
                                // onFilterChange={onFilterChange}
                                        onFilterChange={setFilterState}
                                        filterDataFetch={filterDataFetch}
                                        reset={reset}/>
                        </Box>
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10}>
                        <TitleHeader title={props.intl.formatMessage({...messages[`header`]})} setOpenPinPage={setOpenPinPage}
                                     selectedFilterData={selectedFilterData}
                                     handleChangeTimeRange={handleChangeTimeRange}
                                     handleChangeCompareTimeRange={handleChangeCompareTimeRange}
                                     tooltipData={props.intl.formatMessage({...messages[`header_tooltip_info_text`]})}
                                     exportPdf={() => exportPdf("distributorView", `${props.intl.formatMessage({...messages[`header`]})} - RTM.pdf`)}/>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <DistributorTrendChartView
                                    handleKPIButtonClick={handleKPIButtonClick}
                                    trendChartFilter={distributorView['trendChartFilter']}
                                    distTrendTopKpiFilterOpen={distTrendTopKpiFilterOpen}
                                    handleCloseTrendTopKpiFilter={handleCloseTrendTopKpiFilter}
                                    handleOpenTrendTopKpiFilter={handleOpenTrendTopKpiFilter}
                                    handleChangeTopKpiFilter={handleChangeTopKpiFilter}
                                    topFilterOpen={topFilterOpen}
                                    handleCloseTopFilterOpen={handleCloseTopFilterOpen}
                                    handleOpenTopFilterOpen={handleOpenTopFilterOpen}
                                    handleChangeTopFilter={handleChangeTopFilter}
                                    dataFailed={distributorView['trendChartDataFetchFailed']}
                                    spinnerState={distributorView['trendChartDataFetchSpinnerState']}
                                    trendChartData={distributorView['trendChartData']}
                                    onFilterChange={onFilterChange}
                                    selectedFilterData={selectedFilterData}
                                    pinMyView={pinMyView}
                                    {...props}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <DistributorDetailsTable
                                    dataFailed={distributorView['trendTableDataFetchFailed']}
                                    spinnerState={distributorView['trendTableDataFetchSpinnerState']}
                                    trendTableData={distributorView['trendTableData']}
                                    selectedFilterData={selectedFilterData}
                                    onFilterChange={onFilterChange}
                                    pinMyView={pinMyView}
                                    {...props}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <ScrollTop window={window}>
                    <Fab color="primary" size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon/>
                    </Fab>
                </ScrollTop>


            </Paper>
            <Dialog
                open={openPinPage}
                onClose={() => setOpenPinPage(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="form-dialog-title">
                    <Typography className={classes.dialogHeading}>
                        {props.intl.formatMessage({...AppMessages[`bookMarkPage`]})}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="pinName"
                        label={props.intl.formatMessage({...AppMessages[`bookMarkName`]})}
                        autoFocus
                        fullWidth
                        InputProps={{
                            classes: {
                                input: classes.textFieldInput,
                            },
                        }}
                        className={classes.textField}
                        required
                        onChange={handlePinPageNameInput}
                        value={pinPageParams['pinName']}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="outlined" onClick={() => {
                        setOpenPinPage(false);
                        setPinPageParams({pinName: ""})
                    }} size={"small"}
                            className={classes.buttonStyle}>
                        {props.intl.formatMessage({...AppMessages[`cancel`]})}
                    </Button>
                    <Button color="primary" variant="contained" onClick={() => {
                        let params = {...pinPageParams};
                        params = {
                            ...params, "pageName": "Distributor View",
                            "pageLink": history.location.pathname + history.location.search,
                            "pinId": 1
                        };
                        pinMyPage(params);
                        setOpenPinPage(false);
                    }} size={"small"}
                            disabled={!pinPageParams['pinName']}
                            className={classes.buttonStyle}>
                        {props.intl.formatMessage({...AppMessages[`submit`]})}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

DistributorView.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    filterDataFetch: PropTypes.func.isRequired,
    distributorTrendChartDataFetch: PropTypes.func.isRequired,
    distributorTrendChartOnFilterChange: PropTypes.func.isRequired,
    distributorTrendTableDataFetch: PropTypes.func.isRequired,
    pinMyPage: PropTypes.func.isRequired,
    changeDataLoadStatus: PropTypes.func.isRequired,
    pinMyView: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    distributorView: makeSelectDistributorView(),
    filterData: makeSelectFilterData(),
    selectedFilterData: makeSelectSelectedFilters(),
    filterDataFetchFailed: makeSelectFilterDataFail(),
    filterDataFetchSpinnerState: makeSelectFilterDataSpinnerState(),
    dataLoadStatus: makeSelectDataLoadStatus(),
    selectedlocale: makeSelectLocale(),
});

export function mapDispatchToProps(dispatch) {
    return {
        onFilterChange: (data) => dispatch(selectedFilterOnChange(data)),
        filterDataFetch: (data) => dispatch(filterDataFetch(data)),
        distributorTrendChartDataFetch: () => dispatch(distributorTrendChartDataFetch()),
        distributorTrendChartOnFilterChange: (data) => dispatch(distributorTrendChartOnFilterChange(data)),
        distributorTrendTableDataFetch: () => dispatch(distributorTrendTableDataFetch()),
        pinMyPage: (data) => dispatch(pinMyPage(data)),
        changeDataLoadStatus: (data) => dispatch(changeDataLoadStatus(data)),
        pinMyView: (data) => dispatch(pinMyView(data))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    withConnect,
    memo, injectIntl
)(DistributorView);
