import React from 'react'
import MatrialUIPagination from '@material-ui/lab/Pagination';
import "./pagination.styles.scss"
const Pagination = ({resultsPerPage, totalResults, paginate, currentPage}) => {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++){
        pageNumbers.push(i);
    }
    return(
        // <MatrialUIPagination
        //     className = "pagination"
        //     count = {pageNumbers.length}
        //     page = {currentPage}
        //     pageWindowLength={resultsPerPage}
        //     onChange = {()=>paginate(number)}
        // />
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                   
                <li key={number}    
                    className={`page-item ${currentPage === number ? ' active' : ''}`}>

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