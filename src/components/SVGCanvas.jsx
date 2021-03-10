/* eslint-disable no-unreachable */
import React from 'react';
import PropTypes from 'prop-types';
import { FIGURE_CIRCLE, FIGURE_RECT, FIGURE_POLYGON, MODE_DRAWING, MODE_EDIT } from '../constants';
import RectSvg from './RectSvg';
import PolySvg from './PolySvg';
import CircleSvg from './CircleSvg';


//css import
import './SVGCanvas.sass';


export default class SVGCanvas extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      workMode: props.workMode,
      firstClick: null,
      figureId: props.figureId,
      figures: [],
      figureColors: props.figureColors,
      leftTopCoords: null, // координаты левого верхнего угла
    }

    //реф на svg
    this.svgRef = null;

  }

  componentDidMount() {

    let svgRect = this.svgRef.getBoundingClientRect();
    // устанавливаем координаты верхнего левого угла для рассчета клика
    this.setState({
      leftTopCoords: {
        left: svgRect.left,
        top: svgRect.top,
      }
    })

  }

  /**Prop Types  */
  static propTypes = {
    workMode: PropTypes.string,
    figuresList: PropTypes.array,
    curentTool: PropTypes.string,
    cbMouseClick: PropTypes.func,
    cbMouseMove: PropTypes.func,
    figureColors: PropTypes.object,
    cbMouseDown: PropTypes.func,
    cbMouseUp: PropTypes.func,
  }

  static defaultProps = {
    cbMouseClick: () => {},
    cbMouseMove: () => {},
    figureColors: {},
    cbMouseDown: () => {},
    cbMouseUp: () => {},
  }
  cbSetCurrentFigure = (figureId) => {
    
    this.props.setCurrentFigureId(figureId);
  }

  getFigure = (figureData) => {
    switch (figureData.figureType) {
      case FIGURE_RECT:
        return <RectSvg
          figureColors={this.state.figureColors}
          x1={figureData.x1}
          y1={figureData.y1}
          x2={figureData.x2}
          y2={figureData.y2}
          id={figureData.id}
          key={figureData.key} 
          onClick={this.cbSetCurrentFigure}
          
          active={this.props.setCurrentFigureId == figureData.id }
          />;
      case FIGURE_CIRCLE:
        return <CircleSvg
          figureColors={this.state.figureColors}
          x1={figureData.x1}
          y1={figureData.y1}
          x2={figureData.x2}
          y2={figureData.y2}
          id={figureData.id}
          
          key={figureData.key}
          onClick={this.cbSetCurrentFigure}
          active={this.props.setCurrentFigureId == figureData.id }
          />;

      case FIGURE_POLYGON:
        return <PolySvg
          figureColors={this.state.figureColors}
          points={figureData.points}
          id={figureData.id}
          key={figureData.key} 
          onClick={this.cbSetCurrentFigure}
          active={this.props.setCurrentFigureId == figureData.id }
          />;

      default:
        return null;
    }
  }

 
  // при клике и движении мышью отдаем координаты в callback а там уже решат что делать

  handleMouseClick = (e) => {
    //e.stopPropagation();
    //отслеживаем нажатие ctrl
    console.log(e.target);
    const ctrlKey = e.ctrlKey || e.metaKey;
    const { leftTopCoords } = this.state;

    this.props.cbMouseClick(Math.floor(e.clientX - leftTopCoords.left), Math.floor(e.clientY - leftTopCoords.top), ctrlKey);
  }

  handleMouseMove = (e) => {
    e.stopPropagation();
    //отслеживаем нажатие ctrl
    const ctrlKey = e.ctrlKey || e.metaKey;
    const { leftTopCoords } = this.state;
    
    this.props.cbMouseMove(Math.floor(e.clientX - leftTopCoords.left), Math.floor(e.clientY - leftTopCoords.top), ctrlKey);

  }

  handleMouseDown = (e) => {
    console.log(e.target.dataset);
    const { leftTopCoords } = this.state;
      //передаем x, y, areaId из dataset для опеределения на какой области клик
    this.props.cbMouseDown(Math.floor(e.clientX - leftTopCoords.left), Math.floor(e.clientY - leftTopCoords.top), e.target.dataset.areaId);
  }
  
  handleMouseUp = (e) => {
    const ctrlKey = e.ctrlKey || e.metaKey;
    const { leftTopCoords } = this.state;
    this.props.cbMouseUp(Math.floor(e.clientX - leftTopCoords.left), Math.floor(e.clientY - leftTopCoords.top));
  }

  setSvgRef = ref => {
    this.svgRef = ref;
  }

  render() {

    const figures = this.props.figuresList.map(figure => {
      return this.getFigure(figure);
    });

    return (
      <div className="svg-canvas" ref={this.setSvgRef}>
        <svg width={this.props.imageSize.imageWidth} height={this.props.imageSize.imageHeigth} version="1.1" xmlns="http://www.w3.org/2000/svg" 
        onClick={this.handleMouseClick} 
        onMouseMove={this.handleMouseMove}  
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        >
          {figures}
        </svg>
      </div>
    )
  }
}


