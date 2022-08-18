/**
 *
 * ComingSoonPaper
 *
 */

import React, {memo} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {Grid} from "@material-ui/core";

/** Styles class*/
const useStyles = makeStyles(() => ({
    root: {
        fontFamily: 'MarsCentra-Book',
    },
    paper: {
        marginTop: '10px',
    },
    text: {
        margin: '5vh 13vw',
        fontSize: 'large',
        fontFamily: 'MarsCentra-Book',
    }
}));


function ComingSoonPaper() {
    const classes = useStyles();

    return (
        <Paper elevation={1} className={classes.paper}>
            <Grid container spacing={2}>
                <Grid item sm={3}/>
                <Grid item sm={6}>
                    <div className={classes.text}>Coming soon!</div>
                </Grid>
                <Grid item sm={3}/>
            </Grid>
        </Paper>
    );
}

ComingSoonPaper.propTypes = {};

export default memo(ComingSoonPaper);
