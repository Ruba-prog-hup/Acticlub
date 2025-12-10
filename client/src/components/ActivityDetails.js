import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Dropdown, DropdownToggle } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "../features/ActivitySlice";
import { addBooking } from "../features/BookingSlice";

import bgPic from "../assets/background.png";
import actPic from "../assets/activities.jpg";

const ActivityDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list, isLoading } = useSelector((state) => state.activities);
  const { user } = useSelector((state) => state.users);

  const activities = list || [];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!activities || activities.length === 0) {
      dispatch(fetchActivities());
    }
  }, [activities.length, dispatch]);

  const activity = activities.find((a) => a.slug === slug);

  const getDaysLeft = (eventDate) => {
    if (!eventDate) return 0;
    const today = new Date();
    const event = new Date(eventDate);
    const diffTime = event - today;
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const handleBook = () => {
    if (!user || !user._id) {
      alert("Please log in first");
      navigate("/login");
      return;
    }

    if (!activity || !activity._id) {
      alert("Activity not found");
      return;
    }

    dispatch(
      addBooking({
        userId: user._id,
        activityId: activity._id,
        seats: 1,
      })
    )
      .unwrap()
      .then(() => alert("Activity booked successfully!"))
      .catch(() => alert("Booking failed"));
  };

  if (isLoading) {
    return (
      <div
        className="home-bg"
        style={{ backgroundImage: `url(${bgPic})`, padding: "60px 0" }}
      >
        <Container>
          <h3>Loading activity...</h3>
        </Container>
      </div>
    );
  }

  if (!activity) {
    return (
      <div
        className="home-bg"
        style={{ backgroundImage: `url(${bgPic})`, padding: "60px 0" }}
      >
        <Container>
          <h3>Activity not found</h3>
          <Button className="button" onClick={() => navigate("/home")}>
            Back to Home
          </Button>
        </Container>
      </div>
    );
  }

  const daysLeft = getDaysLeft(activity.eventDate);

  return (
    <div
      className="home-bg"
      style={{ backgroundImage: `url(${bgPic})`, padding: "40px 0" }}
    >
      <Container>
        <Row className="align-items-center">
         
          <Col md="6">
            <br />
            <h1 className="coTitle">{activity.title}</h1>
            <br />

            <Dropdown isOpen={open} toggle={() => setOpen(!open)}>
              <DropdownToggle caret className="desc-btn">
                <strong>Description</strong>
              </DropdownToggle>
            </Dropdown>

            {open && (
              <h6 className="dropdown-small">{activity.description}</h6>
            )}

            <h5 className="details">
              <strong>Age :</strong> {activity.ageRange}
            </h5>
            <h5 className="details">
              <strong>Duration :</strong> {activity.durationDays} Days
            </h5>
            <h5 className="details">
              <strong>Price :</strong> {activity.price} OMR
            </h5>

            <h5 className="details">
              <strong>Event Date :</strong>{" "}
              {activity.eventDate
                ? new Date(activity.eventDate).toLocaleDateString()
                : "Not set"}
            </h5>
            <h5 className="details">
              <strong>Days Left :</strong> {daysLeft} Days
            </h5>

            <br />

            <Button className="button" onClick={() => navigate("/home")}>
              Back
            </Button>
            <Button className="button" onClick={handleBook}>
              Book Now
            </Button>
          </Col>

          
          <Col md="6" className="d-flex justify-content-center align-items-center">
            <div className="activity-image-wrapper" aria-hidden="true">
              <div className="activity-bg-shape"></div>

              <img
                className="activity-main-image"
                src={activity.imageUrl || actPic}
                alt={activity.title}
              />
            </div>
          </Col>
        
      </Row>
    </Container>
    </div >
  );
};

export default ActivityDetails;
