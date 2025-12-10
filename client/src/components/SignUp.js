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
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  
  const [form, setForm] = useState({
    uname: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateBirth: "",
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

    if (!form.uname.trim()) newErrors.uname = "Username is required";

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
    } else {
      if (form.password.length < 6) {
        newErrors.password = "At least 6 characters";
      }
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords must match";
    }

    if (!form.dateBirth) newErrors.dateBirth = "Birthdate is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    
    navigate("/profile", {
      state: {
        uname: form.uname,
        email: form.email,
        password: form.password,
        dateBirth: form.dateBirth,
      },
    });
  };

  return (
    <div
  style={{
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#fff8e7",
  }}
>
  <div
    style={{
      flex: 1,
      backgroundColor: "#a45b4c",
      borderTopRightRadius: "80px",
      borderBottomRightRadius: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff8e7",
      flexDirection: "column",
      padding: "40px",
    }}
  >
    <h1 style={{ fontFamily: "'Pacifico', cursive", fontSize: "36px" }}>
      Create Account !
    </h1>
  </div>

  <div
    style={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
    }}
  >
    <Form
      style={{
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
      onSubmit={handleSubmit}
    >
      <h2 style={{ marginBottom: "20px", color: "#8b463c", textAlign: "center" }}>
        Sign up
      </h2>

      <FormGroup>
        <Input
          type="text"
          name="uname"
          placeholder="Enter your username"
          value={form.uname}
          onChange={handleChange}
          style={{ borderColor: "#8b463c" }}
        />
        <p style={{ color: "red" }}>{errors.uname}</p>
      </FormGroup>

      <FormGroup>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          style={{ borderColor: "#8b463c" }}
        />
        <p style={{ color: "red" }}>{errors.email}</p>
      </FormGroup>

      <FormGroup>
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          style={{ borderColor: "#8b463c" }}
        />
        <p style={{ color: "red" }}>{errors.password}</p>
      </FormGroup>

      <FormGroup>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={form.confirmPassword}
          onChange={handleChange}
          style={{ borderColor: "#8b463c" }}
        />
        <p style={{ color: "red" }}>{errors.confirmPassword}</p>
      </FormGroup>

      <FormGroup>
        <Input
          type="date"
          name="dateBirth"
          value={form.dateBirth}
          onChange={handleChange}
          style={{ borderColor: "#8b463c" }}
        />
        <p style={{ color: "red" }}>{errors.dateBirth}</p>
      </FormGroup>

      <Button
        type="submit"
        style={{
          backgroundColor: "#8b463c",
          border: "none",
          borderRadius: "8px",
          padding: "10px",
          color: "#fff8e7",
          fontWeight: "bold",
        }}
      >
        Next
      </Button>
    </Form>
  </div>
</div>

  );
};

export default SignUp;
