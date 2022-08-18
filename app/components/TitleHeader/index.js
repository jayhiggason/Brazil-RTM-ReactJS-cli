/**
 *
 * TitleHeader
 *
 */

import React, {memo} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Button, FormControl, Tooltip} from "@material-ui/core";
import {Picky} from "react-picky";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import history from "../../utils/history";
import makeStyles from "@material-ui/core/styles/makeStyles";
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import IconButton from "@material-ui/core/IconButton";
import Icon from "@mdi/react";
import {mdiPin} from "@mdi/js";
import InfoIcon from '@material-ui/icons/Info';
import './style.css';
import withStyles from "@material-ui/core/styles/withStyles";
import {injectIntl} from "react-intl";
import messages from "./messages";

/** Styles class*/
const useStyles = makeStyles(({
    title: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '1vw',
        color: '#0000a0e6',
    },
    subHeading: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '0.8vw',
        color: '#0000a0e6',
        textAlign: "left"
    },
    toolTipText: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.8vw',
        color: '#000',
    },
    label: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '0.8vw',
        color: '#0000a0e6',
        padding: '0.1vw'
    },
    largeFormControlTimeRange: {
        minWidth: "8vw",
        maxWidth: "10vw",
        margin: '1vh'
        // marginTop:"0.2vw"
    },
    largeFormControlCompareRange: {
        minWidth: "8vw",
        maxWidth: "10vw",
        // marginTop:"0.2vw",
        margin: '1vh'
    },
    utilityButtons: {
        margin: "1vmin",
        fontFamily: "MarsCentra-Bold",
        fontSize: "0.8vw",
        textTransform: 'none',
        borderRadius: "1vmin",
    },
}));

const HtmlTooltip = withStyles(() => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: "0.8vw",
        border: '1px solid #dadde9',
    },
}))(Tooltip);

/** TitleHeader function is reused to render the Title header in the tool which consists of the title of the page along with utility buttons - pinned views, bookmarks, bookmark this page, export button, info button about the page and also time range and compare with filter  */

function TitleHeader({
                         title, subHeader, selectedItems, selectedFilterData, handleChangeTimeRange, handleChangeCompareTimeRange, setOpenPinPage, exportPdf, tooltipData, intl
                     }) {
    const classes = useStyles();
    const timeRangeData = [
        {value: "YTD",
        label: intl.formatMessage({...messages[`YTD`]})},
        {value :"QTD", label: intl.formatMessage({...messages[`QTD`]})}, {value:"PTD", label:intl.formatMessage({...messages[`PTD`]})}];
    const CompareTimeData = [{
        value: "Last Year",
        label: intl.formatMessage({...messages[`last_year`]})
    }, {value: "Current Year", label: intl.formatMessage({...messages[`current_year`]})}];
    const CompareYTDTimeData = [{
        value: "Last Year",
        label: intl.formatMessage({...messages[`last_year`]})
    }];
    const compare_with_options = (selectedFilterData['timeRange'] === 'YTD') ? CompareYTDTimeData : CompareTimeData;
    return (
        <Grid container>
            <Grid item xs={2} container
                  direction={"column"}
                  justify={"center"}
                  alignItems={"flex-start"}
                  style={{paddingTop: "1vh", paddingLeft: "2vmin"}}
            >

                <Typography className={classes.title}>
                    {title}
                </Typography>
                {
                    subHeader &&
                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                {
                                    selectedItems.map((i, index) => <Typography color="inherit"
                                                                                className={classes.toolTipText}> {index + 1} . {i}</Typography>)
                                }
                            </React.Fragment>
                        }
                    >
                        <Typography className={classes.subHeading}>
                            ({subHeader})
                        </Typography>
                    </HtmlTooltip>
                }
            </Grid>
            <Grid item container xs={10} alignItems={"center"}
                  justify={"flex-end"}>
                <Typography className={classes.label}>{intl.formatMessage({...messages[`time_range`]})}:</Typography>
                <FormControl className={classes.largeFormControlTimeRange}>
                    <Picky
                        id={"rtmTimeRange"}
                        placeholder={'Time Range'}
                        options={timeRangeData}
                        multiple={false}
                        includeFilter
                        // value={selectedFilterData['timeRange']}
                        value={timeRangeData.filter(i => i.value === selectedFilterData['timeRange'])[0]}
                        onChange={handleChangeTimeRange}
                        manySelectedPlaceholder={'%s selected'}
                        numberDisplayed={2}
                        clearFilterOnClose={true}
                        selectAllMode={"filtered"}
                        labelKey={"label"}
                        valueKey={"value"}
                    />
                </FormControl>
                <Typography className={classes.label}>{intl.formatMessage({...messages[`compare_with`]})}:</Typography>
                <FormControl className={classes.largeFormControlCompareRange}>
                    <Picky
                        id={"rtmCompareFilter"}
                        placeholder={'Compare With'}
                        options={compare_with_options}
                        multiple={false}
                        includeFilter
                        value={compare_with_options.filter(i => i.value === selectedFilterData['compare'])[0]}
                        onChange={handleChangeCompareTimeRange}
                        manySelectedPlaceholder={'%s selected'}
                        numberDisplayed={2}
                        clearFilterOnClose={true}
                        selectAllMode={"filtered"}
                        labelKey={"label"}
                        valueKey={"value"}
                    />
                </FormControl>
                <Tooltip title={intl.formatMessage({...messages[`views_button_tooltip`]})}>
                    <Button
                        size="small"
                        variant="contained"
                        startIcon={<Icon
                            path={mdiPin} color={"#fff"}
                            size={"1vw"}/>}
                        className={classes.utilityButtons}
                        style={{
                            color: '#fff',
                            backgroundColor: "#a8071a",
                        }}
                        onClick={() => history.push("/RTM/MyPinnedViews")}
                    >
                        {intl.formatMessage({...messages[`views`]})}
                    </Button>
                </Tooltip>
                <Tooltip title={intl.formatMessage({...messages[`bookmarks_view_button_tooltip`]})}>
                    <Button
                        size="small"
                        variant="contained"
                        className={classes.utilityButtons}
                        style={{
                            color: '#fff',
                            backgroundColor: "#0000a0",
                        }}
                        onClick={() => history.push("/RTM/MyPage")}
                    >
                        {intl.formatMessage({...messages[`bookmarks`]})}
                    </Button>
                </Tooltip>
                <Tooltip title={intl.formatMessage({...messages[`bookmarks_button_tooltip`]})}>
                    <IconButton color="primary" size={"small"}
                                className={classes.utilityButtons}
                                style={{

                                    color: '#fff',
                                    backgroundColor: "#775cd0",
                                    padding: "9px"
                                }}
                                onClick={() => setOpenPinPage(true)}>
                        <BookmarksIcon style={{fontSize: "0.8vw"}}/>
                    </IconButton>
                </Tooltip>
                <Button
                    onClick={exportPdf}
                    size="small"
                    variant="contained"
                    endIcon={<SystemUpdateAltIcon style={{fontSize: "1.1vw"}}/>}
                    className={classes.utilityButtons}
                    style={{
                        color: '#000',
                        backgroundColor: "rgb(0, 215, 185)",
                    }}
                >
                    {intl.formatMessage({...messages[`export_button`]})}
                </Button>
                <Tooltip title={tooltipData}>
                    <InfoIcon style={{color: '#66d8ba', marginRight: '1vw'}}/>
                </Tooltip>
            </Grid>
        </Grid>
    );
}

TitleHeader.propTypes = {};

export default memo(injectIntl(TitleHeader));
