/**
 *
 * BrandView
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
import makeSelectBrandView, {
    makeSelectBrandHeatmapSuccess,
    makeSelectBrandName,
    makeSelectBrandTrendSuccess
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SideFilter from "../../components/SideFilter";
import BrandHeatMap from "../../components/BrandHeatMap";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Box, Button, Grid, Paper, Tooltip, Typography} from "@material-ui/core";
import {
    brandButtonVsOnChange,
    brandHeatFetch,
    brandHeatmapButtonOnChange,
    brandHeatmapPartitionFilterOnChange,
    brandHeatmapTimeFilterOnChange,
    brandTopFilterOnChange,
    brandTrendClickOnChange,
    brandTrendFetch,
    brandUomButtonOnChange,
    topFilterHeatmapOnChange
} from "./actions";
import history from "../../utils/history";
import {
    makeSelectDataLoadStatus,
    makeSelectFilterData,
    makeSelectFilterDataFail,
    makeSelectFilterDataSpinnerState,
    makeSelectSelectedFilters
} from "../App/selectors";
import {changeDataLoadStatus, filterDataFetch, pinMyPage, pinMyView, selectedFilterOnChange} from "../App/actions";
import {SyncLoader} from "react-spinners";
import clsx from "clsx";
import NoDataAlert from "../../components/NoDataAlert";
import {exportPdf} from "../../utils/utility";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import ApexGroupedBarChart from "../../components/ApexGroupedBarChart";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@mdi/react";
import {mdiPin} from "@mdi/js";
import TitleHeader from "../../components/TitleHeader/Loadable";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import InfoIcon from "@material-ui/icons/Info";
import {injectIntl} from "react-intl";
import AppMessages from "../App/messages";
import messages from "./messages";
import brandDeepDiveMessages from "../BrandDeepDivePage/messages";
import {makeSelectLocale} from "../LanguageProvider/selectors";


/** Styles class*/
const useStyles = makeStyles((theme) => ({
    paper: {
        width: "100%",
        textAlign: "center",
        verticalAlign: "middle",
        height: "100%"
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
    title: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1vw',
        color: '#0000a0e6',
        padding: '1vw',
        margin: '1vmin'

    },
    filterHeading: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '0.7vw',
        color: '#0000a0e6',
        padding: '0.5vw'
    }
    ,
    formControl: {
        margin: '1vmin',
        minWidth: '4vw',
        fontSize: '0.9vw',
        fontFamily: 'MarsCentra-Book',
        color: 'rgb(0,215,185)',
    },
    brandTrendButton: {
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
        },
        '&:disabled': {
            border: "none"
        }
    },
    brandHeatmapButton: {
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
        },
        '&:disabled': {
            border: "none"
        }
    },
    brandTrendButtonActive: {
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
        },
        '&:disabled': {
            border: "none"
        }
    },

    brandHeatmapButtonActive: {
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
        },
        '&:disabled': {
            border: "none"
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
        fontSize: '0.7vw',
    },
    utilityButtons: {
        margin: "1vmin",
        fontFamily: "MarsCentra-Bold",
        fontSize: "0.8vw",
        textTransform: 'none',
        borderRadius: "1vmin"
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

export const BrandTrendChartView = (props) => {
    const classes = useStyles();

    const eventsBrand = {
        click: function (event, chartContext, config,) {
            let dataPointIndex = config['dataPointIndex'];
            let series = config['config']['xaxis']['categories'];
            let name = series[dataPointIndex];
            if (dataPointIndex !== -1) {
                props.onFilterChange({
                    ...props.selectedFilterData,
                    brand: [...props.selectedFilterData['brand'], name],
                });
                history.push(`/RTM/BrandDeepDive?${name}`);
            }
        }
    };

    const getLabel = () => {
        switch (props['brandTrendUomButton']) {
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

    const optionsTrend = {
        colors: ['#00d7b9', '#0000a0'],
        chart: {
            type: 'bar',
            events: eventsBrand,
            toolbar: {
                show: true,
                export: {
                    csv: {
                        filename: `${props.intl.formatMessage({...AppMessages[`brandView`]})}_${props.intl.formatMessage({...messages[`brand_trend_title`]})}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                        columnDelimiter: ',',
                        headerCategory: props.intl.formatMessage({...AppMessages[`brand`]}),
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: `${props.intl.formatMessage({...AppMessages[`brandView`]})}_${props.intl.formatMessage({...messages[`brand_trend_title`]})}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                    png: {
                        filename: `${props.intl.formatMessage({...AppMessages[`brandView`]})}_${props.intl.formatMessage({...messages[`brand_trend_title`]})}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
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
                text: getLabel(),
                rotate: -90,
                offsetX: 9,
                offsetY: 0,
                style: {
                    color: '#000',
                    fontSize: '0.9vw',
                    fontFamily: 'MarsCentra-Bold',
                },
            },
        },

        xaxis: {
            categories: props.brandTrendData['xAxis'],
            labels: {
                trim: true,
                rotateAlways: false,
                rotate: -30,
                hideOverlappingLabels: true,
                maxHeight: 80,
                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book',
                },

            },
            title: {
                text: props.intl.formatMessage({...AppMessages[`brand`]}),
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

    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`brand_view_trend_chart`]}),
            viewId: "brand_view_trend_chart",
            apiEnd: "get_brand_trend",
            filters:
                {
                    vsFilter: props['brandTrendButton'],
                    uomButton: props['brandTrendUomButton'],
                    topFilter: props['brandTopFilter']
                }
        })
    };
    return (
        <Paper style={{margin: "2vmin"}} elevation={5}>

            <Grid container>
                <Grid item container xs={5} sm={12} md={3} lg={2} style={{textAlign: "start"}} justify={"flex-start"}
                      alignItems={"center"}>
                    <Typography className={classes.title}>
                        {props.intl.formatMessage({...messages[`brand_trend_title`]})}
                    </Typography>
                </Grid>
                <Grid item container xs={12} sm={12} md={9} lg={10} style={{textAlign: "end"}} justify={"flex-end"}
                      alignItems={"center"}>
                    <Button
                        size="small"
                        variant="contained"
                        className={clsx({
                            [classes.brandTrendButton]: props.brandTrendUomButton !== 'Invoice',
                            [classes.brandTrendButtonActive]: props.brandTrendUomButton === 'Invoice'
                        })}
                        onClick={() => props.handleTrendUomButtonClick('Invoice')}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_invoice`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        className={clsx({
                            [classes.brandTrendButton]: props.brandTrendUomButton !== 'GSV',
                            [classes.brandTrendButtonActive]: props['brandTrendUomButton'] === 'GSV'
                        })}
                        onClick={() => props.handleTrendUomButtonClick('GSV')}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_gsv`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        className={clsx({
                            [classes.brandTrendButton]: props['brandTrendUomButton'] !== 'Units',
                            [classes.brandTrendButtonActive]: props['brandTrendUomButton'] === 'Units'
                        })}
                        onClick={() => props.handleTrendUomButtonClick('Units')}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_units`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        className={clsx({
                            [classes.brandTrendButton]: props['brandTrendUomButton'] !== 'Tonnes',
                            [classes.brandTrendButtonActive]: props['brandTrendUomButton'] === 'Tonnes'
                        })}
                        onClick={() => props.handleTrendUomButtonClick('Tonnes')}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_tonnes`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        className={clsx({
                            [classes.brandTrendButton]: props['brandTrendUomButton'] !== 'WOS',
                            [classes.brandTrendButtonActive]: props['brandTrendUomButton'] === 'WOS'
                        })}
                        onClick={() => props.handleTrendUomButtonClick('WOS')}>
                        WOS
                    </Button>
                    <FormControl className={classes.formControl} id={"brand-trend-kpi-filter"}>
                        <Select
                            labelId="brand-kpi-filter"
                            id="demo-controlled-open-select"
                            defaultValue={"technology"}
                            open={props.brandTrendTopKpiFilterOpen}
                            onClose={props.handleCloseTrendTopKpiFilter}
                            onOpen={props.handleOpenTrendTopKpiFilter}
                            value={props['brandTrendButton']}
                            onChange={props.handleChangeTopKpiFilter}
                            className={classes.menuItem}
                        >
                            {["GSV", "Tonnes"].indexOf(props['brandTrendUomButton']) > -1 &&
                            <MenuItem value={"target"}
                                      className={classes.menuItem}>{props.intl.formatMessage({...brandDeepDiveMessages[`vsTarget`]})}</MenuItem>}
                            <MenuItem value={"technology"}
                                      className={classes.menuItem}>{props.intl.formatMessage({...messages[`brand_trend_vs_tech_avg`]})}</MenuItem>
                            <MenuItem value={"lastYear"}
                                      className={classes.menuItem}>{props.intl.formatMessage({...brandDeepDiveMessages[`vsHistoricalPerformance`]})}</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl} id={"brand-trend-filter"}>
                        <Select
                            labelId="distributor-filter"
                            id="demo-controlled-open-select"
                            open={props.brandTrendTopFilterOpen}
                            onClose={props.handleCloseTrendTopFilter}
                            onOpen={props.handleOpenTrendTopFilter}
                            value={props['brandTopFilter']}
                            onChange={props.handleChangeTopFilter}
                            className={classes.menuItem}
                        >
                            <MenuItem value={"Top 10"} className={classes.menuItem}>
                                {props.intl.formatMessage({...AppMessages[`top_ten`]})}
                            </MenuItem>
                            <MenuItem value={"Bottom 10"} className={classes.menuItem}>
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
                        title={props.intl.formatMessage({...messages[`brand_trend_tooltip_text`]})}>
                        <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                    </Tooltip>
                </Grid>
            </Grid>
            {
                (() => {
                    if (!props.dataFailed) {
                        if (!props.spinnerState) {
                            return (
                                <Grid item xs={12} sm={12} md={12} lg={12}
                                      style={{width: '100%', padding: '2vmin'}}>
                                    <ApexGroupedBarChart series={props.brandTrendData['series']} options={optionsTrend}
                                                         height={window.outerHeight / 2.1}/>
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
        </Paper>
    );
};

export const BrandHeatMapView = (props) => {
    const classes = useStyles();
    const getUOMLabel = () => {
        switch (props['brandHeatMapButton']) {
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
    const options = {
        chart: {
            type: 'heatmap',
            fontFamily: "MarsCentra-Book",
            toolbar: {
                show: true,
                export: {
                    csv: {
                        filename: `${props.intl.formatMessage({...AppMessages[`brandView`]})}_${props.intl.formatMessage({...messages[`brand_performance_title`]})}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                        columnDelimiter: ',',
                        headerCategory: props.intl.formatMessage({...AppMessages[`brand`]}),
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: `${props.intl.formatMessage({...AppMessages[`brandView`]})}_${props.intl.formatMessage({...messages[`brand_performance_title`]})}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                    png: {
                        filename: `${props.intl.formatMessage({...AppMessages[`brandView`]})}_${props.intl.formatMessage({...messages[`brand_performance_title`]})}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    }
                },
            },
            events: props.events,
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
        tooltip: {
            theme: 'dark',
            custom: function (series) {
                let si = series['seriesIndex'];
                let di = series['dataPointIndex'];
                let ser = series['w']['config']['series'];
                let distBrandRankText = `${ser[si]['name']} : ${new Intl.NumberFormat('pt-BR').format(ser[si]['data'][di]['y'])}`;
                let buttonValueString = `${getUOMLabel()} : ${new Intl.NumberFormat('pt-BR').format(ser[si]['data'][di][props['brandHeatMapButton']])}`;
                let targetText = `Sellout vs Target : ${new Intl.NumberFormat('pt-BR').format(ser[si]['data'][di]['Target'])}`;
                let filterValueString = props['brandTopHeatmapFilter'];
                if (filterValueString === "Actual" || filterValueString === "Growth") {
                    return (
                        '<div class={"arrow_box"}>' +
                        "<span>" +
                        distBrandRankText + "<br>" +
                        buttonValueString +
                        "</span>" +
                        "</div>"
                    );
                } else if (filterValueString === "SelloutvsActual") {
                    return (
                        '<div class={"arrow_box"}>' +
                        "<span>" +
                        distBrandRankText + "<br>" +
                        buttonValueString + "<br>" + targetText +
                        "</span>" +
                        "</div>"
                    );
                }

            },
            style: {
                fontSize: '0.4vw',
                fontFamily: 'MarsCentra-Book'
            },
        },
        plotOptions: {
            heatmap: {
                distributed: true,
                colorScale: (props['brandTopHeatmapFilter'] === "Actual" || props['brandTopHeatmapFilter'] === "Growth") ? {
                    ranges: [

                        {
                            from: -500,
                            to: -1,
                            color: "#f41f2e",
                        },
                        {
                            from: 0,
                            to: 100,
                            color: '#000092',
                            name: 'medium',
                        },
                        {
                            from: 101,
                            to: 1000,
                            color: '#009c86',
                            name: 'medium',
                        },

                    ]
                } : {
                    ranges: [
                        {
                            from: -500,
                            to: -1,
                            color: "#f41f2e",
                        },
                        {
                            from: 0,
                            to: 100,
                            color: '#000092',
                            name: 'medium',
                        },
                        {
                            from: 101,
                            to: 1000,
                            color: '#009c86',
                            name: 'high',
                        },
                    ]

                }
            },

        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val ? new Intl.NumberFormat('pt-BR').format(val.toFixed(1)) + "%" : val + "%";
            },

            style: {
                colors: ['#fff'],
                fontSize: '0.6vw',
                fontFamily: "MarsCentra-Book",
                fontWeight: 'Normal'
            }
        },

        legend: {
            show: false,
        },
        xaxis: {

            labels: {
                trim: true,
                rotateAlways: false,
                rotate: -40,
                hideOverlappingLabels: true,
                maxHeight: 80,
                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book',
                },

            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '0.8vw',
                },
                formatter: (value) => {
                    let condition = isNaN(Number(value));
                    if (condition) {
                        return value.substring(0, 6) + '..';
                    } else return value;
                },


            },

            hover: {
                enabled: true,

            },

        },
    };

    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`brand_view_heat_map`]}),
            viewId: "brand_view_heat_map",
            apiEnd: "get_brand_performance",
            filters:
                {
                    selectionButtons: props['brandHeatMapButton'],
                    selectionDropdown: props['brandTopHeatmapFilter'],
                    selectPartition: props['brandPartitionHeatmapFilter']
                }
        })
    };

    return (
        <Paper style={{margin: "2vmin"}} elevation={5}>
            <Grid container>
                <Grid item xs={3} sm={3} md={3} lg={3} style={{textAlign: "start"}}>
                    <Typography className={classes.title}>
                        {props.intl.formatMessage({...messages[`brand_performance_title`]})}
                    </Typography>
                </Grid>
                <Grid item container xs={9} sm={9} md={9} lg={9} justify={"flex-end"}
                      alignItems={"center"}>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => props.onClickBrandHeatmapKpiNameButtons('Invoice')}
                        className={clsx({
                            [classes.brandHeatmapButton]: props['brandHeatMapButton'] !== 'Invoice',
                            [classes.brandHeatmapButtonActive]: props['brandHeatMapButton'] === 'Invoice'
                        })}
                        disabled={props['brandTopHeatmapFilter'] === "SelloutvsActual"}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_invoice`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => props.onClickBrandHeatmapKpiNameButtons('GSV')}
                        className={clsx({
                            [classes.brandHeatmapButton]: props['brandHeatMapButton'] !== 'GSV',
                            [classes.brandHeatmapButtonActive]: props['brandHeatMapButton'] === 'GSV'
                        })}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_gsv`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => props.onClickBrandHeatmapKpiNameButtons('Units')}
                        className={clsx({
                            [classes.brandHeatmapButton]: props['brandHeatMapButton'] !== 'Units',
                            [classes.brandHeatmapButtonActive]: props['brandHeatMapButton'] === 'Units'
                        })}
                        disabled={props['brandTopHeatmapFilter'] === "SelloutvsActual"}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_units`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => props.onClickBrandHeatmapKpiNameButtons('Tonnes')}
                        className={clsx({
                            [classes.brandHeatmapButton]: props['brandHeatMapButton'] !== 'Tonnes',
                            [classes.brandHeatmapButtonActive]: props['brandHeatMapButton'] === 'Tonnes'
                        })}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_tonnes`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => props.onClickBrandHeatmapKpiNameButtons('WOS')}
                        className={clsx({
                            [classes.brandHeatmapButton]: props['brandHeatMapButton'] !== 'WOS',
                            [classes.brandHeatmapButtonActive]: props['brandHeatMapButton'] === 'WOS'
                        })}
                        disabled={props['brandTopHeatmapFilter'] === "SelloutvsActual"
                        || props['brandTopHeatmapFilter'] === "Growth"
                        }
                    >
                        WOS
                    </Button>
                    <FormControl className={classes.formControl}
                                 id={"brand-performance-heatmap-filter"}>
                        <Select
                            labelId="distributor-filter"
                            id="demo-controlled-open-select"
                            defaultValue={"Actual"}
                            open={props.brandHeatMapDropDownOpen}
                            onClose={props.handleCloseBrandHeatMapDropDown}
                            onOpen={props.handleOpenBrandHeatMapDropDown}
                            value={props['brandTopHeatmapFilter']}
                            onChange={props.handleFilterChange}
                            className={classes.menuItem}
                        >
                            <MenuItem value={"Actual"}
                                      className={classes.menuItem}> {props.intl.formatMessage({...brandDeepDiveMessages[`actual`]})}</MenuItem>
                            <MenuItem value={"SelloutvsActual"}
                                      className={classes.menuItem}>{props.intl.formatMessage({...brandDeepDiveMessages[`selloutTarget`]})}</MenuItem>
                            {["Invoice", "Units", "GSV", "Tonnes"].indexOf(props['brandHeatMapButton']) > -1 &&
                            <MenuItem value={"Growth"}
                                      className={classes.menuItem}>{props.intl.formatMessage({...brandDeepDiveMessages[`growth`]})}</MenuItem>}
                        </Select>
                    </FormControl>
                    <Typography
                        className={classes.filterHeading}>{props.intl.formatMessage({...brandDeepDiveMessages[`partitionBy`]})}</Typography>
                    <FormControl className={classes.formControl}
                                 id={"brand-performance-heatmap-partition-filter"}>
                        <Select
                            labelId="distributor-partition-filter"
                            id="demo-controlled-open-select"
                            defaultValue={"Brand"}
                            open={props.openPartition}
                            onClose={props.handlePartitionClose}
                            onOpen={props.handlePartitionOpen}
                            value={props['brandPartitionHeatmapFilter']}
                            onChange={props.handlePartitionFilterChange}
                            className={classes.menuItem}
                        >
                            <MenuItem value={"Overall"}
                                      className={classes.menuItem}>{props.intl.formatMessage({...brandDeepDiveMessages[`overall`]})}</MenuItem>
                            <MenuItem value={"Brand"}
                                      className={classes.menuItem}>
                                {props.intl.formatMessage({...AppMessages[`brand`]})}
                            </MenuItem>
                            <MenuItem value={"Distributor"}
                                      className={classes.menuItem}>
                                {props.intl.formatMessage({...AppMessages[`distributor`]})}
                            </MenuItem>
                        </Select>
                    </FormControl>

                    {
                        history.location.pathname !== "/RTM/MyPinnedViews" &&
                        <Tooltip title= {props.intl.formatMessage({...AppMessages[`pin_the_component`]})}>
                            <IconButton size="small" className={classes.pinButton} onClick={handlePinView}>
                                <Icon
                                    path={mdiPin}
                                    size={"1vw"}/>
                            </IconButton>
                        </Tooltip>
                    }

                    <Tooltip
                        title={props.intl.formatMessage({...messages[`brand_performance_tooltip_text`]})}>
                        <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                    </Tooltip>
                </Grid>
            </Grid>
            {
                (() => {
                    if (!props.dataFailed) {
                        if (!props.spinnerState) {
                            return (
                                <Grid item xs={12} style={{padding: '2vmin'}}>
                                    <BrandHeatMap series={props.brandHeatmapData}
                                                  heatMapOption={options}
                                                  height={window.outerHeight / 1.5}/>
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
        </Paper>
    )
};

/**
 * THE BRAND VIEW CONTAINER FUNCTION IS USED TO RENDER ALL THE COMPONENTS INSIDE IT AND ALSO TO PASS THE REQUIRED PARAMETERS AND THE DATA TO THE COMPONENTS USED */

export function BrandView({
                              //selectors
                              filterData, selectedFilterData, filterDataFetchFailed, filterDataFetchSpinnerState, brandView, brandTrendData, brandHeatmapData, dataLoadStatus, selectedlocale,
                              //actions
                              onFilterChange, filterDataFetch, brandTrendFetch, brandButtonVsOnChange, brandUomButtonOnChange, brandTopFilterOnChange, brandHeatmapFilterOnChange, brandHeatmapButtonOnChange,
                              brandHeatmapFetch, pinMyPage, brandHeatmapPartitionFilterOnChange, changeDataLoadStatus, pinMyView, window, ...props
                          }) {
    useInjectReducer({key: "brandView", reducer});
    useInjectSaga({key: "brandView", saga});
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
        brandTrendFetch();
    },[selectedlocale]);
    const classes = useStyles();
    useEffect(() => {
        setFilterState(selectedFilterData);
        if (filterData['region'].length === 0) {
            filterDataFetch(selectedFilterData);
        }
        if (selectedFilterData['pinPage']) {
            brandTrendFetch();
            brandHeatmapFetch();
            onFilterChange({...selectedFilterData, pinPage: false});
        } else if (!dataLoadStatus.brandView) {
            brandTrendFetch();
            brandHeatmapFetch();
            changeDataLoadStatus({...dataLoadStatus, brandView: true});
        } else {
            if (brandView['brandTrendData']['series'].length === 0) {
                brandTrendFetch();
            }
            if (brandView['brandHeatMapData'].length === 0) {
                brandHeatmapFetch();
            }
        }

    }, []);
    const [brandHeatMapDropDownOpen, setBrandHeatMapDropDownOpen] = React.useState(false);
    const [brandTrendTopFilterOpen, setBrandTrendTopFilter] = React.useState(false);
    const handleCloseTrendTopFilter = () => {
        setBrandTrendTopFilter(false);
    };
    const handleOpenTrendTopFilter = () => {
        setBrandTrendTopFilter(true);
    };
    const handleCloseBrandHeatMapDropDown = () => {
        setBrandHeatMapDropDownOpen(false);
    };

    const handleOpenBrandHeatMapDropDown = () => {
        setBrandHeatMapDropDownOpen(true);
    };

    const handleChangeTopFilter = (event) => {
        brandTopFilterOnChange(event.target.value);
        brandTrendFetch();
    };
    const [brandTrendTopKpiFilterOpen, setBrandTrendTopKpiFilter] = React.useState(false);
    const handleCloseTrendTopKpiFilter = () => {
        setBrandTrendTopKpiFilter(false);
    };
    const handleOpenTrendTopKpiFilter = () => {
        setBrandTrendTopKpiFilter(true);
    };

    const handleChangeTopKpiFilter = (event) => {
        brandButtonVsOnChange(event.target.value);
        brandTrendFetch();

    };

    const handleFilterChange = (event) => {
        if (event.target.value === 'SelloutvsActual') {
            if (!(brandView['brandHeatMapButton'] === 'Tonnes' || brandView['brandHeatMapButton'] === 'GSV')) {
                onClickBrandHeatmapKpiNameButtons('GSV')
            }
        }
        brandHeatmapFilterOnChange(event.target.value);
        brandHeatmapFetch();
    };

    const [openPartition, setOpenPartition] = React.useState(false);
    const handlePartitionOpen = () => {
        setOpenPartition(true);
    };

    const handlePartitionClose = () => {
        setOpenPartition(false);
    };

    const handlePartitionFilterChange = (event) => {

        brandHeatmapPartitionFilterOnChange(event.target.value);
        brandHeatmapFetch();
    };


    const brandNameSelectFunc = (data) => {
        onFilterChange({...selectedFilterData, brand: [data]});
        history.push(`/RTM/BrandDeepDive?${data}`);
    };

    const fetchData = () => {

        onFilterChange(filterState);

        brandTrendFetch();
        brandHeatmapFetch();

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

        brandTrendFetch();
        brandHeatmapFetch();

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

    const handleTrendUomButtonClick = (data) => {
        if (data === 'GSV' || data === 'Tonnes') {
            brandButtonVsOnChange('target');
        } else {
            brandButtonVsOnChange('technology');
        }
        brandUomButtonOnChange(data);
        brandTrendFetch();
    };


    const onClickBrandHeatmapKpiNameButtons = (data) => {
        brandHeatmapButtonOnChange(data);
        brandHeatmapFetch();
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
        brandTrendFetch();
        brandHeatmapFetch();
    };

    const handleChangeCompareTimeRange = (value) => {
        // onFilterChange({...selectedFilterData, 'compare': value});
        onFilterChange({...filterState, 'compare': value.value});
        // fetchData();
        brandTrendFetch();
        brandHeatmapFetch();
    };


    const [openPinPage, setOpenPinPage] = React.useState(false);

    const [pinPageParams, setPinPageParams] = React.useState({pinName: ""});

    const handlePinPageNameInput = (event) => {
        setPinPageParams({...pinPageParams, "pinName": event.target.value});
    };

    const events = {
        click: function (event, chartContext, config) {

            let seriesIndex = config['seriesIndex'];
            let dataPointIndex = config['dataPointIndex'];
            let series = config['config']['series'];

            let brand = series[seriesIndex]['data'][dataPointIndex]['x'];
            let distributor = series[seriesIndex]['name'];
            onFilterChange({
                ...selectedFilterData,
                distributor: [...selectedFilterData['distributor'], distributor],
                brand: [brand]
            });
            history.push(`/RTM/BrandDeepDive?${brand}`);

        }
    };

    return (
        <div id={"brandView"}>
            <Helmet>
                <title>BrandView</title>
                <meta name="description" content="Description of BrandView"/>
            </Helmet>

            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <Box boxShadow={4} elevation={3} style={{margin: "2vmin 2vmin 2vmin 2vmin"}}>
                            <SideFilter filterData={filterData}
                                // selectedFilter={selectedFilterData}
                                        selectedFilter={filterState}
                                        spinnerState={filterDataFetchSpinnerState}
                                        dataFetchFailed={filterDataFetchFailed} fetchData={fetchData}
                                // onFilterChange={onFilterChange}
                                        onFilterChange={setFilterState}
                                        filterDataFetch={filterDataFetch}
                                        reset={reset}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10}>

                        <TitleHeader title={props.intl.formatMessage({...messages[`header`]})}
                                     setOpenPinPage={setOpenPinPage}
                                     selectedFilterData={selectedFilterData}
                                     handleChangeTimeRange={handleChangeTimeRange}
                                     handleChangeCompareTimeRange={handleChangeCompareTimeRange}
                                     tooltipData={props.intl.formatMessage({...messages[`headerTooltipText`]})}
                                     exportPdf={() => exportPdf("brandView", `${props.intl.formatMessage({...messages[`header`]})} - RTM.pdf`)}/>

                        <Grid container>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <BrandTrendChartView
                                    brandTrendButton={brandView['brandTrendButton']}
                                    brandTrendUomButton={brandView['brandTrendUomButton']}
                                    brandTopFilter={brandView['brandTopFilter']}
                                    dataFailed={brandView['brandTrendDataFail']}
                                    spinnerState={brandView['brandTrendDataSpinnerState']}
                                    handleTrendUomButtonClick={handleTrendUomButtonClick}
                                    brandTrendTopKpiFilterOpen={brandTrendTopKpiFilterOpen}
                                    handleCloseTrendTopKpiFilter={handleCloseTrendTopKpiFilter}
                                    handleOpenTrendTopKpiFilter={handleOpenTrendTopKpiFilter}
                                    handleChangeTopKpiFilter={handleChangeTopKpiFilter}
                                    brandNameSelectFunc={brandNameSelectFunc}
                                    brandTrendData={brandTrendData}
                                    brandTrendTopFilterOpen={brandTrendTopFilterOpen}
                                    handleCloseTrendTopFilter={handleCloseTrendTopFilter}
                                    handleOpenTrendTopFilter={handleOpenTrendTopFilter}
                                    handleChangeTopFilter={handleChangeTopFilter}
                                    onFilterChange={onFilterChange}
                                    selectedFilterData={selectedFilterData}
                                    pinMyView={pinMyView}
                                    {...props}
                                />

                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <BrandHeatMapView
                                    onClickBrandHeatmapKpiNameButtons={onClickBrandHeatmapKpiNameButtons}
                                    brandHeatMapButton={brandView['brandHeatMapButton']}
                                    brandTopHeatmapFilter={brandView['brandTopHeatmapFilter']}
                                    brandHeatMapDropDownOpen={brandHeatMapDropDownOpen}
                                    handleCloseBrandHeatMapDropDown={handleCloseBrandHeatMapDropDown}
                                    handleOpenBrandHeatMapDropDown={handleOpenBrandHeatMapDropDown}
                                    handleFilterChange={handleFilterChange}
                                    openPartition={openPartition}
                                    handlePartitionClose={handlePartitionClose}
                                    handlePartitionOpen={handlePartitionOpen}
                                    brandPartitionHeatmapFilter={brandView['brandPartitionHeatmapFilter']}
                                    handlePartitionFilterChange={handlePartitionFilterChange}
                                    dataFailed={brandView['brandHeatMapDataFail']}
                                    spinnerState={brandView['brandHeatMapDataSpinnerState']}
                                    brandHeatmapData={brandHeatmapData}
                                    events={events}
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
                            ...params, "pageName": "Brand View",
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

BrandView.propTypes = {
    dispatch: PropTypes.func.isRequired,
    brandTrendClickOnChange: PropTypes.func,
    onFilterChange: PropTypes.func.isRequired,
    filterDataFetch: PropTypes.func.isRequired,
    brandTrendFetch: PropTypes.func.isRequired,
    brandButtonVsOnChange: PropTypes.func.isRequired,
    brandTopFilterOnChange: PropTypes.func.isRequired,
    brandUomButtonOnChange: PropTypes.func.isRequired,
    brandHeatmapFilterOnChange: PropTypes.func.isRequired,
    brandHeatmapFetch: PropTypes.func.isRequired,
    brandHeatmapButtonOnChange: PropTypes.func.isRequired,
    brandHeatmapTimeFilterOnChange: PropTypes.func.isRequired,
    brandHeatmapPartitionFilterOnChange: PropTypes.func.isRequired,
    pinMyPage: PropTypes.func.isRequired,
    changeDataLoadStatus: PropTypes.func.isRequired,
    pinMyView: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    brandView: makeSelectBrandView(),
    brandNameSelect: makeSelectBrandName(),
    filterData: makeSelectFilterData(),
    selectedFilterData: makeSelectSelectedFilters(),
    filterDataFetchFailed: makeSelectFilterDataFail(),
    filterDataFetchSpinnerState: makeSelectFilterDataSpinnerState(),
    brandTrendData: makeSelectBrandTrendSuccess(),
    brandHeatmapData: makeSelectBrandHeatmapSuccess(),
    dataLoadStatus: makeSelectDataLoadStatus(),
    selectedlocale: makeSelectLocale(),
});

export function mapDispatchToProps(dispatch) {
    return {
        brandTrendClickOnChange: (data) => dispatch(brandTrendClickOnChange(data)),
        onFilterChange: (data) => dispatch(selectedFilterOnChange(data)),
        filterDataFetch: (data) => dispatch(filterDataFetch(data)),
        brandTrendFetch: () => dispatch(brandTrendFetch()),
        brandButtonVsOnChange: (data) => dispatch(brandButtonVsOnChange(data)),
        brandTopFilterOnChange: (data) => dispatch(brandTopFilterOnChange(data)),
        brandUomButtonOnChange: (data) => dispatch(brandUomButtonOnChange(data)),
        brandHeatmapFilterOnChange: (data) => dispatch(topFilterHeatmapOnChange(data)),
        brandHeatmapButtonOnChange: (data) => dispatch(brandHeatmapButtonOnChange(data)),
        brandHeatmapTimeFilterOnChange: (data) => dispatch(brandHeatmapTimeFilterOnChange(data)),
        brandHeatmapPartitionFilterOnChange: (data) => dispatch(brandHeatmapPartitionFilterOnChange(data)),
        brandHeatmapFetch: () => dispatch(brandHeatFetch()),
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
)(BrandView);
