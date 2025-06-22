import React from "react";
import { motion } from "framer-motion";
import { FaHammer, FaShieldAlt, FaPaintRoller, FaWarehouse, FaLightbulb, FaArrowRight } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import styles from '@/assets/style/services/Services.module.css';
import HomeButton from '@/components/home/HomeButton';
import { Link } from "react-router-dom";


const services = [
  {
    icon: <FaHammer />,
    title: "Металлоконструкции",
    description: "Производство несущих металлоконструкций любой сложности",
    items: ["Каркасы зданий", "Фермы", "Опоры", "Платформы"],
    color: "linear-gradient(135deg, #ffb347 0%, #ffcc33 100%)"
  },
  {
    icon: <FaShieldAlt />,
    title: "Ограждения",
    description: "Эстетичные и надежные решения для безопасности",
    items: ["Заборы", "Перила", "Ворота", "Решетки"],
    color: "linear-gradient(135deg, #4e73df 0%, #224abe 100%)"
  },
  {
    icon: <FaPaintRoller />,
    title: "Художественная ковка",
    description: "Эксклюзивные изделия ручной работы",
    items: ["Лестницы", "Балконы", "Каминные наборы", "Мебель"],
    color: "linear-gradient(135deg, #9b51e0 0%, #6a3093 100%)"
  },
  {
    icon: <FaWarehouse />,
    title: "Промышленные решения",
    description: "Металлоизделия для производств",
    items: ["Стеллажи", "Конвейеры", "Емкости", "Кожухи"],
    color: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)"
  },
  {
    icon: <FaLightbulb />,
    title: "Арт-объекты",
    description: "Дизайнерские металлические конструкции",
    items: ["Скульптуры", "Вывески", "Инсталляции", "Арт-объекты"],
    color: "linear-gradient(135deg, #ff6b6b 0%, #ee5253 100%)"
  }
];

const Services = () => {
  return (
    <div className={styles.container}>
      <div className={styles.homeButtonContainer}>
        <HomeButton />
      </div>

      {/* Герой-секция */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}></div>
        
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className={styles.heroBadge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <FaHammer className={styles.badgeIcon} />
            <span>Профессиональная металлообработка</span>
          </motion.div>
          
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Изготовление <span className={styles.textGradient}>металлоконструкций</span> любой сложности
          </motion.h1>
          
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            От проектирования до монтажа с гарантией качества. Работаем с 2010 года.
          </motion.p>
          
          <motion.div
            className={styles.heroButtons}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <motion.button
              className={styles.primaryButton}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 30px rgba(255, 179, 71, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Бесплатная консультация
              <div className={styles.buttonHoverEffect}></div>
            </motion.button>
            <motion.button
              className={styles.secondaryButton}
              whileHover={{ 
                y: -5,
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowRight className={styles.buttonIcon} />
             
    <span className={styles.linkPortfolio}> <Link to="/portfolio">Смотреть работы</Link></span>
            </motion.button>
          </motion.div>
          
          <motion.div 
            className={styles.heroStats}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <div className={styles.statItem}>
              <div className={styles.statNumber}>15+</div>
              <div className={styles.statLabel}>лет опыта</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>120+</div>
              <div className={styles.statLabel}>проектов</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>поддержка</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Основной контент */}
      <div className={styles.mainContent}>
        {/* Заголовок секции */}
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Наши <span className={styles.textGradient}>услуги</span>
          </motion.h2>
          <motion.p 
            className={styles.sectionDescription}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Полный спектр услуг по металлообработке и созданию металлоконструкций
          </motion.p>
        </motion.div>

        {/* Список услуг */}
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <motion.div 
              className={styles.serviceCard}
              key={index}
              style={{ "--accent-gradient": service.color }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
              }}
            >
              <div className={styles.serviceIconWrapper}>
                <div className={styles.serviceIconBg}></div>
                <div className={styles.serviceIcon}>{service.icon}</div>
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              
              <ul className={styles.serviceItems}>
                {service.items.map((item, i) => (
                  <motion.li 
                    key={i} 
                    className={styles.serviceItem}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <FiCheckCircle className={styles.itemIcon} />
                    {item}
                  </motion.li>
                ))}
              </ul>

              <motion.button 
                className={styles.serviceButton}
                whileHover={{ 
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
                }}
              >
                Подробнее <FaArrowRight className={styles.buttonArrow} />
              </motion.button>
              
              <div className={styles.cardHoverEffect}></div>
            </motion.div>
          ))}
        </div>

        {/* CTA секция */}
        <motion.div 
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className={styles.ctaTitle}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Готовы обсудить <span className={styles.textGradient}>ваш проект</span>?
          </motion.h2>
          <motion.p 
            className={styles.ctaDescription}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Оставьте заявку и наш специалист свяжется с вами для консультации
          </motion.p>
          <div className={styles.ctaButtons}>
            <motion.button
              className={`${styles.ctaButton} ${styles.primary}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 15px 30px rgba(255, 179, 71, 0.6)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Оставить заявку
              <span className={styles.buttonHoverEffect}></span>
            </motion.button>
            <motion.button
              className={`${styles.ctaButton} ${styles.secondary}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Заказать звонок
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;