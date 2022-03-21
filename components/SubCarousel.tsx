import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "../styles/subcarousel.module.scss";
import Teatcher from "./Teatcher";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function SubCarousel() {
  return (
    <section className={styles.carousel}>
      <h1>الكورسات</h1>
      <p> !!نقدم كورسات في جميع المراحل الدراسية </p>
      <p> يوجد لدينا افضل المعليمن والدكاترة </p>
      <section>
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          /*    autoPlaySpeed={1000} */
          keyBoardControl={true}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          <Teatcher
            lang="اللغة العربية"
            name="محمود عمرو"
            img="https://st.depositphotos.com/1177973/3772/i/950/depositphotos_37724089-stock-photo-young-teacher-near-chalkboard-in.jpg"
          />
          <Teatcher
            lang="الكيمياء العضوية"
            name="محمد خالد"
            img="https://thumbs.dreamstime.com/b/portrait-young-male-teacher-background-school-blackboard-teacher-s-day-knowledge-day-back-to-school-study-159722312.jpg"
          />
          <Teatcher
            lang="الرياضيات التطبيقية"
            name="عامر حسين"
            img="https://27mi124bz6zg1hqy6n192jkb-wpengine.netdna-ssl.com/wp-content/uploads/2020/05/Top-5-Teaching-Strategies-scaled.jpg"
          />
          <Teatcher
            lang="اللغة العربية"
            name="محمود عمرو"
            img="https://st.depositphotos.com/1177973/3772/i/950/depositphotos_37724089-stock-photo-young-teacher-near-chalkboard-in.jpg"
          />
          <Teatcher
            lang="الرياضيات التطبيقية"
            name="عامر حسين"
            img="https://27mi124bz6zg1hqy6n192jkb-wpengine.netdna-ssl.com/wp-content/uploads/2020/05/Top-5-Teaching-Strategies-scaled.jpg"
          />
          <Teatcher
            lang="الكيمياء العضوية"
            name="محمد خالد"
            img="https://thumbs.dreamstime.com/b/portrait-young-male-teacher-background-school-blackboard-teacher-s-day-knowledge-day-back-to-school-study-159722312.jpg"
          />
        </Carousel>
      </section>
    </section>
  );
}

export default SubCarousel;
