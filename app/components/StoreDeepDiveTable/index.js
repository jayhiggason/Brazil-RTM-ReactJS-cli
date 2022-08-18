/**
 *
 * StoreDeepDiveTable
 *
 */

import React, {memo} from "react";
import './StoreDeepDiveTable.css';
import makeStyles from "@material-ui/core/styles/makeStyles";
import ToolkitProvider, {CSVExport} from "react-bootstrap-table2-toolkit";
import Grid from "@material-ui/core/Grid";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {paginationOptions} from "../../utils/paginationOptions";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import history from "../../utils/history";
import Typography from "@material-ui/core/Typography";
import {SyncLoader} from "react-spinners";
import NoDataAlert from "../NoDataAlert";
import {Button, FormControl, Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@mdi/react";
import {mdiPin} from "@mdi/js";
import clsx from "clsx";
import AppMessages from "../../containers/App/messages";
import {injectIntl} from "react-intl";
import messages from "./messages";

/** Styles class*/
const useStyles = makeStyles((theme) => ({

    buttonRoot: {
        '& > *': {
            margin: theme.spacing(1),
            color: 'rgb(0,215,185)',
            cursor: 'pointer',
            borderRadius: "1vmin",
            borderColor: '#000'
        },
    },
    button: {
        color: "white",
        backgroundColor: "white",
        fontFamily: "MarsCentra-Book",
        textTransform: 'none',
        borderRadius: "2vmin",
        outline: 'none'
    },
    dialog: {
        height: '80vh',
        overflowY: "auto",
        margin: "2vw"
    },
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
        height: '60vh',
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
    columnStyle: {
        fontSize: '0.9vw',
        fontFamily: 'MarsCentra-Book',
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
    menuItem: {
        fontFamily: "MarsCentra-Book",
        fontSize: "0.7vw",
    },
    formControl: {
        margin: '1vmin',
        minWidth: '4vw',
        fontSize: '0.8vw',
        fontFamily: 'MarsCentra-Book',
        color: 'rgb(0,215,185)'
    },
    zoomIcon: {
        color: 'rgb(0,215,185)',
        cursor: 'pointer',
        borderRadius: "1vmin",
        borderColor: '#000'
    },
    csvButtonStyle: {
        margin: "0 0vmin",
        padding: '0.2vw',
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
    }
}));

const {ExportCSVButton} = CSVExport;

/** StoreDeepDiveTable function is used to render the "Stores' product analysis" table component that is used in store deep dive page */


function StoreDeepDiveTable({data, name, spinnerState, storeTableDataFail, onChangeFilter, filterValue, onOpenFilter, onCloseFilter, openFilter, handlePinView,selectedItems,ProductAnalysisButton,onClickProductAnalysisButton,intl}) {

    const columnStylePerformance = {
        verticalAlign: 'middle',
        fontSize: '0.8vw',
        fontWeight: 'normal',
        fontFamily: 'MarsCentra-Book',
        // padding: '0vw'
    };
    const columnHeaderStyle = {
        verticalAlign: 'middle',
        textAlign: 'center',
        backgroundColor: '#0000a0',
        fontSize: '0.9vw',
        fontFamily: 'MarsCentra-Bold',
        color: '#fff',
    };


    const ProductAnalysisTable = [
        {
            dataField: 'product',
            text: intl.formatMessage({...messages[`product`]}),
            sort: true,
            align: 'left',
            style: columnStylePerformance,
            headerStyle: {
                ...columnHeaderStyle,
                width: '7vw',
            },

        },
        {
            dataField: 'Invoice',
            text: intl.formatMessage({...AppMessages[`kpi_invoice`]}),
            sort: true,
            align: 'center',
            csvExport: ProductAnalysisButton === 'Invoice',
            style: columnStylePerformance,
            hidden: ProductAnalysisButton !== 'Invoice',
            formatter: (cell) => {
                if(cell) {
                    return <Typography className={classes.columnStyle}>
                        {new Intl.NumberFormat('pt-BR').format(cell.toFixed(2))}
                    </Typography>
                }
                else {
                    return cell;
                }
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '5vw',
            },
        },
        {
            dataField: 'GSV',
            text: intl.formatMessage({...AppMessages[`kpi_gsv`]}),
            sort: true,
            align: 'center',
            style: columnStylePerformance,
            hidden: ProductAnalysisButton !== 'GSV',
            csvExport: ProductAnalysisButton === 'GSV',
            formatter: (cell) => {
                if(cell) {
                    return <Typography className={classes.columnStyle}>
                        {new Intl.NumberFormat('pt-BR').format(cell.toFixed(2))}
                    </Typography>
                }
                else {
                    return cell;
                }
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '5vw',
            },
        },
        {
            dataField: 'Units',
            text: intl.formatMessage({...AppMessages[`kpi_units`]}),
            sort: true,
            align: 'center',
            hidden: ProductAnalysisButton !== 'Units',
            csvExport: ProductAnalysisButton === 'Units',
            style: columnStylePerformance,
            formatter: (cell) => {
                if(cell) {
                    return <Typography className={classes.columnStyle}>
                        {new Intl.NumberFormat('pt-BR').format(cell.toFixed(2))}
                    </Typography>
                }
                else {
                    return cell;
                }
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '5vw',
            },
        },
        {
            dataField: 'Tonnes',
            text: intl.formatMessage({...AppMessages[`kpi_tonnes`]}),
            sort: true,
            align: 'center',
            style: columnStylePerformance,
            hidden: ProductAnalysisButton !== 'Tonnes',
            csvExport: ProductAnalysisButton === 'Tonnes',
            formatter: (cell) => {
                if(cell) {
                    return <Typography className={classes.columnStyle}>
                        {new Intl.NumberFormat('pt-BR').format(cell.toFixed(2))}
                    </Typography>
                }
                else {
                    return cell;
                }
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '5vw',
            },
        },
        {
            dataField: 'growth',
            text: intl.formatMessage({...messages[`growthPercent`]}),
            sort: true,
            align: 'center',
            style: columnStylePerformance,
            formatter: (cell) => {
                if(cell) {
                    return <Typography className={classes.columnStyle}>
                        {new Intl.NumberFormat('pt-BR').format(cell.toFixed(2))}%
                    </Typography>
                }
                else {
                    return cell;
                }
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '3vw',
            },
        },
        {
            dataField: 'brandAvg',
            text: intl.formatMessage({...messages[`brandAvg`]}),
            sort: true,
            align: 'center',
            style: columnStylePerformance,
            formatter: (cell) => {
                if(cell) {
                    return <Typography className={classes.columnStyle}>
                        {new Intl.NumberFormat('pt-BR').format(cell.toFixed(2))}
                    </Typography>
                }
            else {
                    return cell;
                }
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '5vw',
            },
        },
    ];

    const classes = useStyles();

    let tableTitle = intl.formatMessage({...AppMessages[`store_deep_dive_product_analysis_view`]});

    const csvProps = {
        fileName: `${tableTitle}_${selectedItems}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()}_${new Date().getMinutes()}_${new Date().getSeconds()}.csv`,
        separator: ',',
        ignoreHeader: false,
        noAutoBOM: false,
        blobType: 'text/csv;charset=ansi',
    };
    const rowStyle = (row, rowIndex) => {
        const style = {};

        if (rowIndex % 2 === 0) {
            style.textAlign = 'center';
            style.fontSize = '0.8vw';
            style.fontWeight = 'normal';
            style.fontFamily = 'MarsCentra-Book';
            style.lineHeight = '4vh';
            style.backgroundColor = "#fff";
        } else {
            style.textAlign = 'center';
            style.fontSize = '0.8vw';
            style.fontWeight = 'normal';
            style.fontFamily = 'MarsCentra-Book';
            style.backgroundColor = "#fff";
        }
        return style;
    };
    return (

        <Grid style={{padding: "0vmin"}}>

            <ToolkitProvider
                keyField={name}
                data={data}
                columns={ProductAnalysisTable}
                exportCSV={csvProps}
            >
                {
                    props => (

                        <Grid container>
                            <Grid item container xs={7} sm={7} md={7} lg={7} style={{textAlign: "start"}}>
                                <Typography className={classes.title}>{intl.formatMessage({...messages[`header`]})}</Typography>
                            </Grid>


                            <Grid item container xs={5} md={5} sm={5} lg={5} style={{textAlign: "end", paddingRight:'0.5vw'}}
                                  alignItems={"center"}
                                  justify="flex-end">


                                <FormControl className={classes.formControl}
                                             id={"product-analysis-table-filter"}>
                                    <Select className={classes.menuItem}
                                            labelId="Product_perf-filter"
                                            id="demo-controlled-open-select"
                                            defaultValue={"Top 10"}
                                            open={openFilter}
                                            onClose={onCloseFilter}
                                            onOpen={onOpenFilter}
                                            value={filterValue}
                                            onChange={onChangeFilter}
                                    >
                                        <MenuItem value={"Top 10"} className={classes.menuItem}>{intl.formatMessage({...AppMessages[`top_ten`]})}</MenuItem>
                                        <MenuItem value={"Bottom 10"} className={classes.menuItem}>{intl.formatMessage({...AppMessages[`bottom_ten`]})}</MenuItem>

                                    </Select>
                                </FormControl>
                                <Tooltip title={intl.formatMessage({...AppMessages[`click_to_download`]})}>
                                    <ExportCSVButton  {...props.csvProps} size={"small"}
                                                      className={classes.csvButtonStyle}
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

                            </Grid>
                            <Grid item container xs={12} md={12} sm={12} lg={12} style={{textAlign: "end", paddingRight:'1vw'}}
                                  alignItems={"center"}
                                  justify="flex-end">
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() => onClickProductAnalysisButton('Invoice')}
                                    className={clsx({
                                        [classes.proDistributionButton]: ProductAnalysisButton !== 'Invoice',
                                        [classes.proDistributionButtonActive]: ProductAnalysisButton === 'Invoice'
                                    })}
                                >
                                    { intl.formatMessage({...AppMessages[`kpi_invoice`]})}
                                </Button>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() => onClickProductAnalysisButton('GSV')}
                                    className={clsx({
                                        [classes.proDistributionButton]: ProductAnalysisButton !== 'GSV',
                                        [classes.proDistributionButtonActive]: ProductAnalysisButton === 'GSV'
                                    })}
                                >
                                    { intl.formatMessage({...AppMessages[`kpi_gsv`]})}
                                </Button>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() => onClickProductAnalysisButton('Units')}
                                    className={clsx({
                                        [classes.proDistributionButton]: ProductAnalysisButton !== 'Units',
                                        [classes.proDistributionButtonActive]: ProductAnalysisButton === 'Units'
                                    })}
                                >
                                    { intl.formatMessage({...AppMessages[`kpi_units`]})}
                                </Button>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() => onClickProductAnalysisButton('Tonnes')}
                                    className={clsx({
                                        [classes.proDistributionButton]: ProductAnalysisButton !== 'Tonnes',
                                        [classes.proDistributionButtonActive]: ProductAnalysisButton === 'Tonnes'
                                    })}
                                >
                                    { intl.formatMessage({...AppMessages[`kpi_tonnes`]})}
                                </Button>
                            </Grid>
                            <Grid container>

                                <Grid item container justify={"center"} style={{padding: '1vmin'}}>
                                    {(() => {
                                        if (!spinnerState && !storeTableDataFail) {
                                            return (
                                                <div style={{overflowY: 'auto', height: '47vh', padding: '0vmin'}}>
                                                    <BootstrapTable
                                                        keyField={name}
                                                        data={data}
                                                        columns={ProductAnalysisTable}
                                                        rowStyle={rowStyle}
                                                        classes={'tableValue'}
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
                                            return <NoDataAlert/>;
                                        }
                                    })()}
                                </Grid>
                            </Grid>

                        </Grid>
                    )
                }
            </ToolkitProvider>

        </Grid>


    );
}

StoreDeepDiveTable.propTypes = {};

export default memo(injectIntl(StoreDeepDiveTable));
