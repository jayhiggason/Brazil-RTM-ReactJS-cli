/**
 *
 * MyPage
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
import makeSelectMyPage from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import Grid from "@material-ui/core/Grid";
import MyPageTable from "../../components/MyPageTable/Loadable";
import Container from "@material-ui/core/Container";
import {fetchMyPagePinnedView, removePinnedView} from "./actions";
import {SyncLoader} from "react-spinners";
import NoDataAlert from "../../components/NoDataAlert";
import {selectedFilterOnChange} from "../App/actions";

export function MyPage({
                           //actions
                           fetchMyPagePinnedView, removePinnedView,onFilterChange,
                           //selectors
                           myPage
                       }) {
    useInjectReducer({key: "myPage", reducer});
    useInjectSaga({key: "myPage", saga});

    useEffect(() => {
        fetchMyPagePinnedView()
    }, []);
    return (
        <Container maxWidth="xl">
            <Helmet>
                <title>MyPage</title>
                <meta name="description" content="Description of MyPage"/>
            </Helmet>
            <Grid container justify={"center"} alignItems={"center"}>
                {
                    (() => {
                        if (!myPage['pinnedViewTableDataFetchFailed']) {
                            if (!myPage['pinnedViewTableDataFetchSpinnerState']) {
                                return (
                                    <MyPageTable data={myPage['pinnedViewTableData']} removePinnedView={removePinnedView} onFilterChange={onFilterChange}/>
                                );
                            } else {
                                return (
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '30vh',
                                            width: "100%"
                                        }}>
                                        <SyncLoader size={15} margin={2} color="#0000a0"
                                                    loading/>
                                    </div>
                                )
                            }
                        } else {
                            return <NoDataAlert/>;
                        }
                    })()
                }

            </Grid>
        </Container>
    );
}

MyPage.propTypes = {
    fetchMyPagePinnedView: PropTypes.func.isRequired,
    removePinnedView: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    myPage: makeSelectMyPage()
});

function mapDispatchToProps(dispatch) {
    return {
        fetchMyPagePinnedView: () => dispatch(fetchMyPagePinnedView()),
        removePinnedView: (data) => dispatch(removePinnedView(data)),
        onFilterChange: (data) => dispatch(selectedFilterOnChange(data)),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    withConnect,
    memo
)(MyPage);
