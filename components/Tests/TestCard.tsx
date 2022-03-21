import style from "../../styles/Tests/Tests.module.scss";
import {
  faClock,
  faHourglass,
  faQuestionCircle,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faCalculator,
  faPen,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useRouter } from "next/router";

interface IProps {
  title: string;
  duration: string;
  degreeOfTheTest: number;
  startDate: string | Date;
  id: string;
}

function TestCard({ title, duration, degreeOfTheTest, startDate, id }: IProps) {
  const daysToStart = moment().diff(new Date(startDate), "days");

  const isNow = moment().isBetween(
    moment(new Date(startDate)),
    moment(new Date(startDate)).add(duration, "minutes")
  );
  console.log(isNow);

  console.log(moment());
  console.log(new Date(startDate));
  console.log(startDate);
  console.log(daysToStart);
  const router = useRouter();
  return (
    <div
      className={style.TestCard}
      onClick={() => {
        if (isNow) {
          router.push({
            pathname: `/Test/${id}`,
            query: { title, duration },
          });
        }
      }}
    >
      <FontAwesomeIcon
        icon={
          title === "الفيزياء"
            ? faBrain
            : title === "اللغة العربية"
            ? faPen
            : faCalculator
        }
        size="5x"
        color="rgb(22, 142, 205)"
      />
      <h3>{title}</h3>
      <p>امتحان نهاية العام الدراسي 2022</p>
      <div className={style.hr} />
      <div className={style.CardItems}>
        <div>
          <FontAwesomeIcon
            icon={faQuestionCircle}
            style={{ marginLeft: "5px" }}
          />
          <h5> {degreeOfTheTest} سؤال </h5>
        </div>
        <div>
          <FontAwesomeIcon icon={faClock} style={{ marginLeft: "5px" }} />
          <h5> {duration} دقيقة </h5>
        </div>
        <div>
          <FontAwesomeIcon icon={faHourglass} style={{ marginLeft: "5px" }} />
          <h5>
            {" "}
            {moment(new Date(startDate)).format("HH:mm:ss YYYY/MM/DD ")}{" "}
          </h5>
        </div>
      </div>
      <h6 className={isNow ? style.now : ""}>
        {" "}
        {isNow
          ? `  الامتحان بدأ منذ ${moment().diff(
              new Date(startDate),
              "minutes"
            )} دقيقة`
          : `${daysToStart} يوما`}{" "}
      </h6>
    </div>
  );
}

export default TestCard;
