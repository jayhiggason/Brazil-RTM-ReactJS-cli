/**
 *
 * StoreViewTable
 *
 */

import React, {memo} from "react";
import StoreLineChart from "../StoreLineChart";
import './StoreViewTable.css';
import makeStyles from "@material-ui/core/styles/makeStyles";
import ToolkitProvider, {CSVExport} from "react-bootstrap-table2-toolkit";
import Grid from "@material-ui/core/Grid";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {paginationOptions} from "../../utils/paginationOptions";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import history from "../../utils/history";
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import Typography from "@material-ui/core/Typography";
import {SyncLoader} from "react-spinners";
import NoDataAlert from "../NoDataAlert";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {FormControl, Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@mdi/react";
import {mdiPin} from "@mdi/js";
import clsx from "clsx";
import InfoIcon from "@material-ui/icons/Info";
import {FormattedMessage, injectIntl} from "react-intl";
import AppMessages from "../../containers/App/messages";
import messages from "./messages";
/** Styles class*/
const useStyles = makeStyles((theme) => ({

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

    formControl: {
        margin: '1vmin',
        minWidth: '4vw',
        fontSize: '0.8vw',
        fontFamily: 'MarsCentra-Book',
        color: 'rgb(0,215,185)',
        // paddingRight:'0.5vw'
    },
    filterItems: {
        fontSize: '0.95vw',
        fontFamily: 'MarsCentra-Book',
    },
    columnStyle: {
        fontSize: '0.8vw',
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
    zoomIcon: {
        color: 'rgb(0,215,185)',
        cursor: 'pointer',
        borderRadius: "1vmin",
        borderColor: '#000'
    },
    menuItem: {
        fontFamily: "MarsCentra-Book",
        fontSize: "0.7vw",
    },
    storeTrendButtons: {
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
    storeTrendButtonActive: {
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

/** StoreViewTable function is used to render the "Trend across Stores' " table component that is used in store view page */

function StoreViewTable({
                            data,
                            spinnerState, storeTableDataFail, selectedFilter, onFilterChange,
                            openTopFilter,
                            onCloseTopFilter,
                            onOpenTopFilter,
                            topFilterValue,
                            onChangeTopFilter,
                            handlePinView,
                            onStoreButtonChange,
                            storeButton, intl
                        }) {

    const [openDialog, setOpenDialog] = React.useState(false);
    const [dialogData, setDialogData] = React.useState({series: [], data: [], title: []});
    const handleOpenTrendDialog = () => {

        setOpenDialog(true);
    };

    const handleCloseTrendDialog = () => {
        setOpenDialog(false)
    };
    const handleClose = () => {
        setOpenDialog(false);
    };

    const columnStylePerformance = {
        verticalAlign: 'middle',
        fontSize: '0.8vw',
        fontWeight: 'normal',
        fontFamily: 'MarsCentra-Book',
        padding: '0vw'
    };

    const columnHeaderStyle = {
        verticalAlign: 'middle',
        textAlign: 'center',
        backgroundColor: '#0000a0',
        fontSize: '0.9vw',
        fontFamily: 'MarsCentra-Bold',
        color: '#fff',
    };

    const valueFormatterSalesStrike = (cell, row) => {
        return (
            <Grid container direction={"row"} justify="center">
                <Grid item>
                    <div style={{height: '7vh', width: '7vw'}}>
                        <StoreLineChart series={row['periodtrend'][0]['series']} data={row['periodtrend'][0]}
                                        title={"Small"}
                        />


                    </div>
                </Grid>

            </Grid>
        )
    };

    const buttonFormatterSalesStrike = (cell, row) => {
        return (
            <div className={classes.buttonRoot} align={'center'}>
                <ZoomOutMapIcon fontSize={'small'} onClick={() => {
                    handleOpenTrendDialog();
                    setDialogData({
                        series: row['periodtrend'][0]['series'],
                        data: row['periodtrend'][0],
                        title: row['store']
                    });
                }}/>
                {/*</Tooltip>*/}
            </div>
        )
    };

    const StoreViewTable = [
        {
            dataField: 'store',
            text: intl.formatMessage({...AppMessages[`store`]}),
            sort: true,
            align: 'left',
            style: columnStylePerformance,
            // formatter : cellFormatter,
            // formatter : (cell, row) => {
            //
            //     return (
            //     <Tooltip title={`${intl.formatMessage({...AppMessages[`distributor`]})} : ${cell}` } >
            //         <Typography className={classes.columnStyle}>
            //         {cell}
            //     </Typography>
            //     </Tooltip>
            //     );
            // },
            headerStyle: {
                ...columnHeaderStyle,
                width: '8vw',
            },
            events: {
                onClick: (e, column, columnIndex, row) => {
                    let storeName = row['store'];
                    history.push(`/RTM/StoreDeepDive?${storeName}`);
                    onFilterChange({
                        ...selectedFilter,
                        'store': [...selectedFilter['store'], {label: storeName, value: storeName}]
                    });
                }
            }

        },
        {
            dataField: 'periodtrend',
            text: intl.formatMessage({...messages[`periodicTrend`]}),
            sort: true,
            align: 'center',
            style: columnStylePerformance,
            formatter: valueFormatterSalesStrike,
            csvExport: false,
            headerStyle: {
                ...columnHeaderStyle,
                width: '9vw',
            },
        },
        {
            dataField: 'periodtrend',
            text: '',
            align: 'center',
            style: columnStylePerformance,
            formatter: buttonFormatterSalesStrike,
            csvExport: false,
            headerStyle: {
                ...columnHeaderStyle,
                width: '3vw',
            },
        },
        {
            dataField: 'Invoice',
            text: `${intl.formatMessage({...messages[`sales`]})}(${intl.formatMessage({...AppMessages[`kpi_invoice`]})})`,
            sort: true,
            align: 'center',
            style: columnStylePerformance,
            hidden: storeButton !== 'Invoice',
            csvExport: storeButton === 'Invoice',
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
                width: '6.5vw',
            },
        },
        {
            dataField: 'Units',
            text: `${intl.formatMessage({...messages[`sales`]})}(${intl.formatMessage({...AppMessages[`kpi_units`]})})`,
            sort: true,
            align: 'center',
            style: columnStylePerformance,
            hidden: storeButton !== 'Units',
            csvExport: storeButton === 'Units',
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
                width: '6.5vw',
            },
        },
        {
            dataField: 'GSV',
            text: `${intl.formatMessage({...messages[`sales`]})}(${intl.formatMessage({...AppMessages[`kpi_gsv`]})})`,
            sort: true,
            align: 'center',
            style: columnStylePerformance,
            hidden: storeButton !== 'GSV',
            csvExport: storeButton === 'GSV',
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
                width: '6.5vw',
            },
        },
        {
            dataField: 'Tonnes',
            text: `${intl.formatMessage({...messages[`sales`]})}(${intl.formatMessage({...AppMessages[`kpi_tonnes`]})})`,
            sort: true,
            align: 'center',
            style: columnStylePerformance,
            hidden: storeButton !== 'Tonnes',
            csvExport: storeButton === 'Tonnes',
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
                width: '6.5vw',
            },
        },
    ];

    const classes = useStyles();

    let tableTitle = intl.formatMessage({...AppMessages[`store_view_trend_table`]});

    const csvProps = {
        fileName: `${tableTitle}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()}_${new Date().getMinutes()}_${new Date().getSeconds()}.csv`,
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
            style.lineHeight = '4vh';
            style.backgroundColor = "#fff";
        }
        return style;
    };
    return (

        <Grid style={{
            overflowX: 'auto',
            padding: "0vmin"
        }}>

            <ToolkitProvider
                keyField={"StoreViewTable"}
                data={data}
                columns={StoreViewTable}
                exportCSV={csvProps}
            >
                {
                    props => (
                        <Grid container xs={12} sm={12} md={12} lg={12}>
                            <Grid item xs={6} sm={6} md={6} lg={6} style={{textAlign: "start"}}>
                                <Typography className={classes.title}>{intl.formatMessage({...messages[`header`]})}</Typography>
                            </Grid>
                            <Grid item container xs={6} sm={6} md={6} lg={6} style={{textAlign: "end"}}
                                  alignItems={"center"} justify={"flex-end"}
                                  id={"store-trend-table-filter"}>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        labelId="store-filter"
                                        id="demo-controlled-open-select"
                                        open={openTopFilter}
                                        onClose={onCloseTopFilter}
                                        onOpen={onOpenTopFilter}
                                        value={topFilterValue}
                                        onChange={onChangeTopFilter}
                                        className={classes.menuItem}
                                    >
                                        <MenuItem value={"Top 10"} className={classes.menuItem}>{intl.formatMessage({...AppMessages[`top_ten`]})}</MenuItem>
                                        <MenuItem value={"Bottom 10"} className={classes.menuItem}>{intl.formatMessage({...AppMessages[`bottom_ten`]})}</MenuItem>
                                    </Select>
                                </FormControl>
                                <Tooltip title={intl.formatMessage({...AppMessages[`click_to_download`]})}>
                                    <ExportCSVButton size={"small"}
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
                                    title={intl.formatMessage({...messages[`headerTooltipText`]})}>
                                    <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                                </Tooltip>
                            </Grid>
                            <Grid item container xs={12} md={12} sm={12} lg={12}
                                  style={{textAlign: "end", paddingRight: '1vw'}}
                                  alignItems={"center"} justify={"flex-end"}>
                                <Button
                                    onClick={() => onStoreButtonChange('Invoice')}
                                    className={clsx({
                                        [classes.storeTrendButtons]: storeButton !== 'Invoice',
                                        [classes.storeTrendButtonActive]: storeButton === 'Invoice'
                                    })}>{intl.formatMessage({...AppMessages[`kpi_invoice`]})}</Button>
                                <Button
                                    onClick={() => onStoreButtonChange('GSV')}
                                    className={clsx({
                                        [classes.storeTrendButtons]: storeButton !== 'GSV',
                                        [classes.storeTrendButtonActive]: storeButton === 'GSV'
                                    })}>{intl.formatMessage({...AppMessages[`kpi_gsv`]})}</Button>
                                <Button
                                    onClick={() => onStoreButtonChange('Units')}
                                    className={clsx({
                                        [classes.storeTrendButtons]: storeButton !== 'Units',
                                        [classes.storeTrendButtonActive]: storeButton === 'Units'
                                    })}>{intl.formatMessage({...AppMessages[`kpi_units`]})}</Button>
                                <Button
                                    onClick={() => onStoreButtonChange('Tonnes')}
                                    className={clsx({
                                        [classes.storeTrendButtons]: storeButton !== 'Tonnes',
                                        [classes.storeTrendButtonActive]: storeButton === 'Tonnes'
                                    })}>{intl.formatMessage({...AppMessages[`kpi_tonnes`]})}</Button>
                            </Grid>
                            < Grid item container justify={"center"} style={{padding: '2vmin'}}>
                                {(() => {
                                    if (!spinnerState && !storeTableDataFail) {
                                        return (
                                            <div style={{
                                                height: '60vh',
                                                overflowY: 'auto'
                                            }}>
                                                <BootstrapTable
                                                    keyField={"StoreViewTable"}
                                                    data={data}
                                                    columns={StoreViewTable}
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
                    )
                }
            </ToolkitProvider>

            <Dialog
                className={classes.dialog}
                open={openDialog}
                onClose={() => handleCloseTrendDialog()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullScreen

            >
                <Grid container justify={"center"} alignItems={"center"} style={{padding: "1vw"}}>
                    <Grid container justify={"center"} alignItems={"center"} item xs={12}>
                        <Grid item xs={9}>
                            <Typography className={classes.title} style={{padding: '1vmin'}}>{intl.formatMessage({...messages[`periodicSalesTrend`]})}
                                ({dialogData['title']})</Typography>
                        </Grid>
                        <Grid container item xs={3} justify={"flex-end"}>

                            <IconButton id="seleniumProductLevelRiskTableCloseIconButton"
                                        onClick={() => {
                                            handleClose()
                                        }}
                                        style={{outline: 'none'}}>
                                <CloseIcon id="seleniumProductLevelRiskTableCloseIcon"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{padding: "1vmin"}}>
                        <div style={{height: '51vh'}}>
                            <StoreLineChart series={dialogData['series']} data={dialogData['data']} title={"Zoom"}
                                            selectedButton={storeButton} titleName={dialogData['title']}
                            />
                        </div>
                    </Grid>
                </Grid>

            </Dialog>

        </Grid>


    );
}

StoreViewTable.propTypes = {};

export default memo(injectIntl(StoreViewTable));
