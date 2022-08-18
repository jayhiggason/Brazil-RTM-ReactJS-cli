/**
 *
 * ApexGroupedBarChart
 *
 */

import React, {memo} from "react";
import ApexCharts from "react-apexcharts";

/** ApexGroupedBarChart function is reused to render the grouped bar chart that is used across the tool for the following components -
 * Brand view - Brands' trend
 * Brand deep dive - Products' trend
 * Distributor view - Distributors' trend
 * Distributor deep dive - Distributors' sales performance
 * Distributor deep dive - Channel performance
 * Distributor deep dive - Stores' sales performance
 * Store deep dive - Products' distribution*/


function ApexGroupedBarChart({series, options, height, width}) {

    return (
        <div>
            <ApexCharts options={options} series={series} type="bar" height={height} width={width}/>
        </div>
    );
}

ApexGroupedBarChart.propTypes = {};

export default memo(ApexGroupedBarChart);
