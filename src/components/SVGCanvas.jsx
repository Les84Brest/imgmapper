/* eslint-disable no-unreachable */
import React from 'react';
import PropTypes from 'prop-types';
import { FIGURE_CIRCLE, FIGURE_RECT, FIGURE_POLYGON } from '../constants';

import RectSvg from './RectSvg';
import PolySvg from './PolySvg';
import CircleSvg from './CircleSvg';

//css import
import './SVGCanvas.sass';

class SVGCanvas extends React.Component {

  constructor(props) {
    super(props);
    

    let figures = this.convertToFigures(props.figuresList);

    this.state = {figures: figures}
  }

  convertToFigures = (figuresData) => {
    
    const figures = figuresData.map(item => {
      switch (item.figureType) {
        case FIGURE_CIRCLE:
          return <CircleSvg
            cx={item.cx}
            cy={item.cy}
            r={item.r}
            key={this.props.figureId}
          />;

        case FIGURE_RECT:
          return <RectSvg
            x={item.x}
            y={item.y}
            width={item.width}
            height={item.height}
            key={this.props.figureId} />;

        case FIGURE_POLYGON:
          return <PolySvg
            points={item.points}
            key={this.props.figureId}
          />;
        default:
          return null;

      }
      //увеличить id
      this.props.getFigureNumber();
    });
    
    return figures;
  }

  state = {
    currentTool: '',
  }
  

  /**Prop Types  */
  static propTypes = {

    addSvgFigure: PropTypes.func,
    deleteSvgFigure: PropTypes.func,
    getFigureNumber: PropTypes.func,
    figureId: PropTypes.number,
    figuresList: PropTypes.array,

  }


  render() {
    console.log(this.state.figures);
    return (
      <div className="svg-canvas">
        <svg width="800" height="800" version="1.1" xmlns="http://www.w3.org/2000/svg">
          {this.state.figures}
        
        </svg>
      </div>
    )
  }
}

export default SVGCanvas;