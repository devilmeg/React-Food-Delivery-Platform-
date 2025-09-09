import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import {useState,useEffect} from "react";

const Body=()=>{

    //Local state variable --super powerful variable
    const [listOfRestaurants,setListOfRestaurant]=useState([]); // Set initial state to an empty array
    const [filteredRestaurants,setFilteredRestaurants]=useState([]); // State to hold the filtered list
    const [searchText,setSearchText]=useState(""); // State to hold the search text
    // const [filteredRestaurants,setFilteredRestaurants]=useState([]); // State to hold the filtered list
    //A state to keep track of the next page URL
    const [nextPageUrl, setNextPageUrl] = useState(null);
    //A state to manage the loading stata for fetching more data
    // ...
const [isLoading, setIsLoading] = useState(false);
// ...
useEffect(()=>{
    if(isLoading){ // Corrected to 'isLoading'
        fetchMoreData();
    }
},[isLoading]); // Corrected dependency to 'isLoading'

   useEffect(()=>{
    fetchData();
    window.addEventListener("scroll",handleScroll);
    return()=>window.removeEventListener("scroll",handleScroll);
},[]);//this effect will run only once when the component is mounted.




    const handleScroll=()=>{
       if(window.innerHeight + document.documentElement.scrollTop>=document.documentElement.offsetHeight-50 && !isLoading && nextPageUrl){
    setIsLoading(true);
}
    };


    useEffect(()=>{
        fetchData();
    },[]);//this useEffect will run only once when the component is mounted.

    const fetchData = async () => {
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6229172&lng=77.4155731&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
    const json = await data.json();

    // Find the card that contains the restaurant list
    const restaurantGridCard = json?.data?.cards?.find(card => 
        card?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    // If the card is found, set the state with the list of restaurants
    if (restaurantGridCard) {
        const fetchedList = restaurantGridCard.card.card.gridElements.infoWithStyle.restaurants;
        const nextLink = json?.data?.cards?.find(card => 
            card?.data?.nextLink)?.data?.nextLink || null;
        setListOfRestaurant(fetchedList);
        setFilteredRestaurants(fetchedList);
        setNextPageUrl(nextLink);
    } else {
        console.error("Restaurant list not found in API response.");
        setListOfRestaurant([]); 
        setFilteredRestaurants([]);
    }
    };

    // Conditional rendering to show a loading state
    // if (listOfRestaurants.length === 0) {
    //     return <Shimmer />; // Show shimmer effect while loading
    // }

    //function to fetch more data
  const fetchMoreData = async () => {
        if (!nextPageUrl) {
            setIsLoadingMore(false);
            return;
        }

        try {
            // Construct the API URL using the offset parameter from the next page URL
            const data = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?offset=${new URLSearchParams(nextPageUrl).get('offset')}&page_type=DESKTOP_WEB_LISTING&lat=28.6229172&lng=77.4155731&is-seo-homepage-enabled=true`);
            const json = await data.json();

            const restaurantGridCard = json?.data?.cards?.find(card => 
                card?.card?.card?.gridElements?.infoWithStyle?.restaurants
            );

            if (restaurantGridCard) {
                const newRestaurants = restaurantGridCard.card.card.gridElements.infoWithStyle.restaurants;
                // Append the new restaurants to the existing list
                setListOfRestaurant(prevList => [...prevList, ...newRestaurants]);
                setFilteredRestaurants(prevList => [...prevList, ...newRestaurants]);
                // Update the nextPageUrl for the next fetch
                setNextPageUrl(json?.data?.cards?.find(card => card?.data?.nextLink)?.data?.nextLink);
            }
        } catch (error) {
            console.error("Failed to fetch more restaurants:", error);
        } finally {
            // Set isLoadingMore back to false once fetching is complete
            setIsLoadingMore(false);
        }
    };

    return listOfRestaurants.length === 0?<Shimmer/>:( 
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="text" className="search-box" placeholder="Search for Restaurant. . ." value={searchText} onChange={(e)=>{
                        setSearchText(e.target.value);
                    }}></input>
                    <button className="search-btn" onClick={()=>{
                        //filter the restaurant cards and update the UI
                        const filteredList=listOfRestaurants.filter((res)=>res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                        setFilteredRestaurants(filteredList);

                    }}>Search</button>
                </div>
                <button 
                className="filter-btn" 
                onClick={()=>{
                    const filteredList=listOfRestaurants.filter((res)=>res.info.avgRating > 4);
                    setFilteredRestaurants(filteredList);
                }}>Top Rated restaurant</button>
            </div>
            <div className="res-container">
                    {/* //RestroCard */}
                    {/* <RestaurantCard resName="Thakur Foods" cuisines="North-Indian,South-Indian, Chinese, Italian. . ."/> */}
                    {/* <RestaurantCard resData={resList[0]}/> */}
                    
                    {/* <RestaurantCard resName="KFC" cuisines="burger, pizza,potatao Chips. . ."/> */}
                    
                    {filteredRestaurants.map((restaurant)=>{
                        return <RestaurantCard key={restaurant.info.id} resData={restaurant} /> // ✅ pass resData as prop
                    })}
                                             {/* or with the below */}
                    {/* {resList.map((restaurant,index)=>{
                        return <RestaurantCard key={index} resData={restaurant} /> // ✅ pass resData as prop
                    })} */}
                    

            </div>
        </div>
    )
}

export default Body;// this is standard way to export a component.