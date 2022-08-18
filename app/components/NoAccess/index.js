/**
 *
 * NoAccess
 *
 */

import React, {memo} from "react";
import {Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Avatar from "@material-ui/core/Avatar";
import messages from "./messages";
import {FormattedMessage} from "react-intl";


/** Styles class*/
const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'MarsCentra-Book',
    },
    paper: {
        border: "2px solid red",
        minHeight: "30vh",
        verticalAlign: "middle"
    },
    text: {
        fontSize: '1vw',
        fontFamily: 'MarsCentra-Bold',
    },
    gridStyle: {
        height: "30vh",
        width: "100%"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        color: "#FFF"
    },
}));


/** NoAccess function  is used to render the access denied info when a user is not allowed to access a particular part of the tool */

function NoAccess() {

    const classes = useStyles();

    return (
        <Paper elevation={1} className={classes.paper}>
            <Grid container justify={"center"} alignItems={"center"} className={classes.gridStyle}>
                <Avatar className={classes.avatar}>
                    <NotInterestedIcon/>
                </Avatar>
                <Typography align={"center"} className={classes.text}>
                <FormattedMessage {...messages.accessDenied} />
                </Typography>
            </Grid>
        </Paper>
    );
}

NoAccess.propTypes = {};

export default memo(NoAccess);
