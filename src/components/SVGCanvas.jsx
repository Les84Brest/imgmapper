/* eslint-disable no-unreachable */
import React from 'react';
import PropTypes from 'prop-types';
import { FIGURE_CIRCLE, FIGURE_RECT, FIGURE_POLYGON } from '../constants';

import RectSvg from './RectSvg';
import PolySvg from './PolySvg';
import CircleSvg from './CircleSvg';
import DownloadImage from "./DownloadImage";

//css import
import './SVGCanvas.sass';


export default class SVGCanvas extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
     
      firstClick: null, // текущая фигура с которой идет работа в данный момент
      figureId: props.figureId,
      figures: [],
    }


  }
  /**Prop Types  */
  static propTypes = {
    workMode: PropTypes.string,
    figuresList: PropTypes.array,
    curentTool: PropTypes.string,
    cbMouseClick: PropTypes.func,
    cbMouseMove: PropTypes.func,
  }


  getFigure = (figureData) => {
    switch (figureData.figureType) {
      case FIGURE_RECT:
        return <RectSvg
          x1={figureData.x1}
          y1={figureData.y1}
          x2={figureData.x2}
          y2={figureData.y2}
          id={figureData.figureId}
          key={figureData.key} />;
      case FIGURE_CIRCLE:
        return <CircleSvg
        x1={figureData.x1}
        y1={figureData.y1}
        x2={figureData.x2}
        y2={figureData.y2}
        id={figureData.figureId}
        key={figureData.key} />;
        
      case FIGURE_POLYGON:
        return <PolySvg
          points={figureData.points}
          id={figureData.figureId}
          key={figureData.key} />;
        
      default:
        return null;
    }
  }

  // addNewFigureToState = (newFigure) => {

  //   let newFiguresList = [...this.state.figures, newFigure]
  //   let newFigureId = this.state.figureId;
  //   newFigureId++;
  //   // добавляем в фигуры новую фигуру и устанавливаем ее как текущую фигуру с которой идет работа
  //   this.setState({ figures: newFiguresList, firstClick: null, figureId: newFigureId });

  // }

  // при клике и движении мышью отдаем координаты в callback а там уже решат что делать

  handleMouseClick = (e) => {
    e.stopPropagation();
    //отслеживаем нажатие ctrl
    const ctrlKey = e.ctrlKey || e.metaKey;

    let svgRect = e.target.getBoundingClientRect(); // получаем прямоугольник под SVG холстом
    this.props.cbMouseClick(Math.floor(e.clientX - svgRect.left), Math.floor(e.clientY - svgRect.top), ctrlKey);

    
  }
  handleMouseMove = (e) => {
    e.stopPropagation();
    //отслеживаем нажатие ctrl
    const ctrlKey = e.ctrlKey || e.metaKey;

    let svgRect = e.target.getBoundingClientRect(); // получаем прямоугольник под SVG холстом
    this.props.cbMouseMove(Math.floor(e.clientX - svgRect.left), Math.floor(e.clientY - svgRect.top), ctrlKey );

  }


  render() {

    const figures = this.props.figuresList.map(figure => {
      return this.getFigure(figure);
    });

    return (
      <div className="svg-canvas">
       
        <svg width="500" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg" onClick={this.handleMouseClick} onMouseMove={this.handleMouseMove}  >
          {figures}
        </svg>
      </div>
    )
  }
}
