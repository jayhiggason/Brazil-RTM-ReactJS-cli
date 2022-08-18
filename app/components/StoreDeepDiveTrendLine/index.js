/**
 *
 * StoreDeepDiveTrendLine
 *
 */

import React, {memo} from "react";

import ApexCharts from "react-apexcharts";
import AppMessages from "../../containers/App/messages";
import {injectIntl} from "react-intl";

/** StoreDeepDiveTrendLine function is used to render the "Stores' sales performance" line chart component that is used in store deep dive page */


function StoreDeepDiveTrendLine({series, height, data, label, selectedItems,intl}) {
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
                        filename: `${intl.formatMessage({...AppMessages[`store_deep_dive_sales_performance_view`]})}_${selectedItems}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                        columnDelimiter: ',',
                        headerCategory: intl.formatMessage({...AppMessages[`period`]}),
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: `${intl.formatMessage({...AppMessages[`store_deep_dive_sales_performance_view`]})}_${selectedItems}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                    png: {
                        filename: `${intl.formatMessage({...AppMessages[`store_deep_dive_sales_performance_view`]})}_${selectedItems}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    }
                },
            },
        },

        dataLabels: {
            enabled: false
        },
        noData: {
            text: intl.formatMessage({...AppMessages[`click_to_download`]}),
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
                color: "#0000a0",
                fontSize: '1vw',
                fontFamily: "MarsCentra-Bold"
            }
        },
        stroke: {
            curve: 'smooth'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: ['#ea6c91', '#b58bb5', '#6a7bb9'], // optional, if not defined - uses the shades of same color in series
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 100],
                colorStops: []
            }
        },

        grid: {
            show: true,
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.4
            },
        },
        xaxis: {
            showAlways: true,
            show: true,
            categories: data['xAxis'],
            axisTicks: {
                show: true,
            },
            labels: {
                show: true,
                formatter: function (value) {
                    return value;
                },
                rotate: -40,
                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book',
                },
            },
            title: {
                text: intl.formatMessage({...AppMessages[`period`]}),
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: '#000',
                    fontSize: '0.9vw',
                    fontFamily: 'MarsCentra-Bold',
                },
            }
        },
        yaxis: {
            showAlways: true,
            show: true,
            labels: {
                formatter: function (value) {
                    if (value) {

                        if ((value >= 1000 && value < 100000) || (value <= -1000 && value > -100000)) {
                            return new Intl.NumberFormat('pt-BR').format((value / 1000).toFixed(1)) + "K";
                        } else if (value >= 100000 || value <= -100000) {
                            return new Intl.NumberFormat('pt-BR').format((value / 1000000).toFixed(1)) + "M";
                        } else if (value < 1000 || value > -1000) {
                            return new Intl.NumberFormat('pt-BR').format(value.toFixed(0));
                        }
                    }
                },
                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book',
                },

            },
            title: {
                text: label,
                rotate: -90,
                offsetX: 7,
                offsetY: 0,
                style: {
                    color: '#000',
                    fontSize: '0.9vw',
                    fontFamily: 'MarsCentra-Bold',
                },
            }
        },
        tooltip: {
            show: true,
            theme: 'dark',
            y: {
                show: true,

                formatter: (value) => {
                    return value ? new Intl.NumberFormat('pt-BR').format(value.toFixed(2)) : value;
                },

            },
        }
    };
    return (
        <div style={{width: '100%', height: '100%'}}>
            <ApexCharts options={options} series={series} type="line"
                        height={height}
            />
        </div>
    );
}

StoreDeepDiveTrendLine.propTypes = {};

export default memo(injectIntl(StoreDeepDiveTrendLine));
