/**
 *
 * LoginPage
 *
 */

import React, {memo, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import {useInjectSaga} from "../../utils/injectSaga";
import {useInjectReducer} from "../../utils/injectReducer";
import makeSelectLoginPage, {
    makeSelectAuth,
    makeSelectLoginFailed,
    makeSelectLoginFailedMessage,
    makeSelectLoginLoading
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {closeGFailedWarningDialog, loginUser} from "./actions"
import Paper from "@material-ui/core/Paper";
import OverLaySpinner from "../../components/OverLaySpinner/Loadable";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import history from "../../utils/history";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormGroup from "@material-ui/core/FormGroup";
import {FormLabel} from "@material-ui/core";
import messages from "./messages";
import {FormattedMessage} from "react-intl";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import TranslateIcon from "@material-ui/icons/Translate";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import {changeLocale} from "../LanguageProvider/actions";
import {makeSelectLocale} from "../LanguageProvider/selectors";
import Tooltip from "@material-ui/core/Tooltip";


function Mars() {
    return (
        <img height={65}
             src="https://www.mars.com/sites/g/files/jydpyr316/files/Mars%20Wordmark%20RGB%20Blue.png"
             alt="Mars logo"
        />
    );
}

/** Styles class*/
const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    heading: {
        fontFamily: 'MarsCentra-Extrabold',
        fontSize: '25px',
        color: 'rgb(0,0,160)'
    },
    subheading: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '14px',
        color: 'rgb(0,0,160)'
    },
    dialogHeading: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1vw',
    },
    dialogText: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.8vw',
    },
    dialogButton: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.9vw',
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
    },
    iconButton: {
        outline: 'none',
        height: "2vw",
        borderRadius: '0px',
        padding: "5px 20px",
    }, iconSize: {
        fontSize: "2vw",
        [theme.breakpoints.down("xs")]: {
            fontSize: "20px"
        },
    },
    appBar:
        {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            backgroundColor: "#fff",
        },
}));


export function LoginPage({
                              LoginUser, Loading, Failed,
                              FailedMessage,
                              CloseWarningDialog, locale, changeLocale, loginPage
                          }) {
    useInjectReducer({key: "loginPage", reducer});
    useInjectSaga({key: "loginPage", saga});

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [tokenExpiredState, setTokenExpiredState] = React.useState(false)
    const classes = useStyles();
    useEffect(() => {
        // const tokenExpired = getCookie("tokenExpired");
        // let tempTokenExpired = !!tokenExpired;
        // setTokenExpiredState(tempTokenExpired);
        // LoginUser();
    }, []);


    const handleClickLang = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseLang = () => {
        setAnchorEl(null);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleCloseEl = () => {
        setAnchorEl(null);
    };
    const handleLang = (value) => {
        changeLocale(value);
        handleCloseLang();
    };

    const formatLanguage = (value) => {
        switch (value) {
            case 'en':
                return 'English';
            case 'pt':
                return 'Português';

        }
    };


    function handleSubmit(event) {
        event.preventDefault();
        LoginUser();
    }

    //
    //
    // function handleEmailChange(e) {
    //     setEmail(e.target.value);
    // }
    //
    // function handlePasswordChange(e) {
    //     setPassword(e.target.value);
    // }

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
    const handleDialogButton = () => {
        history.push("/signUp")
    };

    const handleClose = () => {
        CloseWarningDialog()
    };
    return (
        <OverLaySpinner active={Loading}>
            <div>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar className={classes.appBar}>
                        <Grid container alignItems={"center"} justify={"flex-end"}>
                            <IconButton id={"seleniumLanguageButton1"} onClick={handleClickLang}
                                        variant="contained" className={classes.iconButton}>
                                <TranslateIcon className={classes.iconSize}/>
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleCloseEl}
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
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Grid style={{height: '100vh'}} container justify='center' direction="column" alignItems="center">

                    <Paper elevation={2} style={{margin: 'auto', width: 'auto', padding: '2vw'}}>
                        <Grid container justify='center' direction="column" alignItems="center">
                            <Grid item>
                                <Mars/>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.subheading}>RTM</Typography>
                            </Grid>
                            <Grid item>
                                {/*<Paper elevation={2} style={{margin: 'auto', width: 'auto', padding: '2px'}}>*/}
                                <Container component="main" maxWidth="xs"
                                           style={{justifyContent: 'center', alignContent: 'center'}}>
                                    <CssBaseline/>
                                    <Grid>
                                        {/*<Typography style={{*/}
                                        {/*    fontFamily: 'MarsCentra-Bold',*/}
                                        {/*    fontSize: 14,*/}
                                        {/*    paddingTop: '12px',*/}
                                        {/*    marginTop: '30px'*/}
                                        {/*}} component="h1" variant="h5">*/}
                                        {/*    Sign in*/}
                                        {/*</Typography>*/}
                                        {/*<br/>*/}
                                        <form onSubmit={handleSubmit} className={classes.form}>
                                            {/*<FormGroup controlId="email">*/}
                                            {/*    <Typography style={{fontFamily: 'MarsCentra-Book', fontSize: 12}}>Email address*/}
                                            {/*        or username</Typography>*/}
                                            {/*    <FormControl*/}
                                            {/*        style={{marginBottom: '40px'}}*/}
                                            {/*        autoFocus*/}
                                            {/*        type="string"*/}
                                            {/*        value={email}*/}
                                            {/*        onChange={handleEmailChange}*/}
                                            {/*    />*/}
                                            {/*</FormGroup>*/}
                                            {/*<FormGroup controlId="password">*/}
                                            {/*    <Typography*/}
                                            {/*        style={{fontFamily: 'MarsCentra-Book', fontSize: 12}}>Password</Typography>*/}
                                            {/*    <FormControl*/}
                                            {/*        style={{marginBottom: '60px'}}*/}
                                            {/*        value={password}*/}
                                            {/*        onChange={handlePasswordChange}*/}
                                            {/*        type="password"*/}
                                            {/*    />*/}
                                            {/*</FormGroup>*/}
                                            <FormGroup>
                                                <Button style={{
                                                    backgroundColor: 'rgb(0,215,185)',
                                                    color: '#ffffff',
                                                    borderColor: 'rgb(0,215,185)',
                                                    fontFamily: 'MarsCentra-Book',
                                                    fontSize: "0.6vw",
                                                    outline: "none"
                                                }} block type="submit">
                                                    <FormattedMessage {...messages.continue} />
                                                </Button>
                                            </FormGroup>
                                            {
                                                tokenExpiredState && <FormLabel style={{
                                                    padding: "1vw", fontFamily: 'MarsCentra-Book',
                                                    fontSize: "0.6vw", color: '#FF0000',
                                                }}> <FormattedMessage {...messages.tokenExpired} /></FormLabel>

                                            }
                                        </form>
                                    </Grid>
                                </Container>
                                {/*</Paper>*/}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <div>
                    <Dialog open={Loading}
                            aria-labelledby="form-dialog-title">
                        <Grid container justify={"center"} alignItems={"center"}
                              style={{minWidth: "10vw", minHeight: "6vw"}}>
                            <Typography className={classes.dialogText} style={{marginRight: "1vw"}}>
                                <FormattedMessage {...messages.authenticating} />
                            </Typography>
                            <CircularProgress color={"primary"} size={20}/>
                        </Grid>
                    </Dialog>
                    <Dialog open={Failed} onClose={handleClose}
                            aria-labelledby="form-dialog-title">
                        <>
                            <DialogTitle id="form-dialog-title">
                                <Typography className={classes.dialogHeading}>
                                    <FormattedMessage {...messages.authenticationFailed} />
                                </Typography> </DialogTitle>
                            <DialogContent>
                                <DialogContentText className={classes.dialogText}>
                                        <FormattedMessage {...messages[`${FailedMessage}`]} />
                                </DialogContentText>
                            </DialogContent>
                            {

                                (() => {
                                    if (loginPage['status'] === -1) {
                                        return (
                                            <DialogActions>
                                                <Button className={classes.dialogButton}
                                                        onClick={handleDialogButton}
                                                        color="primary" variant={"outlined"}>
                                                    <FormattedMessage {...messages.subscribe} />
                                                </Button>
                                            </DialogActions>
                                        );
                                    } else return null;
                                })()
                            }
                        </>
                    </Dialog>
                </div>
            </div>
        </OverLaySpinner>
    );
}


LoginPage.propTypes = {
    LoginUser: PropTypes.func,
    IsAUTH: PropTypes.bool,
    changeLocale: PropTypes.func
};

export const mapStateToProps = createStructuredSelector({
    loginPage: makeSelectLoginPage(),
    IsAUTH: makeSelectAuth(),
    Loading: makeSelectLoginLoading(),
    Failed: makeSelectLoginFailed(),
    FailedMessage: makeSelectLoginFailedMessage(),
    locale: makeSelectLocale()
});

export function mapDispatchToProps(dispatch) {
    return {

        LoginUser: (user) => {
            dispatch(loginUser(user))
        },
        CloseWarningDialog: () => dispatch(closeGFailedWarningDialog()),
        changeLocale: (data) => dispatch(changeLocale(data))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    withConnect,
    memo
)(LoginPage);
