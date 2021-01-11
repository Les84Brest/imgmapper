import React from 'react';

import Image from './controls/Image';
import SVGCanvasContainer from './SVGCanvasContainer';


//css import
import './MapImage.sass';


const MapImage = () => {

  const mapImagePath = "../images/workmap.jpg";
  const imgStyle = {
    minWidth: '986px',
    minHeight: '114px',
    display: 'block'
  }

  return (
    <div className="imgmapper__mapimage">
      <SVGCanvasContainer />
      <img src={mapImagePath} style={imgStyle} />
    </div>
  )
}



export default MapImage;