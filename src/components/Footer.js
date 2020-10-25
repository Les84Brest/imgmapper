import React from 'react';

import  './Footer.sass';

const Footer = () => {

    return(
      <footer className="footer section">
        <nav>
          <ul className="footer__navigation-items">
            <li className="footer__navigation-item">
              <a href="#">Портфолио</a>
            </li>
            <li className="footer__navigation-item">
              <a href="#">Контакты</a>
            </li>
            <li className="footer__navigation-item">
              <a href="#">Визиты</a>
            </li>
            <li className="footer__navigation-item">
              <a href="#">О нас</a>
            </li>
          </ul>
        </nav>
      </footer>


    );
 
}

export default Footer;