import { SVG_ADD_FIGURE, SVG_DELETE_FIGURE, SVG_UPDATE_FIGURE_NUMBER, SVG_CHANGE_TOOL, SVG_UPDATE_FIGURE, SVG_SET_CURRENT_FIGURE_ID } from '../../constants';

export const addSvgFigure = (figure) => ({
  type: SVG_ADD_FIGURE,
  payload: figure,
})

export const  deleteSvgFigure = (id) => ({
  type: SVG_DELETE_FIGURE,
  payload: id,
})

// обновить данные фигуры
export const  updateSvgFigure = (figure) => ({
  type: SVG_UPDATE_FIGURE,
  payload: figure,
})

//get figure id 
export const updateMaxId = (number) =>{ 
  number++;
 
  let action = {
    type: SVG_UPDATE_FIGURE_NUMBER,
    payload: number,
  }

  return action;
}
// изменение текущего инструмента рисования, редактирования
export const changeTool = (tool) => {
  const action = {
    type: SVG_CHANGE_TOOL,
    payload: tool,
  }

  return action;
}

export const setCurrentFigureId = (id) => {
  const action = {
    type: SVG_SET_CURRENT_FIGURE_ID,
    payload: id,
  }
  
  return action;
}

