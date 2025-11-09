import { useEffect,useState } from "react";
import { MENU_URL } from "../utils/constants";

const useRestaurantMenu=(resId)=>{
    // Custom hook logic here
    const [resInfo,setResInfo]=useState(null);
    //fetch the data from api
    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData=async()=>{
       try{
         const data=await fetch(MENU_URL+resId+"&isMenuUx4=true&submitAction=ENTER");        
       
       const json=await data.json();
       console.log(json);
         setResInfo(json.data);
       }catch(error){
        console.log("Failed to fetch the restaurant data:", error);
       }

    }
    return resInfo;
}
export default useRestaurantMenu;