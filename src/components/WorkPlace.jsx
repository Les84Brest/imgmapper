import React from 'react';
import MainToolbar from './MainToolbar';
import Header from './Header';
import MapImage from './MapImage';
import PropTypes from 'prop-types';


//css import
import './WorkPlace.sass';

class WorkPlace extends React.Component {

  

  // state = {
  //   currentCompany: "MTS",
  //   currentCompanyClients: this.props.companyData.MTS,
  // }

  /**Prop Types  */
  // static propTypes = {
  //   lastName: PropTypes.string.isRequired,

  // }



  toolsData = require('../toolsData.json');

  render() {
    console.log(this.toolsData);
    
   
    return (
      <div className="imgmapper__workplace">
         <MainToolbar toolsList={this.toolsData}/>  
        <div className="wopkplace__work-img">
        <Header/>
        <MapImage/>
        </div>
      </div>
    )
  }
}

export default WorkPlace;