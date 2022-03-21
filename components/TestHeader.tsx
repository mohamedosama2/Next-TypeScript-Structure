import moment from "moment";
import React from "react";
import style from "../styles/Test/Test.module.scss";

interface HProps {
  testTitle: string;
  startDate: string | Date;
  questionsLength: number;
  page: number;
}

export default function TestHeader({
  page,
  questionsLength,
  startDate,
  testTitle,
}: HProps) {
  return (
    <header className={style.Header}>
      <main>
        <h2>امتحان {testTitle}</h2>
        <h4>
          يبدأ في {moment(new Date(startDate)).format("HH:mm:ss YYYY/MM/DD ")}
        </h4>
      </main>
      <section>
        الاسئلة {page+1}/{questionsLength}
      </section>
    </header>
  );
}
