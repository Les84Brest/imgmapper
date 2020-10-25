import React from 'react';

import stl from './Header.module.scss';

class Header extends React.Component{

  render(){
    return(
      <div className="appHeader">
        <h1 className={stl.header}>Это небольшой заголовок моего <span>очень! Важного </span> приложения</h1>
      </div>


    );
  }
}

export default Header;