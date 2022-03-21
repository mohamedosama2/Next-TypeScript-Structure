import React from "react";
import styles from "../styles/Home.module.scss";

interface IProps {
  title: string;
}

function HomeItem({ title }: IProps) {
  return <div className={styles.HomeItem}>{title}</div>;
}

export default HomeItem;
