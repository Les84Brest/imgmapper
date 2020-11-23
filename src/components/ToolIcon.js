import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Image from './controls/Image';


//css import
import './ToolIcon.sass';

class ToolIcon extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = { 
      toolName: props.toolName,
      id: props.id,
      imagePath: props.image + '.png',
      activeImagePath: props.image + '_active.png',
      onClick: props.onClick,
      active: props.active,
    }
    
  }
  componentDidMount(){
    this.classNames = new classNames(
      'tool',
      {active: this.props.active}
    );
    
  }

  // формируем список классов
  classNames = '';

  state = {
    toolName: '',
    id: null,
    imagePath: '',
    activeImagePath: '',
    active: false,
    onClick: () => {},
  }

  /**Prop Types  */
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    toolName: PropTypes.string,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    active: PropTypes.bool,
  }

  


  render() {

    return (
     <li className="tool" onClick={()=>{this.props.onClick(this.state.id)}}>
       <Image src={this.state.imagePath} />
     </li>
    )
  }
}

export default ToolIcon;