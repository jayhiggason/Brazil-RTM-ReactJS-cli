/**
 *
 * DataGlossary
 *
 */

import React, {memo, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";

import {useInjectSaga} from "../../utils/injectSaga";
import {useInjectReducer} from "../../utils/injectReducer";
import makeSelectDataGlossary, {
    makeSelectDataGlossaryCrudOperationSpinnerState,
    makeSelectDataGlossaryData,
    makeSelectDataGlossaryDetailedData,
    makeSelectDataGlossaryFetchFailed,
    makeSelectDataGlossaryFetchSpinnerState
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import Grid from "@material-ui/core/Grid";
import DataGlossaryDetails from "../../components/DataGlossaryDetails/Loadable";
import DataGlossaryFilter from "../../components/DataGlossaryFilter/Loadable";
import DataGlossarySecondaryFilter from "../../components/DataGlossarySecondaryFilter/Loadable";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {dataGlossaryCrudOperation, dataGlossaryDataFetch} from "./actions";
import NoDataAlert from "../../components/NoDataAlert";
import {SyncLoader} from "react-spinners";
import {FormattedMessage,injectIntl} from "react-intl";
import messages from "./messages";

/** Styles class*/
const useStyles = makeStyles((theme) => ({
    searchTextField: {
        backgroundColor: "#fff",
        width: '90%',
        float: 'left',
        borderRadius: '0.3vw',
        padding: "1vw 1.5vw"
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
        backgroundColor: "#FFF"
    },
    paperStyle: {
        width: "100%",
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


export function DataGlossary({
                                 dataGlossaryDataFetch, dataGlossaryCrudOperation,
                                 DataGlossaryDetailedData, DataGlossaryData, DataGlossaryFetchSpinnerState,
                                 DataGlossaryFetchFailed, DataGlossaryCrudOperationSpinnerState, ...props
                             }) {
    useInjectReducer({key: "dataGlossary", reducer});
    useInjectSaga({key: "dataGlossary", saga});
    const classes = useStyles();
    const {intl} = props;
    useEffect(() => {
        if (DataGlossaryDetailedData.length === 0) {
            dataGlossaryDataFetch();
        }
    }, []);


    const [filteredData, setFilteredData] = useState([]);

    const [selectedFilter, setSelectedFilter] = useState([]);

    useEffect(() => {
        setFilteredData(DataGlossaryDetailedData)
    }, [DataGlossaryDetailedData]);


    const handleSearchBar = (event) => {
        handleClickGlossary([]);
        handleClickAlphabets([]);
        handleFilter(event.target.value);
    };
    const handleFilter = (value) => {
        if (value) {
            let filteredGlossaryData = DataGlossaryDetailedData.filter(item => item["glossary_word"].includes(value.toString()));
            setFilteredData(filteredGlossaryData)
        } else {
            setFilteredData(DataGlossaryDetailedData)
        }
    };
    const handleClickGlossary = (value) => {
        setSelectedFilter(value);
        if (value.length > 0) {
            let filteredGlossaryData = DataGlossaryDetailedData.filter(item => value.indexOf(item["glossary_word"]) > -1);
            setFilteredData(filteredGlossaryData);
        } else {
            setFilteredData(DataGlossaryDetailedData)
        }

    };
    const [selectedAlphabets, setSelectedAlphabets] = useState([]);
    const handleClickAlphabets = (values) => {
        if (values.length > 0) {
            let filteredGlossaryData = DataGlossaryDetailedData.filter(item => values.indexOf(item["glossary_word"][0].toUpperCase()) > -1);
            setFilteredData(filteredGlossaryData);
        } else {
            setFilteredData(DataGlossaryDetailedData);
        }
        setSelectedAlphabets(values);

    };
    const [openAddGlossary, setOpenAddGlossary] = useState({open: false, type: ""});

    const handleOpenAddGlossary = (type, Glossary = null) => {
        if (type === "edit") {
            setGlossary({...Glossary, glossary_id: Glossary["glossary_id"]});
        }
        setOpenAddGlossary(
            {open: true, type: type}
        );
    };

    const handleCloseAddGlossary = () => {
        setOpenAddGlossary(
            {open: false, type: "edit"}
        );
        setGlossary({glossary_word: "", glossary_definition: "", id: ""});
    };

    const [Glossary, setGlossary] = useState({glossary_word: "", glossary_definition: "", glossary_id: ""});

    const handleGlossaryWord = (event) => {
        setGlossary({...Glossary, glossary_word: event.target.value})
    };

    const handleGlossaryDefinition = (event) => {
        setGlossary({...Glossary, glossary_definition: event.target.value})
    };

    const handleSubmitButton = () => {
        if (openAddGlossary["type"] === "edit") {
            dataGlossaryCrudOperation({...Glossary, status: "1"})
        } else {
            dataGlossaryCrudOperation({...Glossary, status: "0"})
        }
        handleCloseAddGlossary();
    };

    const [openDeleteGlossaryDialog, setOpenDeleteGlossaryDialog] = useState(false);

    const handleOpenDeleteDialog = (Glossary) => {
        setGlossary({...Glossary, glossary_id: Glossary["glossary_id"]});
        setOpenDeleteGlossaryDialog(true);
    };

    const handleDeleteGlossary = () => {
        dataGlossaryCrudOperation({...Glossary, status: "-1"});
        handleCancelDeleteGlossary();
    };

    const handleCancelDeleteGlossary = () => {
        setGlossary({glossary_word: "", glossary_definition: "", id: ""});
        setOpenDeleteGlossaryDialog(false);
    };

    return (
        <Grid container>
            <Backdrop
                open={DataGlossaryCrudOperationSpinnerState || (DataGlossaryFetchSpinnerState && DataGlossaryDetailedData.length !== 0)}
                className={classes.backdrop}>
                <CircularProgress style={{color: "#fff"}}/>
            </Backdrop>
            {
                (() => {
                    if (DataGlossaryFetchFailed) {
                        return (
                            <Grid item xs={12} container justify="center"
                                  alignItems="center">
                                <NoDataAlert/>
                            </Grid>
                        );
                    } else {
                        if (DataGlossaryFetchSpinnerState && DataGlossaryDetailedData.length === 0) {
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
                            if (DataGlossaryDetailedData.length === 0) {
                                return (
                                    <Grid item xs={12} container justify="center" alignItems="center">
                                        <Paper style={{width: "90vw", height: "90vh"}}>
                                            <Grid item container justify="center" alignItems="center"
                                                  style={{height: "80vh"}}>
                                                <IconButton onClick={() => handleOpenAddGlossary("add")}>
                                                    <AddBoxIcon className={classes.largeAddIcon}/>
                                                </IconButton>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                );
                            } else {
                                return (
                                    <>
                                        <Grid item xs={12} sm={6} md={4} lg={2} style={{padding: "0.3vw"}}>
                                            <DataGlossaryFilter data={DataGlossaryData}
                                                                handleClickGlossary={handleClickGlossary}
                                                                selectedFilter={selectedFilter}
                                                                handleClickAlphabets={handleClickAlphabets}
                                                                selectedAlphabets={selectedAlphabets}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={8} lg={10} style={{padding: "0.3vw"}}>
                                            <Paper className={classes.paperStyle} elevation={1}>
                                                <Grid container>
                                                    <Grid item xs={10}>
                                                        <TextField
                                                            type="search"
                                                            variant="outlined"
                                                            margin="normal"
                                                            onChange={handleSearchBar}
                                                            placeholder= {  intl.formatMessage({...messages[`searchGlossary`]})}
                                                            InputProps={{
                                                                classes: {
                                                                    input: classes.textFieldInput,
                                                                },
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <SearchIcon/>
                                                                    </InputAdornment>
                                                                )
                                                            }}
                                                            className={classes.searchTextField}
                                                        />
                                                    </Grid>

                                                    <Grid container item xs={2} justify={"center"}
                                                          alignItems={"center"}>
                                                        <IconButton onClick={() => handleOpenAddGlossary("add")}>
                                                            <AddBoxIcon className={classes.smallAddIcon}/>
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                            <DataGlossarySecondaryFilter handleClickAlphabets={handleClickAlphabets}
                                                                         selectedAlphabets={selectedAlphabets}
                                                                         handleClickGlossary={handleClickGlossary}/>
                                            <DataGlossaryDetails data={filteredData}
                                                                 handleOpenDeleteDialog={handleOpenDeleteDialog}
                                                                 handleOpenAddGlossary={handleOpenAddGlossary}
                                            />
                                        </Grid>
                                    </>
                                );
                            }
                        }

                    }

                })()
            }


            <Dialog
                open={openAddGlossary["open"]}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='xl'
            >
                <DialogTitle id="form-dialog-title">
                    <Typography className={classes.dialogHeading}>
                        {openAddGlossary["type"] === "edit" ?  intl.formatMessage({...messages[`editGlossary`]}): intl.formatMessage({...messages[`addNewGlossary`]})}
                    </Typography></DialogTitle>
                <DialogContent>
                    <Grid container justify={"center"} alignItems={"center"} spacing={2}>
                        <Grid container justify={"center"} alignItems={"center"} item xs={12}>
                            <TextField
                                id="Glossary-word"
                                label={intl.formatMessage({...messages[`word`]})}
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
                                onChange={handleGlossaryWord}
                                value={Glossary["glossary_word"]}
                            />
                        </Grid>
                        <Grid container justify={"center"} alignItems={"center"} item xs={12}>
                            <TextField
                                id="Glossary-Definition"
                                label={intl.formatMessage({...messages[`definition`]})}
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
                                onChange={handleGlossaryDefinition}
                                value={Glossary["glossary_definition"]}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="outlined" onClick={handleCloseAddGlossary} size={"small"}
                            className={classes.buttonStyle}>
                     {intl.formatMessage({...messages[`cancel`]})}
                    </Button>
                    <Button color="primary" variant="contained" onClick={handleSubmitButton} size={"small"}
                            disabled={!(Glossary["glossary_definition"] && Glossary["glossary_word"])}
                            className={classes.buttonStyle}>
                        {intl.formatMessage({...messages[`submit`]})}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openDeleteGlossaryDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography className={classes.dialogHeading}>
                        {intl.formatMessage({...messages[`deleteThisGlossary`]})}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs zeroMinWidth>
                            <Tooltip title={Glossary["glossary_word"]} arrow>
                                <Typography noWrap className={classes.dialogLabel}>
                                    {Glossary["glossary_word"]}
                                </Typography>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDeleteGlossary} variant="outlined" color="primary" size={"small"}
                            autoFocus
                            className={classes.buttonStyle}>
                        {intl.formatMessage({...messages[`cancel`]})}
                    </Button>
                    <Button onClick={handleDeleteGlossary} color="secondary" variant="contained" size={"small"}
                            className={classes.buttonStyle}>
                        {intl.formatMessage({...messages[`delete`]})}
                    </Button>
                </DialogActions>
            </Dialog>


        </Grid>
    );
}

DataGlossary.propTypes = {
    dataGlossaryDataFetch: PropTypes.func,
    dataGlossaryCrudOperation: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
    dataGlossary: makeSelectDataGlossary(),
    DataGlossaryDetailedData: makeSelectDataGlossaryDetailedData(),
    DataGlossaryData: makeSelectDataGlossaryData(),
    DataGlossaryFetchSpinnerState: makeSelectDataGlossaryFetchSpinnerState(),
    DataGlossaryFetchFailed: makeSelectDataGlossaryFetchFailed(),
    DataGlossaryCrudOperationSpinnerState: makeSelectDataGlossaryCrudOperationSpinnerState()
});

function mapDispatchToProps(dispatch) {
    return {
        dataGlossaryDataFetch: () => dispatch(dataGlossaryDataFetch()),
        dataGlossaryCrudOperation: (data) => dispatch(dataGlossaryCrudOperation(data))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    withConnect,
    memo
)(injectIntl(DataGlossary));
