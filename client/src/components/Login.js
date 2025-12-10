import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, FormGroup, Input } from "reactstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/UserSlice";

const Login = () => {
  const location = useLocation();
  const roleFromFace = location.state?.role || "Guest";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, message, user } = useSelector((s) => s.users);

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = "Invalid email";
      }
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(getUser(form));
  };

  useEffect(() => {
    if (user && !isLoading) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    }
  }, [user, isLoading, navigate]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
     
      <div
        style={{
          flex: 1,
          backgroundColor: "#fff7e7",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          onSubmit={handleSubmit}
          style={{
            width: "80%",
            maxWidth: "350px",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "#8b463c", fontWeight: "bold" }}>
            Sign in
          </h2>

          <FormGroup>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              style={{
                borderColor: "#8b463c",
                borderWidth: "1.5px",
                borderRadius: "4px",
              }}
            />
            <p style={{ color: "red", marginTop: "5px", fontSize: "0.9rem" }}>
              {errors.email}
            </p>
          </FormGroup>

          <FormGroup>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              style={{
                borderColor: "#8b463c",
                borderWidth: "1.5px",
                borderRadius: "4px",
              }}
            />
            <p style={{ color: "red", marginTop: "5px", fontSize: "0.9rem" }}>
              {errors.password}
            </p>
          </FormGroup>

          {isError && (
            <p style={{ color: "red", marginBottom: "10px" }}>
              {message || "Invalid email or password"}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: "#8b463c",
              border: "none",
              width: "100%",
              marginTop: "10px",
            }}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

          <div style={{ marginTop: "10px", textAlign: "right" }}>
            <Link to="/forget" style={{ color: "#8b463c", fontSize: "0.9rem" }}>
              Forget password?
            </Link>
          </div>

          <div style={{ marginTop: "15px", textAlign: "center", fontSize: "0.9rem" }}>
            <span>Don’t have an account? </span>
            <Link to="/signup" style={{ color: "#8b463c" }}>
              Sign up
            </Link>
          </div>
        </Form>
      </div>

      
      <div
        style={{
          flex: 1,
          backgroundColor: "#8b463c",
          borderTopLeftRadius: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff8e7",
          textAlign: "center",
          padding: "20px",
          borderBottomLeftRadius: "150px"
        }}
      >
        <h1 style={{ fontFamily: "'Pacifico', cursive", fontSize: "36px" }}>
          {roleFromFace === "Admin" ? "Hello, Admin !" : "Hello, Friend !"}
        </h1>
      </div>
    </div>
  );
};

export default Login;
