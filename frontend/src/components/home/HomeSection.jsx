import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import styles from '@/assets/style/home/HomeSection.module.css';
import mainImage from '@/assets/img/main-image.jpg';
import Pop_Project from '@/components/home/pop_project';
import Header from '@/components/layout/Header';

const HomeSection = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [fullyVisible, setFullyVisible] = useState(false);
  const controls = useAnimation();
  const imageRef = useRef(null);
  const ref = useRef();
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setFullyVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.3 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 12 }
    }
  };

  return (
    <div className={styles.container} ref={ref}>
      <Header controls={controls} />

      {/* Главный контент */}
      <main className={styles.main} onMouseMove={handleMouseMove}>
        <div className={styles.content}>
          <motion.h1 
            className={styles.title}
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            {"Создаём металлические конструкции будущего".split('').map((char, i) => (
              <motion.span 
                key={i} 
                variants={letterVariants}
                style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            Инновационные решения в металлоконструкциях для бизнеса и частных клиентов
          </motion.p>

          <motion.div 
            className={styles.buttons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <Link to="/projects" className={styles.primaryBtn}>
              Наши проекты
            </Link>
            <Link to="/consultation" className={styles.secondaryBtn}>
              Бесплатная консультация
            </Link>
          </motion.div>
        </div>

        <div className={styles.imageWrapper} ref={imageRef}>
          <div className={`${styles.imageContainer} ${fullyVisible ? styles.fullyVisible : ''}`}>
            <img 
              src={mainImage} 
              alt="Металлические конструкции" 
              className={styles.mainImage} 
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
      </main>

      {/* Индикатор прокрутки */}
      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <span>Листайте вниз</span>
      </div>
      
      <Pop_Project />
    </div>
  );
};

export default HomeSection;