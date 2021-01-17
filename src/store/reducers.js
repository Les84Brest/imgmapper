import {combineReducers} from 'redux';
import imageReducer from './image/reducers';
import { svgCanvasReducer} from './svgcanvas/reducers';

export default combineReducers({
  svgCanvas: svgCanvasReducer,
  mapImage: imageReducer,
})
