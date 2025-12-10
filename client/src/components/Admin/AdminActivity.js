import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities, deleteActivity } from "../../features/ActivitySlice";
import { useNavigate } from "react-router-dom";
import bgPic from "../../assets/background.png";
import { logout } from "../../features/UserSlice";

const AdminActivity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, isLoading } = useSelector((state) => state.activities);
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  const activities = list || [];

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this activity?")) {
      dispatch(deleteActivity(id));
    }
  };

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div
      className="home-bg"
      style={{ backgroundImage: `url(${bgPic})`, minHeight: "100vh" }}
    >
      <div
        style={{
          backgroundColor: "#a75445",
          color: "#fdf5e6",
          padding: "10px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              backgroundColor: "#fdf5e6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={
                user?.profilePic ||
                "https://ui-avatars.com/api/?name=Admin&background=8b3d2e&color=fff"
              }
              alt="admin"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <div style={{ fontWeight: "bold" }}>ActiClub Admin</div>
            <div style={{ fontSize: "14px" }}>{user?.uname || "Admin"}</div>
          </div>
        </div>

        <Button
          onClick={handleSignOut}
          style={{
            backgroundColor: "#fdf5e6",
            color: "#8b3d2e",
            border: "none",
            padding: "6px 18px",
            borderRadius: "20px",
            fontWeight: "bold",
          }}
        >
          Sign out
        </Button>
      </div>

     
      <Container style={{ paddingTop: "40px" }}>
        <Row>
          <Col md="12">
            <h2 style={{ color: "#8b3d2e", marginBottom: "10px" }}>
              Admin Home Screen
            </h2>
            <h5 style={{ color: "#6b4326", marginBottom: "25px" }}>
              Activities Available ...
            </h5>

            <div
              style={{
                backgroundColor: "rgba(255, 248, 230, 0.95)",
                borderRadius: "15px",
                padding: "20px 0",
              }}
            >
              {isLoading && <p style={{ paddingLeft: "25px" }}>Loading...</p>}

              {!isLoading &&
                activities.map((act) => (
                  <div
                    key={act._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 25px",
                      borderBottom: "1px solid #f0e1c5",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px",
                          color: "#333",
                        }}
                      >
                        {act.title}
                      </div>
                      <div style={{ color: "#8b3d2e" }}>{act.category}</div>
                    </div>

                    <div>
                      <Button
                        size="sm"
                        style={{
                          marginRight: "8px",
                          backgroundColor: "#c97a5c",
                          border: "none",
                        }}
                        onClick={() =>
                          navigate(`/admin/edit/${act._id}`, {
                            state: { activity: act },
                          })
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        style={{ border: "none" }}
                        onClick={() => handleDelete(act._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
            </div>

            <Button
              style={{
                marginTop: "25px",
                backgroundColor: "#a75445",
                borderRadius: "8px",
                border: "none",
              }}
              onClick={() => navigate("/admin/add")}
            >
              Add New Activity
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminActivity;
