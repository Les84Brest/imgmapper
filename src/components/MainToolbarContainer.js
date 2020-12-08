import React, { Fragment } from 'react';
import {connect} from 'react-redux';

import { changeTool } from '../store/svgcanvas/actions';


import MainToolbar from './MainToolbar';
// tools data: name, image, id from json
import toolsList from '../toolsData.json';

class MainToolbarContainer extends React.Component{
  constructor(props){
    super(props);

    this.combinedProps = {...this.props, toolsList};
   
  }  

  render() {
     
    return (
      <MainToolbar {...this.combinedProps} />
    )
  }
}


const mapDispatchProps = {
  changeTool,
}

export default connect(null, mapDispatchProps)(MainToolbarContainer);