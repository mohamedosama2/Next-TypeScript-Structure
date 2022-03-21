import style from "../../styles/Subscribtions/Subscribtions.module.scss";
import C2 from "../../public/C1.svg";
import Image from "next/image";
import SubsCard from "../../components/SubsCard";
import HomeNavigation from "../../components/HomeNavigation";
import { useOtherSubscriptionsQuery } from "../../store/subscription";
import { getCsrfToken, useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

function Subscriptions() {
  const session = useSession();
  console.log(session);
  const { data: subscribtions, isLoading: isLoadingSubscriptions } =
    useOtherSubscriptionsQuery(session.data?.user?.accessToken as string);
  return (
    <>
      <div className={style.Subscribtions}>
        <ul>
          <li>الاشتراكات</li>
          <li>الصفحة الرئيسية</li>
          <li>تسجيل الخروج</li>
        </ul>
        <div className={style.centered}>
          <h2>الاشتراكات</h2>
          <p>
            أكثر الأمور إمتاعاً للنفس، وغذاءً للعقل، وراحة للذات، وأنساً في هذه
            الدنيا هو طلب العلم، يموت الإنسان فيذهب ماله وجاهه، وتبقى إنتاجاته
            وأعماله في المجال العلمي حاضرة باقية
          </p>
        </div>
        <div className={style.c1}>
          <Image width={300} height={300} src={C2} alt="Circle 1" />
        </div>
        <div className={style.c2}>
          <Image width={200} height={200} src={C2} alt="Circle 1" />
        </div>
      </div>
      <div className={style.cards}>
        <AnimatePresence exitBeforeEnter>
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
                token={session.data?.user?.accessToken as string}
              />
            );
          })}
        </AnimatePresence>
      </div>
      <HomeNavigation />
    </>
  );
}

export default Subscriptions;
Subscriptions.auth = true;

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
