import React from 'react';
import PropTypes from 'prop-types';


const PolySvg = ({points, id}) => {

  return  <polygon points={points}  stroke="LightSeaGreen" fill="Olive" strokeWidth="1" id={`poly-${id}`} />;
  
};

PolySvg.propTypes = {
  poinst: PropTypes.string, 
  
  
};


export default PolySvg;