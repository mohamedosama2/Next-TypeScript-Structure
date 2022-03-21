//import liraries
import React, { InputHTMLAttributes } from "react";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

// create a component
const AppFormFild = ({ name, ...othetProps }: Props) => {
  const { setFieldValue, setFieldTouched, errors, touched, values } =
    useFormikContext();
  return (
    <>
      {/* <input onB /> */}
      <ErrorMessage visible={touched[name]} error={errors[name]} />
      <input
        onChange={(e) => setFieldValue(name, e.target.value)}
        onBlur={() => setFieldTouched(name)}
        value={values[name] }
        {...othetProps}
      />
    </>
  );
};

//make this component available to the app
export default AppFormFild;
