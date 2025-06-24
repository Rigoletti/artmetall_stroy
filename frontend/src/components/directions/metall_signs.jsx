import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import styles from '@/assets/style/directions/MetalSigns.module.css';

// Регистрируем плагин GSAP
gsap.registerPlugin(ScrollTrigger);

const MetalSigns = () => {
  const mainImageRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const specsCardRef = useRef(null);
  const ctaCardRef = useRef(null);
  const projectsRef = useRef([]);
  const aboutSectionRef = useRef(null);
  const capabilitiesSectionRef = useRef(null);
  const gallerySectionRef = useRef(null);

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

  // Анимации при загрузке
  useEffect(() => {
    // Устанавливаем начальное состояние для всех анимируемых элементов
    gsap.set([
      headerRef.current, 
      mainImageRef.current, 
      ...cardsRef.current, 
      specsCardRef.current, 
      ctaCardRef.current,
      ...projectsRef.current,
      aboutSectionRef.current,
      capabilitiesSectionRef.current,
      gallerySectionRef.current
    ], { opacity: 1, visibility: 'visible' });

    // Анимация заголовка
    gsap.fromTo(headerRef.current, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
      }
    );

    // Параллакс эффект для главного изображения
    gsap.to(mainImageRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: mainImageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

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

    // Анимация секций
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

    // Эффект мерцания для CTA кнопки
    const blink = gsap.to(`.${styles.ctaButton}`, {
      boxShadow: '0 0 20px 5px rgba(255, 193, 7, 0.7)',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      blink.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "Адресные таблички",
      description: "Элегантные таблички с номерами домов и названиями улиц",
      image: 'https://letrero.ru/assets/cache_image/old/fc2714542fca9741d64dc44a6ef73cd5_864x470_339.jpg',
      year: "2023",
      materials: "Нержавеющая сталь, латунь"
    },
    {
      id: 2,
      title: "Офисные вывески",
      description: "Стильные таблички для офисных зданий и компаний",
      image: 'https://www.vitstamp.ru/img/tov/image047.jpg',
      year: "2022",
      materials: "Алюминий, акрил"
    },
    {
      id: 3,
      title: "Информационные стенды",
      description: "Металлические конструкции с информационными табличками",
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_JUxPkSP-Hj-CKrmqe-AlBtxTecKx-tkO6A&s',
      year: "2022",
      materials: "Сталь, композитные панели"
    },
    {
      id: 4,
      title: "Декоративные элементы",
      description: "Художественные металлические таблички и указатели",
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq6lr7n9FmuSPoZy-5sStjx_AeyB-sI0Q86BRgFfe-H2LRx_M7uY4R7OBMWZ6LpwVF1_4&usqp=CAU',
      year: "2021",
      materials: "Латунь, медь"
    }
  ];

  const capabilities = [
    {
      title: "Гравировка",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 3V7M12 7H16M12 7V3M16 3L21 8M16 7L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Лазерная резка",
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
      title: "Порошковая покраска",
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
      title: "Объемные буквы",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M3 7V17H21V7H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Подсветка",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.64 5.64L4.22 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.78 19.78L18.36 18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.64 18.36L4.22 19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.78 4.22L18.36 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Монтаж",
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
              <path d="M15 18L9 12L15 6" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Все направления</span>
          </Link>
          <div className={styles.headerContent}>
            <h1>
              <span className={styles.titleWord1}>Металлические</span>
              <span className={styles.titleWord2}>таблички</span>
            </h1>
            <p>Изготовление адресных табличек, вывесок и информационных указателей из металла</p>
          </div>
        </header>

        {/* Основное изображение с параллаксом */}
        <div className={styles.mainImageContainer} ref={mainImageRef}>
          <img 
            src="https://www.vitstamp.ru/assets/files/351/tablichka-metall-2.jpg" 
            alt="Металлические таблички" 
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
                Производим металлические таблички и вывески для зданий, офисов и общественных пространств. 
                От классических адресных табличек до современных информационных систем - мы создаем 
                качественные и долговечные изделия с индивидуальным подходом к каждому заказу.
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
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FFC107" strokeWidth="2"/>
                  <path d="M12 8V12L15 15" stroke="#FFC107" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Технические данные</span>
              </h3>
              <ul>
                {[
                  ["Материалы", "Сталь, алюминий, латунь"],
                  ["Сроки", "3-14 дней"],
                  ["Размеры", "от 10x5 см до 200x100 см"],
                  ["Покрытия", "Порошковая краска, патина"],
                  ["Гарантия", "5-15 лет"]
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
                <p>Обсудим ваш заказ и подготовим предложение</p>
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
          <div className={styles.galleryGrid}>
            {projects.map((project, index) => (
              <article 
                key={project.id} 
                className={styles.projectCard}
                ref={el => addToProjectsRef(el, index)}
              >
                <div className={styles.projectImage}>
                  <img
                    src={project.image}
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
        </section>
      </Container>
    </div>
  );
};

export default MetalSigns;