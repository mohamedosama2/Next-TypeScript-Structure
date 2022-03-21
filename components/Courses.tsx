import { useGetSubscriptionsQuery } from "../store/subscription";
import styles from "../styles/components.module.scss";
import Course from "./Course";
import MainBtn from "./MainBtn";
import SubsCard from "./SubsCard";

function Courses() {
  const { data: subscribtions } = useGetSubscriptionsQuery();
  return (
    <section className={styles.Courses}>
      <h2>الكورسات</h2>
      <h3>اشترك معنا</h3>
      <section>
        {subscribtions?.map((subscription, index) => {
          return (
            <SubsCard
              duration={subscription.duration}
              page="subs"
              price={subscription.price}
              index={index}
              key={subscription._id}
              deleteIt={false}
              info={subscription.info}
              kind={subscription.kind}
              description={subscription.description}
              id={subscription._id}
            />
          );
        })}
      </section>
      <MainBtn
        onClick={() => console.log("Cl")}
        title="اشترك معنا"
        className={styles.btn}
      />
    </section>
  );
}

export default Courses;
