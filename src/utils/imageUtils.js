import placeholderImage from "../assets/600x400.svg";

export const getValidImage = (images) => {
  if (!Array.isArray(images) || images.length === 0) {
    return placeholderImage;
  }

  const validImage = images.find((image) => {
    if (typeof image !== "string") return false;
    return !image.includes("placeimg.com") && image.trim() !== "";
  });

  return validImage || placeholderImage;
};
