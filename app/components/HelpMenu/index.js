/**
 *
 * HelpMenu
 *
 */

import React, {memo} from "react";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Tooltip from "@material-ui/core/Tooltip";
import history from "../../utils/history";
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import HelpIcon from '@material-ui/icons/Help';
import Grid from "@material-ui/core/Grid";
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import messages from "./messages";
import {FormattedMessage} from "react-intl";


/** Styles class*/
const useStyles = makeStyles(theme => ({
    iconSize: {
        fontSize: "2vw",
        [theme.breakpoints.down("xs")]: {
            fontSize: "20px"
        },
    },
    small: {
        width: "1vw",
        height: "1vw",
    },
    iconButton: {
        outline: 'none!important',
        height: "4vw",
        borderRadius: '0px',
        padding: "0.5vw 1vw"
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
    }

}));


const StyledMenu = withStyles({
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
    />
));
const StyledMenuItem = withStyles(theme => ({
    root: {
        padding: "0px!important",
        width: "100%",
        '&:focus': {
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
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


/** HelpMenu function  is used to render the Help menu which contains FAQ , Glossary in the top tool bar of the tool */

function HelpMenu() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const gotoFAQ = () => {
        history.push("/RTM/extras/FAQ")
    };
    return (
        <div className={classes.root}>
            <HtmlTooltip title={<FormattedMessage {...messages.toolTip} />}>
                <IconButton id={"seleniumHelpMenuButton"} onClick={handleClick} aria-controls="customized-menu"
                            aria-haspopup="true" variant="contained" className={classes.iconButton}
                >
                    <HelpOutlineOutlinedIcon className={classes.iconSize}/>
                </IconButton>
            </HtmlTooltip>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Grid container justify="center" alignContent="center" style={{minWidth: "200px", width: "200px"}}>
                    <StyledMenuItem onClick={gotoFAQ}>
                        <Grid item container justify="center" alignContent="center">
                            <Grid item container justify="flex-end" xs={3}> <QuestionAnswerIcon
                                className={classes.small}/></Grid>
                            <Grid item container justify="center" xs={9}> <Typography variant="caption"
                                                                                      className={classes.label}>
                                <FormattedMessage {...messages.faq} />
                            </Typography></Grid>
                        </Grid>
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => history.push("/RTM/extras/DataGlossary")}>
                        <Grid item container justify="center" alignContent="center">
                            <Grid item container justify="flex-end" xs={3}> <LocalLibraryIcon
                                className={classes.small}/></Grid>
                            <Grid item container justify="center" xs={9}> <Typography variant="caption"
                                                                                      className={classes.label}>
                                <FormattedMessage {...messages.glossary} />
                            </Typography></Grid>
                        </Grid>
                    </StyledMenuItem>
                </Grid>
            </StyledMenu>
        </div>
    );
}

HelpMenu.propTypes = {};

export default memo(HelpMenu);
