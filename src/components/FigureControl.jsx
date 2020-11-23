import React, { useState, useEffect, Children, Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';


const FigureControl = (x, y, cbChangeCoords) => {

	

	return (
		<circle cx={x} cy={y}  r={5}  stroke="gray" fill="PaleGreen" stroke-width="1"  />
	);
};

FigureControl.propTypes = {
  x: PropTypes.number,
  y:PropTypes.number,
  cbChangeCoords: PropTypes.func
  
};



export default FigureControl;