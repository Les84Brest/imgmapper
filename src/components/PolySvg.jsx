import React from 'react';
import PropTypes from 'prop-types';
import FigureControl from './FigureControl';


const PolySvg = ({ points, id }) => {

  const poinstString = points.join(', ');
  let controls = [];
  for (let i = 0; i < points.length; i +=2) {
    controls.push(
      <FigureControl x={points[i]} y={points[i+1]} key={`${id}-${i}`} />
    );
    
  }

  return (
    <g>
      <polygon points={poinstString} stroke="MediumBlue" fill="LightSkyBlue" strokeWidth="1" fillOpacity="0.45" id={id} />
      {controls}
    </g>
  );

};

PolySvg.propTypes = {
  poinst: PropTypes.string,


};


export default PolySvg;