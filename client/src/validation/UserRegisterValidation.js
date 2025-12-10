import * as yup from "yup";

export const UserRegisterValidation = yup.object().shape({
  uname: yup.string().required("Username is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "At least 6 characters")
    .matches(/[A-Z]/, "Must include one uppercase letter")
    .matches(/[^a-zA-Z0-9]/, "Must include one special character"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),

  dateBirth: yup.string().required("Birthdate is required"),
});
