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
  const images = props.images;

  const previous = () => {
    if (index === 0) {
      // move as many
      // setIndex(props.images.length - props.size);
      setIndex(images.length - 1);
    } else {
      // move as many
      setIndex(index - props.size);
      // shift 1
      // setIndex(index - 1);
    }
  };

  const next = () => {
    if (index === images.length - 1) {
      setIndex(0);
    } else {
      // move as many
      setIndex(index + props.size);
      // if (index + 1 === images.length - 1) {
      //   let temporaryImages = [images.length / 2];
      //   for (let i = images.length / 2; i < images.length; i++) {
      //     temporaryImages[i] = images[i];
      //   }
      //   images.splice;
      // }
      // shift one
      // setIndex(index + 1);
    }
  };

  const displayed = () => {
    let previous = index - 1;
    if (index === 0) {
      previous = images.length - 1;
    }

    let originalIndex = index;
    let urls = [previous, index];
    // let urls = [index];

    // originally 4
    while (urls.length < props.size + 1) {
      // while (urls.length < 5) {
      if (originalIndex + 1 <= images.length - 1) {
        urls.push(++originalIndex);
      } else {
        originalIndex = 0;
        urls.push(originalIndex);
      }
    }

    let next = originalIndex + 1;
    if (next === images.length) {
      next = 0;
    }

    urls.push(next);
    // console.log(urls);
    return urls;
  };

  // const displayedImages = displayed();
  // console.log(displayed());

  const carouselImages = images.map((route, imageIndex) => {
    let url = `http://52.201.241.142/api/img-get?url=${route}`;
    console.log(url);
    let displayedImages = displayed();
    if (images.length <= props.size) {
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
          key={imageIndex}
        >
          <img
            className={"img-displayed"}
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
          <img
            className={"img-hidden"}
            key={imageIndex}
            src={url}
            alt="foodz"
          />
        </div>
      );
    } else {
      if (imageIndex === displayedImages[0]) {
        return (
          <div
            className={
              props.size === 4
                ? // ? "img-container-four img-container-hidden-left"
                  "img-container-four-hidden-left"
                : props.size === 3
                ? "img-container-three-hidden-left"
                : props.size === 2
                ? "img-container-two-hidden-left"
                : props.size === 1
                ? "img-container-one-hidden-left"
                : null
            }
            key={imageIndex}
          >
            <img
              className={"img-displayed"}
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
        );
      } else if (imageIndex === displayedImages[displayedImages.length - 1]) {
        return (
          <div
            className={
              props.size === 4
                ? "img-container-four-hidden-right"
                : props.size === 3
                ? "img-container-three-hidden-right"
                : props.size === 2
                ? "img-container-two-hidden-right"
                : props.size === 1
                ? "img-container-one-hidden-right"
                : null
            }
            key={imageIndex}
          >
            <img
              className={"img-displayed"}
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
        );
      } else {
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
            key={imageIndex}
          >
            <img
              className={"img-displayed"}
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
          <div key={imageIndex} className="img-container-hidden">
            <img className={"img-hidden"} src={url} alt="foodz" />
          </div>
        );
      }
    }
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
        {carouselImages}
      </section>
    </section>
  );
};

export default Carousel;
