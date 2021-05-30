import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import SVGCanvas from './SVGCanvas';
import {addSvgFigure, deleteSvgFigure, setCurrentFigureId, updateMaxId, updateSvgFigure } from '../store/svgcanvas/actions';
import { withDrawCircle } from './withDrawCircle';
import { withDrawRect } from './withDrawRect';
import { withDrawPoly } from './withDrawPoly';
import { withMove } from "./withMove";
import { RECT_TOOL, CIRCLE_TOOL, POLY_TOOL, MOVE_TOOL } from '../constants';


class SVGCanvasContainer extends React.Component{
  



  render() {
   let DrawCircleCanvas = withDrawCircle(this.props)(SVGCanvas); // рисование кругов
   let DrawRectCanvas = withDrawRect(this.props)(SVGCanvas); // рисование кругов
   let DrawPolyCanvas = withDrawPoly(this.props)(SVGCanvas); // рисование кругов
   let MoveCanvas = withMove(this.props)(SVGCanvas); // рисование кругов
   
    return (
      <Fragment>
        {(this.props.currentTool === RECT_TOOL) &&
        <DrawRectCanvas />
        }
        {(this.props.currentTool === CIRCLE_TOOL) &&
        <DrawCircleCanvas />
        }
        {(this.props.currentTool === POLY_TOOL) &&
        <DrawPolyCanvas />
        }
        {(this.props.currentTool === MOVE_TOOL) &&
        <MoveCanvas />
        }
        
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    figureId: state.svgCanvas.figureId,
    currentFigureId: state.svgCanvas.currentFigureId,
    figuresList:  state.svgCanvas.figuresList,
    currentTool: state.svgCanvas.currentTool,
    imageSize: state.mapImage.imageSize,
    figureColors: state.settings.figureColors,
  }
}
const mapDispatchProps = {
  addSvgFigure, deleteSvgFigure, updateMaxId, setCurrentFigureId, updateSvgFigure,
}

export default connect(mapStateToProps, mapDispatchProps)(SVGCanvasContainer);