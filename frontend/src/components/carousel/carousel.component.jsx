/*
  Contributors: Julie Do 014101748
  Course: CECS 470

  Description: This class renders a carousel component, which takes in image routes and loads them inside of an infinite carousel from an AWS S3 Bucket. Users are required to pass in a prop size, which determines how many images are displayed at one time. Each image is displayed with a 1:1 aspect ratio, and the carousel resizes based on the width of the parent container. 

  Current Bugs: Due to Reacts method of rendering objects in the DOM, once you select to view images beyond the last index, it will display in a different order.
*/

// IMPORT MAIN PACKAGES
import React, { useState } from "react";
import { BASE_API_URL } from "../../utils";

// IMPORT STYLES
import "./carousel.styles.scss";

// IMPORT ICONS
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CloseIcon from "@material-ui/icons/Close";

// Functional Component Carousel
const Carousel = (props) => {
  // Index state keeps track of which images are being displayed
  const [index, setIndex] = useState(0);
  // Images to be displayed in the carousel, limited to 10 images max (for efficienciy)
  const images =
    props.images.length > 10 ? props.images.slice(0, 10) : props.images;

  // This function slides the carousel index back by one, showing the previous image of the carousel.
  const previous = () => {
    if (index === 0) {
      // This line shifts the carousel to view a new slot of images.
      // setIndex(props.images.length - props.size);
      // This line shifts the carousel by 1.
      setIndex(images.length - 1);
    } else {
      // This line shifts the carousel to view a new slot of images.
      // setIndex(index - props.size);
      // This line shifts the carousel by 1.
      setIndex(index - 1);
    }
  };

  // This function slides the carousel index forward by one, show the next image of the carousel.
  const next = () => {
    if (index === images.length - 1) {
      // Restart the carousel once the end of the images has been reached.
      setIndex(0);
    } else {
      // This line shifts the carousel to view a new slot of images.
      // setIndex(index + props.size);
      // This line shifts the carousel by 1.
      setIndex(index + 1);
    }
  };

  // This function selects the images to be displayed in the carousel, and the images to be hidden. it returns an array of the indexes of the images to be displayed.
  const displayed = () => {
    let previous = index - 1;

    if (index === 0) {
      previous = images.length - 1;
    }

    let originalIndex = index;
    let urls = [previous, index];

    while (urls.length < props.size + 1) {
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
    return urls;
  };

  // This variable holds all image components, sized and styled according to the desired size of the carousel.
  const carouselImages = images.map((route, imageIndex) => {
    // Provide the S3 route of the image embedded as a query parameter into a get request that retrieves the image.
    let url = `${BASE_API_URL}/img-get?url=${route}`;
    // Get all images to be displayed.
    let displayedImages = displayed();

    // If there are less images than the desired size...
    if (images.length <= props.size) {
      // Display only the images to be displayed
      return displayed().includes(imageIndex) ? (
        // Return a displayed image dependent on the size of the carousel.
        // This div is a wrapper to style the image class and a button, used to delete the image if desired.
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
            alt={url}
            height="1000"
            width="1000"
          />
          {/* If delete functionality is required on the image, render the delete button. */}
          {props.manage ? (
            <button
              className="button"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                props.deleteImage(route);
              }}
            >
              <CloseIcon></CloseIcon>
            </button>
          ) : null}
        </div>
      ) : (
        // If it is not an image being displayed, do not render using the hidden class.
        <div className="img-container-hidden">
          <img className={"img-hidden"} key={imageIndex} src={url} alt={url} />
        </div>
      );

      // Else if there are more images than the desired size...
    } else {
      // If this is the first image, then it is not an image to be displayed, but an image that is hidden on the left side of the carousel in order for transitions to work.
      // This div is a wrapper to style the image class and a button, used to delete the image if desired.
      if (imageIndex === displayedImages[0]) {
        return (
          <div
            className={
              props.size === 4
                ? "img-container-four-hidden-left"
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
              alt={url}
              height="1000"
              width="1000"
            />
            {/* If delete functionality is required on the image, render the delete button. */}
            {props.manage ? (
              <button
                className="button"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  props.deleteImage(route);
                }}
              >
                <CloseIcon></CloseIcon>
              </button>
            ) : null}
          </div>
        );
        // If this is the last image, then it is not an image to be displayed, but an image that is hidden on the right side of the carousel in order for transitions to work.
        // This div is a wrapper to style the image class and a button, used to delete the image if desired.
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
              alt={url}
              height="1000"
              width="1000"
            />
            {/* If delete functionality is required on the image, render the delete button. */}
            {props.manage ? (
              <button
                className="button"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  props.deleteImage(route);
                }}
              >
                <CloseIcon></CloseIcon>
              </button>
            ) : null}
          </div>
        );
        // If it is neither the first or last image, then...
      } else {
        // Return the image as displayed, if it is included in the displayed array and is not the last or first image, otherwise return a hidden image.
        // This div is a wrapper to style the image class and a button, used to delete the image if desired.
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
              alt={url}
              height="1000"
              width="1000"
            />
            {/* If delete functionality is required on the image, render the delete button. */}
            {props.manage ? (
              <button
                className="button"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  props.deleteImage(route);
                }}
              >
                <CloseIcon></CloseIcon>
              </button>
            ) : null}
          </div>
        ) : (
          // Return a hidden image.
          <div key={imageIndex} className="img-container-hidden">
            <img className={"img-hidden"} src={url} alt="foodz" />
          </div>
        );
      }
    }
  });

  // This function returns a carousel of the desired size of images with all images rendered at a 1:1 aspect ratio.
  return (
    // This section is the container.
    <section
      className={props.className ? `${props.className} carousel` : `carousel`}
    >
      {/* This section contains the "Previous Button" and the "Next Button" of the carousel. */}
      <section
        className={
          props.vertical
            ? "carousel-buttons-vertical"
            : "carousel-buttons-horizontal"
        }
      >
        {/* This displays the "Previous Button" if the amount of images passed in is greater than the size desired. */}
        {props.images.length > props.size ? (
          <button className="left" type="button" onClick={previous}>
            {props.vertical ? (
              <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
            ) : (
              <ChevronLeftIcon></ChevronLeftIcon>
            )}
          </button>
        ) : null}

        {/* This displays the "Next Button" if the amount of images passed in is greater than the size desired. */}
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

      {/* This section returns the actual images of the carousel, which can be horizontal or vertical according to the props passed in. */}
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

// Export the Carousel function, which returns a dynamically rendered component, as the default.
export default Carousel;
