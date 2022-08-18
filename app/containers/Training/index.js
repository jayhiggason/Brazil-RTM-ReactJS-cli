/**
 *
 * Training
 *
 */

import React, {memo} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";

import {useInjectSaga} from "../../utils/injectSaga";
import {useInjectReducer} from "../../utils/injectReducer";
import makeSelectTraining from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import {trainingVideos} from '../../utils/utility'
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import './style.css';

/** Styles class*/
const useStyles = makeStyles(() => ({
    title: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1vw',
    },
    subTitle:{
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.6vw',
    }

}));



const VideoCard = ({src, title,length}) => {
    const classes = useStyles();
    return (
        <Grid item container justify={"center"}>
            <Card style={{width: "100%", height: "100%"}}>
                <CardHeader
                    title={<Typography className={classes.title}>{title}</Typography>}
                    subheader={<Typography className={classes.subTitle}>video length : {length} min</Typography>}
                />

                <CardContent>
                    <div class="iframe-container">
                        <iframe class="responsive-iframe"
                            width="100%" height="450"
                            frameBorder="0" allowFullScreen="true"
                            srcDoc={src||`<div  style="font-family: MarsCentra-Bold; text-align:center;">coming soon</div>`}
                        />
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
};

export function Training() {
    useInjectReducer({key: "training", reducer});
    useInjectSaga({key: "training", saga});


    return (
        <Grid container justify={"flex-start"} alignItems={"center"}>
            <CssBaseline/>
            {
                trainingVideos().map((item) => {
                    return (
                        <Grid key={item.title} container item justify={"center"} alignItems={"center"} xs={12} sm={12} md={6} lg={3} xl={3} style={{padding: "1vw"}}>
                            <VideoCard src={item.src} title={item.title} length={item.length}/>
                        </Grid>
                    );
                })
            }
        </Grid>
    );
}

Training.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
    training: makeSelectTraining()
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
)(Training);
