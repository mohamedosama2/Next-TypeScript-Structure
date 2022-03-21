import Image from "next/image";
import styles from "../styles/Header.module.scss";
import LogoImg from "../public/sticky-logo.svg";
import MainBtn from "./MainBtn";
import { motion } from "framer-motion";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

interface HProps {
  setIsOpen: (status: boolean) => void;
  isOpen: boolean;
  data: Session | null;
}

function Header({ setIsOpen, isOpen, data }: HProps) {
  console.log(isOpen)
  const router = useRouter();
  return (
    <motion.div
      initial={{
        y: "-50px",
      }}
      animate={{ y: 0 }}
      className={`${styles.Header}`}
    >
      <div>
        {data ? (
          <MainBtn onClick={() => signOut()} title="تسجيل الخروج" />
        ) : (
          <>
            <MainBtn onClick={() => setIsOpen(!isOpen)} title="تسجيل الدخول" />
            <MainBtn
              onClick={() => setIsOpen(!isOpen)}
              title="عاوز اذاكر"
              primary={false}
            />
          </>
        )}
      </div>
      <div className={styles.list}>
        <ul>
          <li onClick={()=>router.push('/')}>الرئيسية</li>
          <li onClick={()=>router.push('/Profile')}>البروفايل</li>
          <li onClick={()=>router.push('/Tests')}>الامتحانات</li>
          <li onClick={()=>router.push('/Subscribtions')}>الاشتراكات</li>
        </ul>
      </div>
      <Image
        className={styles.img}
        src={LogoImg}
        width={100}
        height={70}
        alt={"logo image"}
      />
    </motion.div>
  );
}

export default Header;
