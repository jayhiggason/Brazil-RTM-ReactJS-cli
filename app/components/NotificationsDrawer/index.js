/**
 *
 * NotificationsDrawer
 *
 */

import React, {memo} from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from "clsx";
import StarIcon from '@material-ui/icons/Star';
import './style.css';

const drawerWidth = 240;

/** Styles class*/
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        fontFamily: 'MarsCentra-Book',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        fontFamily: 'MarsCentra-Book',
    },
    drawerPaper: {
        width: drawerWidth,
        marginLeft: theme.spacing(7) + 1,
        marginTop: '100px',

    },
    drawerPaperOnMainDrawerOpen: {
        width: drawerWidth,
        marginLeft: '240px',
        marginTop: '100px',

    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    list: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
        fontFamily: 'MarsCentra-Book',
    },
}));

function NotificationsDrawer({mainDrawerState}) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
                style={{height: 'fit-content'}}
            >
                <MenuIcon/>
            </IconButton>
            <CssBaseline/>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: clsx({
                        [classes.drawerPaper]: !mainDrawerState,
                        [classes.drawerPaperOnMainDrawerOpen]: mainDrawerState
                    }),
                }}
            >

                <Divider/>
                <List style={{fontFamily: 'MarsCentra-Book',}}>
                    {['All', 'Bookmarks'].map((text, index) => (
                        <ListItem button key={text} style={{fontFamily: 'MarsCentra-Book',}}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text} style={{fontFamily: 'MarsCentra-Book',}}/>
                        </ListItem>
                    ))}
                </List>

                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >

            </main>
            <div className={classes.drawerHeader}/>
            <List component="nav" className={classes.list} aria-label="contacts">
                <ListItem button>
                    <ListItemText primary="Pedigree stock is at High Risk!"/>
                    <IconButton edge="end" aria-label="delete">
                        <StarIcon/>
                    </IconButton>
                </ListItem>
                <ListItem button>
                    <ListItemText primary="M & M's are at OOS Risk!"/>
                    <IconButton edge="end" aria-label="delete">
                        <StarIcon/>
                    </IconButton>
                </ListItem>
                <ListItem button>
                    <ListItemText primary="The products at high risk are above threshold value!"/>
                    <IconButton edge="end" aria-label="delete">
                        <StarIcon/>
                    </IconButton>
                </ListItem>
                <ListItem button>
                    <ListItemText primary="The products at OOS risk are above threshold value!"/>
                    <IconButton edge="end" aria-label="delete">
                        <StarIcon/>
                    </IconButton>
                </ListItem>
            </List>
        </div>
    );
}

NotificationsDrawer.propTypes = {};

export default memo(NotificationsDrawer);
