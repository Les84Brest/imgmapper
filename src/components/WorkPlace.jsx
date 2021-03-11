import React from 'react';

//css import
import './WorkPlace.sass';

import MainToolbarContainer from './MainToolbarContainer';
import MapImageContainer from './MapImageContainer';
import HeaderContainer from './HeaderContainer';

const WorkPlace = () => {


  // const toolsData = require('../toolsData.json');

  window.onbeforeunload = () => {
    return 'Refreshing the page will result in data loss. Proceed?';
  }
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