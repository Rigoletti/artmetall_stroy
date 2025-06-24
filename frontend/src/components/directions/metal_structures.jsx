import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import styles from '@/assets/style/directions/MetalStructures.module.css';

// Регистрируем плагин GSAP
gsap.registerPlugin(ScrollTrigger);

const MetalStructures = () => {
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
      boxShadow: '0 0 20px 5px rgba(255, 100, 0, 0.7)',
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
      title: "Каркас склада",
      description: "Металлический каркас для промышленного склада",
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSkZnCQq-id02bMBXVstVPdbO-vhaYKfVcfw&s',
      year: "2023",
      materials: "Сталь, оцинкованные элементы"
    },
    {
      id: 2,
      title: "Ангар для авиации",
      description: "Авиационный ангар с большими пролетами",
      image: 'https://paneli-s.ru/images/main/Anna/izgotovlenie_metallokonstrukczij_2.jpg',
      year: "2022",
      materials: "Стальные конструкции"
    },
    {
      id: 3,
      title: "Торговый павильон",
      description: "Легкие металлоконструкции для торгового центра",
      image: 'https://www.lazermetal.ru/upload/iblock/162/1625ac290d46c711b016b94a9541ff24.jpg',
      year: "2022",
      materials: "Алюминий, сталь"
    },
    {
      id: 4,
      title: "Промышленный цех",
      description: "Каркас производственного цеха с мостовыми кранами",
      image: 'https://metallo-konstrukcii.ru/wp-content/uploads/2022/11/123-scaled.jpg',
      year: "2021",
      materials: "Сталь, усиленные конструкции"
    }
  ];

  const capabilities = [
    {
      title: "Проектирование",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 3V7M12 7H16M12 7V3M16 3L21 8M16 7L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Изготовление",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
    },
    {
      title: "Несущие конструкции",
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
      title: "Антикоррозийная защита",
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
      title: "Специальные решения",
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
              <path d="M15 18L9 12L15 6" stroke="#FF6400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Все направления</span>
          </Link>
          <div className={styles.headerContent}>
            <h1>
              <span className={styles.titleWord1}>Металло-</span>
              <span className={styles.titleWord2}>конструкции</span>
            </h1>
            <p>Проектирование, изготовление и монтаж металлических конструкций любой сложности</p>
          </div>
        </header>

        {/* Основное изображение с параллаксом */}
        <div className={styles.mainImageContainer} ref={mainImageRef}>
          <img 
            src="https://metallokonstrukciy.ru/%D0%B2923%D0%BB-0.jpg" 
            alt="Металлоконструкции" 
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
                Производим металлоконструкции для промышленного и гражданского строительства. 
                От проектирования до монтажа - полный цикл работ с гарантией качества. 
                Используем современные технологии и материалы для создания прочных и долговечных конструкций.
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
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF6400" strokeWidth="2"/>
                  <path d="M12 8V12L15 15" stroke="#FF6400" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Технические данные</span>
              </h3>
              <ul>
                {[
                  ["Материалы", "Сталь, алюминий, нержавейка"],
                  ["Сроки", "2-16 недель"],
                  ["Пролеты", "до 60 метров"],
                  ["Нагрузки", "до 50 тонн"],
                  ["Гарантия", "10-25 лет"]
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

export default MetalStructures;