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
import './PocTable.css';
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
const data =[ {distributor: "AGS", POS: 1274, units: 70623},
    {distributor: "Alex", POS: 144, units: 703}
,
    {distributor: "Ben", POS: 23, units: 70}
,
    {distributor: "Ray", POS: 444, units: 73}
,
    {distributor: "BCG", POS: 56, units: 45}
        ,
    {distributor: "Samuel", POS: 344, units: 67}
,
    {distributor: "Richard", POS: 45654, units: 343}
,
    {distributor: "Chad", POS: 554, units: 75}
,
    {distributor: "MFH", POS: 45, units: 233}
,
    {distributor: "WDA", POS: 174, units: 4556}
,
    {distributor: "Derick", POS: 19, units: 456}
,
    {distributor: "Jack", POS: 14, units: 54}
,
    {distributor: "UHF", POS: 12344, units: 34}
,
    {distributor: "SZS", POS: 124, units: 623}


]
function PocTable({

                      name ="Distributor"
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
            text: "Distributor",
            sort: true,
            align: 'left',
            style: {
                ...columnStyle,
                textDecorationColor: 'blue',
                cursor: "pointer"
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '5.8vw',
            },

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
            dataField: "units",
            text: "Units",
            sort: true,
            align: 'center',
            style: columnStyle,
            formatter: (cell) => {
                return <Typography className={classes.columnStyle}>
                    {new Intl.NumberFormat('en-US').format(cell.toFixed(2))}
                </Typography>
            },
            headerStyle: {
                ...columnHeaderStyle,
                width: '6vw'
            },

        },

    ];


    const classes = useStyles();

    let tableTitle = "Distributors Details";


    // const csvProps = {
    //     fileName: `${tableTitle}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()}_${new Date().getMinutes()}_${new Date().getSeconds()}.csv`,
    //     separator: ',',
    //     ignoreHeader: false,
    //     noAutoBOM: false,
    //     blobType: 'text/csv;charset=ansi',
    // };

    return (

        <div style={{boxSizing: 'border-box', width: '100%', padding: "0vmin"}}>


            <ToolkitProvider
                keyField={name}
                data={data}
                columns={DistributorViewTable}
                // exportCSV={csvProps}
            >
                {
                    props => (
                        <Grid container>
                            <Grid container item xs={4} style={{textAlign: 'start'}} justify={"flex-start"}
                                  alignItems={"center"}>
                                <Typography className={classes.title}>Distributors' Table</Typography>
                            </Grid>
                            {/*<Grid container item xs={8} justify={"flex-end"} alignItems={"center"}*/}
                            {/*      style={{textAlign: 'end'}}>*/}
                            {/*    <TextField*/}
                            {/*        id="input-with-icon-textfield"*/}
                            {/*        onChange={handleSearch}*/}
                            {/*        placeholder="Search Distributor"*/}
                            {/*        className={classes.textField}*/}
                            {/*        InputProps={{*/}
                            {/*            classes: {*/}
                            {/*                input: classes.textFieldInput,*/}
                            {/*            },*/}
                            {/*            startAdornment: (*/}
                            {/*                <InputAdornment position="start">*/}
                            {/*                    <SearchIcon fontSize={"1vw"}/>*/}
                            {/*                </InputAdornment>*/}
                            {/*            ),*/}
                            {/*        }}*/}
                            {/*    />*/}
                            {/*    <Tooltip title={"Click to Download"}>*/}
                            {/*        <ExportCSVButton*/}
                            {/*            {...props.csvProps} className={classes.csvButtonStyle}*/}
                            {/*            data-tut="reactTour-exportAsCSV">*/}
                            {/*            <SystemUpdateAltIcon fontSize={"small"}/>*/}
                            {/*        </ExportCSVButton>*/}
                            {/*    </Tooltip>*/}

                            {/*    {*/}
                            {/*        history.location.pathname !== "/RTM/MyPinnedViews" &&*/}
                            {/*        <Tooltip title={"Pin the component"}>*/}
                            {/*            <IconButton size="small" className={classes.pinButton} onClick={handlePinView}>*/}
                            {/*                <Icon*/}
                            {/*                    path={mdiPin}*/}
                            {/*                    size={"1vw"}/>*/}
                            {/*            </IconButton>*/}
                            {/*        </Tooltip>*/}
                            {/*    }*/}

                            {/*    <Tooltip*/}
                            {/*        title={"Click on the Distributor name to navigate to the respective Distributor deep dive"}>*/}
                            {/*        <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>*/}
                            {/*    </Tooltip>*/}
                            {/*</Grid>*/}

                            <Grid item container justify={"center"} style={{overflowX: 'auto', padding: '2vmin'}}>

                                            <BootstrapTable
                                                classes='DistributorTable'
                                                bootstrap4
                                                keyField={name}
                                                data={data}
                                                columns={DistributorViewTable}
                                                // selectRow={selectRow}
                                                bordered={false}
                                                pagination={paginationFactory(paginationOptions)}
                                                striped
                                                hover
                                                {...props.baseProps}
                                            />
                                {/*        )*/}
                                {/*    } else if (spinnerState) {*/}
                                {/*        return (*/}
                                {/*            <div className={classes.syncLoader}>*/}
                                {/*                <SyncLoader size={15} margin={2} color="#0000a0" loading/>*/}
                                {/*            </div>*/}
                                {/*        );*/}
                                {/*    } else {*/}
                                {/*        return (*/}
                                {/*            <NoDataAlert/>*/}

                                {/*        );*/}
                                {/*    }*/}
                                {/*})()}*/}
                            </Grid>

                        </Grid>
                    )
                }
            </ToolkitProvider>

        </div>
    );
}



PocTable.propTypes = {};

export default memo(PocTable);
