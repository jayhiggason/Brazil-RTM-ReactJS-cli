import htmlToImage from "html-to-image";
import PptxGenJS from "pptxgenjs";
import request from "./request";
import url from "../config.json"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const generateMetadataForPpt = (pptx, val) => {

    const authorName = val.Author;
    const companyName = 'Mu-Sigma Business Solutions Pvt. Ltd.';
    const revisionNo = '10';
    const subject = val.Name;
    const title = 'Sample Presentation';

    pptx.author = authorName;
    pptx.Company = companyName;
    pptx.Revision = revisionNo;
    pptx.Subject = subject;
    pptx.Title = title;

    pptx.defineSlideMaster({
        title: 'MASTER_SLIDE',
        bkgd: 'FFFFFF',
        objects: [
            //   { 'line':  { x: 3.5, y:1.00, w:6.00, line:'0088CC', lineSize:5 } },
            {'rect': {x: 0, y: 7, w: '100%', h: 0.5, fill: '003b75'}},
            {
                'text': {
                    text: '© Copyright 2011. All Rights Reserved. MARS INC.',
                    options: {x: 0, y: 7.1, w: '100%', align: 'c', color: 'FFFFFF', fontSize: 12}
                }
            },
            // { 'image': { x:0, y:0, w:1.6, h:0.75, path: './mars-logo1.png' } }
        ],
        slideNumber: {x: 1, y: 7.1, color: 'FFFFFF'}
    });
};


export function exportToPpt(val) {
    let PPTXFile = new PptxGenJS();
    PPTXFile.layout = 'LAYOUT_WIDE';
    generateMetadataForPpt(PPTXFile, val);

    let x = new Promise((resolve, reject) => {
        let i = 0;
        val.pages.map((item) => {
            htmlToImage.toPng(document.getElementById(item.id))
                .then(function (dataUrl) {
                    i++;
                    let slide = PPTXFile.addNewSlide('MASTER_SLIDE');
                    slide.addText(item.title, {x: '5%', y: '5%', w: '90%', align: 'c', fontSize: 16, bold: true});
                    slide.addImage({data: dataUrl, x: '5%', y: '10%', w: '80%', h: '80%'});
                    if (i === val.pages.length) {
                        resolve();
                    }
                }).catch((e) => {
                console.log(e);
                reject();
            });
        });

    }).then(() => {
    });

    x.then(() => {
        const date = new Date();
        const fileName = `${val.Name}_${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
        PPTXFile.writeFile(fileName)
            .then(fileName => {
                console.log(`created file: ${fileName}`);
            });
    }).catch(() => {
    });

}

export function getSecretKey(secretName) {
    const {scmosUrl} = url;
    const keyUrl = scmosUrl + "/scmos_get_key";
    return request(keyUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-functions-key": "wKsNqd1d9886iMK7apMsG3B3nuRcfEmtWBvnDK6bz3FBRb6tarOXTg=="
        },
        body: JSON.stringify({secret: secretName})
    });
}

function convertToCSV(objArray, headers) {
    const csvRows = [];
    const headersArray = headers.map(header => header.dataField);
    const transformedHeader = headers.map((item) => item.text);
    csvRows.push(transformedHeader.join(','));
    for (const row of objArray) {
        const values = headersArray.map(header => {
            let escaped = "NA";
            if (row[header] || row[header] === 0) {
                escaped = ('' + row[header]).replace(/"/g, '\\"');
            }
            return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
}

function download(csv, exportedFileName, resolve) {
    let blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFileName);
    } else {
        let link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            let url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFileName);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
    resolve();
}

export function exportCSVFile(items, fileTitle, headers) {
    return new Promise((resolve, reject) => {
        try {
            let csv = convertToCSV(items, headers);
            let exportedFileName = fileTitle + '.csv' || 'export.csv';
            download(csv, exportedFileName, resolve);
        } catch (e) {
            reject();
        }

    })
}

let myVar = null;

export async function createAndApplyClass(classString, id, className) {
    try {
        const ElementCreated = await checkElementCreated(id);
        if (ElementCreated) {

            let style = document.createElement('style');
            // style.type = 'text/css';
            style.innerHTML = classString;
            document.getElementsByTagName('head')[0].appendChild(style);
            document.getElementById(id).className = className;
        }
    } catch (e) {
    }
}

const checkElementCreated = async (id) => {
    return new Promise((resolve, reject) => {
        myVar = setInterval(() => {
            try {
                let node = document.getElementById(id);
                if (node !== null) {
                    resolve(true);
                    clearInterval(myVar);
                }
            } catch (e) {

            }

        }, 10);
    });
};

export function roleFormatter(cell) {
    switch (cell) {
        case "super_user":
            return "Super User";
        case "mars_associate":
            return "Mars Associate";
        case "customer_admin":
            return "Customer Admin";
        case "customer_user":
            return "Customer User";
        default:
            return "NA"
    }
}



const secret = 'secret';

export {secret};

function getUTC(date) {
    let newDate = new Date(date);
    return Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), newDate.getHours(), newDate.getMinutes(), newDate.getSeconds(), newDate.getMilliseconds())
}


export const trainingVideos = () => {
    return [
        {
            title: "Promotions",
            src: "<script src=\"https://fast.wistia.com/embed/medias/auc5mtgvq7.jsonp\" async></script><script src=\"https://fast.wistia.com/assets/external/E-v1.js\" async></script><div class=\"wistia_responsive_padding\" style=\"padding:56.25% 0 0 0;position:relative;\"><div class=\"wistia_responsive_wrapper\" style=\"height:100%;left:0;position:absolute;top:0;width:100%;\"><div class=\"wistia_embed wistia_async_auc5mtgvq7 playerColor='000 ' videoFoam=true \" style=\"height:100%;position:relative;width:100%\"><div class=\"wistia_swatch\" style=\"height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;\"><img src=\"https://fast.wistia.com/embed/medias/auc5mtgvq7/swatch\" style=\"filter:blur(5px);height:100%;object-fit:contain;width:100%;\" alt=\"\" aria-hidden=\"true\" onload=\"this.parentNode.style.opacity=1;\" /></div></div></div></div>",
            length: "4:40"
        },
        {
            title: "Items (Product Master Search)",
            src: "<script src=\"https://fast.wistia.com/embed/medias/rsewkutme3.jsonp\" async></script><script src=\"https://fast.wistia.com/assets/external/E-v1.js\" async></script><div class=\"wistia_responsive_padding\" style=\"padding:56.25% 0 0 0;position:relative;\"><div class=\"wistia_responsive_wrapper\" style=\"height:100%;left:0;position:absolute;top:0;width:100%;\"><div class=\"wistia_embed wistia_async_rsewkutme3 playerColor='000 ' videoFoam=true \" style=\"height:100%;position:relative;width:100%\"><div class=\"wistia_swatch\" style=\"height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;\"><img src=\"https://fast.wistia.com/embed/medias/rsewkutme3/swatch\" style=\"filter:blur(5px);height:100%;object-fit:contain;width:100%;\" alt=\"\" aria-hidden=\"true\" onload=\"this.parentNode.style.opacity=1;\" /></div></div></div></div>",
            length: "2:16"
        },
        {
            title: "Customers (Customer Master Search)",
            src: "<script src=\"https://fast.wistia.com/embed/medias/2jqcl4lr0v.jsonp\" async></script><script src=\"https://fast.wistia.com/assets/external/E-v1.js\" async></script><div class=\"wistia_responsive_padding\" style=\"padding:56.25% 0 0 0;position:relative;\"><div class=\"wistia_responsive_wrapper\" style=\"height:100%;left:0;position:absolute;top:0;width:100%;\"><div class=\"wistia_embed wistia_async_2jqcl4lr0v playerColor='000 ' videoFoam=true \" style=\"height:100%;position:relative;width:100%\"><div class=\"wistia_swatch\" style=\"height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;\"><img src=\"https://fast.wistia.com/embed/medias/2jqcl4lr0v/swatch\" style=\"filter:blur(5px);height:100%;object-fit:contain;width:100%;\" alt=\"\" aria-hidden=\"true\" onload=\"this.parentNode.style.opacity=1;\" /></div></div></div></div>",
            length: "1:07"
        },
        {
            title: "Risks (Items Under Review)",
            src: "<script src=\"https://fast.wistia.com/embed/medias/oqu72eatp7.jsonp\" async></script><script src=\"https://fast.wistia.com/assets/external/E-v1.js\" async></script><div class=\"wistia_responsive_padding\" style=\"padding:56.25% 0 0 0;position:relative;\"><div class=\"wistia_responsive_wrapper\" style=\"height:100%;left:0;position:absolute;top:0;width:100%;\"><div class=\"wistia_embed wistia_async_oqu72eatp7 playerColor='000 ' videoFoam=true \" style=\"height:100%;position:relative;width:100%\"><div class=\"wistia_swatch\" style=\"height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;\"><img src=\"https://fast.wistia.com/embed/medias/oqu72eatp7/swatch\" style=\"filter:blur(5px);height:100%;object-fit:contain;width:100%;\" alt=\"\" aria-hidden=\"true\" onload=\"this.parentNode.style.opacity=1;\" /></div></div></div></div>",
            length: "3:13"
        },
        {
            title: "Risk App",
            src: "<script src=\"https://fast.wistia.com/embed/medias/6kycpl21ci.jsonp\" async></script><script src=\"https://fast.wistia.com/assets/external/E-v1.js\" async></script><div class=\"wistia_responsive_padding\" style=\"padding:56.25% 0 0 0;position:relative;\"><div class=\"wistia_responsive_wrapper\" style=\"height:100%;left:0;position:absolute;top:0;width:100%;\"><div class=\"wistia_embed wistia_async_6kycpl21ci playerColor='000 ' videoFoam=true \" style=\"height:100%;position:relative;width:100%\"><div class=\"wistia_swatch\" style=\"height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;\"><img src=\"https://fast.wistia.com/embed/medias/6kycpl21ci/swatch\" style=\"filter:blur(5px);height:100%;object-fit:contain;width:100%;\" alt=\"\" aria-hidden=\"true\" onload=\"this.parentNode.style.opacity=1;\" /></div></div></div></div>",
            length: "2:01"
        },
        {
            title: "Recommendation Engine",
            src: "<script src=\"https://fast.wistia.com/embed/medias/3tizc6zov6.jsonp\" async></script><script src=\"https://fast.wistia.com/assets/external/E-v1.js\" async></script><div class=\"wistia_responsive_padding\" style=\"padding:56.25% 0 0 0;position:relative;\"><div class=\"wistia_responsive_wrapper\" style=\"height:100%;left:0;position:absolute;top:0;width:100%;\"><div class=\"wistia_embed wistia_async_3tizc6zov6 playerColor='000 ' videoFoam=true \" style=\"height:100%;position:relative;width:100%\"><div class=\"wistia_swatch\" style=\"height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;\"><img src=\"https://fast.wistia.com/embed/medias/3tizc6zov6/swatch\" style=\"filter:blur(5px);height:100%;object-fit:contain;width:100%;\" alt=\"\" aria-hidden=\"true\" onload=\"this.parentNode.style.opacity=1;\" /></div></div></div></div>",
            length: "2:19"
        }
    ];
};

export const TransformPerformanceSummaryCardsData = (data, showUnits = true, showInvoice = true) => {
    const salesStrike = {title: 'Sales Strike', dataField: 'sales_strike'};
    let invoice_gsv = {};
    if (showInvoice) {
        invoice_gsv = {title: 'Invoice', dataField: 'invoice'};
    } else {
        invoice_gsv = {title: 'GSV', dataField: 'gsv'};
    }
    let tonnes_units = {};
    if (showUnits) {
        tonnes_units = {title: 'Units', dataField: 'units'};
    } else {
        tonnes_units = {title: 'Tonnes', dataField: 'tonnes'};
    }
    const wos = {title: 'Weeks of Stock', dataField: 'wos'};
    const titleToDataFieldMap = [salesStrike, invoice_gsv, tonnes_units, wos];
    let cardArray = [];
    titleToDataFieldMap.map((x) => {
        cardArray.push({
            title: x.title,
            valueTY: data[x.dataField]['value'],
            valueLY: data[x.dataField]['last_year'],
            change: data[x.dataField]['target'],
            kpi: x.dataField
        })
    });
    return cardArray;
};


export const TransformBrandDeepDiveCardsData = (data, showUnits = true, showInvoice = true) => {
    const pos = {title: 'Point of Sales', dataField: 'pos'};
    let invoice_gsv = {};
    if (showInvoice) {
        invoice_gsv = {title: 'Invoice', dataField: 'invoice'};
    } else {
        invoice_gsv = {title: 'GSV', dataField: 'gsv'};
    }
    let tonnes_units = {};
    if (showUnits) {
        tonnes_units = {title: 'Units', dataField: 'units'};
    } else {
        tonnes_units = {title: 'Tonnes', dataField: 'tonnes'};
    }
    const wos = {title: 'Weeks of Stock', dataField: 'wos'};
    const titleToDataFieldMap = [pos, invoice_gsv, tonnes_units, wos];
    let cardArray = [];
    titleToDataFieldMap.map((x) => {
        cardArray.push({
            title: x.title,
            valueTY: data[x.dataField]['value'],
            valueLY: data[x.dataField]['last_year'],
            change: data[x.dataField]['target'],
            kpi: x.dataField
        })
    });
    return cardArray;
};


export const transformTrendLine = (data) => {
    let lines = Object.keys(data);
    let xAxis = data[lines[0]]['xAxis'];
    let series = lines.map((item) => {
        return {
            name: item,
            data: data[item]['yAxis']
        }
    });
    return {
        xAxis: xAxis,
        series: series
    }
};

export const getTimeRangeFilterData = (data) => {
    if (data === "YTD")
        return ['YTD', 'QTD'];
    else if (data === 'QTD')
        return ['QTD'];
    else if (data === 'PTD')
        return ['PTD'];
    else if (data === '')
        return [];
};


export const TransformDistDeepDiveCardsData = (data, showTonnes = true, showInvoice = true) => {
    const wos = {title: 'Weeks of Stock', dataField: 'wos'};
    const eos = {title: 'Estimate of Sellout', dataField: 'eos_tonnes'};
    if (!showTonnes) {
        eos['dataField'] = 'eos_gsv'
    }
    let invoice_gsv = {};
    if (showInvoice) {
        invoice_gsv = {title: 'Invoice', dataField: 'invoice'};
    } else {
        invoice_gsv = {title: 'GSV', dataField: 'gsv'};
    }
    const titleToDataFieldMap = [eos, wos, invoice_gsv];
    let cardArray = [];
    titleToDataFieldMap.map((x) => {
        if(x.dataField === "eos_tonnes" || x.dataField ==="eos_gsv"){
            cardArray.push({
                title: x.title,
                "valueCY": data[x.dataField]['valueCY'],
                "targetCY": data[x.dataField]['targetCY'],
                "valueCP": data[x.dataField]['valueCP'],
                "targetCP": data[x.dataField]['targetCP'],
                kpi: x.dataField
            })
        } else {
            cardArray.push({
                title: x.title,
                valueTY: data[x.dataField]['value'],
                valueLY: data[x.dataField]['last_year'] | 0,
                change: data[x.dataField]['target'],
                kpi: x.dataField
            })
        }

    });
    return cardArray;
};


export const exportPdf = (id, fileName) => {
    html2canvas(document.getElementById(id), {scale: 0.45}).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save(fileName);
    });
};
