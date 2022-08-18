/**
 *
 * SignUp
 *
 */

import React, {memo} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import Tooltip from "@material-ui/core/Tooltip";
import {useInjectSaga} from "../../utils/injectSaga";
import {useInjectReducer} from "../../utils/injectReducer";
import makeSelectSignUp, {makeSelectSignUpAlerts} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'
import {addNewOrg, fetchApprover, fetchOrgList, showSignUpAlert, submitUserAccessRequest} from "./actions";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {getToken} from "../../adalConfig";
import jwtDecode from "jwt-decode";
import {SyncLoader} from "react-spinners";
import {FormattedMessage, injectIntl} from "react-intl";
import messages from "./messages";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {makeSelectLocale} from "../LanguageProvider/selectors";
import {changeLocale} from "../LanguageProvider/actions";
import IconButton from "@material-ui/core/IconButton";
import TranslateIcon from "@material-ui/icons/Translate";
import {withStyles} from "@material-ui/core/styles";
import clsx from "clsx";

/** Styles class*/
const useStyles = makeStyles((theme) => ({
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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        minWidth: "100%",
    },
    alert: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '1vw',
    },
    noDataAlert: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.6vw',
    }, appBar:
        {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            backgroundColor: "#fff",
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
    dropDownBreadCrumb: {
        [theme.breakpoints.down('sm')]: {},
    },
}));

export function SignUp({signUp, submitUserAccessRequest, showSignUpAlert, SignUpAlerts, fetchOrgList, addNewOrg, fetchApprover, locale, changeLocale, intl}) {
    console.log("loc", locale);

    useInjectReducer({key: "signUp", reducer});
    useInjectSaga({key: "signUp", saga});

    const classes = useStyles();

    const [org, setOrg] = React.useState("");
    const [approver, setApprover] = React.useState(null);

    const [userDetails, setUserDetails] = React.useState({fName: "", lName: "", email: "", token: ""});
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
    const onSubmit = () => {
        const encryptedToken = getToken();
        const decryptedToken = jwtDecode(encryptedToken);
        submitUserAccessRequest({
            organization: org.value,
            email: decryptedToken["unique_name"],
            user: decryptedToken['name'],
            role: "",
            approved_by: approver.value,
            approver_name: approver.label,
            status: 0
        });
    };
    React.useEffect(() => {
        fetchOrgList();
        fetchApprover(org);
        const encryptedToken = getToken();
        const decryptedToken = jwtDecode(encryptedToken);
        if (decryptedToken.hasOwnProperty("given_name") && decryptedToken.hasOwnProperty("given_name")) {
            setUserDetails({
                fName: decryptedToken["given_name"],
                lName: decryptedToken["family_name"],
                email: decryptedToken["unique_name"],
                token: encryptedToken
            });
        } else if (decryptedToken.hasOwnProperty("name")) {
            let name = decryptedToken["name"].split(" ");
            setUserDetails({
                fName: name[0],
                lName: name[1],
                email: decryptedToken["unique_name"],
                token: encryptedToken
            });

        } else {
            let name = decryptedToken["unique_name"].split("@")[0];
            name = name.split(".");
            setUserDetails({
                fName: name[0],
                lName: name[1],
                email: decryptedToken["unique_name"],
                token: encryptedToken
            });
        }

    }, []);

    const handleChangeOrg = (newValue) => {
        setOrg(newValue);
    };
    const handleCreateOrg = (inputValue) => {
        addNewOrg(inputValue);
    };
    const handleChangeApprover = (value) => {
        setApprover(value);
    };
    return (
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
            <Container component="main" maxWidth="xs">

                <Snackbar open={SignUpAlerts.open} autoHideDuration={4000} onClose={() => {
                    showSignUpAlert({
                        open: false,
                        severity: "",
                        message: ""
                    })
                }}>
                    <MuiAlert elevation={6} variant="filled"
                              severity={SignUpAlerts.severity}
                              className={classes.alert}> {SignUpAlerts.message} </MuiAlert>
                </Snackbar>
                <CssBaseline/>

                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {intl.formatMessage({...messages[`signUp`]})}
                    </Typography>
                    <div className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label={intl.formatMessage({...messages[`firstName`]})}
                                    value={userDetails.fName}
                                    disabled
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label={intl.formatMessage({...messages[`lastName`]})}
                                    name="lastName"
                                    autoComplete="lname"
                                    value={userDetails.lName}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label={intl.formatMessage({...messages[`email`]})}
                                    name="email"
                                    autoComplete="email"
                                    value={userDetails.email}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    (() => {
                                        if (!signUp['orgListFetchDataFailed']) {
                                            if (!signUp['orgListFetchSpinnerState']) {
                                                return (
                                                    <CreatableSelect
                                                        isClearable
                                                        isDisabled={false}
                                                        isLoading={signUp['orgListFetchSpinnerState']}
                                                        onChange={handleChangeOrg}
                                                        onCreateOption={handleCreateOrg}
                                                        options={signUp['orgList']}
                                                        value={org}
                                                    />
                                                )
                                            } else {
                                                return (<div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}>
                                                    <SyncLoader size={10} margin={2} color="#0000a0"
                                                                loading/>
                                                </div>)
                                            }
                                        } else {
                                            return (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}>
                                                    <Typography className={classes.noDataAlert}>
                                                        <FormattedMessage {...messages.fetchFail} />
                                                    </Typography>
                                                </div>
                                            )
                                        }
                                    })()
                                }

                            </Grid>
                            <Grid item xs={12}>
                                {
                                    (() => {
                                        if (!signUp['approverFetchDataFailed']) {
                                            if (!signUp['approverFetchSpinnerState']) {
                                                return (<Select
                                                    options={signUp['approverList']}
                                                    value={approver}
                                                    onChange={handleChangeApprover}
                                                />)
                                            } else {
                                                return (<div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}>
                                                    <SyncLoader size={10} margin={2} color="#0000a0"
                                                                loading/>
                                                </div>)
                                            }
                                        } else {
                                            return (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}>
                                                    <Typography className={classes.noDataAlert}>
                                                        {intl.formatMessage({...messages[`fetchFail`]})}
                                                    </Typography>
                                                </div>
                                            )
                                        }

                                    })()
                                }

                            </Grid>

                        </Grid>
                        <Button
                            disabled={!(org && approver)}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onSubmit}
                        >
                            {intl.formatMessage({...messages[`signUp`]})}
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}

SignUp.propTypes = {
    submitUserAccessRequest: PropTypes.func,
    showSignUpAlert: PropTypes.func,
    fetchOrgList: PropTypes.func,
    addNewOrg: PropTypes.func,
    fetchApprover: PropTypes.func,
    changeLocale: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
    signUp: makeSelectSignUp(),
    SignUpAlerts: makeSelectSignUpAlerts(),
    locale: makeSelectLocale()
});

function mapDispatchToProps(dispatch) {
    return {
        submitUserAccessRequest: (data) => dispatch(submitUserAccessRequest(data)),
        showSignUpAlert: (data) => dispatch(showSignUpAlert(data)),
        fetchOrgList: () => dispatch(fetchOrgList()),
        addNewOrg: (data) => dispatch(addNewOrg(data)),
        fetchApprover: (data) => dispatch(fetchApprover(data)),
        changeLocale: (data) => dispatch(changeLocale(data))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    withConnect,
    memo)(injectIntl(SignUp));
