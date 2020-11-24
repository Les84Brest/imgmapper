import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FIGURE_RECT } from '../constants';
import FigureControl from './FigureControl';


class RectSvg extends React.PureComponent {

  constructor(props){
    super(props);

    this.state = {...props, 
      fillOpacity: 0.54, 
      fillColor: 'PaleTurquoise',
      strokeColor: 'teal' };
  }

// должен быть в каждом классе фигуры
  figureToObject = () => ({
    x1: this.state.x1,
    y1: this.state.y1,
    x2: this.state.x2,
    y2: this.state.y2,
    figureType: FIGURE_RECT,
  });

  static propTypes = {
    id: PropTypes.number,
    x1: PropTypes.number,
    y1: PropTypes.number,
    x2: PropTypes.number,
    y2: PropTypes.number,
    figureType: PropTypes.string,
  };

  static defaultProps = {
    // пока не заданы координаты второй точки для построения прямоугольника
    x2: null,
    y2: null,
  }

  render() {

    const {x1, y1, x2, y2, strokeColor, fillColor, fillOpacity, id} = this.state;
    // определяем корректные координаты для построения прямогльника
    // если построение идет снизу вверх, то координаты надо преобразовать
    let rectCoords = null;
    if (y2 < y1){
      if  (x2 < x1) {// координаты снизу вверх справа налево
        rectCoords = {
          x: x2,
          y: y2,
          width: x1 - x2,
          heigth: y1 - y2,          
        }
      }else{ //x2>x1
        rectCoords = {
          x: x1,
          y: y2,
          width: x2 - x1,
          heigth: y1 - y2,          
        }
      }//x2<x1
    }else { //y2 > y1
      if  (x2 < x1) {// координаты сверху вниз справа налево
        rectCoords = {
          x: x2,
          y: y1,
          width: x1 - x2,
          heigth: y2 - y1,          
        }
      }else{ //x2>x1
        rectCoords = {
          x: x1,
          y: y1,
          width: x2 - x1,
          heigth: y2 - y1,          
        }
      }//x2<x1
    } //y2 < y1

    return (

      <Fragment>

     
          <rect x={rectCoords.x} y={rectCoords.y} height={rectCoords.heigth} width={rectCoords.width} stroke={strokeColor} fill={fillColor} strokeWidth="1" fillOpacity={fillOpacity} id={`rect-${id}`} />
          
          {/* управление размерами */}
          <g>   
            <FigureControl x={rectCoords.x} y={rectCoords.y} key={`${id}-1`} />         
            <FigureControl x={rectCoords.x + rectCoords.width} y={rectCoords.y + rectCoords.heigth} key={`${id}-2`} />         
            
          </g>
        

        
      </Fragment >
    );
  }
};



// rectCoords = {// координаты снизу вверх слева направо
//   x: x1,
//   y: y2,
//   width: Math.abs(x1 - x2),
//   heigth: Math.abs(y1 - y2),            
// }
export default RectSvg;