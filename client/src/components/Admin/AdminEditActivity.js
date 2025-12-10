import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
} from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateActivity } from "../../features/ActivitySlice";

const AdminEditActivity = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const activity = location.state?.activity;

  if (!activity) {
    navigate("/admin");
  }

  const [form, setForm] = useState({
    title: activity?.title || "",
    slug: activity?.slug || "",
    category: activity?.category || "",
    description: activity?.description || "",
    ageRange: activity?.ageRange || "",
    durationDays: activity?.durationDays || "",
    price: activity?.price || "",
    eventDate: activity?.eventDate ? activity.eventDate.substring(0, 10) : "",
    imageUrl: activity?.imageUrl || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (!form.price) newErrors.price = "Price is required";
    if (!form.durationDays) newErrors.durationDays = "Duration is required";
    if (!form.ageRange.trim()) newErrors.ageRange = "Age range is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(
      updateActivity({
        id: activity._id,
        data: {
          ...form,
          price: Number(form.price),
          durationDays: Number(form.durationDays),
        },
      })
    )
      .unwrap()
      .then(() => {
        alert("Activity updated successfully");
        navigate("/admin");
      })
      .catch((err) => {
        alert(err || "Failed to update activity");
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff3dd",
        padding: "40px 0",
      }}
    >
      <Container>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <h2
              style={{
                color: "#8b3d2e",
                marginBottom: "25px",
                fontFamily: "Pacifico, cursive",
                textAlign: "center",
              }}
            >
              Update Activity
            </h2>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label style={{ fontWeight: "bold" }}>Title</Label>
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  style={{ borderColor: "#9e5246" }}
                />
                <p style={{ color: "red" }}>{errors.title}</p>
              </FormGroup>

              <FormGroup>
                <Label style={{ fontWeight: "bold" }}>Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  style={{ minHeight: "90px", borderColor: "#9e5246" }}
                />
              </FormGroup>

              <FormGroup>
                <Label style={{ fontWeight: "bold" }}>Age</Label>
                <Input
                  name="ageRange"
                  value={form.ageRange}
                  onChange={handleChange}
                  style={{ borderColor: "#9e5246" }}
                />
                <p style={{ color: "red" }}>{errors.ageRange}</p>
              </FormGroup>

              <FormGroup>
                <Label style={{ fontWeight: "bold" }}>Duration (Days)</Label>
                <Input
                  type="number"
                  name="durationDays"
                  value={form.durationDays}
                  onChange={handleChange}
                  style={{ borderColor: "#9e5246" }}
                />
                <p style={{ color: "red" }}>{errors.durationDays}</p>
              </FormGroup>

              <FormGroup>
                <Label style={{ fontWeight: "bold" }}>Price (OMR)</Label>
                <Input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  style={{ borderColor: "#9e5246" }}
                />
                <p style={{ color: "red" }}>{errors.price}</p>
              </FormGroup>

              <FormGroup>
                <Label style={{ fontWeight: "bold" }}>Img URL</Label>
                <Input
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  style={{ borderColor: "#9e5246" }}
                />
              </FormGroup>

              <div style={{ marginTop: "15px" }}>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#a75445",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 25px",
                  }}
                >
                  Update
                </Button>
                <Button
                  type="button"
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "#ccc",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 25px",
                    color: "#333",
                  }}
                  onClick={() => navigate("/admin")}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminEditActivity;
