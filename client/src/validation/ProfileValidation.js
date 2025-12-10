import * as yup from "yup";

export const ProfileValidation = yup.object().shape({
  profilePic: yup
    .string()
    .url("Must be a valid URL")
    .nullable()
    .optional(),
});
