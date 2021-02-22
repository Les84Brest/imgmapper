import React from 'react';
import MainToolbar from './MainToolbar';
import Header from './Header';
//css import
import './WorkPlace.sass';

import MainToolbarContainer from './MainToolbarContainer';
import MapImageContainer from './MapImageContainer';
import HeaderContainer from './HeaderContainer';

const WorkPlace = () => {


  // const toolsData = require('../toolsData.json');


  return (
    <div className="imgmapper__workplace">
      <MainToolbarContainer />
      <div className="wopkplace__work-img">
        <HeaderContainer />
        <MapImageContainer />
      </div>
    </div>
  )

}

export default WorkPlace;