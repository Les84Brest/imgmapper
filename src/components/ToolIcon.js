import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import Image from './controls/Image';


//css import
import './ToolIcon.sass';


const ToolIcon = ({
  onClick,
  toolName,
  id,
  image,
  active }) => {


  const classes = ClassNames(
    'tool',
    { active },
  );

    console.log(id);
  return (
  <li className={classes} onClick={() => { onClick(id) }} >
      <Image src={`${image}.png`} />
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



