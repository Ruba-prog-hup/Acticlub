import React, { useState } from "react";
import bgPic from "../assets/background.png";
import { Button } from "reactstrap";

const Location = () => {
  const [showMap, setShowMap] = useState(false);

  const lat = 23.5479;
  const lng = 58.403;

  return (
    <div
      className="home-bg"
      style={{
        backgroundImage: `url(${bgPic})`,
        padding: "60px 0",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <h1
          className="title"
          style={{
            textAlign: "center",
            color: "#8b3d2e",
            marginBottom: "30px",
          }}
        >
          Our Location
        </h1>

        <h3
          style={{
            fontSize: "18px",
            color: "#6b4326",
            lineHeight: 1.6,
            fontWeight: "normal",
          }}
        >
          Location: ActiClub Center – Boushar, Muscat
          <br />
          Google Maps:{" "}
          <a
            href="https://goo.gl/maps/xwXqJr6yBk7L1s7x7"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#8b3d2e" }}
          >
            https://goo.gl/maps/xwXqJr6yBk7L1s7x7
          </a>
          <br />
          Description: ActiClub is located in the lively area of Boushar,
          surrounded by modern facilities and open spaces that make it ideal
          for sports, workshops, and community events.
        </h3>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            className="button"
            onClick={() => setShowMap((prev) => !prev)}
          >
            {showMap ? "Hide our Location" : "Show our Location"}
          </Button>
        </div>

        {showMap && (
          <div style={{ marginTop: "20px" }}>
            <iframe
              title="ActiClub Location"
              src={`https://maps.google.com/maps?q=${lat},${lng}&hl=es;&output=embed`}
              width="100%"
              height="300"
              style={{ border: "none", borderRadius: "12px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Location;
