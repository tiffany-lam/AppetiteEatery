// IMPORT MAINS
import React, { useState } from "react";

// IMPORT STYLES
import "./carouselone-horizontal.styles.scss";

// IMPORT COMPONENTS

// IMPORT ICONS
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CloseIcon from "@material-ui/icons/Close";

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
      <div className="img-container">
        <img
          className={"img-displayed"}
          key={imageIndex}
          src={url}
          alt="foodz"
        />
        {props.manage ? (
          <button
            className="button"
            type="button"
            onClick={console.log(`deleted image at ${url}`)}
          >
            <CloseIcon></CloseIcon>
          </button>
        ) : null}
      </div>
    ) : (
      <div className="img-container-hidden">
        <img className={"img-hidden"} key={imageIndex} src={url} alt="foodz" />
      </div>
    );
  });

  return (
    <section
      className={
        props.className ? `${props.className} carouselone` : `carouselone`
      }
    >
      <div className="carouselone-buttons">
        <button className="left" type="button" onClick={previous}>
          <ChevronLeftIcon></ChevronLeftIcon>
        </button>
        <button className="right" type="button" onClick={next}>
          <ChevronRightIcon></ChevronRightIcon>
        </button>
      </div>
      <div className="carouselone-images">{images}</div>
    </section>
  );
};

export default CarouselOneHorizontal;
