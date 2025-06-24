import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import styles from '@/assets/style/directions/ArtObjects.module.css';

// Регистрируем плагин GSAP
gsap.registerPlugin(ScrollTrigger);

const ArtObjects = () => {
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
      boxShadow: '0 0 20px 5px rgba(157, 0, 255, 0.7)',
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
      title: "Скульптура 'Гармония'",
      description: "Металлическая скульптура для городского парка",
      image: 'https://reklam.ru/userfiles/1_5.jpg',
      year: "2023",
      materials: "Нержавеющая сталь, бронза"
    },
    {
      id: 2,
      title: "Инсталляция 'Поток'",
      description: "Динамическая инсталляция из нержавеющей стали",
      image: 'https://www.designeartshow.ru/sites/default/files/agday-2.jpg',
      year: "2022",
      materials: "Сталь, LED освещение"
    },
    {
      id: 3,
      title: "Арт-объект 'Восход'",
      description: "Монументальное произведение для набережной",
      image: 'https://reklam.ru/userfiles/news/spravka/IMG-20210825-WA0000.jpg',
      year: "2022",
      materials: "Алюминий, композитные материалы"
    },
    {
      id: 4,
      title: "Арт-объект 'Восход'",
      description: "Монументальное произведение для набережной",
      image: 'https://reklam.ru/userfiles/news/spravka/IMG-20210825-WA0000.jpg',
      year: "2022",
      materials: "Алюминий, композитные материалы"
    }
  ];

  const capabilities = [
    {
      title: "Концепция и эскизы",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 3V7M12 7H16M12 7V3M16 3L21 8M16 7L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "3D-моделирование",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M21 7.353V16.647C21 16.865 20.881 17.066 20.691 17.171L12.291 22.838C12.111 22.938 11.889 22.938 11.709 22.838L3.309 17.171C3.119 17.066 3 16.865 3 16.647V7.353C3 7.135 3.119 6.934 3.309 6.829L11.709 1.162C11.889 1.062 12.111 1.062 12.291 1.162L20.691 6.829C20.881 6.934 21 7.135 21 7.353Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.528 7.294L12 12.5L20.472 7.294" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 22.5V12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Изготовление из металла",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 16L19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 5L8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Специальные покрытия",
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
    },
    {
      title: "Интеграция освещения",
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
      title: "Монтаж и установка",
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
              <path d="M15 18L9 12L15 6" stroke="#B57AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Все направления</span>
          </Link>
          <div className={styles.headerContent}>
            <h1>
              <span className={styles.titleWord1}>Арт</span>
              <span className={styles.titleWord2}>объекты</span>
            </h1>
            <p>Уникальные произведения для публичных пространств и частных коллекций</p>
          </div>
        </header>

        {/* Основное изображение с параллаксом */}
        <div className={styles.mainImageContainer} ref={mainImageRef}>
          <img 
            src="https://thecity.m24.ru/b/d/SYketSivfIs1J_TObLLBFlFNHBpuaXnwmJxNbycGshjv55OD3HWFWh2pL8EsPwl5DpSHzm95vRzNbdeHauL5EWcJ5w9e=1eBdlirmaCOOR7oRRlfRQA.jpg" 
            alt="Арт-объекты" 
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
                Создаем уникальные арт-объекты из металла, сочетающие 
                художественную ценность и инженерное мастерство. 
                Каждое произведение - результат совместной работы 
                художников, дизайнеров и инженеров.
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
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#B57AFF" strokeWidth="2"/>
                  <path d="M12 8V12L15 15" stroke="#B57AFF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Технические данные</span>
              </h3>
              <ul>
                {[
                  ["Материалы", "Сталь, бронза, алюминий"],
                  ["Сроки", "2-24 недели"],
                  ["Размеры", "до 15 метров"],
                  ["Покрытия", "Полировка, патина"],
                  ["Гарантия", "10 лет"]
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

export default ArtObjects;