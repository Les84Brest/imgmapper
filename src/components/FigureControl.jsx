import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';



const FigureControl = ({x, y, figureColors, id, cbChangeCoords, visible}) => {

  

	return (
   
      <circle cx={x} cy={y}  r={4}  stroke={figureColors.markerStrokeColor} fill={figureColors.markerFillColor} strokeWidth=".5" data-area-id={id} />
    
	);
};

FigureControl.propTypes = {
  x: PropTypes.number,
  y:PropTypes.number,
  cbChangeCoords: PropTypes.func,
  visible: PropTypes.bool,
  
};

FigureControl.defaultProps = {
  visible: false,
}

export default FigureControl;