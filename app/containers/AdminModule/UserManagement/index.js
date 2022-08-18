/**
 *
 * UserManagement
 *
 */

import React, {memo} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";

import {useInjectSaga} from "utils/injectSaga";
import {useInjectReducer} from "utils/injectReducer";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import makeSelectUserManagement from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import {makeSelectMainDrawerState} from "../../App/selectors";

export function UserManagement() {
    useInjectReducer({key: "userManagement", reducer});
    useInjectSaga({key: "userManagement", saga});
    const userManagementUrl = "http://52.232.162.9/auth/admin";
    return (
        <Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Paper elevation={5}>
                    <iframe
                        width="99%" height="541.25"
                        src={userManagementUrl}
                        frameBorder="0" allowFullScreen="true"/>
                </Paper>
            </Grid>
        </Grid>
    );
}

UserManagement.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    userManagement: makeSelectUserManagement(),
    mainDrawerState: makeSelectMainDrawerState(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    withConnect,
    memo
)(UserManagement);
