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
  //by default the restaurants will be sorted by date ratings ;; subject to change
  const[sortType, setSortType] = useState('ratings');
  const [filter, setFilter] = useState("none");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultPerPage] = useState(5);

  //this useEffect is to get the results to retrieve all the data 
  useEffect(() => {
    let source = axios.CancelToken.source();
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = axios
          .get(`${BASE_API_URL}/restaurant/search/${searchbarValue}`, {cancelToken: source.token})
          .then((res) => {
            console.log("Retrieved all data \n");
            //console.log(res);
            //console.log(res.data);
            //if the data returned isn't undefined or null then set the result
            if(res.data.search_results){
              setLoading(false);
              setResults(res.data.search_results);
              
            }
            
            //console.log(res.data.search_results);

          })
          .catch((error) => {console.error(error)});
      } catch (e) {
        if(axios.isCancel(e)){
          console.log("request cancelled")
        }
        console.error(e);
      }
    };
    if (searchbarValue !== "" || searchbarValue !== " ") fetchData();
    return () => {
      setLoading(false);
      source.cancel();
    };
  }, [searchbarValue]);
  //use another useEffect to sort
  useEffect(() => {
    const sortArray = type =>{
      const types = {
        dateOld: 'dateOpenOld',
        dateNew: 'dateOpenNew',
        ratings: 'average',
        distance: 'location'
      };
      const sortProperty = types[type];
      console.log(sortProperty);
      //sort - returns negative value is first argument is less than second
      //use ... to clone before we sort
      console.log([...result])
      if(sortProperty === 'dateOpenNew'){
        const sorted = [...results].sort((a,b) => a[sortProperty] > b[sortProperty]);
      }
      
      if(sortProperty === 'dateOpenOld'){
        const sorted = [...results].sort((a,b) => b.dateOpen > a.dateOpen);
      }
      else{
        const sorted = [...results].sort((a,b) => b[sortProperty] - a[sortProperty]);
      }
      console.log("sorted", sorted);
      setResults(sorted);
    };
    sortArray(sortType);
  }, [sortType]); //returns the sorted array 
  //sort filters - this will sort the restaurants based on the selected options in the dropdown
 
  //Get current results 
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  return (
    <section>
        {/* // if result length is 0 show no results, */} 
        {results.length === 0 ? <h1>No results</h1>
        //if loading is true show loading, 
        : loading === true ? <h1> Loading... </h1>
        //else show results 
        : (
          <div className = "resultsContainer"> 
            {/* disable dropdown while API request is being made */}
            <section className = "dropdown" disabled = {loading}>
              <select className = "sortby" onChange={(e) => setSortType(e.target.value)} >
                <option value = "rating">Highest Rating</option>
                <option value ="distance">Distance</option>
                <option value = "dateNew">Date opened (newest)</option>
                <option value = "dateOld">Date opened (oldest)</option>
              </select>
            </section>
            <section>
               {/* this is each of the restaurants that will show up in our search, based on what the user searches */}
              <Results results={currentResults} loading={loading} />
            </section> 
            <section className = "pagination-container">
              <Pagination resultsPerPage={resultsPerPage} totalResults={results.length} 
              paginate = {paginate}
              currentPage = {currentPage} />
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
