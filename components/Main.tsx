import Image from "next/image";
import React from "react";
import styles from "../styles/components.module.scss";
import MainImg from "../public/learn.webp";
import MainBtn from "./MainBtn";
import { motion } from "framer-motion";

function Main() {
  return (
    <main className={styles.main}>
      <motion.div   initial={{
          opacity: 0,
          x: "50px",
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{ amount: 0.8, once: true }}>
        <h2>احنا مين ؟</h2>
        <p>
          منصة تعليمية لجميع المراحل التعليمية و نوفر نظام تعليمي متكامل لمساعدة
          طلابنا علي المذاكرة وتحقيق اهدافهم التعليمية والمستقبلية
        </p>
        <div className="text-center">
          <MainBtn
            className={styles.btn}
            onClick={() => console.log("Clic")}
            title="تسجيل الدخول"
          />
          <MainBtn
            className={styles.btn}
            onClick={() => console.log("Clic")}
            title="عاوز اذاكر"
            primary={false}
          />
        </div>
      </motion.div >
      <motion.div
        initial={{
          opacity: 0,
          x: "-50px",
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{ amount: 0.8, once: true }}
      >
        <Image src={MainImg} width={900} height={800} alt={"هيا نتعلم"} />
      </motion.div>
    </main>
  );
}

export default Main;
