import Image from "next/image";
import React from "react";
import { Carousel } from "react-bootstrap";
import Car1 from "../public/car1.jpg";
import Car2 from "../public/car2.jpg";
import Car3 from "../public/car3.png";

function Carouse() {
  return (
    <div className={`mt-16 `}>
      {/*  <h2 className="font-header text-white text-3xl my-6">
        بعض من المميزات التي نقدمها
      </h2> */}
      <Carousel>
        <Carousel.Item>
          <Image width={1600} height={700} src={Car1} alt="First slide" />
          <Carousel.Caption>
            <h3 className="font-header text-white text-3xl my-6">
              اهتمام دائم
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image width={1600} height={700} src={Car2} alt="First slide" />
          <Carousel.Caption>
            <h3 className="font-header text-white text-3xl my-6">
              تعليم عن بعد{" "}
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image width={1600} height={700} src={Car3} alt="First slide" />
          <Carousel.Caption>
            <h3 className="font-header text-white text-3xl my-6">
              اهتمام دائم
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image width={1600} height={700} src={Car2} alt="First slide" />
          <Carousel.Caption>
            <h3 className="font-header text-white text-3xl my-6">
              تعليم عن بعد{" "}
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image width={1600} height={700} src={Car1} alt="First slide" />
          <Carousel.Caption>
            <h3 className="font-header text-white text-3xl my-6">
              اهتمام دائم
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Carouse;
