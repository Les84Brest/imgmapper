import React, {Children, Component} from "react";
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import "./Icon.css";



const Icon = ({name, className, onClick, size, disabled, color, ...atrs}) => {
  
  const classes = ClassNames(
    'icon',
    `icon-${name}`,
    className,
    {pointer: onClick},
    {disabled}
  );

  let elemStyle = {};
  elemStyle['fontSize'] = size ? ` ${size}rem` : null;
  elemStyle['color'] = color ? color : null;
  
  
  return(
    <i
      {...atrs}
      className={classes}
      onClick={disabled ? null : onClick}
      style={elemStyle}
    />)
}

Icon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string, 
  onClick: PropTypes.func,
  size: PropTypes.number,
  disabled: PropTypes.bool,
  color: PropTypes.string,
}

Icon.defaultProps = {
  name: '',
  className: '', 
  onClick: null,
  size: null,
  disabled: false,
  color: null,
}

export default Icon;
