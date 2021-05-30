/* eslint-disable no-unreachable */
import React from 'react';
import PropTypes from 'prop-types';
import { FIGURE_CIRCLE, FIGURE_RECT, FIGURE_POLYGON, MOVE_TOOL, CIRCLE_TOOL, RECT_TOOL, POLY_TOOL, } from '../constants';
import RectSvg from './RectSvg';
import PolySvg from './PolySvg';
import CircleSvg from './CircleSvg';
import ClassNames from "classnames";


//css import
import './SVGCanvas.sass';


export default class SVGCanvas extends React.Component {

  constructor(props) {
    super(props);

    // классы
    let classes = ClassNames('svg-canvas', this.getToolCursor(props.currentTool))


    this.state = {
      workMode: props.workMode,
      classes,
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
    currentTool: PropTypes.string,
    figuresList: PropTypes.array,
    currentTool: PropTypes.string,
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
    currentTool: '',
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

  getToolCursor = (tool) => {
    console.log(tool);
    switch(tool){
      case MOVE_TOOL:
        return 'cursor-move-tool';
        break;
      case CIRCLE_TOOL:
        return 'cursor-circle-tool';
        break;
      case RECT_TOOL:
        return 'cursor-rect-tool';
        break;
      case POLY_TOOL:
        return 'cursor-poly-tool';
        break;
      default: 
        return '';
    }
  }
  // при клике и движении мышью отдаем координаты в callback а там уже решат что делать

  handleMouseClick = (e) => {
    //e.stopPropagation();
    //отслеживаем нажатие ctrl
    
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
      <div className={this.state.classes} ref={this.setSvgRef}>
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


