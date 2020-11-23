import { SVG_ADD_FIGURE, SVG_DELETE_FIGURE, SVG_GET_FIGURE_NUMBER } from '../../constants';
import { FIGURE_RECT,   FIGURE_CIRCLE,  FIGURE_POLYGON} from '../../constants';

const defaultState = {
  figureId: 1,
  figuresList: [
    {figureType: FIGURE_RECT,
    x: 15,
    y: 50,
    width: 30,
    height: 150,
  },

  {figureType: FIGURE_CIRCLE,
    cx: 25,
    cy: 75,
    r: 20,
  },

  {figureType: FIGURE_POLYGON,
    points: "50 160 55 180 70 180 60 190",
    
  },

  ],
  
}

export const svgCanvasReducer = (state = defaultState, action ) => {

  let figures = null;

  switch(action.type){

    case SVG_ADD_FIGURE:
      figures = [...state.figuresList, action.payload];
      let newState = {...state, figuresList: figures};
      return newState;
    
      // сюда передаем индекс из массива
    case SVG_DELETE_FIGURE:
      figures = state.figuresList.slice();
      figures.splice(action.payload, 1);
      return {...state, figuresList: figures};
      
    case SVG_GET_FIGURE_NUMBER:
      let lastNumber = state.figureId + 1;
      return {...state, figureNumber: lastNumber};
    default:
      return state;

  }

  
}