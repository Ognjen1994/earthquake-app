import { Field, ErrorMessage } from "formik";

interface InputFieldProps {
  name: string;
  type: string;
  label: string;
  step?: string;
}

const InputField = ({ name, type, label, step }: InputFieldProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <Field
        name={name}
        type={type}
        step={step}
        className="w-full p-2 border rounded"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default InputField;
