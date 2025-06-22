import React from "react";
import { FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";
import styles from '@/assets/style/contact/HomeButton.module.css';

const HomeButton = () => {
  return (
<Link to="/" className={styles.link}>
      <button className={styles.button}>
        <FiHome className={styles.icon} />
        На главную
        <span className={styles.metalShine}></span>
      </button>
    </Link>
  );
};

export default HomeButton;