// IMPORT MAINS
import React, { useState } from "react";

// IMPORT STYLES
import "./carouselone-horizontal.styles.scss";

// IMPORT COMPONENTS

// IMPORT ICONS
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const CarouselOneHorizontal = (props) => {
  const [index, setIndex] = useState(0);

  const previous = () => {
    if (index === 0) {
      setIndex(props.images.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  const next = () => {
    if (index === props.images.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const images = props.images.map((url, imageIndex) => {
    return imageIndex === index ? (
      <img className={"img-displayed"} key={imageIndex} src={url} alt="foodz" />
    ) : (
      <img className={"img-hidden"} key={imageIndex} src={url} alt="foodz" />
    );
  });

  return (
    <section
      className={
        props.className ? `${props.className} carouselone` : `carouselone`
      }
    >
      <section className="carouselone-buttons">
        <button className="left" type="button" onClick={previous}>
          <ChevronLeftIcon></ChevronLeftIcon>
        </button>
        <button className="right" type="button" onClick={next}>
          <ChevronRightIcon></ChevronRightIcon>
        </button>
      </section>
      <section className="carouselone-images">{images}</section>
    </section>
  );
};

export default CarouselOneHorizontal;
