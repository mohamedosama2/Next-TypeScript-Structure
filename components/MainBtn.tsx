import React from "react";
import styles from "../styles/components.module.scss";

interface Iprops {
  onClick: () => void;
  title: string;
  primary?: boolean;
  className?: string;
}

export default function MainBtn({
  onClick,
  title,
  primary = true,
  className = "",
}: Iprops) {
  return (
    <button
      className={`${primary ? styles.mainBtn : styles.secondary} ${className}`}
      {...{ onClick }}
    >
      {title}
    </button>
  );
}
