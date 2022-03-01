//import liraries
import { useFormikContext } from "formik";
import { MouseEventHandler } from "react";

// create a component
interface Props {
  title: string;
}

const SubmitButton = ({ title }: Props) => {
  const { handleSubmit } = useFormikContext();
  return <button onClick={handleSubmit as any}>{title}</button>;
};

//make this component available to the app
export default SubmitButton;
