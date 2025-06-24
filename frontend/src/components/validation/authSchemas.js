import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  name: yup.string()
    .required('Имя обязательно')
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя должно быть короче 50 символов'),
  email: yup.string()
    .required('Email обязателен')
    .email('Введите корректный email'),
  password: yup.string()
    .required('Пароль обязателен')
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру'
    ),
  confirmPassword: yup.string()
    .required('Подтверждение пароля обязательно')
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
  agreeTerms: yup.boolean()
    .oneOf([true], 'Вы должны принять условия использования')
});

export const loginSchema = yup.object().shape({
  email: yup.string()
    .required('Email обязателен')
    .email('Введите корректный email'),
  password: yup.string()
    .required('Пароль обязателен'),
  rememberMe: yup.boolean()
});