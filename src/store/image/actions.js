import { IMAGE_SET, IMAGE_SET_SIZE, IMAGE_SET_MAP_NAME, IMAGE_SET_IMAGE_NAME } from "../../constants";

// установить размеры изображения
export const setImageSize = (imageSize) => ({
  type: IMAGE_SET_SIZE,
  payload: imageSize,
})
// записать изображение в Redux
export const setMapImage = (image) => ({
  type: IMAGE_SET,
  payload: image,
})

export const setMapName = (mapName) => {

  return({type: IMAGE_SET_MAP_NAME,
    payload: mapName,})
    
  
}
export const setImageName = (imageName) => {
  
  return({type: IMAGE_SET_IMAGE_NAME,
    payload: imageName,})
    
  
}
