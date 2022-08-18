import React from "react";
import {ComposableMap, Geographies, Geography, Marker, ZoomableGroup,} from "react-simple-maps";
import {geoCentroid} from "d3-geo";
import ReactTooltip from "react-tooltip";
import topo from '../../images/brazil_topography.json'
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import './Styles.css'
import {FormattedMessage, injectIntl} from "react-intl";
import AppMessages from "../../containers/App/messages";
import messages from "./messages";
const geoUrl = topo;

/** Styles class*/
const useStyles = makeStyles(({
    filterLabel: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.8vw',
        color: '#0000a0e6',
    },
    title: {
        fontFamily: 'MarsCentra-Bold',
        fontSize: '0.8vw',
        color: '#0000a0e6',
    },
    value: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.7vw',
    },
    subTitle: {
        fontFamily: 'MarsCentra-Book',
        fontSize: '0.6vw',
    },

}));

const MapChart = ({markers,intl}) => {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [toolTipData, setToolTipData] = React.useState({
        store: "",
        distributor: [],
        gsv: "",
        tonnes: ""
    });
    const handleClickMarker = (data) => {
        setOpenDialog(true);
        setToolTipData(data);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setToolTipData({
            store: "",
            distributor: [],
            gsv: "",
            tonnes: ""
        });
    };

    return (

        <div>
            <ComposableMap
                projection="geoAzimuthalEqualArea"
                projectionConfig={{
                    rotate: [58, 20, 0],
                    scale: 800
                }}
            >
                <ZoomableGroup center={[-53, -14]} zoom={1.4}>
                    <Geographies geography={geoUrl}>
                        {({geographies}) => {
                            return (
                                <>
                                    {
                                        geographies
                                            .map((geo) => {
                                                return (
                                                    <Geography
                                                        key={geo.rsmKey}
                                                        geography={geo}
                                                        fill="#EAEAEC"
                                                        stroke="#D6D6DA"
                                                    />
                                                )
                                            })
                                    }
                                    {geographies.map(geo => {
                                        const centroid = geoCentroid(geo);
                                        const cur = geo;
                                        return (
                                            <g key={geo.rsmKey + "-name"}>
                                                {cur &&
                                                // centroid[0] > -160 &&
                                                // centroid[0] < -67 &&
                                                <Marker coordinates={centroid}>
                                                    <text y="2" fontSize={"0.6vw"} textAnchor="middle">
                                                        {cur.properties['ADM1_PT']}
                                                    </text>
                                                </Marker>
                                                }
                                            </g>
                                        );
                                    })}
                                </>)
                        }
                        }
                    </Geographies>

                    {markers.map(({name, coordinates, color, distributor, totalGSV, totalTonnes}) => {
                        let tonnes = intl.formatMessage({...AppMessages[`kpi_tonnes`]});
                            let distributorList = distributor.map(i => `<li ><a href="DistributorDeepDive?${i}" style="font-family: MarsCentra-Bold,serif; font-size: 0.7vw; color: #fff">${i}</a></li>`);
                            distributorList = distributorList.join(" ");
                            return (
                                <Marker key={name} coordinates={coordinates} id={name}
                                        data-tip={`<div class="tooltipContainer" style="background-color: rgba(30,30,30,0.78)" >
                                                       <div style="width:100%;text-align: center;background-color: #000000"><span  style="font-family:  MarsCentra-Bold,serif;text-align: left; font-size: 0.8vw;background-color: #000000;"> ${name} </span> </div>
                                                        <p class="para" style="font-family: MarsCentra-Book,serif; font-size: 0.7vw; text-align: left; color: #fff">${intl.formatMessage({...AppMessages[`distributor`]})}: <ul style=" text-align: left; color: #fff;margin-block-end:0;">${distributorList} </ul> </p> 
                                                        <p class="para"><span  style="font-family:  MarsCentra-Book,serif; font-size: 0.7vw;text-align: left;"> Total GSV:</span> <span  style="font-family:  MarsCentra-Bold,serif;text-align: left; font-size: 0.7vw">${new Intl.NumberFormat('pt-BR').format(totalGSV)} </span> </p>
                                                        <p class="para">  <span style="font-family: MarsCentra-Book,serif; font-size: 0.7vw;  text-align: left;"> Total ${tonnes} : </span> <span style="font-family: MarsCentra-Bold,serif; font-size: 0.7vw;text-align: left;"> ${new Intl.NumberFormat('pt-BR').format(totalTonnes)}</span></p>
                                                    </div>`}
                                        data-html={true}
                                        onClick={() => {
                                            handleClickMarker({
                                                store: name,
                                                distributor: distributor,
                                                gsv: totalGSV,
                                                tonnes: totalTonnes
                                            });
                                        }}
                                >
                                    <circle r={6} fill={color} stroke="#fff" strokeWidth={2}/>
                                </Marker>
                            )
                        }
                    )}

                </ZoomableGroup>
            </ComposableMap>
            <ReactTooltip html={true} multiline={true} textColor={"#FFF"} backgroundColor={"rgb(30,30,30)"}/>

            <Dialog onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={openDialog}>
                <DialogTitle id="simple-dialog-title">
                    <Typography className={classes.title}>
                        {intl.formatMessage({...messages[`toolTipDetails`]})}
                    </Typography>
                    <Typography className={classes.subTitle}>
                        ({intl.formatMessage({...messages[`toolTipDisclaimer`]})})
                    </Typography></DialogTitle>
                <Grid container style={{padding: "2vw"}} alignItems={"center"} justify={"center"}>
                    <Grid item xs={12} container>
                        <Grid item>
                            <Box component="div" display="inline" className={classes.filterLabel}
                                 style={{paddingRight: "1vw"}}>
                                {intl.formatMessage({...AppMessages[`store`]})} :
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Box component="div" display="inline" className={classes.value}>
                                <a href={`StoreDeepDive?${toolTipData['store']}`}>
                                    {toolTipData['store']}
                                </a>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container>
                        <Grid item>
                            <Box component="div" display="inline" className={classes.filterLabel}>
                                {intl.formatMessage({...AppMessages[`distributor`]})} :
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <ul>
                                {
                                    toolTipData['distributor'].map(i => <li className={classes.value}><a
                                        href={`DistributorDeepDive?${i}`}>{i}</a>
                                    </li>)
                                }
                            </ul>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container>
                        <Grid item>
                            <Box component="div" display="inline" className={classes.filterLabel}
                                 style={{paddingRight: "1vw"}}>
                                GSV :
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Box component="div" display="inline" className={classes.value}>
                                {new Intl.NumberFormat('pt-BR').format(toolTipData['gsv'])}
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container>
                        <Grid item>
                            <Box component="div" display="inline" className={classes.filterLabel}
                                 style={{paddingRight: "1vw"}}>
                                {intl.formatMessage({...AppMessages[`kpi_tonnes`]})} :
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Box component="div" display="inline" className={classes.value}>
                                {new Intl.NumberFormat('pt-BR').format(toolTipData['tonnes'])}
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

        </div>
    );
};

export default injectIntl(MapChart);




