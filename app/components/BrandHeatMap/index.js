/**
 *
 * BrandHeatMap
 *
 */

import React, {memo} from "react";
import ApexCharts from 'react-apexcharts'


import makeStyles from "@material-ui/core/styles/makeStyles";
import './BrandHeatMap.css';

/** Styles class*/
const useStyles = makeStyles(({
    arrowbox: {
        position: 'auto',
        background: '#555',
        border: '2px solid #000000',
    },
}));

/** BrandHeatMap function is reused to render the heat map chart that is used across the tool for the following components -
 * Brand view - Brands' performance across distributors
 * Brand deep dive - Products' performance across distributors
 * Store view - Products' performance across Stores*/

function BrandHeatMap({height, series, heatMapOption}) {
    return (
        <div>
            <ApexCharts options={heatMapOption} series={series} type="heatmap" height={height}/>
        </div>
    );
}

BrandHeatMap.propTypes = {};

export default memo(BrandHeatMap);
