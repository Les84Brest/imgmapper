import React from 'react';
import {connect} from 'react-redux';
import SVGCanvas from './SVGCanvas';
import {addSvgFigure, deleteSvgFigure, getFigureNumber } from '../store/svgcanvas/actions';


class SVGCanvasContainer extends React.Component{

  state = {
   
  }

  /**Prop Types  */
  static propTypes = {
    

  }

  someHandler = () => {
    //some code
  }


  render() {
    console.log("Пропсы", this.props);
    return (
      <SVGCanvas {...this.props} />
    )
  }
}

const mapStateToProps = state => {
  return {
    figureId: state.svgCanvas.figureId,
    figuresList:  state.svgCanvas.figuresList,
  }
}
const mapDispatchProps = {
  addSvgFigure, deleteSvgFigure, getFigureNumber, 
}

export default connect(mapStateToProps, mapDispatchProps)(SVGCanvasContainer);