/**
 *
 * NotificationMenu
 *
 */

import React, {memo} from "react";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Link} from "react-router-dom";

/** Styles class*/
const useStyles = makeStyles((theme) => ({
    iconSize: {
        fontSize: "2vw",
        [theme.breakpoints.down("xs")]: {
            fontSize: "20px"
        },
    },
    root: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    label: {
        fontSize: '1vw',
        [theme.breakpoints.down("xs")]: {
            fontSize: "12px"
        },
        fontFamily: "MarsCentra-Book",
        textAlign: "center"
    },
    iconButton: {
        outline: 'none!important',
        height: "4vw",
        borderRadius: '0px',
        padding: "0.5vw 1vw"
    },
}));


const StyledMenu = withStyles({
    padding: "0px!important",
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
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
        style={{fontFamily: 'MarsCentra-Book'}}
    />
));
const StyledMenuItem = withStyles(theme => ({
    root: {
        backgroundColor: "#fff!important",
        padding: "0.5px",
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
                backgroundColor: "#fff!important",
            },
        },
    },
}))(MenuItem);
const HtmlTooltip = withStyles(() => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: '13px',
        border: '1px solid #dadde9',
        fontFamily: 'MarsCentra-Book',
    },
}))(Tooltip);

function NotificationMenu() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <HtmlTooltip title="Notification">
                <IconButton id={"seleniumNotificationButton"} onClick={handleClick} aria-controls="customized-menu"
                            aria-haspopup="true" variant="contained"
                            className={classes.iconButton}>
                    <NotificationsOutlinedIcon className={classes.iconSize}/>
                </IconButton>
            </HtmlTooltip>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem>
                    <Grid style={{minWidth: "200px", width: "220px"}} container>
                        <Grid justify="center" alignContent="center" style={{width: "100%"}} item>
                            <List style={{backgroundColor: "rgba(0, 0, 0, .06)"}} component="div" disablePadding>
                                <ListItem button component={Link} to="/notifications/inbox">
                                    <ListItemText
                                        primary={<Typography className={classes.label}> View All</Typography>}/>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}

NotificationMenu.propTypes = {};

export default memo(NotificationMenu);
