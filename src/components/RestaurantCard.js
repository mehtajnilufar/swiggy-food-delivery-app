function RestaurantCard({ name, cuisine, rating }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "12px",
      width: "180px",
      padding: "12px",
      backgroundColor: "#fff",
      margin: "16px",
      boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
      textAlign: "center"
    }}>
      <img
        src="https://via.placeholder.com/150"
        alt="Food"
        style={{ borderRadius: "8px", width: "100%", height: "120px" }}
      />
      <h3 style={{ fontSize: "16px", margin: "10px 0" }}>{name}</h3>
      <p style={{ color: "gray", fontSize: "14px" }}>{cuisine}</p>
      <p style={{ fontWeight: "bold", color: "green" }}>⭐ {rating}</p>
    </div>
  );
}

export default RestaurantCard;
