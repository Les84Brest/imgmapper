import { IMAGE_SET, IMAGE_SET_SIZE, IMAGE_SET_MAP_NAME } from "../../constants";

const defaultState = {
  figureColors: {
    strokeColor: "#FF4500",
    fillColor: "#EEE8AA",
    markerFillColor: "#BEEE6F",
    markerStrokeColor: "#333333",
  },
}

export const settingsReducer = (state = defaultState, action) => {
  let newState = null;
  switch (action.type) {

    case IMAGE_SET:
      newState = { ...state, mapImage: action.payload };
      return newState;


    default:
      return state;
  }

}

export default settingsReducer;