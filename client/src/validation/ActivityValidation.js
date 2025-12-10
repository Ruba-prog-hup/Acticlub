import * as yup from "yup";

export const ActivityValidation = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("Title is required"),

  slug: yup
    .string()
    .trim()
    .required("Slug is required (e.g. sewing, cooking)"),

  category: yup
    .string()
    .trim()
    .required("Category is required"),

  description: yup
    .string()
    .trim()
    .required("Description is required"),

  ageRange: yup
    .string()
    .trim()
    .required("Age range is required"),

  durationDays: yup
    .number()
    .typeError("Duration must be a number")
    .integer("Duration must be whole days")
    .min(1, "Minimum 1 day")
    .required("Duration is required"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .min(0, "Price must be 0 or more")
    .required("Price is required"),

  eventDate: yup
    .string()
    .required("Event date is required"),

  imageUrl: yup
    .string()
    .url("Image must be a valid URL")
    .nullable()
    .notRequired(),
});
