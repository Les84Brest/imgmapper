import { IMAGE_SET } from "../../constants";

const defaultState = {
  mapImage: null,
}

export const imageReducer = (state = defaultState, action) => { 
  switch (action.type) {

    case IMAGE_SET:
      let newState = { ...state, mapImage: action.payload};
      return newState;
      
    default:
      return state;
  }

}

export default imageReducer;