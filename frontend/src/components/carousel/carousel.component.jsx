// IMPORT MAINS
import React, { useState } from "react";

// IMPORT STYLES
import "./carousel.styles.scss";

// IMPORT COMPONENTS

// IMPORT ICONS
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CloseIcon from "@material-ui/icons/Close";

// LIMIT THE AMOUNT OF IMAGES THIS USES
const Carousel = (props) => {
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
    while (urls.length < props.size) {
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
      <div
        className={
          props.size === 4
            ? "img-container-four"
            : props.size === 3
            ? "img-container-three"
            : props.size === 2
            ? "img-container-two"
            : props.size === 1
            ? "img-container-one"
            : null
        }
      >
        <img
          className={"img-displayed"}
          key={imageIndex}
          src={url}
          alt="foodz"
          height="1000"
          width="1000"
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

  // completely rerenders new array so transition does not work
  // const images = displayed().map((urlIndex, i) => {
  //   return i === 0 || i === displayed().length - 1 ? (
  //     <img
  //       className={"img-hidden"}
  //       key={i}
  //       src={props.images[urlIndex]}
  //       alt="foodz"
  //     />
  //   ) : (
  //     <img
  //       className={"img-displayed"}
  //       key={i}
  //       src={props.images[urlIndex]}
  //       alt="foodz"
  //     />
  //   );
  // });

  return (
    <section
      className={props.className ? `${props.className} carousel` : `carousel`}
    >
      <section
        className={
          props.vertical
            ? "carousel-buttons-vertical"
            : "carousel-buttons-horizontal"
        }
      >
        {props.images.length > props.size ? (
          <button className="left" type="button" onClick={previous}>
            {props.vertical ? (
              <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
            ) : (
              <ChevronLeftIcon></ChevronLeftIcon>
            )}
          </button>
        ) : null}
        {props.images.length > props.size ? (
          <button className="right" type="button" onClick={next}>
            {props.vertical ? (
              <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
            ) : (
              <ChevronRightIcon></ChevronRightIcon>
            )}
          </button>
        ) : null}
      </section>
      <section
        className={
          props.vertical
            ? "carousel-images-vertical"
            : "carousel-images-horizontal"
        }
      >
        {images}
      </section>
    </section>
  );
};

export default Carousel;
