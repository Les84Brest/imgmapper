import React from 'react';
import {connect} from 'react-redux';
import SVGCanvas from './SVGCanvas';
import {addSvgFigure, deleteSvgFigure, updateMaxId } from '../store/svgcanvas/actions';


class SVGCanvasContainer extends React.Component{

  state = {
    currentTool: '',
  }

  /**Prop Types  */
  static propTypes = {
    

  }

  


  render() {
    
    return (
      <SVGCanvas {...this.props} />
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