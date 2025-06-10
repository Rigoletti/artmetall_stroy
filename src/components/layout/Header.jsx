import React from "react";
import logo from '@/assets/img/logo2.png';
import '@/assets/style/layout/Header.css';
import { Link } from "react-router-dom";

const Header = () => {
  return (
  <div className="header">
      <div className="left-links">
        <Link to="/services" className="nav-link">Услуги</Link>
        <Link to="/contact" className="nav-link">Контакты</Link>
      </div>
      
      <img src={logo} alt="Логотип" className="center-logo" />
      
      <div className="right-links">
        <Link to="/portfolio" className="nav-link">Наши работы</Link>
        <Link to="/post_project" className="nav-link">Заказать проект</Link>
      </div>
    </div>
  );
};

export default Header;