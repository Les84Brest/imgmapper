import React from 'react';
import MainToolbar from './MainToolbar';
import Header from './Header';
import MapImage from './MapImage';
import PropTypes from 'prop-types';


//css import
import './WorkPlace.sass';
import SVGCanvasContainer from './SVGCanvasContainer';
import MainToolbarContainer from './MainToolbarContainer';

const WorkPlace = () => {

  
  // const toolsData = require('../toolsData.json');
  

    return (
      <div className="imgmapper__workplace">
        <MainToolbarContainer />  
        <div className="wopkplace__work-img">
        <Header/>
        <MapImage/>
        </div>
      </div>
    )
  
}

export default WorkPlace;