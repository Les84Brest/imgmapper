import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateSvgFigure, } from "../store/svgcanvas/actions";

import AreaDetails from './AreaDetails';



class AreaDetailsContainer extends PureComponent {



  static getDerivedStateFromProps(nextProps, prevState) {
    
    if (prevState == null) {
      return { currentFigureId: nextProps.currentFigureId };
    } else {
      return { ...prevState, currentFigureId: nextProps.currentFigureId };
    }
  }



getAreaToShowIndex = id => {
  const areaToShowIndex = this.props.figuresList.findIndex(val => {
    if (val.id == id){
      return true;
    }
  });
  return areaToShowIndex;
  
}

  /**Prop Types  */
  static propTypes = {
  figuresList: PropTypes.array,
  deleteSvgFigure: PropTypes.func,  // actionmaker for delete figure/area from list
}


render() {
  console.log('Container render');
  const areaToShow = this.props.figuresList[this.getAreaToShowIndex(this.state.currentFigureId)];

  return (
    <AreaDetails areaToShow={areaToShow}  updateSvgFigure={this.props.updateSvgFigure} />
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