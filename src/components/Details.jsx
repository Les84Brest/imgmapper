import React from 'react';



//css import
import './Details.sass';

import AreasListContainer from './AreaListContainer';
import AreaDetailsContainer from './AreaDetailsContainer';

class Details extends React.Component {

  
  render() {

    return (
      <div className="imgmapper__details">
        <AreasListContainer />
        <AreaDetailsContainer />
      </div>
    )
  }
}

export default Details;