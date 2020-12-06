import React from 'react';
import Image from './controls/Image';

import ToolIcon from './ToolIcon';
import PropTypes from 'prop-types';


//css import
import './MainToolbar.sass';
import { computeHeadingLevel } from '@testing-library/react';

class MainToolbar extends React.PureComponent {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    // tools icons list
    console.log('начало', props);
     
    

    this.state= { 
      toolsInfo: props.toolsList
    };

    // this.state = {toolsInfo : props.toolsList.map(item => {
    //   item.active = false;
    //   return item;
    // })} ;
  }

  cbSelectTool = (id) => {
    console.log('callback ', id);
    let newToolsInfo = this.state.toolsInfo.slice();
   
    newToolsInfo.forEach(item => {
      if (item.id === id) {
        item.active = true;
      }
    });
    
    this.setState({toolsInfo: newToolsInfo});

    
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

  }




  render() {

    let toolList = [];
    this.state.toolsInfo.forEach(item => {
      
      toolList.push(
        <ToolIcon
          key={item.toolId}
          onClick={this.cbSelectTool}
          toolName={item.toolName}
          id={item.toolId}
          image={item.imagePath}
          active={false}
        />
      );
    })

    

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