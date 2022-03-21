import { faFire, faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCsrfToken, useSession } from "next-auth/react";
import HomeItem from "../../components/HomeItem";
import HomeNavigation from "../../components/HomeNavigation";
import TestCard from "../../components/Tests/TestCard";
import { useGetTestBTeacherQuery } from "../../store/test";
import style from "../../styles/Tests/Tests.module.scss";
function Tests() {
  const session = useSession();
  const { data } = useGetTestBTeacherQuery(
    session.data?.user.accessToken as string
  );
  return (
    <>
      <div className={style.Tests}>
        <h2>
          {" "}
          <FontAwesomeIcon icon={faFireFlameCurved} size="2x" /> الامتحانات
          القادمة{" "}
        </h2>
        <main>
          {data?.map((test) => (
            <TestCard
              id={test.test._id}
              title={test.techerInfo[0].lang}
              key={test.test._id}
              duration={test.test.duration}
              degreeOfTheTest={test.degreeOfTheTest}
              startDate={test.test.startDate}
            />
          ))}
          {/*    <TestCard title="اللغة العربية" />
          <TestCard title="الرياضيات" />
          <TestCard title="الفيزياء" />
          <TestCard title="الرياضيات" />
          <TestCard title="الفيزياء" />
          <TestCard title="الفيزياء" /> */}
        </main>
      </div>
    </>
  );
}

export default Tests;

Tests.auth=true

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
