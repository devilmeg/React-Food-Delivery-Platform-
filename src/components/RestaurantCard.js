import { CDN_URL } from "../utils/constants";
const RestaurantCard = (props) => {
    const { resData } = props;
    const { 
        name,
        cuisines,
        costForTwo,
        avgRating,
        totalRatingsString,
        cloudinaryImageId,
        sla
    } = resData?.info || {}; // Safely destructure with optional chaining

    return (
        <div className="res-card">
            <img alt="res-logo" src={CDN_URL + cloudinaryImageId} />
            <h4>{name}</h4>
            <h4>{cuisines?.join(", ") ?? "Cuisines not available"}</h4>
            <h4>{costForTwo}</h4>
            <h4>Rating: {avgRating} ⭐</h4>
            <h4>Total Ratings: {totalRatingsString || "No Ratings"}</h4>
            <h4>Delivery Time: {sla?.deliveryTime} mins</h4>
            <button className="order-button">Order Now</button>
        </div>
    );
}

export default RestaurantCard;