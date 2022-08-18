/**
 *
 * DistributorPerformanceTable
 *
 */
/**
 *
 * DistributorTable
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
import './DistributorPerformanceTable.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import history from "../../utils/history";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@mdi/react";
import {mdiPin} from "@mdi/js";
import {Button, FormControl, MenuItem, Select, Tooltip} from "@material-ui/core";
import clsx from "clsx";
import NoDataAlert from "../NoDataAlert";
import InfoIcon from "@material-ui/icons/Info";
import messages from "./messages";
import {FormattedMessage, injectIntl} from "react-intl";
import AppMessages from "../../containers/App/messages";

/** Styles class*/
const useStyles = makeStyles(({

    iconUp: {
        textAlign: "center",
        alignSelf: "middle",
        color: "green",
        paddingRight: "1vmin",
        fontSize: "26px",
        width: '2em',
    },
    iconDown: {
        textAlign: "center",
        alignSelf: "middle",
        color: "red",
        paddingRight: "1vmin",
        fontSize: "26px",
        width: '2em',
    },
    syncLoader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30vh',
    },

    filterItems: {
        fontSize: '0.95vw',
        fontFamily: 'MarsCentra-Book',
    },

    formControl: {
        minWidth: '7vw',
        fontSize: '0.9vw',
        fontFamily: 'MarsCentra-Book',
        color: 'rgb(0,215,185)',
        marginRight: '1vw'
    },
    menuItem: {
        fontFamily: "MarsCentra-Book",
        fontSize: "0.7vw",
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
    title: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1vw',
        color: '#0000a0e6',
        margin: '1vmin'
    },
    colStyle: {
        fontSize: '0.9vw',
        fontFamily: 'MarsCentra-Bold',
    },
    columnStyle: {
        fontSize: '0.9vw',
        fontFamily: 'MarsCentra-Book',
    },
    distributorButtons: {
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
    distributorsFilterButtonActive: {
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

}));

const {ExportCSVButton} = CSVExport;

const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
     <FormattedMessage {...AppMessages[`showing`]} />  {from}  <FormattedMessage {...AppMessages[`to`]} />  {to}  <FormattedMessage {...AppMessages[`of`]} />  {size}  <FormattedMessage {...AppMessages[`results`]} />
  </span>
);


const paginationOptions = {
    paginationSize: 10,
    pageStartIndex: 1,
    firstPageText: <FormattedMessage {...AppMessages[`first`]} />,
    prePageText: <FormattedMessage {...AppMessages[`back`]} />,
    nextPageText: <FormattedMessage {...AppMessages[`next`]} />,
    lastPageText: <FormattedMessage {...AppMessages[`last`]} />,
    nextPageTitle: <FormattedMessage {...AppMessages[`firstPage`]} />,
    prePageTitle: <FormattedMessage {...AppMessages[`prePage`]} />,
    firstPageTitle: <FormattedMessage {...AppMessages[`nextPage`]} />,
    lastPageTitle: <FormattedMessage {...AppMessages[`lastPage`]} />,
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
        {
            text: "10",
            value: 10,
        },
        {
            text: "5",
            value: 5,
        },


    ],
};

/** DistributorPerformanceTable function is used to render the "Distributors' Performance" table component that is used in performance summary page */

function DistributorPerformanceTable({
                                         spinnerState,
                                         dataFetchFail,
                                         selectRow,
                                         data,
                                         kpiName,
                                         topFilter,
                                         filterChange,
                                         openFilter,
                                         onCloseFilter,
                                         onOpenFilter,
                                         onClickButton,
                                         handlePinView,
                                         intl
                                     }) {


    const growthValueFormatterStyle = (value) => {
        let textColor;
        if (Number(value) < 0) {
            textColor = 'red';
        } else if (Number(value) === 0) {
            textColor = 'blue';
        } else {
            textColor = 'green';
        }
        return {
            color: textColor
        };
    };
    const spanValueFormatter = (value) => {
        if (Number(value) === 0) {
            return "+" + value + "%";
        } else if (Number(value) > 0) {
            return "+" + new Intl.NumberFormat('pt-BR').format(value.toFixed(2)) + "%";
        } else if (Number(value) < 0) {
            return new Intl.NumberFormat('pt-BR').format(value.toFixed(2)) + "%";
        }
    };

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
        color: '#FFF',
    };

    const DistributorPerformanceTable = [
        {
            dataField: "distributor",
            text: intl.formatMessage({...AppMessages[`distributor`]}),
            sort: true,
            align: 'left',
            style: columnStylePerformance,
            headerStyle: {
                ...columnHeaderStyle,
                width: '7vw',

            },
            events: {
                onClick: (e, column, columnIndex, row) => {
                    let distName = row['distributor'];
                    history.push(`/RTM/DistributorDeepDive?${distName}`);
                },
            }
        },
        {
            dataField: "POS",
            text: intl.formatMessage({...messages.dist_performance_pos}),
            sort: true,
            align: 'center',
            style: columnStylePerformance,
            csvFormatter: (cell) => cell,
            formatter: (cell, row) => {
                let cellValue = spanValueFormatter(row['percentage_growth_pos']);
                return <Typography className={classes.colStyle}>{new Intl.NumberFormat('pt-BR').format(cell)} (<span
                    style={growthValueFormatterStyle(row['percentage_growth_pos'])}>{cellValue}</span>)</Typography>
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '5vw',

            },

        },
        {
            dataField: "percentage_growth_pos",
            text: `${intl.formatMessage({...AppMessages[`kpi_pos`]})} % ${intl.formatMessage({...AppMessages[`growth`]})}`,
            hidden: true,
            csvFormatter: (cell) => cell,
        },
        {
            dataField: "invoice",
            text: intl.formatMessage({...AppMessages[`kpi_invoice`]}),
            sort: true,
            align: 'center',
            hidden: kpiName !== 'invoice',
            csvExport: kpiName === 'invoice',
            style: columnStylePerformance,
            csvFormatter: (cell) => cell,
            formatter: (cell, row) => {
                let cellValue = spanValueFormatter(row['percentage_growth_invoice']);
                return <Typography className={classes.colStyle}>{new Intl.NumberFormat('pt-BR').format(cell)} (<span
                    style={growthValueFormatterStyle(row['percentage_growth_invoice'])}>{cellValue}</span>)</Typography>
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '5vw',
            },

        },
        {
            dataField: "percentage_growth_invoice",
            text: `${intl.formatMessage({...AppMessages[`kpi_invoice`]})} % ${intl.formatMessage({...AppMessages[`growth`]})}`,
            hidden: true,
            csvExport: kpiName === 'invoice',
            csvFormatter: (cell) => cell,
        },
        {
            dataField: "units",
            text: intl.formatMessage({...AppMessages[`kpi_units`]}),
            sort: true,
            align: 'center',
            hidden: kpiName !== 'units',
            csvExport: kpiName === 'units',
            style: columnStylePerformance,
            csvFormatter: (cell) => cell,
            formatter: (cell, row) => {
                let cellValue = spanValueFormatter(row['percentage_growth_units']);
                return <Typography className={classes.colStyle}>{new Intl.NumberFormat('pt-BR').format(cell)} (<span
                    style={growthValueFormatterStyle(row['percentage_growth_units'])}>{cellValue}</span>)</Typography>
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '5vw',
            },

        },
        {
            dataField: "percentage_growth_units",
            text: `${intl.formatMessage({...AppMessages[`kpi_units`]})} % ${intl.formatMessage({...AppMessages[`growth`]})}`,
            hidden: true,
            csvExport: kpiName === 'units',
            csvFormatter: (cell) => cell,
        },
        {
            dataField: "tonnes",
            text: intl.formatMessage({...AppMessages[`kpi_tonnes`]}),
            sort: true,
            align: 'center',
            hidden: kpiName !== 'tonnes',
            csvExport: kpiName === 'tonnes',
            style: columnStylePerformance,
            csvFormatter: (cell) => cell,
            formatter: (cell, row) => {
                let cellValue = spanValueFormatter(row['percentage_growth_tonnes']);
                return <Typography
                    className={classes.colStyle}>{new Intl.NumberFormat('pt-BR').format(cell.toFixed(2))} (<span
                    style={growthValueFormatterStyle(row['percentage_growth_tonnes'])}>{cellValue}</span>)
                </Typography>
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '5vw',
            },

        },
        {
            dataField: "percentage_growth_tonnes",
            text: `${intl.formatMessage({...AppMessages[`kpi_tonnes`]})} % ${intl.formatMessage({...AppMessages[`growth`]})}`,
            hidden: true,
            csvExport: kpiName === 'tonnes',
            csvFormatter: (cell) => cell,
        },
        {
            dataField: "gsv",
            text: intl.formatMessage({...AppMessages[`kpi_gsv`]}),
            sort: true,
            align: 'center',
            hidden: kpiName !== 'gsv',
            csvExport: kpiName === 'gsv',
            style: columnStylePerformance,
            csvFormatter: (cell) => cell,
            formatter: (cell, row) => {
                let cellValue = spanValueFormatter(row['percentage_growth_gsv']);
                return <Typography
                    className={classes.colStyle}>{new Intl.NumberFormat('pt-BR').format(cell.toFixed(2))} (<span
                    style={growthValueFormatterStyle(row['percentage_growth_gsv'])}>{cellValue}</span>)</Typography>
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '5vw',
            },

        },
        {
            dataField: "percentage_growth_gsv",
            text:`${intl.formatMessage({...AppMessages[`kpi_gsv`]})} % ${intl.formatMessage({...AppMessages[`growth`]})}`,
            hidden: true,
            csvExport: kpiName === 'gsv',
            csvFormatter: (cell) => cell,
        },
        {
            dataField: "target",
            text: intl.formatMessage({...AppMessages[`kpi_target`]}),
            sort: true,
            align: 'center',
            hidden: !(kpiName === 'gsv' || kpiName === 'tonnes'),
            csvExport: (kpiName === 'gsv' || kpiName === 'tonnes'),
            style: columnStylePerformance,
            csvFormatter: (cell) => cell,
            formatter: (cell) => {

                return <Typography className={classes.colStyle}>{new Intl.NumberFormat('pt-BR').format(cell)}
                </Typography>
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '5vw',
            },

        },
        {
            dataField: "wos",
            text: intl.formatMessage({...AppMessages[`kpi_wos`]}),
            sort: true,
            align: 'center',
            hidden: kpiName !== 'wos',
            csvExport: kpiName === 'wos',
            style: columnStylePerformance,
            csvFormatter: (cell) => cell,
            formatter: (cell) => {
                return <Typography
                    className={classes.colStyle}>{new Intl.NumberFormat('pt-BR').format(cell)}</Typography>
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '5vw',
            },

        },
        {
            dataField: "tdp",
            text: intl.formatMessage({...messages[`dist_performance_tdp`]}),
            sort: true,
            align: 'center',
            hidden: kpiName !== 'tdp',
            csvExport: kpiName === 'tdp',
            style: columnStylePerformance,
            csvFormatter: (cell) => cell,
            formatter: (cell, row) => {
                let cellValue = spanValueFormatter(row['percentage_growth_tdp']);
                return <Typography className={classes.colStyle}>{new Intl.NumberFormat('pt-BR').format(cell)} (<span
                    style={growthValueFormatterStyle(row['percentage_growth_tdp'])}>{cellValue}</span>)</Typography>
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '5vw',
            },

        },
        {
            dataField: "percentage_growth_tdp",
            text: `${intl.formatMessage({...messages[`dist_performance_tdp`]})} % ${intl.formatMessage({...AppMessages[`growth`]})}`,
            hidden: true,
            csvExport: kpiName === 'tdp',
            csvFormatter: (cell) => cell,
        },

    ];


    const classes = useStyles();

    let tableTitle = "Distributors Performance";


    const csvProps = {
        fileName: `${intl.formatMessage({...AppMessages[`performanceSummary`]})}_${intl.formatMessage({...messages[`dist_performance_header`]})}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()}_${new Date().getMinutes()}_${new Date().getSeconds()}.csv`,
        separator: ',',
        ignoreHeader: false,
        noAutoBOM: false,
        blobType: 'text/csv;charset=ansi',
    };


    return (
        <Grid item xs={12} justify={"center"}>
            <div style={{boxSizing: 'border-box', width: '100%', padding: "1vmin"}}>

                <ToolkitProvider
                    keyField={"Distributor"}
                    data={data}
                    columns={DistributorPerformanceTable}
                    exportCSV={csvProps}
                >
                    {
                        props => (
                            <Grid container>
                                <Grid item xs={6} sm={6} md={6} lg={6} style={{textAlign: "start"}}>
                                    <Typography
                                        className={classes.title}>
                                        {intl.formatMessage({...messages[`dist_performance_header`]})}
                                    </Typography>
                                </Grid>
                                <Grid item container xs={6} sm={6} md={6} lg={6} style={{textAlign: "center"}}
                                      alignItems={"center"} justify={"flex-end"}>
                                    <FormControl className={classes.formControl}
                                                 id={"distributor-performance-filter"}>
                                        {/*<InputLabel id="distributor-filter">Filter</InputLabel>*/}
                                        <Select
                                            labelId="distributor-filter"
                                            id="demo-controlled-open-select"
                                            open={openFilter}
                                            onClose={onCloseFilter}
                                            onOpen={onOpenFilter}
                                            value={topFilter}
                                            onChange={filterChange}
                                            className={classes.menuItem}
                                        >
                                            <MenuItem value={'Top 10'}
                                                      className={classes.menuItem}>
                                                <FormattedMessage {...AppMessages[`top_ten`]} />
                                            </MenuItem>
                                            <MenuItem value={'Bottom 10'} className={classes.menuItem}>
                                                <FormattedMessage {...AppMessages[`bottom_ten`]} />
                                            </MenuItem>
                                        </Select>
                                    </FormControl>

                                    <ExportCSVButton
                                        {...props.csvProps} className={classes.csvButtonStyle}
                                        data-tut="reactTour-exportAsCSV">
                                        <Tooltip title={<FormattedMessage {...AppMessages[`click_to_download`]} />}>
                                            <SystemUpdateAltIcon fontSize={"small"}/>
                                        </Tooltip>
                                    </ExportCSVButton>

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
                                    <Tooltip
                                        title={<FormattedMessage {...messages.dist_performance_tooltip_info_text} />}>
                                        <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} md={12} sm={12} lg={12} style={{textAlign: "left"}}>
                                    <Button
                                        onClick={() => onClickButton('invoice')}
                                        className={clsx({
                                            [classes.distributorButtons]: kpiName !== 'invoice',
                                            [classes.distributorsFilterButtonActive]: kpiName === 'invoice'
                                        })}>
                                        <FormattedMessage {...AppMessages[`kpi_invoice`]} />
                                    </Button>
                                    <Button
                                        onClick={() => onClickButton('gsv')}
                                        className={clsx({
                                            [classes.distributorButtons]: kpiName !== 'gsv',
                                            [classes.distributorsFilterButtonActive]: kpiName === 'gsv'
                                        })}><FormattedMessage {...AppMessages[`kpi_gsv`]} /></Button>
                                    <Button
                                        onClick={() => onClickButton('units')}
                                        className={clsx({
                                            [classes.distributorButtons]: kpiName !== 'units',
                                            [classes.distributorsFilterButtonActive]: kpiName === 'units'
                                        })}><FormattedMessage {...AppMessages[`kpi_units`]} /></Button>
                                    <Button
                                        onClick={() => onClickButton('tonnes')}
                                        className={clsx({
                                            [classes.distributorButtons]: kpiName !== 'tonnes',
                                            [classes.distributorsFilterButtonActive]: kpiName === 'tonnes'
                                        })}><FormattedMessage {...AppMessages[`kpi_tonnes`]} /></Button>
                                    <Button
                                        onClick={() => onClickButton('wos')}
                                        className={clsx({
                                            [classes.distributorButtons]: kpiName !== 'wos',
                                            [classes.distributorsFilterButtonActive]: kpiName === 'wos'
                                        })}>WOS</Button>
                                    <Button
                                        onClick={() => onClickButton('tdp')}
                                        className={clsx({
                                            [classes.distributorButtons]: kpiName !== 'tdp',
                                            [classes.distributorsFilterButtonActive]: kpiName === 'tdp'
                                        })}>TDP</Button>
                                </Grid>

                                <Grid container>

                                    <Grid item container justify={"center"}>
                                        {(() => {
                                            if (spinnerState) {
                                                return (
                                                    <div className={classes.syncLoader}>
                                                        <SyncLoader size={15} margin={2} color="#0000a0" loading/>
                                                    </div>
                                                )
                                            } else if (!spinnerState && !dataFetchFail) {
                                                return (
                                                    <div style={{height: '65vh', overflowY: 'auto', width: '100%'}}>
                                                        <BootstrapTable
                                                            classes='DistributorTable'
                                                            bootstrap4
                                                            keyField={"Distributor"}
                                                            data={data}
                                                            columns={DistributorPerformanceTable}
                                                            selectRow={selectRow}
                                                            bordered={false}
                                                            pagination={paginationFactory(paginationOptions)}
                                                            hover
                                                            {...props.baseProps}
                                                        />
                                                    </div>
                                                );
                                            } else {
                                                return <NoDataAlert/>
                                            }
                                        })()}
                                    </Grid>

                                </Grid>
                            </Grid>
                        )
                    }
                </ToolkitProvider>

            </div>
        </Grid>
    );
}


DistributorPerformanceTable.propTypes = {};

export default memo(injectIntl(DistributorPerformanceTable));
