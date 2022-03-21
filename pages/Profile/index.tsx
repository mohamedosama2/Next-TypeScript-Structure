import style from "../../styles/Profile/Profile.module.scss";
import Bg from "../../public/6.svg";
import Image from "next/image";
import ProfileTap from "../../components/ProfileTap";
import SubsCard from "../../components/SubsCard";
import { getCsrfToken, useSession } from "next-auth/react";
import { useGetMySubscriptionsQuery } from "../../store/subscription";
import { AnimatePresence, motion } from "framer-motion";
function Index() {
  const { data } = useSession();
  const { isLoading, data: subscribtions } = useGetMySubscriptionsQuery(
    data?.user?.accessToken as string
  );

  return (
    <>
      <div className={style.Profile}>
        <motion.div
          className={style.Profile__info}
          initial={{
            x: "100vw",
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
        >
          <h2>محمد اسامة فهمي كامل</h2>
          <h3>فول استاك ديفيلوبر</h3>
          <p>مشترك في المخصص</p>
        </motion.div>
        <motion.div
          initial={{
            x: "-100vw",
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          className={style.Profile__images}
        >
          <Image src={Bg} alt="profile2" width={450} height={450} />
        </motion.div>
      </div>
      <ProfileTap token={data?.user.accessToken as string} />
      <div className={style.Profile__sub}>
        <h1 className={style.heading}>الاشتراكات </h1>
        <div className={style.cards}>
          <AnimatePresence exitBeforeEnter>
            {subscribtions?.map((subscription, index) => {
              return (
                <SubsCard
                  duration={subscription.duration}
                  page="profile"
                  price={subscription.price}
                  index={index}
                  key={subscription._id}
                  deleteIt={true}
                  info={subscription.info}
                  kind={subscription.kind}
                  description={subscription.description}
                  id={subscription._id}
                  token={data?.user?.accessToken as string}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default Index;
Index.auth = true;

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
