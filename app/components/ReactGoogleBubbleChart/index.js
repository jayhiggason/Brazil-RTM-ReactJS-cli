/**
 *
 * ReactGoogleBubbleChart
 *
 */

import React, { memo } from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import "./ReactGoogleBubbleChart.css";
import { FormattedMessage } from "react-intl";
import messages from "./messages";
const data = [
    ["Brand", "% Target", "% Growth", "Name", "z"],
    ["PED NE", 8.37, 100, "DRY BB", 5.27],
    ["OPT CAT DRY", 20.3, 100, "DRY BB", 5.22],
    ["WHI CAST", 21.48, 100, "DRY BB", 5.56],
    ["KITEKAT", 0, 100, "DRY BB", 5.2],
    ["PED DRY", 26.11, 1.67, "DRY BB", 13.59],
    ["PED DTX", 9.84, 100, "SCKS", 5.03],
    ["PED SCKS", 6.66, 100, "SCKS", 5.16],
    ["DREAMIES", 6.22, 100, "SCKS", 5.01],
    ["WHI CAN", 15.75, 100, "CAN", 5.11],
    ["PED CAN", 0, 100, "CAN", 5.13],
];
const options = {
    title:
        "Brand " +
        "Insights",
    hAxis: { title: "% Target" },
    vAxis: { title: "% Growth" },
    bubble: { textStyle: { fontSize: 11 } }
};
function ReactGoogleBubbleChart() {
  return (
      <div className="App">
          <Chart
              chartType="BubbleChart"
              width="100%"
              height="700px"
              data={data}
              options={options}
              toolbarItems={[
                  {
                      type: 'csv',
                      datasource:data,
                  },
              ]}
          />
      </div>
  );
}

ReactGoogleBubbleChart.propTypes = {};

export default memo(ReactGoogleBubbleChart);
