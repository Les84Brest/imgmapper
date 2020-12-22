import {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { updateSvgFigure,  } from "../store/svgcanvas/actions";

import AreaDetails from './AreaDetails';
 


class AreaDetailsContainer extends Component {

   constructor(props){
     super(props);
    //
     let areaControls = getAreaControls(props.currentFigureId);
    this.state = {
      combinedProps: {props, areaControls},
    }

   }
  /**Prop Types  */
  static propTypes = {
    figuresList: PropTypes.array,
    deleteSvgFigure: PropTypes.func,  // actionmaker for delete figure/area from list
  }

 
  getAreaControls = id => {

  }

  render() {

    return (
      <AreaDetails {... this.state.combinedProps}  />
    )
  }
}

const mapStateToProps = state => {
  return {
    figuresList: state.svgCanvas.figuresList,
    currentFigureId: state.svgCanvas.currentFigureId,
      
  }
}
const mapDispatchProps = {
  updateSvgFigure, 
}

export default connect(mapStateToProps, mapDispatchProps)(AreaDetailsContainer);