/**
 *
 * CombinedMenu
 *
 */

import React, {memo} from "react";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import AddCommentIcon from "@material-ui/icons/AddComment";
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import history from "../../utils/history";
// import SearchBar from "../SearchBar";


/** Styles class*/
const useStyles = makeStyles(theme => ({
    iconButtonLabel: {
        display: "flex",
        flexDirection: "column",
        // color: '#0000a0',
        outline: 'none',
    },
    small: {
        width: "1vw",
        height: "1vw",
        [theme.breakpoints.down("xs")]: {
            width: "12px",
            height: "12px",
        },
    },
    root: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
        },
    },
    iconSize: {
        fontSize: "2vw",
        [theme.breakpoints.down("xs")]: {
            fontSize: "20px"
        },
    },
    label: {
        fontSize: '1vw',
        [theme.breakpoints.down("xs")]: {
            fontSize: "12px"
        },
        fontFamily: "MarsCentra-Book",
    },
    iconButton: {
        outline: 'none!important',
        height: "4vw",
        borderRadius: '0px',
        padding: "0.5vw 1vw"
    },

}));

const StyledMenu = withStyles(() => ({
    paper: {
        border: '1px solid #d3d4d5',
    },
}))(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));
const StyledMenuItem = withStyles(theme => ({
    root: {
        padding: "0px!important",
        width: "100%",
        '&:focus': {
            // backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

function CombinedMenu() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const gotoFAQ = () => {
        // window.location.href = "/faq";
        history.push("/faq")
    };
    return (
        <div className={classes.root}>
            <Tooltip title="help">
                <IconButton
                    id="seleniumHelpMenuButton" onClick={handleClick} aria-controls="customized-menu"
                    aria-haspopup="true" variant="contained"
                    className={classes.iconButton}>
                    <MoreVertOutlinedIcon className={classes.iconSize}/>

                </IconButton>
            </Tooltip>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Grid container justify="flex-start" alignContent="center" style={{minWidth: "200px", width: "200px"}}>

                    <StyledMenuItem onClick={gotoFAQ}>
                        <Grid item container justify="flex-start" alignContent="center" style={{padding: "10px"}}>
                            <Grid item xs={2}> <QuestionAnswerIcon
                                className={classes.small}/></Grid>
                            <Grid item> <Typography
                                variant="caption"
                                className={classes.label}>
                                FAQ
                            </Typography></Grid>
                        </Grid>
                    </StyledMenuItem>

                    <StyledMenuItem onClick={() => history.push("/notifications/inbox")}>
                        <Grid item container justify="flex-start" alignContent="center" style={{padding: "10px"}}>
                            <Grid item justify="center"> <Typography
                                variant="caption"
                                className={classes.label}>
                                Notification Center
                            </Typography></Grid>
                        </Grid>
                    </StyledMenuItem>


                </Grid>
            </StyledMenu>
        </div>
    );
}

CombinedMenu.propTypes = {};

export default memo(CombinedMenu);
