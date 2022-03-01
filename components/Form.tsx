import React from "react";
import * as Yup from "yup";
import { AppForm, AppFormField, SubmitButton } from "./forms";
const validationSchema = Yup.object({
  username: Yup.string().required().min(5),
  email: Yup.string().required().email("enter email plzzzz"),
  password: Yup.string()
    .required()
    .min(5, "must be at least 5")
    .max(10, "must be at most 10"),
});
const className="border-1 border-slate-800 rounded-md bg-primary"
export default function Form() {
  return (
    <AppForm
      initialValues={{
        username: "",
        email: "",
        password: "",
      }}
      onSubmit={(values: any, { resetForm }: any) => {
        console.log(values);
      }}
      {...{ validationSchema }}
    >
      <AppFormField
        name="username"
        placeholder="Username"
        className={className}
      />
      <AppFormField
        name="email"
        placeholder="Email"
        className={className.concat(' my-2')}
      />
      <AppFormField
        name="password"
        placeholder="Password"
        type="password"
        className={className}
      />
      <SubmitButton title="Submit" />
    </AppForm>
  );
}
