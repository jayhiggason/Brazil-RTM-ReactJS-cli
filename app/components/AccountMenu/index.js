/**
 *
 * AccountMenu
 *
 */

import React, {memo} from "react";
import PropTypes from 'prop-types';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import {deepPurple} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {Link} from "react-router-dom";
import './style.css';
// import history from "../../utils/history";
import {logout} from "../../utils/cookieUtilities";
import {roleFormatter} from "../../utils/utility";
import {FormattedMessage} from "react-intl";
import messages from "./messages";

/** Styles class*/
const useStyles = makeStyles(theme => ({
    iconButtonLabel: {
        display: "flex",
        flexDirection: "column",
        // color: '#0000a0',
        outline: 'none',
    },
    small: {
        width: "2.5vw",
        height: "2.5vw",
        [theme.breakpoints.down("xs")]: {
            width: theme.spacing(4),
            height: theme.spacing(4),
        },
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    large: {
        width: "3vw",
        height: "3vw",
        [theme.breakpoints.down("xs")]: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    iconButton: {
        outline: 'none!important',
        height: "4vw",
        borderRadius: '0px',
        padding: "0.5vw 1vw"
    },
    avatarLabel: {
        fontSize: "0.75vw",
        fontFamily: 'MarsCentra-Bold',
        [theme.breakpoints.down("xs")]: {
            fontSize: "12px"
        }
    },
    label: {
        fontSize: "0.7vw",
        fontFamily: 'MarsCentra-Book',
        [theme.breakpoints.down("xs")]: {
            fontSize: "10px"
        }
    }
}));

const StyledMenu = withStyles(() => ({
    padding: "0px!important",
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
const StyledMenuItem = withStyles((theme) => ({
    root: {
        backgroundColor: "#fff",
        padding: "0.5px",
        '&:focus': {
            backgroundColor: theme.palette.common.white,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
                backgroundColor: "#fff",
            },
        },
    },
}))(MenuItem);

/** AccountMenu function is used to render the account menu option in the top toolbar in the application which gives details of the user - user name, user id, user role, logging option*/
function AccountMenu({userInfo}) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        logout();
    };

    let AvatarName = "";

    userInfo.userID.split('.').map((item) => {
        AvatarName += item.charAt(0)
    });
    return (
        <div>
            <IconButton
                id="SeleniumProfileButton" onClick={handleClick}
                className={classes.iconButton}
                classes={{label: classes.iconButtonLabel}}>
                <Avatar
                    alt="Remy Sharp"
                    className={classes.small}
                > <Typography variant="caption" className={classes.avatarLabel}
                              style={{fontFamily: 'MarsCentra-Book', textTransform: "uppercase"}}>
                    {AvatarName}
                </Typography></Avatar>

            </IconButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >

                <StyledMenuItem>
                    <Grid style={{minWidth: "14vw", width: "15vw"}} container>
                        <Grid item container justify="flex-end" alignItems="flex-start">
                            <Grid>
                                <Button onClick={logOut} id="SeleniumLogoutButton">
                                    <Typography variant="caption"
                                                className={classes.label}>   <FormattedMessage {...messages.logOut} /></Typography></Button>
                            </Grid>
                        </Grid>
                        <Grid container item style={{padding: "0.3vw"}}>
                            <Grid item xs={4}>
                                <Avatar
                                    alt="Remy Sharp"
                                    className={classes.large}
                                > <Typography variant="caption"
                                              className={classes.avatarLabel}
                                              style={{fontFamily: 'MarsCentra-Book', textTransform: "uppercase"}}>
                                    {AvatarName}
                                </Typography></Avatar>
                            </Grid>
                            <Grid container item xs={8} direction="column" justify="flex-start" alignContent="center">
                                <Grid item justify="flex-start">
                                    <Typography className={classes.avatarLabel}>
                                        {/*{`${capitalize(userInfo.userID.split(".")[0])} ${capitalize(userInfo.userID.split(".")[1])}`}*/}
                                        {userInfo.name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.label}>
                                        ID : {userInfo.id}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.label}>
                                        {
                                            roleFormatter(userInfo.role)
                                        }
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid justify="center" alignContent="center" style={{width: "100%"}} item>
                            <List style={{backgroundColor: "rgba(0, 0, 0, .06)"}} component="div" disablePadding>
                                <ListItem button component={Link} to="/settings/UserPreferences">
                                    <ListItemText primary={<Typography className={classes.avatarLabel} style={{
                                        fontFamily: 'MarsCentra-Book',
                                        textAlign: "center"
                                    }}> <FormattedMessage {...messages.preferences} /></Typography>}/>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}

AccountMenu.propTypes = {
    userInfo: PropTypes.object,
};

export default memo(AccountMenu);
