/**
 *
 * BrandDeepdiveTable
 *
 */

import React, {memo} from "react";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import {Grid, Tooltip} from "@material-ui/core";
import {SyncLoader} from "react-spinners";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import ToolkitProvider, {CSVExport} from "react-bootstrap-table2-toolkit";
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import FormControl from "@material-ui/core/FormControl";
import {Picky} from "../ReactPickyModified/react-picky";
import history from "../../utils/history";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@mdi/react";
import {mdiPin} from "@mdi/js";
import NoDataAlert from "../NoDataAlert";
import {FormattedMessage,injectIntl} from "react-intl";
import AppMessages from "../../containers/App/messages";
import messages from "./messages";

/** Styles class*/
const useStyles = makeStyles(({

    syncLoader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30vh',
        width: "100%"
    },
    title: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1vw',
        color: '#0000a0e6',
        padding: '1vw',
        margin: '1vmin'
    },
    largeFormControlProduct: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.8vw',
        minWidth: "16.5vw",
        maxWidth: "16.5vw",
        padding: '0.5vmin'
    }, columnStyle: {
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
}));

const {ExportCSVButton} = CSVExport;

const columnStyle = {
    verticalAlign: 'middle',
    fontSize: '0.8vw',
    fontWeight: 'normal',
    fontFamily: 'MarsCentra-Book',
};


/** BrandDeepdiveTable function is used to render the "What sells with this product" table component that is used in brand deep dive page */

function BrandDeepdiveTable({spinnerState, data, skuTableDataFail, tableName, productName, filterChange, filterValue, pinMyView,intl}) {

    const columns = [{
        dataField: 'SKU',
        text: intl.formatMessage({...messages[`product`]} ),
        align: 'left',
        sort: true,
        style: columnStyle,
        headerStyle: {
            width: '7.8vw',
            textAlign: 'center',
            backgroundColor: '#0000a0',
            fontSize: '0.9vw',
            fontFamily: 'MarsCentra-Bold',
            color: '#fff',
            verticalAlign: 'middle',
        },
    },
        {
            dataField: 'PERCENTAGE',
            text: intl.formatMessage( {...messages[`commonInvoice`]} ),
            sort: true,
            style: columnStyle,
            formatter: (cell) => `${new Intl.NumberFormat('pt-BR').format(cell)} %`,
            headerStyle: {
                width: '4vw',
                textAlign: 'center',
                backgroundColor: '#0000a0',
                fontSize: '0.9vw',
                fontFamily: 'MarsCentra-Bold',
                color: '#fff',
                verticalAlign: 'middle',
            }
        }
    ];

    let tableTitle = intl.formatMessage({...AppMessages[`brand_deep_dive_co_related_products`]});
    const classes = useStyles();
    const csvProps = {
        fileName: `${tableTitle}_${productName}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()}_${new Date().getMinutes()}_${new Date().getSeconds()}.csv`,
        separator: ',',
        ignoreHeader: false,
        noAutoBOM: false,
        blobType: 'text/csv;charset=ansi',
    };
    const rowStyle = (row, rowIndex) => {
        const style = {};

        if (rowIndex % 2 === 0) {
            style.textAlign = 'center';
            style.fontSize = '12px';
            style.fontWeight = 'normal';
            style.fontFamily = 'MarsCentra-Book';
            style.lineHeight = '1em';
            style.backgroundColor = "#fff";
        } else {
            style.textAlign = 'center';
            style.fontSize = '12px';
            style.fontWeight = 'normal';
            style.fontFamily = 'MarsCentra-Book';
            style.lineHeight = '1em';
            style.backgroundColor = "#fff";
        }
        return style;
    };

    const handlePinView = () => {
        pinMyView({
            viewName: intl.formatMessage({...AppMessages[`brand_deep_dive_co_related_products`]}),
            viewId: "brand_deep_dive_co_related_products",
            apiEnd: "get_correlated_products",
            filters:
                {
                    product: productName,
                }
        });
    };

    return (
        <div>

            <Grid item container xs={12} sm={12} md={12} lg={12} style={{marginTop: 0, padding: "0 2vmin"}}
                  justify={"center"}>

                <ToolkitProvider
                    keyField={"SKU"}
                    data={data}
                    columns={columns}
                    exportCSV={csvProps}
                >
                    {
                        props => (
                            <Grid container>
                                <Grid container item xs={12}>
                                    <Grid item container xs={8} justify={'flex-start'}>
                                        <Typography className={classes.title}
                                        >{intl.formatMessage({...messages[`header`]})}</Typography>
                                    </Grid>
                                    <Grid item container xs={4} justify={'flex-end'} alignItems={"center"}>
                                        <Tooltip title={<FormattedMessage {...AppMessages[`click_to_download`]} />}>
                                        <ExportCSVButton
                                            {...props.csvProps} className={classes.csvButtonStyle}
                                            data-tut="reactTour-exportAsCSV">
                                            <SystemUpdateAltIcon fontSize={'small'}/>
                                        </ExportCSVButton>
                                        </Tooltip>
                                        {
                                            history.location.pathname !== "/RTM/MyPinnedViews" &&
                                            <Tooltip title={<FormattedMessage {...AppMessages[`pin_the_component`]} />}>
                                                <IconButton size="small" className={classes.pinButton}
                                                            onClick={handlePinView}>
                                                    <Icon
                                                        path={mdiPin} color={"#009c86"}
                                                        size={"1vw"}/>
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    </Grid>

                                </Grid>
                                <Grid item container xs={12} style={{paddingBottom: "0vmin"}} justify={'center'}>
                                    <FormControl className={classes.largeFormControlProduct}>
                                        <Picky
                                            id={"Products/sku"}
                                            options={[intl.formatMessage({...messages[`deselect`]}), ...filterValue]}
                                            multiple={false}
                                            keepOpen={false}
                                            includeFilter
                                            includeSelectAll
                                            value={productName}
                                            onChange={value => filterChange(value)}
                                            allSelectedPlaceholder={productName.length === filterValue.length ? 'All' : "%s selected"}
                                            manySelectedPlaceholder={'%s selected'}
                                            numberDisplayed={2}
                                            clearFilterOnClose={true}
                                            selectAllMode={"filtered"}
                                            placeholder={intl.formatMessage({...messages[`deselect`]})}
                                        />

                                    </FormControl>

                                </Grid>

                                {(() => {
                                    if (!skuTableDataFail) {
                                        if (spinnerState) {
                                            return (
                                                <div className={classes.syncLoader}>
                                                    <SyncLoader size={15} margin={2} color="#0000a0" loading/>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <Grid container xs={12}>
                                                    <BootstrapTable
                                                        keyField='SKU'
                                                        data={data}
                                                        columns={columns}
                                                        noDataIndication={<FormattedMessage {...messages[`noProductSelected`]} />}
                                                        rowStyle={rowStyle}
                                                        classes={'tableValue'}
                                                        bordered={false}
                                                        {...props.baseProps}/>
                                                </Grid>
                                            );
                                        }

                                    } else {
                                        return (
                                            <NoDataAlert/>

                                        )
                                    }
                                })()}
                            </Grid>
                        )
                    }
                </ToolkitProvider>


            </Grid>
        </div>
    );
}

BrandDeepdiveTable.propTypes = {};

export default memo(injectIntl(BrandDeepdiveTable));
