/**
 *
 * NoDataAlert
 *
 */

import React, {memo} from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import messages from "./messages";
import {FormattedMessage} from "react-intl";
import AppMessages from "../../containers/App/messages";

/** Styles class*/
const useStyles = makeStyles(() => ({

    heading: {
        margin: '10px',
        fontSize: '14px',
        fontFamily: 'MarsCentra-Bold',
    },
    Card: {
        height: '200px'
    }
}));

/** NoDataAlert function  is reused to render the no data alert in all the components when there is a issue with data loading in the tool */

function NoDataAlert({message = 'Failed Fetch Data. Please Refresh or Contact Admin'}) {
    const classes = useStyles();
    return (


        <Grid item xs={12} container className={classes.Card}
              justify="center"
              alignItems="center">
            <Paper style={{margin: '40px 40px 40px 40px', width: "100%"}}>
                <Grid item>
                    {message && <Typography className={classes.heading} align={'center'}>{<FormattedMessage {...messages.noDataAlert} />}</Typography>}
                    {/*{message && <Typography className={classes.heading} align={'center'}>{ <FormattedMessage {...AppMessages[`noViewPinned`]} />}</Typography>}*/}
                </Grid>
            </Paper>
        </Grid>


    );
}

NoDataAlert.propTypes = {};

export default memo(NoDataAlert);
