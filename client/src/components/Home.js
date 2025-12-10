
import React, { useEffect, useState } from "react";
import { Container, Row, Col, FormGroup, Label, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "../features/ActivitySlice";
import pic from "../assets/background.png";
import actPic from "../assets/activities.jpg";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, isLoading } = useSelector((state) => state.activities);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all"); 
  const [onlyUpcoming, setOnlyUpcoming] = useState(false);    

  const activities = list || [];


  useEffect(() => {
    if (!activities || activities.length === 0) {
      dispatch(fetchActivities());
    }
  }, [dispatch, activities.length]);


  const categories = [
    "all",
    ...Array.from(
      new Set(
        activities
          .map((a) => a.category)
          .filter((c) => c && c.trim() !== "")
      )
    ),
  ];


  const filtered = activities
    .filter((a) =>
      a.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((a) =>
      categoryFilter === "all" ? true : a.category === categoryFilter
    )
    .filter((a) => {
      if (!onlyUpcoming) return true;
      if (!a.eventDate) return false;
      const today = new Date();
      const event = new Date(a.eventDate);
      return event >= today; 
    });

  return (
    <div
      className="home-bg"
      style={{
        backgroundImage: `url(${pic})`,
        padding: "40px 0",
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col md="6">
            <h1
              style={{
                color: "#8b3d2e",
                fontWeight: "700",
                fontFamily: "Pacifico",
              }}
            >
              Develop Your Skills
            </h1>

            <h2
              style={{
                color: "#8b3d2e",
                fontWeight: "700",
                fontFamily: "Pacifico",
              }}
            >
              With US !!
            </h2>

            <h4
              style={{
                color: "#6b4326",
                marginTop: "20px",
                fontFamily: "Pacifico",
              }}
            >
              Activities available now...
            </h4>

         
            <div
              className="search-box"
              style={{ marginTop: "6px", marginBottom: "15px" }}
            >
              <FaSearch />
              <input
                type="text"
                className="search-input"
                placeholder="Search for activity"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            
            <FormGroup tag="fieldset" style={{ marginBottom: "10px" }}>
              <legend style={{ fontSize: "14px", color: "#6b4326" }}>
                Filter by category
              </legend>
              {categories.map((cat) => (
                <FormGroup check inline key={cat}>
                  <Input
                    type="radio"
                    name="categoryFilter"
                    value={cat}
                    checked={categoryFilter === cat}
                    onChange={() => setCategoryFilter(cat)}
                  />
                  <Label check style={{ marginLeft: "3px" }}>
                    {cat === "all" ? "All" : cat}
                  </Label>
                </FormGroup>
              ))}
            </FormGroup>

       
            <FormGroup check style={{ marginBottom: "15px" }}>
              <Label check>
                <Input
                  type="checkbox"
                  checked={onlyUpcoming}
                  onChange={(e) => setOnlyUpcoming(e.target.checked)}
                />{" "}
                Show only upcoming activities
              </Label>
            </FormGroup>

            <div>
              {isLoading && <p>Loading activities...</p>}
              {!isLoading &&
                filtered.map((act) => (
                  <div key={act._id}>
                    <Link
                      to={`/activity/${act.slug}`}
                      style={{ color: "#8b3d2e" }}
                    >
                      {act.title}
                    </Link>
                    <br />
                  </div>
                ))}
            </div>
          </Col>

         
          <Col
            md="6"
            className="d-flex justify-content-center align-items-center"
          >
            <img
              src={actPic}
              className="home-img"
              width="280"
              height="280"
              alt="Activities"
              style={{ borderRadius: "20px" }}
              onClick={() => navigate("/yourAct")}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
