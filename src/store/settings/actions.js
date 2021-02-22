import { IMAGE_SET_SIZE   } from "../../constants";

// actions для настроек

export const setSome = (imageSize) => ({
  type: IMAGE_SET_SIZE,
  payload: imageSize,
})

