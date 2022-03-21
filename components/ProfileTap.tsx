import { faInfo, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../styles/Profile/Profile.module.scss";
import {
  TestByTeacher,
  useGetDegreeQuery,
  useGetTestBTeacherQuery,
} from "../store/test";
import { useEffect, useState } from "react";
import moment from "moment";
import { Button, Modal, ProgressBar } from "react-bootstrap";

interface IProps {
  token: string;
}

function ProfileTap({ token }: IProps) {
  const { data: testData } = useGetTestBTeacherQuery(token);
  const [currentSection, setCurrentSection] = useState<TestByTeacher[]>();
  const [currentindex, setCurrentIndex] = useState<number>(0);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentSection(testData);
  }, [testData]);
  return (
    <div className={style.TapBg}>
      {currentSection && (
        <MyVerticallyCenteredModal
          show={isOpen}
          onHide={() => setIsOpen(false)}
          testId={currentSection[currentindex].test._id}
          {...{ token }}
        />
      )}
      <h1 className={style.heading}>الدرجات </h1>
      <section className={style.Tap}>
        <div className={style.Tap__list}>
          {testData?.map((test, index) => {
            return (
              <div
                onClick={() => {
                  setCurrentIndex(index);
                }}
                key={test.test._id}
                className={currentindex === index ? style.active : ""}
              >
                <h2>{test.techerInfo[0].lang}</h2>
                <FontAwesomeIcon icon={faInfo} color="#fff" />
              </div>
            );
          })}
        </div>
        <div className={style.Tap__data}>
          <div className={style.data}>
            <div onClick={() => setIsOpen((prev) => !prev)}>
              <h4>
                {currentSection &&
                  moment(
                    new Date(currentSection[currentindex].test.startDate)
                  ).format("HH:mm:ss YYYY/MM/DD ")}
              </h4>
              <h4>
                درجة الامتحان
                {currentSection && currentSection[currentindex].degreeOfTheTest}
              </h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfileTap;

function MyVerticallyCenteredModal(props: any) {
  console.log(props.testId);
  const { data } = useGetDegreeQuery({ id: props.testId, token: props.token });

  const yourDegree = data && data[0].myDegree;
  const yourMistakes = data && data[0].mistakes;
  const fullQuestions = data && data[0].fullQuestions;
  const FullDegree = data && data[0].fullDegree;

  const progressInstance = (
    <ProgressBar now={yourDegree} label={`${yourDegree}%`} />
  );
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          النتيجة النهائية
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/*         {progressInstance}
         */}{" "}
        {FullDegree && (
          <>
            <ProgressBar
              variant="success"
              now={((yourDegree as number) / FullDegree) * 100}
              label={`${yourDegree} الدرجة الحاصل عليها`}
              style={{
                height: "2rem",
              }}
            />
            <ProgressBar
              variant="danger"
              now={((FullDegree - yourDegree) / FullDegree) * 100}
              label={`${FullDegree - yourDegree}  الدرجات المفقودة`}
              style={{
                height: "2rem",
              }}
            />
            <ProgressBar
              variant="info"
              now={100}
              label={` ${FullDegree}  الدرجة النهائية من `}
              style={{
                height: "2rem",
              }}
            />
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
