import {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { deleteSvgFigure, setCurrentFigureId } from "../store/svgcanvas/actions";

import AreasList from './AreasList'
 


class AreasListContainer extends Component {

   
  /**Prop Types  */
  static propTypes = {
    figuresList: PropTypes.array,
    deleteSvgFigure: PropTypes.func,  // actionmaker for delete figure/area from list
  }

  

  render() {

    return (
      <AreasList {... this.props}  />
    )
  }
}

const mapStateToProps = state => {
  return {
    figuresList:  state.svgCanvas.figuresList,
      
  }
}
const mapDispatchProps = {
   deleteSvgFigure, setCurrentFigureId,
}

export default connect(mapStateToProps, mapDispatchProps)(AreasListContainer);