/**
 *
 * RightDrawer
 *
 */

import React, {memo} from "react";
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from "@material-ui/core/Grid";
import ModuleLinkToolBar from "../ModuleLinkToolBar/Loadable";


/** Styles class*/
const useStyles = makeStyles((theme) => ({
    appBar: {
        marginTop: '4vw',
        zIndex: '1100 !important',
        background: '#fff',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    content: {
        flexGrow: 1,
        padding: "0.5vw 0.5vw",
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    mainDrawerOpenAppBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

/** RightDrawer function is used to render drawer on the left which provides navigation to different pages along with settings option which is consistent across the tool */


function RightDrawer(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    let navDisplay = true;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const {mainDrawerOpen} = props;
    const showSettingsButton = !props['navBarLinks'];

    return (
        <Grid>
            <CssBaseline/>
            {
                (() => {
                    if (props.linkList && navDisplay) {
                        return (
                            <AppBar
                                position="fixed"
                                elevation={1}
                                className={clsx(classes.appBar,
                                    {
                                        [classes.mainDrawerOpenAppBar]: mainDrawerOpen,

                                    }
                                )}
                            >
                                <ModuleLinkToolBar mainDrawerOpen={mainDrawerOpen}
                                                   showFilter={props.openFilter}
                                                   showSettingsButton={showSettingsButton}
                                                   open={open} handleDrawerOpen={handleDrawerOpen}
                                                   handleDrawerClose={handleDrawerClose}
                                                   linkList={props.linkList} toggleTopFilters={props.toggleTopFilters}
                                                   handleExplainModule={props.handleExplainModule}/>
                            </AppBar>
                        );
                    }
                })()
            }
            <main
                className={classes.content}
            >
                {props.children}
            </main>
        </Grid>
    );
}

RightDrawer.propTypes = {};

export default memo(RightDrawer);
