import {combineReducers} from 'redux';
import imageReducer from './image/reducers';
import { svgCanvasReducer} from './svgcanvas/reducers';
import { settingsReducer} from './settings/reducers';

export default combineReducers({
  svgCanvas: svgCanvasReducer,
  mapImage: imageReducer,
	settings: settingsReducer,
})
