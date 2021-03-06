const setUpImageContainer = async () => {
  const imageContainerDiv = document.body.querySelector(".image-container");
  const cursorFollowDiv = document.createElement("DIV");
  cursorFollowDiv.classList.add("cursor-follow");

  const imageContentContainerDiv = document.createElement("DIV");
  imageContentContainerDiv.classList.add("image-content");
  const image = document.createElement("IMG");

  console.log(process.env.GH_PATH);

  image.setAttribute("src", `${process.env.GH_PATH || "/"}assets/rodeo.jpg`);

  image.setAttribute("alt", "alt text");

  imageContentContainerDiv.appendChild(image);

  imageContainerDiv.appendChild(cursorFollowDiv);
  imageContainerDiv.appendChild(imageContentContainerDiv);
};

export { setUpImageContainer };
