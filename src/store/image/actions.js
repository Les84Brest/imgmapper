import { IMAGE_SET, } from "../../constants";
// записать изображение в Redux

export const setMapImage = (image) => ({
  type: IMAGE_SET,
  payload: image,
})

