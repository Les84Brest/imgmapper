import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Image.css';


const Image = ({src, alt, className, width, height, ...attrs}) => {

  const classes = classNames(className);
	
  if(!src){
    src = `https://via.placeholder.com/${width}x${height}`;
  }

	return (
	  <img
      src={src} 
      alt={alt}
      className={classes}
      width = {width}
      height = {height}
      {...attrs}
    />
	);
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

Image.defaultProps = {
  src: "https://via.placeholder.com/50",
  alt: 'image name',
  className: '',
  width: null,
  height: null,
};

export default Image;