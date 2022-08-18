/**
 *
 * ErrorBoundary
 *
 */

import React from "react";
import ErrorIcon from '@material-ui/icons/Error';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import * as Sentry from '@sentry/browser';
import {getCookie} from "../../utils/cookieUtilities";
import Button from "@material-ui/core/Button";
import {FormattedMessage} from "react-intl";
import messages from "./messages";

/** ErrorBoundary is a class function that is used to render the Error message in each component when data is not available or some issue in loading the data or if the tool crashes */

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {eventId: null};
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        Sentry.withScope((scope) => {
            scope.setExtras(errorInfo);
            const eventId = Sentry.captureException(error);
            this.setState({eventId});
        });
    }

    render() {
        if (this.state.hasError) {

            const userInfo = JSON.parse(getCookie("UserCred"));
            // You can render any custom fallback UI
            Sentry.showReportDialog({eventId: this.state.eventId, user: {name: userInfo.userID}});

            return (
                <Grid style={{padding: "30px"}}>
                    <Paper elevation={2}>
                        <Grid container style={{minHeight: "500px", minWidth: "500px"}} justify="center"
                              alignContent="center" direction="column">
                            <Grid item container justify="center"
                                  alignContent="center"> <Typography style={{padding: "20px"}}> <ErrorIcon/> <FormattedMessage {...messages.reload} />
                            </Typography></Grid>
                            <Grid item container justify="center"
                                  alignContent="center"> <Button variant="contained"
                                                                 onClick={() => Sentry.showReportDialog({
                                                                     eventId: this.state.eventId,
                                                                     user: {name: userInfo.userID}
                                                                 })}> <FormattedMessage {...messages.reportCrash} /></Button></Grid>
                        </Grid>
                    </Paper>
                </Grid>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
