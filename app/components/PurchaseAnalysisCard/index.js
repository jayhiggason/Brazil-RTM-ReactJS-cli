/**
 *
 * PurchaseAnalysisCard
 *
 */

import React, {memo} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
import Divider from "@material-ui/core/Divider";
import {SyncLoader} from "react-spinners";
import NoDataAlert from "../NoDataAlert";
import {injectIntl} from "react-intl";
import AppMessages from "../../containers/App/messages";
import messages from "./messages";
/** Styles class*/
const useStyles = makeStyles({
    root: {
        width: '16vw',
        padding: 0,
    },
    tooltip: {
        fontSize: '0.8vw',
        fontFamily: 'MarsCentra-Book',
    },
    title: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '0.8vw',
        color: '#0000a0e6',
        padding: '0.5vw',
        textDecoration: 'underline'
    },

    heading: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.8vw',
        color: '#0000a0e6',
        padding: '0.5vw',
    },
    divider: {
        marginLeft: '0.7vw',
        marginRight: '0.7vw',
        backgroundColor: '#000',
        width: '95%'
    },
    Figure: {
        textAlign: "center",
        fontFamily: "MarsCentra-Book",
        fontSize: "16px",
        color: "#0000a0",
    },
    changeDesc: {
        textAlign: "center",
        fontFamily: "MarsCentra-Book",
        margin: "0vmin 1vmin 1vmin 1vmin",
    },
    values: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '0.8vw',
        color: '#0000a0e6',
    },
    currentFigure: {
        textAlign: "center",
        fontFamily: 'MarsCentra-Bold',
        color: '#0000a0',
        fontSize: '25px !important',
        marginTop: "1.5vmin"
    },
    masterPaper: {
        spacing: 2,
        display: "flex",
        justifyContent: "space-between !important",
        alignItems: "space-between",
        textAlign: "center",
        padding: '2vmin',
        marginTop: '1vmin'
    },
    currentYear: {
        textAlign: "center",
        fontFamily: 'MarsCentra-Book',
        color: '#0000a0',
        fontSize: '14px !important',
        height: '2vh',
    },
    subTitle: {
        textAlign: "center",
        fontFamily: 'MarsCentra-Book',
        color: '#0000a0',
        fontSize: '12px !important',
        height: '2vh',
    },
    Trends: {
        textAlign: "right",
        fontFamily: 'MarsCentra-Book',
        color: 'rgb(0,185,145)',
        padding: '2vmin',
    },
    ColorButton: {
        root: {
            color: '#0000a0',
            backgroundColor: '#fff',
            '&:hover': {
                backgroundColor: 'rgb(0,185,145)',
            },
            padding: '5px'
        },
    },
    largeFormControl: {
        minWidth: "12vw",
        maxWidth: "13vw"
    },
    formLabel: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: "0.8vw",
        color: '#0000a0e6',
        letterSpacing: 0,
        borderBottom: 0,
        textAlign: 'center'
    },


});





/** PurchaseAnalysisCard function is used to render the Purchase analysis card component that is used in the Store deep dive view of the tool */

function PurchaseAnalysisCard({
                                  data, bestProductMixData, dataSpinner,
                                  bestMixSpinner,
                                  dataFail,
                                  bestMixFail,
                                  purchaseButtonClick,
                                  purchaseButton,intl
                              }) {
    const classes = useStyles();
    const TotalSalesLabel = ({purchaseButton}) => {
        return(
            <>
                {
                    (()=>{
                        switch (purchaseButton) {
                            case 'GSV':
                                return  intl.formatMessage({...messages[`totSelloutGSV`]});
                            case 'Invoice':
                                return  intl.formatMessage({...messages[`totSelloutInvoice`]});
                            case 'Units':
                                return  intl.formatMessage({...messages[`totSelloutUnits`]});
                            case 'Tonnes':
                                return  intl.formatMessage({...messages[`totSelloutTonnes`]});
                        }
                    })()
                }
            </>)

    };

    return (
        <Grid container
            // style={{paddingBottom:'1vw'}}
        >
            {
                (() => {
                    if (!dataFail) {
                        if (!dataSpinner) {
                            return (
                                <div>
                                    <Grid container>
                                        <Grid item container xs={12} sm={12} md={12} lg={12} style={{padding: "0.6vw"}}>
                                            {/*<Grid item xs={12} sm={12} md={12} lg={12} style={{padding: "2vmin", alignItems:"flex-start"}} alignItems={"flex-start"} >*/}
                                            {/*      <Typography className={classes.title} style={{textAlign:"flex-start"}}>Distributors' Supplying :          TPY - TRANSPORTADORA E DISTRIB PETY LTDA, TPY - TRANSPORTADORA E DISTRIB PETY LTDA </Typography>*/}
                                            {/*</Grid>*/}
                                            <Grid item xs={6} sm={6} md={6} lg={6}/>
                                            <Grid item xs={2} sm={2} md={2} lg={2}
                                                  style={{borderRight: '1px solid #000'}}>
                                                <Typography className={classes.heading}>{intl.formatMessage({...messages[`lastYear`]})}</Typography>
                                            </Grid>
                                            <Grid item xs={2} sm={2} md={2} lg={2}
                                                  style={{borderRight: '1px solid #000'}}>
                                                <Typography className={classes.heading}>{intl.formatMessage({...messages[`currentYear`]})}</Typography>
                                            </Grid>
                                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                                <Typography className={classes.heading}>{intl.formatMessage({...messages[`variance`]})}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider variant='middle' orientation="horizontal" className={classes.divider}/>
                                        <Grid item container xs={12} sm={12} md={12} lg={12} style={{padding: "0.6vw"}}
                                              alignItems={"center"}>
                                            <Grid item container xs={6} sm={6} md={6} lg={6} justify={'flex-start'}
                                                  style={{paddingLeft: '1vw'}}>
                                                <Typography className={classes.title} style={{textAlign: "start"}}>
                                                    {intl.formatMessage({...messages[`clientRepresent`]})}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2} sm={2} md={2} lg={2}
                                                  style={{borderRight: '1px solid #000'}}>
                                                <Typography
                                                    className={classes.values}>{data['percentage_of_tot_sellout_ly'] === null ? "-" : new Intl.NumberFormat('pt-BR').format(data['percentage_of_tot_sellout_ly']) + "%"}</Typography>
                                            </Grid>
                                            <Grid item xs={2} sm={2} md={2} lg={2}
                                                  style={{borderRight: '1px solid #000'}}>
                                                <Typography
                                                    className={classes.values}>{data['percentage_of_tot_sellout_cy'] !== null ? new Intl.NumberFormat('pt-BR').format(data['percentage_of_tot_sellout_cy']) + "%" : "-"}</Typography>
                                            </Grid>
                                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                                <Typography
                                                    className={classes.values}>{data['percentage_of_tot_sellout_growth'] !== null ? new Intl.NumberFormat('pt-BR').format(data['percentage_of_tot_sellout_growth']) : "-"}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider variant='middle' orientation="horizontal" className={classes.divider}/>
                                        <Grid item container xs={12} sm={12} md={12} lg={12} style={{padding: "0.6vw"}}
                                              alignItems={"center"}>
                                            <Grid item container xs={6} sm={6} md={6} lg={6} justify={'flex-start'}
                                                  style={{paddingLeft: '1vw'}}>
                                                <Typography className={classes.title}>
                                                    {intl.formatMessage({...messages[`purchaseFreq`]})}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2} sm={2} md={2} lg={2}
                                                  style={{borderRight: '1px solid #000'}}>
                                                <Typography
                                                    className={classes.values}>{data['average_purchase_frequency_ly'] !== null ? new Intl.NumberFormat('pt-BR').format(data['average_purchase_frequency_ly']) : "-"}</Typography>
                                            </Grid>
                                            <Grid item xs={2} sm={2} md={2} lg={2}
                                                  style={{borderRight: '1px solid #000'}}>
                                                <Typography
                                                    className={classes.values}>{data['average_purchase_frequency_cy'] !== null ? new Intl.NumberFormat('pt-BR').format(data['average_purchase_frequency_cy']) : "-"}</Typography>
                                            </Grid>
                                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                                <Typography
                                                    className={classes.values}>{data['average_purchase_frequency_growth'] !== null ? new Intl.NumberFormat('pt-BR').format(data['average_purchase_frequency_growth']) : "-"}</Typography>
                                            </Grid>

                                        </Grid>
                                        <Divider variant='middle' orientation="horizontal" className={classes.divider}/>
                                        <Grid item container xs={12} sm={12} md={12} lg={12} style={{padding: "0.6vw"}}
                                              alignItems={"center"}>
                                            <Grid item container xs={6} sm={6} md={6} lg={6} justify={'flex-start'}
                                                  style={{paddingLeft: '1vw'}}>
                                                <Typography className={classes.title}>
                                                    {intl.formatMessage({...messages[`purchaseAmt`]})}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2} sm={2} md={2} lg={2}
                                                  style={{borderRight: '1px solid #000'}}>
                                                <Typography
                                                    className={classes.values}> {data['average_purchase_amount_ly'] !== (null || "NA") ?  new Intl.NumberFormat('pt-BR').format(data['average_purchase_amount_ly'].toFixed(2)) : "-"}</Typography>
                                            </Grid>
                                            <Grid item xs={2} sm={2} md={2} lg={2}
                                                  style={{borderRight: '1px solid #000'}}>
                                                <Typography
                                                    className={classes.values}> {data['average_purchase_amount_cy'] !== null ? new Intl.NumberFormat('pt-BR').format(data['average_purchase_amount_cy'].toFixed(2)) : "-"}</Typography>
                                            </Grid>
                                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                                <Typography
                                                    className={classes.values}>{data['average_purchase_amount_growth'] !== null ? new Intl.NumberFormat('pt-BR').format(data['average_purchase_amount_growth']) : "-"}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider variant='middle' orientation="horizontal" className={classes.divider}/>
                                        <Grid item container xs={12} sm={12} md={12} lg={12} style={{padding: "0.6vw"}}>
                                            <Grid item container xs={6} sm={6} md={6} lg={6} justify={'flex-start'}
                                                  style={{paddingLeft: '1vw'}}
                                                  alignItems={"center"}>
                                                <Typography className={classes.title}>
                                                    {intl.formatMessage({...messages[`nextPurchase`]})}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={6} md={6} lg={6} container alignItems={"center"}
                                                  justify={"center"}>
                                                <Typography className={classes.values}>
                                                    {data['next_expected_purchase'] !== null ? data['next_expected_purchase'] : "-" }
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
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
            {
                (() => {
                    if (!bestMixFail) {
                        if (!bestMixSpinner) {
                            return (
                                <div>
                                    <Divider variant='middle' orientation="horizontal" className={classes.divider}/>
                                    <Grid item container xs={12} sm={12} md={12} lg={12} style={{padding: "0.6vw"}}
                                          alignItems={"center"}>
                                        <Grid item container xs={6} sm={6} md={6} lg={6} justify={'flex-start'}
                                              style={{paddingLeft: '1vw'}}>
                                            <Typography className={classes.title}>
                                                {intl.formatMessage({...messages[`bestMix`]})}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6}>
                                            <Tooltip
                                                title={
                                                    <React.Fragment>
                                                        <Typography className={classes.tooltip} >
                                                            {intl.formatMessage({...messages[`commonInvoice`]})}
                                                            : {bestProductMixData['common_invoice'] ? new Intl.NumberFormat('pt-BR').format(bestProductMixData['common_invoice'].toFixed(2)) : bestProductMixData['common_invoice'] } </Typography>
                                                        <Typography className={classes.tooltip}>
                                                            <TotalSalesLabel purchaseButton={purchaseButton}/>
                                                            : {bestProductMixData[`total_sellout_${purchaseButton.toLowerCase()}`] ? new Intl.NumberFormat('pt-BR').format(bestProductMixData[`total_sellout_${purchaseButton.toLowerCase()}`].toFixed(2)) : bestProductMixData[`total_sellout_${purchaseButton.toLowerCase()}`]}</Typography>
                                                    </React.Fragment>
                                                }
                                            >

                                                <Typography className={classes.values}>
                                                    {bestProductMixData['product_1'] + ',' + bestProductMixData['product_2']}
                                                </Typography>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </div>
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
                                            height: '5vh',
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


    );
}

PurchaseAnalysisCard.propTypes = {};

export default memo(injectIntl(PurchaseAnalysisCard));
