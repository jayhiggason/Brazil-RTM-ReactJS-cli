/**
 *
 * UserPreferences
 *
 */

import React, {memo} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";

import {useInjectSaga} from "../../../utils/injectSaga";
import {useInjectReducer} from "../../../utils/injectReducer";
import makeSelectUserPreferences from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import Grid from "@material-ui/core/Grid";
import ComingSoonPaper from "../../../components/ComingSoonPaper/Loadable";

export function UserPreferences() {
    useInjectReducer({key: "userPreferences", reducer});
    useInjectSaga({key: "userPreferences", saga});

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12}>
                <ComingSoonPaper/>
            </Grid>
        </Grid>
    );
}

UserPreferences.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
    userPreferences: makeSelectUserPreferences()
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
)(UserPreferences);
