/**
 *
 * MyPageTable
 *
 */

import React, {memo} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {paginationOptions} from "../../utils/paginationOptions";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import history from "../../utils/history";
import messages from "./messages";
import {FormattedMessage,injectIntl} from "react-intl";

/** Styles class*/
const useStyles = makeStyles((theme) => ({
    textField: {
        backgroundColor: "#fff",
        width: '30%',
        float: 'left',
        borderRadius: '0.3vw',
        margin: "1vw"
    },
    textFieldInput: {
        fontSize: '0.8vw',
        fontFamily: 'MarsCentra-Book',
        color: "#000",
        backgroundColor: "#FFF"
    },
    formLabel: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: "0.8vw",
        margin: '0.8vw 0px',
        color: '#444',
        letterSpacing: 0,
        borderBottom: 0,
        textAlign: 'center'
    },
    buttonRoot: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    button: {
        color: "white",
        fontFamily: "MarsCentra-Book",
        textTransform: 'none',
        borderRadius: "1vmin"
    }
}));

/** MyPageTable function  is used to render the  Table in the My pinned views page which contains the details of the views pinned */

function MyPageTable({data = [], removePinnedView, onFilterChange, ...props}) {
    React.useEffect(() => {
        setTableData(data);
    }, [data]);
    const [tableData, setTableData] = React.useState([]);
    const classes = useStyles();
    const {intl} = props;
    const handleViewButton = (row) => {
        let filters = JSON.parse(row['filters']);
        onFilterChange({...filters, pinPage: true});
        history.push(row['pageLink']);
    };
    const actionFormatter = (cell, row) => {
        return (
            <div className={classes.buttonRoot}>
                <Button className={classes.button} variant="contained" color="primary"
                        onClick={() => handleViewButton(row)}><FormattedMessage {...messages.view} /></Button>
                <Button className={classes.button} variant="contained" color="secondary"
                        onClick={() => removePinnedView(row)}>
                    <FormattedMessage {...messages.delete} />
                </Button>
            </div>
        )
    };

    const columnStyle = {
        verticalAlign: 'middle',
        fontSize: '0.8vw',
        fontFamily: 'MarsCentra-Book',
    };

    const columnHeaderStyle = {
        verticalAlign: 'middle',
        textAlign: 'center',
        backgroundColor: 'rgb(0,215,185)',
        fontSize: '0.9vw',
        fontFamily: 'MarsCentra-Bold',
        color: '#ffffff',
        sort: true,
    };

    let columns = [
        {
            dataField: "pinId",
            text: "PinId",
            hidden: true,
            align: 'center',
            style: columnStyle,
            headerStyle: columnHeaderStyle,
        },
        {
            dataField: "pinName",
            text: <FormattedMessage {...messages.name} />,
            align: 'center',
            style: columnStyle,
            headerStyle: columnHeaderStyle,
        },
        {
            dataField: "pageName",
            text: <FormattedMessage {...messages.pageName} />,
            align: 'center',
            style: columnStyle,
            headerStyle: columnHeaderStyle,
        },
        {
            dataField: "user",
            text: <FormattedMessage {...messages.user} />,
            align: 'center',
            style: columnStyle,
            headerStyle: columnHeaderStyle,
        },

        {
            dataField: "filters",
            text: <FormattedMessage {...messages.filters} />,
            align: 'center',
            hidden: true,
            style: columnStyle,
            headerStyle: columnHeaderStyle,
        },
        {
            dataField: "date",
            text: <FormattedMessage {...messages.date} />,
            align: 'center',
            style: columnStyle,
            headerStyle: columnHeaderStyle,
        },
        {
            dataField: "",
            text: <FormattedMessage {...messages.actions} />,
            align: 'center',
            style: columnStyle,
            headerStyle: columnHeaderStyle,
            formatter: actionFormatter
        },
    ];

    const onChangeInput = (e) => {
        let input = e.target.value.toLowerCase();
        if (input) {
            setTableData(data.filter((item) => {
                return item.pinName.toLowerCase().includes(input) || item.pageName.toLowerCase().includes(input)
            }))
        } else {
            setTableData(data);
        }

    };

    return (
        <div style={{width: "100%"}}>
            <TextField
                id="customerMasterSearchBar"
                type="search"
                InputLabelProps={{
                    shrink: true,
                }}
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
                placeholder={intl.formatMessage({...messages[`searchBar`]})}
                variant="outlined"
                onChange={onChangeInput}
                className={classes.textField}
            />
            <BootstrapTable
                classes='MyPage'
                bootstrap4
                keyField={"pinId"}
                data={tableData}
                columns={columns}
                bordered={false}
                pagination={paginationFactory(paginationOptions)}
                striped
                hover
                noDataIndication={<Typography className={classes.formLabel}><FormattedMessage {...messages.noPin} /></Typography>}
            />
        </div>
    );
}

MyPageTable.propTypes = {};

export default memo(injectIntl(MyPageTable));
