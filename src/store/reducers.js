import {combineReducers} from 'redux';
import { svgCanvasReducer} from './svgcanvas/reducers';

export default combineReducers({
  svgCanvas: svgCanvasReducer,
})
