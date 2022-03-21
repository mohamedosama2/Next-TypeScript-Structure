import { motion } from "framer-motion";
import style from "../styles/Test/Test.module.scss";

export interface QuestionProps {
  question: string;
  qId: string;
  degrees: number;
  answer: string;
  answers: {
    q: string;
  }[];
}

interface QProps {
  index: number;
  testId: string;
  qId: string;
  directionRight: boolean;
  question: QuestionProps;
  answerHandler: (
    answer: string,
    index: number,
    testId: string,
    qId: string
  ) => void;
}

function Question({
  index,
  directionRight,
  question,
  answerHandler,
  testId,
  qId,
}: QProps) {
  return (
    <motion.div
      key={index}
      initial={
        directionRight
          ? {
              x: "-100vw",
              opacity: 0,
              scale: 0.5,
            }
          : {
              x: "100vw",
              opacity: 0,
              scale: 0.5,
            }
      }
      transition={{ duration: 0.2 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={
        directionRight
          ? { x: "100vw", scale: 0.5 }
          : { x: "-100vw", scale: 0.5 }
      }
      className={style.Main}
    >
      <div className={style.Main__Head}>
        <h3> {index + 1} السؤال </h3>
        <h3> {question.degrees} الدرجات </h3>
      </div>
      <div className={style.Main__Qustion}>
        <h2>{question.question}</h2>

        {question.answers.map((answer, indexAnswer) => {
          return (
            <div
              className={question.answer === answer.q ? style.active : ""}
              key={indexAnswer}
              onClick={() => answerHandler(answer.q, index, testId, qId)}
            >
              <span>{indexAnswer}</span>
              <h5>{answer.q}</h5>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default Question;
