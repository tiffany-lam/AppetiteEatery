import React, { Component, useEffect, useState} from "react";
import { connect } from "react-redux";
import { setSearchbarValue } from "../../redux/ui/ui.actions";
import axios from "axios";
import Pagination from '@material-ui/lab/Pagination';
import { Link } from "react-router-dom";
//import style
import "./searchResult-page.styles.scss";
import RestaurantCard from "../../components/restaurant-listing-card/restaurantCard.component";

const SearchResult = ({searchbarValue, userAuth, ...otherProps}) =>{
  //[] is the initial value of results
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState("none");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(5);

     
    useEffect(() =>{
      let source = axios.CancelToken.source();
      const fetchData = async() =>{
        try{
          
          const res = axios.get(`http://127.0.0.1:5000/api/restaurant/search/${searchbarValue}`)
          .then(res => {
            console.log("Retrieved all data \n");
            
            setResults(res.data.search_results);
            //console.log(res.data.search_results);
          })
          .catch(error => console.error(error));

         
        }
        catch(e){
          console.error(e);
        }
    };
    if(searchbarValue !== "") fetchData();
    return () =>{
      source.cancel();
    };
  }, [searchbarValue]);

    return(
      <div>
          <div className = "filter"> 
              {/* {this.props.setSearchbarValue} */}
          </div>
          {/* {console.log("results: ", results)}
          {console.log("search_results: ", results.search_results)} */}
          {results.length === 0 ? (<h1>No results</h1>):(
            <div>
              {results.map((restaurant, i) =>(
                <Link key={i} to={`/restaurant/${restaurant._id}`}>
                <RestaurantCard restaurant={restaurant} className="card-margin" />
                </Link>
              
              ))}
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


}

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
export default connect(mapStateToProps, mapDispatchToProps) (SearchResult);