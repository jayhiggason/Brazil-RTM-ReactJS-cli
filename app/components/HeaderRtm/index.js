/**
 *
 * HeaderRtm
 *
 */

import React, {memo} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import history from "../../utils/history";
import MarsLogo from "../../images/MarsLogo.jpg";


function Mars() {
    return (
        <Grid
            container onClick={() => {
            history.push("/PerformanceSummary")
        }}
        >
            <Grid item>
                <img
                    height={"50px"} style={{padding: '0.2vw', height: "4vw"}}
                    src={MarsLogo}
                    alt="Mars"
                />

            </Grid>
        </Grid>


    );
}

/** HeaderRtm function  is used to render the Top header icon that navigates to the homepage (performance summary) of the tool */

function HeaderRtm() {

    const classes = useStyles();
    return (
        <Grid
            container direction="row"
            alignItems="center">
            <Grid
                item style={{maxWidth: imgWidth, width: imgWidth}} className={classes.imgContainer}>
                <Mars/>
            </Grid>
        </Grid>
    );
}

HeaderRtm.propTypes = {};

export default memo(HeaderRtm);

/** Styles class*/
const useStyles = makeStyles(theme => ({
    iconButton: {
        outline: 'none',
        height: "2vw",
        borderRadius: '0px',
        padding: "5px 20px",
    },
    toolbarButtons: {
        marginLeft: "auto",
    },
    typography: {
        color: '#0000a0',
        fontFamily: 'MarsCentra-Extrabold',
        padding: "10px",
        height: '30px',
    },
    toolbar: {
        padding: 0,
        minHeight: "50px",
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    grid: {
        background: 'white',
        // width: '100%',
        // height:"50px"
    },
    hide: {
        display: "none",
    },
    logo: {
        paddingRight: "10px",
        fontSize: 22,
        fontFamily: 'MarsCentra-Bold',
    },
    link: {
        fontSize: "1vw",
        [theme.breakpoints.down("xs")]: {
            fontSize: "14px"
        },
        fontFamily: 'MarsCentra-Book',
        padding: "8px 20px",
        borderRadius: '1px',
        textDecoration: 'none',
        '&:hover': {
            backgroundColor: '#dadde93d',
            textDecoration: 'none',
            fontFamily: 'MarsCentra-Bold',
        },
    },
    HeaderOnOpen: {
        width: "240px",
    },
    HeaderOnClose: {
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    breadcrumb: {
        marginTop: '1.3vh',
        [theme.breakpoints.up('lg')]: {
            // display: 'none',
            marginTop: 0,
        },
    },
    dropDownBreadCrumb: {
        // display: 'none',
        [theme.breakpoints.down('sm')]: {
            // display: 'block',
        },
    },
    imgContainer: {
        '&:hover': {
            backgroundColor: '#dadde93d',
            cursor: 'pointer',
        },
    },
    searchBar: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    iconButtonTrainingModule: {
        outline: 'none!important',
        height: "4vw",
        borderRadius: '0px',
        padding: "0.5vw 1vw"
    },
    iconSize: {
        fontSize: "2vw",
        [theme.breakpoints.down("xs")]: {
            fontSize: "20px"
        },
    },
}));

