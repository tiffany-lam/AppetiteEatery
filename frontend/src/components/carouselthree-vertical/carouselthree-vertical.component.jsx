// IMPORT MAINS
import React, { useState } from "react";

// IMPORT STYLES
import "./carouselthree-vertical.styles.scss";

// IMPORT COMPONENTS

// IMPORT ICONS
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CloseIcon from "@material-ui/icons/Close";

const CarouselThreeVertical = (props) => {
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
    // let previous = index;
    // if (index === 0) {
    //   previous = props.images.length - 1;
    // }

    let originalIndex = index;
    // let urls = [previous, index];
    let urls = [index];

    // originally 4
    while (urls.length < 3) {
      // while (urls.length < 5) {
      if (originalIndex + 1 <= props.images.length - 1) {
        urls.push(++originalIndex);
      } else {
        originalIndex = 0;
        urls.push(originalIndex);
      }
    }

    // let next = index + 1;
    // if (index + 1 === props.images.length - 1) {
    //   next = 0;
    // }

    // urls.push(next);
    return urls;
  };

  // const displayedImages = displayed();
  // console.log(displayed());

  const images = props.images.map((url, imageIndex) => {
    return displayed().includes(imageIndex) ? (
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
        props.className ? `${props.className} carouselthree` : `carouselthree`
      }
    >
      <section className="carouselthree-buttons">
        <button className="left" type="button" onClick={previous}>
          <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
        </button>
        <button className="right" type="button" onClick={next}>
          <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
        </button>
      </section>
      <section className="carouselthree-images">{images}</section>
    </section>
  );
};

export default CarouselThreeVertical;
