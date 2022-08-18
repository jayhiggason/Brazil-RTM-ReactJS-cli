/**
 *
 * Header
 *
 */

import React, {memo, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {Link} from "react-router-dom"
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withWidth from "@material-ui/core/withWidth";
import history from "../../utils/history";
import AccountMenu from "../AccountMenu";
import HelpMenu from "../HelpMenu";
import Tooltip from "@material-ui/core/Tooltip";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import MarsLogo from "../../images/MarsLogo.jpg"
import TranslateIcon from '@material-ui/icons/Translate';
import clsx from "clsx";
import {getCookie} from "../../utils/cookieUtilities";
import messages from "./messages";
import {injectIntl} from "react-intl";
/** Styles class*/
const useStyles = makeStyles(theme => ({
    iconButton: {
        outline: 'none',
        height: "2vw",
        borderRadius: '0px',
        padding: "5px 20px",
    },
    toolbarButtons: {
        marginLeft: "auto",
    },
    typography: {
        color: '#0000a0',
        fontFamily: 'MarsCentra-Extrabold',
        padding: "10px",
        height: '30px',
    },
    toolbar: {
        padding: 0,
        minHeight: "50px",
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    grid: {
        background: 'white',
    },
    hide: {
        display: "none",
    },
    logo: {
        paddingRight: "10px",
        fontSize: 22,
        fontFamily: 'MarsCentra-Bold',
    },
    link: {
        fontSize: "1vw",
        [theme.breakpoints.down("xs")]: {
            fontSize: "14px"
        },
        fontFamily: 'MarsCentra-Book',
        padding: "8px 20px",
        borderRadius: '1px',
        textDecoration: 'none',
        '&:hover': {
            backgroundColor: '#dadde93d',
            textDecoration: 'none',
            fontFamily: 'MarsCentra-Bold',
        },
    },
    HeaderOnOpen: {
        width: "240px",
    },
    HeaderOnClose: {
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    breadcrumb: {
        marginTop: '1.3vh',
        [theme.breakpoints.up('lg')]: {
            marginTop: 0,
        },
    },
    dropDownBreadCrumb: {
        [theme.breakpoints.down('sm')]: {},
    },
    imgContainer: {
        '&:hover': {
            backgroundColor: '#dadde93d',
            cursor: 'pointer',
        },
    },
    searchBar: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    iconButtonTrainingModule: {
        outline: 'none!important',
        height: "4vw",
        borderRadius: '0px',
        padding: "0.5vw 1vw"
    },
    iconSize: {
        fontSize: "2vw",
        [theme.breakpoints.down("xs")]: {
            fontSize: "20px"
        },
    },
    menuItem: {
        fontFamily: "MarsCentra-Book",
        fontSize: "0.7vw",
    },
    menuItemSelected: {
        fontFamily: "MarsCentra-Book",
        fontSize: "0.7vw",
        color: "blue",
        backgroundColor: "#e6e6e6"
    }
}));

/** Mars function  is used to render the "Mars logo" in the top tool bar of the tool */

function Mars() {
    return (
        <Grid
            container onClick={() => {
            let userInfo = JSON.parse(getCookie("UserCred"));
            if( userInfo.organisation === "MARS"){
                history.push("/RTM/PerformanceSummary")
            } else {
                history.push("/RTM/POCView")
            }

        }}
        >
            <Grid item>
                <img
                    style={{padding: '0.2vw', height: "3vw"}}
                    src={MarsLogo}
                    alt="Polaris"
                />

            </Grid>
        </Grid>


    );
}

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

const TrainingVideosButton = () => {
    const classes = useStyles();
    const handleClick = () => {
        history.push("/SCMOS/RTM/extras/Training")
    };
    return (
        <HtmlTooltip title="Click to navigate to training videos module">
            <IconButton id={"seleniumNotificationButton"} onClick={handleClick} aria-controls="customized-menu"
                        aria-haspopup="true" variant="contained"
                        className={classes.iconButtonTrainingModule}>
                <PlayCircleOutlineIcon className={classes.iconSize}/>
            </IconButton>
        </HtmlTooltip>
    );
};

const BreadCrumbText = ({text,intl}) => {
        try {
            return (intl.formatMessage({...messages[`${text.trim()}`]}));
        } catch (e) {
            return (text);
        }
};
const BreadCrumbTextLocale = injectIntl(BreadCrumbText);
/** Header function  is used to render the Top header in the top tool bar of the tool */

function Header({userInfo, hideLogo, showLinearProgress, width, locale, changeLocale}) {
    const classes = useStyles();
    let breadLength;

    let imgWidth = "5vw";
    switch (width) {
        case 'xs':
            breadLength = 0;
            imgWidth = "5vw";
            break;
        case 'sm':
            breadLength = 1;
            imgWidth = "5vw";
            break;
        case 'md':
            breadLength = 2;
            break;
        case 'lg':
            breadLength = 3;
            break;
        case 'xl':
            breadLength = 4;
            break;
    }

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const path = history.location.pathname.split("/").splice(1);
    const BreadCrumb = path.map((item) => {
        let name = "";
        try {
            item.split("-").map((i) => {
                name = `${name} ${(i.toString())}`
            })
        } catch (e) {
            name = (item.toString());
        }
        return name;
    });
    // console.log("bc",BreadCrumb);
    let link = "";


    // for drop down bread crumbs
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let dropDownLink = "";

    const [anchorLang, setAnchorLang] = React.useState(null);

    const handleClickLang = (event) => {
        setAnchorLang(event.currentTarget);
    };

    const handleCloseLang = () => {
        setAnchorLang(null);
    };

    const handleLang = (value) => {
        changeLocale(value);
        handleCloseLang();
    };

    const formatLanguage = (value)=>{
        switch (value) {
            case 'en':
                return 'English';
            case 'pt':
                return 'Português';

        }
    };

    return (
        <Grid
            container direction="row"
            alignItems="center"
        >
            <Grid
                item style={{maxWidth: imgWidth, width: imgWidth}} className={classes.imgContainer}>
                <Mars hide={hideLogo}/>
            </Grid>
            <Grid item container style={{maxWidth: `calc(100% - ${imgWidth})`}} justify="center" alignItems="center">
                <Grid item container xl={8} lg={7} md={6} sm={8} xs={6}>
                    <Grid item>
                        {
                            (() => {
                                if (breadLength < path.length) {
                                    return (
                                        <div className={classes.dropDownBreadCrumb}>
                                            <IconButton
                                                id="seleniumDropDownBreadCrumb" onClick={handleClick}
                                                aria-controls="customized-menu"
                                                aria-haspopup="true" variant="contained"
                                                className={classes.iconButton}>
                                                <ExpandMoreIcon/>
                                            </IconButton>
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                            >
                                                {
                                                    path.map((item, index) => {
                                                        if ((path.length - breadLength) > index) {
                                                            dropDownLink = `${dropDownLink}/${item}`;
                                                            return (
                                                                <MenuItem onClick={handleClose}>
                                                                    <Link
                                                                        color="inherit" className={classes.link}
                                                                        to={dropDownLink}
                                                                        onClick={showLinearProgress}>
                                                                        {BreadCrumb[index]}
                                                                    </Link>
                                                                </MenuItem>);
                                                        }
                                                    })
                                                }

                                            </Menu>
                                        </div>
                                    );
                                }
                            })()
                        }
                    </Grid>
                    <Grid item justify="center" alignItems="center">
                        <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>

                            {
                                path.map((item, index) => {
                                    if ((path.length - breadLength) <= index) {
                                        link = `${link}/${item}`;
                                        if (path.length - 1 === index) {
                                            return (
                                                <Link
                                                    color="inherit" className={classes.link}
                                                >
                                                    {/*{BreadCrumb[index]}*/}
                                                    <BreadCrumbTextLocale text={BreadCrumb[index]}/>
                                                </Link>);
                                        } else
                                            return (
                                                <Link
                                                    color="inherit" className={classes.link} to={link}
                                                    onClick={showLinearProgress}>
                                                    {/*{BreadCrumb[index]}*/}
                                                    <BreadCrumbTextLocale text={BreadCrumb[index]}/>
                                                </Link>);
                                    }
                                })
                            }
                        </Breadcrumbs>
                    </Grid>
                </Grid>
                {/*<Grid item container justify="flex-end" className={classes.searchBar} xl={2} lg={3} md={3}>*/}
                {/*    <Grid item>*/}
                {/*        <SearchBar/>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
                <Grid item container justify="flex-end" alignItems={"center"} xl={4} lg={5} md={6} sm={8} xs={6}>
                    {/*<CombinedMenu/>*/}
                    {/*<NotificationMenu id="SeleniumNotificationButton"/>*/}
                    {/*<TrainingVideosButton/>*/}

                    <HtmlTooltip title={formatLanguage(locale)}>
                    <IconButton id={"seleniumLanguageButton"} onClick={handleClickLang}
                                variant="contained" className={classes.iconButton}
                    >
                        <TranslateIcon className={classes.iconSize}/>
                    </IconButton>
                    </HtmlTooltip>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorLang}
                        keepMounted
                        open={Boolean(anchorLang)}
                        onClose={handleCloseLang}
                        value={locale}
                    >
                        <MenuItem onClick={() => handleLang('en')} className={clsx({
                            [classes.menuItem]: locale !== 'en',
                            [classes.menuItemSelected]: locale === 'en'
                        })}>{formatLanguage('en')}</MenuItem>
                        <MenuItem onClick={() => handleLang('pt')} className={clsx({
                            [classes.menuItem]: locale !== 'pt',
                            [classes.menuItemSelected]: locale === 'pt'
                        })}>{formatLanguage('pt')}</MenuItem>
                    </Menu>
                    <HelpMenu/>
                    <AccountMenu userInfo={userInfo}/>
                </Grid>
            </Grid>
        </Grid>
    );
}


export default memo(withWidth()(Header));
