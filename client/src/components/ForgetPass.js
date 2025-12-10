import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import axios from "axios";

const ForgetPass = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords must match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);

      await axios.post("http://localhost:5000/api/auth/forget", {
        email: form.email,
        password: form.password,
      });

      alert("Password updated successfully");
      setForm({ email: "", password: "", confirmPassword: "" });
      setErrors({});
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to update password";
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="face-container">
      <Container>
        <Row className="div-row align-items-center">
          <Col md="6" className="div-col">
            <Form className="div-form" onSubmit={handleSubmit}>
              <h2 style={{ marginBottom: "20px", color: "#8b463c" }}>
                Forget your Password
              </h2>

              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                />
                <p className="text-danger small">{errors.email}</p>
              </FormGroup>

              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  value={form.password}
                  onChange={handleChange}
                />
                <p className="text-danger small">{errors.password}</p>
              </FormGroup>

              <FormGroup>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                <p className="text-danger small">
                  {errors.confirmPassword}
                </p>
              </FormGroup>

              <Button type="submit" className="sign-btn" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update"}
              </Button>
            </Form>
          </Col>

          <Col
            md="6"
            className="right-section d-flex align-items-center justify-content-center"
            style={{ height: "100vh" }}
          >
            <h1 className="display-4" style={{ color: "#fff8e7" }}>
              Update Password !
            </h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgetPass;
