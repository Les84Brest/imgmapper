import { Component } from 'react';
import { connect } from 'react-redux';
import { setMapImage, setImageSize, setMapName, setImageName } from '../store/image/actions';
import MapImage from './MapImage';


class MapImageContainer extends Component {

  constructor(props) {
    super(props);

    this.state.combinedProps = props;

  }

  state = {
    combinedProps: null,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.mapImage !== prevState.mapImage){
      const combinedProps = {... prevState.combinedProps};
      combinedProps.mapImage = nextProps.mapImage;
      return {...prevState, combinedProps};
    }
    return null;
  }

  render() {

    return (
      <MapImage {...this.state.combinedProps} />
    )
  }
}

const mapStateToProps = state => {
  return {
    mapImage: state.mapImage.mapImage,
    
  }
}
const mapDispatchProps = {
  setMapImage, setMapName, setImageSize, setImageName,
}

export default connect(mapStateToProps, mapDispatchProps)(MapImageContainer);