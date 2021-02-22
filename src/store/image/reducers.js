import { IMAGE_SET, IMAGE_SET_SIZE, IMAGE_SET_MAP_NAME, IMAGE_SET_IMAGE_NAME } from "../../constants";

const defaultState = {
  mapImage: null,
  imageSize: null,
  mapName: null,
  imageName: null,
}

export const imageReducer = (state = defaultState, action) => {
  let newState = null;
  switch (action.type) {

    case IMAGE_SET:
      newState = { ...state, mapImage: action.payload };
      return newState;

    case IMAGE_SET_SIZE:
      newState = { ...state, imageSize: action.payload };
      return newState;

    case IMAGE_SET_MAP_NAME:
      newState = {...state, mapName: action.payload}
      return newState;

    case IMAGE_SET_IMAGE_NAME:
      newState = {...state, imageName: action.payload}
      return newState;
      
    default:
      return state;
  }

}

export default imageReducer;