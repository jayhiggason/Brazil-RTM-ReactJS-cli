/**
 *
 * CardsRTM
 *
 */
import React, {memo} from "react";
import {createStyles, makeStyles, withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import {SyncLoader} from "react-spinners";
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import PerformanceLineApex from "../PerformanceLineApex";
import {FormControl, FormLabel} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import 'react-picky/dist/picky.css';
import OverLaySpinner from "../OverLaySpinner";
import history from "../../utils/history";
import ReactPickyModified from "../ReactPickyModified";
import './style.css';
import {FormattedMessage, injectIntl} from 'react-intl';
import messages from './messages';
import AppMessages from '../../containers/App/messages';

/** Styles class*/
const useStyles = makeStyles({
    root: {
        width: '17vw',
        padding: 0,
        height: "100%"
    },
    title: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1vw',
        color: '#0000a0e6',
        padding: '0.5vw'
    },
    dialog: {
        height: '100vh',
        overflowY: "auto",
        margin: "2vw"
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
        minWidth: "14vw",
        maxWidth: "14vw",
        marginRight: "1vw"
    },
    formLabel: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: "0.8vw",
        color: '#0000a0e6',
        letterSpacing: 0,
        borderBottom: 0,
        textAlign: 'center',
        paddingRight: '2vw'

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

/** CardsRTM function is reused to render the cards that is used across the tool for the following components -
 * Performance summary - performance cards
 * Brand deep dive - performance cards */

function CardsRTM({
                      data, toggleCard, toggleState,
                      categoryKpiOnChange,
                      categoryFilterOnChange,
                      trendLineFetch,
                      // categoryKpiList,
                      selectedCategoryKpi,
                      categoryFilterFetchSpinner,
                      categoryFilterFetchFailed,
                      categorySelectedFilterData,
                      categoryFilterData,
                      trendLineData,
                      trendLineSpinner,
                      trendLineDataFetchFailed, pageTitle,
                      ...props
                  }) {
    const classes = useStyles();
    const {intl} = props;
    const [openDialog, setOpenDialog] = React.useState(false);
    const [kpi, setKpi] = React.useState('');
    const handleOpenTrendDialog = (kpi_name) => {
        categoryKpiOnChange('brand');
        setKpi(kpi_name);
        trendLineFetch(kpi_name);
        setOpenDialog(true);
    };
    const handleCloseTrendDialog = () => {
        setOpenDialog(false)
    };
    const handleCategoryKPIChange = (value) => {
        categoryKpiOnChange(value.value);
        trendLineFetch(kpi);
    };
    const handleCategoryOnChange = (value) => {
        categoryFilterOnChange(value);
        trendLineFetch(kpi);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleGSVToggle = () => {
        toggleCard({...toggleState, invoice: !toggleState['invoice']});
    };

    const handleUnitToggle = () => {
        toggleCard({...toggleState, units: !toggleState['units']})
    };
    const titleCard = data.title;
    const cardTargetValues = ['GSV', 'Tonnes'];
    const currencyValues = ["GSV", "Invoice"];
    const categoryList = [
        {label: intl.formatMessage({...AppMessages[`brand`]}), value: "brand"},
        {label: intl.formatMessage({...AppMessages[`category`]}), value: "category"},
        {label: intl.formatMessage({...AppMessages[`distributor`]}), value: "distributor"}
    ];
    return (
        <Grid item xs={12} sm={12} md={12} lg={12} style={{height: "100%"}}>
            <Card className={classes.root}>
                <CardContent style={{padding: '0.1vw', height: "100%"}}>
                    <div style={{height: "100%"}}>
                        <Grid container justify={"flex-start"} alignItems={"space-between"} style={{height: "100%"}}>
                            <Grid item xs={6}>
                                <Grid item xs={12} container>
                                    <Grid item container justify="flex-start" xs={12} sm={12} md={12} lg={12}
                                          style={{paddingLeft: "1.7vmin"}}>
                                        {titleCard === 'Invoice' || titleCard === 'Units' || titleCard === 'Tonnes' || titleCard === 'GSV' ? null :
                                            <Typography className={classes.heading}>
                                                {/*{data.title}*/}
                                                {intl.formatMessage({...AppMessages[`kpi_${data.kpi}`]})}

                                            </Typography>}
                                    </Grid>
                                    {titleCard === 'Invoice' || titleCard === 'GSV' ?
                                        <Grid item container justify="center" xs={12} sm={12} md={12} lg={12}
                                              style={{paddingLeft: "1.7vmin"}}>
                                            <Grid component="label" container spacing={1} style={{paddingTop: "2vmin"}}>
                                                <Grid item
                                                      className={classes.heading}>{toggleState.invoice ?
                                                    intl.formatMessage({...AppMessages[`kpi_invoice`]}) :
                                                    intl.formatMessage({...AppMessages[`kpi_gsv`]})}</Grid>
                                                <Grid item>
                                                    <AntSwitch checked={toggleState.invoice}
                                                               onChange={handleGSVToggle}/>
                                                </Grid>
                                            </Grid>

                                        </Grid> : null
                                    }
                                    {titleCard === 'Units' || titleCard === 'Tonnes' ?
                                        <Grid item container justify="center" xs={12} sm={12} md={12} lg={12}
                                              style={{paddingLeft: "1.7vmin"}}>
                                            <Grid component="label" container spacing={1} style={{paddingTop: "2vmin"}}>
                                                <Grid item
                                                      className={classes.heading}>{toggleState.units ?
                                                    intl.formatMessage({...AppMessages[`kpi_units`]}):
                                                    intl.formatMessage({...AppMessages[`kpi_tonnes`]})}</Grid>
                                                <Grid item>
                                                    <AntSwitch checked={toggleState.units} onChange={handleUnitToggle}/>
                                                </Grid>
                                            </Grid>

                                        </Grid> : null
                                    }

                                </Grid>

                                <Grid item xs={12} container style={{paddingLeft: "1.7vmin"}} justify={"flex-end"}>
                                    <Typography className={classes.currentFigure}>
                                        {(() => {
                                            let value;
                                            if ((data.valueTY >= 1000 && data.valueTY < 1000000) || (data.valueTY <= -1000 && data.valueTY > -1000000)) {
                                                value = new Intl.NumberFormat('pt-BR').format((data.valueTY / 1000).toFixed(2)) + "K";
                                            } else if (data.valueTY >= 1000000 || data.valueTY <= -1000000) {
                                                value = new Intl.NumberFormat('pt-BR').format((data.valueTY / 1000000).toFixed(2)) + "M";
                                            } else if (data.valueTY < 1000 || data.valueTY > -1000) {
                                                value = new Intl.NumberFormat('pt-BR').format(data.valueTY);
                                            }
                                            if (currencyValues.indexOf(titleCard) > -1) {
                                                return ` ${value}`;
                                            } else {
                                                return value;
                                            }
                                        })()}
                                    </Typography>
                                </Grid>

                            </Grid>
                            <Grid item xs={6} style={{paddingTop: "2vmin"}} container>
                                <Grid item xs={12}>
                                    <Typography className="kpiDesc">

                                        <div className={classes.Figure}>
                                            {(() => {
                                                if (data.hasOwnProperty('valueLY')) {
                                                    return (
                                                        <Typography>
                                                            {(() => {
                                                                let value;
                                                                if ((data.valueLY >= 1000 && data.valueLY < 1000000) || (data.valueLY <= -1000 && data.valueLY > -1000000)) {
                                                                    value = new Intl.NumberFormat('pt-BR').format((data.valueLY / 1000).toFixed(2)) + "K";
                                                                } else if (data.valueLY >= 1000000 || data.valueLY <= -1000000) {
                                                                    value = new Intl.NumberFormat('pt-BR').format((data.valueLY / 1000000).toFixed(2)) + "M";
                                                                } else if (data.valueLY < 1000 || data.valueLY > -1000) {
                                                                    value = new Intl.NumberFormat('pt-BR').format(data.valueLY);
                                                                }
                                                                // let value = data.valueLY > 1000000 ? new Intl.NumberFormat('pt-BR').format((data.valueLY / 1000000).toFixed(2)) + "M" : new Intl.NumberFormat('pt-BR').format(data.valueLY.toFixed(2));
                                                                if (currencyValues.indexOf(titleCard) > -1) {
                                                                    return <Typography
                                                                        className={classes.currentYear}>{` ${value}`}</Typography>;
                                                                } else {
                                                                    return <Typography
                                                                        className={classes.currentYear}>{value}</Typography>;
                                                                }
                                                            })()}
                                                        </Typography>
                                                    )
                                                }
                                            })()}
                                        </div>

                                        <div className={classes.changeDesc}>
                                            {(() => {
                                                if (data.hasOwnProperty('valueLY')) {
                                                    return (
                                                        <Typography className={classes.currentYear}>{intl.formatMessage({...AppMessages[`ly`]})}</Typography>
                                                    )
                                                }
                                            })()}
                                        </div>

                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography style={{marginTop: "1vw"}}>
                                        <div className={classes.Figure}>
                                            {(() => {
                                                if (data.hasOwnProperty('change') && cardTargetValues.indexOf(titleCard) > -1) {
                                                    let value;
                                                    if ((data.change >= 1000 && data.change < 1000000) || (data.change <= -1000 && data.change > -1000000)) {
                                                        value = new Intl.NumberFormat('pt-BR').format((data.change / 1000).toFixed(2)) + "K";
                                                    } else if (data.change >= 1000000 || data.change <= -1000000) {
                                                        value = new Intl.NumberFormat('pt-BR').format((data.change / 1000000).toFixed(2)) + "M";
                                                    } else if (data.change < 1000 || data.change > -1000) {
                                                        value = new Intl.NumberFormat('pt-BR').format(data.change);
                                                    }
                                                    if (currencyValues.indexOf(titleCard) > -1) {
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
                                        </div>

                                        <div className={classes.currentYear}>
                                            {(() => {
                                                if (data.hasOwnProperty('change') && cardTargetValues.indexOf(titleCard) > -1) {
                                                    return (
                                                        <Typography className={classes.currentYear}>
                                                          {  intl.formatMessage({...AppMessages[`kpi_target`]})}
                                                        </Typography>
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
                                        </div>

                                    </Typography>
                                </Grid>
                            </Grid>
                            {
                                history.location.pathname !== `/RTM/DistributorDeepDive` &&
                                <Grid item xs={12} container justify={"flex-start"} style={{marginTop: "0.5vw"}}>
                                    {(() => {
                                        if (history.location.pathname === `/RTM/DistributorDeepDive` || history.location.pathname === "/RTM/MyPinnedViews") {
                                            return (
                                                <Button variant='text' size="small"
                                                        style={{color: "rgb(255,255,255)"}}
                                                        disabled
                                                />
                                            )

                                        } else {
                                            return (

                                                <Button variant='text' size="small"
                                                        style={{
                                                            fontFamily: "MarsCentra-Bold",
                                                            textTransform: 'none',
                                                            color: "rgb(0, 215, 185)",
                                                            fontSize: "0.8vw",
                                                        }} onClick={() => {
                                                    handleOpenTrendDialog(data.kpi)
                                                }}
                                                >
                                                    { intl.formatMessage({...messages[`see_trends`]})}
                                                </Button>
                                            )
                                        }


                                    })()}
                                </Grid>
                            }

                        </Grid>

                    </div>
                </CardContent>
            </Card>
            <Dialog
                className={classes.dialog}
                open={openDialog}
                onClose={() => handleCloseTrendDialog()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullScreen
            >
                <Grid conatiner justify={"center"} alignItems={"center"} style={{padding: "1vw"}}>
                    <Grid container justify={"center"} alignItems={"center"} item xs={12}>
                        <Grid item xs={4}>
                            <Typography className={classes.title}>
                                <FormattedMessage {...messages[`see_trends`]} />
                                (<FormattedMessage {...AppMessages[`kpi_${kpi}`]} />) </Typography>
                        </Grid>
                        <Grid container item xs={8} justify={"flex-end"}>
                            <FormControl className={classes.largeFormControl}>
                                <FormLabel component="legend"
                                           className={classes.formLabel}>
                                    <FormattedMessage {...messages[`trends_select_filter`]} />
                                </FormLabel>
                                <ReactPickyModified
                                    id={"categoryKPI"}
                                    valueKey="value"
                                    labelKey="label"
                                    options={categoryList}
                                    includeFilter
                                    clearFilterOnClose={true}
                                    value={categoryList.filter(i => i.value === selectedCategoryKpi)[0]}
                                    onChange={handleCategoryKPIChange}
                                />
                            </FormControl>
                            <FormControl className={classes.largeFormControl}>
                                <FormLabel component="legend"
                                           className={classes.formLabel}>
                                    <FormattedMessage {...messages[`trends_add_comp_line`]} />
                                </FormLabel>
                                {!(categoryFilterFetchSpinner || categoryFilterFetchFailed) &&
                                <ReactPickyModified
                                    id={"categoryList"}
                                    options={categoryFilterData}
                                    multiple={true}
                                    includeFilter
                                    includeSelectAll
                                    manySelectedPlaceholder={'%s selected'}
                                    numberDisplayed={2}
                                    clearFilterOnClose={true}
                                    selectAllMode={"filtered"}
                                    value={categorySelectedFilterData}
                                    onChange={handleCategoryOnChange}
                                    placeholder={<FormattedMessage {...AppMessages[`none_selected`]} />}
                                />}
                                {(categoryFilterFetchSpinner && !categoryFilterFetchFailed) &&
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: "100%"
                                    }}>
                                    <SyncLoader size={10} margin={2} color="#0000a0" loading/>
                                </div>

                                }
                                {categoryFilterFetchFailed && <div>Failed to fetch data</div>}
                            </FormControl>

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
                        <OverLaySpinner
                            active={trendLineSpinner && trendLineData['xAxis'].length !== 0}>
                            {
                                (() => {
                                    if (!trendLineDataFetchFailed) {
                                        if (trendLineSpinner && trendLineData['xAxis'].length === 0) {
                                            return (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        height: "40vh",
                                                        width: "100%"
                                                    }}>
                                                    <SyncLoader size={15} margin={2}
                                                                color="#0000a0"
                                                                loading/>
                                                </div>
                                            );

                                        } else {
                                            return (
                                                <PerformanceLineApex data={trendLineData} kpiName={kpi}
                                                                     pageTitle={pageTitle}
                                                />
                                            )

                                        }
                                    } else {
                                        return null
                                    }
                                })()
                            }
                        </OverLaySpinner>
                    </Grid>
                </Grid>

            </Dialog>
        </Grid>
    );
}

CardsRTM.propTypes = {};

export default memo(injectIntl(CardsRTM));

