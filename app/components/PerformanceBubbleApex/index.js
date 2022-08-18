/**
 *
 * PerformanceBubbleApex
 *
 */

import React, {memo} from "react";
import ApexCharts from 'react-apexcharts'
import PropTypes from "prop-types";
import history from "../../utils/history";
import {injectIntl} from 'react-intl';
import AppMessages from '../../containers/App/messages';
import messages from './messages';
import performanceMessages from "../../containers/PerformanceSummary/messages"

/** PerformanceBubbleApex function is reused to render the Bubble chart that is used across the tool for the following components -
 * Performance Summary - Brand Insights */

function PerformanceBubbleApex({brandInsightData, uomButton, height,intl}) {
    const xLabel = () => {
        switch (uomButton) {
            case 'GSV':
                return `% ${intl.formatMessage({...AppMessages[`kpi_target`]})} (${intl.formatMessage({...AppMessages[`kpi_gsv`]})})`;
            case 'Tonnes':
                return `% ${intl.formatMessage({...AppMessages[`kpi_target`]})} (${intl.formatMessage({...AppMessages[`kpi_tonnes`]})})`;
        }
    };
    const yLabel = () => {
        switch (uomButton) {
            case 'GSV':
                return `% ${intl.formatMessage({...AppMessages[`growth`]})} (${intl.formatMessage({...AppMessages[`kpi_gsv`]})})`;
            case 'Tonnes':
                return `% ${intl.formatMessage({...AppMessages[`growth`]})} (${intl.formatMessage({...AppMessages[`kpi_tonnes`]})})`;

        }
    };
    const bubbleOptions = {
        chart: {
            type: 'bubble',
            fontFamily: "MarsCentra-Book",
            toolbar: {
                show: true,
                export: {
                    csv: {
                        filename: `${intl.formatMessage({...AppMessages[`performanceSummary`]})}_${intl.formatMessage({...performanceMessages[`brand_insights_header`]})}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                        columnDelimiter: ',',
                        headerCategory: intl.formatMessage({...AppMessages[`category`]}),
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: `${intl.formatMessage({...AppMessages[`performanceSummary`]})}_${intl.formatMessage({...performanceMessages[`brand_insights_header`]})}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    },
                    png: {
                        filename: `${intl.formatMessage({...AppMessages[`performanceSummary`]})}_${intl.formatMessage({...performanceMessages[`brand_insights_header`]})}_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()} hr_${new Date().getMinutes()} min_${new Date().getSeconds()} sec`,
                    }
                },
            },
            events: {
                click: function (event, chartContext, config) {
                    let seriesIndex = config['seriesIndex'];
                    if (seriesIndex >= 0) {
                        let dataPointIndex = config['dataPointIndex'];
                        let series = config['config']['series'];
                        let brand = series[seriesIndex]['data'][dataPointIndex]['name'];
                        history.push(`/RTM/BrandDeepDive?${brand}`);
                    }
                }
            },
            locales: [
                {
                    "name": "en",
                    "options": {
                        "toolbar": {
                            "exportToSVG": "Download SVG",
                            "exportToPNG": "Download PNG",
                            "menu": "Menu",
                            "selection": "Selection",
                            "selectionZoom": "Selection Zoom",
                            "zoomIn": "Zoom In",
                            "zoomOut": "Zoom Out",
                            "pan": "Panning",
                            "reset": "Reset Zoom"
                        }
                    }
                },
                {
                    "name": "pt",
                    "options": {
                        "toolbar": {
                            "exportToSVG": "Download SVG",
                            "exportToPNG": "Download PNG",
                            "menu": "Menu",
                            "selection": "Selecionar",
                            "selectionZoom": "Selecionar zoom",
                            "zoomIn": "Aumentar zoom",
                            "zoomOut": "Reduzir o zoom",
                            "pan": "Painel",
                            "reset": "Redefinir zoom"
                        }
                    }
                }],
            defaultLocale: intl['locale']
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
        grid: {
            show: true,
            borderColor: '#dcdcdc',
            strokeDashArray: 0,
            position: 'back',
            xaxis: {
                lines: {
                    show: true,
                    offsetX: '1',
                    offsetY: '1'
                },
                labels: {
                    style: {
                        fontSize: '0.8vw',
                        fontFamily: 'MarsCentra-Book',
                    },
                }
            },
            yaxis: {
                lines: {
                    show: true,
                    offsetX: '100',
                    offsetY: '100'
                },

            },
            padding: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 5
            },
        },
        legend: {
            show: true,
            position: "top",
            horizontalAlign: 'left',
            fontFamily: "MarsCentra-Book",
            fontSize: 8,
            fontWeight: 100,
            onItemClick: {
                toggleDataSeries: true
            },
            // markers: {
            //     onClick: function (chart, seriesIndex, opts) {
            //         console.log("series- " + seriesIndex + "'s marker was clicked")
            //     }
            // },
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 0.8
        },
        xaxis: {
            min: brandInsightData['xMin'],
            max: brandInsightData['xMax'],
            axisTicks: {
                show: false,
                borderType: 'solid',
                color: '#78909C',
                width: 5,
            },
            type: 'numeric',
            labels: {
                formatter: function (value) {
                    return new Intl.NumberFormat('pt-BR').format(value.toFixed(1));
                },
                offsetX: -2,
                offsetY: 0,
                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book',
                },
            },
            title: {
                text: xLabel(),
                offsetX: 0,
                offsetY: 10,
                style: {
                    color: "#0000a0",
                    fontSize: '0.8vw',
                    fontWeight: 600,
                },
            },
        },
        yaxis: {
            min: brandInsightData['yMin'],
            max: brandInsightData['yMax'],
            labels: {
                formatter: function (value) {
                    return new Intl.NumberFormat('pt-BR').format(value.toFixed(0));
                },
                offsetX: -10,
                offsetY: 0,
                style: {
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book',
                },
            },
            axisTicks: {
                show: true,
                borderType: 'solid',
                color: '#78909C',
                width: 2,
            },
            title: {
                text: yLabel(),
                offsetX: 11,
                offsetY: 0,
                style: {
                    color: "#0000a0",
                    fontSize: '0.8vw',
                    fontFamily: 'MarsCentra-Book',
                },
            },
        },
        tooltip: {
            enabled: true,
            theme: 'dark',
            style: {
                fontSize: '0.8vw',
                fontFamily: "MarsCentra-Bold"
            },
            onDatasetHover: {
                highlightDataSeries: false,
            },
            custom: function ({seriesIndex, dataPointIndex, w}) {
                let se = w['config']['series'];
                let category = se[seriesIndex]['name'];
                let brand = se[seriesIndex]['data'][dataPointIndex]['name'];
                let brandDetails = se[seriesIndex]['data'][dataPointIndex];
                return (
                    '<div class="arrow_box">' +
                    "<span>" + category + ": " + brand + "<br/>" + `${intl.formatMessage({...messages[`brand_insights_current_sellout`]})} : ` + `${new Intl.NumberFormat('pt-BR').format(brandDetails['sellout_value'])}` + "<br/>"
                    + `${intl.formatMessage({...AppMessages[`kpi_target`]})} : ` + `${new Intl.NumberFormat('pt-BR').format(brandDetails['toolTip'])}` + "<br/>" + `${intl.formatMessage({...AppMessages[`growth`]})} : `+ `${new Intl.NumberFormat('pt-BR').format(brandDetails['y'])}` + "</span>" +
                    "</div>"
                );

            },
            marker: {
                show: true,
            },
        }
    };

    return (

        <ApexCharts options={bubbleOptions} series={brandInsightData['data']} type="bubble" height={height}/>

    );
}

PerformanceBubbleApex.propTypes = {
    brandTrendClickOnChange: PropTypes.func.isRequired,
};

export default memo(injectIntl(PerformanceBubbleApex));
