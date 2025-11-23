import { useEffect, useState } from "react";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";

const FALLBACK_RESTAURANTS = [
  { name: "Domino’s Pizza", cuisine: "Pizza, Fast Food", rating: 4.2 },
  { name: "KFC", cuisine: "Chicken, Fast Food", rating: 4.1 },
  { name: "Meghna Foods", cuisine: "Biryani, North Indian", rating: 4.4 },
  { name: "Burger King", cuisine: "Burgers, Fast Food", rating: 4.0 },
];

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.385044&lng=78.486671"
      );
      const json = await response.json();

      // console.log("API DATA:", json);  // optional debug

      const apiList =
        json?.data?.cards?.find(
          (c) => c?.card?.card?.id === "restaurant_grid_listing"
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      let finalList = apiList.map((res) => ({
        name: res.info.name,
        cuisine: res.info.cuisines?.join(", ") || "",
        rating: res.info.avgRating || "-",
      }));

      // Agar API kuch na de, to fallback use karo
      if (finalList.length === 0) {
        finalList = FALLBACK_RESTAURANTS;
      }

      setRestaurants(finalList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      // Error pe bhi fallback use karo
      setRestaurants(FALLBACK_RESTAURANTS);
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <h2 style={{ marginLeft: "16px" }}>Restaurants Near You 🍽️</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <h3>Loading Restaurants...</h3>
        ) : (
          restaurants.map((res, index) => (
            <RestaurantCard
              key={index}
              name={res.name}
              cuisine={res.cuisine}
              rating={res.rating}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
