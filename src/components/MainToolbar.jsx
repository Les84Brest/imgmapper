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

    this.state = {
      toolsInfo: props.toolsList,
    } 

  }

  cbSelectTool = (id) => {
    
    let newToolsList = this.state.toolsInfo.slice();

    for (let i = 0; i < newToolsList.length; i++) {
     if(newToolsList[i].id === id){
       console.log('item - ', newToolsList[i]);
       console.log('match');
       break;
     }
      
    }

    // let newTools = this.state.toolsInfo.map((item) => {
      
      
    //   if(item.toolId === id){
    //     let activeTool = Object.assign({}, item);
    //     activeTool.active = true;
    //     item = activeTool;
    //     return item;
    //   }else if(item.active === true){
    //     let activeTool = Object.assign({}, item);
    //     activeTool.active = false;
    //     item = activeTool;
    //     return item;
    //   }
      

    //   return item;
    // });

    // this.setState({toolsInfo: newTools});
    
    // let activeToolIndex = this.state.toolsInfo.findIndex((val) => val.toolId === id);

    // let activeTool = Object.assign({}, this.state.toolsInfo[activeToolIndex]);

    // activeTool.active = true;

    // let newTools = this.state.toolsInfo.slice();
    // newTools.splice(activeToolIndex,1, activeTool);
    // this.set

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