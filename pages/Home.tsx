import HomeItem from "../components/HomeItem";
import styles from "../styles/Home.module.scss";
function Home() {
  return (
    <div className={styles.Home}>
      <HomeItem title="الاشتراكات" />
      <HomeItem title="الواجبات" />
      <HomeItem title="الامتحانات" />
      <HomeItem title="الدرجات السابقة " />
      <HomeItem title="الدروس" />
      <HomeItem title="الملف الشخصي" />
      <HomeItem title="الملف الشخصي" />
    </div>
  );
}

export default Home;
