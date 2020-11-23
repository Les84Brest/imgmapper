import { SVG_ADD_FIGURE, SVG_DELETE_FIGURE, SVG_GET_FIGURE_NUMBER } from '../../constants';

export const addSvgFigure = (figure) => ({
  type: SVG_ADD_FIGURE,
  payload: figure,
})

export const  deleteSvgFigure = (id) => ({
  type: SVG_DELETE_FIGURE,
  payload: id,
})
//get figure id 
export const getFigureNumber = () => ({
  type: SVG_GET_FIGURE_NUMBER,
  
})