/**
 *
 * StoreDeepDivePage
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
import makeSelectStoreDeepDivePage from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import {
    makeSelectFilterData,
    makeSelectFilterDataFail,
    makeSelectFilterDataSpinnerState,
    makeSelectSelectedFilters
} from "../App/selectors";
import {filterDataFetch, pinMyPage, pinMyView, resetDeepDive, selectedFilterOnChange} from "../App/actions";
import {Box, Button, Grid, Paper, TextField, Tooltip, Typography} from "@material-ui/core";
import SideFilter from "../../components/SideFilter";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";
import PurchaseAnalysisCard from "../../components/PurchaseAnalysisCard";
import StoreDeepDiveTrendLine from "../../components/StoreDeepDiveTrendLine";
import {
    paretoAnalysisFetch,
    paretoAnalysisFilterChange,
    productAnalysisButtonChange,
    productAnalysisFetch, productAnalysisKpiButtonChange,
    productDistributionButtonChange,
    productDistributionFetch,
    purchaseAnalysisBestMixFetch, purchaseAnalysisButtonChange,
    purchaseAnalysisFetch,
    salesPerformanceButtonChange,
    salesPerformanceFetch,
    storeProductTopFilterOnChange
} from "./actions";
import {SyncLoader} from "react-spinners";
import NoDataAlert from "../../components/NoDataAlert";
import {exportCSVFile, exportPdf} from "../../utils/utility";
import history from "../../utils/history";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import ApexParetoChart from "../../components/ApexParetoChart";
import ApexGroupedBarChart from "../../components/ApexGroupedBarChart";
import StoreDeepDiveTable from "../../components/StoreDeepDiveTable";
import TitleHeader from "../../components/TitleHeader/Loadable";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@mdi/react";
import {mdiPin} from "@mdi/js";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import InfoIcon from "@material-ui/icons/Info";
import AppMessages from "../App/messages";
import {injectIntl} from "react-intl";
import messages from "./messages";
import {makeSelectLocale} from "../LanguageProvider/selectors";
import PurchaseMessages from "../../components/PurchaseAnalysisCard/messages";

/** Styles class*/
const useStyles = makeStyles((theme) => ({
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
    formControl: {
        margin: '1vmin',
        minWidth: '4vw',
        fontSize: '0.8vw',
        fontFamily: 'MarsCentra-Book',
        color: 'rgb(0,215,185)'
    },
    filter: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.8vw',
        color: '#0000a0e6',
        // padding: '0.2vw'
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
    productButton: {
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
    productButtonActive: {
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
    proDistributionButton: {
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
    proDistributionButtonActive: {
        margin: "1vmin",
        color: "white",
        backgroundColor: "#0000a0",
        fontFamily: "MarsCentra-Book",
        fontSize: '0.7vw',
        textTransform: 'none',
        borderRadius: "1vmin",
        '&:hover': {
            color: "white",
            backgroundColor: "#0000a0",
        }
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
    utilityButtons: {
        margin: "1vmin",
        // color: "#fff",
        fontFamily: "MarsCentra-Bold",
        fontSize: "0.9vw",
        textTransform: 'none',
        borderRadius: "1vmin"
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
    menuItem: {
        fontFamily: "MarsCentra-Book",
        fontSize: "0.7vw",
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
    scrollButton: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
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


export const StoreSalesPerformance = (props) => {
    const classes = useStyles();
    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`store_deep_dive_sales_performance_view`]}),
            viewId: "store_deep_dive_sales_performance_view",
            apiEnd: "get_sales_performance",
            filters: {
                selectionButtons: props['salesButtonData']
            }
        })
    };
    const getLabel = () => {
        switch (props['salesButtonData']) {
            case 'GSV':
                return props.intl.formatMessage({...AppMessages[`kpi_gsv`]});
            case 'Invoice':
                return props.intl.formatMessage({...AppMessages[`kpi_invoice`]});
            case 'Units':
                return props.intl.formatMessage({...AppMessages[`kpi_units`]});
            case 'Tonnes':
                return props.intl.formatMessage({...AppMessages[`kpi_tonnes`]});
        }
    };
    return (
        <Paper elevation={3} style={{height: "70vh"}}>
            <Grid container justify={"center"} alignItems={"center"}>
                <Grid container item xs={12} sm={12} md={12} lg={12}
                >
                    <Grid item container xs={8} alignItems={"flex-end"}>
                        <Typography className={classes.title}>{props.intl.formatMessage({...messages[`storeSalesPerformanceTitle`]})}</Typography>
                    </Grid>
                    <Grid item container xs={4} justify={"flex-end"} alignItems={"center"}>
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

                        <Tooltip title={props.intl.formatMessage({...AppMessages[`visualToolTipText`]})}>
                            <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                        </Tooltip>
                    </Grid>
                    <Grid item container xs={12} sm={12} md={12} lg={12} justify={"flex-end"} alignItems={"center"}
                          style={{textAlign: 'end', paddingRight: '1vw'}}>
                        <Button size="small"
                                variant="contained"
                                onClick={() => props.buttonClick('Invoice')}
                                className={clsx({
                                    [classes.productButton]: props['salesButtonData'] !== 'Invoice',
                                    [classes.productButtonActive]: props['salesButtonData'] === 'Invoice'
                                })}
                        >{props.intl.formatMessage({...AppMessages[`kpi_invoice`]})}</Button>
                        <Button size="small"
                                variant="contained"
                                onClick={() => props.buttonClick('GSV')}
                                className={clsx({
                                    [classes.productButton]: props['salesButtonData'] !== 'GSV',
                                    [classes.productButtonActive]: props['salesButtonData'] === 'GSV'
                                })}
                        >{props.intl.formatMessage({...AppMessages[`kpi_gsv`]})}</Button>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => props.buttonClick('Units')}
                            className={clsx({
                                [classes.productButton]: props['salesButtonData'] !== 'Units',
                                [classes.productButtonActive]: props['salesButtonData'] === 'Units'
                            })}
                        >{props.intl.formatMessage({...AppMessages[`kpi_units`]})}</Button>
                        <Button size="small"
                                variant="contained"
                                onClick={() => props.buttonClick('Tonnes')}
                                className={clsx({
                                    [classes.productButton]: props['salesButtonData'] !== 'Tonnes',
                                    [classes.productButtonActive]: props['salesButtonData'] === 'Tonnes'
                                })}
                        >{props.intl.formatMessage({...AppMessages[`kpi_tonnes`]})}</Button>
                    </Grid>

                </Grid>
                <Grid container item xs={12} style={{padding: "1vmin"}}>
                    {
                        (() => {
                            if (!props['dataFailed']) {
                                if (!props['spinnerState']) {
                                    return (
                                        <Grid item xs={12} style={{'padding': '2vmin'}}>
                                            <StoreDeepDiveTrendLine
                                                selectedItems={props['selectedItems']}
                                                height={window.outerHeight / 2.5}
                                                series={props['salesPerformanceData'][0]['series']}
                                                data={props['salesPerformanceData'][0]}
                                                label={getLabel()}/>
                                        </Grid>
                                    )
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
                                                    height: '30vh',
                                                    width: "100%"
                                                }}>
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
                </Grid>
            </Grid>
        </Paper>
    );
};

export const StorePurchaseAnalysis = (props) => {
    const classes = useStyles();
    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`store_deep_dive_purchase_analysis_view`]}),
            viewId: "store_deep_dive_purchase_analysis_view",
            apiEnd: "get_store_purchase_analysis",
            filters: {
                selectionButtons:props['purchaseButton']
            }
        })
    };

    const exportToCsv = () => {
        let data = [];
        let header = [
            {dataField: 'kpi', text: 'KPI'},
            {dataField: 'lastYear', text: props.intl.formatMessage({...PurchaseMessages[`lastYear`]})},
            {dataField: 'currentYear', text: props.intl.formatMessage({...PurchaseMessages[`currentYear`]})},
            {dataField: 'variance', text: props.intl.formatMessage({...PurchaseMessages[`variance`]})},
            {dataField: 'value', text: props.intl.formatMessage({...AppMessages[`value`]})},
        ];
        data.push(
            {
                kpi: props.intl.formatMessage({...PurchaseMessages[`clientRepresent`]}),
                value: "NA",
                lastYear: props['purchaseAnalysisData']['percentage_of_tot_sellout_ly'],
                currentYear: props['purchaseAnalysisData']['percentage_of_tot_sellout_cy'],
                variance: props['purchaseAnalysisData']['percentage_of_tot_sellout_growth'],
            }
        );
        data.push(
            {
                kpi: props.intl.formatMessage({...PurchaseMessages[`purchaseFreq`]}),
                value: "NA",
                lastYear: props['purchaseAnalysisData']['average_purchase_frequency_ly'],
                currentYear: props['purchaseAnalysisData']['average_purchase_frequency_cy'],
                variance: props['purchaseAnalysisData']['average_purchase_frequency_growth'],
            }
        );
        data.push(
            {
                kpi: props.intl.formatMessage({...PurchaseMessages[`purchaseAmt`]}),
                value: "NA",
                lastYear: props['purchaseAnalysisData']['average_purchase_amount_ly'],
                currentYear: props['purchaseAnalysisData']['average_purchase_amount_cy'],
                variance: props['purchaseAnalysisData']['average_purchase_amount_growth'],
            }
        );
        data.push(
            {
                kpi: props.intl.formatMessage({...PurchaseMessages[`nextPurchase`]}),
                value: props['purchaseAnalysisData']['next_expected_purchase'],
                lastYear: "NA",
                currentYear: "NA",
                variance: "NA",
            }
        );
        data.push(
            {
                kpi: props.intl.formatMessage({...PurchaseMessages[`bestMix`]}),
                value: props['bestProductMixData']['product_1'] + props['bestProductMixData']['product_2'],
                lastYear: "NA",
                currentYear: "NA",
                variance: "NA",
            }
        );

        exportCSVFile(data, `${props.intl.formatMessage({...AppMessages[`store_deep_dive_purchase_analysis_view`]})}_${props['selectedItems']}_(${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()}_${new Date().getMinutes()}_${new Date().getSeconds()}).csv`, header);
    };

    return (
        <Paper elevation={3} style={{height: "70vh"}}>
            <Grid container xs={12} sm={12} md={12} lg={12} justify={"center"}
                  alignItems={"center"}>
                <Grid container item xs={12} sm={12} md={12} lg={12}
                    // style={{padding: "1vmin"}}
                >
                    <Grid item xs={8} container alignItems={"flex-end"}>
                        <Typography className={classes.title}>{props.intl.formatMessage({...messages[`storePurchaseAnalysisTitle`]})}</Typography>
                    </Grid>
                    <Grid item xs={4} container justify={"flex-end"} alignItems={"center"}>
                        <Tooltip title={props.intl.formatMessage({...AppMessages[`click_to_download`]})}>
                            <IconButton size={"small"} className={classes.csvButtonStyle} onClick={exportToCsv}>
                                <SystemUpdateAltIcon fontSize={"small"}/>
                            </IconButton>
                        </Tooltip>
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

                        <Tooltip title={props.intl.formatMessage({...messages[`storePurchaseAnalysisToolTipText`]})}>
                            <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                        </Tooltip>
                    </Grid>
                    <Grid item container xs={12} sm={12} md={12} lg={12}
                          justify={"flex-end"} alignItems={"center"}
                          style={{textAlign: 'end', paddingRight: '1vw'}}>
                        <Button size="small"
                                variant="contained"
                                onClick={() => props.purchaseButtonClick('Invoice')}
                                className={clsx({
                                    [classes.productButton]: props['purchaseButton'] !== 'Invoice',
                                    [classes.productButtonActive]: props['purchaseButton'] === 'Invoice'
                                })}
                        >{props.intl.formatMessage({...AppMessages[`kpi_invoice`]})}</Button>
                        <Button size="small"
                                variant="contained"
                                onClick={() => props.purchaseButtonClick('GSV')}
                                className={clsx({
                                    [classes.productButton]: props['purchaseButton'] !== 'GSV',
                                    [classes.productButtonActive]: props['purchaseButton'] === 'GSV'
                                })}
                        >{props.intl.formatMessage({...AppMessages[`kpi_gsv`]})}</Button>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => props.purchaseButtonClick('Units')}
                            className={clsx({
                                [classes.productButton]: props['purchaseButton'] !== 'Units',
                                [classes.productButtonActive]: props['purchaseButton'] === 'Units'
                            })}
                        >{props.intl.formatMessage({...AppMessages[`kpi_units`]})}</Button>
                        <Button size="small"
                                variant="contained"
                                onClick={() => props.purchaseButtonClick('Tonnes')}
                                className={clsx({
                                    [classes.productButton]: props['purchaseButton'] !== 'Tonnes',
                                    [classes.productButtonActive]: props['purchaseButton'] === 'Tonnes'
                                })}
                        >{props.intl.formatMessage({...AppMessages[`kpi_tonnes`]})}</Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>

                    <PurchaseAnalysisCard
                        data={props['purchaseAnalysisData']}
                        bestProductMixData={props['bestProductMixData']}
                        dataSpinner={props['spinnerState']}
                        bestMixSpinner={props['bestProductMixDataSpinnerState']}
                        dataFail={props['dataFailed']}
                        bestMixFail={props['bestProductMixDataFailed']}
                        // purchaseButtonClick={props.purchaseButtonClick}
                        purchaseButton={props['purchaseButton']}
                    />

                </Grid>
            </Grid>
        </Paper>
    )
};

export const StoreBrandAnalysis = (props) => {
    const classes = useStyles();
    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`store_deep_dive_brand_analysis_view`]}),
            viewId: "store_deep_dive_brand_analysis_view",
            apiEnd: "get_pareto_performance",
            filters: {
                selectionButtons: props['paretoAnalysisButton']
            }
        })
    };
    const getLabel = () => {
        switch (props['paretoAnalysisButton']) {
            case 'GSV':
                return props.intl.formatMessage({...AppMessages[`kpi_gsv`]});
            case 'Invoice':
                return props.intl.formatMessage({...AppMessages[`kpi_invoice`]});
            case 'Units':
                return props.intl.formatMessage({...AppMessages[`kpi_units`]});
            case 'Tonnes':
                return props.intl.formatMessage({...AppMessages[`kpi_tonnes`]});
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
                        filename: `${props.intl.formatMessage({...AppMessages[`store_deep_dive_brand_analysis_view`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                        columnDelimiter: ',',
                        headerCategory: props.intl.formatMessage({...AppMessages[`brand`]}),
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: `${props.intl.formatMessage({...AppMessages[`store_deep_dive_brand_analysis_view`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                    png: {
                        filename: `${props.intl.formatMessage({...AppMessages[`store_deep_dive_brand_analysis_view`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                }
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
        xaxis: {
            categories: props['paretoAnalysisData']['xAxis'],

            labels: {
                trim: true,
                rotateAlways: false,
                rotate: -40,
                hideOverlappingLabels: false,
                maxHeight: 80,
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
                    return props['paretoAnalysisData']['xAxis'][value - 1];

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
            ],



        },
        yaxis: [{
            title: {
                text: getLabel(),
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
                    // fontWeight: 600,
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
        <Paper style={{height: '65vh',}} elevation={3}>
            <Grid container xs={12} sm={12} md={12} lg={12} style={{maxHeight: "100%"}}>

                <Grid item container xs={6} sm={6} md={6} lg={6}
                      style={{textAlign: "start"}} justify="flex-start">
                    <Typography className={classes.title}>{props.intl.formatMessage({...messages[`storeBrandAnalysisTitle`]})}</Typography>
                </Grid>
                <Grid item container xs={6} sm={6} md={6} lg={6} alignItems={"center"}
                      justify="flex-end">
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

                    <Tooltip title={props.intl.formatMessage({...AppMessages[`visualToolTipText`]})}>
                        <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                    </Tooltip>
                </Grid>
                <Grid item container xs={12} alignItems={"center"}
                      justify="flex-end" style={{paddingRight: '1vw'}}>
                    <Button size="small"
                            variant="contained"
                            onClick={() => props.onClickParetotAnalysisButtons('Invoice')}
                            className={clsx({
                                [classes.productButton]: props['paretoAnalysisButton'] !== 'Invoice',
                                [classes.productButtonActive]: props['paretoAnalysisButton'] === 'Invoice'
                            })}
                    >{props.intl.formatMessage({...AppMessages[`kpi_invoice`]})}</Button>
                    <Button size="small"
                            variant="contained"
                            onClick={() => props.onClickParetotAnalysisButtons('GSV')}
                            className={clsx({
                                [classes.productButton]: props['paretoAnalysisButton'] !== 'GSV',
                                [classes.productButtonActive]: props['paretoAnalysisButton'] === 'GSV'
                            })}
                    >{props.intl.formatMessage({...AppMessages[`kpi_gsv`]})}</Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => props.onClickParetotAnalysisButtons('Units')}
                        className={clsx({
                            [classes.productButton]: props['paretoAnalysisButton'] !== 'Units',
                            [classes.productButtonActive]: props['paretoAnalysisButton'] === 'Units'
                        })}
                    >{props.intl.formatMessage({...AppMessages[`kpi_units`]})}</Button>
                    <Button size="small"
                            variant="contained"
                            onClick={() => props.onClickParetotAnalysisButtons('Tonnes')}
                            className={clsx({
                                [classes.productButton]: props['paretoAnalysisButton'] !== 'Tonnes',
                                [classes.productButtonActive]: props['paretoAnalysisButton'] === 'Tonnes'
                            })}
                    >{props.intl.formatMessage({...AppMessages[`kpi_tonnes`]})}</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}
                      style={{padding: "1vmin"}}>
                    {
                        (() => {
                            if (!props['dataFailed']) {
                                if (!props['spinnerState']) {
                                    return (
                                        <Grid item xs={12}>
                                            <ApexParetoChart options={optionsPareto}
                                                             series={props['paretoAnalysisData']['series']}
                                                             height={window.outerHeight / 2.5}
                                            />
                                        </Grid>
                                    )
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
                                                    height: '30vh',
                                                    width: "100%"
                                                }}>
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
                </Grid>
            </Grid>
        </Paper>
    );
};

export const StoreProductAnalysis = (props) => {
    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`store_deep_dive_product_analysis_view`]}),
            viewId: "store_deep_dive_product_analysis_view",
            apiEnd: "get_product_analysis",
            filters: {
                topFilter: props['productAnalysisFilter'],
                selectionButtons:props['ProductAnalysisButton']
            }
        })
    };
    return (
        <Paper elevation={3} style={{margin: "2vmin", height: '65vh'}}>


            <Grid item xs={12} md={12} sm={12} lg={12}>

                <StoreDeepDiveTable data={props['productAnalysisData']}
                                    selectedItems={props['selectedItems']}
                                    spinnerState={props['spinnerState']}
                                    storeTableDataFail={props['dataFailed']}
                                    name={"ProductAnalysisTable"}
                                    openFilter={props.open}
                                    onCloseFilter={props.handleClose}
                                    onOpenFilter={props.handleOpen}
                                    filterValue={props['productAnalysisFilter']}
                                    onChangeFilter={props.handleProdFilter}
                                    handlePinView={handlePinView}
                                    ProductAnalysisButton={props['ProductAnalysisButton']}
                                    onClickProductAnalysisButton={props.onClickProductAnalysisButton}
                />

            </Grid>
        </Paper>
    );
};

export const StoreProductDistribution = (props) => {
    const classes = useStyles();
    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`store_deep_dive_product_distribution_view`]}),
            viewId: "store_deep_dive_product_distribution_view",
            apiEnd: "get_store_product_distribution",
            filters: {
                selectionButtons: props['productDistributionButton'],
                topFilter: props['storeProductTopFilter']
            }
        })
    };

    const getLabel = () => {
        switch (props['productDistributionButton']) {
            case 'GSV':
                return props.intl.formatMessage({...AppMessages[`kpi_gsv`]});
            case 'Invoice':
                return props.intl.formatMessage({...AppMessages[`kpi_invoice`]});
            case 'Units':
                return props.intl.formatMessage({...AppMessages[`kpi_units`]});
            case 'Tonnes':
                return props.intl.formatMessage({...AppMessages[`kpi_tonnes`]});
        }
    };

    const optionsTrend = {
        colors: ['#00d7b9', '#0000a0'],
        chart: {
            type: 'bar',
            toolbar: {
                show: true,
                export: {
                    csv: {
                        filename: `${props.intl.formatMessage({...AppMessages[`store_deep_dive_product_distribution_view`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                        columnDelimiter: ',',
                        headerCategory: props.intl.formatMessage({...AppMessages[`product`]}),
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: `${props.intl.formatMessage({...AppMessages[`store_deep_dive_product_distribution_view`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                    png: {
                        filename: `${props.intl.formatMessage({...AppMessages[`store_deep_dive_product_distribution_view`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                }
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
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff']
        },
        xaxis: {
            categories: props['productDistributionData']['xAxis'],
            labels: {
                trim: true,
                rotateAlways: false,
                rotate: -30,
                hideOverlappingLabels: false,
                maxHeight: 60,
                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book',
                },


            },
            title: {
                text: props.intl.formatMessage({...messages[`products`]}),
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: '#000',
                    fontSize: '0.9vw',
                    fontFamily: 'MarsCentra-Bold',
                },
            },
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
        <Paper style={{margin: "2vmin",}} elevation={3}>
            <Grid container>
                <Grid item container xs={3} sm={3} md={3} lg={3} style={{textAlign: "start"}} justify={"flex-start"}
                      alignItems={"center"}>
                    <Typography className={classes.title}>{props.intl.formatMessage({...messages[`storeProductDistributionTitle`]})}</Typography>
                </Grid>

                <Grid item container xs={9} sm={9} md={9} lg={9}
                      style={{textAlign: "end"}} alignItems={"center"} justify={"flex-end"}>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => props.onClickProductDistributionButtons('Invoice')}
                        className={clsx({
                            [classes.proDistributionButton]: props['productDistributionButton'] !== 'Invoice',
                            [classes.proDistributionButtonActive]: props['productDistributionButton'] === 'Invoice'
                        })}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_invoice`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => props.onClickProductDistributionButtons('GSV')}
                        className={clsx({
                            [classes.proDistributionButton]: props['productDistributionButton'] !== 'GSV',
                            [classes.proDistributionButtonActive]: props['productDistributionButton'] === 'GSV'
                        })}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_gsv`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => props.onClickProductDistributionButtons('Units')}
                        className={clsx({
                            [classes.proDistributionButton]: props['productDistributionButton'] !== 'Units',
                            [classes.proDistributionButtonActive]: props['productDistributionButton'] === 'Units'
                        })}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_units`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => props.onClickProductDistributionButtons('Tonnes')}
                        className={clsx({
                            [classes.proDistributionButton]: props['productDistributionButton'] !== 'Tonnes',
                            [classes.proDistributionButtonActive]: props['productDistributionButton'] === 'Tonnes'
                        })}
                    >
                       { props.intl.formatMessage({...AppMessages[`kpi_tonnes`]})}
                    </Button>
                    <FormControl className={classes.formControl}
                                 id={"product-distribution-heatmap-filter"}>
                        <Select className={classes.menuItem}
                                labelId="store-deepdive-filter"
                                id="demo-controlled-open-select"
                                open={props.sOpen}
                                onClose={props.handleStoreClose}
                                onOpen={props.handleStoreOpen}
                                value={props['storeProductTopFilter']}
                                onChange={props.handleChangeStoreProductTopFilter}
                        >

                            <MenuItem value={"Top 10"} className={classes.menuItem}>{props.intl.formatMessage({...AppMessages[`top_ten`]})}</MenuItem>
                            <MenuItem value={"Bottom 10"} className={classes.menuItem}>{props.intl.formatMessage({...AppMessages[`bottom_ten`]})}</MenuItem>

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

                    <Tooltip title={props.intl.formatMessage({...AppMessages[`visualToolTipText`]})}>
                        <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                    </Tooltip>
                </Grid>

            </Grid>
            {
                (() => {
                    if (!props['dataFailed']) {
                        if (!props['spinnerState']) {
                            return (
                                <div style={{padding: '2vmin'}}>
                                    <ApexGroupedBarChart
                                        series={props['productDistributionData']['series']}
                                        height={window.outerHeight / 2.2}
                                        options={optionsTrend}/>
                                </div>
                            )
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
                                            height: '30vh',
                                            width: "100%"
                                        }}>
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


const getQueryString = () => {
    return (
        decodeURIComponent(window.location.search).substring(1)
    )
};


/**
 * THE STORE DEEP DIVE PAGE CONTAINER FUNCTION IS USED TO RENDER ALL THE COMPONENTS INSIDE IT AND ALSO TO PASS THE REQUIRED PARAMETERS AND THE DATA TO THE COMPONENTS USED */

export function StoreDeepDivePage({ //selectors
                                      storeDeepDivePage, filterData, selectedFilterData, filterDataFetchFailed, filterDataFetchSpinnerState,selectedlocale,
                                      //actions
                                      onFilterChange, resetDeepDive, filterDataFetch, salesPerformanceDataFetch, salesPerformanceButtonChange, purchaseAnalysisDataFetch,purchaseAnalysisButtonOnChange, purchaseAnalysisBestMixDataFetch, paretoAnalysisDataFetch, paretoAnalysisFilterOnChange, prodAnalysisDataFetch,
                                      productAnalysisButtonOnChange,productAnalysisKpiButtonChange, productDistributionDataFetch, productDistributionButtonOnChange, storeProductTopFilterOnChange, pinMyPage, pinMyView,
                                      window, ...props
                                  }) {
    useInjectReducer({key: "storeDeepDivePage", reducer});
    useInjectSaga({key: "storeDeepDivePage", saga});

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
        salesPerformanceDataFetch();
        paretoAnalysisDataFetch();
        productDistributionDataFetch();

    },[selectedlocale]);
    useEffect(() => {
        let queryString = getQueryString();
        setFilterState(selectedFilterData);
        let duplicate = selectedFilterData['store'].filter(i => i.label === queryString);
        if (duplicate.length === 0) {
            onFilterChange({
                ...selectedFilterData,
                store: [...selectedFilterData['store'], {
                    label: queryString,
                    value: queryString
                }]
            });
        }
        if (filterData['region'].length === 0) {
            filterDataFetch(selectedFilterData);
        }
        if (selectedFilterData['pinPage']) {
            onFilterChange({...selectedFilterData, pinPage: false});
        }
        salesPerformanceDataFetch();
        purchaseAnalysisDataFetch();
        purchaseAnalysisBestMixDataFetch();
        paretoAnalysisDataFetch();
        prodAnalysisDataFetch();
        productDistributionDataFetch();

        return () => {
            resetDeepDive("store");
        }

    }, []);

    const fetchData = () => {

        onFilterChange(filterState);

        salesPerformanceDataFetch();
        purchaseAnalysisDataFetch();
        purchaseAnalysisBestMixDataFetch();
        prodAnalysisDataFetch();
        paretoAnalysisDataFetch();
        productDistributionDataFetch();

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
            "distributor": [],
            "technology": [],
            "channel": [],
            "region": [],
            "store": [{
                label: queryString,
                value: queryString
            }],
            "customer": [],
            "gp": [],
            "salesRep": []
        });

        salesPerformanceDataFetch();
        purchaseAnalysisDataFetch();
        purchaseAnalysisBestMixDataFetch();
        prodAnalysisDataFetch();
        paretoAnalysisDataFetch();
        productDistributionDataFetch();

        filterDataFetch(
            {
                "recent_selected": "store",
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
                "store": [{
                    label: queryString,
                    value: queryString
                }],
                "customer": [],
                "gp": [],
                "salesRep": []
            }
        );
    };

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleProdFilter = (event) => {
        productAnalysisButtonOnChange(event.target.value);
        prodAnalysisDataFetch();
    };
    const [sOpen, setSOpen] = React.useState(false);
    const handleStoreClose = () => {
        setSOpen(false);
    };

    const handleStoreOpen = () => {
        setSOpen(true);
    };
    const handleChangeStoreProductTopFilter = (event) => {
        storeProductTopFilterOnChange(event.target.value);
        productDistributionDataFetch();
    };
    const onClickParetotAnalysisButtons = (data) => {
        paretoAnalysisFilterOnChange(data);
        paretoAnalysisDataFetch();
    };
    const onClickProductAnalysisButton = (data) => {
        productAnalysisKpiButtonChange(data);
        prodAnalysisDataFetch();
    };
    const handlePurchaseButton = (data) => {
        purchaseAnalysisButtonOnChange(data);
        purchaseAnalysisDataFetch();
        purchaseAnalysisBestMixDataFetch();

    };
    const handleSalesTrendButton = (data) => {
        salesPerformanceButtonChange(data);
        salesPerformanceDataFetch();
    };
    const onClickProductDistributionButtons = (data) => {
        productDistributionButtonOnChange(data);
        productDistributionDataFetch();
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
        salesPerformanceDataFetch();
        purchaseAnalysisDataFetch();
        purchaseAnalysisBestMixDataFetch();
        prodAnalysisDataFetch();
        paretoAnalysisDataFetch();
        productDistributionDataFetch();
    };
    const handleChangeCompareTimeRange = (value) => {
        // onFilterChange({...selectedFilterData, 'compare': value});
        onFilterChange({...filterState, 'compare': value.value});
        // fetchData();
        salesPerformanceDataFetch();
        purchaseAnalysisDataFetch();
        purchaseAnalysisBestMixDataFetch();
        prodAnalysisDataFetch();
        paretoAnalysisDataFetch();
        productDistributionDataFetch();
    };
    const [openPinPage, setOpenPinPage] = React.useState(false);

    const [pinPageParams, setPinPageParams] = React.useState({pinName: ""});

    const handlePinPageNameInput = (event) => {
        setPinPageParams({...pinPageParams, "pinName": event.target.value});
    };
    let selected_store;
    if (selectedFilterData['store'].length === 0) {
        selected_store = "None Selected"
    } else if (selectedFilterData['store'].length > 1) {
        selected_store = `${selectedFilterData['store'][0]['label']}, ...+ ${selectedFilterData['store'].length - 1}`;
    } else {
        selected_store = `${selectedFilterData['store'][0]['label']}`;
    }

    return (
        <div id={"storeDeepDiveView"}>
            <Helmet>
                <title>StoreDeepDivePage</title>
                <meta name="description" content="Description of StoreDeepDivePage"/>
            </Helmet>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <Box boxShadow={4} elevation={3} style={{margin: "2vmin"}}>
                            <SideFilter filterData={filterData}
                                // selectedFilter={selectedFilterData}
                                        selectedFilter={filterState}
                                        spinnerState={filterDataFetchSpinnerState}
                                        dataFetchFailed={filterDataFetchFailed}
                                        fetchData={fetchData}
                                // onFilterChange={onFilterChange}
                                        onFilterChange={setFilterState}
                                        filterDataFetch={filterDataFetch}
                                        reset={reset}/>
                        </Box>
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10}>
                        <TitleHeader title={props.intl.formatMessage({...messages[`header`]})}
                                     subHeader={selected_store}
                                     selectedItems={selectedFilterData['store'].map(i => i.label)}
                                     setOpenPinPage={setOpenPinPage}
                                     selectedFilterData={selectedFilterData}
                                     handleChangeTimeRange={handleChangeTimeRange}
                                     handleChangeCompareTimeRange={handleChangeCompareTimeRange}
                                     tooltipData={props.intl.formatMessage({...messages[`storeDeepDiveToolText`]})}
                                     exportPdf={() => exportPdf("storeDeepDiveView", `${props.intl.formatMessage({...messages[`header`]})}-(${selected_store}) - RTM.pdf`)}/>

                        <Grid container>
                            {/*<Grid item xs={12} sm={12} md={12} lg={12} style={{padding: "2vmin", alignItems:"flex-start"}} alignItems={"flex-start"} >*/}
                            {/*    <Paper elevation={5}>*/}
                            {/*        <Typography className={classes.title} style={{textAlign:"flex-start"}}>Distributors' Supplying : TPY - TRANSPORTADORA E DISTRIB PETY LTDA, TPY - TRANSPORTADORA E DISTRIB PETY LTDA </Typography>*/}
                            {/*    </Paper>*/}
                            {/*</Grid>*/}
                            <Grid item xs={6} sm={6} md={6} lg={6} style={{padding: "2vmin"}}>
                                <StoreSalesPerformance
                                    selectedItems={selectedFilterData['store'].map(i => i.label)}
                                    dataFailed={storeDeepDivePage['salesPerformanceDataFail']}
                                    spinnerState={storeDeepDivePage['salesPerformanceDataSpinnerState']}
                                    salesPerformanceData={storeDeepDivePage['salesPerformanceData']}
                                    salesButtonData={storeDeepDivePage['salesPerformanceButton']}
                                    buttonClick={handleSalesTrendButton}
                                    pinMyView={pinMyView}
                                    {...props}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6} style={{padding: "2vmin"}}>
                                <StorePurchaseAnalysis
                                    selectedItems={selectedFilterData['store'].map(i => i.label)}
                                    dataFailed={storeDeepDivePage['purchaseAnalysisDataFail']}
                                    spinnerState={storeDeepDivePage['purchaseAnalysisDataSpinnerState']}
                                    purchaseAnalysisData={storeDeepDivePage['purchaseAnalysisData']}
                                    bestProductMixData={storeDeepDivePage['purchaseAnalysisBestMixData']}
                                    bestProductMixDataFailed={storeDeepDivePage['purchaseAnalysisBestMixDataFail']}
                                    bestProductMixDataSpinnerState={storeDeepDivePage['purchaseAnalysisBestMixDataSpinnerState']}
                                    pinMyView={pinMyView}
                                    purchaseButtonClick={handlePurchaseButton}
                                    purchaseButton={storeDeepDivePage['purchaseAnalysisButton']}
                                    {...props}
                                />

                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6} style={{padding: '2vmin'}}>
                                <StoreBrandAnalysis
                                    selectedItems={selectedFilterData['store'].map(i => i.label)}
                                    onClickParetotAnalysisButtons={onClickParetotAnalysisButtons}
                                    paretoAnalysisButton={storeDeepDivePage['paretoAnalysisButton']}
                                    dataFailed={storeDeepDivePage['paretoAnalysisDataFail']}
                                    spinnerState={storeDeepDivePage['paretoAnalysisDataSpinnerState']}
                                    paretoAnalysisData={storeDeepDivePage['paretoAnalysisData']}
                                    pinMyView={pinMyView}
                                    {...props}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <StoreProductAnalysis
                                    selectedItems={selectedFilterData['store'].map(i => i.label)}
                                    productAnalysisData={storeDeepDivePage['productAnalysisData']}
                                    spinnerState={storeDeepDivePage['productAnalysisDataSpinnerState']}
                                    dataFailed={storeDeepDivePage['productAnalysisDataFail']}
                                    pinMyView={pinMyView}
                                    open={open}
                                    handleClose={handleClose}
                                    handleOpen={handleOpen}
                                    productAnalysisFilter={storeDeepDivePage['productAnalysisFilter']}
                                    handleProdFilter={handleProdFilter}
                                    ProductAnalysisButton={storeDeepDivePage['productAnalysisKpiButton']}
                                    onClickProductAnalysisButton={onClickProductAnalysisButton}
                                    {...props}
                                />

                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <StoreProductDistribution
                                    selectedItems={selectedFilterData['store'].map(i => i.label)}
                                    onClickProductDistributionButtons={onClickProductDistributionButtons}
                                    productDistributionButton={storeDeepDivePage['productDistributionButton']}
                                    sOpen={sOpen}
                                    handleStoreClose={handleStoreClose}
                                    handleStoreOpen={handleStoreOpen}
                                    storeProductTopFilter={storeDeepDivePage['storeProductTopFilter']}
                                    handleChangeStoreProductTopFilter={handleChangeStoreProductTopFilter}
                                    dataFailed={storeDeepDivePage['productDistributionDataFail']}
                                    spinnerState={storeDeepDivePage['productDistributionDataSpinnerState']}
                                    productDistributionData={storeDeepDivePage['productDistributionData']}
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
                            ...params, "pageName": "Store Deep Dive View",
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

StoreDeepDivePage.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    resetDeepDive: PropTypes.func.isRequired,
    filterDataFetch: PropTypes.func.isRequired,
    salesPerformanceDataFetch: PropTypes.func.isRequired,
    salesPerformanceButtonChange: PropTypes.func.isRequired,
    purchaseAnalysisDataFetch: PropTypes.func.isRequired,
    purchaseAnalysisBestMixDataFetch: PropTypes.func.isRequired,
    purchaseAnalysisButtonOnChange: PropTypes.func.isRequired,
    paretoAnalysisDataFetch: PropTypes.func.isRequired,
    paretoAnalysisFilterOnChange: PropTypes.func.isRequired,
    prodAnalysisDataFetch: PropTypes.func.isRequired,
    productAnalysisButtonOnChange: PropTypes.func.isRequired,
    productAnalysisKpiButtonChange: PropTypes.func.isRequired,
    productDistributionDataFetch: PropTypes.func.isRequired,
    productDistributionButtonOnChange: PropTypes.func.isRequired,
    storeProductTopFilterOnChange: PropTypes.func.isRequired,
    pinMyPage: PropTypes.func.isRequired,
    pinMyView: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    storeDeepDivePage: makeSelectStoreDeepDivePage(),
    filterData: makeSelectFilterData(),
    selectedFilterData: makeSelectSelectedFilters(),
    filterDataFetchFailed: makeSelectFilterDataFail(),
    filterDataFetchSpinnerState: makeSelectFilterDataSpinnerState(),
    selectedlocale: makeSelectLocale(),
});

export function mapDispatchToProps(dispatch) {
    return {
        onFilterChange: (data) => dispatch(selectedFilterOnChange(data)),
        resetDeepDive: (data) => dispatch(resetDeepDive(data)),
        filterDataFetch: (data) => dispatch(filterDataFetch(data)),
        salesPerformanceDataFetch: () => dispatch(salesPerformanceFetch()),
        purchaseAnalysisDataFetch: () => dispatch(purchaseAnalysisFetch()),
        purchaseAnalysisBestMixDataFetch: () => dispatch(purchaseAnalysisBestMixFetch()),
        purchaseAnalysisButtonOnChange:(data) => dispatch(purchaseAnalysisButtonChange(data)),
        paretoAnalysisDataFetch: () => dispatch(paretoAnalysisFetch()),
        salesPerformanceButtonChange: (data) => dispatch(salesPerformanceButtonChange(data)),
        paretoAnalysisFilterOnChange: (data) => dispatch(paretoAnalysisFilterChange(data)),
        prodAnalysisDataFetch: () => dispatch(productAnalysisFetch()),
        productAnalysisButtonOnChange: (data) => dispatch(productAnalysisButtonChange(data)),
        productAnalysisKpiButtonChange: (data) => dispatch(productAnalysisKpiButtonChange(data)),
        productDistributionDataFetch: () => dispatch(productDistributionFetch()),
        productDistributionButtonOnChange: (data) => dispatch(productDistributionButtonChange(data)),
        storeProductTopFilterOnChange: (data) => dispatch(storeProductTopFilterOnChange(data)),
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
)(injectIntl(StoreDeepDivePage));
