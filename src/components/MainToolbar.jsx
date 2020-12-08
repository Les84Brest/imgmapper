import React from 'react';
import Image from './controls/Image';

import ToolIcon from './ToolIcon';
import PropTypes from 'prop-types';


//css import
import './MainToolbar.sass';
import { computeHeadingLevel } from '@testing-library/react';
import { changeTool } from '../store/svgcanvas/actions';

class MainToolbar extends React.PureComponent {

  
  constructor(props) {
    super(props);
    // tools icons list


    this.state = {
      toolsInfo: props.toolsList,
      currentTool: '',
    };

  }
  

  cbSelectTool = (id) => {
    
  let activeIndex = this.state.toolsInfo.findIndex(item =>  item.toolId == id );

  let activeTool = {... this.state.toolsInfo[activeIndex]};
  activeTool.active = true;
  let tools = this.state.toolsInfo.map(item => {
    item.active = false;
    return item;
  });

  tools.splice(activeIndex, 1 ,activeTool );
  this.props.changeTool(activeTool.name);
  this.setState({ toolsInfo: tools, currentTool: activeTool.name });
    


  }

  /**Prop Types  */
  static propTypes = {
    toolsList: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        toolId: PropTypes.number,
        imagePath: PropTypes.string,
      })
    ),

    changeTool: PropTypes.func,

  }




  render() {
    
    let toolList = [];
    this.state.toolsInfo.forEach(item => {
     
      toolList.push(
        <ToolIcon
          key={item.toolId}
          onClick={this.cbSelectTool}
          toolName={item.name}
          id={item.toolId}
          image={item.imagePath}
          active={item.active}
        />
      );
    })

console.log('ToolBar render');

    return (
      <div className="workplace__toolbar toolbar">
        <div className="app__logo">
          <a href="https://github.com/Les84Brest/imgmapper" target="blank"><Image src="../images/imgmapperLogo.png" /></a>
        </div>
        <nav className="tools">
          <ul className="tools-items">
            {toolList}
          </ul>
        </nav>

      </div>
    )
  }
}

export default MainToolbar; 