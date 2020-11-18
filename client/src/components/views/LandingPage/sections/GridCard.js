import React from "react";
import { Col } from "antd";
import { Link } from "react-router-dom";
function GridCard(props) {
  if (props.actor) {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "100%" }}
            alt="img"
            src={props.image}
          />
        </div>
      </Col>
    );
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <Link to={`/movie/${props.movieId}`}>
            <img
              style={{ width: "100%", height: "100%" }}
              alt="img"
              src={props.image}
            />
          </Link>
        </div>
      </Col>
    );
  }
}

export default GridCard;
