import { Component } from 'react';
import { connect } from 'react-redux';
import Header from "./Header";


class HeaderContainer extends Component {

  constructor(props) {
    super(props);

    this.state.combinedProps = props;

  }

  state = {
    combinedProps: null,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps !== prevState.combinedProps){
     
      return {...prevState, combinedProps: nextProps};
    }
    return null;
  }

  render() {

    return (
      <Header {...this.state.combinedProps} />
    )
  }
}

const mapStateToProps = state => {
  return {
    mapName: state.mapImage.mapName,
    figuresList: state.svgCanvas.figuresList,
    imageName: state.mapImage.imageName,
  }
}
const mapDispatchProps = {
  
}

export default connect(mapStateToProps, mapDispatchProps)(HeaderContainer);