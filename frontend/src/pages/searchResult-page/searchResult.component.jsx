import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { setSearchbarValue } from "../../redux/ui/ui.actions";
import axios from "axios";

import { BASE_API_URL } from "../../utils";

//import the results 
import Results from "../../components/search-result/Results.component";
//import the pagination
import Pagination from "../../components/pagination/Pagination.component"
//import style
import "./searchResult-page.styles.scss";


const SearchResult = ({ searchbarValue, userAuth, ...otherProps }) => {
  //[] is the initial value of results
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState("none");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultPerPage] = useState(10);
  useEffect(() => {
    let source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const res = axios
          .get(`${BASE_API_URL}/restaurant/search/${searchbarValue}`)
          .then((res) => {
            console.log("Retrieved all data \n");
            console.log(res);
            console.log(res.data);
            // if(!res.data.includes("html")){
            //   setResults(res.data.search_results);
            // }
            if(res.data.search_results){
              setResults(res.data.search_results);
            }
            
            //console.log(res.data.search_results);

          })
          .catch((error) => {console.error(error)});
      } catch (e) {
        console.error(e);
      }
    };
    if (searchbarValue !== "" || searchbarValue !== " ") fetchData();
    return () => {
      setLoading(false);
      source.cancel();
    };
  }, [searchbarValue]);
  
  //Get current results 
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  return (
   
    <div>
      
      <div className="filter">{/* {this.props.setSearchbarValue} */}</div>
      {/* {console.log("results: ", results)}
          {console.log("search_results: ", results.search_results)} */}
      {results.length === 0 ? (
        <h1>No results</h1>
      ) : (
        <div>
          <Results results={currentResults} loading={loading} />
          <Pagination resultsPerPage={resultsPerPage} totalResults={results.length} 
          paginate = {paginate}
          currentPage = {currentPage} />
        </div>
      )}
      {/* <Pagination
              className = "pagination"
              total =
              page = {this.state.page}
              pageWindowLength={5}
              onChange = {this.handleOnChange}
          /> */}
    </div>
  );
};

/* class searchResult extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: 1,
            total: undefined,
            searchbarValue : "asda",
        };
    }
    // handleOnChange = pageValue =>{
    //     setPage(pageValue)
    // }
    onSearchChange = e =>{

    }
    render(){
        return(
            <div>
                <div className = "filter"> 
                    {this.props.setSearchbarValue}
                </div>
                {restaurants.map((restaurant, i) =>(
                <RestaurantCard
                    to={`/restaurant/${restaurant.id}`}
                    restaurantName={restaurant.name}
                    rating={restaurant.rating}
                    imageUrl={restaurant.url}
                    address={restaurant.address}

                />
                ))}
                <Pagination
                    className = "pagination"
                    total ={this.state.total}
                    page = {this.state.page}
                    pageWindowLength={5}
                    onChange = {this.handleOnChange}
                />
            </div>
           
        );
    }
} */
const mapStateToProps = (state) => ({
  searchbarValue: state.ui.searchbarValue,
});

const mapDispatchToProps = (dispatch) => ({
  setSearchbarValue: (uid) => dispatch(setSearchbarValue(uid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
