//import liraries
import { motion } from "framer-motion";
import React from "react";

// import styles from "../../styles/Form.module.css";
// create a component
interface Props {
  error: string;
  visible: boolean;
}
const ErrorMessage = ({ error, visible }: Props) => {
  if (!error || !visible) return null;
  return (
    <motion.p initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0,color:'red' }}>
      {error}
    </motion.p>
  );
};

// define your styles
// const styles = StyleSheet.create({
//   container: {
//     color: "red",
//     fontSize: 18,
//     fontWeight: "300",
//   },
// });

//make this component available to the app
export default ErrorMessage;
