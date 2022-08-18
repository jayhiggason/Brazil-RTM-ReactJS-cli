/**
 *
 * ApexParetoChart
 *
 */

import React, {memo} from "react";
import ApexCharts from "react-apexcharts";

/** ApexParetoChart function is reused to render the pareto chart that is used across the tool for the following components -
 * Distributor deep dive - Products' performance
 * Store deep dive - Stores' brand analysis */

function ApexParetoChart({series, options, height, width}) {


    return (
        <div>
            <ApexCharts options={options} series={series} type="line" height={height} width={width}/>
        </div>
    );
}

ApexParetoChart.propTypes = {};

export default memo(ApexParetoChart);
