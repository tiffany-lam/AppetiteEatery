/* 
  Author: Tiffany Lam 
  Main function: searchResult is a component that retrieves data using AXIOS/Flask to pull from restaurants based on what the user searches from the database. This component is rendered on the /search page and includes pagination, and a sort filter to sort the results. 
 */
import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { setSearchbarValue } from "../../redux/ui/ui.actions";
import axios from "axios";
import { BASE_API_URL } from "../../utils";

//import the results
import Results from "../../components/search-result/Results.component";
//import the pagination
import Pagination from "../../components/pagination/Pagination.component";
//import custom loading animation
import LoadingAnimation from "../../components/loading-animation/loading-animation.component";
//import style
import "./searchResult-page.styles.scss";

const SearchResult = ({ searchbarValue, userAuth, ...otherProps }) => {
  //[] is the initial value of results
  const [results, setResults] = useState([]);
  //by default the restaurants will be sorted by date ratings ;; subject to change
  const [sortType, setSortType] = useState("rating");
  //const [filter, setFilter] = useState("none");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultPerPage] = useState(5);

  //this useEffect is to get the results to retrieve all the data
  useEffect(() => {
    setCurrentPage(1); //new results start at page 1
    let source = axios.CancelToken.source();
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = axios
          .get(`${BASE_API_URL}/restaurant/search/${searchbarValue}`, {
            cancelToken: source.token,
          })
          .then((res) => {
            console.log("Retrieved all data \n");
            //console.log(res);
            //console.log(res.data);
            //if the data returned isn't undefined or null then set the result
            if (res.data.search_results) {
              setLoading(false);
              //because we are on the main search page, we only want NICHE restaurants aka restaurants under 10 reviews for demos we use 10 because we would need a lot of reviews. 
              //.filter looks through array
              console.log("search results:", res.data.search_results);
              setResults(
                res.data.search_results.filter(
                  (restaurant) => restaurant.reviews.length < 10
                ) //based on this conditon it will refill the array
              );
            }

            //console.log(res.data.search_results);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log("request cancelled");
        }
        console.error(e);
      }
    };
    if (searchbarValue !== "" || searchbarValue !== " ") fetchData();
    if (searchbarValue === "" || searchbarValue === " ") setLoading(false);

    return () => {
      //COMPONENT UNMOUNT
      setLoading(false);
      source.cancel();
    };
  }, [searchbarValue]);
  //use another useEffect to sort
  useEffect(() => {
    sortArray(sortType);
  }, [sortType]); //returns the sorted array
  //sort filters - this will sort the restaurants based on the selected options in the dropdown
  const sortArray = type =>{
    console.log("type: ", type)
    let sorted = [...results]; 
    //sort - returns negative value is first argument is less than second
    //use ... to clone before we sort
    if(type === 'rating'){
      sorted.sort((a,b) => b.average - a.average);
    }
    else if(type === 'dateNew'){
      //if the date is less that means that date is smaller aka newer; so if a is less than b that means a is newest so it goes before b thius return 1 if a is newer than b
      sorted.sort((a, b) => (a.dateOpen < b.dateOpen ? 1 : -1));
    } else if (type === "dateOld") {
      //if the date is greater that means that date is older; so if a is greater than b that means a is older so it goes before b thus return 1 if a is oldder than b
      sorted = [...results].sort((a, b) => (a.dateOpen > b.dateOpen ? 1 : -1));
    }
    // else if(type == 'location'){
    //   sorted = [...results].sort((a,b) => b.location - a.location);
    // }
    //const sorted = [...results].sort((a,b) => b[sortProperty] - a[sortProperty]);
    //const sorted = [...results].sort((a,b) => a.sortProperty - b.sortProperty);

    console.log("sorted", sorted);
    setResults(sorted);
  };
  //Get current results
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <section className="search-results-container">
      {/* // if result length is 0 show no results, */}
      {loading === true ? (
        <LoadingAnimation
          // horizontal
          // background
          text1="Searching for restaurants.."
        />
      ) : //if loading is true show loading,
      results.length === 0 ? (
        <h1>No results</h1>
      ) : (
        //else show results
        <div className="resultsContainer">
          {/* disable dropdown while API request is being made */}
          <section className="dropdown" disabled={loading}>
            <select
              className="sortby"
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="rating">Highest Rating</option>
              <option value="distance">Distance</option>
              <option value="dateNew">Date opened (newest)</option>
              <option value="dateOld">Date opened (oldest)</option>
            </select>
          </section>
          <section>
            {/* this is each of the restaurants that will show up in our search, based on what the user searches */}
            <Results results={currentResults} loading={loading} />
          </section>
          <section className="pagination-container">
            <Pagination
              resultsPerPage={resultsPerPage}
              totalResults={results.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </section>
        </div>
      )}
    </section>
  );
};

const mapStateToProps = (state) => ({
  searchbarValue: state.ui.searchbarValue,
});

const mapDispatchToProps = (dispatch) => ({
  setSearchbarValue: (uid) => dispatch(setSearchbarValue(uid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
