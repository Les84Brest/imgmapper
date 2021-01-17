import { Component } from 'react';
import {connect} from 'react-redux';
import {setMapImage } from '../store/image/actions';
import MapImage from './MapImage';


class MapImageContainer extends Component{
  
  constructor(props){
    super(props);

    this.combinedProps = {...this.props};
   
  }  


  render() {
 
   
    return (
      <MapImage {...this.combinedProps} />
    )
  }
}

const mapStateToProps = state => {
  return {
    mapImage: state.mapImage.mapImage,
    
  }
}
const mapDispatchProps = {
  setMapImage,
}

export default connect(mapStateToProps, mapDispatchProps)(MapImageContainer);