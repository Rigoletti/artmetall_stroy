import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import styles from '@/assets/style/auth/Auth.module.css';
import HomeButton from '@/components/home/HomeButton';
import authApi from '@/api/authApi';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (formData.password !== formData.confirmPassword) {
    setError("Пароли не совпадают");
    return;
  }

  setIsSubmitting(true);
  setError("");

  try {
    await authApi.register(formData);
    // После успешной регистрации перенаправляем на страницу входа
    navigate("/login", { 
      state: { 
        registered: true,
        email: formData.email // Передаем email для удобства
      } 
    });
  } catch (err) {
    setError(err.response?.data?.message || "Ошибка регистрации");
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
            <span className={styles.titleGradient}>Регистрация аккаунта</span>
          </h1>
          <p className={styles.cardSubtitle}>
            Создайте учетную запись для доступа к дополнительным возможностям
          </p>
        </div>

        {/* Блок для отображения ошибок */}
    {error && (
  <div className={styles.errorMessage}>
    {error}
  </div>
)}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.formInput}
              placeholder="Ваше имя"
            />
          </div>

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
              minLength="6"
              className={styles.formInput}
              placeholder="••••••••"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Подтвердите пароль</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
              className={styles.formInput}
              placeholder="••••••••"
            />
          </div>

          <div className={styles.formAgreement}>
            <label className={styles.agreementLabel}>
              <input type="checkbox" required />
              <span>Я согласен с <Link to="/terms" className={styles.agreementLink}>условиями использования</Link></span>
            </label>
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
              "Зарегистрироваться"
            )}
          </motion.button>

          <div className={styles.authRedirect}>
            Уже есть аккаунт? <Link to="/login" className={styles.redirectLink}>
              Войдите
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;