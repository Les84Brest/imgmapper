import { SVG_ADD_FIGURE, SVG_DELETE_FIGURE, SVG_UPDATE_FIGURE_NUMBER, FIGURE_RECT, FIGURE_CIRCLE, FIGURE_POLYGON, RECT_TOOL, POLY_TOOL, SVG_CHANGE_TOOL, SVG_UPDATE_FIGURE, SVG_SET_CURRENT_FIGURE_ID } from '../../constants';


const defaultState = {
  figureId: 1,
  currentTool: POLY_TOOL,
  figuresList: [],
  currentFigureId: null,
}

export const svgCanvasReducer = (state = defaultState, action) => {

  let figures = null;
  

  switch (action.type) {

    case SVG_ADD_FIGURE:
      figures = [...state.figuresList, action.payload];
      let newState = { ...state, figuresList: figures };
      return newState;

    // сюда передаем индекс из массива
    case SVG_DELETE_FIGURE:
      figures = state.figuresList.slice();
      const figureKey = figures.indexOf(item => {
        return item.id === action.payload;
      })
      figures.splice(figureKey, 1);
      return { ...state, figuresList: figures };

    case SVG_UPDATE_FIGURE_NUMBER:
      return { ...state, figureId: action.payload };

    case SVG_CHANGE_TOOL:
      return { ...state, currentTool: action.payload };

    case SVG_UPDATE_FIGURE:
      figures = [...state.figuresList];
      let delIndex = figures.findIndex(item => {
        return item.id === action.payload.id ? true : false; });
      figures.slice(delIndex, 1, action.payload);
      newState = { ...state, figuresList: figures.slice(delIndex, 1, action.payload) };
      return newState;
    case SVG_SET_CURRENT_FIGURE_ID:
      return { ...state, currentFigureId: action.payload };
     

    default:
      return state;

  }


}