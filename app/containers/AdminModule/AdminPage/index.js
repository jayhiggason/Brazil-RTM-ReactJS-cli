/**
 *
 * AdminPage
 *
 */

import React, {memo} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";

import {useInjectSaga} from "../../../utils/injectSaga";
import {useInjectReducer} from "../../../utils/injectReducer";
import {
    makeSelectAdminPageCurrentTab,
    makeSelectAdminPageUserRequestsFetchSpinner,
    makeSelectAdminPageUsers,
    makeSelectRequests
} from "./selectors";
import {
    adminGetRequestedUsersFetch,
    adminHandleRequest,
    adminHandleTabs,
    approveRequest,
    rejectRequest
} from './actions'
import reducer from "./reducer";
import saga from "./saga";

import {makeStyles} from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Table from '../../../components/Table/Loadable';
import Grid from "@material-ui/core/Grid";
import {makeSelectMainDrawerState} from "../../App/selectors";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import useTheme from "@material-ui/core/styles/useTheme";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
// import Tooltip from "@material-ui/core/Tooltip";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {roleFormatter} from "../../../utils/utility";
import messages from "./messages";
import {injectIntl} from "react-intl";
import AppMessages from "../../App/messages";

/** Styles class*/
const useStyles = makeStyles(theme => ({
    root: {
        // padding: '10px',
        /*width: '100%',*/
    },
    container: {
        maxHeight: 440,
    },
    buttonSpacing: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    header: {
        /*width: 5%,*/
        textAlign: 'center',
        backgroundColor: 'rgb(0, 0, 160)',
        fontSize: '14px',
        fontFamily: 'MarsCentra-Bold',
        color: 'rgb(255, 255, 255)',
    },
    tab: {
        fontSize: "1vw !important",
        fontFamily: 'MarsCentra-Bold',
        textTransform: "capitalize",
        textDecoration: 'none!important',
        outline: "none!important",
        '&:focus &:hover &:visited &:link &:active': {
            textDecoration: 'none!important',
            fontFamily: 'MarsCentra-Bold!important',
        },
    },
    appBar: {
        zIndex: 1000
    },
    dialogHeading: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1vw',
    },
    dialogLabel: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.8vw',
    },
    buttonStyle: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.8vw',
    },
    checkBoxLabel: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.8vw',
    },
    gridBorder: {
        border: "2px solid grey",
        padding: "0.5vw",
        minHeight: "40vh"
    }
}));

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <Grid item container xs={12} justify="center" alignItems="center">
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`scrollable-auto-tabpanel-${index}`}
                aria-labelledby={`scrollable-auto-tab-${index}`}
                {...other} style={{width: "100%"}}
            >
                {value === index && (
                    <Grid item container xs={12} justify="center" alignItems="center">
                        {children}
                    </Grid>
                )}
            </div>
        </Grid>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

export function AdminPage({
                              requests, adminGetRequestedUsersFetch, AdminPageUserRequestsFetchSpinner,
                              adminHandleRequest, AdminPageCurrentTab, adminHandleTabs, AdminPageUsers, ...props
                          }) {

    useInjectReducer({key: "Adminpage", reducer});
    useInjectSaga({key: "Adminpage", saga});

    const theme = useTheme();
    const classes = useStyles();
    React.useEffect(() => {
        if (requests.length === 0) {
            adminGetRequestedUsersFetch();
        }
    }, []);
    const handleChange = (event, newValue) => {
        adminHandleTabs(newValue);
        if (newValue === 1) {
            if (AdminPageUsers.length === 0) {
                adminGetRequestedUsersFetch();
            }
        } else {
            if (requests.length === 0) {
                adminGetRequestedUsersFetch();
            }
        }
    };

    const [request, setRequest] = React.useState({});

    const handleAdminActionButtons = (request) => {
        // let User = JSON.parse(getCookie("UserCred"));
        // let obj = {
        //     ...request,
        //     "approved_by": User.userID
        // };
        setRequest(request);
        if (request["approve"]) {
            setAcceptEdit({open: true, type: 0})
        } else {
            if (request["status"] === 1) {
                setRejectDelete({open: true, type: 1});
            } else {
                setRejectDelete({open: true, type: 0});
            }
        }
    };

    const [rejectDelete, setRejectDelete] = React.useState({open: false, type: ""});

    const handleCancelRejectDeleteRequest = () => {
        setRejectDelete({open: false, type: 0})
    };

    const handleSubmitRejectDeleteRequest = () => {
        adminHandleRequest(request);
        setRejectDelete({open: false, type: 0})
    };

    const [acceptEdit, setAcceptEdit] = React.useState({open: false, type: ""});

    const handleCancelAcceptEdit = () => {
        setAcceptEdit({open: false, type: 0})
    };

    const handleSubmitAcceptEdit = () => {
        adminHandleRequest(request);
        setAcceptEdit({open: false, type: 0})
    };

    const handleChangeRole = (event) => {
        setRequest({...request, role: event.target.value})
    };

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item xs={12} container justify="center" alignItems="center">
                <AppBar className={classes.appBar} position="static" color="default">
                    <Tabs
                        value={AdminPageCurrentTab}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="full width tabs example"
                    >
                        <Tab label={props.intl.formatMessage({...messages[`accessRequest`]})}
                             className={classes.tab} {...a11yProps(0)} />
                        <Tab label={props.intl.formatMessage({...messages[`userManagement`]})}
                             className={classes.tab} {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={AdminPageCurrentTab} index={0} dir={theme.direction}>
                    <Grid container item xs={12} sm={12} md={12}>
                        <Table spinnerState={AdminPageUserRequestsFetchSpinner}
                               name={props.intl.formatMessage({...messages[`accessRequest`]})} data={requests}
                               adminHandleRequest={handleAdminActionButtons} tab={AdminPageCurrentTab}/>
                    </Grid>
                </TabPanel>
                <TabPanel value={AdminPageCurrentTab} index={1} dir={theme.direction}>
                    <Table spinnerState={AdminPageUserRequestsFetchSpinner}
                           name={props.intl.formatMessage({...messages[`userManagement`]})}
                           data={AdminPageUsers}
                           adminHandleRequest={handleAdminActionButtons} tab={AdminPageCurrentTab}/>
                </TabPanel>
            </Grid>

            <Dialog
                open={rejectDelete["open"]}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography className={classes.dialogHeading}>
                        {
                            Number(rejectDelete["type"]) === 1 ? props.intl.formatMessage({...messages[`deleteUser`]}) : props.intl.formatMessage({...messages[`rejectRequest`]})
                        }
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs zeroMinWidth>
                            <Typography noWrap className={classes.dialogLabel}>
                                {request["username"]}
                            </Typography>
                            <Typography noWrap className={classes.dialogLabel}>
                                ({request["email"]})
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelRejectDeleteRequest} variant="outlined" color="primary" size={"small"}
                            autoFocus
                            className={classes.buttonStyle}>
                        {props.intl.formatMessage({...AppMessages[`cancel`]})}
                    </Button>
                    <Button onClick={handleSubmitRejectDeleteRequest} color="secondary" variant="contained"
                            size={"small"}
                            className={classes.buttonStyle}>
                        {props.intl.formatMessage({...messages[`delete`]})}
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={acceptEdit["open"]}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography className={classes.dialogHeading}>
                        {props.intl.formatMessage({...messages[`setRole`]})} {request["username"]} ({request["email"]})
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container alignItems={"center"}>
                        <FormControl required className={classes.formControl}>
                            <InputLabel
                                htmlFor="outlined-age-native-simple"> {props.intl.formatMessage({...messages[`role`]})}</InputLabel>
                            <Select
                                native
                                value={request["role"]}
                                onChange={handleChangeRole}
                                label={props.intl.formatMessage({...messages[`role`]})}
                                name="role"
                                inputProps={{
                                    name: 'role',
                                    id: 'rtm-role',
                                }}

                            >
                                <option value={null}/>
                                <option value={"super_user"}>{roleFormatter("super_user")}</option>
                                <option value={"mars_associate"}>{roleFormatter("mars_associate")}</option>
                                <option value={"customer_admin"}>{roleFormatter("customer_admin")}</option>
                                <option value={"customer_user"}>{roleFormatter("customer_user")}</option>
                            </Select>
                        </FormControl>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelAcceptEdit} variant="outlined" color="primary" size={"small"}
                            autoFocus
                            className={classes.buttonStyle}>
                        {props.intl.formatMessage({...AppMessages[`cancel`]})}
                    </Button>
                    <Button onClick={handleSubmitAcceptEdit} color="primary" variant="contained"
                            size={"small"}
                            className={classes.buttonStyle}
                            disabled={request["role"] === null || request["role"] === ""}>
                        {props.intl.formatMessage({...AppMessages[`submit`]})}
                    </Button>
                </DialogActions>
            </Dialog>

        </Grid>

    );
}

AdminPage.propTypes = {
    onRequestApprovedHandler: PropTypes.func.isRequired,
    onRequestRejectedHandler: PropTypes.func.isRequired,
    adminGetRequestedUsersFetch: PropTypes.func,
    adminHandleRequest: PropTypes.func,
    adminHandleTabs: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
    //adminPage: makeSelectAdminPage(),
    requests: makeSelectRequests(),
    mainDrawerState: makeSelectMainDrawerState(),
    AdminPageUserRequestsFetchSpinner: makeSelectAdminPageUserRequestsFetchSpinner(),
    AdminPageCurrentTab: makeSelectAdminPageCurrentTab(),
    AdminPageUsers: makeSelectAdminPageUsers()
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        onRequestApprovedHandler: (reqID) => dispatch(approveRequest(reqID)),
        onRequestRejectedHandler: (reqID) => dispatch(rejectRequest(reqID)),
        adminGetRequestedUsersFetch: () => dispatch(adminGetRequestedUsersFetch()),
        adminHandleRequest: (data) => dispatch(adminHandleRequest(data)),
        adminHandleTabs: (data) => dispatch(adminHandleTabs(data))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(withConnect, memo)(injectIntl(AdminPage));


