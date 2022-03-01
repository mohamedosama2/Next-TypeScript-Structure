//import liraries
import React from "react";
import { Formik } from "formik";
// create a component
interface Props {
  children: React.ReactChild[];
  onSubmit: (values: any, actions: any) => Promise<SubmitEvent> | void;
  initialValues: object;
  validationSchema: any;
}
const AppForm = ({
  children,
  onSubmit,
  initialValues,
  validationSchema,
}: Props) => {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
};

//make this component available to the app
export default AppForm;
