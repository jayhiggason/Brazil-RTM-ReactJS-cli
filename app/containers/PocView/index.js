/**
 *
 * PocView
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectPocView from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import Grid from "@material-ui/core/Grid";
import PocTable from "../../components/PocTable";

export function PocView() {
  useInjectReducer({ key: "pocView", reducer });
  useInjectSaga({ key: "pocView", saga });

  return (
    <div>
      <Helmet>
        <title>PocView</title>
        <meta name="description" content="Description of PocView" />
      </Helmet>
     <Grid container>
         <Grid item xs={12}>
             <PocTable/>
         </Grid>
     </Grid>
    </div>
  );
}

PocView.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  pocView: makeSelectPocView()
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
)(PocView);
