import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfileValidation } from "../validation/ProfileValidation";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../features/UserSlice";

const defaultProfile =
  "https://cdn-icons-png.flaticon.com/512/847/847969.png";

const ProfilePic = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, message, isError } = useSelector((s) => s.users);

  useEffect(() => {
    if (!location.state?.email) {
      navigate("/signup");
    }
  }, [location.state, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  });

  const baseData = location.state || {};

  const onSave = (data) => {
    const payload = {
      ...baseData,
      profilePic: data.profilePic || defaultProfile,
      role: "user",
    };

    dispatch(addUser(payload))
      .unwrap()
      .then(() => {
        reset();
        navigate("/login");
      })
      .catch(() => {});
  };

  const handleSkip = () => {
    const payload = {
      ...baseData,
      profilePic: defaultProfile,
      role: "user",
    };

    dispatch(addUser(payload))
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch(() => {});
  };

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
          onSubmit={handleSubmit(onSave)}
          style={{
            width: "80%",
            maxWidth: "350px",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              color: "#8b463c",
              fontWeight: "bold",
            }}
          >
            Set your profile picture
          </h2>

          <FormGroup>
            <Input
              type="text"
              placeholder="Profile picture URL"
              {...register("profilePic")}
              style={{
                borderColor: "#8b463c",
                borderWidth: "1.5px",
                borderRadius: "4px",
              }}
            />
            <p style={{ color: "red", marginTop: "5px", fontSize: "0.9rem" }}>
              {errors.profilePic?.message}
            </p>
          </FormGroup>

          {isError && (
            <p style={{ color: "red", marginBottom: "10px" }}>
              {message || "Something went wrong"}
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
            {isLoading ? "Saving..." : "Save"}
          </Button>

          <Button
            type="button"
            onClick={handleSkip}
            disabled={isLoading}
            style={{
              backgroundColor: "#aaa",
              border: "none",
              width: "100%",
              marginTop: "10px",
            }}
          >
            Skip
          </Button>
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
        }}
      >
        <h1
          style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: "36px",
          }}
        >
          Almost done !
        </h1>
      </div>
    </div>
  );
};

export default ProfilePic;
