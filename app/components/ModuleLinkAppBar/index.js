/**
 *
 * ModuleLinkAppBar
 *
 */
import React, {memo} from "react";
import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Links from '../ModuleLinkToolBar/Loadable';


/** Styles class*/
const useStyles = makeStyles(theme => ({
    root: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: "50px",
        backgroundColor: 'lightgrey',
        color: '#ffffff',
    },

}));

/** NavLinks function  is used to render the Links of each page in the navigation bar of the tool on the top */


function NavLinks({linkList}) {
    const classes = useStyles();
    return (
        <Grid container>
            <AppBar className={classes.root} position="static">
                <Links linkList={linkList}/>
            </AppBar>
        </Grid>
    );
}

NavLinks.propTypes = {
    userInfo: PropTypes.object,
};
export default memo(NavLinks);
