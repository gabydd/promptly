import { Field, ErrorMessage } from "formik";

const FormFields = ({ label, name, type, children, list }) => {
  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor={name} className="font-bold text-indigo-600 mr-2">
        {label}
      </label>
      <Field
        name={name}
        type={type !== "textarea" && type !== "select" ? type : undefined}
        as={(type === "textarea") | (type === "select") ? type : undefined}
        className="rounded focus:outline-none focus:ring"
        children={type === "select" ? children : undefined}
        list={list ? list : undefined}
        placeholder=""
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-600 text-sm"
      />
    </div>
  );
};

export default FormFields;
