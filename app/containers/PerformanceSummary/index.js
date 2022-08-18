/**
 *
 * PerformanceSummary
 *
 */

import React, {memo, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";

import {useInjectSaga} from "../../utils/injectSaga";
import {useInjectReducer} from "../../utils/injectReducer";
import makeSelectPerformanceSummary, {
    makeSelectBrandBubbleFail,
    makeSelectBrandBubbleSpinnerState,
    makeSelectBrandBubbleSuccess,
    makeSelectGuidedInsightsButton,
    makeSelectGuidedInsightsFail,
    makeSelectGuidedInsightsFilter,
    makeSelectGuidedInsightsSpinnerState,
    makeSelectGuidedInsightsSuccess,
    makeSelectGuidedInsightsTypeFilter, makeSelectYearPeriodFilterSuccess, makeSelectYearPeriodSelectedFilterData
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {Box, Button, Tooltip} from "@material-ui/core";
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import SideFilter from "../../components/SideFilter";
import InsightTab from "../../components/InsightTab";
import CardsLIA from "../../components/CardsRtm";
import PerformanceBubbleApex from "../../components/PerformanceBubbleApex";
import {
    makeSelectDataLoadStatus,
    makeSelectFilterData,
    makeSelectFilterDataFail,
    makeSelectFilterDataSpinnerState,
    makeSelectSelectedFilters
} from "../App/selectors";
import {changeDataLoadStatus, filterDataFetch, pinMyPage, pinMyView, selectedFilterOnChange} from "../App/actions";
import {
    brandBubbleButtonOnChange,
    brandBubbleFetch,
    brandBubbleTimeFilterOnChange,
    cardDataFetch,
    categoryComparisonOnChange,
    categoryOnChange,
    distributorFilterOnChange,
    distributorTableFetch,
    guidedInsightsButtonOnChange,
    guidedInsightsFetch,
    guidedInsightsFilterOnChange,
    guidedInsightsToggle,
    guidedInsightsTypeFilterOnChange,
    seeTrendLineFetch,
    toggleCard, yearPeriodFilterOnChange
} from "./actions";
import {SyncLoader} from "react-spinners";
import NoDataAlert from "../../components/NoDataAlert";
import history from "../../utils/history";
import {exportCSVFile, exportPdf} from "../../utils/utility";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@mdi/react";
import {mdiPin} from "@mdi/js";
import TitleHeader from "../../components/TitleHeader/Loadable";
import DistributorPerformanceTable from "../../components/DistributorPerformanceTable";
import {Helmet} from "react-helmet";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import InfoIcon from "@material-ui/icons/Info";
import clsx from "clsx";
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {injectIntl} from "react-intl";
import ReactGoogleBubbleChart from "../../components/ReactGoogleBubbleChart";
import CanvasBubbleChart from "../../components/CanvasBubbleChart";
import PurchaseAnalysisMessages from "../../components/PurchaseAnalysisCard/messages";
import AppMessages from "../App/messages";
import {makeSelectLocale} from "../LanguageProvider/selectors";


/** Styles class*/
const useStyles = makeStyles((theme) => ({
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
        margin: '1vmin'
    },

    root: {
        flexGrow: 1,

    },
    appBar: {
        backgroundColor: "#FFFFFF",
    },
    Header: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1vw',
        color: '#0000a0e6',
        padding: '1vw'
    },
    divider: {
        marginLeft: '1.4vw',
        marginRight: '1.4vw',
        background: '#d3bc97'
    },
    subTitle: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.6vw',
        color: "#0000a0e6"
    },
    gridItemLabel: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '0.6vw',
    },
    card: {
        background: 'rgba(255,255,255,0.8)',
    },
    grid: {
        padding: '0px',
        display: "flex",
        justifyContent: "space-around",
        width: '100%',
    },
    distributorButtons: {
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
    gridStyle: {
        padding: "0.4vw 0.3vw"
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
    formControlBubble: {
        margin: '1vmin',
        minWidth: '5vw',
        fontSize: '0.95vw',
        fontFamily: 'MarsCentra-Book',
        color: 'rgb(0,215,185)'
    },
    formControl: {
        minWidth: '7vw',
        fontSize: '0.9vw',
        fontFamily: 'MarsCentra-Book',
        color: 'rgb(0,215,185)',
    },
    heading: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: "1.1vw",
        color: "#0000a0e6",
        textAlign: 'left',
    },
    picky: {
        minWidth: '3vw',
        width: '100%',
        padding: "0.4vw 0.3vw",
    },
    formControlGrid: {
        margin: '1.2vmin',
        minWidth: '5vw',
        fontSize: '0.95vw',
        fontFamily: 'MarsCentra-Book',
        color: 'rgb(0,215,185)'
    },
    distributorsFilterButtonActive: {
        margin: "1vmin",
        color: "#000",
        backgroundColor: "rgb(0, 215, 185)",
        fontFamily: "MarsCentra-Book",
        fontSize: '0.7vw',
        textTransform: 'none',
        borderRadius: "1vmin",
        '&:hover': {
            color: "#000",
            backgroundColor: "rgb(0, 215, 185)",
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
        fontSize: '0.8vw',
    },
    utilityButtons: {
        margin: "1vmin",
        fontFamily: "MarsCentra-Bold",
        fontSize: "0.9vw",
        textTransform: 'none',
        borderRadius: "1vmin"
    },
    bubbleButton: {
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
    bubbleButtonActive: {
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

export const PerformanceSummaryCards = (props) => {
    const classes = useStyles();
    const handlePinPerformanceSummaryCards = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`performance_summary_cards`]}),
            viewId: "performance_summary_cards",
            apiEnd: "performance_cards",
            filters:
                {
                    toggleState: {...props['cardToggleState']},
                    view: "performance_summary"
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
        exportCSVFile(data, `${props.intl.formatMessage({...messages[`performance_summary_cards`]})}_
        (${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()}_${new Date().getMinutes()}_${new Date().getSeconds()}).csv`, header);
    };
    return (
        <React.Fragment>
            <Grid item xs={12} container justify={"flex-end"} style={{marginBottom: '0.5vw', marginTop: '0.3vw'}}>
                <div>
                    <Tooltip title={props.intl.formatMessage({...AppMessages[`click_to_download`]})}>
                        <IconButton size={"small"} className={classes.csvButtonStyle} onClick={exportToCsv}>
                            <SystemUpdateAltIcon fontSize={"small"}/>
                        </IconButton>
                    </Tooltip>

                    {
                        history.location.pathname !== "/RTM/MyPinnedViews" &&
                        <Tooltip title={props.intl.formatMessage({...AppMessages[`pin_the_component`]})}>
                            <IconButton size="small" className={classes.pinButton}
                                        onClick={handlePinPerformanceSummaryCards}>
                                <Icon
                                    path={mdiPin}
                                    size={"1vw"}/>
                            </IconButton>
                        </Tooltip>
                    }

                    <Tooltip title={props.intl.formatMessage({...messages[`cardsHeaderInfoTooltipText`]})}>
                        <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                    </Tooltip>
                </div>
            </Grid>
            {
                (() => {
                    if (!props['dataFailed']) {
                        if (!props['spinnerState']) {
                            return (
                                <>
                                    {
                                        props['cardData'].map((item) => {
                                            return (

                                                <Paper elevation={3}
                                                       style={{
                                                           width: "fit-content",
                                                           height: '100%'
                                                       }}
                                                       key={item.title}>
                                                    <CardsLIA data={item} toggleCard={props.toggleCard}
                                                              toggleState={props['cardToggleState']}
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
                                            )
                                        })
                                    }
                                </>
                            )
                        } else {
                            return (
                                <Paper elevation={3} style={{margin: "2vmin", width: "100%"}}>
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
                                </Paper>
                            );
                        }
                    } else {
                        return <NoDataAlert/>;
                    }
                })()
            }
        </React.Fragment>
    )
};

export const Insights = (props) => {

    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`performance_summary_guided_insights`]}),
            viewId: "performance_summary_guided_insights",
            apiEnd: "guided_insights",
            filters:
                {
                    kpi: props['guidedInsightsButton'],
                    dimension: props['guidedInsightsFilter'],
                    type: props['guidedInsightsTypeFilter'],
                    analysis: props['guidedInsightsToggleData'] ? "Finding" : "Insight",
                    yearPeriodData: props['guidedInsightsYearPeriodFilterData'],
                    // selectedYearPeriod:props['guidedInsightsSelectedYearPeriodFilter'],
                    yearPeriod: props['guidedInsightsSelectedYearPeriodFilter'],

                }
        })
    };
    return (
        <Box boxShadow={0} elevation={3} style={{margin: "1vw 2vmin", overflowY: 'visible'}}>
            <InsightTab data={props.guidedInsightsData} spinnerState={props.guidedInsightsFetchSpinnerState}
                        fetchFailed={props.guidedInsightsFetchFailed}
                        fetchData={props.guidedInsightsDataFetch}
                        buttonChange={props.guidedInsightsButtonChange}
                        filterChange={props.guidedInsightsFilterChange}
                        filterTypeChange={props.guidedInsightsTypeFilterChange}
                        buttonData={props['guidedInsightsButton']}
                        filterData={props['guidedInsightsFilter']}
                        filterTypeData={props['guidedInsightsTypeFilter']}
                        toggleInsights={props.guidedInsightsToggle}
                        toggleData={props['guidedInsightsToggleData']}
                        handlePinView={handlePinView}
                        yearPeriodData={props['guidedInsightsYearPeriodFilterData']}
                        yearPeriodChange={props.guidedInsightsYearPeriodFilterChange}
                        yearPeriod={props['guidedInsightsSelectedYearPeriodFilter']}
            />
        </Box>
    )
};

export const BrandInsightsBubbleChart = (props) => {
    const classes = useStyles();
    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`performance_summary_brand_insights`]}),
            viewId: "performance_summary_brand_insights",
            apiEnd: "brand_insights",
            filters: {
                selectionButtons: props['BrandInsightsButton']
            }
        })
    };

    return (
        <Paper elevation={3}
               style={{
                   margin: "2vmin", height: '85vh',
                   overflowY: 'auto'
               }}>
            <Grid container alignItems={"center"}>
                <Grid item xs={9} sm={9} md={9} lg={9} style={{textAlign: "start"}}
                      justify={"flex-start"}>
                    <Typography className={classes.title}>
                        {props.intl.formatMessage({...messages[`brand_insights_header`]})}
                    </Typography>
                </Grid>
                {
                    history.location.pathname !== "/RTM/MyPinnedViews" &&
                    <Grid item xs={3} container justify={"flex-end"}>
                        <Tooltip title={props.intl.formatMessage({...AppMessages[`pin_the_component`]})}>
                            <IconButton size="small" className={classes.pinButton} onClick={handlePinView}>
                                <Icon
                                    path={mdiPin}
                                    size={"1vw"}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title={ props.intl.formatMessage({...messages[`brand_insights_tooltip_info_text`]})}>
                            <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                        </Tooltip>
                    </Grid>
                }
                <Grid item container xs={12} alignItems={"center"}
                      justify="flex-end" style={{paddingRight: '1vw'}}>
                    <Button size="small"
                            variant="contained"
                            onClick={() => props.onClickBrandInsightsButton('GSV')}
                            className={clsx({
                                [classes.bubbleButton]: props['BrandInsightsButton'] !== 'GSV',
                                [classes.bubbleButtonActive]: props['BrandInsightsButton'] === 'GSV'
                            })}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_gsv`]})}
                    </Button>
                    <Button size="small"
                            variant="contained"
                            onClick={() => props.onClickBrandInsightsButton('Tonnes')}
                            className={clsx({
                                [classes.bubbleButton]: props['BrandInsightsButton'] !== 'Tonnes',
                                [classes.bubbleButtonActive]: props['BrandInsightsButton'] === 'Tonnes'
                            })}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_tonnes`]})}
                    </Button>
                </Grid>
                <Grid item container xs={12} justify={"center"} style={{width: "100%"}}>
                    {
                        (() => {
                            if (!props['dataFailed']) {
                                if (!props['spinnerState']) {
                                    return (
                                        <div style={{padding: '1vw', width: "100%", overflowY: 'auto'}}>
                                            <PerformanceBubbleApex brandInsightData={props.brandInsightsData}
                                                                   uomButton={props['BrandInsightsButton']}
                                                                   height={window.outerHeight / 1.9}

                                            />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '40vh',
                                            }}>
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
    );
};

export const DistributorPerformance = (props) => {
    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`performance_summary_distributors_performance`]}),
            viewId: "performance_summary_distributors_performance",
            apiEnd: "distributors_performance",
            filters:
                {
                    kpiName: props['kpiName'],
                    topFilter: props['topFilter']
                }
        })
    };
    return (
        <Paper elevation={3} style={{
            margin: "2vmin",
            padding: "0.8vmin",
            height: '85vh',
        }}>
            <DistributorPerformanceTable
                spinnerState={props.spinnerState}
                dataFetchFail={props.dataFailed}
                data={props['distributorTableData']}
                name={"Distributor"}
                topFilter={props['topFilter']}
                filterChange={props.handleFilterChange}
                openFilter={props.distributorTopFilterOpen}
                onCloseFilter={props.handleCloseDistributorTopFilter}
                onOpenFilter={props.handleOpenDistributorTopFilter}
                kpiName={props['kpiName']} onFilterChange={props.onFilterChange}
                selectedFilterData={props.selectedFilterData}
                onClickButton={props.onClickDistributorsPerformanceKpiNameButtons}
                handlePinView={handlePinView}/>

        </Paper>
    );
};

/**
 * THE PERFORMANCE SUMMARY CONTAINER FUNCTION IS USED TO RENDER ALL THE COMPONENTS INSIDE IT AND ALSO TO PASS THE REQUIRED PARAMETERS AND THE DATA TO THE COMPONENTS USED */

export function PerformanceSummary({
                                       //selectors
                                       filterData, selectedFilterData, filterDataFetchFailed, filterDataFetchSpinnerState, performanceSummary, dataLoadStatus,
                                       guidedInsightsData, guidedInsightsFetchFailed, guidedInsightsFetchSpinnerState, selectedlocale, yearPeriodFilterData, selectedYearPeriodFilterData,
                                       //actions
                                       onFilterChange, filterDataFetch, toggleCard, cardDataFetch, brandInsightFetch, brandBubbleButtonOnChange, distributorFilterOnChange, distributorTableFetch,
                                       categoryKpiOnChange, categoryFilterOnChange, trendLineFetch, pinMyPage, changeDataLoadStatus,
                                       guidedInsightsDataFetch, guidedInsightsFilterChange, guidedInsightsButtonChange, guidedInsightsTypeFilterChange,yearPeriodFilterOnChange, guidedInsightsToggle, pinMyView, window, ...props
                                   }) {
    useInjectReducer({key: "performanceSummary", reducer});
    useInjectSaga({key: "performanceSummary", saga});
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
        guidedInsightsDataFetch();
    },[selectedlocale]);
    useEffect(() => {
        setFilterState(selectedFilterData);
        if (filterData['region'].length === 0) {
            filterDataFetch(selectedFilterData);
        }
        if (selectedFilterData['pinPage']) {
            cardDataFetch();
            brandInsightFetch();
            distributorTableFetch();
            guidedInsightsDataFetch();
            onFilterChange({...selectedFilterData, pinPage: false});
        } else if (!dataLoadStatus.performanceSummary) {
            cardDataFetch();
            brandInsightFetch();
            distributorTableFetch();
            guidedInsightsDataFetch();
            changeDataLoadStatus({...dataLoadStatus, performanceSummary: true});
        } else {

            if (performanceSummary['cardsTransformedData'].length === 0) {
                cardDataFetch();
            }
            if (performanceSummary['brandBubbleData'].length === 0) {
                brandInsightFetch();
            }
            if (performanceSummary['distributorTableData'].length === 0) {
                distributorTableFetch();
            }
            if (performanceSummary['guidedInsightsData'].length === 0) {
                guidedInsightsDataFetch();
            }

        }

    }, []);

    const [distributorTopFilterOpen, setDistributorTopFilterOpen] = React.useState(false);
    const handleChange = (event) => {
        distributorFilterOnChange({
            ...performanceSummary['distributorsPerformanceFilter'],
            'topFilter': event.target.value
        });
        distributorTableFetch();
    };

    const handleCloseDistributorTopFilter = () => {
        setDistributorTopFilterOpen(false);
    };

    const handleOpenDistributorTopFilter = () => {
        setDistributorTopFilterOpen(true);
    };

    const fetchData = () => {

        onFilterChange(filterState);

        cardDataFetch();
        distributorTableFetch();
        brandInsightFetch();
        guidedInsightsDataFetch();
    };

    const reset = ()=>{
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

        cardDataFetch();
        distributorTableFetch();
        brandInsightFetch();
        guidedInsightsDataFetch();

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

    const handleChangeCompareTimeRange = (value) => {
        // onFilterChange({...selectedFilterData, 'compare': value});
        onFilterChange({...filterState, 'compare': value.value});
        // fetchData();
        cardDataFetch();
        distributorTableFetch();
        brandInsightFetch();
        guidedInsightsDataFetch();
    };

    const handleBrandInsightsButton = (data) => {
        brandBubbleButtonOnChange(data);
        brandInsightFetch();
    };
    const onClickDistributorsPerformanceKpiNameButtons = (kpiName) => {
        distributorFilterOnChange({...performanceSummary['distributorsPerformanceFilter'], 'kpiName': kpiName});
        distributorTableFetch();
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
        cardDataFetch();
        distributorTableFetch();
        brandInsightFetch();
        guidedInsightsDataFetch();
    };

    const [openPinPage, setOpenPinPage] = React.useState(false);

    const [pinPageParams, setPinPageParams] = React.useState({pinName: ""});

    const handlePinPageNameInput = (event) => {
        setPinPageParams({...pinPageParams, "pinName": event.target.value});
    };


    return (
        <div id={"performance"}>
            <Helmet>
                <title>Performance Summary</title>
                <meta name="description" content="This is PerformanceSummary Page"/>
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

                    <Grid container justify={"center"} item xs={10} sm={10} md={10} lg={10}>

                        <TitleHeader title={props.intl.formatMessage({...messages[`header`]})} setOpenPinPage={setOpenPinPage}
                                     selectedFilterData={selectedFilterData}
                                     handleChangeTimeRange={handleChangeTimeRange}
                                     handleChangeCompareTimeRange={handleChangeCompareTimeRange}
                                     tooltipData={props.intl.formatMessage({...messages[`headerTooltipText`]})}
                                     exportPdf={() => exportPdf("performance", `${props.intl.formatMessage({...messages[`header`]})} - RTM.pdf`)}/>
                        <div>

                            <Grid item xs={12} sm={12} md={12} lg={12} container justify={'space-between'}
                                  alignItems={"flex-start"}
                                  style={{padding: "0 1.2vw 0 1.2vw"}}
                                  id={"performance-summary-cards"}>
                                <PerformanceSummaryCards
                                    pageTitle={"Performance Summary"}
                                    dataFailed={performanceSummary['cardsDataFail']}
                                    spinnerState={performanceSummary['cardsDataSpinnerState']}
                                    cardData={performanceSummary['cardsTransformedData']}
                                    toggleCard={toggleCard}
                                    cardToggleState={performanceSummary['cardToggleState']}
                                    categoryKpiOnChange={categoryKpiOnChange}
                                    categoryFilterOnChange={categoryFilterOnChange}
                                    trendLineData={performanceSummary['trendLineData']}
                                    trendLineSpinnerState={performanceSummary['trendLineSpinnerState']}
                                    trendLineFail={performanceSummary['trendLineFail']}
                                    trendLineFetch={trendLineFetch}
                                    categoryKpiList={performanceSummary['categoryKpiList']}
                                    selectedCategoryKpi={performanceSummary['selectedCategoryKpi']}
                                    categoryFilterData={performanceSummary['categoryFilterData']}
                                    categoryFilterSpinnerState={performanceSummary['categoryFilterSpinnerState']}
                                    categoryFilterFail={performanceSummary['categoryFilterFail']}
                                    categorySelectedFilterData={performanceSummary['categorySelectedFilterData']}
                                    pinMyView={pinMyView}
                                    {...props}
                                />

                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Insights
                                    guidedInsightsData={guidedInsightsData}
                                    guidedInsightsFetchSpinnerState={guidedInsightsFetchSpinnerState}
                                    guidedInsightsFetchFailed={guidedInsightsFetchFailed}
                                    guidedInsightsDataFetch={guidedInsightsDataFetch}
                                    guidedInsightsButtonChange={guidedInsightsButtonChange}
                                    guidedInsightsFilterChange={guidedInsightsFilterChange}
                                    guidedInsightsTypeFilterChange={guidedInsightsTypeFilterChange}
                                    guidedInsightsButton={performanceSummary['guidedInsightsButton']}
                                    guidedInsightsFilter={performanceSummary['guidedInsightsFilter']}
                                    guidedInsightsTypeFilter={performanceSummary['guidedInsightsTypeFilter']}
                                    guidedInsightsToggle={guidedInsightsToggle}
                                    guidedInsightsToggleData={performanceSummary['guidedInsightsToggle']}
                                    guidedInsightsYearPeriodFilterData={performanceSummary['yearPeriodFilterData']}
                                    guidedInsightsYearPeriodFilterChange={yearPeriodFilterOnChange}
                                    guidedInsightsSelectedYearPeriodFilter={performanceSummary['selectedYearPeriodFilter']}
                                    pinMyView={pinMyView}
                                    {...props}
                                />

                            </Grid>
                            <Grid container item xs={12} sm={12} md={12} lg={12}>
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <BrandInsightsBubbleChart
                                        dataFailed={performanceSummary['brandBubbleDataFail']}
                                        spinnerState={performanceSummary['brandBubbleDataSpinnerState']}
                                        brandInsightsData={performanceSummary['brandBubbleData']}
                                        pinMyView={pinMyView}
                                        selectedFilterData={selectedFilterData}
                                        onClickBrandInsightsButton={handleBrandInsightsButton}
                                        BrandInsightsButton={performanceSummary['brandBubbleButton']}
                                        {...props}
                                    />
                                </Grid>

                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <DistributorPerformance
                                        onClickDistributorsPerformanceKpiNameButtons={onClickDistributorsPerformanceKpiNameButtons}
                                        kpiName={performanceSummary['distributorsPerformanceFilter']['kpiName']}
                                        distributorTopFilterOpen={distributorTopFilterOpen}
                                        handleCloseDistributorTopFilter={handleCloseDistributorTopFilter}
                                        handleOpenDistributorTopFilter={handleOpenDistributorTopFilter}
                                        handleFilterChange={handleChange}
                                        topFilter={performanceSummary['distributorsPerformanceFilter']['topFilter']}
                                        dataFailed={performanceSummary['distributorTableDataFail']}
                                        spinnerState={performanceSummary['distributorTableDataSpinnerState']}
                                        distributorTableData={performanceSummary['distributorTableData']}
                                        selectedFilterData={selectedFilterData}
                                        onFilterChange={onFilterChange}
                                        pinMyView={pinMyView}
                                        {...props}
                                    />
                                </Grid>

                            </Grid>
                        </div>
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
                        label= {props.intl.formatMessage({...AppMessages[`bookMarkName`]})}
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
                            ...params, "pageName": "Performance Summary",
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

PerformanceSummary.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    filterDataFetch: PropTypes.func.isRequired,
    toggleCard: PropTypes.func.isRequired,
    cardDataFetch: PropTypes.func.isRequired,
    brandInsightFetch: PropTypes.func.isRequired,
    brandBubbleTimeFilterOnChange: PropTypes.func.isRequired,
    brandBubbleButtonOnChange: PropTypes.func.isRequired,
    distributorFilterOnChange: PropTypes.func.isRequired,
    distributorTableFetch: PropTypes.func.isRequired,
    categoryKpiOnChange: PropTypes.func.isRequired,
    categoryFilterOnChange: PropTypes.func.isRequired,
    trendLineFetch: PropTypes.func.isRequired,
    pinMyPage: PropTypes.func.isRequired,
    changeDataLoadStatus: PropTypes.func.isRequired,
    guidedInsightsDataFetch: PropTypes.func.isRequired,
    guidedInsightsFilterChange: PropTypes.func.isRequired,
    guidedInsightsButtonChange: PropTypes.func.isRequired,
    pinMyView: PropTypes.func.isRequired,
    guidedInsightsTypeFilterChange: PropTypes.func.isRequired,
    guidedInsightsToggle: PropTypes.func.isRequired,
    yearPeriodFilterOnChange: PropTypes.func.isRequired

};

const mapStateToProps = createStructuredSelector({
    performanceSummary: makeSelectPerformanceSummary(),
    filterData: makeSelectFilterData(),
    selectedFilterData: makeSelectSelectedFilters(),
    filterDataFetchFailed: makeSelectFilterDataFail(),
    filterDataFetchSpinnerState: makeSelectFilterDataSpinnerState(),
    brandInsightsData: makeSelectBrandBubbleSuccess(),
    brandInsightsDataFetchFailed: makeSelectBrandBubbleFail(),
    brandInsightsDataFetchSpinnerState: makeSelectBrandBubbleSpinnerState(),
    dataLoadStatus: makeSelectDataLoadStatus(),
    guidedInsightsData: makeSelectGuidedInsightsSuccess(),
    guidedInsightsFetchFailed: makeSelectGuidedInsightsFail(),
    guidedInsightsFetchSpinnerState: makeSelectGuidedInsightsSpinnerState(),
    selectedGuidedInsightsFilterData: makeSelectGuidedInsightsFilter(),
    selectedGuidedInsightsButtonData: makeSelectGuidedInsightsButton(),
    selectedGuidedInsightsTypeFilterData: makeSelectGuidedInsightsTypeFilter(),
    selectedlocale: makeSelectLocale(),
    yearPeriodFilterData: makeSelectYearPeriodFilterSuccess(),
    selectedYearPeriodFilterData:makeSelectYearPeriodSelectedFilterData()
});

export function mapDispatchToProps(dispatch) {
    return {
        onFilterChange: (data) => dispatch(selectedFilterOnChange(data)),
        filterDataFetch: (data) => dispatch(filterDataFetch(data)),
        toggleCard: (data) => dispatch(toggleCard(data)),
        cardDataFetch: () => dispatch(cardDataFetch()),
        brandInsightFetch: () => dispatch(brandBubbleFetch()),
        brandBubbleTimeFilterOnChange: (data) => dispatch(brandBubbleTimeFilterOnChange(data)),
        brandBubbleButtonOnChange:(data) => dispatch(brandBubbleButtonOnChange(data)),
        distributorFilterOnChange: (data) => dispatch(distributorFilterOnChange(data)),
        distributorTableFetch: () => dispatch(distributorTableFetch()),
        categoryKpiOnChange: (data) => dispatch(categoryOnChange(data)),
        categoryFilterOnChange: (data) => dispatch(categoryComparisonOnChange(data)),
        trendLineFetch: (data) => dispatch(seeTrendLineFetch(data)),
        pinMyPage: (data) => dispatch(pinMyPage(data)),
        changeDataLoadStatus: (data) => dispatch(changeDataLoadStatus(data)),
        guidedInsightsDataFetch: () => dispatch(guidedInsightsFetch()),
        guidedInsightsFilterChange: (data) => dispatch(guidedInsightsFilterOnChange(data)),
        guidedInsightsButtonChange: (data) => dispatch(guidedInsightsButtonOnChange(data)),
        guidedInsightsTypeFilterChange: (data) => dispatch(guidedInsightsTypeFilterOnChange(data)),
        guidedInsightsToggle: (data) => dispatch(guidedInsightsToggle(data)),
        yearPeriodFilterOnChange: (data) => dispatch(yearPeriodFilterOnChange(data)),
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
)(injectIntl(PerformanceSummary));


