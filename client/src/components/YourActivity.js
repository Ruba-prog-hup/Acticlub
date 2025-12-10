import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserBookings,
  deleteBooking,
  updateBooking,
} from "../features/BookingSlice";
import bgPic from "../assets/background.png";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const YourActivity = () => {
  const dispatch = useDispatch();
  const { bookings, isLoading } = useSelector((state) => state.bookings);
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    if (user && user._id) {
      dispatch(getUserBookings(user._id));
    }
  }, [user, dispatch]);

  const handleDelete = (id) => {
    if (!user || !user._id) return;

    if (window.confirm("Do you want to delete this booking?")) {
      dispatch(deleteBooking(id))
        .unwrap()
        .then(() => {
          dispatch(getUserBookings(user._id));
        })
        .catch((err) => {
          alert(err || "Failed to delete booking");
        });
    }
  };

  const handleEdit = (booking) => {
    if (!user || !user._id) return;

    const currentSeats = booking.seats || 1;
    const input = window.prompt(
      "Enter the number of seats:",
      String(currentSeats)
    );
    if (input === null) return; 

    const newSeats = parseInt(input, 10);
    if (isNaN(newSeats) || newSeats <= 0) {
      alert("Seats must be at least 1");
      return;
    }

    dispatch(updateBooking({ id: booking._id, seats: newSeats }))
      .unwrap()
      .then(() => {
        dispatch(getUserBookings(user._id));
      })
      .catch((err) => {
        alert(err || "Failed to update booking");
      });
  };

  return (
    <div
      className="home-bg"
      style={{ backgroundImage: `url(${bgPic})`, padding: "40px 0" }}
    >
      <Container>
        <Row>
          <Col md="12">
            <br />
            <h2>Your Activity</h2>
            <br />

            {isLoading && <p>Loading bookings...</p>}

            {!isLoading && (!bookings || bookings.length === 0) && (
              <h4>No activities booked yet.</h4>
            )}

            {!isLoading &&
              bookings &&
              bookings.map((b) => {
                const act = b.activityId || {};
                return (
                  <div
                    key={b._id}
                    style={{
                      background: "#eaeaea",
                      padding: "15px 20px",
                      borderRadius: "10px",
                      marginBottom: "15px",
                      position: "relative",
                      maxWidth: "85%",
                    }}
                  >
                    
                    <button
                      onClick={() => handleEdit(b)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "50px",
                        border: "none",
                        background: "transparent",
                        fontSize: "18px",
                        cursor: "pointer",
                        color: "#8b3d2e",
                      }}
                      aria-label="Edit booking"
                    >
                      <FaEdit />
                    </button>

                    
                    <button
                      onClick={() => handleDelete(b._id)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "15px",
                        border: "none",
                        background: "transparent",
                        fontSize: "20px",
                        cursor: "pointer",
                        color: "#8b3d2e",
                      }}
                      aria-label="Delete booking"
                    >
                      <FaRegTrashCan />
                    </button>

                    <h5>
                      <strong>{act.title || "Activity"}</strong>
                    </h5>

                    <p>
                      <strong>Duration:</strong>{" "}
                      {act.durationDays != null ? act.durationDays : "-"} Days
                    </p>

                    <p>
                      <strong>Price per seat:</strong>{" "}
                      {act.price != null ? act.price : "-"} OMR
                    </p>

                    <p>
                      <strong>Seats:</strong> {b.seats}</p>

                    <p>
                      <strong>Total price:</strong> {b.totalPrice} OMR</p>

                    <p>
                      <strong>Status:</strong> {b.status}</p>
                  </div>
                );
              })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default YourActivity;
