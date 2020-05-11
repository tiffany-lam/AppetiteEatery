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
      try {
        const res = axios
          .get(`${BASE_API_URL}/restaurant/search/${searchbarValue}`)
          .then((res) => {
            console.log("Retrieved all data \n");
            console.log(res);
            console.log(res.data);
            //if the data returned isn't undefined or null then set the result
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
  //use another useEffect to sort
  useEffect(() => {
    const sortArray = type =>{
      const types = {
        dateOld: 'date',
        dateNew: 'date',
        rating: 'ratings',
        distance: 'distance'
      };
      const sortProperty = types[type];
      //sort - returns negative value is first argument is less than second
      //use ... to clone before we sort
      const sorted = [...results].sort((a,b) => b[sortProperty] - a[sortProperty])
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
        {results.length === 0 ? (
          <h1>No results</h1>
        )  
        //else
        :( 
          <div className = "resultsContainer"> 
            <section className = "dropdown">
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
