import { Component} from 'react';
import ReactDOM from 'react-dom';

import './Portal.sass';


class Portal extends Component {
  
  element = document.createElement('div');

  componentDidMount(){
    document.body.appendChild(this.element);
  }
  
  componentWillUnmount(){
    document.body.removeChild(this.element);
    
  }
  
 render() {
   this.element.className = 'portal';
    return ReactDOM.createPortal(this.props.children, this.element);
  }
}

export default Portal;