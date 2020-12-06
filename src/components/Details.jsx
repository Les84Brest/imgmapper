import React from 'react';



//css import
import './Details.sass';

import AreasList from './AreasList';
import AreaDetails from './AreaDetails';

class Details extends React.Component {

  

  // state = {
  //   currentCompany: "MTS",
  //   currentCompanyClients: this.props.companyData.MTS,
  // }

  /**Prop Types  */
  // static propTypes = {
  //   lastName: PropTypes.string.isRequired,

  // }

  someHandler = () => {
    //some code
  }


  render() {

    return (
      <div className="imgmapper__details">
        <AreasList />
        <AreaDetails />
      </div>
    )
  }
}

export default Details;