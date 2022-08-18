/**
 *
 * MyPinnedViews
 *
 */

import React, {memo, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";

import {useInjectSaga} from "../../utils/injectSaga";
import {useInjectReducer} from "../../utils/injectReducer";
import makeSelectMyPinnedViews from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import MyViews from "../../components/MyViews/Loadable";
import {fetchPinnedViews} from "./actions";
import {unpinMyView} from "../App/actions";
import NoDataAlert from "../../components/NoDataAlert";
import {SyncLoader} from "react-spinners";
import AppMessages from "../App/messages";
import {FormattedMessage} from "react-intl";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeSelectLocale} from "../LanguageProvider/selectors";

export function MyPinnedViews({
                                  fetchPinnedViews, myPinnedViews, unpinMyView, selectedlocale
                              }) {
    useInjectReducer({key: "myPinnedViews", reducer});
    useInjectSaga({key: "myPinnedViews", saga});
    React.useEffect(() => {
        fetchPinnedViews();
    }, []);


    return (
        <div>
            <Helmet>
                <title>MyPinnedViews</title>
                <meta name="description" content="Description of MyPinnedViews"/>
            </Helmet>
            {
                (() => {
                    if (!myPinnedViews['fetchViewsFailed']) {
                        if (!myPinnedViews['fetchViewsSpinnerState']) {
                            if(myPinnedViews['myViewsData'].length!==0){
                                return (
                                    <>
                                        {
                                            myPinnedViews['myViewsData'].map((item) => {
                                                const filters = JSON.parse(item.filters);
                                                return (<MyViews id={item.viewId}
                                                                 pinId={item.id}
                                                                 viewName={item.viewName}
                                                                 pinName={item.pinName}
                                                                 api={item.apiEnd}
                                                                 filters={filters}
                                                                 unpinMyView={unpinMyView}
                                                locale={selectedlocale}/>);
                                            })
                                        }
                                    </>
                                );
                            } else {
                                return (
                                    <Grid item xs={12} container style={{
                                            height: '200px'}}
                                          justify="center"
                                          alignItems="center">
                                        <Paper style={{margin: '40px 40px 40px 40px', width: "100%"}}>
                                            <Grid item>
                                    <Typography style={{ margin: '10px',
                                        fontSize: '14px',
                                        fontFamily: 'MarsCentra-Bold',}} align={'center'}>
                                        <FormattedMessage {...AppMessages[`noViewPinned`]} />
                                    </Typography>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                )

                            }


                        } else {
                            return (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '40vh',
                                    }}>
                                    <SyncLoader size={15} margin={2} color="#0000a0"
                                                loading/>
                                </div>
                            )
                        }
                    } else {
                        return <NoDataAlert />
                    }
                })()
            }
        </div>
    );
}

MyPinnedViews.propTypes = {
    fetchPinnedViews: PropTypes.func.isRequired,
    unpinMyView: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    myPinnedViews: makeSelectMyPinnedViews(),
    selectedlocale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
    return {
        fetchPinnedViews: () => dispatch(fetchPinnedViews()),
        unpinMyView: (data) => dispatch(unpinMyView(data)),

    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    withConnect,
    memo
)(MyPinnedViews);
