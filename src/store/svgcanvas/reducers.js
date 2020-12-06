import { SVG_ADD_FIGURE, SVG_DELETE_FIGURE, SVG_UPDATE_FIGURE_NUMBER, FIGURE_RECT,   FIGURE_CIRCLE,  FIGURE_POLYGON, RECT_TOOL, POLY_TOOL } from '../../constants';


const defaultState = {
  figureId: 1,
  currentTool: POLY_TOOL,
  figuresList: [/*<RectSvg
    x1={50}
    y1={50}
    x2={75}
    y2={85}
    id={100}
    key={100} />,

 <CircleSvg
    x1={150}
    y1={120}
    x2={170}
    y2={80}
    id={500}
  key={500} />,*/]
  
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
      return {...state, figureId: action.payload};

    default:
      return state;

  }

  
}