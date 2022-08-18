/**
 *
 * BrandTrendChart
 *
 */

import React, {memo} from "react";
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js'

function BrandTrendChart({brandTrendClickOnChange, data, layout}) {
    const handleSelected = (e) => {
    };
    const handleClick = (e) => {
        let brandName = e.points[0]['x'];
        brandTrendClickOnChange(brandName);
    };
    return (
        <Plot
            data={data}
            layout={layout}
            config={{displayModeBar: false, responsive: true}}
            onSelected={handleSelected}
            onClick={handleClick}
        />

    );
}

BrandTrendChart.propTypes = {
    brandTrendClickOnChange: PropTypes.func.isRequired,
};

export default memo(BrandTrendChart);
