// IMPORT MAINS
import React, { useState } from "react";

// IMPORT STYLES
import "./carouselfour-horizontal.styles.scss";

// IMPORT COMPONENTS

// IMPORT ICONS
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const CarouselFourHorizontal = (props) => {
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

  const displayed = () => {
    let originalIndex = index;
    let urls = [index];

    while (urls.length < 4) {
      if (originalIndex + 1 <= props.images.length - 1) {
        urls.push(++originalIndex);
      } else {
        originalIndex = 0;
        urls.push(originalIndex);
      }
    }

    return urls;
  };

  const displayedImages = displayed();

  const images = props.images.map((url, imageIndex) => {
    return displayedImages.includes(imageIndex) ? (
      <img className={"img-displayed"} key={imageIndex} src={url} alt="foodz" />
    ) : (
      <img className={"img-hidden"} key={imageIndex} src={url} alt="foodz" />
    );
  });

  return (
    <section
      className={props.className ? `${props.className} carousel` : `carousel`}
    >
      <section className="carousel-buttons">
        <button className="left" type="button" onClick={previous}>
          <ChevronLeftIcon></ChevronLeftIcon>
        </button>
        <button className="right" type="button" onClick={next}>
          <ChevronRightIcon></ChevronRightIcon>
        </button>
      </section>
      <section className="carousel-images">{images}</section>
    </section>
  );
};

export default CarouselFourHorizontal;
