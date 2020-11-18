import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";

function Favorite(props) {
  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  const variables = {
    userFrom: props.userFrom,
    movieId: props.movieId,
    movieTitle: props.movieInfo.original_title,
    movieImage: props.movieInfo.backdrop_path,
    movieRunTime: props.movieInfo.runtime,
  };
  useEffect(() => {
    axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert("Failed to get favorite Number");
      }
    });

    axios.post("/api/favorite/favorited", variables).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert("Failed to get favorite Info");
      }
    });
  }, []);

  const handleClickFavorite = () => {
    if (Favorited) {
      // Remove from Favorite
      axios
        .post("/api/favorite/removeFromFavorite", variables)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert("Failed to Remove from Favorite");
          }
        });
    } else {
      // Add to favorite
      axios.post("/api/favorite/addToFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("Failed to add to the Favorite");
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={handleClickFavorite}>
        {Favorited ? "remove from favorite" : "Add to favorite"}{" "}
        {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
