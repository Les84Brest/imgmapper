import { SVG_ADD_FIGURE, SVG_DELETE_FIGURE, SVG_UPDATE_FIGURE_NUMBER, FIGURE_RECT,   FIGURE_CIRCLE,  FIGURE_POLYGON } from '../../constants';


const defaultState = {
  figureId: 1,
  currentTool: FIGURE_CIRCLE,
  figuresList: [
    {figureType: FIGURE_RECT,
    x1: 100,
    y1: 115,
    x2: 30,
    y2: 20,
  },

  {figureType: FIGURE_CIRCLE,
    cx: 25,
    cy: 75,
    r: 20,
  },

  {figureType: FIGURE_POLYGON,
    points: "50 160 55 180 70 180 60 190 30 40 80 70",
    
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
      
    case SVG_UPDATE_FIGURE_NUMBER:
      return {...state, figureNumber: action.payload};
    default:
      return state;

  }

  
}