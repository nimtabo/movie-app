import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Popover } from "antd";
import { IMAGE_URL } from "../../Config";
import "./FavoritePage.css";

function FavoritePage() {
  const variables = { userFrom: localStorage.getItem("userId") };

  const [FavoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => fetchFavoriteMovies(), []);
  // Fetch Favorite movies
  const fetchFavoriteMovies = () => {
    Axios.post("/api/favorite/getFavoriteMovie", variables).then((response) => {
      if (response.data.success) {
        setFavoriteMovies(response.data.favorites);
      } else {
        alert("Failed to get favorite movies");
      }
    });
  };
  // REmove From Favorite
  const handleRemove = (movieId) => {
    const variables = { movieId, userFrom: localStorage.getItem("userId") };

    Axios.post("/api/favorite/removeFromFavorite", variables).then(
      (response) => {
        if (response.data.success) {
          fetchFavoriteMovies();
        } else {
          alert("Failed to Remove from Favorite");
        }
      }
    );
  };

  const renderTableBody = FavoriteMovies.map((movie, index) => {
    const content = (
      <div>
        {movie.movieImage ? (
          <img src={`${IMAGE_URL}w500${movie.movieImage}`} alt="movie post" />
        ) : (
          "No Image"
        )}
      </div>
    );
    return (
      <tr key={index}>
        <Popover content={content} title={`${movie.movieTitle}`}>
          <td>{movie.movieTitle}</td>
        </Popover>
        <td>{movie.movieRunTime}</td>
        <td>
          <button onClick={() => handleRemove(movie.movieId)}>Remove</button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h3>My Favorite Movies</h3>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime (minutes)</th>
            <th>Remove from favorites</th>
          </tr>
        </thead>

        <tbody>{renderTableBody}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
