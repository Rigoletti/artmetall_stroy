import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import Header from '@/components/layout/Header';
import Pop_Project from '@/components/home/pop_project';
import styles from '@/assets/style/home/HomeSection.module.css';
import mainImage from '@/assets/img/main-image.jpg';

const HomeSection = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [fullyVisible, setFullyVisible] = useState(false);
  const imageRef = useRef(null);
  const controls = useAnimation();
  const ref = useRef();
  const isInView = useInView(ref, { once: true });

  // Анимация появления
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Эффект линзы
  const handleMouseMove = (e) => {
    if (imageRef.current && !fullyVisible) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        setPosition({ x, y });
      }
    }
  };

  // Автоматическое раскрытие изображения
  useEffect(() => {
    const timer = setTimeout(() => {
      setFullyVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Анимация букв
  const titleText = "ArtMetallStroy".split("");
  const subtitleText = "Создаем уникальные пространства, отражающие ваш стиль".split("");

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5
      }
    })
  };

  return (
    <div className={styles.homePage}>
      <section 
        className={styles.heroSection}
        onMouseMove={handleMouseMove}
        ref={ref}
      >
        <div className={styles.particlesBg} id="particles-js"></div>
        
        <div className={styles.contentGrid}>
          <motion.div 
            className={styles.textContent}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
          >
            <motion.h1 className={styles.mainTitle}>
              {titleText.map((char, index) => (
                <motion.span 
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  className={char === " " ? styles.space : ""}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.p className={styles.subtitle}>
              {subtitleText.map((char, index) => (
                <motion.span 
                  key={index}
                  custom={index + titleText.length}
                  variants={letterVariants}
                  className={char === " " ? styles.space : ""}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
            
            <motion.div 
              className={styles.buttonGroup}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Link to="/portfolio" className={styles.glowButton}>
                <span>Портфолио</span>
                <div className={styles.glow}></div>
              </Link>
              <Link to="/services" className={styles.glowButton}>
                <span>Услуги</span>
                <div className={styles.glow}></div>
              </Link>
              <Link to="/contact" className={styles.glowButton}>
                <span>Контакты</span>
                <div className={styles.glow}></div>
              </Link>
                <Link to="/post_project" className={styles.glowButton}>
                <span>Заказать проект</span>
                <div className={styles.glow}></div>
              </Link>
            </motion.div>
          </motion.div>
          
          <div className={styles.imageContainer} ref={imageRef}>
            <div className={`${styles.imageWrapper} ${fullyVisible ? styles.fullyVisible : ''}`}>
              <img 
                src={mainImage} 
                alt="Металлические конструкции" 
                className={styles.blurredImage} 
              />
              
              {!fullyVisible && (
                <div 
                  className={styles.lensEffect}
                  style={{
                    clipPath: `circle(150px at ${position.x}px ${position.y}px)`,
                    WebkitClipPath: `circle(150px at ${position.x}px ${position.y}px)`,
                  }}
                >
                  <img 
                    src={mainImage} 
                    alt="Металлические конструкции" 
                    className={styles.clearImage} 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className={styles.mouse}>
            <div className={styles.scroller}></div>
          </div>
          <span>Прокрутите вниз</span>
        </motion.div>
      </section>
      
      <Pop_Project />
    </div>
  );
};

export default HomeSection;