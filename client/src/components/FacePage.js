import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const FacePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (role) => {
 
    navigate("/login", { state: { role } });
  };

  return (
    <Container fluid className="face-container">
      <Row className="mb-3">
        <Col
          md="6"
          className="div-col d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#fff8e7" }}
        >
          <form className="div-form text-center">
            <div>
              <Button
                style={{ backgroundColor: "#8b463c", borderColor: "#8b463c" }}
                className="form-control mb-3"
                onClick={() => handleNavigate("Admin")}
              >
                <h4>Admin</h4>
              </Button>
              <br />
              <Button
                style={{ backgroundColor: "#8b463c", borderColor: "#8b463c" }}
                className="form-control"
                onClick={() => handleNavigate("Guest")}
              >
                <h4>Guest</h4>
              </Button>
            </div>
          </form>
        </Col>

        <Col
          md="6"
          className="d-flex align-items-center justify-content-center right-section"
          style={{
            backgroundColor: "#ad5a4d",
            borderTopLeftRadius: "150px",
            borderBottomLeftRadius: "150px",
            height: "100vh",
          }}
        >
          <h1
            className="display-4"
            style={{ color: "#fff8e7", fontFamily: "cursive" }}
          >
            Who Are You !
          </h1>
        </Col>
      </Row>
    </Container>
  );
};

export default FacePage;
