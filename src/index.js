import { cursorCoordinateHelper } from "./cursor";
import { setUpImageContainer } from "./image";
import "./global.scss";
import "./image.scss";

const setImageOverlayDimensions = (imageContainer, { width, height }) => {
  // This is after I solved x + y = 675 (an example half width of image)
  // where y = x/4
  const maxWidthOfOverlay = Math.floor(0.8 * width);
  imageContainer.style.setProperty("--overlay-width", `${maxWidthOfOverlay}px`);
  const maxHeightOfOverlay = Math.floor(0.8 * height);
  imageContainer.style.setProperty(
    "--overlay-height",
    `${maxHeightOfOverlay}px`
  );
};

// Simple linear based solution
const offSetCalculation = (mouseCoordinate) => {
  return -(mouseCoordinate / 4);
};

const CURSOR_BASE_CLASS_NAME = "cursor-follow";

window.addEventListener("load", async () => {
  await setUpImageContainer();
  const fullEffectContainer = document.body.querySelector(".image-container");
  const imageContainer = document.body.querySelector(".image-content");
  const image = imageContainer.querySelector("img");
  const cursorCircle = document.body.querySelector(
    `.${CURSOR_BASE_CLASS_NAME}`
  );

  const myCoordsObject = cursorCoordinateHelper();
  setImageOverlayDimensions(imageContainer, {
    width: image.naturalWidth,
    height: image.naturalHeight,
  });

  imageContainer.addEventListener("mouseenter", (event) => {
    cursorCircle.style.removeProperty("visibility");
    image.style.removeProperty("transition");
    myCoordsObject.init(
      0,
      0,
      imageContainer.offsetTop,
      imageContainer.offsetLeft,
      imageContainer.offsetHeight,
      imageContainer.offsetWidth
    );
    document.body.style.setProperty("cursor", "none");
    cursorCircle.className = `${CURSOR_BASE_CLASS_NAME}__active`;
  });

  imageContainer.addEventListener("mousemove", (event) => {
    myCoordsObject.update(event.clientX, event.clientY);
    const currentCoordinates = myCoordsObject.getCoordinates();

    const cursorX = event.clientX;
    const cursorY = event.clientY;

    fullEffectContainer.style.setProperty("--cursor-x", `${cursorX - 40}px`);
    fullEffectContainer.style.setProperty("--cursor-y", `${cursorY - 40}px`);

    image.style.setProperty(
      "--x-offset",
      `${offSetCalculation(currentCoordinates.x)}px`
    );

    image.style.setProperty(
      "--y-offset",
      `${offSetCalculation(currentCoordinates.y)}px`
    );
  });

  // reset the image
  imageContainer.addEventListener("mouseleave", () => {
    image.style.setProperty("--x-offset", "0");
    image.style.setProperty("--y-offset", "0");
    image.style.setProperty("transition", "transform 0.3s ease-out");

    document.body.style.setProperty("cursor", "auto");
    cursorCircle.className = CURSOR_BASE_CLASS_NAME;
  });
});

// TO-DO:
// 1. Create image element on load
// 2. Input to allow custom images
// 3. Loading state
