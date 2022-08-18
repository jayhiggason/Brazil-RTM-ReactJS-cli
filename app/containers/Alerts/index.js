/**
 *
 * Alerts
 *
 */

import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";

import {useInjectSaga} from "utils/injectSaga";
import {useInjectReducer} from "utils/injectReducer";
import makeSelectAlerts from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

/** Styles class*/
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    faqPannel: {
        padding: '24px',
        fontFamily: 'MarsCentra-Book',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        fontFamily: 'MarsCentra-Book',
    },
    content: {
        fontFamily: 'MarsCentra-Book',
    }
}));

export function Alerts() {
    useInjectReducer({key: "alerts", reducer});
    useInjectSaga({key: "alerts", saga});
    const classes = useStyles();

    return (
        // <Grid container spacing={1}>
        //   <Grid item xs={12} sm={12} md={12}>
        //     <ComingSoonPaper/>
        //   </Grid>
        // </Grid>
        <Grid>
            <Grid className={classes.faqPannel}>
                <Paper elevation={5} style={{fontFamily: 'MarsCentra-Book',}}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography
                                className={classes.heading}><FormattedMessage {...messages.alert1} /></Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography className={classes.content}>
                                <FormattedMessage {...messages.answer1} />
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography
                                className={classes.heading}><FormattedMessage {...messages.alert2} /></Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography className={classes.content}>
                                <FormattedMessage {...messages.answer1} />
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography
                                className={classes.heading}><FormattedMessage {...messages.alert3} /></Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography className={classes.content}>
                                <FormattedMessage {...messages.answer1} />
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography
                                className={classes.heading}><FormattedMessage {...messages.alert4} /></Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography className={classes.content}>
                                <FormattedMessage {...messages.answer1} />
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Paper>
            </Grid>
        </Grid>
    );
}

Alerts.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
    alerts: makeSelectAlerts()
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

export default compose(withConnect)(Alerts);
