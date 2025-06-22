import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from '@/assets/style/auth/Auth.module.css';
import HomeButton from '@/components/home/HomeButton';
import authApi from '@/api/authApi';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (location.state?.registered) {
      setSuccessMessage("Регистрация прошла успешно! Теперь вы можете войти.");
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      await authApi.login(formData);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка входа. Проверьте email и пароль.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.homeButtonWrapper}>
        <HomeButton />
      </div>
      
      <div className={styles.authCard}>
        <div className={styles.cardHeader}>
          <h1 className={styles.cardTitle}>
            <span className={styles.titleGradient}>Вход в систему</span>
          </h1>
          <p className={styles.cardSubtitle}>
            Введите свои данные для доступа к личному кабинету
          </p>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {successMessage && (
          <div className={styles.successMessage}>
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.formInput}
              placeholder="your@email.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.formInput}
              placeholder="••••••••"
            />
          </div>

          <div className={styles.formOptions}>
            <label className={styles.rememberMe}>
              <input type="checkbox" />
              <span>Запомнить меня</span>
            </label>
            <Link to="/forgot-password" className={styles.forgotPassword}>
              Забыли пароль?
            </Link>
          </div>

          <motion.button
            type="submit"
            className={styles.submitButton}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className={styles.buttonLoader}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : (
              "Войти"
            )}
          </motion.button>

          <div className={styles.authRedirect}>
            Нет аккаунта? <Link to="/register" className={styles.redirectLink}>
              Зарегистрируйтесь
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;