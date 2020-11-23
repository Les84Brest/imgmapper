import React from 'react';
import PropTypes from 'prop-types';


const CircleSvg = ({id, cx, cy, r}) => {

  return  <circle cx={cx} cy={cy}  r={r}  stroke="gray" fill="green" strokeWidth="1" id={`circle-${id}`} />;
  
};

CircleSvg.propTypes = {
  id: PropTypes.number, 
  cx: PropTypes.number, 
  cy: PropTypes.number,
  r: PropTypes.number,
  
}


export default CircleSvg;