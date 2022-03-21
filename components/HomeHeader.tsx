import styles from "../styles/Header.module.scss";
import MainBtn from "./MainBtn";
interface IProps {
  style: string;
}
function HomeHeader({ style }: IProps) {
  return (
    <div className={style}>
      <div className={`${styles.HomeHeader}`}>
        <div>
          <MainBtn onClick={() => console.log("Clic")} title="تسجيل الدخول" />
          <MainBtn
            onClick={() => console.log("Clic")}
            title="عاوز اذاكر"
            primary={false}
          />
        </div>
        <div className={styles.list}>
          <ul>
            <li>الرئيسية</li>
            <li>احنا مين</li>
            <li>تطبيقاتنا</li>
            <li>باقتنا </li>
            <li>الكورسات </li>
          </ul>
        </div>
      </div>
      <div className={styles.hr} />
    </div>
  );
}

export default HomeHeader;
