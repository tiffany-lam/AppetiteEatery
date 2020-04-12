// IMPORT MAINS
import React, { useState } from "react";

// IMPORT STYLES
import "./carouselfour-horizontal.styles.scss";

// IMPORT COMPONENTS

// IMPORT ICONS
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CloseIcon from "@material-ui/icons/Close";

// LIMIT THE AMOUNT OF IMAGES THIS USES
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
    // let previous = index;
    // if (index === 0) {
    //   previous = props.images.length - 1;
    // }

    let originalIndex = index;
    // let urls = [previous, index];
    let urls = [index];

    // originally 4
    while (urls.length < 4) {
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
