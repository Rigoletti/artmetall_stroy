import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import logo from '@/assets/img/logo2.png';
import styles from '@/assets/style/home/HomeSection.module.css';
import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';

const Header = ({ controls, darkMode = true }) => {
  const { user, loading, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <motion.header 
      className={`${styles.header} ${darkMode ? styles.dark : ''}`}
      initial="hidden"
      animate={controls}
      variants={navVariants}
    >
      <div className={styles.logoWrapper}>
        <img 
          src={logo} 
          alt="ArtMetallStroy" 
          className={styles.logo}
        />
        <div className={styles.logoText}>АРТМЕТАЛЛ СТРОЙ</div>
      </div>

      <nav className={styles.nav}>
        <Link to="/portfolio" className={styles.navLink}>Портфолио</Link>
        <Link to="/services" className={styles.navLink}>Услуги</Link>
        <Link to="/about" className={styles.navLink}>О компании</Link>
        <Link to="/contact" className={styles.navLink}>Контакты</Link>
        
        {/* Добавляем ссылку на админ-панель для администраторов */}
        {user?.role === 'admin' && (
          <Link to="/admin" className={styles.navLink}>Админ-панель</Link>
        )}
      </nav>

      <div className={styles.auth}>
        {loading ? (
          <div className={styles.authLoader}>Загрузка...</div>
        ) : user ? (
          <div className={styles.profileMenu}>
            <button 
              className={styles.profileBtn}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {user.name}
            </button>
            
            {isMenuOpen && (
              <div className={styles.dropdownMenu}>
                <Link 
                  to="/profile" 
                  className={styles.dropdownItem}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Профиль
                </Link>
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className={styles.dropdownItem}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Админ-панель
                  </Link>
                )}
                <button 
                  className={styles.dropdownItem}
                  onClick={handleLogout}
                >
                  Выйти
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className={styles.loginBtn}>Вход</Link>
            <Link to="/register" className={styles.registerBtn}>Регистрация</Link>
          </>
        )}
      </div>
    </motion.header>
  );
};

export default Header;