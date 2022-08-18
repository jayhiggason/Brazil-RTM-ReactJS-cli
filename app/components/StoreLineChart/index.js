/**
 *
 * StoreLineChart
 *
 */

import React, {memo} from "react";
import ApexCharts from "react-apexcharts";
import {FormattedMessage, injectIntl} from "react-intl";
import AppMessages from "../../containers/App/messages";
import StoreTableMessages from "../StoreViewTable/messages";
import StoreMessages from "../../containers/StoreView/messages";

/** StoreLineChart function is reused to render the "Periodic trend" (both inside table and in the zoom in pop up) line chart in the Trends across stores' component that is used in store view page */

function StoreLineChart({series, data, title, selectedButton, titleName,intl}) {

    const getLabel = () => {
        switch (selectedButton) {
            case 'GSV':
                return  intl.formatMessage({...AppMessages[`kpi_gsv`]});
            case 'Invoice':
                return intl.formatMessage({...AppMessages[`kpi_invoice`]});
            case 'Units':
                return intl.formatMessage({...AppMessages[`kpi_units`]});
            case 'Tonnes':
                return intl.formatMessage({...AppMessages[`kpi_tonnes`]});
            case 'WOS':
                return intl.formatMessage({...AppMessages[`kpi_wos`]});
        }
    };
    const options1 = {
        chart: {
            width: '6vw',
            type: 'line',
            zoom: {
                enabled: false
            },
            fontFamily: "MarsCentra-Book",
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            enabled: true,
            theme: 'dark',
            x: {
                show: true,
            },
            y:{
                show: true,
                formatter: function (value) {
                    return value ? new Intl.NumberFormat('pt-BR').format(value) : value;
                },
            },
            fixed: {
                enabled: true,
                position: 'topLeft',
                offsetX: 50,
                offsetY: -47,
            },

        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2,
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
        markers: {
            size: 2,
            strokeWidth: 2,
            hover: {
                size: 3,
            }
        },

        grid: {
            show: false,

        },
        xaxis: {
            showAlways: false,

            show: false,
            categories: data['xAxis'],
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
            },
        },
        yaxis: {
            showAlways: false,
            show: false,
        },

    };

    const optionsZoom = {
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
                        filename: `${intl.formatMessage({...StoreTableMessages[`periodicTrend`]})}_${intl.formatMessage({...StoreMessages[`header`]})} -${titleName}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                        columnDelimiter: ',',
                        headerCategory: intl.formatMessage({...AppMessages[`period`]}),
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: `${intl.formatMessage({...StoreTableMessages[`periodicTrend`]})}_${intl.formatMessage({...StoreMessages[`header`]})} -${titleName}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                    png: {
                        filename: `${intl.formatMessage({...StoreTableMessages[`periodicTrend`]})}_${intl.formatMessage({...StoreMessages[`header`]})} -${titleName}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    }
                },
            },
        },
        noData: {
            text: intl.formatMessage({...AppMessages[`no_data_combination`]}),
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
        dataLabels: {
            enabled: true,
            formatter: function (value) {
                return value ? new Intl.NumberFormat('pt-BR').format(value.toFixed(2)) : value;
            }
        },
        stroke: {
            curve: 'smooth',
            width: 4,
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
                opacity: 0.5
            },
        },
        xaxis: {
            showAlways: true,

            show: true,
            categories: data['xAxis'],
            axisTicks: {
                show: true,
            },
            title: {
                text: intl.formatMessage({...AppMessages[`period`]}),
                style: {
                    fontSize: '16px',
                    fontFamily: 'MarsCentra-Bold',
                },
            },
            labels: {
                show: true,
            },
        },
        yaxis: {
            showAlways: true,
            show: true,
            title: {
                text: getLabel(),
                style: {
                    fontSize: '16px',
                    fontFamily: 'MarsCentra-Bold',
                },
            },
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
        }
        ,
        tooltip: {
            enabled: true,
            theme: 'dark',
            x: {
                show: true,
            },
            y: {
                show: true,

                formatter: (label) => {
                    return label ? new Intl.NumberFormat('pt-BR').format(label.toFixed(2)) : label;
                },

            },
        }
    };


    return (
        <ApexCharts options={(title === "Zoom") ? optionsZoom : options1} series={series} type="line"
                    height={(title === "Zoom") ? (window.outerHeight / 1.7) : (window.outerHeight / 11)}
        />
    );
}

StoreLineChart.propTypes = {};

export default memo(injectIntl(StoreLineChart));
