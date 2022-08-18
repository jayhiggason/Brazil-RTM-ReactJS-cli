/**
 *
 * VisitvsSalesChart
 *
 */

import React, {memo} from "react";
import ApexCharts from 'react-apexcharts';
import AppMessages from "../../containers/App/messages";
import {injectIntl} from "react-intl";
/** VisitvsSalesChart function is used to render the Visit vs sales stacked bar graph component in the distributor deep dive page of the tool */

function VisitvsSalesChart({series, xAxis,selectedItems,intl}) {

    const options = {
        colors: ['#0000a0', '#00d7b9'],
        chart: {
            type: 'bar',
            toolbar: {
                show: true,
                export: {
                    csv: {
                        filename: `${intl.formatMessage({...AppMessages[`distributor_deep_dive_view_visits_vs_sales_card`]})}_${selectedItems}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                        columnDelimiter: ',',
                        headerCategory: 'Distributor',
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: `${intl.formatMessage({...AppMessages[`distributor_deep_dive_view_visits_vs_sales_card`]})}_${selectedItems}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                    png: {
                        filename: `${intl.formatMessage({...AppMessages[`distributor_deep_dive_view_visits_vs_sales_card`]})}_${selectedItems}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    }
                },
            },
            stacked: true,
        },
        dataLabels: {
            enabled: true,
            formatter: function (value) {
                return new Intl.NumberFormat('pt-BR').format(value.toFixed(2));
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
                horizontal: true,
                barHeight: '250%'
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },

        xaxis: {
            show: false,
            categories: xAxis,
            labels: {
                show: false,
                formatter: function (value) {
                    return value.toFixed(0);
                },
                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book',
                },
            },

        },
        yaxis: {
            show: false,
            style: {
                fontSize: '0.8vw',
                fontFamily: 'MarsCentra-Book',
            },
            labels: {

                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book',
                },
            },
            title: {
                text: undefined
            },
        },
        tooltip: {
            show: true,
            theme: 'dark',
            y: {
                formatter: function (val) {
                    return new Intl.NumberFormat('pt-BR').format(val);
                },
                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book',
                },
            }
        },

        grid: {
            yaxis: {
                lines: {
                    show: false
                }
            },
        }
        ,
        fill: {
            opacity: 1
        },

        legend: {
            show: true,
            position: "top",
            horizontalAlign: 'left',
            fontSize: 11,
            fontFamily: 'MarsCentra-Book',
            offsetX: 0,
            offsetY: 0,
        },

    };
    return (
        <div>
            <ApexCharts options={options} series={series} type="bar" height={window.outerHeight / 6.5}
                        width={window.outerWidth / 4.5}/>
        </div>
    );
}

VisitvsSalesChart.propTypes = {};

export default memo(injectIntl(VisitvsSalesChart));
