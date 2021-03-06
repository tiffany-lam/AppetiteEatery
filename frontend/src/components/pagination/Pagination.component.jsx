/*
  Contributors: Tiffany Lam
  Course: CECS 470

  Description: This component creates a pagination that can be used in any page. It takes in the currentPage, totla number of results, how many results you want to display per page, and the paginate prop (which does the pagination).
*/
import React from "react";
import "./pagination.styles.scss";
const Pagination = ({
  resultsPerPage,
  totalResults,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  //for loop to add each page into a pageNumber array
  for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="pagination-nav">
      <ul className="pagination">
        {/* map each page number, so like for every pageNumber in pageNumbers  */}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? " active" : ""}`}
          >
            {/* creates a link for each page */}
            {/* according to w3.org, we can have an a tag without a href:
                     "If the a element has no href attribute, then the element represents a placeholder for where a link might otherwise have been placed, if it had been relevant."*/}
            <a
              onClick={() => paginate(number)}
              className="page-link"
              role="button"
              tabIndex="0"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Pagination;
