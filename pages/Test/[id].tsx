import { getCsrfToken, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import HomeHeader from "../../components/HomeHeader";
import RegistrationModal from "../../components/RegistrationModal";
import TestHeader from "../../components/TestHeader";
import TestMain from "../../components/TestMain";
import { useGetTestByIdQuery, useTestInfoQuery } from "../../store/test";
import style from "../../styles/Test/Test.module.scss";

declare module "next-auth" {
  interface User {
    accessToken: string;
  }

  interface Session {
    user: User;
  }
}

function Test() {
  const [page, setPage] = useState<number>(0);
  const [questionsLength, setQuestionsLength] = useState<number>(0);
  const { data } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const { data: questions, currentData } = useGetTestByIdQuery({
    token: data?.user.accessToken as string,
    id: id as string,
  });

  const { data: testIfo } = useTestInfoQuery({
    token: data?.user.accessToken as string,
    id: id as string,
  });

  useEffect(() => {
    if (currentData) setQuestionsLength(currentData?.length);
  }, [currentData]);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className={style.Test}>
      {/*  <HomeHeader style="bg-white" /> */}
      <Header {...{ isOpen, setIsOpen, data }} />
      <RegistrationModal {...{ isOpen, setIsOpen, data }} />
      <TestHeader
        page={page}
        startDate={testIfo?.test.startDate as string}
        questionsLength={questionsLength}
        testTitle={testIfo?.techerInfo[0].lang as string}
      />
      {currentData && (
        <TestMain
          questions={currentData}
          testId={id as string}
          token={data?.user.accessToken as string}
          {...{ page, setPage, questionsLength }}
        />
      )}
    </main>
  );
}

export default Test;
Test.auth=true

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
