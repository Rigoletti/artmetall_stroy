import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import styles from '@/assets/style/auth/Auth.module.css';
import HomeButton from '@/components/home/HomeButton';
import authApi from '@/api/authApi';
import { registerSchema } from '../validation/authSchemas';

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await authApi.register(values);
        navigate("/login", { 
          state: { 
            registered: true,
            email: values.email
          } 
        });
      } catch (err) {
        setFieldError('email', err.response?.data?.message || 'Ошибка регистрации');
      } finally {
        setSubmitting(false);
      }
    }
  });

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

        {formik.errors.email && formik.submitCount > 0 && (
          <div className={styles.errorMessage}>
            {formik.errors.email}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${styles.formInput} ${formik.errors.name && formik.touched.name ? styles.inputError : ''}`}
              placeholder="Ваше имя"
            />
            {formik.errors.name && formik.touched.name && (
              <div className={styles.errorText}>{formik.errors.name}</div>
            )}
          </div>

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

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Подтвердите пароль</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${styles.formInput} ${formik.errors.confirmPassword && formik.touched.confirmPassword ? styles.inputError : ''}`}
              placeholder="••••••••"
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
              <div className={styles.errorText}>{formik.errors.confirmPassword}</div>
            )}
          </div>

          <div className={styles.formAgreement}>
            <label className={styles.agreementLabel}>
              <input 
                type="checkbox" 
                id="agreeTerms"
                name="agreeTerms"
                checked={formik.values.agreeTerms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span>Я согласен с <Link to="/terms" className={styles.agreementLink}>условиями использования</Link></span>
            </label>
            {formik.errors.agreeTerms && formik.touched.agreeTerms && (
              <div className={styles.errorText}>{formik.errors.agreeTerms}</div>
            )}
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