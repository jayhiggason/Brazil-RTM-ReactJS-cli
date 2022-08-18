/**
 *
 * Homepage
 *
 */

import React, {memo} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";

import {useInjectSaga} from "../../utils/injectSaga";
import {useInjectReducer} from "../../utils/injectReducer";
import makeSelectHomepage from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import Grid from "@material-ui/core/Grid";
import {Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import history from "../../utils/history";
import BackgroundImage from '../../images/Large-Mars Petcare Teams Background.jpg';
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {trainingVideos} from '../../utils/utility'
import {navBarLinkData} from '../../utils/NavBarLinkData'
import './style.css';

/** Styles class*/
const useStyles = makeStyles(({
    paper: {
        width: "100%",
        textAlign: "center",
        verticalAlign: "middle",
        height: "100%",
        '&::before': {
            content: '"some content"',
            display: 'block',
            height: 60,
            marginTop: -60
        },
        backgroundColor: 'green',
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        boxShadow: "inset 0 0 0 2000px rgba(0,0,0,.25)",
// padding: '0.8vw'
    },
    cmosModulePaper: {
        minWidth: '20vw',
        padding: "0 0.5vw",
        // minHeight:'58vh',
        height: '40vh',
        // opacity: '0.5',
        // borderRadius: '5%',
        background: 'rgba(255,255,255,0.6)',
        // border: "1px solid #000",
        "&:hover": {
            transition: " all 1s ease-in-out",
            transform: "scale(1.01)",
            boxShadow: "1.5vw 1.5vw 0.75vw rgba(0, 0, 0, 0.2)",
            zIndex: 2
        }
    },
    piModulePaper: {
        minWidth: '20vw',
        padding: "0 0.5vw",
        // minHeight:'58vh',
        height: '40vh',
        // opacity: '0.5',
        // borderRadius: '5%',
        background: 'rgba(255,255,255,0.6)',
        // border: "1px solid #000",
        "&:hover": {
            transition: " all 1s ease-in-out",
            transform: "scale(1.01)",
            boxShadow: "1.5vw 1.5vw 0.75vw rgba(0, 0, 0, 0.2)",
            zIndex: 2
        }
    },
    cmosHeading: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '2vw',
        color: '#0000a0e6',
        padding: '1vw'
    },
    piHeading: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '2vw',
        color: '#0000a0e6',
        padding: '1vw'
    },

    cmosModulesList: {
        // minHeight: "4vw",
        // minWidth: "10vw",
        fontFamily: 'MarsCentra-Bold',
        fontSize: '0.6vw',
        color: '#FFF',
        padding: '0.8vw',
        "&:hover": {
            textDecoration: "underline",
            // textDecorationColor: "#c18f02",
        },
        backgroundColor: '#0000A0',
        background: 'linear-gradient(45deg, #0064a0, #0087a0);',
    },
    gridLinkItem: {
        minHeight: "2vw",
        minWidth: "100%",

    },
    paperLinkItem: {
        border: "1px solid #000",

    },
    piModulesList: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '0.6vw',
        color: 'rgba(0,0,160,0.9)',
        padding: '0.8vw',
        "&:hover": {
            textDecoration: "underline",
            textDecorationColor: "#c18f02",
        }
    },
    cmosGridStyle: {
        width: '100%',
        height: '89vh',
        padding: "0.5vw",
        verticalAlign: "middle"
        // background: 'rgba(0,0,160,0.3)'
    },
    piGridStyle: {
        width: '100%',
        height: '89vh',
        padding: "0.5vw"
        // background: 'rgba(98, 198, 167, 0.3)'
    },
    divider: {
        marginLeft: '1.4vw',
        marginRight: '1.4vw',
        background: '#d3bc97'
    },
    title: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1vw',
        color: "#0000a0e6"
    },
    subTitle: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.6vw',
        color: "#0000a0e6"
    },
    gridItemLabel: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '0.6vw',
    },
    card:{
        background: 'rgba(255,255,255,0.8)',
    }
}));

export function Homepage() {
    useInjectReducer({key: "homepage", reducer});
    useInjectSaga({key: "homepage", saga});
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Grid container justify="center" alignItems="center" style={{minHeight: "70vh"}}>
                <Grid item container justify="center" alignItems="center" xs={12} sm={12} md={3} lg={3} xl={3}
                      className={classes.cmosGridStyle}>
                    <Grid item justify="center" alignItems="center" container xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Paper className={classes.cmosModulePaper} elevation={6}>
                            <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} justify="center"
                                  alignItems="center">
                                <Typography className={classes.cmosHeading}>CMOS</Typography>
                            </Grid>
                            {/*<Divider variant='middle' className={classes.divider}/>*/}
                            <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} justify="center"
                                  alignItems="center">
                                {
                                    navBarLinkData("CMOS").map((item) => {
                                        return (
                                            <Grid key={item} item xs={12} sm={12} md={6} lg={6} xl={6}
                                                  style={{padding: "0.2vw"}}>
                                                <Paper onClick={() => {
                                                    history.push(item.link)
                                                }} className={classes.cmosModulesList} color="primary"
                                                       variant={"outlined"}>
                                                    <Grid container justify={"center"} alignItems={"center"}
                                                          className={classes.gridLinkItem}>
                                                        <Typography className={classes.gridItemLabel}>
                                                            {item.label}
                                                        </Typography>
                                                    </Grid>
                                                </Paper>
                                            </Grid>
                                        );
                                    })
                                }
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item container justify="center" alignItems="center" xs={12} sm={12} md={3} lg={3} xl={3}
                      className={classes.piGridStyle}>
                    <Grid item container justify="center" alignItems="center" xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Paper className={classes.piModulePaper} elevation={6}>
                            <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} justify="center"
                                  alignItems="center">
                                <Typography className={classes.piHeading}>PI</Typography>
                            </Grid>
                            {/*<Divider variant='middle' className={classes.divider}/>*/}
                            <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} justify="center"
                                  alignItems="center">
                                {
                                    navBarLinkData("PI").map((item) => {
                                        return (
                                            <Grid key={item} item xs={12} sm={12} md={6} lg={6} xl={6}
                                                  style={{padding: "0.2vw"}}>
                                                <Paper onClick={() => {
                                                    history.push(item.link)
                                                }} className={classes.cmosModulesList} color="primary"
                                                       variant={"outlined"}>
                                                    <Grid container justify={"center"} alignItems={"center"}
                                                          className={classes.gridLinkItem}>
                                                        <Typography className={classes.gridItemLabel}>
                                                            {item.label}
                                                        </Typography>

                                                    </Grid>
                                                </Paper>
                                            </Grid>
                                        );
                                    })
                                }

                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item container justify="center" alignItems="center" xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Card className={classes.card}>
                        <CardHeader
                            title={<Typography className={classes.title}>Introduction</Typography>}
                            subheader={<Typography className={classes.subTitle}>video length
                                : 0 min</Typography>}
                        />

                        <CardContent style={{minWidth: "40vw"}}>
                            <div className="iframe-container">
                                <iframe className="responsive-iframe"
                                        width="100%"
                                        frameBorder="0" allowFullScreen="true"
                                        srcDoc={trainingVideos()[0].src}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    );
}

Homepage.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
    homepage: makeSelectHomepage()
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    withConnect,
    memo
)(Homepage);
