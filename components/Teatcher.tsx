import { motion } from "framer-motion";
import styles from "../styles/subcarousel.module.scss";

interface TProps {
  name: string;
  lang: string;
  img: string;
}
function Teatcher({ name, lang, img }: TProps) {
  return (
    <motion.div 
      initial={{
        opacity: 0,
        y: "50px",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ amount: 0.8, once: true }}
      className={styles.Card}
    >
      <img src={img} />
      <div>
        <h2>{name}</h2>
        <p>{lang}</p>
      </div>
    </motion.div>
  );
}

export default Teatcher;
