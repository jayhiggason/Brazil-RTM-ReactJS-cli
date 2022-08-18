/**
 *
 * DistributorDeepdiveTable
 *
 */

import React, {memo} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {SyncLoader} from "react-spinners";
import ToolkitProvider, {CSVExport} from "react-bootstrap-table2-toolkit";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import './DistributorDeepdiveTable.css';
import {paginationOptions} from '../../utils/paginationOptions';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import history from "../../utils/history";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@mdi/react";
import {mdiPin} from "@mdi/js";
import {Tooltip} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import {injectIntl} from "react-intl";
import AppMessages from "../../containers/App/messages";
import messages from "./messages";
/** Styles class*/
const useStyles = makeStyles(({
    title: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1vw',
        color: '#0000a0e6',
        padding: '1vw',
        margin: '1vmin'
    },
    syncLoader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30vh',
    },
    distributorButtons: {
        fontSize: '0.95vw',
        fontFamily: 'MarsCentra-Book',
        backgroundColor: 'rgb(0,215,185)',
        color: 'rgb(255,255,255)!important',
        height: '2vw',
        textTransform: 'capitalize',
        margin: '0.24vw',
    },
    filterItems: {
        fontSize: '0.95vw',
        fontFamily: 'MarsCentra-Book',
    },
    formControl: {
        margin: '0.5vw',
        minWidth: '4vw',
        fontSize: '0.95vw',
        fontFamily: 'MarsCentra-Book',
        color: 'rgb(0,215,185)'
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
    exportToCSV: {
        fontSize: '0.95vw',
        fontFamily: 'MarsCentra-Book',
        backgroundColor: 'rgb(0,215,185)',
        color: 'rgb(255,255,255)!important',
        height: '2.75vw',
        textTransform: 'capitalize',
        margin: '0.24vw',
    },
    colStyle: {
        fontSize: '0.9vw',
        fontFamily: 'MarsCentra-Bold',
    },
    csvButtonStyle: {
        fontSize: "0.7vw",
        fontFamily: 'MarsCentra-Book',
        backgroundColor: 'rgb(255,255,255) ',
        color: 'rgb(0,215,185)',
        textTransform: 'none',
        alignItems: "center",
        padding: '0.2vw',
        '&:hover': {
            color: 'rgb(255,255,255)',
            backgroundColor: 'rgb(0,215,180)',
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
    columnStyle: {
        verticalAlign: 'middle',
        fontSize: '0.8vw',
        fontWeight: 'normal',
        fontFamily: 'MarsCentra-Book',
        padding: '0vw'
    }
}));

const {ExportCSVButton} = CSVExport;

/** DistributorDeepdiveTable function is used to render the "Store purchase analysis" table component that is used in distributor deep dive page */

function DistributorDeepdiveTable({
                                      spinnerState,
                                      selectRow,
                                      data,
                                      name,
                                      dataFetchFail,
                                      storeTableButton,
                                      storeTableButtonClick,
                                      // onFilterChange, selectedFilterData,
                                      handlePinView,
                                      selectedItems, intl
                                  }) {

    const columnStylePerformance = {
        verticalAlign: 'middle',
        fontSize: '0.8vw',
        fontWeight: 'normal',
        fontFamily: 'MarsCentra-Book',
    };

    const columnHeaderStyle = {
        verticalAlign: 'middle',
        textAlign: 'center',
        backgroundColor: '#0000a0',
        fontSize: '0.9vw',
        fontFamily: 'MarsCentra-Bold',
        color: '#fff',
    };

    const DistributorDeepDiveTable = [{
        dataField: 'store',
        text: intl.formatMessage({...AppMessages[`store`]}),
        sort: true,
        align: 'left',
        style: columnStylePerformance,
        headerStyle: {
            ...columnHeaderStyle,
            width: '7.2vw',
        },
        events: {
            onClick: (e, column, columnIndex, row) => {
                let storeName = row['store'];
                history.push(`/RTM/StoreDeepDive?${storeName}`);
            },
        }
    },
        {
            dataField: 'avg_purchase_freq',
            text: intl.formatMessage({...messages.avgPurchaseFreq}),
            sort: true,
            align: 'center',
            style: columnStylePerformance,
            headerStyle: {
                ...columnHeaderStyle,
                width: '4.3vw',
            },
        },
        {
            dataField: 'avg_purchase_amt',
            text: intl.formatMessage({...messages.avgPurchaseAmt}),
            sort: true,
            align: 'center',
            style: columnStylePerformance,
            formatter: (cell) => {
                if(cell){
                    return <Typography className={classes.columnStyle}>
                        {new Intl.NumberFormat('pt-BR').format(cell.toFixed(2))}
                    </Typography>
                } else {
                    return cell;
                }

            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '5vw',
            },
        },
        {
            dataField: 'next_expected_purchase',
            text: intl.formatMessage({...messages.nextPurchase}),
            sort: true,
            align: 'center',
            style: columnStylePerformance,
            headerStyle: {
                ...columnHeaderStyle,
                width: '4.5vw',
            },
        }
    ];


    const classes = useStyles();
    let tableTitle = "Store Performance";


    const csvProps = {
        fileName: `${tableTitle}_Distributor Deepdive-${selectedItems}_${storeTableButton}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()}_${new Date().getMinutes()}_${new Date().getSeconds()}.csv`,
        separator: ',',
        ignoreHeader: false,
        noAutoBOM: false,
        blobType: 'text/csv;charset=ansi',
    };

    return (

        <div style={{boxSizing: 'border-box', width: '100%', padding: "0 0vmin"}}>


            <ToolkitProvider
                keyField={name}
                data={data}
                columns={DistributorDeepDiveTable}
                exportCSV={csvProps}
            >
                {
                    props => (
                        <Grid container>
                            <Grid item xs={6} sm={6} md={6} lg={6} style={{textAlign: "start"}}>
                                <Typography className={classes.title}>{intl.formatMessage({...messages.header})}</Typography>
                            </Grid>
                            <Grid item container xs={6} style={{textAlign: 'end'}} justify={"flex-end"}
                                  alignItems={"center"}>
                                <Tooltip title={intl.formatMessage({...AppMessages[`click_to_download`]})}>
                                    <ExportCSVButton
                                        {...props.csvProps} className={classes.csvButtonStyle}
                                        data-tut="reactTour-exportAsCSV">
                                        <SystemUpdateAltIcon fontSize={"small"}/>
                                    </ExportCSVButton>
                                </Tooltip>

                                {
                                    history.location.pathname !== "/RTM/MyPinnedViews" &&
                                    <Tooltip title={intl.formatMessage({...AppMessages[`pin_the_component`]})}>
                                        <IconButton size="small" className={classes.pinButton} onClick={handlePinView}>
                                            <Icon
                                                path={mdiPin}
                                                size={"1vw"}/>
                                        </IconButton>
                                    </Tooltip>
                                }

                                <Tooltip
                                    title={intl.formatMessage({...messages.storePurchaseAnalysisToolTipText})}>
                                    <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                                </Tooltip>
                            </Grid>
                            <Grid item container xs={12} sm={12} md={12} lg={12}
                                  style={{paddingRight: '1vw'}} justify={"flex-end"} alignItems={"center"}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    className={clsx({
                                        [classes.distributorPerformanceButton]: storeTableButton !== 'Invoice',
                                        [classes.distributorPerformanceButtonActive]: storeTableButton === 'Invoice'
                                    })}
                                    onClick={() => storeTableButtonClick('Invoice')}
                                >
                                    {intl.formatMessage({...AppMessages[`kpi_invoice`]})}
                                </Button>
                                <Button
                                    size="small"
                                    variant="contained"
                                    className={clsx({
                                        [classes.distributorPerformanceButton]: storeTableButton !== 'GSV',
                                        [classes.distributorPerformanceButtonActive]: storeTableButton === 'GSV'
                                    })}
                                    onClick={() => storeTableButtonClick('GSV')}
                                >
                                    { intl.formatMessage({...AppMessages[`kpi_gsv`]})}
                                </Button>
                                <Button
                                    size="small"
                                    variant="contained"
                                    className={clsx({
                                        [classes.distributorPerformanceButton]: storeTableButton !== 'Units',
                                        [classes.distributorPerformanceButtonActive]: storeTableButton === 'Units'
                                    })}
                                    onClick={() => storeTableButtonClick('Units')}
                                >
                                    { intl.formatMessage({...AppMessages[`kpi_units`]})}
                                </Button>
                                <Button
                                    size="small"
                                    variant="contained"
                                    className={clsx({
                                        [classes.distributorPerformanceButton]: storeTableButton !== 'Tonnes',
                                        [classes.distributorPerformanceButtonActive]: storeTableButton === 'Tonnes'
                                    })}
                                    onClick={() => storeTableButtonClick('Tonnes')}
                                >
                                    { intl.formatMessage({...AppMessages[`kpi_tonnes`]})}
                                </Button>

                            </Grid>

                            <Grid container>
                                <Grid item container xs={12} justify={"center"} style={{padding: '1vw'}}>
                                    {(() => {

                                        if (!spinnerState && !dataFetchFail) {
                                            return (

                                                <div style={{
                                                    height: '48vh',
                                                    overflowY: 'auto',

                                                }}>
                                                    <BootstrapTable
                                                        classes='DistributorTable'
                                                        bootstrap4
                                                        keyField={name}
                                                        data={data}
                                                        columns={DistributorDeepDiveTable}
                                                        selectRow={selectRow}
                                                        bordered={false}
                                                        pagination={paginationFactory(paginationOptions)}
                                                        hover
                                                        {...props.baseProps}
                                                    />
                                                </div>

                                            )
                                        } else if (spinnerState) {
                                            return (
                                                <div className={classes.syncLoader}>
                                                    <SyncLoader size={15} margin={2} color="#0000a0" loading/>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <Typography className={classes.title} style={{margin: "auto"}}>No data
                                                    is
                                                    selected</Typography>

                                            )
                                        }

                                    })()}
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                }
            </ToolkitProvider>

        </div>
    );
}


DistributorDeepdiveTable.propTypes = {};

export default memo(injectIntl(DistributorDeepdiveTable));
