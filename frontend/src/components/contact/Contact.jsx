import React, { useRef } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock, FiChevronRight } from "react-icons/fi";
import { motion, useInView } from "framer-motion";
import styles from '@/assets/style/contact/Contact.module.css';
import HomeButton from '@/components/home/HomeButton';

const Contact = () => {
  const ref = useRef();
  const formRef = useRef();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });

  const contacts = [
    { 
      icon: <FiMapPin />, 
      title: "Адрес", 
      text: "г. Альметьевск, ул. Монтажная, 9, офис 2", 
      action: "Открыть карту →",
      color: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
    },
    { 
      icon: <FiPhone />, 
      title: "Телефон", 
      text: "+8 8553 38 37 88", 
      action: "Позвонить →",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    { 
      icon: <FiMail />, 
      title: "Email", 
      text: "info@artmetallstroy.ru", 
      action: "Написать →",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    { 
      icon: <FiClock />, 
      title: "Часы работы", 
      text: "Пн–Пт: 9:00–18:00", 
      subtext: "Сб–Вс: выходной",
      color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
  ];

  // Анимация для букв заголовка
  const titleText = "Контакты".split("");
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <HomeButton />
      </div>
      
      <section className={styles.hero}>
        <div className={styles.particles} id="particles-js"></div>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
          >
            {titleText.map((char, index) => (
              <motion.span 
                key={index} 
                custom={index}
                variants={titleVariants}
                className={char === " " ? styles.space : ""}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className={styles.subtitle}
          >
            Металл, который вдохновляет
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
            className={styles.scrollIndicator}
          >
            <div className={styles.mouse}>
              <div className={styles.scroller}></div>
            </div>
            <span>Прокрутите вниз</span>
          </motion.div>
        </motion.div>
      </section>

      <div className={styles.grid} ref={ref}>
        {contacts.map((item, index) => (
          <motion.div
            key={index}
            className={styles.card}
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              type: "spring",
              damping: 10,
              stiffness: 100,
              delay: index * 0.15
            }}
            whileHover={{ 
              y: -10,
              boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
            }}
            style={{ background: item.color }}
          >
            <div className={styles.cardIcon}>{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            {item.subtext && <p className={styles.subtext}>{item.subtext}</p>}
            {item.action && (
              <motion.button 
                className={styles.actionButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.action} <FiChevronRight />
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>

      <div className={styles.contentWrapper}>
        <motion.div 
          className={styles.formContainer}
          ref={formRef}
          initial={{ opacity: 0, x: -100 }}
          animate={isFormInView ? { opacity: 1, x: 0 } : {}}
          transition={{ type: "spring", stiffness: 60 }}
        >
          <h2>
            <span className={styles.highlight}>Остались вопросы</span> задайте нам!
          </h2>
          <p className={styles.formDescription}>
            Расскажите нам о ваших вопросах, и мы свяжемся с вами в течение часа
          </p>
          <form>
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                placeholder=" " 
                className={styles.formInput}
              />
              <label className={styles.formLabel}>Ваше имя</label>
            </div>
            <div className={styles.inputGroup}>
              <input 
                type="tel" 
                placeholder=" " 
                className={styles.formInput}
              />
              <label className={styles.formLabel}>Телефон</label>
            </div>
            <div className={styles.inputGroup}>
              <textarea 
                placeholder=" " 
                className={styles.formTextarea}
              ></textarea>
              <label className={styles.formLabel}>Опишите ваш вопрос</label>
            </div>
            <motion.button 
              type="submit" 
              className={styles.metalButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Отправить</span>
              <div className={styles.arrowWrapper}>
                <div className={styles.arrow}></div>
              </div>
            </motion.button>
          </form>
        </motion.div>

        <motion.div 
          className={styles.mapWrapper}
          initial={{ opacity: 0, x: 100 }}
          animate={isFormInView ? { opacity: 1, x: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, delay: 0.2 }}
        >
          <div className={styles.mapOverlay}></div>
          <iframe
            title="Карта"
            src="https://yandex.ru/map-widget/v1/?ll=52.315785,54.901944&z=15&pt=52.315785,54.901944,comma"
            allowFullScreen
          ></iframe>
          <div className={styles.mapPin}>
            <div className={styles.pinPulse}></div>
            <div className={styles.pinIcon}><FiMapPin /></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;