import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import Image from './controls/Image';


//css import
import './ToolIcon.sass';


const ToolIcon = ({
  onClick,
  id,
  image,
  active }) => {


  const classes = ClassNames(
    'tool',
    { active },
  );
  
// настраиваем изображение в случае, если инструмент активный
  const iconImage = active ? image + '_active' : image;

  const handleOnClick = () => {
    onClick(id);
  }
    
  return (
  <li className={classes} onClick={handleOnClick} >
      <Image src={`${iconImage}.png`} />
    </li>
  )
};

ToolIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  toolName: PropTypes.string,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  active: PropTypes.bool,

};

ToolIcon.defaultProps = {
  toolName: '',
  id: null,
  imagePath: '',
  activeImagePath: '',
  active: false,
  

};

export default ToolIcon;



