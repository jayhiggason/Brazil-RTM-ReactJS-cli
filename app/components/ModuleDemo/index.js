/**
 *
 * ModuleDemo
 *
 */

import React, {memo} from "react";
import Dialog from "@material-ui/core/Dialog";
import history from "../../utils/history";
import {trainingVideos} from '../../utils/utility'
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import './style.css';

/** Styles class*/
const useStyles = makeStyles(() => ({
    title: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1vw',
    },
    subTitle: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.6vw',
    }

}));

function ModuleDemo({open, onClose}) {

    const classes = useStyles();

    let videoSrc = "";

    switch (history.location.pathname) {
        case "/SCMOS/CMOS/Promotions":
            videoSrc = trainingVideos()[0];
            break;
        case "/SCMOS/CMOS/Items":
            videoSrc = trainingVideos()[1];
            break;
        case "/SCMOS/CMOS/Customers":
            videoSrc = trainingVideos()[2];
            break;
        case "/SCMOS/CMOS/Risks":
            videoSrc = trainingVideos()[3];
            break;
        case "/SCMOS/CMOS/RiskApp":
            videoSrc = trainingVideos()[4];
            break;
        case "/SCMOS/CMOS/RecommendationEngine":
            videoSrc = trainingVideos()[5];
            break;
        default:
            videoSrc = "";
    }
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth='xl'

        >
            <Grid item container justify={"center"} alignItems={"center"}>

                {
                    (() => {
                        if (videoSrc['src'] === "") {
                            return (
                                <Card>
                                    <CardHeader
                                        title={<Typography className={classes.title}>{videoSrc['title']}</Typography>}
                                        subheader={<Typography className={classes.subTitle}>video length
                                            : {videoSrc.length} min</Typography>}
                                    />

                                    <CardContent style={{width: "60vw"}}>
                                        <div className="iframe-container">
                                            <iframe className="responsive-iframe"
                                                    width="100%"
                                                    frameBorder="0" allowFullScreen="true"
                                                    srcDoc={videoSrc['src']}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                            );
                        } else {
                            return (
                                <Card>
                                    <CardContent style={{width: "60vw",padding:"2vw"}}>
                                        <Grid item container justify={"center"} alignItems={"center"}>
                                            <Typography className={classes.title}>Coming Soon</Typography>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            );
                        }
                    })()
                }


            </Grid>
        </Dialog>
    );
}

ModuleDemo.propTypes = {};

export default memo(ModuleDemo);
