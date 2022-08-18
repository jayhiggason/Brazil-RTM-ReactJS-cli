/**
 *
 * PerformanceLineApex
 *
 */

import React, {memo} from "react";
import ApexCharts from 'react-apexcharts'
import { injectIntl} from 'react-intl'
import messages from "../../containers/App/messages";
import apexMessages from "./messages"

/** PerformanceLineApex function is reused to render the Line chart that is used across the tool for the following components -
 * Performance Summary - See Trends - performance cards
 * Brand deep dive -  See Trends - performance cards */

function PerformanceLineApex({data, pageTitle,kpiName,...props}) {
    const {intl} = props;
    const label = intl.formatMessage({...messages[`kpi_${kpiName}`]});
    const series = data.series;
    const options = {
        chart: {
            type: 'line',
            zoom: {
                enabled: false
            },
            fontFamily: "MarsCentra-Book",
            toolbar: {
                show: true,
                export: {
                    csv: {
                        filename: `See Trends - ${pageTitle}_${kpiName}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                        columnDelimiter: ',',
                        headerCategory: 'Period',
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: `See Trends - ${pageTitle}_${kpiName}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                    png: {
                        filename: `See Trends - ${pageTitle}_${kpiName}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                }
            },

        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: data['xAxis'],
            title: {
                text: intl.formatMessage({...apexMessages[`apex_x_axis_period_label`]}),
                style: {
                    fontSize: '1vw',
                    fontFamily: 'MarsCentra-Bold',
                },
            },
            labels: {
                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book',
                },
            }
        },
        yaxis: {
            title: {
                text: label,
                style: {
                    fontSize: '1vw',
                    fontFamily: 'MarsCentra-Bold',
                },
            },
            labels: {
                formatter: function (value) {
                    if (value) {

                        if ((value >= 1000 && value < 100000) || (value <= -1000 && value > -100000)) {
                            return new Intl.NumberFormat('pt-BR').format((value / 1000).toFixed(2)) + "K";
                        } else if (value >= 100000 || value <= -100000) {
                            return new Intl.NumberFormat('pt-BR').format((value / 1000000).toFixed(2)) + "M";
                        } else if (value < 1000 || value > -1000) {
                            return new Intl.NumberFormat('pt-BR').format(value);
                        }
                    }

                },
                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book',
                },
            },
        },
        legend: {
            show: true,
            showForSingleSeries: true,
            fontWeight: 200,
            fontSize: "11px",
            fontFamily: 'MarsCentra-Book',
            position: "bottom",
        },
        tooltip: {
            show: true,
            theme: 'dark',
            y: {
                formatter: function (value) {
                    return value ? new Intl.NumberFormat('pt-BR').format(value) : value;
                },

            },
        }

    };

    return (
        <ApexCharts options={options} series={series} type="line"
                    height={window.outerHeight / 1.4}
        />
    );
}

PerformanceLineApex.propTypes = {};

export default memo(injectIntl(PerformanceLineApex));
