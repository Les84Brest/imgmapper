import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Select.sass';



class Select extends PureComponent {

  constructor(props) {
    super(props);


    this.state = {
      value: props.selectedItem,
      options: props.options,
      
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.selectedItem !== state.selectedItem) {
      return {
        ...state, 
        value: props.selectedItem,
      }
    }
    return null;
  }


  /**Prop Types  */
  static propTypes = {
    options: PropTypes.array.isRequired,
    cbSelectedItem: PropTypes.func,
    selectedItem: PropTypes.string,
  }

  handleChange = event => {
    this.props.cbSelectedItem(event.target.value);
    this.setState({ value: event.target.value });
  }

  render() {
    // строим массив вариантов
    
    const optionsList = this.state.options.map((item, index) => {
      const key = Object.keys(item);
     
          return (<option key={index} value={key[0]} >{item[key[0]]}</option>);
     
    });


    return (
      <select value={this.state.value} onChange={this.handleChange}>
        {optionsList}
      </select>
    )
  }
}

export default Select;

// const Select = ({ options, cbSelectedItem, selectedItem }) => {
//   // TODO список выезжает вниз. Это пведедение по умолчанию
//   // Нужно чтобы он работал от ситуациии, либо вниз Либо вверх

//   // обрабатываем список options в зависимости от наличия выделенного фрагмента
//   useEffect(() => {

//     optionsData.forEach(item => {
//       if (item.selected === true) {
//         const key = Object.keys(item);
//         setSelectedOption(item[key[0]]);
//         //cbSelectedItem(key[0]);
//       }
//     });

//   });
//   useEffect(() => {
//     console.log('use зависимость');
//     if (selectedItem){
//       optionsData.forEach(item => {
//         const key = Object.keys(item)[0];
//         if (key !== selectedItem){
//           item.selected = false;
//         }else{
//           item.selected = true;
//           setSelectedOption(item[key]);
//         }
//       });
//     }
//   }, [selectedItem]);
//   const [optionsData, setOptionsData] = useState(options);
//   const [showList, setShowList] = useState(false);
//   const [selectedOption, setSelectedOption] = useState();


//   const handleOptionClick = (event) => {
//     let newOptionsData = optionsData.map(item => {
//       if (item.selected === true) {
//         item.selected = false;
//       }
//       let key = Object.keys(item)[0];
//       if (key === event.target.dataset.value) {
//         item.selected = true;
//       }
//       return item
//     });

//     setOptionsData(newOptionsData);

//     handleShowList();
//     // отправляем в колбэк
//     cbSelectedItem(event.target.dataset.value);
//   }

//   const handleShowList = () => {
//     setShowList(!showList);
//   };

//   const optionsList = [];

//   optionsData.forEach((item, index) => {
//     const key = Object.keys(item);

//     optionsList.push(
//       <li className="select__option" onClick={handleOptionClick} data-value={key[0]} key={index} >{item[key[0]]}</li>)
//   });


//   return (
//     <div className="select" onClick={handleShowList}>
//       <div className="select__checked" >{selectedOption}</div>
//       {showList && <ul className="select__dropdown">
//         {optionsList}
//       </ul>}
//     </div>
//   );
// };

// Select.propTypes = {
//   options: PropTypes.array.isRequired,
//   cbSelectedItem: PropTypes.func,
//   selectedItem: PropTypes.string,
// };

// Select.defaultProps = {
//   options: {},
//   cbSelectedItem: () => { },
//   selectedItem: null,
// };
