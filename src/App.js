import './App.sass';
import WorkPlace from './components/WorkPlace';
import Details from './components/Details';
import { createStore } from 'redux';
import rootReducer from './store/reducers';
import { Provider } from 'react-redux';

const store = createStore(rootReducer);

function App() {
  return (
    <div className="imgmapper">
      <Provider store={store}>
        {/* header toolbar area to work with image */}
        <WorkPlace />
        {/* footer of app with details of primitives */}
        <Details />
      </Provider>
    </div>
  );
}

export default App;
