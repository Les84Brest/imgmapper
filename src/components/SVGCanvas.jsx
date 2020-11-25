/* eslint-disable no-unreachable */
import React from 'react';
import PropTypes from 'prop-types';
import { FIGURE_CIRCLE, FIGURE_RECT, FIGURE_POLYGON } from '../constants';

import RectSvg from './RectSvg';
import PolySvg from './PolySvg';
import CircleSvg from './CircleSvg';

//css import
import './SVGCanvas.sass';

export default class SVGCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      figuresList: props.figuresList,
      firstClick: null, // текущая фигура с которой идет работа в данный момент
      figureId: props.figureId,
      figures: [],
    }


  }
  /**Prop Types  */
  static propTypes = {

    addSvgFigure: PropTypes.func,
    deleteSvgFigure: PropTypes.func,
    getFigureNumber: PropTypes.func,
    figureId: PropTypes.number,
    figuresList: PropTypes.array,
    curentTool: PropTypes.string,
  }


  getFigure = (figureData, id) => {
    switch (figureData.figureType) {
      case FIGURE_RECT:
        return <RectSvg
          x1={figureData.x1}
          y1={figureData.y1}
          x2={figureData.x2}
          y2={figureData.y2}
          key={Math.random() * 10000} />;
      case FIGURE_CIRCLE:
        return <CircleSvg
          cx={figureData.cx}
          cy={figureData.cy}
          r={figureData.r}
          key={Math.random() * 10000}
        />;
      case FIGURE_POLYGON:
        return <PolySvg
          points={figureData.points}
          key={Math.random() * 10000}
        />;
      default:
        return null;
    }
  }

  addNewFigureToState = (newFigure) => {

    let newFiguresList = [...this.state.figures, newFigure]
    let newFigureId = this.state.figureId;
    newFigureId++;
    // добавляем в фигуры новую фигуру и устанавливаем ее как текущую фигуру с которой идет работа
    this.setState({ figures: newFiguresList, firstClick: null, figureId: newFigureId });

  }

  handleMouseClick = (e) => {
    e.stopPropagation();

    let svgRect = e.target.getBoundingClientRect(); // получаем прямоугольник под SVG холстом

    if (this.state.firstClick == null) {
      this.setState({ firstClick: { x: e.clientX - svgRect.left, y: e.clientY - svgRect.top } }); //устанавливаем первый клик

    } else {
      

      switch (this.props.curentTool) {

        case FIGURE_RECT:

          this.addNewFigureToState(<RectSvg
            x1={this.state.firstClick.x}
            y1={this.state.firstClick.y}
            x2={e.clientX - svgRect.left}
            y2={e.clientY - svgRect.top}
            key={this.state.figureId} />);

          break;
        case FIGURE_CIRCLE:

          this.addNewFigureToState( <CircleSvg
            x1={this.state.firstClick.x}
            y1={this.state.firstClick.y}
            x2={e.clientX - svgRect.left}
            y2={e.clientY - svgRect.top}
            key={this.state.figureId} /> );

          break;
        default: return null;
      }


    }
  }




  render() {

    // const figures = this.state.figuresList.map(figure => {
    //   return this.getFigure(figure, 150);
    // });

    return (
      <div className="svg-canvas">
        <svg width="500" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg" onClick={this.handleMouseClick} >
          {this.state.figures}
        </svg>
      </div>
    )
  }
}
