/**
 *
 * FaqModule
 *
 */

import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";

import {useInjectSaga} from "../../utils/injectSaga";
import {useInjectReducer} from "../../utils/injectReducer";
import makeSelectFaqModule, {
    makeSelectFaqModuleFetchDataFailed,
    makeSelectFaqModuleFetchDataSpinnerState, makeSelectFaqModuleOperationSpinnerState,
    makeSelectFaqModuleTableData
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {faqFetchData, faqHandleOperations} from "./actions";
import {SyncLoader} from "react-spinners";
import NoDataAlert from "../../components/NoDataAlert";
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from "@material-ui/core/Tooltip";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {FormattedMessage} from "react-intl";
import messages from "./messages";

/** Styles class*/
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    faqPannel: {
        padding: '24px'
    },
    faq: {
        fontSize: '0.8vw',
        fontFamily: 'MarsCentra-Book',
    },
    largeAddIcon: {
        fontSize: "5vw"
    },
    smallAddIcon: {
        fontSize: "2vw"
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
    dialogLabel: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.9vw',
    },
    buttonStyle: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.8vw',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff"
    },
}));


export function FaqModule({
                              //actions
                              faqFetchData, faqHandleOperations,
                              //selectors
                              FaqModuleTableData, FaqModuleFetchDataSpinnerState,
                              FaqModuleFetchDataFailed, FaqModuleOperationSpinnerState
                          }) {
    useInjectReducer({key: "faqModule", reducer});
    useInjectSaga({key: "faqModule", saga});
    const classes = useStyles();
    useEffect(() => {
        if (FaqModuleTableData.length === 0) {
            faqFetchData();
        }
    }, []);

    const [openAddFAQ, setOpenAddFAQ] = useState({open: false, type: ""});

    const handleOpenAddFAQ = (type, FAQ = null) => {
        if (type === "edit") {
            setFAQ({...FAQ, faq_id: FAQ["faq_id"]});
        }
        setOpenAddFAQ(
            {open: true, type: type}
        );
    };

    const handleCloseAddFAQ = () => {
        setOpenAddFAQ(
            {open: false, type: "edit"}
        );
        setFAQ({faq_qn: "", faq_answer: "", faq_id: ""});
    };

    const [FAQ, setFAQ] = useState({faq_qn: "", faq_answer: "", faq_id: ""});

    const handleFAQQn = (event) => {
        setFAQ({...FAQ, faq_qn: event.target.value})
    };

    const handleFAQAnswer = (event) => {
        setFAQ({...FAQ, faq_answer: event.target.value})
    };

    const handleSubmitButton = () => {
        if (openAddFAQ["type"] === "edit") {
            faqHandleOperations({...FAQ, status: "1"})
        } else {
            faqHandleOperations({...FAQ, status: "0"})
        }
        handleCloseAddFAQ();
    };

    const [openDeleteFAQDialog, setOpenDeleteFAQDialog] = useState(false);

    const handleOpenDeleteDialog = (FAQ) => {
        setFAQ({...FAQ, faq_id: FAQ["faq_id"]});
        setOpenDeleteFAQDialog(true);
    };

    const handleDeleteFAQ = () => {
        faqHandleOperations({...FAQ, status: "-1"});
        handleCancelDeleteFAQ();
    };

    const handleCancelDeleteFAQ = () => {
        setFAQ({faq_qn: "", faq_answer: "", faq_id: ""});
        setOpenDeleteFAQDialog(false);
    };

    const [panelState, setPanelState] = useState({});
    const handleOnChangeExpansionPanel = (panelKey, value) => {
        let panel = {...panelState};
        panel[panelKey] = !value;
        setPanelState(panel);
    };

    return (
        <Grid container justif={"center"} alignItems={"center"}>
            <Backdrop open={FaqModuleOperationSpinnerState} className={classes.backdrop}>
                <CircularProgress style={{color: "#fff"}}/>
            </Backdrop>
            {
                (() => {
                    if (FaqModuleFetchDataFailed) {
                        return (
                            <Grid item xs={12} container justify="center"
                                  alignItems="center">
                                <NoDataAlert/>
                            </Grid>
                        );
                    } else {
                        if (FaqModuleFetchDataSpinnerState) {
                            return (
                                <Grid item xs={12} container justify="center" alignItems="center">
                                    <Paper style={{width: "90vw", height: "90vh"}}>
                                        <Grid item container justify="center" alignItems="center"
                                              style={{height: "80vh"}}>
                                            <SyncLoader size={15} margin={2} color="#0000a0" loading/>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            );
                        } else {
                            if (FaqModuleTableData.length === 0) {
                                return (
                                    <Grid item xs={12} container justify="center" alignItems="center">
                                        <Paper style={{width: "90vw", height: "90vh"}}>
                                            <Grid item container justify="center" alignItems="center"
                                                  style={{height: "80vh"}}>
                                                <IconButton onClick={() => handleOpenAddFAQ("add")}>
                                                    <AddBoxIcon className={classes.largeAddIcon}/>
                                                </IconButton>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                );
                            } else {
                                return (
                                    <Grid item xs={12} container justif={"center"} alignItems={"center"}>
                                        <Grid item container justify={"flex-end"} alignItems={"center"}>
                                            <IconButton
                                                onClick={() => handleOpenAddFAQ("add")}>
                                                <AddBoxIcon className={classes.smallAddIcon}/>
                                            </IconButton>
                                            <Typography noWrap className={classes.dialogLabel}>
                                                <FormattedMessage {...messages.addFaq} />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} container justif={"center"} alignItems={"center"}
                                              style={{width: "100%"}}>
                                            {
                                                FaqModuleTableData.map((item, index) => {
                                                    return (
                                                        <ExpansionPanel style={{width: "100%"}}
                                                                        onChange={(event, expanded) => {
                                                                            handleOnChangeExpansionPanel(index, expanded)
                                                                        }}>
                                                            <ExpansionPanelSummary
                                                                // expandIcon={<ArrowDropDownIcon/>}
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"
                                                            >
                                                                <Grid item xs={12} container justif={"center"}
                                                                      alignItems={"center"}>
                                                                    <Grid item xs={10}>

                                                                        <Typography
                                                                            className={classes.faq}>
                                                                            {
                                                                                (panelState[index]===undefined ||  panelState[index] === true) && <span
                                                                                    style={{paddingRight: "0.2vw"}}><ArrowDropDownIcon/></span>
                                                                            }
                                                                            {
                                                                                ( panelState[index] === false) && <span
                                                                                    style={{paddingRight: "0.2vw"}}><ArrowDropUpIcon/></span>
                                                                            }

                                                                            {item["faq_qn"]}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={2} container justify={"flex-end"}
                                                                          alignItems={"center"}>
                                                                        <IconButton
                                                                            onClick={() => handleOpenAddFAQ("edit", item)}>
                                                                            <EditIcon/>
                                                                        </IconButton>
                                                                        <IconButton
                                                                            onClick={() => handleOpenDeleteDialog(item)}>
                                                                            <DeleteIcon/>
                                                                        </IconButton>
                                                                    </Grid>
                                                                </Grid>
                                                            </ExpansionPanelSummary>
                                                            <ExpansionPanelDetails>
                                                                <Typography className={classes.faq}>
                                                                    {item["faq_answer"]}
                                                                </Typography>
                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>
                                                    );
                                                })
                                            }
                                        </Grid>

                                    </Grid>
                                );

                            }
                        }
                    }
                })()
            }
            <Dialog
                open={openAddFAQ["open"]}
                // onClose={handleCloseAddFAQ}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='xl'
            >
                <DialogTitle id="form-dialog-title">
                    <Typography className={classes.dialogHeading}>
                        {openAddFAQ["type"] === "edit" ? <FormattedMessage {...messages.editFaq} /> : <FormattedMessage {...messages.addNewFaq} />}
                    </Typography></DialogTitle>
                <DialogContent>
                    <Grid container justify={"center"} alignItems={"center"} spacing={2}>
                        <Grid container justify={"center"} alignItems={"center"} item xs={12}>
                            <TextField
                                id="FAQ-Question"
                                label={<FormattedMessage {...messages.faqQuestion} />}
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    classes: {
                                        input: classes.textFieldInput,
                                    },
                                }}
                                className={classes.textField}
                                required
                                onChange={handleFAQQn}
                                value={FAQ["faq_qn"]}
                            />
                        </Grid>
                        <Grid container justify={"center"} alignItems={"center"} item xs={12}>
                            <TextField
                                id="FAQ-Answer"
                                label={<FormattedMessage {...messages.faqAnswer} />}
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    classes: {
                                        input: classes.textFieldInput,
                                    },
                                }}
                                className={classes.textField}
                                required
                                onChange={handleFAQAnswer}
                                value={FAQ["faq_answer"]}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="outlined" onClick={handleCloseAddFAQ} size={"small"}
                            className={classes.buttonStyle}>
                        <FormattedMessage {...messages.cancel} />
                    </Button>
                    <Button color="primary" variant="contained" onClick={handleSubmitButton} size={"small"}
                            disabled={!(FAQ["faq_answer"] && FAQ["faq_qn"])}
                            className={classes.buttonStyle}>
                        <FormattedMessage {...messages.submit} />
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openDeleteFAQDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography className={classes.dialogHeading}>
                        <FormattedMessage {...messages.deleteThisFaq} />
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs zeroMinWidth>
                            <Tooltip title={FAQ["faq_qn"]} arrow>
                                <Typography noWrap className={classes.dialogLabel}>
                                    {FAQ["faq_qn"]}
                                </Typography>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDeleteFAQ} variant="outlined" color="primary" size={"small"} autoFocus
                            className={classes.buttonStyle}>
                        <FormattedMessage {...messages.cancel} />
                    </Button>
                    <Button onClick={handleDeleteFAQ} color="secondary" variant="contained" size={"small"}
                            className={classes.buttonStyle}>
                        <FormattedMessage {...messages.delete} />
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

FaqModule.propTypes = {
    faqFetchData: PropTypes.func,
    faqHandleOperations: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
    faqModule: makeSelectFaqModule(),
    FaqModuleTableData: makeSelectFaqModuleTableData(),
    FaqModuleFetchDataSpinnerState: makeSelectFaqModuleFetchDataSpinnerState(),
    FaqModuleFetchDataFailed: makeSelectFaqModuleFetchDataFailed(),
    FaqModuleOperationSpinnerState: makeSelectFaqModuleOperationSpinnerState()
});

function mapDispatchToProps(dispatch) {
    return {
        faqFetchData: () => dispatch(faqFetchData()),
        faqHandleOperations: (data) => dispatch(faqHandleOperations(data))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(withConnect)(FaqModule);
