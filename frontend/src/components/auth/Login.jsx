import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import styles from '@/assets/style/auth/Auth.module.css';
import HomeButton from '@/components/home/HomeButton';
import authApi from '@/api/authApi';
import { loginSchema } from '../validation/authSchemas';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = React.useState("");

  const formik = useFormik({
    initialValues: {
      email: location.state?.email || "",
      password: "",
      rememberMe: false
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await authApi.login(values);
        navigate("/profile");
      } catch (err) {
        setFieldError('password', err.response?.data?.message || 'Неверный email или пароль');
      } finally {
        setSubmitting(false);
      }
    }
  });

  useEffect(() => {
    if (location.state?.registered) {
      setSuccessMessage("Регистрация прошла успешно! Теперь вы можете войти.");
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

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

        {formik.errors.password && formik.submitCount > 0 && (
          <div className={styles.errorMessage}>
            {formik.errors.password}
          </div>
        )}

        {successMessage && (
          <div className={styles.successMessage}>
            {successMessage}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${styles.formInput} ${formik.errors.email && formik.touched.email ? styles.inputError : ''}`}
              placeholder="your@email.com"
            />
            {formik.errors.email && formik.touched.email && (
              <div className={styles.errorText}>{formik.errors.email}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${styles.formInput} ${formik.errors.password && formik.touched.password ? styles.inputError : ''}`}
              placeholder="••••••••"
            />
            {formik.errors.password && formik.touched.password && (
              <div className={styles.errorText}>{formik.errors.password}</div>
            )}
          </div>

          <div className={styles.formOptions}>
            <label className={styles.rememberMe}>
              <input 
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
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
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
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