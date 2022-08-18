/**
 *
 * CollapsibleMenuList
 *
 */

import React, {memo, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import './style.css';
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from '@mdi/react'
import history from "../../utils/history";
import {collapsibleMenuData} from '../../utils/collapsibleMenuData'


const drawerWidth = "18vw";
const iconSize = "1.5vw";
/** Styles class*/
const useStyles = makeStyles((theme) => ({
    typographyApps: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '1.2vw',
        [theme.breakpoints.down("xs")]: {
            fontSize: "16px"
        },
    },
    typographyAppsOnSelect: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1.2vw',
        [theme.breakpoints.down("xs")]: {
            fontSize: "16px"
        },
    },
    listItemOnSelect: {
        backgroundColor: 'rgba(0, 0, 0, .06)',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, .06)',
        },
    },
    icon: {// color: '#0000a0'
    },
    iconOnSelect: {
        // color: '#0000a0',
    },
    listItemsTypography: {
        // color: '#0000a0',
        color: '#000',
        fontSize: '1vw',
        [theme.breakpoints.down("xs")]: {
            fontSize: "14px"
        },
        fontFamily: 'MarsCentra-Book',
        '&:hover': {
            color: '#000',
        },
    },
    listItemsIcon: {
        color: '#000',
        //  color: '#0000a0',
        '&:hover': {
            // color: '#fff',
        },
        fontSize: "1.5vw",
        [theme.breakpoints.down("xs")]: {
            fontSize: "20px"
        },
    },
    listItem: {
        fontFamily: 'MarsCentra-Book',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, .08)',
        },
        paddingRight: "0.4vw",
        paddingLeft: "1vw",
        height: "4vw"
    },
    leftBorder: {
        fontFamily: 'MarsCentra-Bold',
        borderLeft: "0.3vw solid #0067b5",
    },
    unSelectedLeftBorder: {
        fontFamily: 'MarsCentra-Bold',
        borderLeft: "0.3vw solid grey",
    },
    listItemsTypographyOnSelect: {
        fontFamily: 'MarsCentra-Bold',
    },
    wrap: {
        whiteSpace: 'normal',
        maxWidth: drawerWidth
    },
    list: {
        height: "auto",
        paddingTop: "0!important",
        paddingBottom: "0!important",
    },
    iconSize: {
        fontSize: "1.5vw",
        [theme.breakpoints.down("xs")]: {
            fontSize: "20px"
        },
    },
    listIcon: {
        maxWidth: "3.5vw",
        minWidth: "3.5vw"
    },
    listText:
        {
            marginTop: "0.2vw",
            marginBottom: "0.2vw",
        },

}));

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#fff',
        color: 'rgba(0, 0, 0, 0.87)',
        width: drawerWidth,
        // minWidth:200,
        // maxWidth: 220,
        fontSize: "0.8vw",
        border: '1px solid #dadde9',
        margin: "0px",
    },
}))(Tooltip);

const makeStringOnLocation = (location) => {
    const rootLocation = location.split("/").splice(1);// .concat();//converted to string and removed first element
    rootLocation.pop();// removed last element
    return rootLocation.toString();
};

const CheckSelected = (link) => {
    return (history.location.pathname === link)
};

const MenuList = ({DrawerOpen, showLinearProgress, apps}) => {
    const classes = useStyles();

    return (
        <List component="div" disablePadding className={clsx({[classes.wrap]: DrawerOpen}, classes.list)}>
            {apps.map((text, index) => (
                <Tooltip id={index}
                         title={text.App} placement="right" arrow disableFocusListener={DrawerOpen}
                         disableHoverListener={DrawerOpen} disableTouchListener={DrawerOpen}>
                    <ListItem
                        selected={CheckSelected(text.link)}
                        className={clsx(classes.listItem, {
                            [classes.leftBorder]: CheckSelected(text.link),
                            [classes.unSelectedLeftBorder]: !CheckSelected(text.link)
                        })} button component={Link} to={text.link}
                        id={text.id} onClick={showLinearProgress}>
                        <ListItemIcon className={classes.listIcon}>
                            <Icon
                                path={text.icon} color={"rgba(0, 0, 0, .54)"}
                                size={iconSize}
                                className={classes.listItemsIcon}/>
                        </ListItemIcon>
                        <ListItemText className={classes.listText}
                            primary={<Typography
                            className={clsx(classes.listItemsTypography, {[classes.listItemsTypographyOnSelect]: CheckSelected(text.link)})}>{text.App}</Typography>}/>
                    </ListItem>
                </Tooltip>
            ))}
        </List>
    );
};


const PanelTooltip = (props) => {
    const classes = useStyles();
    return (
        <HtmlTooltip
            interactive placement="right-start"
            open={props.open}
            onOpen={props.onOpen}
            onClose={props.onClose}
            title={
                <React.Fragment>
                    <List component="div" disablePadding className={classes.list}>
                        <ListItem className={classes.listItem}>
                            <ListItemText className={classes.listText}
                                primary={<Typography
                                    className={classes.listItemsTypography}>{props.panel.Title}</Typography>}/>
                        </ListItem>
                        {props.panel.apps.map((text) => (
                            <ListItem
                                selected={history.location.pathname === text.link}
                                className={classes.listItem} button component={Link} to={text.link}
                                id={text.id}
                                onClick={props.showLinearProgress}
                            >
                                <ListItemIcon className={classes.listIcon}>
                                    <Icon
                                        path={text.icon} color={"rgba(0, 0, 0, .54)"}
                                        size={iconSize}
                                        className={classes.listItemsIcon}/>
                                </ListItemIcon>
                                <ListItemText className={classes.listText}
                                    primary={<Typography
                                        className={classes.listItemsTypography}>{text.App}</Typography>}/>
                            </ListItem>
                        ))}
                    </List>
                </React.Fragment>
            }
        >{props.children}
        </HtmlTooltip>
    );
};

function CollapsibleMenuList({activePanel, handleActivePanelChange, DrawerOpen, showLinearProgress}) {
    const classes = useStyles();

    const navigatePanel = (link, panel) => {
        if (panel === activePanel) {
            handleActivePanelChange("none");
        } else {
            handleActivePanelChange(panel);
        }


    };

    const [tooltipState, setTooltipState] = useState({
        reporting: false,
        analytics: false,
        data: false,
        automation: false,
        innovations: false
    });
    const onHoverPanel = (panel) => {
        if (activePanel !== panel) {
            setTooltipState({...tooltipState, [`${panel}`]: true});
        }
    };
    const onLeavePanel = (panel) => {
        setTooltipState({...tooltipState, [`${panel}`]: false});
    };


    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader" className={classes.list}>
            {
                collapsibleMenuData().map((panel, index) => {
                    return (
                        <React.Fragment>
                            <PanelTooltip
                                open={tooltipState[panel.panel]}
                                onOpen={() => onHoverPanel(panel.panel)}
                                onClose={() => onLeavePanel(panel.panel)}
                                showLinearProgress={showLinearProgress}
                                panel={panel}
                            >
                                <ListItem
                                    className={clsx({[classes.listItemOnSelect]: activePanel === panel.panel},classes.listItem)} button
                                    onClick={() => navigatePanel("/reporting/fpa/overview", panel.panel)}
                                    id={panel.id}>
                                    <ListItemIcon className={classes.listIcon}>
                                        <Icon
                                            path={panel.panelIcon} color="rgba(0, 0, 0, .54)" size={iconSize}
                                            className={clsx({
                                                [classes.icon]: !(activePanel === panel.panel),
                                                [classes.iconOnSelect]: activePanel === panel.panel,
                                            })}/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={<Typography
                                            className={clsx({
                                                [classes.typographyApps]: !(activePanel === panel.panel),
                                                [classes.typographyAppsOnSelect]: activePanel === panel.panel,
                                            },classes.listText)}>{panel.Title}</Typography>}/>
                                    {activePanel === panel.panel ? <ExpandLess
                                        className={clsx({
                                            [classes.icon]: !activePanel === panel.panel,
                                            [classes.iconOnSelect]: activePanel === panel.panel,
                                        },classes.iconSize)}/> : <ExpandMore className={classes.iconSize}/>}
                                </ListItem>
                            </PanelTooltip>

                            <Collapse className={classes.listItemOnSelect} in={activePanel === panel.panel}
                                      timeout="auto" unmountOnExit>
                                <MenuList DrawerOpen={DrawerOpen} showLinearProgress={showLinearProgress}
                                          apps={panel.apps}/>
                            </Collapse>
                        </React.Fragment>
                    )
                })
            }
        </List>
    );
}

CollapsibleMenuList.propTypes = {};

export default memo(CollapsibleMenuList);
