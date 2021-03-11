import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FIGURE_RECT } from '../constants';
import FigureControl from './FigureControl';


class RectSvg extends React.PureComponent {
  state = {
    fillOpacity: 0.40,

  }

  static getDerivedStateFromProps(props, state) {
    if (props.active) {
      return { ...state, fillOpacity: 0.7, }
    }
    return null;
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

    x1: PropTypes.number,
    y1: PropTypes.number,
    x2: PropTypes.number,
    y2: PropTypes.number,
    figureType: PropTypes.string,
    figureColors: PropTypes.object,
    onClick: PropTypes.func, // функция на клик
    active: PropTypes.bool, // активна ли фигура в данный момент 
    drawing: PropTypes.bool, //находится ли фигура в процессе рисования редактирования
  };

  static defaultProps = {
    // пока не заданы координаты второй точки для построения прямоугольника
    x2: null,
    y2: null,
    onClick: () => { },
    active: false,
  }


  render() {

    const { x1, y1, x2, y2, id } = this.props;
    // определяем корректные координаты для построения прямогльника
    // если построение идет снизу вверх, то координаты надо преобразовать
    let rectCoords = null;
    if (y2 < y1) {
      if (x2 < x1) {// координаты снизу вверх справа налево
        rectCoords = {
          x: x2,
          y: y2,
          width: x2 - x1,
          heigth: y2 - y1,
        }
      } else { //x2>x1
        rectCoords = {
          x: x1,
          y: y2,
          width: x2 - x1,
          heigth: y1 - y2,
        }
      }//x2<x1
    } else { //y2 > y1
      if (x2 < x1) {// координаты сверху вниз справа налево
        rectCoords = {
          x: x2,
          y: y1,
          width: x1 - x2,
          heigth: y2 - y1,
        }
      } else { //x2>x1
        rectCoords = {
          x: x1,
          y: y1,
          width: x2 - x1,
          heigth: y2 - y1,
        }
      }//x2<x1
    } //y2 < y1

    return (

      <g className="area-group"  >
        <rect x={rectCoords.x} y={rectCoords.y} height={rectCoords.heigth} width={rectCoords.width} stroke={this.props.figureColors.strokeColor} fill={this.props.figureColors.fillColor} strokeWidth="1" fillOpacity={this.state.fillOpacity} data-area-id={id} />

        {/* управление размерами */}

        {(this.props.drawing) ?
          <FigureControl figureColors={this.props.figureColors} x={rectCoords.x} y={rectCoords.y} key={`${id}-1`} />
          :
          <>
            <FigureControl figureColors={this.props.figureColors} x={rectCoords.x} y={rectCoords.y} key={`${id}-1`} id={`${id}-1`}/>
            <FigureControl figureColors={this.props.figureColors} x={rectCoords.x + rectCoords.width} y={rectCoords.y + rectCoords.heigth} key={`${id}-2`} id={`${id}-2`} />
          </>
        }
      </g>
    );
  }
};



export default RectSvg;
