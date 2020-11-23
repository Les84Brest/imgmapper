import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';



class Portal extends Component {
  
  element = document.createElement('div');

  componentDidMount(){
    document.body.appendChild(this.element);
  }
  
  componentWillUnmount(){
    document.body.removeChild(this.element);
    
  }
  
 render() {
    return ReactDOM.createPortal(this.props.children, this.element);
  }
}

export default Portal;