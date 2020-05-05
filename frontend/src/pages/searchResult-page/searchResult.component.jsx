import React, { Component, useEffect, useState} from "react";
import { connect } from "react-redux";
import { setSearchbarValue } from "../../redux/ui/ui.actions";
import axios from "axios";
import Pagination from '@material-ui/lab/Pagination';
//import style
import "./searchResult-page.styles.scss";
import RestaurantCard from "../../components/restaurant-listing-card/restaurantCard.component";
const restaurants = [
    {
      id: "lskdjf4568lds",
      name: "Waffle House",
      url:
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1547&q=80",
      rating: 4,
      limelightCondition: "Offering 20% all bread items!!",
    },
  
    {
      id: "feffs45648dfsdf",
  
      name: "Auntie Maile's",
      url:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80",
      rating: 3,
      limelightCondition: "Very close to graduating, don't miss out!",
    },
    {
      id: "lskdsdfdsfe5468jflds",
  
      name: "Vegeta",
      url:
        "https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2002&q=80",
      rating: 2,
      limelightCondition: "",
    },
    {
      id: "56864lsk546484djflds",
  
      name: "Joe's",
      url:
        "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80",
      rating: 5,
      limelightCondition: "",
    },
    {
      id: "sdfaghjjkfklskdj6548flds",
  
      name: "Prosperitis",
      url:
        "https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
      rating: 2,
      limelightCondition: "",
    },
    {
      id: "sdfsdf5879elqieiflsdfees",
  
      name: "Lime and Lemons",
      url:
        "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
      rating: 1,
      limelightCondition: "",
    },
    {
      id: "dfffffffffffflskerdjflds",
  
      name: "Potato's Sack",
      url:
        "https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80",
      rating: 4,
      limelightCondition: "",
    },
    {
      id: "668lskdj6888684flds",
  
      name: "Engrave",
      url:
        "https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      rating: 3,
      limelightCondition: "",
    },
    {
      id: "aaaaerzzzfeksdf/fs8djflds",
  
      name: "To Eat or 2Eat",
      url:
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      rating: 4,
      limelightCondition: "",
    },
  ];

const SearchResult = ({searchbarValue, userAuth, ...otherProps}) =>{
  const [results, setResults] = useState({restaurants: [], tags: []});
  const [filter, setFilter] = useState("none");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(5);

     
    useEffect(() =>{
      let source = axios.CancelToken.source();
      const fetchData = async() =>{
        try{
          const res = await axios.get("http://127.0.0.1:5000/api/restaurant")
          .then(res => {
            console.log("Retrieved all data \n");
            console.log(res.data);
          })
          .catch(error => console.error(error));

          setResults(res.data);
        }
        catch(e){
          console.error(e);
        }
    };
    if(searchbarValue !== "") fetchData();
    return () =>{
      source.cancel();
    };
  }, searchbarValue);

  useEffect(() => {});
    return(
      <div>
          <div className = "filter"> 
              {/* {this.props.setSearchbarValue} */}
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