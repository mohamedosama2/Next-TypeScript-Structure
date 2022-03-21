import { AnimatePresence, motion } from "framer-motion";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import style from "../styles/Test/Test.module.scss";
import MainBtn from "./MainBtn";
import Question, { QuestionProps } from "./Question";
import produce from "immer";
import { useSubnitAnswerMutation } from "../store/test";

interface IProps {
  questions: QuestionProps[];
  testId: string;
  token: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  questionsLength: number;
}

export default function TestMain({
  questions: qs,
  testId,
  token,
  page,
  setPage,
  questionsLength,
}: IProps) {
  /* const [page, setPage] = useState(0); */
  const [directionRight, setDirectionRight] = useState(true);
  const [questions, setQuestions] = useState<QuestionProps[]>(qs);
  useEffect(() => {
    setQuestions(qs);
  }, [qs]);
  const [submitAnswerDB] = useSubnitAnswerMutation();
  const answerHandler = useCallback(
    async (answer: string, index: number, testId: string, qId: string) => {
      setQuestions(
        produce((draftQuestions) => {
          draftQuestions[index].answer = answer;
        })
      );
      await submitAnswerDB({
        token,
        testId,
        answer: {
          myAnswer: answer,
          qId,
        },
      });
    },
    []
  );
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {questions.map((question, index) => {
          const qId = question.qId;
          return (
            page === index && (
              <Question
                key={index}
                {...{
                  question,
                  index,
                  directionRight,
                  answerHandler,
                  testId,
                  qId,
                }}
              />
            )
          );
        })}
      </AnimatePresence>

      <div className={style.btns}>
        <MainBtn
          primary={false}
          onClick={() => {
            if (page - 1 !== -1) {
              setDirectionRight(false);
              setPage((prevPage: number) => prevPage - 1);
            }
          }}
          title="السؤال السابق"
        />
        <MainBtn
          onClick={() => {
            if (page + 1 !== questionsLength) {
              setDirectionRight(true);
              setPage((prevPage: number) => prevPage + 1);
            }
          }}
          title="السؤال التالي"
        />
      </div>
    </>
  );
}
