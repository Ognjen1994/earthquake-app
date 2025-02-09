import { Formik, Form } from "formik";
import { earthquakeValidationSchema } from "@/utils/validation/validationSchema";
import { IEarthquakeWithCoordinates } from "@/types/earthquake";
import InputField from "./InputField";

interface IEarthquakeFormProps {
  initialValues: Partial<IEarthquakeWithCoordinates>;
  onSubmit: (values: IEarthquakeWithCoordinates, editMode: boolean) => void;
  handleClose: () => void;
  editMode: boolean;
}

const EarthquakeForm = ({
  initialValues,
  onSubmit,
  handleClose,
  editMode,
}: IEarthquakeFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={earthquakeValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values as IEarthquakeWithCoordinates, editMode);
        handleClose();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="space-y-4">
            <InputField
              name="longitude"
              type="number"
              label="Longitude"
              step="0.000001"
            />
            <InputField
              name="latitude"
              type="number"
              label="Latitude"
              step="0.000001"
            />
            <InputField
              name="magnitude"
              type="number"
              label="Magnitude"
              step="0.1"
            />
            <InputField name="date" type="datetime-local" label="Date" />

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {editMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EarthquakeForm;
