import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '@/assets/style/directions/IndustrialConstruction.module.css';

// Регистрируем плагин GSAP
gsap.registerPlugin(ScrollTrigger);

// Базовый URL API (замените на ваш реальный URL)
const API_BASE_URL = 'http://localhost:5000';

const ImageWithFallback = ({ src, alt, className, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  
  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc('/images/default-project.jpg')}
    />
  );
};

const IndustrialConstruction = () => {
  const mainImageRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const specsCardRef = useRef(null);
  const ctaCardRef = useRef(null);
  const projectsRef = useRef([]);
  const aboutSectionRef = useRef(null);
  const capabilitiesSectionRef = useRef(null);
  const gallerySectionRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Инициализация ref для карточек
  const addToCardsRef = (el, index) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current[index] = el;
    }
  };

  // Инициализация ref для проектов
  const addToProjectsRef = (el, index) => {
    if (el && !projectsRef.current.includes(el)) {
      projectsRef.current[index] = el;
    }
  };

  // Загрузка проектов
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Fetching projects from:', `${API_BASE_URL}/api/projects?category=industrial`);
        
        const response = await axios.get(`${API_BASE_URL}/api/projects?category=industrial`);
        
        console.log('Response data:', response.data);

        if (response.data && Array.isArray(response.data)) {
          if (response.data.length > 0) {
            console.log('Projects received:', response.data);
            setProjects(response.data);
          } else {
            console.log('No projects found in response');
            setProjects([]);
          }
        } else {
          console.error('Invalid projects data format:', response.data);
          setError('Неверный формат данных проектов');
          setProjects([]);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(`Не удалось загрузить проекты: ${err.message}`);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Анимации при загрузке
  useEffect(() => {
    if (isLoading) return;

    const elements = [
      headerRef.current, 
      mainImageRef.current, 
      ...cardsRef.current.filter(Boolean), 
      specsCardRef.current, 
      ctaCardRef.current,
      ...projectsRef.current.filter(Boolean),
      aboutSectionRef.current,
      capabilitiesSectionRef.current,
      gallerySectionRef.current
    ].filter(Boolean);

    gsap.set(elements, { opacity: 1, visibility: 'visible' });

    // Анимация заголовка
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out"
        }
      );
    }

    // Параллакс эффект для главного изображения
    if (mainImageRef.current) {
      gsap.to(mainImageRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: mainImageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Анимация карточек возможностей
    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.fromTo(card, 
          { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true
            }
          }
        );
      }
    });

    // Анимация боковых карточек
    if (specsCardRef.current && ctaCardRef.current) {
      gsap.fromTo([specsCardRef.current, ctaCardRef.current], 
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          delay: 0.5,
          ease: "back.out(1.2)"
        }
      );
    }

    // Анимация секций
    if (aboutSectionRef.current && capabilitiesSectionRef.current) {
      gsap.fromTo([aboutSectionRef.current, capabilitiesSectionRef.current], 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top 85%",
            once: true
          }
        }
      );
    }

    // Анимация проектов в галерее
    projectsRef.current.forEach((card, i) => {
      if (card) {
        gsap.fromTo(card, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true
            }
          }
        );
      }
    });

    // Анимация секции галереи
    if (gallerySectionRef.current) {
      gsap.fromTo(gallerySectionRef.current, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: gallerySectionRef.current,
            start: "top 85%",
            once: true
          }
        }
      );
    }

    // Эффект мерцания для CTA кнопки
    const blink = gsap.to(`.${styles.ctaButton}`, {
      boxShadow: '0 0 20px 5px rgba(0, 200, 83, 0.7)',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      blink.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoading]);

  const capabilities = [
    {
      title: "Генподряд",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 3V7M12 7H16M12 7V3M16 3L21 8M16 7L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Промышленные здания",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 8H7V18H9V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 8H11V18H13V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 8H15V18H17V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 3H5C3.89543 3 3 3.89543 3 5V21H21V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Технологические линии",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16V12L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 8H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 16H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 8H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 16H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Инженерные сети",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 18L6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Специальные покрытия",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.93 4.93L8.24 8.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.76 15.76L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.93 19.07L8.24 15.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.76 8.24L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Пусконаладка",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.93 4.93L8.24 8.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.76 15.76L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.93 19.07L8.24 15.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.76 8.24L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <div className={styles.container}>
      {/* Декоративные элементы */}
      <div className={styles.decorCircle1}></div>
      <div className={styles.decorCircle2}></div>
      <div className={styles.decorLine1}></div>
      
      <Container>
        {/* Шапка */}
        <header className={styles.header} ref={headerRef}>
          <Link to="/" className={styles.backLink}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#00C853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Все направления</span>
          </Link>
          <div className={styles.headerContent}>
            <h1>
              <span className={styles.titleWord1}>Промышленное</span>
              <span className={styles.titleWord2}>строительство</span>
            </h1>
            <p>Комплексные решения для промышленных предприятий и производств</p>
          </div>
        </header>

        {/* Основное изображение с параллаксом */}
        <div className={styles.mainImageContainer} ref={mainImageRef}>
          <ImageWithFallback
            src="https://www.tatar-inform.ru/resize/shd/images/uploads/news/2021/8/20/7979b884bd90516525bee6e901c46abd.jpg"
            alt="Промышленное строительство"
            className={styles.mainImage}
          />
          <div className={styles.imageOverlay}>
            <div className={styles.scrollPrompt}>
              <span>Листайте вниз</span>
              <div className={styles.mouseIcon}>
                <div className={styles.mouseWheel}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <Row className={styles.contentRow}>
          <Col lg={8} className={styles.mainContent}>
            <section className={styles.aboutSection} ref={aboutSectionRef}>
              <h2>
                <span>О направлении</span>
                <svg width="60" height="8" viewBox="0 0 60 8" fill="none">
                  <path d="M0 4H60" stroke="currentColor" strokeWidth="2"/>
                  <path d="M60 4L56 8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M60 4L56 0" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </h2>
              <p>
                Полный цикл строительства промышленных объектов - от проектирования до ввода в эксплуатацию. 
                Наш опыт включает металлургические, химические, нефтеперерабатывающие предприятия 
                и другие промышленные комплексы с соблюдением всех технологических требований.
              </p>
              <div className={styles.signature}>
                <span>ARTMETALL STROY</span>
              </div>
            </section>

            <section className={styles.capabilitiesSection} ref={capabilitiesSectionRef}>
              <h2>
                <span>Наши возможности</span>
                <svg width="60" height="8" viewBox="0 0 60 8" fill="none">
                  <path d="M0 4H60" stroke="currentColor" strokeWidth="2"/>
                  <path d="M60 4L56 8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M60 4L56 0" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </h2>
              <div className={styles.capabilitiesGrid}>
                {capabilities.map((capability, index) => (
                  <div 
                    key={index} 
                    className={styles.capabilityCard}
                    ref={el => addToCardsRef(el, index)}
                  >
                    <div className={styles.capabilityIcon}>
                      {capability.icon}
                    </div>
                    <h3>{capability.title}</h3>
                    <div className={styles.capabilityLine}></div>
                  </div>
                ))}
              </div>
            </section>
          </Col>

          <Col lg={4} className={styles.sidebar}>
            <div className={styles.specsCard} ref={specsCardRef}>
              <h3>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#00C853" strokeWidth="2"/>
                  <path d="M12 8V12L15 15" stroke="#00C853" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Технические данные</span>
              </h3>
              <ul>
                {[
                  ["Объекты", "Заводы, цеха, склады"],
                  ["Сроки", "6-36 месяцев"],
                  ["Площади", "до 100 000 м²"],
                  ["Технологии", "Современные решения"],
                  ["Гарантия", "10-30 лет"]
                ].map(([title, value], i) => (
                  <li key={i}>
                    <span>{title}</span>
                    <strong>{value}</strong>
                  </li>
                ))}
              </ul>
              <div className={styles.specsDecor}></div>
            </div>

            <div className={styles.ctaCard} ref={ctaCardRef}>
              <div className={styles.ctaContent}>
                <h3>Заинтересовало?</h3>
                <p>Обсудим ваш проект и подготовим предложение</p>
                <button className={styles.ctaButton}>
                  <span>Оставить заявку</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 0V16M16 8L0 8" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
              <div className={styles.ctaDecor}></div>
            </div>
          </Col>
        </Row>

        {/* Галерея работ */}
        <section className={styles.gallerySection} ref={gallerySectionRef}>
          <h2>
            <span>Наши работы</span>
            <svg width="60" height="8" viewBox="0 0 60 8" fill="none">
              <path d="M0 4H60" stroke="currentColor" strokeWidth="2"/>
              <path d="M60 4L56 8" stroke="currentColor" strokeWidth="2"/>
              <path d="M60 4L56 0" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </h2>
        
          {isLoading ? (
            <div className={styles.loading}>Загрузка проектов...</div>
          ) : error ? (
            <div className={styles.error}>
              Ошибка: {error}
              <button 
                onClick={() => window.location.reload()}
                className={styles.retryButton}
              >
                Попробовать снова
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className={styles.empty}>
              Нет добавленных проектов
              <p>Попробуйте обновить страницу или проверьте подключение к серверу</p>
            </div>
          ) : (
            <div className={styles.galleryGrid}>
              {projects.map((project, index) => (
                <article 
                  key={project._id || index}
                  className={styles.projectCard}
                  ref={el => addToProjectsRef(el, index)}
                >
                  <div className={styles.projectImage}>
                    <ImageWithFallback
                      src={`${API_BASE_URL}/api/project-images/${project.image}`}
                      alt={project.title}
                    />
                    <div className={styles.projectOverlay}>
                      <div className={styles.projectDetails}>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div className={styles.projectMeta}>
                          <span className={styles.projectYear}>{project.year}</span>
                          <span className={styles.projectMaterials}>{project.materials}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </Container>
    </div>
  );
};

export default IndustrialConstruction;