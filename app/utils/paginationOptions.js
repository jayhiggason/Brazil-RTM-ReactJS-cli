import React from "react";
import AppMessages from "../containers/App/messages";
import {FormattedMessage} from "react-intl";

const pageButtonRenderer = ({page, active, onPageChange}) => {
    const handleClick = (e) => {
        e.preventDefault();
        onPageChange(page);
    };

    const activeStyle = {padding: "10px"};
    if (active) {
        activeStyle.backgroundColor = "rgba(0, 0, 0, .06)";
    } else {
    }
    if (typeof page === "string") {
    }
    return (
        <li className="pagination">
            <a href="#" onClick={handleClick} style={activeStyle}>
                {page}
            </a>
        </li>
    );
};

const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
    <FormattedMessage {...AppMessages[`showing`]} /> {from} <FormattedMessage {...AppMessages[`to`]} /> {to} <FormattedMessage {...AppMessages[`of`]} /> {size} <FormattedMessage {...AppMessages[`results`]} />
  </span>
);
//
// const sizePerPage = (size) => (
//     {
//         text: "5",
//         value: 5,
//     },
//         {
//             text: "10",
//             value: 10,
//         },
//         {
//             text: 'All',
//             value: {size}
//         }
//
// );

const paginationOptions = {
    // pageButtonRenderer,
    paginationSize: 5,
    pageStartIndex: 1,
    firstPageText: <FormattedMessage {...AppMessages[`first`]} />,
    prePageText: <FormattedMessage {...AppMessages[`back`]} />,
    nextPageText: <FormattedMessage {...AppMessages[`next`]} />,
    lastPageText: <FormattedMessage {...AppMessages[`last`]} />,
    nextPageTitle: <FormattedMessage {...AppMessages[`firstPage`]} />,
    prePageTitle: <FormattedMessage {...AppMessages[`prePage`]} />,
    firstPageTitle: <FormattedMessage {...AppMessages[`nextPage`]} />,
    lastPageTitle: <FormattedMessage {...AppMessages[`lastPage`]} />,
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
        {
            text: "5",
            value: 5,
        },
        {
            text: "10",
            value: 10,
        },
        // {
        //     text: 'All',
        //     value: data.length
        // },
    ],
};



export {paginationOptions};
