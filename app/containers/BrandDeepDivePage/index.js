/**
 *
 * BrandDeepDivePage
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
import makeSelectBrandDeepDivePage, {
    makeSelectItemHeatMapSuccess,
    makeSelectProductSkuTrendFilterSuccess,
    makeSelectProductSkuTrendSelectedFilter,
    makeSelectProductTrendSuccess,
    makeSelectSkuTableFilter
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import {Box, Button, Grid, Paper, Tooltip, Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SideFilter from "../../components/SideFilter";
import BrandHeatMap from "../../components/BrandHeatMap";
import BrandDeepdiveTable from "../../components/BrandDeepdiveTable";
import CardsLIA from "../../components/CardsRtm";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {makeSelectBrandName} from "../BrandView/selectors";
import {
    makeSelectFilterData,
    makeSelectFilterDataFail,
    makeSelectFilterDataSpinnerState,
    makeSelectSelectedFilters
} from "../App/selectors";
import {filterDataFetch, pinMyPage, pinMyView, resetDeepDive, selectedFilterOnChange} from "../App/actions";
import {
    cardDataFetch,
    categoryComparisonOnChange,
    categoryOnChange,
    itemFilterHeatmapOnChange,
    itemHeatFetch,
    itemHeatmapButtonOnChange,
    itemPartitionFilterHeatmapOnChange,
    itemTimeFilterHeatmapOnChange,
    productSkuTrendFilterFetch,
    productSkuTrendFilterOnChange,
    productTrendClickOnChange,
    productTrendFetch,
    productTrendFilterOnChange,
    productTrendUomFilterOnChange,
    seeTrendLineFetch,
    skuFilterOnChange,
    skuTableFetch,
    toggleCard,
} from "./actions";
import {SyncLoader} from "react-spinners";
import clsx from "clsx";
import {exportCSVFile, exportPdf} from "../../utils/utility";
import history from "../../utils/history";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import ApexGroupedBarChart from "../../components/ApexGroupedBarChart";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@mdi/react";
import {mdiPin} from "@mdi/js";
import TitleHeader from "../../components/TitleHeader/Loadable";
import NoDataAlert from "../../components/NoDataAlert";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import Zoom from "@material-ui/core/Zoom";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import InfoIcon from "@material-ui/icons/Info";
import './BrandDeepDivePage.css';
import {FormattedMessage, injectIntl} from "react-intl";
import AppMessages from "../App/messages";
import messages from "./messages";
import ReactPickyModified from "../../components/ReactPickyModified";
import {makeSelectLocale} from "../LanguageProvider/selectors";
import PurchaseAnalysisMessages from "../../components/PurchaseAnalysisCard/messages"
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
    filterHeading: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '0.7vw',
        color: '#0000a0e6',
        padding: '0.5vw'
    }
    ,
    formControl: {
        margin: 'auto',
        minWidth: '10vw',
        padding: "0.2vw",
        fontSize: '0.95vw',
        fontFamily: 'MarsCentra-Book',
        color: 'rgb(0,215,185)'
    },
    itemHeatmapButton: {
        margin: "0.8vmin",
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
    formLabel: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: "0.8vw",
        margin: '0.8vw 0px',
        color: '#0000a0e6',
        letterSpacing: 0,
        borderBottom: 0,
        textAlign: 'center'
    },
    itemHeatmapButtonActive: {
        margin: "0.8vmin",
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
    formControlGrid: {
        margin: '1.2vmin',
        minWidth: '5vw',
        fontSize: '0.8vw',
        fontFamily: 'MarsCentra-Book',
        color: 'rgb(0,215,185)'
    },
    typographyProduct: {
        // margin: '0.8vmin',
        // minWidth: '5vw',
        paddingTop: '1.4vh',
        fontSize: '0.7vw',
        fontFamily: 'MarsCentra-Bold',
        color: '#0000a0'
    },
    productTrendButton: {
        margin: "0.8vmin",
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
    productTrendButtonActive: {
        margin: "0.8vmin",
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
    largeFormControl: {
        minWidth: "10.5vw",
        maxWidth: "11.5vw",
        padding: '1vmin',
        fontSize: '0.8vw',
        fontFamily: 'MarsCentra-Book',
    },
    largeFormControlProduct: {
        minWidth: "14vw",
        maxWidth: "14.5vw",
        padding: '1vmin',
        fontSize: '0.8vw',
        fontFamily: 'MarsCentra-Book',
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
    grid: {
        padding: '3px',
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        width: '100%',
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
        // color: "#fff",
        fontFamily: "MarsCentra-Bold",
        fontSize: "0.9vw",
        textTransform: 'none',
        borderRadius: "1vmin"
    },
    menuItem: {
        fontFamily: "MarsCentra-Book",
        fontSize: "0.8vw",
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

export const BrandDeepDiveCards = (props) => {
    const classes = useStyles();

    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`brand_deep_dive_cards`]}),
            viewId: "brand_deep_dive_cards",
            apiEnd: "performance_cards",
            filters:
                {
                    toggleState: {...props['toggleState']},
                    view: "brand_deep_dive"
                }
        })
    };

    const exportToCsv = () => {
        let header = [{text: 'KPI', dataField: "KPI"}, {
            dataField: 'Current Year',
            text: props.intl.formatMessage({...PurchaseAnalysisMessages[`currentYear`]})
        }, {dataField: 'Last Year', text: props.intl.formatMessage({...PurchaseAnalysisMessages[`lastYear`]})}, {dataField: 'Target', text: props.intl.formatMessage({...AppMessages[`kpi_target`]})}];
        let data = props['cardData'].map((i) => {
            if (['gsv', 'tonnes'].indexOf(i.kpi) > -1) {
                return ({
                    ['Target']: i['change'],
                    ['KPI']: i['title'],
                    ['Current Year']: i['valueTY'],
                    ['Last Year']: i['valueLY']
                });
            } else {
                return ({
                    ['Target']: "NA",
                    ['KPI']: i['title'],
                    ['Current Year']: i['valueTY'],
                    ['Last Year']: i['valueLY']
                });
            }

        });
        exportCSVFile(data, `${props.intl.formatMessage({...AppMessages[`brand_deep_dive_cards`]})}_${props['selectedItems']}_
        (${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()}_${new Date().getMinutes()}_${new Date().getSeconds()}).csv`, header);
    };

    return (
        <Grid item container xs={12}>
            <div style={{width: "100%"}}>
                <div style={{float: "right"}}>
                    <Tooltip title={<FormattedMessage {...AppMessages[`click_to_download`]} />}>
                    <IconButton size={"small"} className={classes.csvButtonStyle} onClick={exportToCsv}>
                        <SystemUpdateAltIcon fontSize={"small"}/>
                    </IconButton>
                    </Tooltip>
                    {
                        history.location.pathname !== "/RTM/MyPinnedViews" &&
                        <Tooltip title={<FormattedMessage {...AppMessages[`pin_the_component`]} />}>
                            <IconButton size="small" className={classes.pinButton}
                                        onClick={handlePinView}>
                                <Icon
                                    path={mdiPin}
                                    size={"1vw"}/>
                            </IconButton>
                        </Tooltip>
                    }
                    <Tooltip title={<FormattedMessage {...messages.brandCardsHeaderInfoTooltipText} />}>
                        <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                    </Tooltip>
                </div>
                {
                    (() => {
                        if (!props['dataFailed']) {
                            if (!props['spinnerState']) {
                                return (
                                    <Grid container item xs={12} sm={12} md={12} lg={12} className={classes.grid}
                                          id={"brand-deep-dive-cards"}>
                                        {
                                            props['cardData'].map((item) => {
                                                return (
                                                    <Grid key={item.title} item xs={12} sm={6} md={4} lg={2}
                                                          className={classes.grid}>
                                                        <Paper elevation={3}
                                                               style={{
                                                                   width: "fit-content",
                                                                   height: 'fit-content'
                                                               }}>
                                                            <CardsLIA data={item} toggleCard={props.toggleCard}
                                                                      toggleState={props['toggleState']}
                                                                      categoryKpiOnChange={props.categoryKpiOnChange}
                                                                      categoryFilterOnChange={props.categoryFilterOnChange}
                                                                      trendLineData={props['trendLineData']}
                                                                      trendLineSpinner={props['trendLineSpinnerState']}
                                                                      trendLineDataFetchFailed={props['trendLineFail']}
                                                                      trendLineFetch={props.trendLineFetch}
                                                                      categoryKpiList={props['categoryKpiList']}
                                                                      selectedCategoryKpi={props['selectedCategoryKpi']}
                                                                      categoryFilterData={props['categoryFilterData']}
                                                                      categoryFilterFetchSpinner={props['categoryFilterSpinnerState']}
                                                                      categoryFilterFetchFailed={props['categoryFilterFail']}
                                                                      categorySelectedFilterData={props['categorySelectedFilterData']}
                                                                      pageTitle={props['pageTitle']}
                                                            />
                                                        </Paper>
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                )
                            } else {
                                return (
                                    <Paper elevation={3} style={{width: "100%"}}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '20vh',
                                                marginTop: '2vw'
                                            }}>
                                            <SyncLoader size={15} margin={2} color="#0000a0"
                                                        loading/>
                                        </div>
                                    </Paper>
                                );
                            }
                        } else {
                            return <NoDataAlert/>;
                        }
                    })()
                }
            </div>
        </Grid>
    );
};

export const ProductSKUTrendChart = (props) => {
    const classes = useStyles();
    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`product_sku_trend_chart`]}),
            viewId: "product_sku_trend_chart",
            apiEnd: "get_brand_deep_dive_prod_trend",
            filters:
                {
                    uomButton: props['productTrendUomFilter'],
                    topFilter: props['productTrendFilter'],
                    vsFilter: props['productTrendButton'],
                    productSkuTrendFilter: props.selectedBrandTrendData
                }
        })
    };

    const getLabel = () => {
        switch (props['productTrendUomFilter']) {
            case 'GSV':
                return  props.intl.formatMessage({...AppMessages[`kpi_gsv`]});
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
            toolbar: {
                show: true,
                export: {
                    csv: {
                        filename: `${props.intl.formatMessage({...AppMessages[`product_sku_trend_chart`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                        columnDelimiter: ',',
                        headerCategory: props.intl.formatMessage({...messages[`product`]}),
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: `${props.intl.formatMessage({...AppMessages[`product_sku_trend_chart`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                    png: {
                        filename: `${props.intl.formatMessage({...AppMessages[`product_sku_trend_chart`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
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
            }
        },
        xaxis: {
            categories: props['productTrendData']['xAxis'],
            labels: {
                trim:true,
                rotateAlways:false,
                rotate: -20,
                hideOverlappingLabels:true,
                maxHeight:100,
                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book',
                },

            },

            title: {
                text: props.intl.formatMessage({...messages[`product`]}),
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
            style: {
                fontSize: '0.8vw',
                fontFamily: 'MarsCentra-Book',
            },

        }
    };

    return (
        <Paper style={{margin: "2vmin"}} elevation={3}>
            <Grid container>
                <Grid item xs={3} sm={3} md={3} lg={2} style={{textAlign: "start"}}>
                    <Typography className={classes.title}>{props.intl.formatMessage({...messages[`productTrend_title`]})}</Typography>
                </Grid>
                <Grid item container xs={9} sm={9} md={9} lg={10} alignItems={"center"}
                      justify={"flex-end"}
                >
                    <Button
                        size="small"
                        variant="contained"
                        className={clsx({
                            [classes.productTrendButton]: props['productTrendUomFilter'] !== 'Invoice',
                            [classes.productTrendButtonActive]: props['productTrendUomFilter'] === 'Invoice'
                        })}
                        onClick={() => props.handleTrendButtonClick('Invoice')}
                    >
                        <FormattedMessage {...AppMessages[`kpi_invoice`]} />
                    </Button>

                    <Button
                        size="small"
                        variant="contained"
                        className={clsx({
                            [classes.productTrendButton]: props['productTrendUomFilter'] !== 'GSV',
                            [classes.productTrendButtonActive]: props['productTrendUomFilter'] === 'GSV'
                        })}
                        onClick={() => props.handleTrendButtonClick('GSV')}
                    >
                        <FormattedMessage {...AppMessages[`kpi_gsv`]} />
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        className={clsx({
                            [classes.productTrendButton]: props['productTrendUomFilter'] !== 'Units',
                            [classes.productTrendButtonActive]: props['productTrendUomFilter'] === 'Units'
                        })}
                        onClick={() => props.handleTrendButtonClick('Units')}
                    >
                        <FormattedMessage {...AppMessages[`kpi_units`]} />
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        className={clsx({
                            [classes.productTrendButton]: props['productTrendUomFilter'] !== 'Tonnes',
                            [classes.productTrendButtonActive]: props['productTrendUomFilter'] === 'Tonnes'
                        })}
                        onClick={() => props.handleTrendButtonClick('Tonnes')}
                    >
                        <FormattedMessage {...AppMessages[`kpi_tonnes`]} />
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        className={clsx({
                            [classes.productTrendButton]: props['productTrendUomFilter'] !== 'WOS',
                            [classes.productTrendButtonActive]: props['productTrendUomFilter'] === 'WOS'
                        })}
                        onClick={() => props.handleTrendButtonClick('WOS')}
                    >
                        WOS
                    </Button>
                    <FormControl className={classes.formControlGrid}
                                 id={"product-sku-trend-kpi-filter"}>
                        <Select
                            labelId="product-kpi-filter"
                            id="demo-controlled-open-select"
                            open={props.productTrendTopKpiFilterOpen}
                            onClose={props.handleCloseTrendTopKpiFilter}
                            onOpen={props.handleOpenTrendTopKpiFilter}
                            value={props['productTrendButton']}
                            onChange={props.handleChangeUomFilter}
                            className={classes.menuItem}
                        >
                            <MenuItem value={"brand"} className={classes.menuItem}>  <FormattedMessage {...messages.vsBrandAverage} /></MenuItem>
                            {["GSV", "Tonnes"].indexOf(props['productTrendUomFilter']) > -1 &&
                            <MenuItem value={"target"} className={classes.menuItem}> <FormattedMessage {...messages.vsTarget} /></MenuItem>}
                            {/*{["Invoice","Units","GSV","Tonnes"].indexOf(props['productTrendUomFilter']) > -1 &&*/}
                            <MenuItem value={"lastYear"} className={classes.menuItem}> <FormattedMessage {...messages.vsHistoricalPerformance} /></MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControlGrid}
                                 id={"product-sku-trend-filter"}>
                        <Select
                            labelId="distributor-filter"
                            id="demo-controlled-open-select"
                            defaultValue={"Top 10"}
                            open={props.topFilterOpen}
                            onClose={props.handleCloseTopFilter}
                            onOpen={props.handleOpenTopFilter}
                            value={props['productTrendFilter']}
                            onChange={props.handleChange}
                            className={classes.menuItem}
                        >
                            <MenuItem value={"Top 10"} className={classes.menuItem}>{props.intl.formatMessage( {...AppMessages[`top_ten`]})}</MenuItem>
                            <MenuItem value={"Bottom 10"} className={classes.menuItem}>{props.intl.formatMessage( {...AppMessages[`bottom_ten`]})}</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography className={classes.typographyProduct}>{props.intl.formatMessage( {...messages[`product`]})}:</Typography>
                    <FormControl className={classes.largeFormControl}>
                        <ReactPickyModified
                            id={"Products/sku"}
                            options={props['productSkuTrendFilterData']}
                            multiple={true}
                            includeFilter
                            includeSelectAll
                            value={props.selectedBrandTrendData}
                            onChange={value => props.handleProductFilterChange(value)}
                            allSelectedPlaceholder={props.selectedBrandTrendData.length === props['productSkuTrendFilterData'].length ? 'All' : "%s selected"}
                            manySelectedPlaceholder={'%s selected'}
                            numberDisplayed={2}
                            clearFilterOnClose={true}
                            selectAllMode={"filtered"}
                            placeholder={props.intl.formatMessage( {...AppMessages[`none_selected`]})}
                        />
                    </FormControl>
                    {
                        history.location.pathname !== "/RTM/MyPinnedViews" &&
                        <Tooltip title={props.intl.formatMessage( {...AppMessages[`pin_the_component`]})}>
                            <IconButton size="small" className={classes.pinButton}
                                        onClick={handlePinView}>
                                <Icon
                                    path={mdiPin}
                                    size={"1vw"}/>
                            </IconButton>
                        </Tooltip>
                    }
                    <Tooltip title={props.intl.formatMessage( {...messages[`productTooltipText`]})}>
                        <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                    </Tooltip>
                </Grid>
            </Grid>
            {
                (() => {
                    if (!props['dataFail']) {
                        if (!props['spinnerState']) {
                            return (
                                <Grid item xs={12} sm={12} md={12} lg={12}
                                      style={{width: '100%', padding: '3vmin'}}>
                                    <ApexGroupedBarChart height={window.outerHeight / 2}
                                                         series={props['productTrendData']['series']}
                                                         options={optionsTrend}/>
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


export const SalesBreakDownHeatMap = (props) => {
    const classes = useStyles();
const toolTipLabel = (val) => {
        switch (val) {
            case 'GSV':
                return  props.intl.formatMessage({...AppMessages[`kpi_gsv`]});
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
    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`brand_deep_dive_sales_breakdown`]}),
            viewId: "brand_deep_dive_sales_breakdown",
            apiEnd: "get_brand_deep_dive_sales_breakdown",
            filters:
                {
                    selectionButtons: props['itemHeatMapButton'],
                    selectionDropdown: props['itemHeatMapFilter'],
                    selectPartition: props['itemHeatMapPartitionFilter'],
                }
        });
    };

    const events = {
        click: function (event, chartContext, config) {
            let seriesIndex = config['seriesIndex'];
            let dataPointIndex = config['dataPointIndex'];
            let series = config['config']['series'];
            let product = series[seriesIndex]['data'][dataPointIndex]['x'];
            props.handleSkuTableFilterChange(product);
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
                        filename: `${props.intl.formatMessage({...AppMessages[`brand_deep_dive_sales_breakdown`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                        columnDelimiter: ',',
                        headerCategory: props.intl.formatMessage({...messages[`product`]}),
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: `${props.intl.formatMessage({...AppMessages[`brand_deep_dive_sales_breakdown`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                    png: {
                        filename: `${props.intl.formatMessage({...AppMessages[`brand_deep_dive_sales_breakdown`]})}_${props['selectedItems']}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    }
                },
            },
            events: events,
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
                let prodDistRankText = ` ${ser[si]['name']} : ${new Intl.NumberFormat('pt-BR').format(ser[si]['data'][di]['y'])}`;
                let buttonValueString = ` : ${new Intl.NumberFormat('pt-BR').format(ser[si]['data'][di][props['itemHeatMapButton']])}`;
                let targetText = `Sellout vs Target : ${new Intl.NumberFormat('pt-BR').format(ser[si]['data'][di]['Target'])}`;
                let filterValueString = props['itemHeatMapFilter'];
                if (filterValueString === "Actual" || filterValueString === "Growth") {
                    return (
                        '<div class={"arrow_box"}>' +
                        "<span>" +
                        prodDistRankText + "<br>" + toolTipLabel(props['itemHeatMapButton']) +
                        buttonValueString +
                        "</span>" +
                        "</div>"
                    );
                } else if (filterValueString === "SelloutvsActual") {
                    return (
                        '<div class={"arrow_box"}>' +
                        "<span>" +
                        prodDistRankText + "<br>" + toolTipLabel(props['itemHeatMapButton']) +
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
            x: {
                formatter: function (value) {
                    return value ? value : value;
                }
            }

        },
        plotOptions: {
            heatmap: {
                distributed: true,
                colorScale: (props['itemHeatMapFilter'] === "Actual" || props['itemHeatMapFilter'] === "Growth") ? {
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
                            name: 'medium',
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
                trim:true,
                rotateAlways:false,
                rotate: -40,
                hideOverlappingLabels:true,
                maxHeight:60,
                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book'
                },

            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book'
                },
                formatter: (value) => {
                    let condition = isNaN(Number(value));
                    if (condition) {
                        return value.substring(0, 6) + '..';
                    } else return value;
                },

            },
        },
    };

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={3} sm={6} md={4} lg={4} container justify={"flex-start"} style={{textAlign: "start"}}
                      alignItems={"flex-start"}>
                    <Typography className={classes.title}>{props.intl.formatMessage({...messages[`productPerformance_title`]})}</Typography>
                </Grid>
                <Grid item container xs={9} sm={12} md={8} lg={8}
                      alignItems={"center"}
                      justify={"flex-end"}>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => props.onClickItemHeatMapKpiNameButtons('Invoice')}
                        className={clsx({
                            [classes.itemHeatmapButton]: props['itemHeatMapButton'] !== 'Invoice',
                            [classes.itemHeatmapButtonActive]: props['itemHeatMapButton'] === 'Invoice'
                        })}
                        disabled={props['itemHeatMapFilter'] === 'SelloutvsActual'}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_invoice`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => props.onClickItemHeatMapKpiNameButtons('GSV')}
                        className={clsx({
                            [classes.itemHeatmapButton]: props['itemHeatMapButton'] !== 'GSV',
                            [classes.itemHeatmapButtonActive]: props['itemHeatMapButton'] === 'GSV'
                        })}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_gsv`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => props.onClickItemHeatMapKpiNameButtons('Units')}
                        className={clsx({
                            [classes.itemHeatmapButton]: props['itemHeatMapButton'] !== 'Units',
                            [classes.itemHeatmapButtonActive]: props['itemHeatMapButton'] === 'Units'
                        })}
                        disabled={props['itemHeatMapFilter'] === 'SelloutvsActual'}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_units`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => props.onClickItemHeatMapKpiNameButtons('Tonnes')}
                        className={clsx({
                            [classes.itemHeatmapButton]: props['itemHeatMapButton'] !== 'Tonnes',
                            [classes.itemHeatmapButtonActive]: props['itemHeatMapButton'] === 'Tonnes'
                        })}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_tonnes`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => props.onClickItemHeatMapKpiNameButtons('WOS')}
                        className={clsx({
                            [classes.itemHeatmapButton]: props['itemHeatMapButton'] !== 'WOS',
                            [classes.itemHeatmapButtonActive]: props['itemHeatMapButton'] === 'WOS'
                        })}
                        disabled={props['itemHeatMapFilter'] === 'SelloutvsActual'
                        || props['itemHeatMapFilter'] === 'Growth'
                        }
                    >
                        WOS
                    </Button>

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
                    <Tooltip
                        title={props.intl.formatMessage( {...messages[`productPerformanceTooltipText`]})}>
                        <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                    </Tooltip>
                </Grid>

                <Grid item xs={12} container alignItems={"center"} justify={"flex-end"}>
                    <FormControl className={classes.formControlGrid}
                                 id={"item-level-sales-heatmap-filter"}>
                        <Select
                            labelId="item-filter"
                            id="demo-controlled-open-select"
                            defaultValue={"Actual"}
                            open={props.open}
                            onClose={props.handleClose}
                            onOpen={props.handleOpen}
                            value={props['itemHeatMapFilter']}
                            onChange={props.handleItemFilterChange}
                            className={classes.menuItem}
                        >

                            <MenuItem value={"Actual"}
                                      className={classes.menuItem}>{props.intl.formatMessage( {...messages[`actual`]})}</MenuItem>
                            <MenuItem value={"SelloutvsActual"}
                                      className={classes.menuItem}>{props.intl.formatMessage( {...messages[`selloutTarget`]})}</MenuItem>
                            {["Invoice","Units","GSV","Tonnes"].indexOf(props['itemHeatMapButton']) > -1 &&
                            <MenuItem value={"Growth"}
                                      className={classes.menuItem}>{props.intl.formatMessage( {...messages[`growth`]} )}</MenuItem>}
                        </Select>
                    </FormControl>
                    <Typography className={classes.filterHeading}>{props.intl.formatMessage( {...messages[`partitionBy`]})}</Typography>
                    <FormControl className={classes.formControlGrid}
                                 id={"item-heatmap-partition-filter"}>
                        <Select
                            labelId="item-partition-filter"
                            id="demo-controlled-open-select"
                            defaultValue={"Product"}
                            open={props.openPartition}
                            onClose={props.handlePartitionClose}
                            onOpen={props.handlePartitionOpen}
                            value={props['itemHeatMapPartitionFilter']}
                            onChange={props.handlePartitionFilterChange}
                            className={classes.menuItem}
                        >
                            <MenuItem value={"Overall"}
                                      className={classes.menuItem}>{props.intl.formatMessage( {...messages[`overall`]})}</MenuItem>
                            <MenuItem value={"Product"}
                                      className={classes.menuItem}>{props.intl.formatMessage( {...messages[`product`]})}</MenuItem>
                            <MenuItem value={"Distributor"}
                                      className={classes.menuItem}> {props.intl.formatMessage( {...AppMessages[`distributor`]})}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            {
                (() => {
                    if (!props['dataFail']) {
                        if (!props['spinnerState']) {
                            return (
                                <Grid item xs={12} style={{padding: '2vmin'}}>
                                    <BrandHeatMap
                                        series={props.itemHeatMapData}
                                        heatMapOption={options}
                                        height={window.outerHeight / 1.5}
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
        </React.Fragment>
    );
};

const getQueryString = () => {
    return (
        decodeURIComponent(window.location.search).substring(1)
    )
};

/**
 * THE BRAND DEEP DIVE PAGE CONTAINER FUNCTION IS USED TO RENDER ALL THE COMPONENTS INSIDE IT AND ALSO TO PASS THE REQUIRED PARAMETERS AND THE DATA TO THE COMPONENTS USED */

export function BrandDeepDivePage({
                                      //selectors
                                      filterData, selectedFilterData, filterDataFetchFailed, filterDataFetchSpinnerState, brandDeepDivePage,
                                      selectedBrandTrendData, itemHeatMapData, selectedSkuTableFilterData, selectedlocale,
                                      //actions
                                      onFilterChange, resetDeepDive, filterDataFetch, toggleCard, cardDataFetch, categoryKpiOnChange, categoryFilterOnChange, trendLineFetch,
                                      productTrendDataFetch, productSkuFilterDataFetch, itemHeatMapDataFetch, productTrendClickOnChange,
                                      productSkuTrendFilterOnChange, productTrendFilterOnChange, productTrendUomFilterOnChange,
                                      itemHeatMapFilterOnChange, itemHeatMapButtonOnChange, itemPartitionFilterHeatmapOnChange, skuTableFetch, skuTableFilterOnChange, pinMyPage, pinMyView,
                                      window,...props
                                  }) {
    useInjectReducer({key: "brandDeepDivePage", reducer});
    useInjectSaga({key: "brandDeepDivePage", saga});

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
    useEffect(()=>{
        setFilterState(selectedFilterData);
    },[selectedFilterData]);
    useEffect(()=>{
//call api action here
        productTrendDataFetch();
    },[selectedlocale]);
    useEffect(() => {
        let queryString = getQueryString();
        setFilterState(selectedFilterData);
        onFilterChange({
            ...selectedFilterData,
            brand: [...new Set([...selectedFilterData['brand'], queryString])]
        });

        if (filterData['region'].length === 0) {
            filterDataFetch();
        }

        productTrendDataFetch();
        productSkuFilterDataFetch();
        itemHeatMapDataFetch();
        cardDataFetch();

        if (selectedFilterData['pinPage']) {
            onFilterChange({...selectedFilterData, pinPage: false});
        }
        return () => {
            resetDeepDive('brand');
        }
    }, []);


    const [topFilterOpen, setTopFilterOpen] = React.useState(false);
    const handleCloseTopFilter = () => {
        setTopFilterOpen(false);
    };

    const handleOpenTopFilter = () => {
        setTopFilterOpen(true);
    };

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleChange = (event) => {
        productTrendFilterOnChange(event.target.value);
        productTrendDataFetch();
    };
    const handleProductFilterChange = (value) => {
        productSkuTrendFilterOnChange(value);
        productTrendDataFetch();
    };
    const handleSkuTableFilterChange = (value) => {
        skuTableFilterOnChange(value);
        skuTableFetch();
    };
    const handleItemFilterChange = (event) => {
        if (event.target.value === 'SelloutvsActual') {
            if (!(brandDeepDivePage['itemHeatMapButton'] === 'Tonnes' || brandDeepDivePage['itemHeatMapButton'] === 'GSV')) {
                onClickItemHeatMapKpiNameButtons('GSV')
            }
        }
        itemHeatMapFilterOnChange(event.target.value);
        itemHeatMapDataFetch();
    };

    const [productTrendTopKpiFilterOpen, setProductTrendTopKpiFilter] = React.useState(false);
    const handleCloseTrendTopKpiFilter = () => {
        setProductTrendTopKpiFilter(false);
    };
    const handleOpenTrendTopKpiFilter = () => {
        setProductTrendTopKpiFilter(true);
    };

    const handleTrendButtonClick = (data) => {
        if (data === 'GSV' || data === 'Tonnes') {
            productTrendClickOnChange('target');
        } else {
            productTrendClickOnChange('brand');

        }
        productTrendUomFilterOnChange(data);
        productTrendDataFetch();
    };

    const handleChangeUomFilter = (event) => {

        productTrendClickOnChange(event.target.value);
        productTrendDataFetch();
    };
    const onClickItemHeatMapKpiNameButtons = (data) => {
        itemHeatMapButtonOnChange(data);
        itemHeatMapDataFetch();
    };
    const [openPartition, setOpenPartition] = React.useState(false);
    const handlePartitionOpen = () => {
        setOpenPartition(true);
    };

    const handlePartitionClose = () => {
        setOpenPartition(false);
    };

    const handlePartitionFilterChange = (event) => {
        itemPartitionFilterHeatmapOnChange(event.target.value);
        itemHeatMapDataFetch();
    };

    const fetchData = () => {

        onFilterChange(filterState);

        productTrendDataFetch();
        cardDataFetch();
        itemHeatMapDataFetch();
        productSkuFilterDataFetch();
        skuTableFetch();
    };
    const reset = ()=>{

        let queryString = getQueryString();

        onFilterChange({
            "recent_selected": "",
            "recent_selected_dropdown_values": [],
            "chain": [],
            "manager": [],
            "coordinator": [],
            "timeRange": "YTD",
            "compare": "Last Year",
            "brand": [...new Set([...selectedFilterData['brand'], queryString])],
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

        productTrendDataFetch();
        cardDataFetch();
        itemHeatMapDataFetch();
        productSkuFilterDataFetch();
        skuTableFetch();

        filterDataFetch(
            {
                "recent_selected": "brand",
                "recent_selected_dropdown_values": [],
                "chain": [],
                "manager": [],
                "coordinator": [],
                "timeRange": "YTD",
                "compare": "Last Year",
                "brand": [...new Set([...selectedFilterData['brand'], queryString])],
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
    const handleChangeTimeRange = (value) => {
        if (value.value === 'YTD') {
            // onFilterChange({...selectedFilterData, 'timeRange': value, 'compare': 'Last Year'});
            onFilterChange({...filterState, 'timeRange': value.value, 'compare': 'Last Year'});
        } else {
            // onFilterChange({...selectedFilterData, 'timeRange': value, 'compare': 'Current Year'});
            onFilterChange({...filterState, 'timeRange': value.value, 'compare': 'Current Year'});
        }
        // fetchData();
        productTrendDataFetch();
        cardDataFetch();
        itemHeatMapDataFetch();
        productSkuFilterDataFetch();
        skuTableFetch();
    };

    const handleChangeCompareTimeRange = (value) => {
        // onFilterChange({...selectedFilterData, 'compare': value});
        onFilterChange({...filterState, 'compare': value.value});
        // fetchData();
        productTrendDataFetch();
        cardDataFetch();
        itemHeatMapDataFetch();
        productSkuFilterDataFetch();
        skuTableFetch();
    };

    const [openPinPage, setOpenPinPage] = React.useState(false);

    const [pinPageParams, setPinPageParams] = React.useState({pinName: ""});

    const handlePinPageNameInput = (event) => {
        setPinPageParams({...pinPageParams, "pinName": event.target.value});
    };

    let selected_brand;
    if (selectedFilterData['brand'].length === 0) {
        selected_brand = "None Selected"
    } else if (selectedFilterData['brand'].length > 1) {
        selected_brand = `${selectedFilterData['brand'][0]}, ...+ ${selectedFilterData['brand'].length - 1}`;
    } else {
        selected_brand = `${selectedFilterData['brand'][0]}`;
    }

    return (
        <div id={"brandDeepDiveView"}>
            <Helmet>
                <title>BrandDeepDivePage</title>
                <meta name="description" content="Description of BrandDeepDivePage"/>
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
                            reset={reset}/>
                        </Box>
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10}>
                        <TitleHeader title={props.intl.formatMessage({...messages[`header`]})} subHeader={selected_brand}
                                     selectedItems={selectedFilterData['brand']} setOpenPinPage={setOpenPinPage}
                                     selectedFilterData={selectedFilterData}
                                     handleChangeTimeRange={handleChangeTimeRange}
                                     handleChangeCompareTimeRange={handleChangeCompareTimeRange}
                                     tooltipData={<FormattedMessage {...messages.headerTooltipText} />}
                                     exportPdf={() => exportPdf("brandDeepDiveView", `${props.intl.formatMessage({...messages[`header`]})}-(${selected_brand}) - RTM.pdf`)}/>
                        <Grid container>
                            <BrandDeepDiveCards
                                pageTitle={"Brand Deep dive"}
                                selectedItems={selectedFilterData['brand']}
                                dataFailed={brandDeepDivePage['cardsDataFail']}
                                spinnerState={brandDeepDivePage['cardsDataSpinnerState']}
                                cardData={brandDeepDivePage['cardsTransformedData']}
                                toggleCard={toggleCard}
                                toggleState={brandDeepDivePage['cardToggleState']}
                                categoryKpiOnChange={categoryKpiOnChange}
                                categoryFilterOnChange={categoryFilterOnChange}
                                trendLineData={brandDeepDivePage['trendLineData']}
                                trendLineSpinnerState={brandDeepDivePage['trendLineSpinnerState']}
                                trendLineFail={brandDeepDivePage['trendLineFail']}
                                trendLineFetch={trendLineFetch}
                                categoryKpiList={brandDeepDivePage['categoryKpiList']}
                                selectedCategoryKpi={brandDeepDivePage['selectedCategoryKpi']}
                                categoryFilterData={brandDeepDivePage['categoryFilterData']}
                                categoryFilterSpinnerState={brandDeepDivePage['categoryFilterSpinnerState']}
                                categoryFilterFail={brandDeepDivePage['categoryFilterFail']}
                                categorySelectedFilterData={brandDeepDivePage['categorySelectedFilterData']}
                                pinMyView={pinMyView}
                                {...props}
                            />
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <ProductSKUTrendChart
                                    brandName={selected_brand}
                                    selectedItems={selectedFilterData['brand']}
                                    productTrendUomFilter={brandDeepDivePage['productTrendUomFilter']}
                                    handleTrendButtonClick={handleTrendButtonClick}
                                    productTrendTopKpiFilterOpen={productTrendTopKpiFilterOpen}
                                    handleCloseTrendTopKpiFilter={handleCloseTrendTopKpiFilter}
                                    handleOpenTrendTopKpiFilter={handleOpenTrendTopKpiFilter}
                                    productTrendButton={brandDeepDivePage['productTrendButton']}
                                    handleChangeUomFilter={handleChangeUomFilter}
                                    topFilterOpen={topFilterOpen}
                                    handleCloseTopFilter={handleCloseTopFilter}
                                    handleOpenTopFilter={handleOpenTopFilter}
                                    productTrendFilter={brandDeepDivePage['productTrendFilter']}
                                    handleChange={handleChange}
                                    productSkuTrendFilterData={brandDeepDivePage['productSkuTrendFilterData']}
                                    selectedBrandTrendData={selectedBrandTrendData}
                                    handleProductFilterChange={handleProductFilterChange}
                                    dataFail={brandDeepDivePage['productTrendDataFail']}
                                    spinnerState={brandDeepDivePage['productTrendDataSpinnerState']}
                                    productTrendData={brandDeepDivePage['productTrendData']}
                                    pinMyView={pinMyView}
                                    {...props}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Paper style={{margin: "2vmin"}} elevation={3}>
                                    <Grid container>
                                        <Grid item xs={9} sm={9} md={9} lg={9}>
                                            <SalesBreakDownHeatMap
                                                selectedItems={selectedFilterData['brand']}
                                                onClickItemHeatMapKpiNameButtons={onClickItemHeatMapKpiNameButtons}
                                                itemHeatMapButton={brandDeepDivePage['itemHeatMapButton']}
                                                itemHeatMapFilter={brandDeepDivePage['itemHeatMapFilter']}
                                                open={open}
                                                handleClose={handleClose}
                                                handleOpen={handleOpen}
                                                handleItemFilterChange={handleItemFilterChange}
                                                openPartition={openPartition}
                                                handlePartitionClose={handlePartitionClose}
                                                handlePartitionOpen={handlePartitionOpen}
                                                itemHeatMapPartitionFilter={brandDeepDivePage['itemHeatMapPartitionFilter']}
                                                handlePartitionFilterChange={handlePartitionFilterChange}
                                                dataFail={brandDeepDivePage['itemHeatMapDataFail']}
                                                spinnerState={brandDeepDivePage['itemHeatMapDataSpinnerState']}
                                                itemHeatMapData={itemHeatMapData}
                                                handleSkuTableFilterChange={handleSkuTableFilterChange}
                                                pinMyView={pinMyView}
                                                {...props}
                                            />

                                        </Grid>
                                        <Grid xs={3} sm={3} md={3} lg={3}>

                                            <BrandDeepdiveTable
                                                spinnerState={brandDeepDivePage['skuTableDataSpinnerState']}
                                                data={brandDeepDivePage['skuTableData']}
                                                skuTableDataFail={brandDeepDivePage['skuTableDataFail']}
                                                tableName={"What sells with this Product"}
                                                productName={selectedSkuTableFilterData}
                                                filterChange={handleSkuTableFilterChange}
                                                filterValue={brandDeepDivePage['productSkuTrendFilterData']}
                                                pinMyView={pinMyView}
                                            />

                                        </Grid>
                                    </Grid>
                                </Paper>
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
                            ...params, "pageName": "Brand Deep Dive View",
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

BrandDeepDivePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    resetDeepDive: PropTypes.func.isRequired,
    filterDataFetch: PropTypes.func.isRequired,
    toggleCard: PropTypes.func.isRequired,
    cardDataFetch: PropTypes.func.isRequired,
    productTrendDataFetch: PropTypes.func.isRequired,
    productTrendFilterOnChange: PropTypes.func.isRequired,
    productTrendClickOnChange: PropTypes.func.isRequired,
    productTrendUomFilterOnChange: PropTypes.func.isRequired,
    productSkuTrendFilterOnChange: PropTypes.func.isRequired,
    productSkuFilterDataFetch: PropTypes.func.isRequired,
    itemHeatMapDataFetch: PropTypes.func.isRequired,
    itemHeatMapFilterOnChange: PropTypes.func.isRequired,
    itemTimeFilterHeatmapOnChange: PropTypes.func.isRequired,
    itemPartitionFilterHeatmapOnChange: PropTypes.func.isRequired,
    itemHeatMapButtonOnChange: PropTypes.func.isRequired,
    categoryKpiOnChange: PropTypes.func.isRequired,
    categoryFilterOnChange: PropTypes.func.isRequired,
    trendLineFetch: PropTypes.func.isRequired,
    skuTableFilterOnChange: PropTypes.func.isRequired,
    skuTableFetch: PropTypes.func.isRequired,
    pinMyPage: PropTypes.func.isRequired,
    pinMyView: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    brandDeepDivePage: makeSelectBrandDeepDivePage(),
    brandNameSelected: makeSelectBrandName(),
    filterData: makeSelectFilterData(),
    selectedFilterData: makeSelectSelectedFilters(),
    filterDataFetchFailed: makeSelectFilterDataFail(),
    filterDataFetchSpinnerState: makeSelectFilterDataSpinnerState(),
    productTrendData: makeSelectProductTrendSuccess(),
    productSkuFilterData: makeSelectProductSkuTrendFilterSuccess(),
    selectedBrandTrendData: makeSelectProductSkuTrendSelectedFilter(),
    itemHeatMapData: makeSelectItemHeatMapSuccess(),
    selectedSkuTableFilterData: makeSelectSkuTableFilter(),
    selectedlocale: makeSelectLocale(),
});

export function mapDispatchToProps(dispatch) {
    return {
        onFilterChange: (data) => dispatch(selectedFilterOnChange(data)),
        resetDeepDive: (data) => dispatch(resetDeepDive(data)),
        filterDataFetch: (data) => dispatch(filterDataFetch(data)),
        toggleCard: (data) => dispatch(toggleCard(data)),
        cardDataFetch: () => dispatch(cardDataFetch()),
        productTrendDataFetch: () => dispatch(productTrendFetch()),
        productTrendFilterOnChange: (data) => dispatch(productTrendFilterOnChange(data)),
        productTrendClickOnChange: (data) => dispatch(productTrendClickOnChange(data)),
        productSkuTrendFilterOnChange: (data) => dispatch(productSkuTrendFilterOnChange(data)),
        productTrendUomFilterOnChange: (data) => dispatch(productTrendUomFilterOnChange(data)),
        productSkuFilterDataFetch: () => dispatch(productSkuTrendFilterFetch()),
        itemHeatMapDataFetch: () => dispatch(itemHeatFetch()),
        itemHeatMapFilterOnChange: (data) => dispatch(itemFilterHeatmapOnChange(data)),
        itemTimeFilterHeatmapOnChange: (data) => dispatch(itemTimeFilterHeatmapOnChange(data)),
        itemPartitionFilterHeatmapOnChange: (data) => dispatch(itemPartitionFilterHeatmapOnChange(data)),
        itemHeatMapButtonOnChange: (data) => dispatch(itemHeatmapButtonOnChange(data)),
        categoryKpiOnChange: (data) => dispatch(categoryOnChange(data)),
        categoryFilterOnChange: (data) => dispatch(categoryComparisonOnChange(data)),
        trendLineFetch: (data) => dispatch(seeTrendLineFetch(data)),
        skuTableFilterOnChange: (data) => dispatch(skuFilterOnChange(data)),
        skuTableFetch: () => dispatch(skuTableFetch()),
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
)(injectIntl(BrandDeepDivePage));
