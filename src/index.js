import "./index.css";

window.addEventListener("load", () => {
  const imageContainerElemenet = document.body.querySelector(
    ".image-container"
  );

  let myCoordsObject = pointerObject();

  const offSetCalculation = (mouseCoordinate) => {
    if (mouseCoordinate === 0) {
      return mouseCoordinate;
    }
    if (mouseCoordinate > 0) {
      return Math.floor(-Math.pow(mouseCoordinate / 40, 2) + 100);
    }
    return -Math.floor(-Math.pow(mouseCoordinate / 40, 2) + 100);
  };

  // middle point
  console.log(Math.floor(imageContainerElemenet.offsetWidth / 2));
  console.log(Math.floor(imageContainerElemenet.offsetHeight / 2));

  imageContainerElemenet.addEventListener("mouseenter", (event) => {
    myCoordsObject.init(
      0,
      0,
      imageContainerElemenet.offsetTop,
      imageContainerElemenet.offsetLeft,
      imageContainerElemenet.offsetHeight,
      imageContainerElemenet.offsetWidth
    );
  });

  imageContainerElemenet.addEventListener("mousemove", (event) => {
    myCoordsObject.update(event.clientX, event.clientY);
    const xAndY = myCoordsObject.getCoordinates();

    console.log(offSetCalculation(xAndY.x));

    imageContainerElemenet.style.setProperty(
      "--x-offset",
      `${offSetCalculation(xAndY.x)}px`
    );
    imageContainerElemenet.style.setProperty(
      "--y-offset",
      `${offSetCalculation(xAndY.y)}px`
    );
    // console.log("X: ", offSetCalculation(xAndY.x))
    // console.log("Y: ", offSetCalculation(xAndY.y))
  });
});

const pointerObject = () => {
  const coordinatesObject = {
    x: 0,
    y: 0,
    offsetTop: 0,
    offsetLeft: 0,
    height: 0,
    width: 0,
  };

  const updateCoordinate = (newValue, direction) => {
    if (direction === "hori") {
      return (
        newValue -
        coordinatesObject.offsetLeft -
        Math.floor(coordinatesObject.width / 2)
      );
    }
    return (
      newValue -
      coordinatesObject.offsetTop -
      Math.floor(coordinatesObject.height / 2)
    );
  };

  return {
    init: (newX, newY, offsetTop, offsetLeft, height, width) => {
      coordinatesObject.x = updateCoordinate(newX, "hori");
      coordinatesObject.y = updateCoordinate(newY, "vert");
      coordinatesObject.offsetTop = offsetTop;
      coordinatesObject.offsetLeft = offsetLeft;
      coordinatesObject.height = height;
      coordinatesObject.width = width;
    },
    update: (newX, newY) => {
      coordinatesObject.x = updateCoordinate(newX, "hori");
      coordinatesObject.y = updateCoordinate(newY, "vert");
    },
    getCoordinates: () => ({
      x: coordinatesObject.x,
      y: coordinatesObject.y,
    }),
  };
};
