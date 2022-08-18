import React, {memo} from "react";
import {Redirect, Route} from "react-router-dom";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {compose} from "redux";
import {deleteAllCookies, getCookie, logout} from "../../utils/cookieUtilities";
import HeaderDrawer from "../../components/HeaderDrawer";
import FaqModule from "../FaqModule/Loadable";
import AdminPage from "../AdminModule/AdminPage/Loadable";
import UserManagement from "../AdminModule/UserManagement/Loadable";
import UserPreferences from "../AdminModule/UserPreferences/Loadable";
import DataGlossary from "../DataGlossary/Loadable";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    makeSelectAppAlerts,
    makeSelectCurrentPanel,
    makeSelectDataExceptionHandlingDialogOpen,
    makeSelectExplainModuleState,
    makeSelectMainDrawerState,
    makeSelectPinMyViewParams,
    makeSelectPinMyViewPinNameDialogOpen,
} from "./selectors";
import {
    changePanel,
    closeMainDrawer,
    dataExceptionHandlingDialog,
    handleExplainModule,
    openMainDrawer,
    pinMyViewCloseDialog,
    pinMyViewConfirm,
    showAppAlert
} from "./actions";
import PropTypes from "prop-types";
import history from "../../utils/history";
import RightDrawer from "../../components/RightDrawer";
import {navBarLinkData} from "../../utils/NavBarLinkData";
import Inbox from "../Inbox/Loadable";
import config from "../../config.json";

import * as Sentry from "@sentry/browser";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useInjectSaga} from "../../utils/injectSaga";
import saga from "./saga";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import Training from '../Training/Loadable'
import ModuleDemo from "../../components/ModuleDemo/Loadable";
import PerformanceSummary from "../PerformanceSummary/Loadable";
import BrandView from "../BrandView/Loadable";
import BrandDeepDivePage from "../BrandDeepDivePage/Loadable";
import DistributorView from "../DistributorView/Loadable";
import DistributorDeepDivePage from "../DistributorDeepDivePage/Loadable";
import StoreView from "../StoreView/Loadable";
import StoreDeepDivePage from "../StoreDeepDivePage/Loadable";
import MyPage from "../MyPage/Loadable";
import MyPinnedViews from "../MyPinnedViews/Loadable";
import PocView from "../PocView/Loadable";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Button, TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Icon from "@mdi/react";
import {mdiTools} from '@mdi/js';
import {makeSelectLocale} from "../LanguageProvider/selectors";
import {changeLocale} from "../LanguageProvider/actions";
import AppMessages from "./messages";
import {injectIntl} from "react-intl";
const {siteId, basePath} = config;

let user = {userID: "user.test@test.com"};

try {
    user = JSON.parse(getCookie("UserCred"));
} catch (e) {

}


Sentry.configureScope(function (scope) {
    scope.setUser({"email": user.userID});
});


/** Styles class*/
const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: "19.5vw",
    },
    alert: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '1vw',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff"
    },
    textField: {
        backgroundColor: "#fff",
        width: '100%',
        float: 'left',
        borderRadius: '0.3vw'
    },
    textFieldInput: {
        fontSize: '0.8vw',
        fontFamily: 'MarsCentra-Book',
        color: "#000",
        backgroundColor: "#FFF",

    },
    dialogHeading: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1vw',
    },
    alertDialogHeading: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1.5vw',
        color:'#a8071a'
    },
    dialogLabel: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.9vw',
    },
    buttonStyle: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.8vw',
    },

}));


function MainApp({
                     OpenDrawer, CloseDrawer, mainDrawerState, CurrentPanel, ChangePanel, Alerts, ShowAppAlert,
                      ExplainModuleState, handleExplainModule, pinMyViewConfirm, pinMyViewCloseDialog, PinMyViewPinNameDialogOpen, PinMyViewParams,
                     DataExceptionHandlingDialogOpen,changeLocale,Locale,intl
                 }) {
    useInjectSaga({key: "mainApp", saga});


    const Auth = getCookie("token") !== undefined;
    if (!Auth) {
        logout();
        window.location.href = basePath;
    }
    const isAdmin = JSON.parse(getCookie("UserCred"))["role"] === "super_user";

    if (!isAdmin && history.location.pathname === "/settings/admin") {
        history.goBack();
    }
    const path = history.location.pathname.split("/").splice(1);
    let module = path[0];
    let userInfo;
    try {
        userInfo = JSON.parse(getCookie("UserCred"));
    } catch (e) {
        deleteAllCookies();
        history.push("/");
    }

    React.useEffect(() => {
        const script = document.createElement("script");
        script.innerHTML = ` var _paq = window._paq || [];
  paq.push(['setUserId', '${userInfo.userID}']);
  _paq.push(["setCustomVariable", 1, "username", "${userInfo.userID}","visit"]);
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//brazil-rtm.eastus2.cloudapp.azure.com/matomo/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '${siteId}']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();`;
    }, []);

    const [openFilter, setOpenFilter] = React.useState(true);


    const toggleTopFilters = () => {
        setOpenFilter(!openFilter);
    };

    const classes = useStyles();

    const [pinName, setPinName] = React.useState("");

    const handlePinPageNameInput = (event) => {
        setPinName(event.target.value);
    };

    return (
        <HeaderDrawer
            open={mainDrawerState}
            handleDrawerOpen={OpenDrawer}
            handleDrawerClose={CloseDrawer}
            activePanel={CurrentPanel}
            handleActivePanelChange={ChangePanel}
            userInfo={userInfo}
            locale={Locale}
            changeLocale={changeLocale}
        >
            <RightDrawer
                linkList={navBarLinkData(module)}
                mainDrawerOpen={mainDrawerState}
                toggleTopFilters={toggleTopFilters}
                openFilter={openFilter}
                handleExplainModule={handleExplainModule}
            >
                <Snackbar open={Alerts.open} autoHideDuration={4000} onClose={() => {
                    ShowAppAlert({
                        open: false,
                        severity: "",
                        message: ""
                    })
                }}>
                    <MuiAlert elevation={6} variant="filled"
                              severity={Alerts.severity} className={classes.alert}> {Alerts.message} </MuiAlert>
                </Snackbar>
                <Route exact path="/RTM/PerformanceSummary" component={PerformanceSummary}/>
                <Route exact path="/RTM/BrandView" component={BrandView}/>
                <Route exact path="/RTM/BrandDeepDive" component={BrandDeepDivePage}/>
                <Route exact path="/RTM/DistributorView" component={DistributorView}/>
                <Route exact path="/RTM/DistributorDeepDive" component={DistributorDeepDivePage}/>
                <Route exact path="/RTM/StoreView" component={StoreView}/>
                <Route exact path="/RTM/StoreDeepDive" component={StoreDeepDivePage}/>
                <Route exact path="/RTM/MyPage" component={MyPage}/>
                <Route exact path="/RTM/MyPinnedViews" component={MyPinnedViews}/>
                <Route exact path="/RTM/extras/FAQ" component={FaqModule}/>
                <Route exact path="/RTM/extras/DataGlossary" component={DataGlossary}/>
                <Route exact path="/RTM/extras/Training" component={Training}/>
                <Route
                    exact
                    path="/settings"
                    render={({location}) => (
                        <Redirect
                            to={{pathname: "/settings/admin", state: {from: location}}}
                        />
                    )}
                />
                <Route exact path="/settings/admin" component={AdminPage}/>
                <Route
                    exact
                    path="/settings/UserManagement"
                    component={UserManagement}
                />
                <Route
                    exact
                    path="/settings/UserPreferences"
                    component={UserPreferences}
                />
                <Route exact path="/notifications/inbox" component={Inbox}/>
                <Route exact path="/notifications/alerts" component={Alerts}/>
                <Route exact path="/RTM/POCView" component={PocView}/>
            </RightDrawer>

            <ModuleDemo open={ExplainModuleState} onClose={() => handleExplainModule(false)}/>
            <Dialog
                open={PinMyViewPinNameDialogOpen}
                // onClose={() => pinMyViewCloseDialog()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogTitle id="form-dialog-title">
                    <Typography className={classes.dialogHeading}>
                        Pin this View : {PinMyViewParams['viewName']}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="pinName"
                        label={intl.formatMessage({...AppMessages[`pinViewName`]})}
                        autoFocus
                        fullWidth
                        InputProps={{
                            classes: {
                                input: classes.textFieldInput,
                            },
                        }}
                        className={classes.textField}
                        required
                        onChange={handlePinPageNameInput}
                        value={pinName}
                    />
                    <Typography style={{fontSize: '0.7vw', fontFamily: 'MarsCentra-Book', color: '#a8071a'}}>{intl.formatMessage({...AppMessages[`pinDisclaimer`]})} *</Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="outlined" onClick={() => {
                        setPinName("");
                        pinMyViewCloseDialog();
                    }} size={"small"}
                            className={classes.buttonStyle}>
                        {intl.formatMessage({...AppMessages[`cancel`]})}
                    </Button>
                    <Button color="primary" variant="contained" onClick={() => {
                        pinMyViewConfirm(pinName);
                        setPinName("");
                        pinMyViewCloseDialog();
                    }} size={"small"}
                            disabled={!(pinName && pinName.length > 5)}
                            className={classes.buttonStyle}>
                        {intl.formatMessage({...AppMessages[`submit`]})}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={DataExceptionHandlingDialogOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{background:'#CACCCE'}}
            >
                <DialogTitle id="form-dialog-title" style={{alignItems:"center"}}>
                    <Typography className={classes.alertDialogHeading} align={"center"}>
                        {intl.formatMessage({...AppMessages[`maintenanceAlert`]})}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <div style={{alignItems:'center'}} align="center">
                        <Icon path={mdiTools} title="Maintenance" size={3} horizontal color="rgba(242, 201, 76, 0.9)"/>

                    </div>
                    <Typography style={{fontSize: '1vw', fontFamily: 'MarsCentra-Book', color: '#0000a0'}}>
                        {intl.formatMessage({...AppMessages[`underMaintenance`]})}
                        <br/>
                        {intl.formatMessage({...AppMessages[`maintenanceReason`]})} :
                        <br/>
                        1.  {intl.formatMessage({...AppMessages[`maintenanceR1`]})}
                        <br/>
                        2.  {intl.formatMessage({...AppMessages[`maintenanceR2`]})}
                        <br/>
                        {intl.formatMessage({...AppMessages[`maintenanceRefresh`]})}
                    </Typography>
                </DialogContent>
            </Dialog>

        </HeaderDrawer>
    );
}

const mapStateToProps = createStructuredSelector({
    mainDrawerState: makeSelectMainDrawerState(),
    CurrentPanel: makeSelectCurrentPanel(),
    Alerts: makeSelectAppAlerts(),
    ExplainModuleState: makeSelectExplainModuleState(),
    PinMyViewPinNameDialogOpen: makeSelectPinMyViewPinNameDialogOpen(),
    DataExceptionHandlingDialogOpen: makeSelectDataExceptionHandlingDialogOpen(),
    PinMyViewParams: makeSelectPinMyViewParams(),
    Locale:makeSelectLocale()
});

function mapDispatchToProps(dispatch) {
    return {
        OpenDrawer: () => dispatch(openMainDrawer()),
        CloseDrawer: () => dispatch(closeMainDrawer()),
        ChangePanel: (data) => dispatch(changePanel(data)),
        ShowAppAlert: (data) => dispatch(showAppAlert(data)),
        handleExplainModule: (data) => dispatch(handleExplainModule(data)),
        pinMyViewConfirm: (data) => dispatch(pinMyViewConfirm(data)),
        pinMyViewCloseDialog: () => dispatch(pinMyViewCloseDialog()),
        dataExceptionHandlingDialog: () => dispatch(dataExceptionHandlingDialog()),
        changeLocale:(data)=>dispatch(changeLocale(data))
    };
}

MainApp.propTypes = {
    OpenDrawer: PropTypes.func,
    CloseDrawer: PropTypes.func,
    ChangePanel: PropTypes.func,
    ShowAppAlert: PropTypes.func,
    handleExplainModule: PropTypes.func,
    pinMyViewConfirm: PropTypes.func,
    pinMyViewCloseDialog: PropTypes.func,
    dataExceptionHandlingDialog: PropTypes.func,
    changeLocale: PropTypes.func,
};
const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    withConnect,
    memo
)(injectIntl(MainApp));
