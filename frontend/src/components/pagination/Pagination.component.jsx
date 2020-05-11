import React from 'react'
import MatrialUIPagination from '@material-ui/lab/Pagination';
import "./pagination.styles.scss"
const Pagination = ({resultsPerPage, totalResults, paginate, currentPage}) => {
    const pageNumbers = [];
    //for loop to add each page into a pageNumber array 
    for(let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++){
        pageNumbers.push(i);
    }
    return(
        <nav >
            <ul className='pagination' >
                {/* map each page number, so like for every pageNumber in pageNumbers  */}
                {pageNumbers.map(number => (  
                <li key={number}    
                    className={`page-item ${currentPage === number ? ' active' : ''}`}>
                    {/* creates a link for each page */}
                    <a onClick={() => paginate(number)} href='#' className='page-link'>
                    {number}
                    </a>
                </li>
                ))}
            </ul>
      </nav>
    )
}
export default Pagination