/**
 *
 * MyViews
 *
 */

import React, {memo} from "react";
import {BrandHeatMapView, BrandTrendChartView} from "../../containers/BrandView/index";
import {getCookie} from "../../utils/cookieUtilities";
import {
    TransformBrandDeepDiveCardsData,
    TransformDistDeepDiveCardsData,
    TransformPerformanceSummaryCardsData
} from "../../utils/utility";
import {SyncLoader} from "react-spinners";
import {
    BrandInsightsBubbleChart,
    DistributorPerformance,
    Insights,
    PerformanceSummaryCards
} from "../../containers/PerformanceSummary";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@mdi/react";
import {mdiPinOff} from "@mdi/js";
import {rtmUrl} from "../../config.json";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import {BrandDeepDiveCards, ProductSKUTrendChart, SalesBreakDownHeatMap} from "../../containers/BrandDeepDivePage";
import BrandDeepdiveTable from "../BrandDeepdiveTable";
import {DistributorDetailsTable, DistributorTrendChartView} from "../../containers/DistributorView";
import {StoreGeoMap, StoreTrendTable, StoreViewProductPerformanceHeatMap} from "../../containers/StoreView";
import {
    DistributorChannelPerformance,
    DistributorProductsPerformanceView,
    DistributorSalesPerformanceView,
    DistributorsDeepDiveCards,
    DistributorStorePerformance,
    DistributorVisitVsSalesCard
} from "../../containers/DistributorDeepDivePage";
import {
    StoreBrandAnalysis,
    StoreProductAnalysis,
    StoreProductDistribution,
    StorePurchaseAnalysis,
    StoreSalesPerformance
} from "../../containers/StoreDeepDivePage";
import NoDataAlert from "../NoDataAlert";
import {decodeResponse, encodeRequestBody} from "../../utils/jwtUtils";
import {FormattedMessage,injectIntl} from "react-intl";
import messages from "./messages";
import {FormLabel} from "@material-ui/core";
import AppMessages from "../../containers/App/messages";
import TitleMessages from "../TitleHeader/messages";
import Typography from "@material-ui/core/Typography";
/** Styles class*/
const useStyles = makeStyles(({
    filterPaper: {
        width: "100%",
        backgroundColor: "#f4f2e0",
    },
    filterLabel: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.9vw',
        color: '#0000a0e6',
    },
    filterValues: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.7vw',
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    myViewPaper: {
        padding: "1.5vw",
        margin: "1vw"
    },
    title: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '0.8vw',
    },
    label: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.8vw',
    },
    titleGrid: {
        padding: "1vw"
    },
    expansionPanel: {
        width: "100%",
        margin: "1vw"
    }
}));


/** MyViews function  is used to render the individual pinned components  in the My pinned views page */

function MyViews(props) {
    const classes = useStyles();
    const [viewData, setViewData] = React.useState([]);
    const [bestProductMixData, setBestProductMixData] = React.useState([]);
    const [spinnerState, setSpinnerState] = React.useState(true);
    const [spinnerStateProductMix, setSpinnerStateProductMix] = React.useState(true);
    const [dataFailed, setDataFailed] = React.useState(false);

    React.useEffect(() => {
        console.log("an",props.filters);
        const token = JSON.parse(getCookie("token"));
        const user = JSON.parse(getCookie("UserCred"));
        setSpinnerState(true);
        setDataFailed(false);
        if (props.id === "store_deep_dive_purchase_analysis_view") {
            setSpinnerStateProductMix(true);
            let apiUrl = `${rtmUrl}/${props.api}/`;
            const body = encodeRequestBody({
                ...props.filters,
                user_role: user['role'],
                locale: props.locale
            });
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }, body: JSON.stringify(body)
            }).then(data => data.json()).then((data) => {
                let result = decodeResponse(data);
                setViewData(result);
                setSpinnerState(false);
                const productMixApiUrl = `${rtmUrl}/get_best_product_mix/`;
                const body = encodeRequestBody({...props.filters, user_role: user['role'],locale:props.locale});
                fetch(productMixApiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }, body: JSON.stringify(body)
                }).then(data => data.json()).then(data => {
                    let result = decodeResponse(data);
                    setSpinnerStateProductMix(false);
                    setBestProductMixData(result);
                }).catch(() => {
                    throw new Error();
                })
            }).catch(() => {
                setDataFailed(true)
            })
        } else {
            let apiUrl = `${rtmUrl}/${props.api}/`;
            let body= encodeRequestBody({
                    ...props.filters,
                    user_role: user['role'],
                    locale:props.locale
                });

            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }, body: JSON.stringify(body)
            }).then(data => data.json()).then((data) => {
                let result = decodeResponse(data);
                if (props.id === 'performance_summary_cards') {
                    let transData = TransformPerformanceSummaryCardsData(result, props.filters.toggleState.units, props.filters.toggleState.invoice);
                    setViewData(transData);
                } else if (props.id === 'brand_deep_dive_cards') {
                    let transData = TransformBrandDeepDiveCardsData(result, props.filters.toggleState.units, props.filters.toggleState.invoice);
                    setViewData(transData);
                } else if (props.id === "distributor_deep_dive_view_cards") {
                    let transData = TransformDistDeepDiveCardsData(result, props.filters['cardToggleState']['eos'], props.filters['cardToggleState']['invoice']);
                    setViewData(transData);
                }else if(props.id === "performance_summary_guided_insights") {
                    setViewData(result.Content);
                }
                else {
                    setViewData(result);
                }
                setSpinnerState(false);
            }).catch(() => {
                setDataFailed(true)
            })
        }

    }, []);

    const getLabelTimeRange = (arr) => {
        if (arr.indexOf("YTD") > -1 && arr.indexOf("QTD") > -1) {
            return "YTD"
        } else if (arr.indexOf("QTD") > -1) {
            return "QTD"
        } else if (arr.indexOf("PTD") > -1) {
            return "PTD"
        } else return "NA"

    };
    return (
        <Paper className={classes.myViewPaper}>
            <Grid container justify={"center"}>
                <Grid item xs={12} container className={classes.titleGrid}>
                    <Grid item xs={10} container justify={"space-between"}>
                        <Grid item xs={6}>
                            <Box component="div" display="inline" className={classes.title}>  <FormattedMessage {...messages.pinName} /></Box>
                            <Box component="div" display="inline" className={classes.label}> {props.pinName}</Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box component="div" display="inline" className={classes.title}>  <FormattedMessage {...messages.viewName} /></Box>
                            <Box component="div" display="inline" className={classes.label}> {props.intl.formatMessage({...AppMessages[`${props.id}`]})}</Box>
                        </Grid>

                    </Grid>

                    <Grid item xs={2} container justify={"flex-end"}>
                        <IconButton size="small" style={{outline: "none"}}
                                    onClick={() => props.unpinMyView({id: props.pinId})}>
                            <Icon
                                path={mdiPinOff} color={"#dc3545"}
                                size={"1vw"}/>
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={12} container>

                    <Grid item xs={12}>
                        <ExpansionPanel className={classes.expansionPanel}>
                            <ExpansionPanelSummary
                                expandIcon={<ArrowDropDownIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Grid item xs={12} container justif={"center"}
                                      alignItems={"center"}>
                                    <Box component="div" display="inline" className={classes.title}>  <FormattedMessage {...messages.filters} /></Box>
                                </Grid>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.filterPaper}>
                                <Grid container>
                                    <Grid xs={12} sm={6} md={4} lg={3} wrap="wrap">
                                        <Box component="div" display="inline" className={classes.filterLabel}> <FormattedMessage {...messages.region} /></Box>
                                        <Box component="div"
                                             className={classes.filterValues}>{props.filters.region.length !== 0 ? props.filters.region : "NA"}</Box>
                                    </Grid>
                                    <Grid xs={12} sm={6} md={4} lg={3}>
                                        <Box component="div" display="inline" className={classes.filterLabel}> <FormattedMessage {...messages.manager} /> </Box>
                                        <Box component="div"
                                             className={classes.filterValues}>{props.filters.manager.length !== 0 ? props.filters.manager : "NA"}</Box>
                                    </Grid>
                                    <Grid xs={12} sm={6} md={4} lg={3}>
                                        <Box component="div" display="inline" className={classes.filterLabel}> <FormattedMessage {...messages.coordinator} /> </Box>
                                        <Box component="div"
                                             className={classes.filterValues}>{props.filters.coordinator.length !== 0 ? props.filters.coordinator : "NA"}</Box>
                                    </Grid>
                                    <Grid xs={12} sm={6} md={4} lg={3}>
                                        <Box component="div" display="inline" className={classes.filterLabel}>  <FormattedMessage {...messages.salesRep} /> </Box>
                                        <Box component="div"
                                             className={classes.filterValues}>{props.filters.salesRep.length !== 0 ? props.filters.salesRep : "NA"}</Box>
                                    </Grid>
                                    <Grid xs={12} sm={6} md={4} lg={3}>
                                        <Box component="div" display="inline" className={classes.filterLabel}>  <FormattedMessage {...messages.priceGroup} /> </Box>
                                        <Box component="div"
                                             className={classes.filterValues}>{props.filters.gp.length !== 0 ? props.filters.gp : "NA"}</Box>

                                    </Grid>
                                    <Grid xs={12} sm={6} md={4} lg={3}>
                                        <Box component="div" display="inline"
                                             className={classes.filterLabel}>  <FormattedMessage {...messages.distributor} /> </Box>
                                        <Box component="div"
                                             className={classes.filterValues}>{props.filters.distributor.length !== 0 ? props.filters.distributor : "NA"}</Box>
                                    </Grid>
                                    <Grid xs={12} sm={6} md={4} lg={3}>
                                        <Box component="div" display="inline" className={classes.filterLabel}>  <FormattedMessage {...messages.channel} /> </Box>
                                        <Box component="div"
                                             className={classes.filterValues}>{props.filters.channel.length !== 0 ? props.filters.channel : "NA"}</Box>
                                    </Grid>
                                    <Grid xs={12} sm={6} md={4} lg={3}>
                                        <Box component="div" display="inline" className={classes.filterLabel}>  <FormattedMessage {...messages.chain} /> </Box>
                                        <Box component="div"
                                             className={classes.filterValues}>{props.filters.chain.length !== 0 ? props.filters.chain : "NA"}</Box>
                                    </Grid>
                                    <Grid xs={12} sm={6} md={4} lg={3}>
                                        <Box component="div" display="inline" className={classes.filterLabel}>  <FormattedMessage {...messages.store} /> </Box>
                                        <Box component="div"
                                             className={classes.filterValues}>{props.filters.store.length !== 0 ? props.filters.store : "NA"}</Box>
                                    </Grid>
                                    <Grid xs={12} sm={6} md={4} lg={3}>
                                        <Box component="div" display="inline" className={classes.filterLabel}>  <FormattedMessage {...messages.category} /> </Box>
                                        <Box component="div"
                                             className={classes.filterValues}>{props.filters.category.length !== 0 ? props.filters.category : "NA"}</Box>
                                    </Grid>
                                    <Grid xs={12} sm={6} md={4} lg={3}>
                                        <Box component="div" display="inline"
                                             className={classes.filterLabel}>  <FormattedMessage {...messages.technology} /> </Box>
                                        <Box component="div"
                                             className={classes.filterValues}>{props.filters.technology.length !== 0 ? props.filters.technology : "NA"}</Box>
                                    </Grid>
                                    <Grid xs={12} sm={6} md={4} lg={3}>
                                        <Box component="div" display="inline" className={classes.filterLabel}>  <FormattedMessage {...messages.brand} /> </Box>
                                        <Box component="div"
                                             className={classes.filterValues}>{props.filters.brand.length !== 0 ? props.filters.brand : "NA"}</Box>
                                    </Grid>
                                    <Grid xs={12} sm={6} md={4} lg={3}>
                                        <Box component="div" display="inline" className={classes.filterLabel}>  <FormattedMessage {...messages.timeRange} /> </Box>
                                        <Box component="div" display="inline"
                                             className={classes.filterValues}>{props.filters.timeRange.length !== 0 ? (getLabelTimeRange(props.filters.timeRange) === "YTD" ? <FormattedMessage {...TitleMessages.YTD}/> : ((getLabelTimeRange(props.filters.timeRange) === "PTD" ? <FormattedMessage {...TitleMessages.PTD}/> : <FormattedMessage {...TitleMessages.QTD}/>) )) : "NA"}</Box>
                                    </Grid>
                                    <Grid xs={12} sm={6} md={4} lg={3}>
                                        <Box component="div" display="inline" className={classes.filterLabel}>  <FormattedMessage {...messages.compareWith} /></Box>
                                        <Box component="div" display="inline"
                                             className={classes.filterValues}>{props.filters.compare ? (props.filters.compare === "Last Year" ? <FormattedMessage {...TitleMessages.last_year} /> : <FormattedMessage {...TitleMessages.current_year} />) : "NA"}</Box>

                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>


                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {
                        (() => {
                            if (!dataFailed) {
                                if (!spinnerState) {
                                    switch (props.id) {
                                        case "brand_view_trend_chart":
                                            return (
                                                <BrandTrendChartView
                                                    brandTrendButton={props.filters['vsFilter']}
                                                    brandTrendUomButton={props.filters['uomButton']}
                                                    brandTopFilter={props.filters['topFilter']}
                                                    dataFailed={false}
                                                    spinnerState={false}
                                                    handleTrendUomButtonClick={() => {
                                                    }}
                                                    brandTrendTopKpiFilterOpen={false}
                                                    handleCloseTrendTopKpiFilter={() => {
                                                    }}
                                                    handleOpenTrendTopKpiFilter={() => {
                                                    }}
                                                    handleChangeTopKpiFilter={() => {
                                                    }}
                                                    brandNameSelectFunc={() => {
                                                    }}
                                                    brandTrendData={viewData}
                                                    brandTrendTopFilterOpen={false}
                                                    handleCloseTrendTopFilter={() => {
                                                    }}
                                                    handleOpenTrendTopFilter={() => {
                                                    }}
                                                    handleChangeTopFilter={() => {
                                                    }}
                                                    onFilterChange={() => {
                                                    }}
                                                    selectedFilterData={{}}
                                                    {...props}
                                                />);
                                        case "brand_view_heat_map":
                                            return (<BrandHeatMapView
                                                onClickBrandHeatmapKpiNameButtons={() => {
                                                }}
                                                brandHeatMapButton={props.filters['selectionButtons']}
                                                brandTopHeatmapFilter={props.filters['selectionDropdown']}
                                                brandHeatMapDropDownOpen={false}
                                                handleCloseBrandHeatMapDropDown={() => {
                                                }}
                                                handleOpenBrandHeatMapDropDown={() => {
                                                }}
                                                handleFilterChange={() => {
                                                }}
                                                openPartition={false}
                                                handlePartitionClose={() => {
                                                }}
                                                handlePartitionOpen={() => {
                                                }}
                                                brandPartitionHeatmapFilter={props.filters['partitionFilter']}
                                                handlePartitionFilterChange={() => {
                                                }}
                                                dataFailed={false}
                                                spinnerState={false}
                                                brandHeatmapData={viewData}
                                                events={{
                                                    click: function () {
                                                    }
                                                }}
                                                {...props}
                                            />);
                                        case 'performance_summary_cards':
                                            return (
                                                <Grid item xs={12} sm={12} md={12} lg={12} container
                                                      justify={'space-between'}
                                                      style={{marginTop: "2vmin", padding: "0 1.2vw 0 1.2vw"}}
                                                      id={"performance-summary-cards"}>
                                                    <PerformanceSummaryCards
                                                        pageTitle={"Performance Summary"}
                                                        dataFailed={false}
                                                        spinnerState={false}
                                                        cardData={viewData}
                                                        toggleCard={() => {
                                                        }}
                                                        cardToggleState={props.filters.toggleState}
                                                        categoryKpiOnChange={() => {
                                                        }}
                                                        categoryFilterOnChange={() => {
                                                        }}
                                                        trendLineData={""}
                                                        trendLineSpinnerState={false}
                                                        trendLineFail={false}
                                                        trendLineFetch={() => {
                                                        }}
                                                        categoryKpiList={[]}
                                                        selectedCategoryKpi={[]}
                                                        categoryFilterData={[]}
                                                        categoryFilterSpinnerState={false}
                                                        categoryFilterFail={false}
                                                        categorySelectedFilterData={[]}
                                                        pinMyView={() => {
                                                        }}
                                                        {...props}
                                                    />
                                                </Grid>
                                            );
                                        case 'performance_summary_brand_insights':
                                            return (
                                                <BrandInsightsBubbleChart
                                                    dataFailed={false}
                                                    spinnerState={false}
                                                    brandInsightsData={viewData}
                                                    selectedFilterData={[]}
                                                    onClickBrandInsightsButton={() => {}}
                                                    BrandInsightsButton={props.filters['selectionButtons']}
                                                    pinMyView={() => {
                                                    }}
                                                    {...props}
                                                />
                                            );
                                        case "performance_summary_distributors_performance":
                                            return (
                                                <DistributorPerformance
                                                    onClickDistributorsPerformanceKpiNameButtons={() => {
                                                    }}
                                                    kpiName={props.filters.kpiName}
                                                    distributorTopFilterOpen={false}
                                                    handleCloseDistributorTopFilter={() => {
                                                    }}
                                                    handleOpenDistributorTopFilter={() => {
                                                    }}
                                                    topFilter={props.filters.topFilter}
                                                    dataFailed={false}
                                                    spinnerState={false}
                                                    distributorTableData={viewData}
                                                    {...props}
                                                />
                                            );
                                        case "performance_summary_guided_insights":
                                            return (
                                                <Insights
                                                    guidedInsightsData={viewData}
                                                    guidedInsightsFetchSpinnerState={false}
                                                    guidedInsightsFetchFailed={false}
                                                    guidedInsightsDataFetch={() => {
                                                    }}
                                                    guidedInsightsButtonChange={() => {
                                                    }}
                                                    guidedInsightsFilterChange={() => {
                                                    }}
                                                    guidedInsightsTypeFilterChange={() => {
                                                    }}
                                                    guidedInsightsButton={props.filters.kpi}
                                                    guidedInsightsFilter={props.filters.dimension}
                                                    guidedInsightsTypeFilter={props.filters.type}
                                                    guidedInsightsToggle={() => {
                                                    }}
                                                    guidedInsightsToggleData={props.filters.analysis === "Finding"}
                                                    guidedInsightsYearPeriodFilterData={props.filters.yearPeriodData}
                                                    guidedInsightsYearPeriodFilterChange={()=>{

                                                    }}
                                                    guidedInsightsSelectedYearPeriodFilter={props.filters.yearPeriod}
                                                    pinMyView={() => {
                                                    }}
                                                    {...props}
                                                />
                                            );
                                        case 'brand_deep_dive_cards':
                                            return (
                                                <BrandDeepDiveCards
                                                    pageTitle={"Brand Deep dive"}
                                                    selectedItems={props.filters.brand}
                                                    dataFailed={false}
                                                    spinnerState={false}
                                                    cardData={viewData}
                                                    toggleCard={() => {
                                                    }}
                                                    toggleState={props.filters.toggleState}
                                                    categoryKpiOnChange={() => {
                                                    }}
                                                    categoryFilterOnChange={() => {
                                                    }}
                                                    trendLineData={[]}
                                                    trendLineSpinnerState={false}
                                                    trendLineFail={false}
                                                    trendLineFetch={() => {
                                                    }}
                                                    categoryKpiList={[]}
                                                    selectedCategoryKpi={[]}
                                                    categoryFilterData={[]}
                                                    categoryFilterSpinnerState={false}
                                                    categoryFilterFail={false}
                                                    categorySelectedFilterData={[]}
                                                    pinView={() => {
                                                    }}
                                                    {...props}
                                                />
                                            );
                                        case 'product_sku_trend_chart':
                                            return (
                                                <ProductSKUTrendChart
                                                    selectedItems={props.filters.brand}
                                                    productTrendUomFilter={props.filters.uomButton}
                                                    handleTrendButtonClick={() => {
                                                    }}
                                                    productTrendTopKpiFilterOpen={false}
                                                    handleCloseTrendTopKpiFilter={() => {
                                                    }}
                                                    handleOpenTrendTopKpiFilter={() => {
                                                    }}
                                                    productTrendButton={props.filters.vsFilter}
                                                    handleChangeUomFilter={() => {
                                                    }}
                                                    topFilterOpen={false}
                                                    handleCloseTopFilter={() => {
                                                    }}
                                                    handleOpenTopFilter={() => {
                                                    }}
                                                    productTrendFilter={props.filters.topFilter}
                                                    handleChange={() => {
                                                    }}
                                                    productSkuTrendFilterData={[]}
                                                    selectedBrandTrendData={props.filters.productSkuTrendFilter}
                                                    handleProductFilterChange={() => {
                                                    }}
                                                    dataFail={false}
                                                    spinnerState={false}
                                                    productTrendData={viewData}
                                                    pinMyView={() => {
                                                    }}
                                                    {...props}
                                                />
                                            );
                                        case 'brand_deep_dive_sales_breakdown':
                                            return (
                                                <SalesBreakDownHeatMap
                                                    selectedItems={props.filters.brand}
                                                    onClickItemHeatMapKpiNameButtons={() => {
                                                    }}
                                                    itemHeatMapButton={props.filters.selectionButtons}
                                                    itemHeatMapFilter={props.filters.selectionDropdown}
                                                    open={false}
                                                    handleClose={() => {
                                                    }}
                                                    handleOpen={() => {
                                                    }}
                                                    handleItemFilterChange={() => {
                                                    }}
                                                    openPartition={false}
                                                    handlePartitionClose={() => {
                                                    }}
                                                    handlePartitionOpen={() => {
                                                    }}
                                                    itemHeatMapPartitionFilter={props.filters.selectPartition}
                                                    handlePartitionFilterChange={() => {
                                                    }}
                                                    dataFail={false}
                                                    spinnerState={false}
                                                    itemHeatMapData={viewData}
                                                    handleSkuTableFilterChange={() => {
                                                    }}
                                                    pinMyView={() => {
                                                    }}
                                                    {...props}
                                                />
                                            );
                                        case 'brand_deep_dive_co_related_products':
                                            return (
                                                <BrandDeepdiveTable
                                                    spinnerState={false}
                                                    data={viewData}
                                                    skuTableDataFail={false}
                                                    tableName={"What sells with the item"}
                                                    productName={props.filters.product}
                                                    filterChange={() => {
                                                    }}
                                                    filterValue={[props.filters.product]}
                                                    pinMyView={() => {
                                                    }}
                                                />
                                            );
                                        case 'distributor_view_trend_chart':
                                            return (
                                                <DistributorTrendChartView
                                                    handleKPIButtonClick={() => {
                                                    }}
                                                    trendChartFilter={{
                                                        topFilter: props.filters.topFilter,
                                                        kpiFilter: props.filters.vsFilter,
                                                        kpiName: props.filters.kpiName,
                                                    }}
                                                    distTrendTopKpiFilterOpen={false}
                                                    handleCloseTrendTopKpiFilter={() => {
                                                    }}
                                                    handleOpenTrendTopKpiFilter={() => {
                                                    }}
                                                    handleChangeTopKpiFilter={() => {
                                                    }}
                                                    topFilterOpen={false}
                                                    handleCloseTopFilterOpen={() => {
                                                    }}
                                                    handleOpenTopFilterOpen={() => {
                                                    }}
                                                    handleChangeTopFilter={() => {
                                                    }}
                                                    dataFailed={false}
                                                    spinnerState={false}
                                                    trendChartData={viewData}
                                                    onFilterChange={() => {
                                                    }}
                                                    selectedFilterData={{}}
                                                    pinMyView={() => {
                                                    }}
                                                    {...props}
                                                />
                                            );
                                        case "distributor_view_distributor_table":
                                            return (
                                                <DistributorDetailsTable
                                                    dataFailed={false}
                                                    spinnerState={false}
                                                    trendTableData={viewData}
                                                    selectedFilterData={{}}
                                                    onFilterChange={() => {
                                                    }}
                                                    pinMyView={() => {
                                                    }}
                                                    {...props}
                                                />
                                            );
                                        case "store_view_trend_table":
                                            return (
                                                <StoreTrendTable
                                                    storeTrendTableData={viewData}
                                                    spinnerState={false}
                                                    dataFailed={false}
                                                    selectedFilter={{}}
                                                    onFilterChange={() => {
                                                    }}
                                                    sOpen={false}
                                                    handleStoreClose={() => {
                                                    }}
                                                    handleStoreOpen={() => {
                                                    }}
                                                    storeTopFilter={props.filters['topFilter']}
                                                    handleChangeStoreTopFilter={() => {
                                                    }}
                                                    pinMyView={() => {
                                                    }}
                                                    storeButtonData={props.filters['selectionButtons']}
                                                    storeButtonClick={() => {
                                                    }}
                                                    {...props}
                                                />);
                                        case "store_view_geo_map":
                                            return (
                                                <StoreGeoMap
                                                    dataFailed={false}
                                                    spinnerState={false}
                                                    storeGeoMapData={viewData}
                                                    pinMyView={() => {
                                                    }}
                                                    {...props}
                                                />
                                            );
                                        case "store_view_product_performance":
                                            return (
                                                <StoreViewProductPerformanceHeatMap
                                                    onClickStoreHeatMapKpiNameButtons={() => {
                                                    }}
                                                    storeHeatMapButton={props.filters['selectionButtons']}
                                                    storeHeatMapFilter={props.filters['selectionDropdown']}
                                                    open={false}
                                                    handleClose={() => {
                                                    }}
                                                    handleOpen={() => {
                                                    }}
                                                    handleFilterChange={() => {
                                                    }}
                                                    openPartition={false}
                                                    handlePartitionClose={() => {
                                                    }}
                                                    handlePartitionOpen={() => {
                                                    }}
                                                    itemHeatMapPartitionFilter={"Overall"}
                                                    handlePartitionFilterChange={() => {
                                                    }}
                                                    dataFailed={false}
                                                    spinnerState={false}
                                                    storeHeatMapData={viewData}
                                                    selectedFilterData={{}}
                                                    onFilterChange={() => {
                                                    }}
                                                    {...props}
                                                />
                                            );
                                        case "distributor_deep_dive_view_store_performance_table":
                                            return (
                                                <DistributorStorePerformance
                                                    selectedItems={props.filters.distributor}
                                                    storeTableData={viewData}
                                                    dataFailed={false}
                                                    spinnerState={false}
                                                    pinMyView={() => {
                                                    }}
                                                    storeTableButton={props['filters']['selectionButtons']}
                                                    storeTableButtonClick={()=>{}}
                                                    {...props}
                                                />
                                            );
                                        case "distributor_deep_dive_channel_performance_view":
                                            return (
                                                <DistributorChannelPerformance
                                                    selectedItems={props.filters.distributor}
                                                    channelFilterOpen={false}
                                                    handleCloseChannelFilter={() => {
                                                    }}
                                                    handleOpenChannelFilter={() => {
                                                    }}
                                                    channelFilter={props.filters['topFilter']}
                                                    handleChannelFilter={() => {
                                                    }}
                                                    dataFailed={false}
                                                    spinnerState={false}
                                                    channelPerformanceData={viewData}
                                                    handleOpenStoresDialog={() => {
                                                    }}
                                                    setSelectedChannel={() => {
                                                    }}
                                                    storePerformanceDataFetch={() => {
                                                    }}
                                                    pinMyView={() => {
                                                    }}
                                                    channelButton={props['filters']['selectionButtons']}
                                                    channelButtonClick={()=>{}}
                                                    {...props}
                                                />
                                            );
                                        case "distributor_deep_dive_product_performance_view":
                                            return (
                                                <DistributorProductsPerformanceView
                                                    selectedItems={props.filters.distributor}
                                                    productPerformanceData={viewData}
                                                    dataFailed={false}
                                                    spinnerState={false}
                                                    pinMyView={() => {
                                                    }}
                                                    paretoButtonData={props.filters['selectionButtons']}
                                                    paretoButtonClick={() => {
                                                    }}
                                                    {...props}
                                                />
                                            );
                                        case "distributor_deep_dive_sales_performance_view":
                                            return (
                                                <DistributorSalesPerformanceView
                                                    selectedItems={props.filters.distributor}
                                                    distributorSalesPerformanceKpiButton={props.filters['kpiButtons']}
                                                    handleDistributorSalesButtonClick={() => {
                                                    }}
                                                    distTrendTopKpiFilterOpen={false}
                                                    handleCloseTrendTopKpiFilter={() => {
                                                    }}
                                                    handleOpenTrendTopKpiFilter={() => {
                                                    }}
                                                    distributorSalesPerformanceButton={props.filters['selectionButtons']}
                                                    handleChangeTopKpiFilter={() => {
                                                    }}
                                                    dataFailed={false}
                                                    spinnerState={false}
                                                    distributorSalesPerformanceData={viewData}
                                                    pinMyView={() => {
                                                    }}
                                                    {...props}
                                                />
                                            );
                                        case "store_deep_dive_sales_performance_view":
                                            return (
                                                <StoreSalesPerformance
                                                    selectedItems={props.filters.store.map(i => i.label)}
                                                    dataFailed={false}
                                                    spinnerState={false}
                                                    salesPerformanceData={viewData}
                                                    pinMyView={() => {
                                                    }}
                                                    salesButtonData={props.filters['selectionButtons']}
                                                    buttonClick={() => {
                                                    }}
                                                    {...props}
                                                />
                                            );
                                        case "store_deep_dive_purchase_analysis_view":
                                            return (
                                                <StorePurchaseAnalysis
                                                    selectedItems={props.filters.store.map(i => i.label)}
                                                    dataFailed={dataFailed}
                                                    spinnerState={spinnerState}
                                                    purchaseAnalysisData={viewData}
                                                    bestProductMixData={bestProductMixData}
                                                    bestProductMixDataFailed={dataFailed}
                                                    bestProductMixDataSpinnerState={spinnerStateProductMix}
                                                    pinMyView={() => {
                                                    }}
                                                    purchaseButtonClick={()=>{}}
                                                    purchaseButton={props['filters']['selectionButtons']}
                                                    {...props}
                                                />
                                            );
                                        case "store_deep_dive_brand_analysis_view":
                                            return (
                                                <StoreBrandAnalysis
                                                    selectedItems={props.filters.store.map(i => i.label)}
                                                    onClickParetotAnalysisButtons={() => {
                                                    }}
                                                    paretoAnalysisButton={props.filters['selectionButtons']}
                                                    dataFailed={false}
                                                    spinnerState={false}
                                                    paretoAnalysisData={viewData}
                                                    pinMyView={() => {
                                                    }}
                                                    {...props}
                                                />
                                            );
                                        case "store_deep_dive_product_analysis_view":
                                            return (
                                                <StoreProductAnalysis
                                                    selectedItems={props.filters.store.map(i => i.label)}
                                                    productAnalysisData={viewData}
                                                    spinnerState={false}
                                                    dataFailed={false}
                                                    pinMyView={() => {
                                                    }}
                                                    open={false}
                                                    handleClose={() => {
                                                    }}
                                                    handleOpen={() => {
                                                    }}
                                                    productAnalysisFilter={props.filters['topFilter']}
                                                    handleProdFilter={() => {
                                                    }}
                                                    ProductAnalysisButton={props['filters']['selectionButtons']}
                                                    onClickProductAnalysisButton={()=>{}}
                                                    {...props}
                                                />
                                            );
                                        case"store_deep_dive_product_distribution_view":
                                            return (
                                                <StoreProductDistribution
                                                    selectedItems={props.filters.store.map(i => i.label)}
                                                    onClickProductDistributionButtons={() => {
                                                    }}
                                                    productDistributionButton={props.filters['selectionButtons']}
                                                    sOpen={false}
                                                    handleStoreClose={() => {
                                                    }}
                                                    handleStoreOpen={() => {
                                                    }}
                                                    storeProductTopFilter={props.filters['topFilter']}
                                                    handleChangeStoreProductTopFilter={() => {
                                                    }}
                                                    dataFailed={false}
                                                    spinnerState={false}
                                                    productDistributionData={viewData}
                                                    pinMyView={() => {
                                                    }}
                                                    {...props}
                                                />
                                            );
                                        case "distributor_deep_dive_view_visits_vs_sales_card":
                                            return (
                                                <DistributorVisitVsSalesCard
                                                    selectedItems={props.filters.distributor}
                                                    dataFailed={false}
                                                    spinnerState={false}
                                                    pinMyView={() => {
                                                    }}
                                                    visitSalesBubbleData={viewData}
                                                    visitFilterOpen={false}
                                                    handleVisitFilter={()=>{}}
                                                    handleCloseVisitFilter={()=>{}}
                                                    handleOpenVisitFilter ={()=>{}}
                                                    visitSalesFilter={props.filters['selectionButtons']}
                                                    {...props}
                                                />
                                            );
                                        case"distributor_deep_dive_view_cards":
                                            return (
                                                <DistributorsDeepDiveCards
                                                    selectedItems={props.filters.distributor}
                                                    dataFailed={false}
                                                    spinnerState={false}
                                                    distributorCardsData={viewData}
                                                    cardToggleState={props.filters['cardToggleState']}
                                                    toggleCard={() => {
                                                    }}
                                                    pinMyView={() => {
                                                    }}
                                                    {...props}
                                                />
                                            );
                                        default:
                                            return null;
                                    }

                                } else {
                                    return (
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '30vh',
                                                width: "100%"
                                            }}>
                                            <SyncLoader size={15} margin={2} color="#0000a0"
                                                        loading/>
                                        </div>
                                    )
                                }
                            } else {
                                return <NoDataAlert/>
                            }


                        })()
                    }
                </Grid>
            </Grid>
        </Paper>
    );

}

MyViews.propTypes = {};

export default memo(injectIntl(MyViews));
