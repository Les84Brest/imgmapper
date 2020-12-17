import {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { updateSvgFigure, setCurrentFigureId } from "../store/svgcanvas/actions";

import AreaDetails from './AreaDetails';
 


class AreaDetailsContainer extends Component {

   
  /**Prop Types  */
  static propTypes = {
    figuresList: PropTypes.array,
    deleteSvgFigure: PropTypes.func,  // actionmaker for delete figure/area from list
  }

  

  render() {

    return (
      <AreaDetails {... this.props}  />
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