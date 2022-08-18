/**
 *
 * Table
 *
 */

import React, {memo} from "react";
import PropTypes from "prop-types";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import paginationFactory from "react-bootstrap-table2-paginator";
import "./style.css";
import {SyncLoader} from "react-spinners";
import ToolkitProvider, {CSVExport} from "react-bootstrap-table2-toolkit";
import Grid from "@material-ui/core/Grid";
import {paginationOptions} from '../../utils/paginationOptions';
import Divider from "@material-ui/core/Divider";
import {roleFormatter} from "../../utils/utility";
import {makeStyles} from "@material-ui/core/styles";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import {InputAdornment, TextField} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {getCookie} from "../../utils/cookieUtilities";
import {FormattedMessage,injectIntl} from "react-intl";
import messages from "./messages";

const {ExportCSVButton} = CSVExport;

/** Styles class*/
const useStyles = makeStyles((theme) => ({
    buttonStyle: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.8vw',
    },
    csvButtonStyle: {
        fontSize: "0.7vw",
        fontFamily: 'MarsCentra-Book',
        backgroundColor: 'rgb(255,255,255) ',
        color: 'rgb(0,215,185)',
        textTransform: 'none',
        alignItems: "center",
        padding: '0.2vw',
        '&:hover': {
            color: 'rgb(255,255,255)',
            backgroundColor: 'rgb(0,215,180)',
        }
    },
    textField: {
        margin: theme.spacing(1),
        borderRadius: '0.3vw'
    },
    textFieldInput: {
        fontSize: '0.8vw',
        fontFamily: 'MarsCentra-Book',
        color: "#000",
        backgroundColor: "#FFF",

    },
}));

function Table({
                   data,
                   spinnerState,
                   name,
                   adminHandleRequest,
                   tableTitle, tab, ...props
               }) {
    const classes = useStyles();
    const {intl} = props;
    const [tableData, setTableData] = React.useState([]);
    React.useEffect(() => {
        setTableData(data)
    }, [data]);
    const actionButtonFunc = (cell, row) => {
        let user = JSON.parse(getCookie("UserCred"));
        if (tab === 0) {
            return (<Grid container justify={"space-around"}>
                <Button
                    disabled={!(row['approved_by'] === user.userID || row['approved_by'] === user.id ) }
                    variant="contained"
                    color="primary"
                    onClick={() => adminHandleRequest({...row, approve: true})}
                    className={classes.buttonStyle}
                >
                    <FormattedMessage {...messages.approve} />
                </Button>
                <Button
                    disabled={!(row['approved_by'] === user.userID || row['approved_by'] === user.id ) }
                    variant="contained"
                    color="secondary"
                    onClick={() => adminHandleRequest({...row, approve: false})}
                    className={classes.buttonStyle}
                >
                    <FormattedMessage {...messages.reject} />
                </Button>
            </Grid>);
        } else {
            return (<Grid container justify={"space-around"}>
                <Button
                    disabled={!(row['approved_by'] === user.userID || row['approved_by'] === user.id ) }
                    variant="contained"
                    color="primary"
                    onClick={() => adminHandleRequest({...row, approve: true})}
                    className={classes.buttonStyle}
                >
                    <FormattedMessage {...messages.edit} />
                </Button>
                <Button
                    disabled={!(row['approved_by'] === user.userID || row['approved_by'] === user.id ) }
                    variant="contained"
                    color="secondary"
                    onClick={() => adminHandleRequest({...row, approve: false})}
                    className={classes.buttonStyle}
                >
                    <FormattedMessage {...messages.delete} />
                </Button>
            </Grid>);
        }

    };

    const columnStyle = {
        verticalAlign: 'middle',
        fontSize: '0.8vw',
        fontWeight: 'normal',
        fontFamily: 'MarsCentra-Book',
    };

    const columnHeaderStyle = {
        verticalAlign: 'middle',
        textAlign: 'center',
        backgroundColor: '#0000a0',
        fontSize: '0.9vw',
        fontFamily: 'MarsCentra-Bold',
        color: '#FFF',
    };


    const adminColumns = [
        {
            dataField: "username",
            text:    <FormattedMessage {...messages.userName} />,
            align: "center",
            headerStyle: columnHeaderStyle,
            style: columnStyle
        },
        {
            dataField: "email",
            text: <FormattedMessage {...messages.email} />,
            align: "center",
            headerStyle: columnHeaderStyle,
            style: columnStyle
        },
        {
            dataField: "organization",
            text: <FormattedMessage {...messages.organization} />,
            align: "center",
            headerStyle: columnHeaderStyle,
            style: columnStyle
        },
        {
            dataField: "role",
            text: <FormattedMessage {...messages.role} />,
            align: "center",
            headerStyle: columnHeaderStyle,
            style: columnStyle,
            formatter: (cell) => cell ? roleFormatter(cell) : "Not Assigned"
        },
        {
            dataField: "status",
            text: <FormattedMessage {...messages.status} />,
            align: "center",
            formatter: (cell) => {
                if (cell === 0) {
                    return <FormattedMessage {...messages.statusPending} />;
                } else if (cell === 1) {
                    return <FormattedMessage {...messages.statusActive} />;
                }
            },
            headerStyle: columnHeaderStyle,
            style: columnStyle
        },
        {
            dataField: "actionButtons",
            text:<FormattedMessage {...messages.actionButtons} />,
            align: "center",
            headerStyle: columnHeaderStyle,
            style: columnStyle,
            formatter: actionButtonFunc,

        },
    ];
    let key = "id";
    const csvProps = {
        fileName: `${tableTitle || name}_${new Date().getFullYear()}_${new Date().getMonth() +
        1}_${new Date().getDate()}_${new Date().getHours()}_${new Date().getMinutes()}_${new Date().getSeconds()}.csv`,
        separator: ',',
        ignoreHeader: false,
        noAutoBOM: false,
        blobType: "text/csv;charset=ansi",
    };

    const handleSearch = (e) => {
        if (e.target.value) {
            setTableData(data.filter((i) => i.username.toLowerCase().includes(e.target.value.toLowerCase()) || i.email.toLowerCase().includes(e.target.value.toLowerCase())));
        } else {
            setTableData(data);
        }
    };


    return (
        <div style={{boxSizing: "border-box", width: "100%"}}>
            <Paper elevation={1} square style={{padding: "10px", marginTop: 10}}>
                {(() => {
                    if (spinnerState) {
                        return (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "300px",
                                }}
                            >
                                <SyncLoader size={15} margin={2} color="#0000a0" loading/>
                            </div>
                        );
                    } else {
                        return (
                            <ToolkitProvider
                                keyField={key}
                                data={tableData}
                                columns={adminColumns}
                                exportCSV={csvProps}
                            >
                                {(props) => (
                                    <Grid>
                                        <Grid container justify="flex-end" alignItems="center">


                                            <TextField
                                                id="input-with-icon-textfield"
                                                onChange={handleSearch}
                                                placeholder={intl.formatMessage({...messages[`searchUser`]})}
                                                className={classes.textField}
                                                InputProps={{
                                                    classes: {
                                                        input: classes.textFieldInput,
                                                    },
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon fontSize={"1vw"}/>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <ExportCSVButton
                                                {...props.csvProps}
                                                className={classes.csvButtonStyle}
                                            >
                                                <SystemUpdateAltIcon fontSize={"small"}/>
                                            </ExportCSVButton>

                                        </Grid>
                                        <Divider style={{margin: "0.3vw 0"}}/>
                                        <Grid style={{overflowX: "auto", width: "100%"}}>
                                            <BootstrapTable
                                                classes="tableStyle"
                                                {...props.baseProps}
                                                bootstrap4
                                                keyField={key}
                                                data={tableData}
                                                columns={adminColumns}
                                                bordered={false}
                                                noDataIndication={tab === 0 ? <FormattedMessage {...messages.allCaughtUp} /> : <FormattedMessage {...messages.noData} />}
                                                pagination={paginationFactory(paginationOptions)}
                                                // striped
                                                hover
                                            />
                                        </Grid>
                                    </Grid>
                                )}
                            </ToolkitProvider>
                        );
                    }
                })()}
            </Paper>
        </div>
    );
}

Table.propTypes = {
    data: PropTypes.array,
};

export default memo(injectIntl(Table));
