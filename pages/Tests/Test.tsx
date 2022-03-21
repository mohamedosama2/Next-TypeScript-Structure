import style from "../../styles/Tests/Test.module.scss";
function Test() {
  return (
    <div className={style.Test}>
      <img src="https://media.istockphoto.com/vectors/elearning-girl-studying-with-computer-and-books-smile-the-concept-of-vector-id1266558584" />
      <div>
        <h1>اختيار من متعدد</h1>
        <h2> كم عدد الانهار التي توجد في شمال اوروبا ؟ </h2>
        <div className={style.answers}>
          <div>
            <p>1</p>
            <h5>20 بحر</h5>
          </div>
          <div>
            <p>2</p>
            <h5>20 بحر</h5>
          </div>
          <div>
            <p>3</p>
            <h5>20 بحر</h5>
          </div>
          <div>
            <p>4</p>
            <h5>20 بحر</h5>
          </div>
          <div>
            <p>5</p>
            <h5>20 بحر</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
