import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import MainImage from "../LandingPage/sections/MainImage";
import { Descriptions, Button, Row } from "antd";
import GridCard from "../LandingPage/sections/GridCard";
import Favorite from "./sections/Favorite";

function MoviedetailPage(props) {
  const movieId = props.match.params.movieId;

  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);
  useEffect(() => {
    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
      });
    fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.cast);
        setCasts(response.cast);
      });
  }, []);

  const handleClick = () => {
    setActorToggle(!ActorToggle);
  };
  return (
    <div>
      {/* Main Image */}
      {Movie && (
        <MainImage
          image={`${IMAGE_URL}w1280${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      )}
      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite
            userFrom={localStorage.getItem("userId")}
            movieId={movieId}
            movieInfo={Movie}
          />
        </div>

        {/* Movie Info Table */}
        <Descriptions title="Movie Info" bordered>
          <Descriptions.Item label="Title">
            {Movie.original_title}
          </Descriptions.Item>
          <Descriptions.Item label="Release date">
            {Movie.release_date}
          </Descriptions.Item>
          <Descriptions.Item label="Revenue">{Movie.revenue}</Descriptions.Item>
          <Descriptions.Item label="Runtime">{Movie.runtime}</Descriptions.Item>
          <Descriptions.Item label="Rating" span={2}>
            {Movie.vote_average}
          </Descriptions.Item>
          <Descriptions.Item label="Voters">
            {Movie.vote_count}
          </Descriptions.Item>
          <Descriptions.Item label="Status">{Movie.status}</Descriptions.Item>
          <Descriptions.Item label="Popularity">
            {Movie.popularity}
          </Descriptions.Item>
        </Descriptions>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClick}>View Actors</Button>
        </div>

        {/* Grid cards for Casts */}
        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((cast, index) => {
                return (
                  <React.Fragment key={index}>
                    {cast.profile_path && (
                      <GridCard
                        actor
                        image={`${IMAGE_URL}w500${cast.profile_path}`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MoviedetailPage;
