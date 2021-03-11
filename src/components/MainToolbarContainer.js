import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { changeTool } from '../store/svgcanvas/actions';


import MainToolbar from './MainToolbar';
// tools data: name, image, id from json
import toolsList from '../toolsData.json';



class MainToolbarContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state.combinedProps = { ...this.props, toolsList };

  }

  state = {
    combinedProps: null,
  }

  static getDerivedStateFromProps(props, state) {
    if (props.imageName !== state.combinedProps.imageName) {
      let combinedProps = {...state.combinedProps}
      combinedProps.imageName = props.imageName;
      return { ...state, combinedProps};
    }
    return null;
  }

  render() {

    return (
      <MainToolbar {...this.state.combinedProps} />
    )
  }
}

const mapStateToProps = state => {
  return {
    imageName: state.mapImage.imageName,
  }
}

const mapDispatchProps = {
  changeTool,
}

export default connect(mapStateToProps, mapDispatchProps)(MainToolbarContainer);