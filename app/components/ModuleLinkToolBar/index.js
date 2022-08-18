/**
 *
 * ModuleLinkToolBar
 *
 */

import React, {memo} from "react";
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Link} from "react-router-dom";
import history from "../../utils/history";
// import SettingsIcon from '@material-ui/icons/Settings';
import {IconButton} from "@material-ui/core";
import {ControlOutlined} from '@ant-design/icons';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Button from "@material-ui/core/Button";

/** Styles class*/
const useStyles = makeStyles((theme) => ({

    root: {
        // backgroundColor: '#0000a0',
        // backgroundColor:'#f8f8f8',
        backgroundColor: "#fff",
        // width: '-webkit-fill-available',
        // height: "45px",
        // minHeight: "45px",
        width: `95.2vw`,
        marginLeft: "4vw",
        height: "4vw",
        minHeight: "4vw",
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
        // padding: "0.5vw",
    },
    rootOnOpen: {
        // backgroundColor: '#0000a0',
        // backgroundColor:'#f8f8f8',
        backgroundColor: "#fff",
        // width: '-webkit-fill-available',
        // height: "45px",
        // minHeight: "45px",
        width: `81.2vw`,
        marginLeft: "18vw",
        height: "4vw",
        minHeight: "4vw",
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
        // padding: "0.5vw",
    },

    WebDrawer: {
        [theme.breakpoints.down('xs')]: {
            display: "none",
        },
    },
    hide: {
        display: 'none',
    },
    MobileDrawer: {
        [theme.breakpoints.up('sm')]: {
            display: "none",
        },
    },
    linkStyle: {
        minWidth: "5vw!important", // a number of your choice
        maxWidth: "25vw!important",
        // width: "120px!important", // a number of your choice
        // fontSize: "14px !important",
        // fontFamily: 'MarsCentra-Book',
        fontSize: '1vw!important',
        [theme.breakpoints.down("xs")]: {
            fontSize: "14px!important"
        },
        fontFamily: "MarsCentra-Book",
        textTransform: "capitalize",
        textDecoration: 'none!important',
        outline: "none!important",
        '&:focus &:hover &:visited &:link &:active': {
            textDecoration: 'none!important',
            fontFamily: 'MarsCentra-Bold!important',
        },
    },
    tab: {
        minWidth: "4w!important", // a number of your choice
        // width: "200px!important", // a number of your choice
    },
    tabsOnActive: {
        fontFamily: 'MarsCentra-Bold',
    },

    iconSize: {
        fontSize: "2vw",
        [theme.breakpoints.down("xs")]: {
            fontSize: "20px"
        },
    },
    iconButton: {
        outline: 'none!important',
        height: "4vw",
        borderRadius: '0px',
        padding: "0.5vw 1vw"
    },
    button: {
        fontSize: '0.8vw!important',
        [theme.breakpoints.down("xs")]: {
            fontSize: "14px!important"
        },
        fontFamily: "MarsCentra-Book",
        textTransform: "none",
    },
}));

/** Links function  is used to render the Links of the views in the drawer of the tool */


function Links({linkList, mainDrawerOpen, handleExplainModule}) {
    const classes = useStyles();

    const explainModuleViews = ["/SCMOS/CMOS/Promotions", "/SCMOS/CMOS/Items", "/SCMOS/CMOS/Customers", "/SCMOS/CMOS/Risks", "/SCMOS/CMOS/RiskApp", "/SCMOS/CMOS/RecommendationEngine", "/SCMOS/PI/Overview", "/SCMOS/PI/Stock-Projections-Per-Warehouse", "/SCMOS/PI/Pack-Format", "/SCMOS/PI/Shelf-Life-Overview", "/SCMOS/PI/Shelf-Life-Specific-Product"];
    // "/SCMOS/PI/Shelf-Life-Overview", "/SCMOS/PI/Shelf-Life-Specific-Product", "/SCMOS/PI/Historic-Summary"
    return (
        <Toolbar className={clsx({[classes.rootOnOpen]: mainDrawerOpen, [classes.root]: !mainDrawerOpen})}>
            <Grid container justify="flex-start" alignItems="center">
                <Grid item container xs={10} sm={10} md={10} lg={10} xl={10} justify="flex-start" alignItems="center">

                    <Tabs
                        value={history.location.pathname}
                        indicatorColor="primary"
                        textColor="black"
                        variant="scrollable"
                        scrollButtons="auto"
                        style={{color: "#000", padding: "0px"}}
                    >

                        {
                            linkList.map((item) => (
                                <Tab classes={{root: classes.tab}}
                                     className={clsx(classes.linkStyle, {[classes.tabsOnActive]: (history.location.pathname === item.link)})}
                                     value={item.link} key={item.label} label={item.label} component={Link}
                                     to={item.link} id={item.id}/>
                            ))
                        }

                    </Tabs>

                </Grid>

                <Grid item container xs={2} sm={2} md={2} lg={2} xl={2} justify="flex-end" alignItems="center">
                    {(() => {
                        if (explainModuleViews.indexOf(history.location.pathname.toString()) > -1) {
                            return (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<PlayCircleFilledIcon/>}
                                    onClick={() => handleExplainModule(true)}
                                >
                                    Module Demo
                                </Button>
                            )
                        }
                    })()}

                </Grid>

            </Grid>
        </Toolbar>
    );
}

Links.propTypes = {};

export default memo(Links);
