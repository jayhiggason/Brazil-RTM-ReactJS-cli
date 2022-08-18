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
import './DistributorTable.css';
import {paginationOptions} from '../../utils/paginationOptions';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import history from "../../utils/history";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import {InputAdornment, TextField, Tooltip} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@mdi/react";
import {mdiPin} from "@mdi/js";
import NoDataAlert from "../NoDataAlert";
import InfoIcon from "@material-ui/icons/Info";
import {compose} from "redux";
import {injectIntl} from "react-intl";
import AppMessages from "../../containers/App/messages";
import messages from './messages';

/** Styles class*/
const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
        fontFamily: "MarsCentra-Book",
        fontSize: "0.9vw",
    },
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
    columnStyle: {
        fontSize: '0.9vw',
        fontFamily: 'MarsCentra-Book',
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
    title: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1vw',
        color: '#0000a0e6',
        padding: '1vw',
        margin: '1vmin'
    },
    textField: {
        margin: theme.spacing(1),
        borderRadius: '0.3vw'
    },
    textFieldInput: {
        fontSize: '0.8vw',
        fontFamily: 'MarsCentra-Book',
        color: "#000",
        backgroundColor: "#FFF",

    },

}));

const {ExportCSVButton} = CSVExport;


/** DistributorTable function is used to render the "Distributors' Overview" table component that is used in distributor page */

function DistributorTable({
                              spinnerState,
                              selectRow,
                              data,
                              name,
                              onFilterChange, selectedFilterData, dataFetchFailed, handleSearch, handlePinView, intl
                          }) {


    const columnStyle = {
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


    const DistributorViewTable = [
        {
            dataField: "distributor",
            text: intl.formatMessage({...AppMessages[`distributor`]}),
            sort: true,
            align: 'left',
            style: {
                ...columnStyle,
                textDecorationColor: 'blue',
                cursor: "pointer"
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '13.8vw',
            },
            events: {
                onClick: (e, column, columnIndex, row) => {
                    history.push(`/RTM/DistributorDeepDive?${row['distributor']}`);
                    onFilterChange({
                        ...selectedFilterData,
                        distributor: [...selectedFilterData['distributor'], row['distributor']],
                    });
                },
            }


        },
        {
            dataField: "POS",
            text: "POS",
            sort: true,
            align: 'center',
            style: columnStyle,
            headerStyle: {
                ...columnHeaderStyle,
                width: '4.2vw'
            },

        },
        {
            dataField: "Invoice",
            text: intl.formatMessage({...AppMessages[`kpi_invoice`]}),
            sort: true,
            align: 'center',
            style: columnStyle,
            formatter: (cell) => {
                if (cell) {
                    return <Typography className={classes.columnStyle}>
                        {new Intl.NumberFormat('pt-BR').format(cell.toFixed(2))}
                    </Typography>
                } else {
                    return cell;
                }
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '6.8vw',
            },

        },
        {
            dataField: "GSV",
            text: intl.formatMessage({...AppMessages[`kpi_gsv`]}),
            sort: true,
            align: 'center',
            style: columnStyle,
            formatter: (cell) => {
                if (cell) {
                    return <Typography className={classes.columnStyle}>
                        {new Intl.NumberFormat('pt-BR').format(cell.toFixed(2))}
                    </Typography>
                } else {
                    return cell;
                }
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '6.4vw'
            },
        },
        {
            dataField: "units",
            text: intl.formatMessage({...AppMessages[`kpi_units`]}),
            sort: true,
            align: 'center',
            style: columnStyle,
            formatter: (cell) => {
                if (cell) {
                    return <Typography className={classes.columnStyle}>
                        {new Intl.NumberFormat('pt-BR').format(cell.toFixed(2))}
                    </Typography>
                } else {
                    return cell;
                }
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '6vw'
            },

        },
        {
            dataField: "Tonnes",
            text: intl.formatMessage({...AppMessages[`kpi_tonnes`]}),
            sort: true,
            align: 'center',
            style: columnStyle,
            formatter: (cell) => {
                if (cell) {
                    return <Typography className={classes.columnStyle}>
                        {new Intl.NumberFormat('pt-BR').format(cell.toFixed(2))}
                    </Typography>
                } else {
                    return cell;
                }
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '5vw'
            },
        },

        {
            dataField: "TargetGSV",
            text: `${intl.formatMessage({...AppMessages[`kpi_target`]})} ${intl.formatMessage({...AppMessages[`kpi_gsv`]})}`,
            align: 'center',
            sort: true,
            style: columnStyle,
            formatter: (cell) => {
                if (cell) {
                    return <Typography className={classes.columnStyle}>
                        {new Intl.NumberFormat('pt-BR').format(cell.toFixed(2))}
                    </Typography>
                } else {
                    return cell;
                }
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '6.4vw'
            },
        },
        {
            dataField: "%TargetGSV",
            text: `% ${intl.formatMessage({...AppMessages[`kpi_target`]})} ${intl.formatMessage({...AppMessages[`kpi_gsv`]})}`,
            align: 'center',
            sort: true,
            style: columnStyle,
            formatter: (cell) => {
                if (cell) {
                    return <Typography className={classes.columnStyle}>
                        {new Intl.NumberFormat('pt-BR').format(cell.toFixed(2))}
                    </Typography>
                } else {
                    return cell;
                }
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '5.5vw'
            },
        },

        {
            dataField: "TargetTonnes",
            text: `${intl.formatMessage({...AppMessages[`kpi_target`]})} ${intl.formatMessage({...AppMessages[`kpi_tonnes`]})}`,
            sort: true,
            align: 'center',
            style: columnStyle,
            formatter: (cell) => {
                if (cell) {
                    return <Typography className={classes.columnStyle}>
                        {new Intl.NumberFormat('pt-BR').format(cell.toFixed(2))}
                    </Typography>
                } else {
                    return cell;
                }
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '5vw'
            },
        },
        {
            dataField: "%TargetTonnes",
            text: `% ${intl.formatMessage({...AppMessages[`kpi_target`]})} ${intl.formatMessage({...AppMessages[`kpi_tonnes`]})}`,
            sort: true,
            align: 'center',
            style: columnStyle,
            formatter: (cell) => {
                if (cell) {
                    return <Typography className={classes.columnStyle}>
                        {new Intl.NumberFormat('pt-BR').format(cell.toFixed(2))}
                    </Typography>
                } else {
                    return cell;
                }
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '5vw'
            },
        },
        {
            dataField: "wos",
            text: "WOS",
            sort: true,
            align: 'center',
            style: columnStyle,
            formatter: (cell) => {
                if (cell) {
                    return <Typography className={classes.columnStyle}>
                        {new Intl.NumberFormat('pt-BR').format(cell.toFixed(2))}
                    </Typography>
                } else {
                    return cell;
                }

            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '4.2vw'
            },
        },
        {
            dataField: "stock",
            text: intl.formatMessage({...messages[`col_header_stock`]}),
            sort: true,
            align: 'center',
            style: columnStyle,
            formatter: (cell) => {
                if (cell) {
                    return <Typography className={classes.columnStyle}>
                        {new Intl.NumberFormat('pt-BR').format(cell.toFixed(2))}
                    </Typography>
                } else {
                    return cell;
                }

            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '4.4vw'
            },
        },
    ];


    const classes = useStyles();

    let tableTitle = intl.formatMessage({...AppMessages[`distributor_view_distributor_table`]});


    const csvProps = {
        fileName: `${tableTitle}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()}_${new Date().getMinutes()}_${new Date().getSeconds()}.csv`,
        separator: ',',
        ignoreHeader: false,
        noAutoBOM: false,
        blobType: 'text/csv;charset=ansi',
    };

    return (

        <div style={{boxSizing: 'border-box', width: '100%', padding: "0vmin"}}>


            <ToolkitProvider
                keyField={name}
                data={data}
                columns={DistributorViewTable}
                exportCSV={csvProps}
            >
                {
                    props => (
                        <Grid container>
                            <Grid container item xs={4} style={{textAlign: 'start'}} justify={"flex-start"}
                                  alignItems={"center"}>
                                <Typography className={classes.title}>
                                    {intl.formatMessage({...messages[`header`]})}
                                </Typography>
                            </Grid>
                            <Grid container item xs={8} justify={"flex-end"} alignItems={"center"}
                                  style={{textAlign: 'end'}}>
                                <TextField
                                    id="input-with-icon-textfield"
                                    onChange={handleSearch}
                                    placeholder={intl.formatMessage({...messages[`search_placeholder`]})}
                                    className={classes.textField}
                                    InputProps={{
                                        classes: {
                                            input: classes.textFieldInput,
                                        },
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon fontSize={"1vw"}/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <ExportCSVButton
                                    {...props.csvProps} className={classes.csvButtonStyle}
                                    data-tut="reactTour-exportAsCSV">
                                    <Tooltip title={intl.formatMessage({...AppMessages[`click_to_download`]})}>
                                        <SystemUpdateAltIcon fontSize={"small"}/>
                                    </Tooltip>
                                </ExportCSVButton>
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
                                    title={intl.formatMessage({...messages[`tooltip_info_text`]})}>
                                    <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                                </Tooltip>
                            </Grid>

                            <Grid item container justify={"center"} style={{overflowX: 'auto', padding: '2vmin'}}>
                                {(() => {
                                    if (!spinnerState && !dataFetchFailed) {
                                        return (
                                            <BootstrapTable
                                                classes='DistributorTable'
                                                bootstrap4
                                                keyField={name}
                                                data={data}
                                                columns={DistributorViewTable}
                                                selectRow={selectRow}
                                                bordered={false}
                                                pagination={paginationFactory(paginationOptions)}
                                                hover
                                                {...props.baseProps}
                                            />
                                        )
                                    } else if (spinnerState) {
                                        return (
                                            <div className={classes.syncLoader}>
                                                <SyncLoader size={15} margin={2} color="#0000a0" loading/>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <NoDataAlert/>

                                        );
                                    }
                                })()}
                            </Grid>

                        </Grid>
                    )
                }
            </ToolkitProvider>

        </div>
    );
}

DistributorTable.propTypes = {};

export default compose(memo, injectIntl)(DistributorTable);
