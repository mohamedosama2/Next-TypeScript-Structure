import { motion } from "framer-motion";
import { Spinner } from "react-bootstrap";
import {
  useAddSubscriptionMutation,
  useRemoveSubscriptionMutation,
} from "../store/subscription";
import style from "../styles/Subscribtions/Subscribtions.module.scss";
import MainBtn from "./MainBtn";

interface CProps {
  deleteIt: boolean;
  id?: string;
  index?: number;
  description: string;
  info: string;
  kind: string;
  price: number;
  duration: string;
  token?: string;
  page?: string;
}

function SubsCard({
  deleteIt = false,
  id,
  index,
  description,
  info,
  duration,
  kind,
  price,
  token,
  page,
}: CProps) {
  const [deleteSubscription, { isLoading: isLoadingSubscription }] =
    useRemoveSubscriptionMutation();
  const [addSubscription, { isLoading: isLoadingAddSubsciption }] =
    useAddSubscriptionMutation();
  return (
    <motion.div
      layout
      exit={{ scale: 0, opacity: 0 }}
      initial={
        index === 0
          ? { opacity: 0, x: "-100px" }
          : index === 1
          ? { opacity: 0 }
          : { opacity: 0, x: "100px" }
      }
      whileInView={{ opacity: 1, x: 0 }}
      className={style.card}
    >
      <div className={!deleteIt ? style.heading : style.headingActive}>
        <h2>{kind}</h2>
      </div>
      <ul>
        <li>{info}</li>
        <li>{description}</li>
        <li>{duration} يوما</li>
        <li>{price} السعر</li>
      </ul>
      {(isLoadingSubscription || isLoadingAddSubsciption) && (
        <Spinner animation="grow" />
      )}

      {token &&
      deleteIt &&
      !isLoadingSubscription &&
      !isLoadingAddSubsciption ? (
        <MainBtn
          onClick={() => deleteSubscription({ token, id: id as string })}
          title={"الغاء "}
          className="bg-red-500"
        />
      ) : token && !isLoadingSubscription && !isLoadingAddSubsciption ? (
        <MainBtn
          onClick={() => addSubscription({ token, id: id as string })}
          title={"التسجيل"}
          className={page === "sub" ? style.sub : ""}
        />
      ) : null}
    </motion.div>
  );
}

export default SubsCard;
