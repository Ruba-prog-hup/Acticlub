import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { createActivity } from "../../features/ActivitySlice";
import { useNavigate } from "react-router-dom";

const AdminAddActivity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    description: "",
    ageRange: "",
    durationDays: "",
    price: "",
    eventDate: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.slug.trim()) newErrors.slug = "Slug is required (e.g. sewing)";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.ageRange.trim()) newErrors.ageRange = "Age range is required";

    if (!form.durationDays) newErrors.durationDays = "Duration is required";
    else if (Number(form.durationDays) <= 0) newErrors.durationDays = "Duration must be at least 1 day";

    if (!form.price) newErrors.price = "Price is required";
    else if (Number(form.price) < 0) newErrors.price = "Price must be 0 or more";

    if (!form.eventDate) newErrors.eventDate = "Event date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);

      const payload = {
        ...form,
        slug: form.slug.trim().toLowerCase().replace(/\s+/g, "-"),
        price: Number(form.price),
        durationDays: Number(form.durationDays),
      };

      await dispatch(createActivity(payload)).unwrap();
      alert("Activity added successfully");
      setForm({
        title: "",
        slug: "",
        category: "",
        description: "",
        ageRange: "",
        durationDays: "",
        price: "",
        eventDate: "",
        imageUrl: "",
      });
      setErrors({});
      navigate("/admin");
    } catch (err) {
      console.error("Create activity error:", err);
      alert("Failed to add activity");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        marginTop: "30px",
        backgroundColor: "#fff7e7",
        padding: "30px",
        borderRadius: "12px",
      }}
    >
      <Row className="text-center mb-4">
        <h2 style={{ color: "#9e5246", fontWeight: "bold" }}>Add New Activity</h2>
      </Row>

      <Form onSubmit={handleSubmit}>
        {[
          { label: "Title", name: "title", type: "text" },
          { label: "Slug (unique id, e.g. sewing)", name: "slug", type: "text" },
          { label: "Category", name: "category", type: "text" },
          { label: "Description", name: "description", type: "textarea", rows: 3 },
          { label: "Age Range", name: "ageRange", type: "text" },
          { label: "Duration (days)", name: "durationDays", type: "number" },
          { label: "Price (OMR)", name: "price", type: "number" },
          { label: "Event Date", name: "eventDate", type: "date" },
          { label: "Image URL (optional)", name: "imageUrl", type: "text" },
        ].map((field, index) => (
          <FormGroup key={index}>
            <Row className="align-items-center">
              <Col md="4">
                <Label style={{ color: "#9e5246", fontWeight: "600" }}>
                  {field.label}
                </Label>
                <p className="text-danger small">{errors[field.name]}</p>
              </Col>

              <Col md="8">
                <Input
                  {...field}
                  value={form[field.name]}
                  onChange={handleChange}
                  style={{
                    borderColor: "#9e5246",
                    color: "#9e5246",
                  }}
                />
              </Col>
            </Row>
          </FormGroup>
        ))}

        <div className="text-center mt-4">
          <Button
            type="submit"
            style={{ backgroundColor: "#9e5246", borderColor: "#9e5246" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Add Activity"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AdminAddActivity;
