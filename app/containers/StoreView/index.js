/**
 *
 * StoreView
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
import makeSelectStoreView, {
    makeSelectStoreGeoMapSuccess,
    makeSelectStoreHeatMapSuccess,
    makeSelectStoreTrendTableSuccess
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import {Box, Button, Grid, Paper, TextField, Tooltip, Typography} from "@material-ui/core";
import SideFilter from "../../components/SideFilter";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import BrandHeatMap from "../../components/BrandHeatMap";
import makeStyles from "@material-ui/core/styles/makeStyles";
import history from "../../utils/history";
import {
    makeSelectDataLoadStatus,
    makeSelectFilterData,
    makeSelectFilterDataFail,
    makeSelectFilterDataSpinnerState,
    makeSelectSelectedFilters
} from "../App/selectors";
import {changeDataLoadStatus, filterDataFetch, pinMyPage, pinMyView, selectedFilterOnChange} from "../App/actions";
import StoreViewTable from "../../components/StoreViewTable";
import GeoMapSimple from "../../components/GeoMapSimple";
import {
    storeGeoMapFetch,
    storeHeatMapButtonOnChange,
    storeHeatMapFetch,
    storeHeatMapFilterChange,
    storePartitionFilterHeatmapOnChange,
    storeTimeFilterHeatmapOnChange,
    storeTopFilterOnChange,
    storeTrendButtonOnChange,
    storeTrendTableFetch
} from "./actions";
import {SyncLoader} from "react-spinners";
import NoDataAlert from "../../components/NoDataAlert";
import clsx from "clsx";
import {exportCSVFile, exportPdf} from "../../utils/utility";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import TitleHeader from "../../components/TitleHeader/Loadable";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@mdi/react";
import {mdiPin} from "@mdi/js";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import Zoom from "@material-ui/core/Zoom";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import InfoIcon from "@material-ui/icons/Info";
import {makeSelectLocale} from "../LanguageProvider/selectors";
import {FormattedMessage, injectIntl} from "react-intl";
import AppMessages from "../App/messages";
import messages from "./messages";
import BrandDeepMessages from "../BrandDeepDivePage/messages";
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
        fontSize: '0.95vw',
        fontFamily: 'MarsCentra-Book',
        color: 'rgb(0,215,185)'
    },

    storeHeatMapButton: {
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
    storeHeatMapButtonActive: {
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
    filterHeading: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '0.7vw',
        color: '#0000a0e6',
        padding: '0.5vw'
    }
    ,
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
        // color: "#fff",
        fontFamily: "MarsCentra-Bold",
        fontSize: "0.9vw",
        textTransform: 'none',
        borderRadius: "1vmin"
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

export const StoreTrendTable = (props) => {
    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`store_view_trend_table`]}),
            viewId: "store_view_trend_table",
            apiEnd: "get_trend_across_stores",
            filters: {
                topFilter: props['storeTopFilter'],
                selectionButtons: props['storeButtonData']
            }
        })
    };
    return (
        <Paper style={{
            margin: "2vmin",
            height: '83vh',
        }} elevation={3}>
            <StoreViewTable data={props['storeTrendTableData']} name={"StoreViewTable"}
                            spinnerState={props['spinnerState']}
                            storeTableDataFail={props['dataFailed']}
                            selectedFilter={props.selectedFilterData}
                            onFilterChange={props.onFilterChange}
                            openTopFilter={props.sOpen}
                            onCloseTopFilter={props.handleStoreClose}
                            onOpenTopFilter={props.handleStoreOpen}
                            topFilterValue={props['storeTopFilter']}
                            onChangeTopFilter={props.handleChangeStoreTopFilter}
                            handlePinView={handlePinView}
                            storeButton={props.storeButtonData}
                            onStoreButtonChange={props.storeButtonClick}
            />
        </Paper>
    );
};

export const StoreGeoMap = (props) => {
    const classes = useStyles();
    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`store_view_geo_map`]}),
            viewId: "store_view_geo_map",
            apiEnd: "get_geomap",
            filters: {}
        })
    };

    const exportToCsv = () => {
        let header = [
            {dataField: 'store', text: props.intl.formatMessage({...AppMessages[`store`]})},
            {dataField: 'distributor', text: props.intl.formatMessage({...AppMessages[`distributor`]})},
            {text: 'Longitude', dataField: "longitude"},
            {text: 'Latitude', dataField: "latitude"},
            {dataField: 'gsv', text: props.intl.formatMessage({...AppMessages[`kpi_gsv`]})},
            {dataField: 'tonnes', text: props.intl.formatMessage({...AppMessages[`kpi_tonnes`]})},
        ];
        let data = props['storeGeoMapData'].map((i) => {
            return {
                store: i['name'],
                distributor: i['distributor'].join(",").toString(),
                longitude: i['coordinates'][0],
                latitude: i['coordinates'][1],
                gsv: i['totalGSV'],
                tonnes: i['totalTonnes']
            }

        });
        exportCSVFile(data, `${props.intl.formatMessage({...messages[`header`]})}_${props.intl.formatMessage({...messages[`geoMapTitle`]})}_
        (${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()}_${new Date().getMinutes()}_${new Date().getSeconds()}).csv`, header);
    };
    let sentence1 = 'Hover on the Store to see the store details ';
    let sentence2 = ' Click on the store to navigate to the respective deep dive pages ';
    return (
        <Paper style={{margin: "2vmin", height: '83vh'}} elevation={3}>
            <Grid container xs={12} sm={12} md={12} lg={12}>
                <Grid container item xs={12} sm={12} md={12} lg={12}>
                    <Grid item xs={9} container alignItems={"center"}>
                        <Typography className={classes.title}>{props.intl.formatMessage({...messages[`geoMapTitle`]})}</Typography>
                    </Grid>
                    <Grid container justify={"flex-end"} item xs={3} alignItems={"center"}>
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

                        <Tooltip title={props.intl.formatMessage({...messages[`geoMapToolTipText`]})}>
                            <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} container justify={"center"}>
                    {
                        (() => {
                            if (!props['dataFailed']) {
                                if (!props['spinnerState']) {
                                    return (
                                        <GeoMapSimple markers={props['storeGeoMapData']}/>
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

export const StoreViewProductPerformanceHeatMap = (props) => {
    const classes = useStyles();
    const handlePinView = () => {
        props.pinMyView({
            viewName: props.intl.formatMessage({...AppMessages[`store_view_product_performance`]}),
            viewId: "store_view_product_performance",
            apiEnd: "get_cust_vs_product",
            filters: {
                selectionButtons: props['storeHeatMapButton'],
                selectionDropdown: props['storeHeatMapFilter'],
                selectPartition: props['itemHeatMapPartitionFilter'],
            }
        })
    };
    const getUOMLabel = () => {
        switch (props['storeHeatMapButton']) {
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
    const events = {
        click: function (event, chartContext, config) {

            let seriesIndex = config['seriesIndex'];
            let series = config['config']['series'];
            let store = series[seriesIndex]['name'];
            history.push(`/RTM/StoreDeepDive?${store}`);
            props.onFilterChange({
                ...props.selectedFilterData,
                'store': [...props.selectedFilterData['store'], {label: store, value: store}]
            });

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
                        filename: `${props.intl.formatMessage({...AppMessages[`store_view_product_performance`]})}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                        columnDelimiter: ',',
                        headerCategory: props.intl.formatMessage({...AppMessages[`product`]}),
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: `${props.intl.formatMessage({...AppMessages[`store_view_product_performance`]})}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                    png: {
                        filename: `${props.intl.formatMessage({...AppMessages[`store_view_product_performance`]})}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
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
                let buttonValueString = `${getUOMLabel()}  : ${new Intl.NumberFormat('pt-BR').format(ser[si]['data'][di][props['storeHeatMapButton']])}`;
                let filterValueString = props['storeHeatMapFilter'];
                if (filterValueString === "Actual" || filterValueString === "Growth") {
                    return (
                        '<div class={"arrow_box"}>' +
                        "<span>" +
                        ser[si]['name'] + ": " + new Intl.NumberFormat('pt-BR').format(ser[si]['data'][di]['y']) + "%" + "<br>" +
                        buttonValueString +
                        "</span>" +
                        "</div>"
                    );
                } else if (filterValueString === "SelloutvsActual") {
                    return (
                        `<div class={"arrow_box"}><span>${ser[si]['name']}: ${new Intl.NumberFormat('pt-BR').format(ser[si]['data'][di]['y'])}%<br>${buttonValueString}<br>Sellout vs Target: ${ser[si]['data'][di]['Target']}</span></div>`
                    );
                }

            },
            style: {
                fontSize: '0.6vw',
                fontFamily: 'MarsCentra-Book'
            },
            x: {
                formatter: function (value) {
                    return value
                }
            }

        },
        plotOptions: {

            heatmap: {
                distributed: true,
                colorScale: (props['storeHeatMapFilter'] === "Actual" || props['storeHeatMapFilter'] === "Growth") ? {
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
                fontSize: '0.7vw',
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
                rotate: -30,
                hideOverlappingLabels: false,
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
                    fontSize: 12,
                },
                formatter: (value) => {

                    let condition = isNaN(Number(value));

                    if (condition) {
                        let store = value.substring(0, value.indexOf('-'));
                        if (store.length <= 8) return store + '..';
                        else return store.substring(0, 8) + '..';
                        // return v=value.substring( 0, index(value, '-')) + '...';
                    } else return value;
                },

            },
        },
    };


    return (
        <Paper style={{margin: "2vmin"}} elevation={5}>
            <Grid container>
                <Grid item xs={4} sm={4} md={4} lg={4} style={{textAlign: "start"}}>
                    <Typography className={classes.title}>{props.intl.formatMessage({...messages[`productPerformanceStore`]})}</Typography>
                </Grid>
                <Grid item container xs={8} sm={8} md={8} lg={8} style={{textAlign: "end"}}
                      alignItems={"center"} justify={"flex-end"}>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => props.onClickStoreHeatMapKpiNameButtons('Invoice')}
                        className={clsx({
                            [classes.storeHeatMapButton]: props['storeHeatMapButton'] !== 'Invoice',
                            [classes.storeHeatMapButtonActive]: props['storeHeatMapButton'] === 'Invoice'
                        })}
                    >
                        {props.intl.formatMessage({...AppMessages[`kpi_invoice`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => props.onClickStoreHeatMapKpiNameButtons('GSV')}
                        className={clsx({
                            [classes.storeHeatMapButton]: props['storeHeatMapButton'] !== 'GSV',
                            [classes.storeHeatMapButtonActive]: props['storeHeatMapButton'] === 'GSV'
                        })}
                    >

                        {props.intl.formatMessage({...AppMessages[`kpi_gsv`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => props.onClickStoreHeatMapKpiNameButtons('Units')}
                        className={clsx({
                            [classes.storeHeatMapButton]: props['storeHeatMapButton'] !== 'Units',
                            [classes.storeHeatMapButtonActive]: props['storeHeatMapButton'] === 'Units'
                        })}
                    >

                        {props.intl.formatMessage({...AppMessages[`kpi_units`]})}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => props.onClickStoreHeatMapKpiNameButtons('Tonnes')}
                        className={clsx({
                            [classes.storeHeatMapButton]: props['storeHeatMapButton'] !== 'Tonnes',
                            [classes.storeHeatMapButtonActive]: props['storeHeatMapButton'] === 'Tonnes'
                        })}
                    >

                        {props.intl.formatMessage({...AppMessages[`kpi_tonnes`]})}
                    </Button>
                    <FormControl className={classes.formControl}
                                 id={"customer-product-heatmap-filter"}>
                        <Select
                            labelId="distributor-filter"
                            id="demo-controlled-open-select"
                            defaultValue={"Actual"}
                            open={props.open}
                            onClose={props.handleClose}
                            onOpen={props.handleOpen}
                            value={props['storeHeatMapFilter']}
                            onChange={props.handleFilterChange}
                            className={classes.menuItem}
                        >
                            <MenuItem value={"Actual"}
                                      className={classes.menuItem}>
                                {props.intl.formatMessage({...BrandDeepMessages[`actual`]})}</MenuItem>
                            <MenuItem value={"Growth"}
                                      className={classes.menuItem}>{props.intl.formatMessage({...BrandDeepMessages[`growth`]})}</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography className={classes.filterHeading}>{props.intl.formatMessage({...BrandDeepMessages[`partitionBy`]})}</Typography>
                    <FormControl className={classes.formControl}
                                 id={"store-heatmap-partition-filter"}>
                        <Select
                            labelId="store-partition-filter"
                            id="demo-controlled-open-select"
                            defaultValue={"Store"}
                            open={props.openPartition}
                            onClose={props.handlePartitionClose}
                            onOpen={props.handlePartitionOpen}
                            value={props['itemHeatMapPartitionFilter']}
                            onChange={props.handlePartitionFilterChange}
                            className={classes.menuItem}
                        >
                            <MenuItem value={"Overall"}
                                      className={classes.menuItem}>{props.intl.formatMessage({...BrandDeepMessages[`overall`]})}</MenuItem>
                            <MenuItem value={"Product"}
                                      className={classes.menuItem}>{props.intl.formatMessage({...AppMessages[`product`]})}</MenuItem>
                            <MenuItem value={"Store"}
                                      className={classes.menuItem}>{props.intl.formatMessage({...AppMessages[`store`]})}</MenuItem>
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
                        title={props.intl.formatMessage({...messages[`productPerformanceStoreToolTipText`]})}>
                        <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                    </Tooltip>
                </Grid>
            </Grid>
            {
                (() => {
                    if (!props['dataFailed']) {
                        if (!props['spinnerState']) {
                            return (
                                <Grid item xs={12} style={{padding: '2vmin'}}>
                                    <BrandHeatMap
                                        series={props['storeHeatMapData']}
                                        heatMapOption={options} height={window.outerHeight / 1.5}/>
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

/**
 * THE STORE VIEW CONTAINER FUNCTION IS USED TO RENDER ALL THE COMPONENTS INSIDE IT AND ALSO TO PASS THE REQUIRED PARAMETERS AND THE DATA TO THE COMPONENTS USED */

export function StoreView({ //selectors
                              storeView, filterData, selectedFilterData, filterDataFetchFailed, filterDataFetchSpinnerState, dataLoadStatus,selectedlocale,
                              //actions
                              onFilterChange, filterDataFetch, storeTopFilterOnChange, storeTrendButtonOnChange, storeTrendTableFetch, storeGeoMapFetch, storeHeatMapFetch,
                              storeHeatMapFilterOnChange, storeHeatMapButtonOnChange, storePartitionFilterHeatmapOnChange, pinMyPage, changeDataLoadStatus,
                              pinMyView, window, ...props
                          }) {
    useInjectReducer({key: "storeView", reducer});
    useInjectSaga({key: "storeView", saga});

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
        storeTrendTableFetch();
    },[selectedlocale]);
    useEffect(() => {
        if (filterData['region'].length === 0) {
            filterDataFetch(selectedFilterData);
        }
        if (selectedFilterData['pinPage']) {
            storeTrendTableFetch();
            storeGeoMapFetch();
            storeHeatMapFetch();
            onFilterChange({...selectedFilterData, pinPage: false});
        } else if (!dataLoadStatus.storeView) {
            storeTrendTableFetch();
            storeGeoMapFetch();
            storeHeatMapFetch();
            changeDataLoadStatus({...dataLoadStatus, storeView: true});
        } else {
            if (storeView['storeTrendTableData'].length === 0) {
                storeTrendTableFetch();
            }
            if (storeView['storeGeoMapData'].length === 0) {
                storeGeoMapFetch();
            }
            if (storeView['storeHeatMapData'].length === 0) {
                storeHeatMapFetch();
            }
        }
    }, []);

    const fetchData = () => {

        onFilterChange(filterState);

        storeTrendTableFetch();
        storeGeoMapFetch();
        storeHeatMapFetch();
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

        storeTrendTableFetch();
        storeGeoMapFetch();
        storeHeatMapFetch();

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

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const [sOpen, setSOpen] = React.useState(false);
    const handleStoreClose = () => {
        setSOpen(false);
    };

    const handleStoreOpen = () => {
        setSOpen(true);
    };

    const handleChangeStoreTopFilter = (event) => {
        storeTopFilterOnChange(event.target.value);
        storeTrendTableFetch();
    };
    const handleFilterChange = (event) => {
        storeHeatMapFilterOnChange(event.target.value);
        storeHeatMapFetch();
    };
    const onClickStoreHeatMapKpiNameButtons = (data) => {
        storeHeatMapButtonOnChange(data);
        storeHeatMapFetch();
    };
    const onClickStoreTrendButton = (data) => {
        storeTrendButtonOnChange(data);
        storeTrendTableFetch();
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
        storeTrendTableFetch();
        storeGeoMapFetch();
        storeHeatMapFetch();
    };

    const [openPartition, setOpenPartition] = React.useState(false);
    const handlePartitionOpen = () => {
        setOpenPartition(true);
    };

    const handlePartitionClose = () => {
        setOpenPartition(false);
    };

    const handlePartitionFilterChange = (event) => {

        storePartitionFilterHeatmapOnChange(event.target.value);
        storeHeatMapFetch();
    };
    const handleChangeCompareTimeRange = (value) => {
        // onFilterChange({...selectedFilterData, 'compare': value});
        onFilterChange({...filterState, 'compare': value.value});
        // fetchData();
        storeTrendTableFetch();
        storeGeoMapFetch();
        storeHeatMapFetch();
    };

    const [openPinPage, setOpenPinPage] = React.useState(false);

    const [pinPageParams, setPinPageParams] = React.useState({pinName: ""});

    const handlePinPageNameInput = (event) => {
        setPinPageParams({...pinPageParams, "pinName": event.target.value});
    };


    return (
        <div id={"storeView"}>
            <Helmet>
                <title>StoreView</title>
                <meta name="description" content="Description of StoreView"/>
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
                                        reset={reset}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10}>

                        <TitleHeader title={props.intl.formatMessage({...messages[`header`]})} setOpenPinPage={setOpenPinPage}
                                     selectedFilterData={selectedFilterData}
                                     handleChangeTimeRange={handleChangeTimeRange}
                                     handleChangeCompareTimeRange={handleChangeCompareTimeRange}
                                     tooltipData={props.intl.formatMessage({...messages[`headerTooltipText`]})}
                                     exportPdf={() => exportPdf("storeView", `${props.intl.formatMessage({...messages[`header`]})} - RTM.pdf`)}/>

                        <Grid container>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <StoreTrendTable
                                    storeTrendTableData={storeView['storeTrendTableData']}
                                    spinnerState={storeView['storeTrendTableDataSpinnerState']}
                                    dataFailed={storeView['storeTrendTableDataFail']}
                                    selectedFilter={selectedFilterData}
                                    onFilterChange={onFilterChange}
                                    sOpen={sOpen}
                                    handleStoreClose={handleStoreClose}
                                    handleStoreOpen={handleStoreOpen}
                                    storeTopFilter={storeView['storeTopFilter']}
                                    handleChangeStoreTopFilter={handleChangeStoreTopFilter}
                                    pinMyView={pinMyView}
                                    storeButtonData={storeView['storeTrendButton']}
                                    storeButtonClick={onClickStoreTrendButton}
                                    {...props}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <Paper style={{margin: "0vmin", height: '65vh'}} elevation={0}>
                                    <StoreGeoMap
                                        dataFailed={storeView['storeGeoMapDataFail']}
                                        spinnerState={storeView['storeGeoMapDataSpinnerState']}
                                        storeGeoMapData={storeView['storeGeoMapData']}
                                        pinMyView={pinMyView}
                                        {...props}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <StoreViewProductPerformanceHeatMap
                                    onClickStoreHeatMapKpiNameButtons={onClickStoreHeatMapKpiNameButtons}
                                    storeHeatMapButton={storeView['storeHeatMapButton']}
                                    storeHeatMapFilter={storeView['storeHeatMapFilter']}
                                    open={open}
                                    handleClose={handleClose}
                                    handleOpen={handleOpen}
                                    handleFilterChange={handleFilterChange}
                                    openPartition={openPartition}
                                    handlePartitionClose={handlePartitionClose}
                                    handlePartitionOpen={handlePartitionOpen}
                                    itemHeatMapPartitionFilter={storeView['itemHeatMapPartitionFilter']}
                                    handlePartitionFilterChange={handlePartitionFilterChange}
                                    dataFailed={storeView['storeHeatMapDataFail']}
                                    spinnerState={storeView['storeHeatMapDataSpinnerState']}
                                    storeHeatMapData={storeView['storeHeatMapData']}
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
                            ...params, "pageName": "Store View",
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

StoreView.propTypes = {
    dispatch: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    filterDataFetch: PropTypes.func.isRequired,
    storeTrendTableFetch: PropTypes.func.isRequired,
    storeGeoMapFetch: PropTypes.func.isRequired,
    storeHeatMapFetch: PropTypes.func.isRequired,
    storeHeatMapFilterOnChange: PropTypes.func.isRequired,
    storeHeatMapButtonOnChange: PropTypes.func.isRequired,
    storeTopFilterOnChange: PropTypes.func.isRequired,
    storeTrendButtonOnChange: PropTypes.func.isRequired,
    storeTimeFilterHeatmapOnChange: PropTypes.func.isRequired,
    storePartitionFilterHeatmapOnChange: PropTypes.func.isRequired,
    pinMyPage: PropTypes.func.isRequired,
    changeDataLoadStatus: PropTypes.func.isRequired,
    pinMyView: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    storeView: makeSelectStoreView(),
    filterData: makeSelectFilterData(),
    selectedFilterData: makeSelectSelectedFilters(),
    filterDataFetchFailed: makeSelectFilterDataFail(),
    filterDataFetchSpinnerState: makeSelectFilterDataSpinnerState(),
    storeTrendTableData: makeSelectStoreTrendTableSuccess(),
    storeGeoMapData: makeSelectStoreGeoMapSuccess(),
    storeHeatMapData: makeSelectStoreHeatMapSuccess(),
    dataLoadStatus: makeSelectDataLoadStatus(),
    selectedlocale: makeSelectLocale(),
});

export function mapDispatchToProps(dispatch) {
    return {
        onFilterChange: (data) => dispatch(selectedFilterOnChange(data)),
        filterDataFetch: (data) => dispatch(filterDataFetch(data)),
        storeTrendTableFetch: () => dispatch(storeTrendTableFetch()),
        storeGeoMapFetch: () => dispatch(storeGeoMapFetch()),
        storeHeatMapFetch: () => dispatch(storeHeatMapFetch()),
        storeHeatMapFilterOnChange: (data) => dispatch(storeHeatMapFilterChange(data)),
        storeHeatMapButtonOnChange: (data) => dispatch(storeHeatMapButtonOnChange(data)),
        storeTopFilterOnChange: (data) => dispatch(storeTopFilterOnChange(data)),
        storeTrendButtonOnChange: (data) => dispatch(storeTrendButtonOnChange(data)),
        storeTimeFilterHeatmapOnChange: (data) => dispatch(storeTimeFilterHeatmapOnChange(data)),
        storePartitionFilterHeatmapOnChange: (data) => dispatch(storePartitionFilterHeatmapOnChange(data)),
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
    memo
)(injectIntl(StoreView));
