import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import SVGCanvas from './SVGCanvas';
import {addSvgFigure, deleteSvgFigure, updateMaxId } from '../store/svgcanvas/actions';
import { withDrawCircle } from './withDrawCircle';
import { withDrawRect } from './withDrawRect';
import { withDrawPoly } from './withDrawPoly';
import { RECT_TOOL, CIRCLE_TOOL, POLY_TOOL } from '../constants';


class SVGCanvasContainer extends React.Component{
  



  render() {
   let DrawCircleCanvas = withDrawCircle(this.props)(SVGCanvas); // рисование кругов
   let DrawRectCanvas = withDrawRect(this.props)(SVGCanvas); // рисование кругов
   let DrawPolyCanvas = withDrawPoly(this.props)(SVGCanvas); // рисование кругов
   
    return (
      <Fragment>
        {(this.props.curentTool === RECT_TOOL) &&
        <DrawRectCanvas />
        }
        {(this.props.curentTool === CIRCLE_TOOL) &&
        <DrawCircleCanvas />
        }
        {(this.props.curentTool === POLY_TOOL) &&
        <DrawPolyCanvas />
        }
        
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    figureId: state.svgCanvas.figureId,
    figuresList:  state.svgCanvas.figuresList,
    curentTool: state.svgCanvas.currentTool
  }
}
const mapDispatchProps = {
  addSvgFigure, deleteSvgFigure, updateMaxId, 
}

export default connect(mapStateToProps, mapDispatchProps)(SVGCanvasContainer);