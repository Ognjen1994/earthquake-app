import * as Yup from "yup";

export const earthquakeValidationSchema = Yup.object().shape({
  longitude: Yup.number().required("Longitude is required"),
  latitude: Yup.number().required("Latitude is required"),
  magnitude: Yup.number()
    .min(0, "Magnitude must be positive")
    .required("Magnitude is required"),
  date: Yup.string().required("Date is required"),
});
