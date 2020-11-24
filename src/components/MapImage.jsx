import React from 'react';

import Image from './controls/Image';
import SVGCanvasContainer from './SVGCanvasContainer';


//css import
import './MapImage.sass';


const MapImage = () => (

  <div className="imgmapper__mapimage">
    <SVGCanvasContainer/>
    <Image src="../images/workmap.jpg" />
  </div>

)



export default MapImage;