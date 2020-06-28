const cursorCoordinateHelper = () => {
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

// const colourChange = ({ x, y }) => {
//   // get cursor number x, y
//   // find percentage of (x + 400) + (y + 400) / (width + height)
//   // use percentage to and find %/100 *  255 + 255 + 255
//   // convert to hex and set colour
//   const percentage = ( x + y + 800) / 1600;
//   const colourKey = percentage * (255 + 255 + 255);
//   const colourKeyString = colourKey.toString(16);
//   return getHexValue(colourKeyString);
// };

// const getHexValue = (decimalNumberString) => {
//   // check string
//   let result = 0;
//   // 0 1 2 3 4
//   //
//   for (index in decimalNumberString) {
//     result +=
//       decimalNumberString[decimalNumberString.length - 1 - index] *
//       Math.pow(16, index);
//   }

//   return result;
// };

export { cursorCoordinateHelper };
