import React from 'react';
import PropTypes from 'prop-types';
import FigureControl from './FigureControl';


const PolySvg = ({ points, id, figureColors, }) => {

  const poinstString = points.join(', ');
  let controls = [];
  for (let i = 0; i < points.length; i +=2) {
    controls.push(
      <FigureControl figureColors={figureColors} x={points[i]} y={points[i+1]} key={`${id}-${i}`} />
    );
    
  }

  return (
    <g>
      <polygon points={poinstString} stroke={figureColors.strokeColor} fill={figureColors.fillColor} strokeWidth="1" fillOpacity="0.4" id={id} />
      {controls}
    </g>
  );

};

PolySvg.propTypes = {
  poinst: PropTypes.string,


};


export default PolySvg;