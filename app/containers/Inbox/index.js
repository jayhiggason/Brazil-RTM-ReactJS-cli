/**
 *
 * Inbox
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "../../utils/injectSaga";
import { useInjectReducer } from "../../utils/injectReducer";
import makeSelectInbox from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import Grid from "@material-ui/core/Grid";
import NotificationsDrawer from "../../components/NotificationsDrawer";
import {makeSelectMainDrawerState} from "../App/selectors";

export function Inbox({mainDrawerState}) {
  useInjectReducer({ key: "inbox", reducer });
  useInjectSaga({ key: "inbox", saga });

  return (
      <Grid container spacing={1}>
          <NotificationsDrawer mainDrawerState={mainDrawerState}/>
      </Grid>
  );
}

Inbox.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  inbox: makeSelectInbox(),
  mainDrawerState: makeSelectMainDrawerState(),

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
)(Inbox);
