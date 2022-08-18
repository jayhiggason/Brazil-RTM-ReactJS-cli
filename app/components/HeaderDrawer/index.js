/**
 *
 * HeaderDrawer
 *
 */

import React, {memo} from "react";
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {isWidthDown} from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from "@material-ui/core/Avatar";
import {deepPurple} from "@material-ui/core/colors";
import Tooltip from "@material-ui/core/Tooltip";
import CollapsibleMenuList from "../CollapsibleMenuList";
import Header from "../Header/Loadable";
import history from "../../utils/history";
import marsIcon from '../../images/marsIcon.png'
import {getCookie} from "../../utils/cookieUtilities";
import {Link} from "react-router-dom";
import SettingsIcon from '@material-ui/icons/Settings';
import AppMessages from "../../containers/App/messages";
import {FormattedMessage} from "react-intl";
import messages from "../Header/messages";
import {injectIntl} from "react-intl";
const drawerWidth = "18vw";
const drawerWidthOnClose = "3.8vw";

/** Styles class*/

const useStyles = makeStyles((theme) => ({
    linearProgress: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#fff",
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        backgroundColor: 'rgba(0, 0, 0, .06)',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: 'rgba(0, 0, 0, .08)',
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: drawerWidthOnClose,
        [theme.breakpoints.up('sm')]: {
            width: drawerWidthOnClose,
        },
        backgroundColor: 'rgba(0, 0, 0, .08)',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        height: "4vw",
        minHeight: "4vw",
    },
    content: {
        flexGrow: 1,
        marginLeft: drawerWidthOnClose,
        [theme.breakpoints.up('sm')]: {
            marginLeft: drawerWidthOnClose,
        },
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
    HeaderToolbar: {
        color: "#0000a0",
        backgroundColor: "#fff",
        minHeight: "4vw",
        padding: 0,
        height: "4vw"
    },
    typography: {
        fontWeight: 500,
        fontFamily: 'MarsCentra-Extrabold',
        padding: '0 40px',
        fontSize: '1.2vw',
        [theme.breakpoints.down("xs")]: {
            fontSize: "16px"
        },
    },
    typographyApps: {
        fontSize: '1vw',
        [theme.breakpoints.down("xs")]: {
            fontSize: "12px"
        },
        fontFamily: "MarsCentra-Book",
    },
    navLinkToolBar: {
        backgroundColor: '#fff',
        width: '-webkit-fill-available',
        minHeight: "4vw",
        height: "4vw",
        padding: '0',
    },
    SettingsBox: {
        width: drawerWidth,
    },
    SettingsBoxOnClose: {
        width: drawerWidthOnClose,
        [theme.breakpoints.up('sm')]: {
            width: drawerWidthOnClose,
        },
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: 'rgba(225, 225, 225,1)',
    },
    smDrawer: {
        width: drawerWidth,
        backgroundColor: '#fff',
    },
    small: {
        width: "1.7vw",
        height: "1.7vw",
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        fontSize: "1vw",
        [theme.breakpoints.down("xs")]: {
            fontSize: "20px",
            width: theme.spacing(4),
            height: theme.spacing(4),
        },
        fontFamily: "MarsCentra-Book",
    },
    iconSize: {
        fontSize: "1.5vw",
        [theme.breakpoints.down("xs")]: {
            fontSize: "20px"
        },
    },
    list: {
        height: "auto",
        paddingTop: "0",
        paddingBottom: "0",
    },
    listIcon: {
        maxWidth: "4vw",
        minWidth: "4vw"
    },
    listItem:
        {
            paddingRight: "0.4vw",
            paddingLeft: "1vw",
            height: "4vw"
        },
    listText:
        {
            marginTop: "0.2vw",
            marginBottom: "0.2vw",
        },
    bottomDiv: {
        position: 'fixed', bottom: '0.7vw'
    },
    versionDiv: {
        padding: "0.7vw 1.3vw"
    },
    iconButton: {
        outline: 'none!important',
        height: "4vw",
        borderRadius: '0px',
        padding: "0.5vw 1vw"
    },
    settingsGrid: {
        justify: 'flex-end',
        alignItems: 'center'
    }
}));


/** HeaderDrawer function  is used to render the Top header drawer that provides the way to navigate to each views of the tool */

function HeaderDrawer({
                          userInfo, children, open, handleDrawerOpen, handleDrawerClose, activePanel, handleActivePanelChange, width,
                          locale, changeLocale,intl
                      }) {
    const classes = useStyles();
    let smDevice = false;
    if (isWidthDown('sm', width)) {
        smDevice = true;
        handleDrawerClose();
    }
    const isAdmin = JSON.parse(getCookie("UserCred"))["role"] === "super_user";


    const path = history.location.pathname.split("/").splice(1);
    let appName;
    try {
        appName = intl.formatMessage({...messages[`${path[path.length - 2]}`]}).toUpperCase();
    } catch (e) {
        appName = "RTM"
    }

    const [MDOpen, setMDOpen] = React.useState(false);

    const [completed, setCompleted] = React.useState(0);
    const [displayProgress, setProgress] = React.useState('block');

    React.useEffect(() => {
        function progress() {
            setCompleted((oldCompleted) => {
                if (oldCompleted === 100) {
                    setProgress('none');
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldCompleted + diff, 100);
            });
        }

        const timer = setInterval(progress, 70);
        return () => {
            clearInterval(timer);
        };
    }, []);

    const handleMDDrawerOpen = () => {
        setMDOpen(true);
    };

    const handleMDDrawerClose = () => {
        setMDOpen(false);
    };

    const showLinearProgress = () => {
        setProgress('block');
        setCompleted(0);
    };

    return (
        <Grid>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={classes.appBar}
                elevation={1}
            >
                <Toolbar className={classes.HeaderToolbar}>
                    <Header
                        hideLogo={open} userInfo={userInfo} handleDrawerOpen={handleDrawerOpen}
                        activePanel={activePanel} showLinearProgress={showLinearProgress} locale={locale} changeLocale={changeLocale}/>
                </Toolbar>
                <div style={{display: displayProgress}} className={classes.linearProgress}>
                    <LinearProgress variant="determinate" value={completed}/>
                </div>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.navLinkToolBar}/>
                <List component="div" disablePadding className={classes.list}>
                    <Tooltip
                        title={appName} placement="right" arrow disableFocusListener={open}
                        disableHoverListener={open} disableTouchListener={open}>
                        <ListItem className={classes.listItem}>

                            <ListItemIcon className={classes.listIcon}>
                                <Avatar
                                    variant="rounded" className={classes.small}
                                    alt="Remy Sharp">
                                    {appName.charAt(0).toUpperCase()}
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText className={classes.listText}
                                          primary={<Typography
                                              style={{padding: "0px"}}
                                              className={classes.typography}> {appName}</Typography>}/>
                        </ListItem>
                    </Tooltip>
                </List>

                <Divider/>

                <CollapsibleMenuList
                    activePanel={activePanel} handleActivePanelChange={handleActivePanelChange}
                    DrawerOpen={open || MDOpen} showLinearProgress={showLinearProgress}/>
                <Divider/>
                <div

                    className={clsx({
                        [classes.SettingsBox]: open,
                        [classes.SettingsBoxOnClose]: !open,
                        [classes.bottomDiv]: true
                    })}>
                    <div>
                        <Divider/>
                        <Grid
                            container direction="row"
                            justify="flex-end"
                            alignItems="center" className={clsx({[classes.hide]: !open})}>
                            <Grid item xs={9} sm={9} md={9} lg={9}>

                                <ListItem
                                    button
                                    component={Link} to="/settings/admin"
                                    disabled={!isAdmin}
                                    onClick={showLinearProgress} className={classes.listItem}
                                >
                                    <ListItemIcon>
                                        <SettingsIcon className={classes.iconSize}/>
                                    </ListItemIcon>
                                    <ListItemText className={classes.listText} primary={<Typography
                                        className={classes.typographyApps}> {<FormattedMessage {...AppMessages[`settings`]} />}</Typography>}/>
                                </ListItem>

                            </Grid>
                            <Grid item xs={3} className={classes.settingsGrid}>
                                <IconButton
                                    className={classes.iconButton}
                                    id="SeleniumCloseHeaderDrawer"
                                    onClick={handleDrawerClose}>
                                    <ArrowBackIosIcon className={classes.iconSize}/>
                                </IconButton>

                            </Grid>
                        </Grid>
                        <Grid
                            container direction="column"
                            justify="flex-end"
                            alignItems="center" className={clsx({[classes.hide]: open})}>
                            <IconButton className={classes.iconButton} disabled={!isAdmin}
                                        component={Link} to="/settings/admin"> <SettingsIcon
                                className={classes.iconSize}/></IconButton>

                            <IconButton
                                id="SeleniumOpenHeaderDrawer"
                                className={clsx(classes.typographyApps,
                                    {[classes.hide]: smDevice}, classes.iconButton)}
                                onClick={handleDrawerOpen}>
                                <ArrowForwardIosIcon className={classes.iconSize}/>
                            </IconButton>
                            <IconButton
                                id="SeleniumCloseHeaderDrawer"
                                className={clsx(classes.typographyApps,
                                    {[classes.hide]: !smDevice}, classes.iconButton)}
                                onClick={handleMDDrawerOpen}>
                                <ArrowForwardIosIcon className={classes.iconSize}/>
                            </IconButton>
                        </Grid>

                    </div>

                </div>


            </Drawer>
            <Drawer
                className={classes.smDrawer}
                classes={{
                    paper: classes.drawerPaper,
                }} anchor="left" open={MDOpen} onClose={handleMDDrawerClose}>

                <Grid container justify="flex-start" alignItems="center" className={classes.navLinkToolBar}>

                    <Grid item>
                        <img
                            height={50} style={{padding: '0.3vw', height: "4vw"}}
                            src={marsIcon}
                            alt="Polaris"
                        />

                    </Grid>
                </Grid>
                <Divider/>
                <List component="div" disablePadding className={classes.list}>
                    <ListItem className={classes.listItem}>
                        <ListItemIcon className={classes.listIcon}>
                            <Avatar
                                variant="rounded" className={classes.small}
                                alt="Remy Sharp">
                                {appName.charAt(0).toUpperCase()}
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText className={classes.listText}
                                      primary={<Typography
                                          style={{padding: "0px"}}
                                          className={classes.typography}> {appName}</Typography>}/>
                    </ListItem>
                </List>
                <ListItem className={clsx({[classes.hide]: !open}, classes.listItem)}>
                    <ListItemText className={classes.listText}
                                  primary={<Typography className={classes.typography}> {appName}</Typography>}/>
                </ListItem>

                <Divider/>
                <CollapsibleMenuList activePanel={activePanel} handleActivePanelChange={handleActivePanelChange}/>
                <Divider/>
                <div

                    className={clsx({
                        [classes.SettingsBox]: open,
                        [classes.SettingsBoxOnClose]: !open
                    }, classes.bottomDiv)} style={{width: "100%"}}>

                    <div>
                        <Divider/>
                        <Grid
                            container
                            justify="flex-end"
                            alignItems="center">
                            <Grid item>
                                <ListItem className={classes.listItem}
                                          button
                                          component={Link} to="/settings/admin" disabled={!isAdmin}
                                >
                                    <ListItemIcon className={classes.listIcon}>
                                        <SettingsIcon className={classes.iconSize} fontSize="medium"/>
                                    </ListItemIcon>
                                    <ListItemText className={classes.listText} primary={<Typography
                                        className={classes.typographyApps}> Settings</Typography>}/>
                                </ListItem>

                            </Grid>
                            <Grid item className={classes.settingsGrid}>
                                <IconButton className={classes.iconButton}
                                            id="SeleniumCloseHeaderDrawer"
                                            onClick={handleMDDrawerClose}>
                                    <ArrowBackIosIcon className={classes.iconSize}/>
                                </IconButton>

                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}>

                {
                    (() => {
                        let showDrawer = (history.location.pathname === '/SCMOS/Home');
                        if (showDrawer) {
                            return null;
                        } else return (
                            <div className={classes.toolbar}/>
                        );
                    })()
                }
                <div className={classes.toolbar}/>
                {children}
            </main>
        </Grid>
    );
}

HeaderDrawer.propTypes = {};

export default memo(withWidth()(injectIntl(HeaderDrawer)));
