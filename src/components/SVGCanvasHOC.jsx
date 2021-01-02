/* eslint-disable no-unreachable */
import React from 'react';
import PropTypes from 'prop-types';

import { MODE_EDIT,  MODE_DRAWING } from "../constants";

//sass import
import './SVGCanvas.sass';

export default class SVGCanvas extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      figuresList: props.figuresList,
      firstClick: null, // текущая фигура с которой идет работа в данный момент
      workMode: props.workMode,
      drawingEditingStarted: false,

    }

  }
  componentDidUpdate = () => {
    this.setState({ figuresList: this.props.figuresList });
  }
  /**Prop Types  */
  static propTypes = {

    figureId: PropTypes.number,
    figuresList: PropTypes.array,
    curentTool: PropTypes.string,
    addSvgFigure: PropTypes.func,
    deleteSvgFigure: PropTypes.func,
    updateMaxId: PropTypes.func,
    cbMouseClick: PropTypes.func,
    cbMouseMove: PropTypes.func,

  }



  handleMouseClick = (e) => {
    e.stopPropagation();

    let svgRect = e.target.getBoundingClientRect(); // получаем прямоугольник под SVG холстом

    // передаем координаты клика
    if (this.state.workMode === MODE_DRAWING || this.state.workMode === MODE_EDIT) {
      this.props.cbMouseClick(Math.floor(e.clientX - svgRect.left), Math.floor(e.clientY - svgRect.top));
    }
    //переключаем начало и конец радактирования

    this.setState({ drawingEditingStarted: !this.state.drawingEditingStarted });

  }

  handleMouseMove = (e) => {

    e.stopPropagation();

    let svgRect = e.target.getBoundingClientRect(); // получаем прямоугольник под SVG холстом

    if (this.state.workMode === MODE_DRAWING || this.state.workMode === MODE_EDIT) {
      if (this.state.drawingEditingStarted) { 

        // отдавать координаты, только если процесс редактирования рисования начат
        
        this.props.cbMouseMove(Math.floor(e.clientX - svgRect.left), Math.floor(e.clientY - svgRect.top));
      }
    }
  }




  render() {

    return (
      <div className="svg-canvas">
        <svg width="500" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg" onClick={this.handleMouseClick} onMouseMove={this.handleMouseMove} >
          {this.state.figuresList}
        </svg>
      </div>
    )
  }
}
