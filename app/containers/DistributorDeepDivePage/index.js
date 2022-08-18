/**
 *
 * DistributorDeepDivePage
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
import makeSelectDistributorDeepDivePage, {
    makeSelectChannelPerformanceSuccess,
    makeSelectDistributorCardsSuccess,
    makeSelectDistributorSalesPerformanceSuccess,
    makeSelectProductPerformanceSuccess,
    makeSelectStorePerformanceSuccess,
    makeSelectStoreTableSuccess,
    makeSelectVisitSalesBubbleSuccess
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import {Box, Button, Grid, Paper, TextField, Tooltip, Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SideFilter from "../../components/SideFilter";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {makeSelectDistributorName} from "../DistributorView/selectors";
import {
    makeSelectFilterData,
    makeSelectFilterDataFail,
    makeSelectFilterDataSpinnerState,
    makeSelectSelectedFilters
} from "../App/selectors";
import {filterDataFetch, pinMyPage, pinMyView, resetDeepDive, selectedFilterOnChange} from "../App/actions";
import {
    channelPerformanceButtonOnChange,
    channelPerformanceClickOnChange,
    channelPerformanceFetch,
    channelPerformanceFilter,
    distributorCardsFetch,
    distributorSalesPerformanceButtonVsOnChange,
    distributorSalesPerformanceFetch,
    distributorSalesPerformanceKpiButtonOnChange,
    productPerformanceButtonOnChange,
    productPerformanceFetch,
    storePerformanceButtonOnChange,
    storePerformanceFetch,
    storePerformanceFilter,
    storeTableFetch,
    storeTableOnChange,
    toggleCard,
    visitSalesBubbleFetch,
    visitSalesBubbleFilterOnChange
} from "./actions";
import clsx from "clsx";
import {SyncLoader} from "react-spinners";
import NoDataAlert from "../../components/NoDataAlert";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import history from "../../utils/history";
import {exportCSVFile, exportPdf} from "../../utils/utility";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import VisitvsSalesChart from "../../components/VisitvsSalesChart";
import ApexParetoChart from "../../components/ApexParetoChart";
import ApexGroupedBarChart from "../../components/ApexGroupedBarChart";
import DistributorDeepdiveTable from "../../components/DistributorDeepdiveTable";
import TitleHeader from "../../components/TitleHeader/Loadable";
import Icon from "@mdi/react";
import {mdiPin} from "@mdi/js";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import DistributorCard from "../../components/DistributorCard";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import InfoIcon from "@material-ui/icons/Info";
import {injectIntl} from "react-intl";
import messages from "./messages";
import AppMessages from "../App/messages";
import {makeSelectLocale} from "../LanguageProvider/selectors";
import PurchaseAnalysisMessages from "../../components/PurchaseAnalysisCard/messages";
import brandDeepMessages from "../BrandDeepDivePage/messages";
/** Styles class*/
const useStyles = makeStyles((theme) => ({
    scrollButton: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    paper: {
        width: "100%",
        textAlign: "center",
        verticalAlign: "middle",
        height: "100%"
    },
    title: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1vw',
        color: '#0000a0e6',
        padding: '1vw',
        margin: '1vmin'
    },
    poptitle: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1vw',
        color: '#0000a0e6',
        padding: '1vw',
        margin: '1vmin'
    },
    formControl: {
        margin: '1vmin',
        minWidth: '10vw',
        fontSize: '0.95vw',
        fontFamily: 'MarsCentra-Book',
        color: 'rgb(0,215,185)'
    },
    formControlGrid: {
        margin: '1vmin',
        // paddingRight:'0.5vw',
        minWidth: '4vw',
        fontSize: '0.9vw',
        fontFamily: 'MarsCentra-Book',
        color: 'rgb(0,215,185)'
    },
    grid: {
        padding: '3px',
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        width: '100%',
    },
    distributorPerformanceButton: {
        margin: "1vmin",
        fontSize: '0.7vw',
        color: "black",
        backgroundColor: "#fff",
        border: '0.2vmin solid #0000a0',
        fontFamily: "MarsCentra-Book",
        textTransform: 'none',
        borderRadius: "1vmin",
        '&:hover': {
            color: "white",
            backgroundColor: "#0000a0",
        }
    },
    distributorPerformanceButtonActive: {
        margin: "1vmin",
        fontSize: '0.7vw',
        color: "white",
        backgroundColor: "#0000a0",
        fontFamily: "MarsCentra-Book",
        textTransform: 'none',
        borderRadius: "1vmin",
        '&:hover': {
            color: "white",
            backgroundColor: "#0000a0",
        }
    },
    largeFormControl: {
        margin: '1vmin',
        minWidth: '4vw',
        fontSize: '0.95vw',
        fontFamily: 'MarsCentra-Book',
        color: 'rgb(0,215,185)'
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
        fontSize: '0.8vw',
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
        fontSize: "0.9vw",
        textTransform: 'none',
        borderRadius: "1vmin"
    },
    cardsSyncLoader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '22vh',
        width: "100%"
    },
    visitVsSalesPaper: {
        width: "100%",
        marginRight: '0.8vw',
        height: '87%',
    },
    bubbleSyncLoader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '22vh',
        width: "100%"
    },
    productPerformanceSyncLoader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30vh',
    },
    salesPerformanceSyncLoader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30vh',
    },
    channelPerformanceSyncLoader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30vh',
        width: "100%"
    },
    storePerformancePopSyncLoader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30vh',
        width: "100%"
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

export const DistributorSalesPerformanceView = (props) => {
    const classes = useStyles();
    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`distributor_deep_dive_sales_performance_view`]}),
            viewId: "distributor_deep_dive_sales_performance_view",
            apiEnd: "get_distributor_performance",
            filters: {
                kpiButtons: props['distributorSalesPerformanceKpiButton'],
                selectionButtons: props['distributorSalesPerformanceButton']
            }
        })
    };
    const getLabel = () => {
        switch (props['distributorSalesPerformanceKpiButton']) {
            case 'GSV':
                return props.intl.formatMessage({...AppMessages[`kpi_gsv`]});
            case 'Invoice':
                return props.intl.formatMessage({...AppMessages[`kpi_invoice`]});
            case 'Units':
                return props.intl.formatMessage({...AppMessages[`kpi_units`]});
            case 'Tonnes':
                return props.intl.formatMessage({...AppMessages[`kpi_tonnes`]});
            case 'WOS':
                return props.intl.formatMessage({...AppMessages[`kpi_wos`]});
        }
    };

    const optionsTrendDistributor = {
        colors: ['#00d7b9', '#0000a0'],
        chart: {
            type: 'bar',
            toolbar: {
                show: true,
                export: {
                    csv: {
                        filename: `${props.intl.formatMessage({...AppMessages[`distributor_deep_dive_sales_performance_view`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                        columnDelimiter: ',',
                        headerCategory: props.intl.formatMessage({...AppMessages[`period`]}),
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: `${props.intl.formatMessage({...AppMessages[`distributor_deep_dive_sales_performance_view`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                    png: {
                        filename: `${props.intl.formatMessage({...AppMessages[`distributor_deep_dive_sales_performance_view`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    }
                },
            },
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
                horizontal: false,
                dataLabels: {
                    position: 'top',
                },
            }
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
                offsetX: 8,
                offsetY: 0,
                style: {
                    color: '#000',
                    fontSize: '0.9vw',
                    fontFamily: 'MarsCentra-Bold',
                },
            }
        },
        xaxis: {

            categories: props['distributorSalesPerformanceData']['xAxis'],
            labels: {
                formatter: function (value) {
                    return value ? value : value;
                },
                rotate: -40,
                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book',
                },

            },
            title: {
                text: props.intl.formatMessage({...AppMessages[`period`]}),
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: '#000',
                    fontSize: '0.9vw',
                    fontFamily: 'MarsCentra-Bold',
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
            style: {
                fontSize: '0.8vw',
                fontFamily: 'MarsCentra-Book',
            },
        }
    };
    return (
        <Paper style={{margin: "2vmin", height: "70vh"}} elevation={3}>
            <Grid container>
                <Grid item container xs={12} sm={12} md={12} lg={12}>
                    <Grid container item xs={12}>
                        <Grid container item xs={8} justify={"flex-start"}>
                            <Typography className={classes.title}>{props.intl.formatMessage({...messages[`distributorSalesPerformance`]})}</Typography>
                        </Grid>
                        <Grid container justify={"flex-end"} alignItems={"center"} item xs={4}>

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

                            <Tooltip title={props.intl.formatMessage({...messages[`trendChartsTooltipText`]})}>
                                <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                            </Tooltip>
                        </Grid>

                    </Grid>
                    <Grid item container xs={12} justify={"flex-end"} alignItems={"center"}
                          style={{paddingRight: '1vw'}}>
                        <Button
                            size="small"
                            variant="contained"
                            className={clsx({
                                [classes.distributorPerformanceButton]: props['distributorSalesPerformanceKpiButton'] !== 'Invoice',
                                [classes.distributorPerformanceButtonActive]: props['distributorSalesPerformanceKpiButton'] === 'Invoice'
                            })}
                            onClick={() => props.handleDistributorSalesButtonClick('Invoice')}
                        >
                            {props.intl.formatMessage({...AppMessages[`kpi_invoice`]})}
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            className={clsx({
                                [classes.distributorPerformanceButton]: props['distributorSalesPerformanceKpiButton'] !== 'GSV',
                                [classes.distributorPerformanceButtonActive]: props['distributorSalesPerformanceKpiButton'] === 'GSV'
                            })}
                            onClick={() => props.handleDistributorSalesButtonClick('GSV')}
                        >
                            {props.intl.formatMessage({...AppMessages[`kpi_gsv`]})}
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            className={clsx({
                                [classes.distributorPerformanceButton]: props['distributorSalesPerformanceKpiButton'] !== 'Units',
                                [classes.distributorPerformanceButtonActive]: props['distributorSalesPerformanceKpiButton'] === 'Units'
                            })}
                            onClick={() => props.handleDistributorSalesButtonClick('Units')}
                        >
                            {props.intl.formatMessage({...AppMessages[`kpi_units`]})}
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            className={clsx({
                                [classes.distributorPerformanceButton]: props['distributorSalesPerformanceKpiButton'] !== 'Tonnes',
                                [classes.distributorPerformanceButtonActive]: props['distributorSalesPerformanceKpiButton'] === 'Tonnes'
                            })}
                            onClick={() => props.handleDistributorSalesButtonClick('Tonnes')}
                        >
                            {props.intl.formatMessage({...AppMessages[`kpi_tonnes`]})}
                        </Button>
                        <FormControl className={classes.formControlGrid}
                                     id={"dist-sales-trend-kpi-filter"}>
                            <Select
                                labelId="dist-kpi-filter"
                                id="demo-controlled-open-select"
                                defaultValue={"target"}
                                open={props.distTrendTopKpiFilterOpen}
                                onClose={props.handleCloseTrendTopKpiFilter}
                                onOpen={props.handleOpenTrendTopKpiFilter}
                                value={props['distributorSalesPerformanceButton']}
                                onChange={props.handleChangeTopKpiFilter}
                                className={classes.menuItem}
                            >
                                {["GSV", "Tonnes"].indexOf(props['distributorSalesPerformanceKpiButton']) > -1 &&
                                <MenuItem value={"target"} className={classes.menuItem}> {props.intl.formatMessage({...messages[`vsTarget`]})}</MenuItem>}
                                <MenuItem value={"lastYear"} className={classes.menuItem}>{props.intl.formatMessage({...messages[`vsHistoricalPerformance`]})}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}
                  style={{padding: "1vw"}}>
                {
                    (() => {
                        if (!props['dataFailed']) {
                            if (!props['spinnerState']) {
                                return (
                                    <div style={{padding: '2vmin'}}>
                                        <ApexGroupedBarChart
                                            options={optionsTrendDistributor}
                                            series={props['distributorSalesPerformanceData']['series']}
                                            height={window.outerHeight / 2.7}/>
                                    </div>
                                )

                            } else {
                                return <div className={classes.salesPerformanceSyncLoader}>
                                    <SyncLoader size={15} margin={2} color="#0000a0"
                                                loading/>
                                </div>
                            }
                        } else {
                            return <NoDataAlert/>
                        }
                    })()
                }
            </Grid>

        </Paper>
    );
};

export const DistributorProductsPerformanceView = (props) => {
    const classes = useStyles();
    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`distributor_deep_dive_product_performance_view`]}),
            viewId: "distributor_deep_dive_product_performance_view",
            apiEnd: "get_product_performance",
            filters: {
                selectionButtons: props['paretoButtonData']
            }
        })
    };
    const getLabelPareto = () => {
        switch (props['paretoButtonData']) {
            case 'GSV':
                return props.intl.formatMessage({...AppMessages[`kpi_gsv`]});
            case 'Invoice':
                return props.intl.formatMessage({...AppMessages[`kpi_invoice`]});
            case 'Units':
                return props.intl.formatMessage({...AppMessages[`kpi_units`]});
            case 'Tonnes':
                return props.intl.formatMessage({...AppMessages[`kpi_tonnes`]});
            case 'WOS':
                return props.intl.formatMessage({...AppMessages[`kpi_wos`]});
        }
    };
    const optionsPareto = {
        colors: ['#00d7b9', '#0000a0'],
        chart: {
            type: 'line',
            toolbar: {
                show: true,
                export: {
                    csv: {
                        filename: `${props.intl.formatMessage({...AppMessages[`distributor_deep_dive_product_performance_view`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                        columnDelimiter: ',',
                        headerCategory: props.intl.formatMessage({...brandDeepMessages[`product`]}),
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: `${props.intl.formatMessage({...AppMessages[`distributor_deep_dive_product_performance_view`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                    png: {
                        filename: `${props.intl.formatMessage({...AppMessages[`distributor_deep_dive_product_performance_view`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    }
                },
            },
            events: {
                dataPointMouseEnter: function (event) {
                    event.path[0].style.cursor = "auto";
                }, mouseMove: function (event) {
                    event.path[0].style.cursor = "auto";
                },
            },
            locales: [
                {
                    "name": "en",
                    "options": {
                        "toolbar": {
                            "exportToSVG": "Download SVG",
                            "exportToPNG": "Download PNG",
                            "menu": "Menu",
                            "selection": "Selection",
                            "selectionZoom": "Selection Zoom",
                            "zoomIn": "Zoom In",
                            "zoomOut": "Zoom Out",
                            "pan": "Panning",
                            "reset": "Reset Zoom"
                        }
                    }
                },
                {
                    "name": "pt",
                    "options": {
                        "toolbar": {
                            "exportToSVG": "Download SVG",
                            "exportToPNG": "Download PNG",
                            "menu": "Menu",
                            "selection": "Selecionar",
                            "selectionZoom": "Selecionar zoom",
                            "zoomIn": "Aumentar zoom",
                            "zoomOut": "Reduzir o zoom",
                            "pan": "Painel",
                            "reset": "Redefinir zoom"
                        }
                    }
                }],
            defaultLocale: props.intl['locale']
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
        stroke: {
            width: [0, 4]
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1],
            formatter: function (value) {
                return new Intl.NumberFormat('pt-BR').format(value.toFixed(2));
            }
        },
        xaxis: {
            categories: props['productPerformanceData']['xAxis'],
            labels: {
                trim: true,
                rotateAlways: false,
                rotate: -30,
                hideOverlappingLabels: false,
                maxHeight: 45,
                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book',
                },

            },
        },

        tooltip: {
            enabled: true,
            theme: 'dark',
            x: {
                show: true,
                formatter: function (value) {
                    return props['productPerformanceData']['xAxis'][value - 1];

                },
                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book',
                },

            },
            y: [
                {
                    show: true,
                    formatter: function (value) {
                        return value ? new Intl.NumberFormat('pt-BR').format(value) : value;

                    },
                },
                {
                    opposite: true,
                    formatter: function (value) {
                        return value ? new Intl.NumberFormat('pt-BR').format(value) + "%" : value;

                    },

                }
            ]
        },
        yaxis: [
            {
                title: {
                    text: getLabelPareto(),
                    style: {
                        color: '#000',
                        fontSize: '0.8vw',
                        fontFamily: 'MarsCentra-Bold',
                    },
                },
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
                }

            }, {
                opposite: true,
                title: {
                    text: props.intl.formatMessage({...messages[`cumulativePercent`]}),
                    style: {
                        color: '#000',
                        fontSize: '0.8vw',
                        fontFamily: 'MarsCentra-Bold',
                    },
                },
                labels: {
                    formatter: function (value) {
                        if (value) {

                            if ((value >= 1000 && value < 100000) || (value <= -1000 && value > -100000)) {
                                return new Intl.NumberFormat('pt-BR').format((value / 1000).toFixed(1)) + "K" + "%";
                            } else if (value >= 100000 || value <= -100000) {
                                return new Intl.NumberFormat('pt-BR').format((value / 1000000).toFixed(1)) + "M" + "%";
                            } else if (value < 1000 || value > -1000) {
                                return new Intl.NumberFormat('pt-BR').format(value.toFixed(0)) + "%";
                            }
                        }
                    },
                    style: {
                        fontSize: '0.7vw',
                        fontFamily: 'MarsCentra-Book',
                    },
                }
            }]
    };

    return (
        <Paper style={{margin: "2vmin", height: "70vh"}} elevation={3}>
            <Grid container>
                <Grid item xs={6} sm={6} md={6} lg={6} style={{textAlign: "start"}}>
                    <Typography className={classes.title}>{props.intl.formatMessage({...messages[`productPerformance`]})}</Typography>

                </Grid>
                <Grid item xs={6} container justify={"flex-end"} alignItems={"center"}>
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

                    <Tooltip title={props.intl.formatMessage({...messages[`trendChartsTooltipText`]})}>
                        <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                    </Tooltip>
                </Grid>
                <Grid item container xs={12} justify={"flex-end"} style={{paddingRight: '1vw'}}>
                    <Button
                        size="small"
                        variant="contained"
                        className={clsx({
                            [classes.distributorPerformanceButton]: props['paretoButtonData'] !== 'Invoice',
                            [classes.distributorPerformanceButtonActive]: props['paretoButtonData'] === 'Invoice'
                        })}
                        onClick={() => props.paretoButtonClick('Invoice')}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_invoice`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        className={clsx({
                            [classes.distributorPerformanceButton]: props['paretoButtonData'] !== 'GSV',
                            [classes.distributorPerformanceButtonActive]: props['paretoButtonData'] === 'GSV'
                        })}
                        onClick={() => props.paretoButtonClick('GSV')}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_gsv`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        className={clsx({
                            [classes.distributorPerformanceButton]: props['paretoButtonData'] !== 'Units',
                            [classes.distributorPerformanceButtonActive]: props['paretoButtonData'] === 'Units'
                        })}
                        onClick={() => props.paretoButtonClick('Units')}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_units`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        className={clsx({
                            [classes.distributorPerformanceButton]: props['paretoButtonData'] !== 'Tonnes',
                            [classes.distributorPerformanceButtonActive]: props['paretoButtonData'] === 'Tonnes'
                        })}
                        onClick={() => props.paretoButtonClick('Tonnes')}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_tonnes`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        className={clsx({
                            [classes.distributorPerformanceButton]: props['paretoButtonData'] !== 'WOS',
                            [classes.distributorPerformanceButtonActive]: props['paretoButtonData'] === 'WOS'
                        })}
                        onClick={() => props.paretoButtonClick('WOS')}
                    >
                       WOS
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}
                      style={{padding: "2vw 0.6vw 0 0.2vw"}}>
                    {
                        (() => {
                            if (!props['dataFailed']) {
                                if (!props['spinnerState']) {
                                    return (
                                        <ApexParetoChart
                                            series={props['productPerformanceData']['series']}
                                            options={optionsPareto}
                                            height={window.outerHeight / 2.7}
                                            paretoButtonData={props.paretoButtonData}
                                            paretoButtonClick={props.paretoButtonClick}
                                        />);

                                } else {
                                    return <div
                                        className={classes.productPerformanceSyncLoader}>
                                        <SyncLoader size={15} margin={2} color="#0000a0"
                                                    loading/>
                                    </div>
                                }
                            } else {
                                return <NoDataAlert/>
                            }
                        })()
                    }
                </Grid>
            </Grid>
        </Paper>
    );
};

export const DistributorChannelPerformance = (props) => {
    const classes = useStyles();

    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`distributor_deep_dive_channel_performance_view`]}),
            viewId: "distributor_deep_dive_channel_performance_view",
            apiEnd: "get_distributor_channel_performance",
            filters: {
                topFilter: props['channelFilter'],
                selectionButtons: props['channelButton']
            }
        })
    };
    const getLabelChannel = () => {
        switch (props['channelButton']) {
            case 'GSV':
                return props.intl.formatMessage({...AppMessages[`kpi_gsv`]});
            case 'Invoice':
                return props.intl.formatMessage({...AppMessages[`kpi_invoice`]});
            case 'Units':
                return props.intl.formatMessage({...AppMessages[`kpi_units`]});
            case 'Tonnes':
                return props.intl.formatMessage({...AppMessages[`kpi_tonnes`]});
            case 'WOS':
                return props.intl.formatMessage({...AppMessages[`kpi_wos`]});
        }
    };
    const eventsChannel = {
        click: function (event, chartContext, config,) {
            let dataPointIndex = config['dataPointIndex'];
            let series = config['config']['xaxis']['categories'];
            let name = series[dataPointIndex];
            if (dataPointIndex !== -1) {
                props.handleOpenStoresDialog();
                props.setSelectedChannel(name);
                props.storePerformanceDataFetch(name);
            }
        }
    };
    const optionsTrendChannel = {
        colors: ['#00d7b9', '#0000a0'],
        chart: {
            type: 'bar',
            toolbar: {
                show: true,
                export: {
                    csv: {
                        filename: `${props.intl.formatMessage({...AppMessages[`distributor_deep_dive_channel_performance_view`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                        columnDelimiter: ',',
                        headerCategory: props.intl.formatMessage({...AppMessages[`channel`]}),
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: `${props.intl.formatMessage({...AppMessages[`distributor_deep_dive_channel_performance_view`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                    png: {
                        filename: `${props.intl.formatMessage({...AppMessages[`distributor_deep_dive_channel_performance_view`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                }
            },
            events: eventsChannel,
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
        noData: {
            text: props.intl.formatMessage({...AppMessages[`no_data_combination`]}),
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
                text: getLabelChannel(),
                rotate: -90,
                offsetX: 7,
                offsetY: 0,
                style: {
                    color: '#000',
                    fontSize: '0.9vw',
                    fontFamily: 'MarsCentra-Bold',
                },
            }
        },
        xaxis: {

            categories: props['channelPerformanceData']['xAxis'],
            labels: {
                trim: true,
                rotateAlways: false,
                rotate: -30,
                hideOverlappingLabels: false,
                maxHeight: 80,
                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book',
                },

            },
            title: {
                text: props.intl.formatMessage({...AppMessages[`channel`]}),
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: '#000',
                    fontSize: '0.9vw',
                    fontFamily: 'MarsCentra-Bold',
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
            style: {
                fontSize: '0.8vw',
                fontFamily: 'MarsCentra-Book',
            },

        }
    };
    return (
        <Paper style={{margin: "2vmin", height: '69vh'}} elevation={3}>
            <Grid container>
                <Grid item xs={5} sm={5} md={5} lg={5} style={{textAlign: "start"}}>
                    <Typography className={classes.title}>{props.intl.formatMessage({...messages[`channelPerformance`]})}</Typography>
                </Grid>
                <Grid item container xs={7} sm={7} md={7} lg={7}
                      style={{padding: '0.6vw'}} justify={"flex-end"} alignItems={"center"}>
                    <FormControl className={classes.formControlGrid}
                                 id={"channel-performance-filter"}>
                        <Select className={classes.menuItem}
                                labelId="distributor-deep-dive-filter"
                                id="demo-controlled-open-select"
                                open={props.channelFilterOpen}
                                onClose={props.handleCloseChannelFilter}
                                onOpen={props.handleOpenChannelFilter}
                                value={props['channelFilter']}
                                onChange={props.handleChannelFilter}
                                defaultValue={"Top 10"}>
                            <MenuItem className={classes.menuItem} value={"Top 10"}>{props.intl.formatMessage({...AppMessages[`top_ten`]})}</MenuItem>
                            <MenuItem className={classes.menuItem} value={"Bottom 10"}>{props.intl.formatMessage({...AppMessages[`bottom_ten`]})}</MenuItem>
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
                        title={props.intl.formatMessage({...messages[`channelTooptipText`]})}>
                        <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                    </Tooltip>
                </Grid>
                <Grid item container xs={12} sm={12} md={12} lg={12}
                      style={{paddingRight: '1vw'}} justify={"flex-end"} alignItems={"center"}>
                    <Button
                        size="small"
                        variant="contained"
                        className={clsx({
                            [classes.distributorPerformanceButton]: props['channelButton'] !== 'Invoice',
                            [classes.distributorPerformanceButtonActive]: props['channelButton'] === 'Invoice'
                        })}
                        onClick={() => props.channelButtonClick('Invoice')}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_invoice`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        className={clsx({
                            [classes.distributorPerformanceButton]: props['channelButton'] !== 'GSV',
                            [classes.distributorPerformanceButtonActive]: props['channelButton'] === 'GSV'
                        })}
                        onClick={() => props.channelButtonClick('GSV')}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_gsv`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        className={clsx({
                            [classes.distributorPerformanceButton]: props['channelButton'] !== 'Units',
                            [classes.distributorPerformanceButtonActive]: props['channelButton'] === 'Units'
                        })}
                        onClick={() => props.channelButtonClick('Units')}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_units`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        className={clsx({
                            [classes.distributorPerformanceButton]: props['channelButton'] !== 'Tonnes',
                            [classes.distributorPerformanceButtonActive]: props['channelButton'] === 'Tonnes'
                        })}
                        onClick={() => props.channelButtonClick('Tonnes')}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_tonnes`]})}
                    </Button>
                    {/*<Button*/}
                    {/*    size="small"*/}
                    {/*    variant="contained"*/}
                    {/*    className={clsx({*/}
                    {/*        [classes.distributorPerformanceButton]: props['channelButton'] !== 'WOS',*/}
                    {/*        [classes.distributorPerformanceButtonActive]: props['channelButton'] === 'WOS'*/}
                    {/*    })}*/}
                    {/*    onClick={() => props.channelButtonClick('WOS')}*/}
                    {/*>*/}
                    {/*    WOS*/}
                    {/*</Button>*/}
                </Grid>
            </Grid>
            {
                (() => {
                    if (!props['dataFailed']) {
                        if (!props['spinnerState']) {
                            return (
                                <Grid xs={12} style={{padding: '2vmin'}}>
                                    <ApexGroupedBarChart options={optionsTrendChannel}
                                                         series={props['channelPerformanceData']['series']}
                                                         height={window.outerHeight / 2.4}/>
                                </Grid>
                            )
                        } else {
                            return (
                                <Grid item xs={12} sm={12} md={12} lg={12}
                                      className={classes.grid}
                                      style={{marginTop: "2vmin"}}>
                                    <div className={classes.channelPerformanceSyncLoader}>
                                        <SyncLoader size={15} margin={2} color="#0000a0"
                                                    loading/>
                                    </div>
                                </Grid>
                            );
                        }
                    } else {
                        return <NoDataAlert/>;
                    }
                })()
            }
        </Paper>
    );
};

export const DistributorStorePerformance = (props) => {
    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`distributor_deep_dive_view_store_performance_table`]}),
            viewId: "distributor_deep_dive_view_store_performance_table",
            apiEnd: "get_store_performance",
            filters: {
                selectionButtons: props['storeTableButton']
            }
        })
    };
    return (
        <Paper style={{
            margin: "2vmin", height: '69vh',
        }} elevation={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Paper style={{margin: "1vmin"}} elevation={0}>
                    <DistributorDeepdiveTable
                        selectedItems={props['selectedItems']}
                        data={props['storeTableData']}
                        name={"Distributor deep dive"}
                        dataFetchFail={props['dataFailed']}
                        spinnerState={props['spinnerState']}
                        storeTableButton={props['storeTableButton']}
                        storeTableButtonClick={props.storeTableButtonClick}
                        handlePinView={handlePinView}/>

                </Paper>
            </Grid>
        </Paper>
    );
};

export const DistributorsDeepDiveCards = (props) => {
    const classes = useStyles();
    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`distributor_deep_dive_view_cards`]}),
            viewId: "distributor_deep_dive_view_cards",
            apiEnd: "get_distributor_cards",
            filters: {
                cardToggleState: props['cardToggleState']
            }
        })
    };
    const exportToCsv = () => {
        let header = [{text: 'KPI', dataField: "KPI"}, {
            dataField: 'Current Year',
            text: props.intl.formatMessage({...PurchaseAnalysisMessages[`currentYear`]})
        }, {dataField: 'Last Year', text: props.intl.formatMessage({...PurchaseAnalysisMessages[`lastYear`]})}, {dataField: 'Target', text: props.intl.formatMessage({...AppMessages[`kpi_target`]})}];
        let data = props['distributorCardsData'].map((i) => {
            if (['gsv', 'eos_tonnes', 'eos_gsv'].indexOf(i.kpi) > -1) {
                switch (i.kpi) {
                    case "eos_tonnes":
                        return ({
                            ['Target']: i['change'],
                            ['KPI']: i['title'] + "(In Tonnes)",
                            ['Current Year']: i['valueTY'],
                            ['Last Year']: i['valueLY']
                        });
                    case "eos_gsv":
                        return ({
                            ['Target']: i['change'],
                            ['KPI']: i['title'] + "(In GSV)",
                            ['Current Year']: i['valueTY'],
                            ['Last Year']: i['valueLY']
                        });
                    default:
                        return ({
                            ['Target']: i['change'],
                            ['KPI']: i['title'],
                            ['Current Year']: i['valueTY'],
                            ['Last Year']: i['valueLY']
                        });
                }

            } else {
                return ({
                    ['Target']: "NA",
                    ['KPI']: i['title'],
                    ['Current Year']: i['valueTY'],
                    ['Last Year']: i['valueLY']
                });
            }

        });
        exportCSVFile(data, `${props.intl.formatMessage({...AppMessages[`distributor_deep_dive_view_cards`]})}_${props['selectedItems']}_
        (${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()}_${new Date().getMinutes()}_${new Date().getSeconds()}).csv`, header);
    };
    return (

        <Grid item xs={12} container alignItems={"center"}>
            <Grid item xs={12} container justify={"flex-end"} alignItems={"center"} style={{
                marginBottom: '0.5vw',
                // marginTop:'0.3vw'
            }}>
                <Tooltip title={props.intl.formatMessage({...AppMessages[`click_to_download`]})}>
                    <IconButton size={"small"} className={classes.csvButtonStyle} onClick={exportToCsv}>
                        <SystemUpdateAltIcon fontSize={"small"}/>
                    </IconButton>
                </Tooltip>

                {
                    history.location.pathname !== "/RTM/MyPinnedViews" &&
                    <Tooltip title={props.intl.formatMessage({...AppMessages[`pin_the_component`]})}>
                        <IconButton size="small" className={classes.pinButton}
                                    onClick={handlePinView}>
                            <Icon
                                path={mdiPin}
                                size={"1vw"}/>
                        </IconButton>
                    </Tooltip>
                }

            </Grid>
            {
                (() => {
                    if (!props['dataFailed']) {
                        if (!props['spinnerState']) {
                            return (
                                <Grid container xs={12}
                                      style={{height: "100%"}}
                                      justify={"space-around"}
                                      id={"distributor-deep-dive-cards"}>

                                    {
                                        props['distributorCardsData'].map((item) => {
                                            return (
                                                <Grid key={item.title} item xs={4}
                                                      style={{
                                                          height: "85%", padding: " 0 2vmin",
                                                          marginTop: '0.2vw',
                                                      }}>
                                                    <DistributorCard
                                                        data={item}
                                                        toggleState={props['cardToggleState']}
                                                        toggleCard={props['toggleCard']}
                                                    />
                                                </Grid>
                                            )
                                        })
                                    }

                                </Grid>
                            )
                        } else {
                            return (
                                <Grid item xs={12}
                                      style={{width: "100%"}}>
                                    <Paper elevation={3} style={{width: "100%"}}>
                                        <div className={classes.cardsSyncLoader}>
                                            <SyncLoader size={15} margin={2} color="#0000a0" loading/>
                                        </div>
                                    </Paper>
                                </Grid>
                            );
                        }
                    } else {
                        return <NoDataAlert/>;
                    }
                })()
            }
        </Grid>

    );
};


export const DistributorVisitVsSalesCard = (props) => {

    const classes = useStyles();
    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`distributor_deep_dive_view_visits_vs_sales_card`]}),
            viewId: "distributor_deep_dive_view_visits_vs_sales_card",
            apiEnd: "get_visit_vs_sales",
            filters: {
                selectionButtons: props['visitSalesFilter']
            }
        })
    };
    return (
        <>
            <Grid item xs={12} container justify={"flex-end"} alignItems={"center"}>
                {
                    history.location.pathname !== "/RTM/MyPinnedViews" &&
                    <div style={{float: "right", marginBottom: '0.5vw'}}>
                        <Tooltip title={props.intl.formatMessage({...AppMessages[`pin_the_component`]})}>
                            <IconButton size="small" className={classes.pinButton}
                                        onClick={handlePinView}>
                                <Icon
                                    path={mdiPin}
                                    size={"1vw"}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={props.intl.formatMessage({...messages[`trendChartsTooltipText`]})}>
                            <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                        </Tooltip>
                    </div>
                }
            </Grid>
            <Paper elevation={3} className={classes.visitVsSalesPaper}>
                <Grid container>
                    <Grid item container xs={6}>
                        <Typography className={classes.title}>{props.intl.formatMessage({...messages[`visitVsSales`]})}</Typography>

                    </Grid>
                    <Grid item container xs={6} style={{padding: '0.6vw'}} justify={"flex-end"} alignItems={"center"}>
                        <FormControl className={classes.formControlGrid}
                                     id={"channel-performance-filter"}>
                            <Select className={classes.menuItem}
                                    labelId="distributor-deep-dive-visit-vs-sales-filter"
                                    id="demo-controlled-open-select"
                                    open={props.visitFilterOpen}
                                    onClose={props.handleCloseVisitFilter}
                                    onOpen={props.handleOpenVisitFilter}
                                    value={props['visitSalesFilter']}
                                    onChange={props.handleVisitFilter}
                                    defaultValue={"Invoice"}>
                                <MenuItem className={classes.menuItem} value={"Invoice"}>  {props.intl.formatMessage({...AppMessages[`kpi_invoice`]})}</MenuItem>
                                <MenuItem className={classes.menuItem} value={"GSV"}>  {props.intl.formatMessage({...AppMessages[`kpi_gsv`]})}</MenuItem>
                                <MenuItem className={classes.menuItem} value={"Units"}>  {props.intl.formatMessage({...AppMessages[`kpi_units`]})}</MenuItem>
                                <MenuItem className={classes.menuItem} value={"Tonnes"}>  {props.intl.formatMessage({...AppMessages[`kpi_tonnes`]})}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            (() => {
                                if (!props['dataFailed']) {
                                    if (!props['spinnerState']) {
                                        return (
                                            <div style={{padding: '1vw', width: "100%",}}>
                                                <VisitvsSalesChart
                                                    selectedItems={props['selectedItems']}
                                                    series={props['visitSalesBubbleData']['series']}
                                                    xAxis={props['visitSalesBubbleData']['xAxis']}/>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div className={classes.bubbleSyncLoader}>
                                                <SyncLoader size={15} margin={2} color="#0000a0"
                                                            loading/>
                                            </div>
                                        )
                                    }
                                } else {
                                    return <NoDataAlert/>
                                }

                            })()
                        }
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};


const getQueryString = () => {
    return (
        decodeURIComponent(window.location.search).substring(1)
    )
};
const storePerformanceHeight = (window.outerHeight / 2);
const storePerformanceWidth = (window.outerWidth / 1.2);


/**
 * THE DISTRIBUTOR DEEP DOVE PAGE CONTAINER FUNCTION IS USED TO RENDER ALL THE COMPONENTS INSIDE IT AND ALSO TO PASS THE REQUIRED PARAMETERS AND THE DATA TO THE COMPONENTS USED */

export function DistributorDeepDivePage({
                                            //selectors
                                            distributorDeepDivePage,
                                            filterData, selectedFilterData, filterDataFetchFailed, filterDataFetchSpinnerState, selectedlocale,

                                            //actions
                                            onFilterChange, resetDeepDive, filterDataFetch, distributorSalesPerformanceDataFetch, productPerformanceDataFetch, productPerformanceButtonOnChange,
                                            distributorSalesPerformanceButtonOnChange, distributorCardsDataFetch, distributorSalesPerformanceKpiButtonOnChange,
                                            visitSalesBubbleDataFetch, visitSalesBubbleFilterOnChange, channelPerformanceDataFetch, channelFilterOnChange, channelPerformanceButtonOnChange,
                                            storePerformanceDataFetch, storePerformanceFilterOnChange, storePerformanceButtonOnChange,
                                            storeTableDataFetch, storeTableButtonOnChange, toggleCard, pinMyPage, pinMyView, window, ...props
                                        }) {
    useInjectReducer({key: "distributorDeepDivePage", reducer});
    useInjectSaga({key: "distributorDeepDivePage", saga});

    const classes = useStyles();

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
    useEffect(()=>{
//call api action here
        distributorSalesPerformanceDataFetch();
        productPerformanceDataFetch();
        channelPerformanceDataFetch();
        visitSalesBubbleDataFetch();
    },[selectedlocale]);
    useEffect(() => {
        let queryString = getQueryString();
        setFilterState(selectedFilterData);
        onFilterChange({
            ...selectedFilterData,
            distributor: [...new Set([...selectedFilterData['distributor'], queryString])]
        });
        if (filterData['region'].length === 0) {
            filterDataFetch(selectedFilterData);
        }
        if (selectedFilterData['pinPage']) {
            onFilterChange({...selectedFilterData, pinPage: false});
        }
        distributorSalesPerformanceDataFetch();
        productPerformanceDataFetch();
        distributorCardsDataFetch();
        channelPerformanceDataFetch();
        storeTableDataFetch();
        visitSalesBubbleDataFetch();

        return () => {
            resetDeepDive('distributor');
        }
    }, []);

    const fetchData = () => {

        onFilterChange(filterState);

        distributorSalesPerformanceDataFetch();
        productPerformanceDataFetch();
        distributorCardsDataFetch();
        channelPerformanceDataFetch();
        storeTableDataFetch();
        visitSalesBubbleDataFetch();
    };

    const reset = () => {
        let queryString = getQueryString();
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
            "distributor": [...new Set([...selectedFilterData['distributor'], queryString])],
            "technology": [],
            "channel": [],
            "region": [],
            "store": [],
            "customer": [],
            "gp": [],
            "salesRep": []
        });

        distributorSalesPerformanceDataFetch();
        productPerformanceDataFetch();
        distributorCardsDataFetch();
        channelPerformanceDataFetch();
        storeTableDataFetch();
        visitSalesBubbleDataFetch();

        filterDataFetch(
            {
                "recent_selected": "distributor",
                "recent_selected_dropdown_values": [],
                "chain": [],
                "manager": [],
                "coordinator": [],
                "timeRange": "YTD",
                "compare": "Last Year",
                "brand": [],
                "category": [],
                "distributor": [...new Set([...selectedFilterData['distributor'], queryString])],
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
    const handleDistributorSalesButtonClick = (data) => {
        if (data === 'GSV' || data === 'Tonnes') {
            distributorSalesPerformanceButtonOnChange('target');
        } else {
            distributorSalesPerformanceButtonOnChange('lastYear');
        }
        distributorSalesPerformanceKpiButtonOnChange(data);
        distributorSalesPerformanceDataFetch();
    };
    const handleChannelFilter = (event) => {
        channelFilterOnChange(event.target.value);
        channelPerformanceDataFetch();
    };
    const [channelFilterOpen, setChannelFilter] = React.useState(false);

    const handleCloseChannelFilter = () => {
        setChannelFilter(false);
    };
    const handleOpenChannelFilter = () => {
        setChannelFilter(true);
    };
    const handleVisitFilter = (event) => {
        visitSalesBubbleFilterOnChange(event.target.value);
        visitSalesBubbleDataFetch();
    };
    const [visitFilterOpen, setVisitFilter] = React.useState(false);

    const handleCloseVisitFilter = () => {
        setVisitFilter(false);
    };
    const handleOpenVisitFilter = () => {
        setVisitFilter(true);
    };
    const handleParetoButtonClick = (data) => {
        productPerformanceButtonOnChange(data);
        productPerformanceDataFetch();

    };
    const handleChannelButtonClick = (data) => {
        channelPerformanceButtonOnChange(data);
        channelPerformanceDataFetch();

    };
    const handleStorePerformanceButtonClick = (data) => {
        storePerformanceButtonOnChange(data);
        storePerformanceDataFetch(selectedChannel);

    };
    const handleStoreTableButtonClick = (data) => {
        storeTableButtonOnChange(data);
        storeTableDataFetch();

    };

    const handleStoreFilter = (event) => {
        storePerformanceFilterOnChange(event.target.value);
        storePerformanceDataFetch(selectedChannel);
    };

    const [storeFilterOpen, setStoreFilter] = React.useState(false);

    const handleCloseStoreFilter = () => {
        setStoreFilter(false);
    };
    const handleOpenStoreFilter = () => {
        setStoreFilter(true);
    };


    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedChannel, setSelectedChannel] = React.useState();
    const handleOpenStoresDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseStoresDialog = () => {
        setOpenDialog(false)
    };

    const handleClose = () => {
        setOpenDialog(false);
    };
    const handleChangeTimeRange = (value) => {
        if (value.value === 'YTD') {
            // onFilterChange({...selectedFilterData, 'timeRange': value, 'compare': 'Last Year'});
            onFilterChange({...filterState, 'timeRange': value.value, 'compare': 'Last Year'});
        } else {
            // onFilterChange({...selectedFilterData, 'timeRange': value, 'compare': 'Current Year'});
            onFilterChange({...filterState, 'timeRange': value.value, 'compare': 'Current Year'});
        }
        // fetchData();
        distributorSalesPerformanceDataFetch();
        productPerformanceDataFetch();
        distributorCardsDataFetch();
        channelPerformanceDataFetch();
        storeTableDataFetch();
        visitSalesBubbleDataFetch();
    };

    const eventsStore = {
        click: function (event, chartContext, config,) {
            let dataPointIndex = config['dataPointIndex'];
            let series = config['config']['xaxis']['categories'];
            let name = series[dataPointIndex];
            if (dataPointIndex !== -1) {
                onFilterChange({
                    ...selectedFilterData,
                    store: [...selectedFilterData['store'], name],
                });
                history.push(`/RTM/StoreDeepDive?${name}`);
            }
        }
    };
    const getChannelStoreLabel = () => {
        switch (distributorDeepDivePage['storePerformanceButton']) {
            case 'GSV':
                return props.intl.formatMessage({...AppMessages[`kpi_gsv`]});
            case 'Invoice':
                return props.intl.formatMessage({...AppMessages[`kpi_invoice`]});
            case 'Units':
                return props.intl.formatMessage({...AppMessages[`kpi_units`]});
            case 'Tonnes':
                return props.intl.formatMessage({...AppMessages[`kpi_tonnes`]});
            case 'WOS':
                return props.intl.formatMessage({...AppMessages[`kpi_wos`]});
        }
    };

    const optionsTrendStore = {
        colors: ['#00d7b9', '#0000a0'],
        chart: {
            type: 'bar',
            toolbar: {
                show: true,
                export: {
                    csv: {
                        filename: `${props.intl.formatMessage({...messages[`header`]})}_${props.intl.formatMessage({...messages[`storeSalesPerformance`]})}_${selectedChannel} - Distributor Deepdive view_${selectedFilterData['distributor']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                        columnDelimiter: ',',
                        headerCategory: props.intl.formatMessage({...AppMessages[`store`]}),
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: `${props.intl.formatMessage({...messages[`header`]})}_${props.intl.formatMessage({...messages[`storeSalesPerformance`]})}_${selectedChannel} - Distributor Deepdive view_${selectedFilterData['distributor']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                    png: {
                        filename: `${props.intl.formatMessage({...messages[`header`]})}_${props.intl.formatMessage({...messages[`storeSalesPerformance`]})}_${selectedChannel} - Distributor Deepdive view_${selectedFilterData['distributor']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    }
                }
            },
            events: eventsStore,
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
        noData: {
            text: props.intl.formatMessage({...AppMessages[`no_data_combination`]}),
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
        plotOptions: {
            bar: {
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
            title: {
                text: getChannelStoreLabel(),
                rotate: -90,
                offsetX: 7,
                offsetY: 0,
                style: {
                    color: '#000',
                    fontSize: '0.9vw',
                    fontFamily: 'MarsCentra-Bold',
                },
            },
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
        },
        xaxis: {

            categories: distributorDeepDivePage['storePerformanceData']['xAxis'],
            labels: {
                trim: true,
                rotateAlways: false,
                rotate: -20,
                hideOverlappingLabels: true,
                maxHeight: 80,

                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book',
                },

            },
            title: {
                text: props.intl.formatMessage({...AppMessages[`store`]}),
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: '#000',
                    fontSize: '0.9vw',
                    fontFamily: 'MarsCentra-Bold',
                },
            },
        },
        tooltip: {
            enabled: true,
            theme: 'dark',
            x: {
                show: true,
                formatter: function (value) {
                    return value.substring(0, 60);
                },
            },
            y: {
                show: true,

                formatter: (label) => {
                    return new Intl.NumberFormat('pt-BR').format(label.toFixed(2));
                },

            },
            style: {
                fontSize: '0.8vw',
                fontFamily: 'MarsCentra-Book',
            },

        }
    };
    const [distTrendTopKpiFilterOpen, setDistTrendTopKpiFilter] = React.useState(false);
    const handleCloseTrendTopKpiFilter = () => {
        setDistTrendTopKpiFilter(false);
    };
    const handleOpenTrendTopKpiFilter = () => {
        setDistTrendTopKpiFilter(true);
    };

    const handleChangeTopKpiFilter = (e) => {
        distributorSalesPerformanceButtonOnChange(e.target.value);
        distributorSalesPerformanceDataFetch();
    };

    const handleChangeCompareTimeRange = (value) => {
        // onFilterChange({...selectedFilterData, 'compare': value});
        onFilterChange({...filterState, 'compare': value.value});
        // fetchData();
        distributorSalesPerformanceDataFetch();
        productPerformanceDataFetch();
        distributorCardsDataFetch();
        channelPerformanceDataFetch();
        storeTableDataFetch();
        visitSalesBubbleDataFetch();
    };

    const [openPinPage, setOpenPinPage] = React.useState(false);

    const [pinPageParams, setPinPageParams] = React.useState({pinName: ""});

    const handlePinPageNameInput = (event) => {
        setPinPageParams({...pinPageParams, "pinName": event.target.value});
    };


    let selected_distributor;
    if (selectedFilterData['distributor'].length === 0) {
        selected_distributor = "None Selected"
    } else if (selectedFilterData['distributor'].length > 1) {
        selected_distributor = `${selectedFilterData['distributor'][0]}, ...+ ${selectedFilterData['distributor'].length - 1}`;
    } else {
        selected_distributor = `${selectedFilterData['distributor'][0]}`;
    }

// const distributorName = decodeURIComponent(window.location.search).substring(1);
//     console.log("dn",distributorName);
    return (
        <div id={"distributorDeepDiveView"}>
            <Helmet>
                <title>DistributorDeepDivePage</title>
                <meta name="description" content="Description of DistributorDeepDivePage"/>
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
                        <TitleHeader title={props.intl.formatMessage({...messages[`header`]})}
                                     subHeader={selected_distributor}
                                     selectedItems={selectedFilterData['distributor']}
                                     setOpenPinPage={setOpenPinPage}
                                     selectedFilterData={selectedFilterData}
                                     handleChangeTimeRange={handleChangeTimeRange}
                                     handleChangeCompareTimeRange={handleChangeCompareTimeRange}
                                     tooltipData={props.intl.formatMessage({...messages[`distributorDeepDiveTooltipText`]})}
                                     exportPdf={() => exportPdf("distributorDeepDiveView", `${props.intl.formatMessage({...messages[`header`]})}-(${selected_distributor}) - RTM.pdf`)}/>
                        <Grid container>
                            <Grid item container xs={8} style={{marginBottom: '1vw'}}>
                                <DistributorsDeepDiveCards
                                    selectedItems={selectedFilterData['distributor']}
                                    dataFailed={distributorDeepDivePage['distributorCardsDataFail']}
                                    spinnerState={distributorDeepDivePage['distributorCardsDataSpinnerState']}
                                    distributorCardsData={distributorDeepDivePage['distributorCardsData']}
                                    cardToggleState={distributorDeepDivePage['cardToggleState']}
                                    toggleCard={toggleCard}
                                    pinMyView={pinMyView}
                                    {...props}
                                />
                            </Grid>

                            <Grid item xs={4} sm={4} md={4} lg={4}
                                  className={classes.grid} style={{marginBottom: '1vw'}}>
                                <DistributorVisitVsSalesCard
                                    selectedItems={selectedFilterData['distributor']}
                                    dataFailed={distributorDeepDivePage['visitSalesBubbleDataFail']}
                                    spinnerState={distributorDeepDivePage['visitSalesBubbleDataSpinnerState']}
                                    pinMyView={pinMyView}
                                    visitSalesBubbleData={distributorDeepDivePage['visitSalesBubbleData']}
                                    visitFilterOpen={visitFilterOpen}
                                    handleVisitFilter={handleVisitFilter}
                                    handleCloseVisitFilter={handleCloseVisitFilter}
                                    handleOpenVisitFilter={handleOpenVisitFilter}
                                    {...props}
                                />
                            </Grid>

                            <Grid container>
                                <Grid item xs={12} sm={12} md={7} lg={6}>
                                    <DistributorSalesPerformanceView
                                        selectedItems={selectedFilterData['distributor']}
                                        distributorSalesPerformanceKpiButton={distributorDeepDivePage['distributorSalesPerformanceKpiButton']}
                                        handleDistributorSalesButtonClick={handleDistributorSalesButtonClick}
                                        distTrendTopKpiFilterOpen={distTrendTopKpiFilterOpen}
                                        handleCloseTrendTopKpiFilter={handleCloseTrendTopKpiFilter}
                                        handleOpenTrendTopKpiFilter={handleOpenTrendTopKpiFilter}
                                        distributorSalesPerformanceButton={distributorDeepDivePage['distributorSalesPerformanceButton']}
                                        handleChangeTopKpiFilter={handleChangeTopKpiFilter}
                                        dataFailed={distributorDeepDivePage['distributorSalesPerformanceDataFail']}
                                        spinnerState={distributorDeepDivePage['distributorSalesPerformanceDataSpinnerState']}
                                        distributorSalesPerformanceData={distributorDeepDivePage['distributorSalesPerformanceData']}
                                        pinMyView={pinMyView}
                                        {...props}
                                    />

                                </Grid>

                                <Grid item xs={12} sm={12} md={5} lg={6}>
                                    <DistributorProductsPerformanceView
                                        selectedItems={selectedFilterData['distributor']}
                                        productPerformanceData={distributorDeepDivePage['productPerformanceData']}
                                        dataFailed={distributorDeepDivePage['productPerformanceDataFail']}
                                        spinnerState={distributorDeepDivePage['productPerformanceDataSpinnerState']}
                                        paretoButtonData={distributorDeepDivePage['productPerformanceButton']}
                                        paretoButtonClick={handleParetoButtonClick}
                                        pinMyView={pinMyView}
                                        {...props}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <DistributorChannelPerformance
                                        selectedItems={selectedFilterData['distributor']}
                                        channelFilterOpen={channelFilterOpen}
                                        handleCloseChannelFilter={handleCloseChannelFilter}
                                        handleOpenChannelFilter={handleOpenChannelFilter}
                                        channelFilter={distributorDeepDivePage['channelFilter']}
                                        handleChannelFilter={handleChannelFilter}
                                        dataFailed={distributorDeepDivePage['channelPerformanceDataFail']}
                                        spinnerState={distributorDeepDivePage['channelPerformanceDataSpinnerState']}
                                        channelPerformanceData={distributorDeepDivePage['channelPerformanceData']}
                                        handleOpenStoresDialog={handleOpenStoresDialog}
                                        setSelectedChannel={setSelectedChannel}
                                        storePerformanceDataFetch={storePerformanceDataFetch}
                                        channelButton={distributorDeepDivePage['channelPerformanceButton']}
                                        channelButtonClick={handleChannelButtonClick}
                                        pinMyView={pinMyView}
                                        {...props}
                                    />
                                </Grid>

                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <DistributorStorePerformance
                                        selectedItems={selectedFilterData['distributor']}
                                        storeTableData={distributorDeepDivePage['storeTableData']}
                                        dataFailed={distributorDeepDivePage['storeTableDataFail']}
                                        spinnerState={distributorDeepDivePage['storeTableDataSpinnerState']}
                                        storeTableButton={distributorDeepDivePage['storeTableButton']}
                                        storeTableButtonClick={handleStoreTableButtonClick}
                                        pinMyView={pinMyView}
                                        {...props}
                                    />
                                </Grid>
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
                open={openDialog}
                onClose={() => handleCloseStoresDialog()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='lg'
                fullWidth>
                <DialogContent>
                    <Grid container>
                        <Grid item container xs={6} sm={6} md={6} lg={6} xl={6} justify="flex-start">
                            <Typography className={classes.poptitle}>{  props.intl.formatMessage({...messages[`storeSalesPerformance`]})}
                                ({selectedChannel}) </Typography>
                        </Grid>
                        <Grid item container xs={6} sm={6} md={6} lg={6} xl={6} justify="flex-end"
                              alignItems={"center"}>
                            <Button
                                size="small"
                                variant="contained"
                                className={clsx({
                                    [classes.distributorPerformanceButton]: distributorDeepDivePage['storePerformanceButton'] !== 'Invoice',
                                    [classes.distributorPerformanceButtonActive]: distributorDeepDivePage['storePerformanceButton'] === 'Invoice'
                                })}
                                onClick={() => handleStorePerformanceButtonClick('Invoice')}
                            >
                                {props.intl.formatMessage({...AppMessages[`kpi_invoice`]})}
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                className={clsx({
                                    [classes.distributorPerformanceButton]: distributorDeepDivePage['storePerformanceButton'] !== 'GSV',
                                    [classes.distributorPerformanceButtonActive]: distributorDeepDivePage['storePerformanceButton'] === 'GSV'
                                })}
                                onClick={() => handleStorePerformanceButtonClick('GSV')}
                            >
                                {props.intl.formatMessage({...AppMessages[`kpi_gsv`]})}
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                className={clsx({
                                    [classes.distributorPerformanceButton]: distributorDeepDivePage['storePerformanceButton'] !== 'Units',
                                    [classes.distributorPerformanceButtonActive]: distributorDeepDivePage['storePerformanceButton'] === 'Units'
                                })}
                                onClick={() => handleStorePerformanceButtonClick('Units')}
                            >
                                {props.intl.formatMessage({...AppMessages[`kpi_units`]})}
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                className={clsx({
                                    [classes.distributorPerformanceButton]: distributorDeepDivePage['storePerformanceButton'] !== 'Tonnes',
                                    [classes.distributorPerformanceButtonActive]: distributorDeepDivePage['storePerformanceButton'] === 'Tonnes'
                                })}
                                onClick={() => handleStorePerformanceButtonClick('Tonnes')}
                            >
                                {props.intl.formatMessage({...AppMessages[`kpi_tonnes`]})}
                            </Button>

                            <FormControl className={classes.formControlGrid} id={"store-sales-performance-filter"}
                                         style={{paddingRight: '0.5vw'}}>
                                <Select className={classes.menuItem}
                                        labelId="distributor-deep-dive-store-filter"
                                        id="demo-controlled-open-select"
                                        open={storeFilterOpen}
                                        onClose={handleCloseStoreFilter}
                                        onOpen={handleOpenStoreFilter}
                                        value={distributorDeepDivePage['storeFilter']}
                                        onChange={handleStoreFilter}
                                        defaultValue={"Top 10"}>
                                    <MenuItem className={classes.menuItem} value={"Top 10"}>  {props.intl.formatMessage({...AppMessages[`top_ten`]})}</MenuItem>
                                    <MenuItem className={classes.menuItem} value={"Bottom 10"}> {props.intl.formatMessage({...AppMessages[`bottom_ten`]})}</MenuItem>
                                </Select>
                            </FormControl>
                            <Tooltip
                                title={props.intl.formatMessage({...messages[`storeSalesPerformanceTooltipText`]})}>
                                <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                            </Tooltip>
                            <IconButton id="seleniumProductLevelRiskTableCloseIconButton"
                                        onClick={() => {
                                            handleClose()
                                        }}
                                        style={{outline: 'none'}}>
                                <CloseIcon id="seleniumProductLevelRiskTableCloseIcon"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    {
                        (() => {
                            if (!distributorDeepDivePage['storePerformanceDataFail']) {
                                if (!distributorDeepDivePage['storePerformanceDataSpinnerState']) {
                                    return (

                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} container justify={"center"}
                                              style={{padding: '2vmin'}}>
                                            <ApexGroupedBarChart options={optionsTrendStore}
                                                                 series={distributorDeepDivePage['storePerformanceData']['series']}
                                                                 height={storePerformanceHeight}
                                                                 width={storePerformanceWidth}/>

                                        </Grid>
                                    )
                                } else {
                                    return (
                                        <Grid item xs={12} sm={12} md={12} lg={12}
                                              className={classes.grid}
                                              style={{marginTop: "2vmin"}}>
                                            <div className={classes.storePerformancePopSyncLoader}>
                                                <SyncLoader size={15} margin={2} color="#0000a0"
                                                            loading/>
                                            </div>
                                        </Grid>
                                    );
                                }
                            } else {
                                return <NoDataAlert/>;
                            }
                        })()
                    }

                </DialogContent>
            </Dialog>
            <Dialog
                open={openPinPage}
                onClose={() => setOpenPinPage(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
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
                            ...params, "pageName": "Distributor Deep Dive View",
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
    )
        ;
}


DistributorDeepDivePage.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    resetDeepDive: PropTypes.func.isRequired,
    filterDataFetch: PropTypes.func.isRequired,
    distributorSalesPerformanceDataFetch: PropTypes.func.isRequired,
    productPerformanceDataFetch: PropTypes.func.isRequired,
    productPerformanceButtonOnChange: PropTypes.func.isRequired,
    distributorSalesPerformanceButtonOnChange: PropTypes.func.isRequired,
    distributorSalesPerformanceKpiButtonOnChange: PropTypes.func.isRequired,
    distributorCardsDataFetch: PropTypes.func.isRequired,
    visitSalesBubbleDataFetch: PropTypes.func.isRequired,
    visitSalesBubbleFilterOnChange: PropTypes.func.isRequired,
    channelPerformanceDataFetch: PropTypes.func.isRequired,
    channelFilterOnChange: PropTypes.func.isRequired,
    channelPerformanceButtonOnChange: PropTypes.func.isRequired,
    storePerformanceDataFetch: PropTypes.func.isRequired,
    channelClickOnChange: PropTypes.func.isRequired,
    storePerformanceButtonOnChange: PropTypes.func.isRequired,
    storePerformanceFilterOnChange: PropTypes.func.isRequired,
    storeTableDataFetch: PropTypes.func.isRequired,
    storeTableButtonOnChange: PropTypes.func.isRequired,
    toggleCard: PropTypes.func.isRequired,
    pinMyPage: PropTypes.func.isRequired,
    pinMyView: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    distributorDeepDivePage: makeSelectDistributorDeepDivePage(),
    distributorNameSelected: makeSelectDistributorName(),
    filterData: makeSelectFilterData(),
    selectedFilterData: makeSelectSelectedFilters(),
    filterDataFetchFailed: makeSelectFilterDataFail(),
    filterDataFetchSpinnerState: makeSelectFilterDataSpinnerState(),
    distributorCardsData: makeSelectDistributorCardsSuccess(),
    visitSalesBubbleData: makeSelectVisitSalesBubbleSuccess(),
    distributorSalesPerformanceData: makeSelectDistributorSalesPerformanceSuccess(),
    productPerformanceData: makeSelectProductPerformanceSuccess(),
    channelPerformanceData: makeSelectChannelPerformanceSuccess(),
    storePerformanceData: makeSelectStorePerformanceSuccess(),
    storeTableData: makeSelectStoreTableSuccess(),
    selectedlocale: makeSelectLocale(),
});

export function mapDispatchToProps(dispatch) {
    return {
        onFilterChange: (data) => dispatch(selectedFilterOnChange(data)),
        resetDeepDive: (data) => dispatch(resetDeepDive(data)),
        filterDataFetch: (data) => dispatch(filterDataFetch(data)),
        distributorCardsDataFetch: () => dispatch(distributorCardsFetch()),
        visitSalesBubbleDataFetch: () => dispatch(visitSalesBubbleFetch()),
        visitSalesBubbleFilterOnChange: (data) => dispatch(visitSalesBubbleFilterOnChange(data)),
        distributorSalesPerformanceDataFetch: () => dispatch(distributorSalesPerformanceFetch()),
        productPerformanceDataFetch: () => dispatch(productPerformanceFetch()),
        productPerformanceButtonOnChange: (data) => dispatch(productPerformanceButtonOnChange(data)),
        distributorSalesPerformanceButtonOnChange: (data) => dispatch(distributorSalesPerformanceButtonVsOnChange(data)),
        distributorSalesPerformanceKpiButtonOnChange: (data) => dispatch(distributorSalesPerformanceKpiButtonOnChange(data)),
        channelPerformanceDataFetch: () => dispatch(channelPerformanceFetch()),
        channelFilterOnChange: (data) => dispatch(channelPerformanceFilter(data)),
        channelClickOnChange: (data) => dispatch(channelPerformanceClickOnChange(data)),
        channelPerformanceButtonOnChange: (data) => dispatch(channelPerformanceButtonOnChange(data)),
        storePerformanceDataFetch: (data) => dispatch(storePerformanceFetch(data)),
        storePerformanceFilterOnChange: (data) => dispatch(storePerformanceFilter(data)),
        storePerformanceButtonOnChange: (data) => dispatch(storePerformanceButtonOnChange(data)),
        storeTableDataFetch: () => dispatch(storeTableFetch()),
        storeTableButtonOnChange: (data) => dispatch(storeTableOnChange(data)),
        toggleCard: (data) => dispatch(toggleCard(data)),
        pinMyPage: (data) => dispatch(pinMyPage(data)),
        pinMyView: (data) => dispatch(pinMyView(data))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    withConnect,
    memo
)(injectIntl(DistributorDeepDivePage));
