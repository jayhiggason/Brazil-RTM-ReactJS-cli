/**
 *
 * DistributorCard
 *
 */

import React, {memo} from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles, withStyles} from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import {FormattedMessage, injectIntl} from 'react-intl';
import messages from './messages';
import AppMessages from '../../containers/App/messages';

/** Styles class*/
const useStyles = makeStyles({
    title: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1vw',
        color: '#0000a0e6',
        padding: '0.5vw'
    },
    heading: {
        color: '#0000a0',
        fontSize: '1vw',
        textAlign: 'center',
        fontFamily: 'MarsCentra-Bold',
        paddingTop: '2vh',
    },
    Figure: {
        textAlign: "center",
        fontFamily: "MarsCentra-Book",
        fontSize: "12px",
        color: "#0000a0",
    },
    changeDesc: {
        textAlign: "center",
        fontFamily: "MarsCentra-Book",
        margin: "0vmin 1vmin 1vmin 1vmin",
    },
    currentFigure: {
        textAlign: "center",
        fontFamily: 'MarsCentra-Bold',
        color: '#0000a0',
        fontSize: '1vw',
        marginTop: "1.5vmin"
    },
    currentYear: {
        textAlign: "center",
        fontFamily: 'MarsCentra-Bold',
        color: '#0000a0',
        fontSize: '0.8vw',
        height: '2vh',
    },
    subTitle: {
        textAlign: "center",
        fontFamily: 'MarsCentra-Book',
        color: '#0000a0',
        fontSize: '12px !important',
        height: '2vh',
    },
    largeFormControl: {
        minWidth: "12vw",
        maxWidth: "13vw",
        marginRight: "0.4vw"
    },
    formLabel: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: "0.8vw",
        // margin: '0.8vw 0px',
        color: '#0000a0e6',
        letterSpacing: 0,
        borderBottom: 0,
        textAlign: 'center',
    },
});

const AntSwitch = withStyles((theme) =>
    createStyles({
        root: {
            width: 28,
            height: 16,
            padding: 0,
            display: 'flex',
        },
        switchBase: {
            padding: 2,
            color: theme.palette.grey[500],
            '&$checked': {
                transform: 'translateX(12px)',
                color: theme.palette.common.white,
                '& + $track': {
                    opacity: 1,
                    backgroundColor: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                },
            },
        },
        thumb: {
            width: 12,
            height: 12,
            boxShadow: 'none',
        },
        track: {
            border: `1px solid ${theme.palette.grey[500]}`,
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor: theme.palette.common.white,
        },
        checked: {},
    }),
)(Switch);


/** DistributorCard function is reused to render the cards that is used across the tool for the following components -
 * Distributor deep dive - performance cards */

function DistributorCard({
                             data,
                             toggleState,
                             toggleCard, ...props
                         }) {
    const classes = useStyles();
    const {intl} = props;
    const handleGSVToggle = () => {
        toggleCard({...toggleState, invoice: !toggleState['invoice']});
    };
    const handleEOSToggle = () => {
        toggleCard({...toggleState, eos: !toggleState['eos']})
    };
    const currencyValues = ["GSV", "Invoice", "eos_gsv"];
    const cardTargetValues = ['GSV', 'Tonnes', 'Estimate of Sellout'];

    return (
        <Paper elevation={3} style={{width: "100%", height: "100%", padding: "1vw"}}>
            {
                (data.title === 'Estimate of Sellout') && <Grid container style={{height: "100%"}}>
                    <Grid xs={12} container>
                        <Grid xs={6} container alignItems={"center"}>
                            <Typography className={classes.heading}>
                                {/*{data.title}*/}
                                { props.intl.formatMessage({...AppMessages[`kpi_eos`]}) }
                            </Typography>
                        </Grid>
                        <Grid xs={6} container alignItems={"center"}>
                            <Grid container
                                  justify={"center"} alignItems={"center"}>
                                <Grid item container justify={"center"}
                                      className={classes.heading}>{toggleState.eos ? props.intl.formatMessage({...AppMessages[`kpi_tonnes`]}) : props.intl.formatMessage({...AppMessages[`kpi_gsv`]})}</Grid>
                                <Grid item container xs={12}
                                      justify={"center"}>
                                    <AntSwitch checked={toggleState.eos}
                                               onChange={handleEOSToggle}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={12} container alignItems={"center"}>
                        <table style={{width: "100%"}}>
                            <tr>
                                <th/>
                                <th/>
                                <th>
                                    <Typography className={classes.currentYear}>
                                        {props.intl.formatMessage({...AppMessages[`kpi_target`]})}</Typography>
                                </th>
                            </tr>
                            <tr>
                                <td><Typography className={classes.currentYear}>{props.intl.formatMessage({...AppMessages[`cy`]})}</Typography></td>
                                <td>

                                    <Typography className={classes.currentYear}>
                                        {(() => {
                                            if (data['valueCY']) {
                                                let value;
                                                if ((data['valueCY'] >= 1000 && data['valueCY'] < 1000000) || (data['valueCY'] <= -1000 && data['valueCY'] > -1000000)) {
                                                    value = new Intl.NumberFormat('pt-BR').format((data['valueCY'] / 1000).toFixed(2)) + "K";
                                                } else if (data['valueCY'] >= 1000000 || data['valueCY'] <= -1000000) {
                                                    value = new Intl.NumberFormat('pt-BR').format((data['valueCY'] / 1000000).toFixed(2)) + "M";
                                                } else if (data['valueCY'] < 1000 || data['valueCY'] > -1000) {
                                                    value = new Intl.NumberFormat('pt-BR').format(data['valueCY']);
                                                }
                                                if (currencyValues.indexOf(data.kpi) > -1) {
                                                    return <Typography
                                                        className={classes.currentYear}> {` ${value}`}</Typography>
                                                } else {
                                                    return <Typography
                                                        className={classes.currentYear}>{value}</Typography>;
                                                }
                                            }

                                        })()}
                                    </Typography>
                                </td>
                                <td>
                                    <Typography className={classes.currentYear}>
                                        {(() => {
                                            if (cardTargetValues.indexOf(data.title) > -1) {
                                                let value;
                                                if ((data.targetCY >= 1000 && data.targetCY < 1000000) || (data.targetCY <= -1000 && data.targetCY > -1000000)) {
                                                    value = new Intl.NumberFormat('pt-BR').format((data.targetCY / 1000).toFixed(2)) + "K";
                                                } else if (data.targetCY >= 1000000 || data.targetCY <= -1000000) {
                                                    value = new Intl.NumberFormat('pt-BR').format((data.targetCY / 1000000).toFixed(2)) + "M";
                                                } else if (data.targetCY < 1000 || data.targetCY > -1000) {
                                                    value =  new Intl.NumberFormat('pt-BR').format(data.targetCY);
                                                }
                                                if (currencyValues.indexOf(data.kpi) > -1) {
                                                    return <Typography
                                                        className={classes.currentYear}> {` ${value}`}</Typography>
                                                } else {
                                                    return <Typography
                                                        className={classes.currentYear}>{value}</Typography>;
                                                }
                                            } else {
                                                return (
                                                    <Typography style={{color: "#FFF", userSelect: "none"}}
                                                                className={classes.currentYear}>
                                                        &&
                                                    </Typography>
                                                )
                                            }

                                        })()}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography className={classes.currentYear}>{props.intl.formatMessage({...AppMessages[`cp`]})}</Typography>
                                </td>
                                <td><Typography className={classes.currentYear}>
                                    {(() => {
                                        if (data['valueCP']) {
                                            let value;
                                            if ((data['valueCP'] >= 1000 && data['valueCP'] < 1000000) || (data['valueCP'] <= -1000 && data['valueCP'] > -1000000)) {
                                                value = new Intl.NumberFormat('pt-BR').format((data['valueCP'] / 1000).toFixed(2)) + "K";
                                            } else if (data['valueCP'] >= 1000000 || data['valueCP'] <= -1000000) {
                                                value = new Intl.NumberFormat('pt-BR').format((data['valueCP'] / 1000000).toFixed(2)) + "M";
                                            } else if (data['valueCP'] < 1000 || data['valueCP'] > -1000) {
                                                value =  new Intl.NumberFormat('pt-BR').format(data['valueCP']);
                                            }
                                            if (currencyValues.indexOf(data.kpi) > -1) {
                                                return <Typography
                                                    className={classes.currentYear}> {` ${value}`}</Typography>
                                            } else {
                                                return <Typography
                                                    className={classes.currentYear}>{value}</Typography>;
                                            }
                                        }

                                    })()}
                                </Typography></td>
                                <td><Typography className={classes.currentYear}>
                                    {(() => {
                                        if (cardTargetValues.indexOf(data.title) > -1) {
                                            let value;
                                            if ((data.targetCP >= 1000 && data.targetCP < 1000000) || (data.targetCP <= -1000 && data.targetCP > -1000000)) {
                                                value = new Intl.NumberFormat('pt-BR').format((data.targetCP / 1000).toFixed(2)) + "K";
                                            } else if (data.targetCP >= 1000000 || data.targetCP <= -1000000) {
                                                value = new Intl.NumberFormat('pt-BR').format((data.targetCP / 1000000).toFixed(2)) + "M";
                                            } else if (data.targetCP < 1000 || data.targetCP > -1000) {
                                                value =  new Intl.NumberFormat('pt-BR').format(data.targetCP);
                                            }
                                            if (currencyValues.indexOf(data.kpi) > -1) {
                                                return <Typography
                                                    className={classes.currentYear}> {` ${value}`}</Typography>
                                            } else {
                                                return <Typography
                                                    className={classes.currentYear}>{value}</Typography>;
                                            }
                                        } else {
                                            return (
                                                <Typography style={{color: "#FFF", userSelect: "none"}}
                                                            className={classes.currentYear}>
                                                    &&
                                                </Typography>
                                            )
                                        }

                                    })()}
                                </Typography></td>
                            </tr>
                        </table>
                    </Grid>
                </Grid>
            }
            {
                (data.title !== 'Estimate of Sellout') && <Grid container style={{height: "100%"}}>
                    <Grid xs={12} container alignItems={"center"}>
                        <Grid xs={8} container alignItems={"flex-start"} justify={"center"}>
                            {data.title === 'Weeks of Stock' &&
                            <Typography className={classes.heading}>
                                {/*{data.title}*/}
                                { props.intl.formatMessage({...AppMessages[`kpi_${data.kpi}`]})}
                            </Typography>
                            }
                            {
                                (data.title === 'Invoice' || data.title === 'GSV') &&
                                <Grid item container justify={"center"}
                                      alignItems={"center"}>
                                    <Grid item container xs={12}
                                          justify={"center"}
                                          className={classes.heading}>{toggleState.invoice ?  props.intl.formatMessage({...AppMessages[`kpi_${data.kpi}`]}) :   props.intl.formatMessage({...AppMessages[`kpi_${data.kpi}`]})}</Grid>
                                    <Grid item container xs={12}
                                          justify={"center"}>
                                        <AntSwitch checked={toggleState.invoice}
                                                   onChange={handleGSVToggle}/>
                                    </Grid>
                                </Grid>
                            }
                        </Grid>
                        <Grid xs={4} container alignItems={"center"} justify={"center"}>
                            <Grid item xs={12}>
                                <Typography>
                                    {(() => {
                                        let value;
                                        if ((data.valueLY >= 1000 && data.valueLY < 1000000) || (data.valueLY <= -1000 && data.valueLY > -1000000)) {
                                            value = new Intl.NumberFormat('pt-BR').format((data.valueLY / 1000).toFixed(2)) + "K";
                                        } else if (data.valueLY >= 1000000 || data.valueLY <= -1000000) {
                                            value = new Intl.NumberFormat('pt-BR').format((data.valueLY / 1000000).toFixed(2)) + "M";
                                        } else if (data.valueLY < 1000 || data.valueLY > -1000) {
                                            value =  new Intl.NumberFormat('pt-BR').format(data.valueLY);
                                        }
                                        if (currencyValues.indexOf(data.title) > -1) {
                                            return <Typography
                                                className={classes.currentYear}>{` ${value}`}</Typography>;
                                        } else {
                                            return <Typography
                                                className={classes.currentYear}>{value}</Typography>;
                                        }
                                    })()}
                                </Typography>

                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={classes.currentYear}>{props.intl.formatMessage({...AppMessages[`ly`]})}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={12} container alignItems={"center"}>
                        <Grid xs={8} container alignItems={"flex-start"} justify={"center"}>
                            <Typography className={classes.currentFigure}>
                                {(() => {

                                    let value;
                                    if ((data.valueTY >= 1000 && data.valueTY < 1000000) || (data.valueTY <= -1000 && data.valueTY > -1000000)) {
                                        value = new Intl.NumberFormat('pt-BR').format((data.valueTY / 1000).toFixed(2)) + "K";
                                    } else if (data.valueTY >= 1000000 || data.valueTY <= -1000000) {
                                        value = new Intl.NumberFormat('pt-BR').format((data.valueTY / 1000000).toFixed(2)) + "M";
                                    } else if (data.valueTY < 1000 || data.valueTY > -1000) {
                                        value =  new Intl.NumberFormat('pt-BR').format(data.valueTY);
                                    }
                                    if (currencyValues.indexOf(data.title) > -1) {
                                        return ` ${value}`;
                                    } else {
                                        return value;
                                    }
                                })()}
                            </Typography>
                        </Grid>
                        <Grid xs={4} container alignItems={"center"} justify={"center"}>
                            <Grid item xs={12}>
                                {(() => {
                                    if (data.hasOwnProperty('change') && cardTargetValues.indexOf(data.title) > -1) {

                                        let value;
                                        if ((data.change >= 1000 && data.change < 1000000) || (data.change <= -1000 && data.change > -1000000)) {
                                            value = new Intl.NumberFormat('pt-BR').format((data.change / 1000).toFixed(2)) + "K";
                                        } else if (data.change >= 1000000 || data.change <= -1000000) {
                                            value = new Intl.NumberFormat('pt-BR').format((data.change / 1000000).toFixed(2)) + "M";
                                        } else if (data.change < 1000 || data.change > -1000) {
                                            value =  new Intl.NumberFormat('pt-BR').format(data.change);
                                        }
                                        if (currencyValues.indexOf(data.title) > -1) {
                                            return <Typography
                                                className={classes.currentYear}> {` ${value}`}</Typography>
                                        } else {
                                            return <Typography
                                                className={classes.currentYear}>{value}</Typography>;
                                        }
                                    } else {
                                        return (
                                            <Typography style={{color: "#FFF", userSelect: "none"}}
                                                        className={classes.currentYear}>
                                                &&
                                            </Typography>
                                        )
                                    }

                                })()}
                            </Grid>
                            <Grid item xs={12}>
                                {(() => {
                                    if (data.hasOwnProperty('change') && cardTargetValues.indexOf(data.title) > -1) {
                                        return (
                                            <Typography className={classes.currentYear}>
                                                { props.intl.formatMessage({...AppMessages[`kpi_target`]})}</Typography>
                                        )
                                    } else {
                                        return (
                                            <Typography style={{color: "#FFF", userSelect: "none"}}
                                                        className={classes.currentYear}>
                                                &&
                                            </Typography>
                                        )
                                    }
                                })()}
                            </Grid>


                        </Grid>
                    </Grid>
                </Grid>
            }

        </Paper>
    );
}

DistributorCard.propTypes = {};

export default memo(injectIntl(DistributorCard));
