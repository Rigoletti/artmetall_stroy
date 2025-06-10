import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import '@/assets/style/home/Pop_Project.css';
import project1 from '@/assets/img/projects/project1.jpg';
import project2 from '@/assets/img/projects/project2.jpg';
import project3 from '@/assets/img/projects/project3.jpg';
import project4 from '@/assets/img/projects/project4.jpg';
import project5 from '@/assets/img/projects/project5.jpg';
import { Link } from "react-router-dom";

const Pop_Project = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);
  
  const projects = [
    {
      id: 1,
      title: "Вывеска 'Саюри'",
      material: "Нержавеющая сталь",
      description: "Современная вывеска с японской эстетикой и LED-подсветкой",
      image: project1,
      features: ["Толщина металла: 3мм", "Антикоррозийная обработка", "Гравировка лазером"]
    },
    {
      id: 2,
      title: "Вывеска 'I LOVE Пляж'",
      material: "Сталь + дерево",
      description: "Пляжная вывеска с защитой от солёного воздуха и влаги",
      image: project2,
      features: ["Порошковое покрытие", "УФ-защита", "Антивандальное крепление"]
    },
    {
      id: 3,
      title: "Металлическая клетка",
      material: "Чёрный металл",
      description: "Промышленная конструкция с точными размерами",
      image: project3,
      features: ["Горячее цинкование", "Точная сварка", "Кастомные размеры"]
    },
    {
      id: 4,
      title: "Новогодние украшения",
      material: "Стальной каркас",
      description: "Уличные декорации с подсветкой",
      image: project4,
      features: ["Быстрый монтаж", "Морозостойкость", "Энергосберегающая LED"]
    },
    {
      id: 5,
      title: "Медицинский центр",
      material: "Кованая сталь",
      description: "Солидная вывеска с элементами ручной работы",
      image: project5,
      features: ["Ручная ковка", "Патинирование", "Регулируемая подсветка"]
    }
  ];

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  // Автопереключение слайдов
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="metal-projects">
      <div className="metal-bg-texture"></div>
      
      <Container>
        <Row className="mb-5">
          <Col className="text-center">
            <h2 className="section-title">
              <span className="title-line">Наши работы</span>
              <span className="title-subline">по металлу</span>
            </h2>
          </Col>
        </Row>

        <Row className="align-items-center">
          <Col lg={7} className="mb-4 mb-lg-0">
            <div className="metal-slider-wrapper" ref={sliderRef}>
              <div 
                className="metal-slide"
                style={{ backgroundImage: `url(${projects[activeIndex].image})` }}>
                <div className="metal-overlay"></div>
                
                <div className="metal-badge">
                  <span>{projects[activeIndex].material}</span>
                </div>
                
                <div className="slide-nav-buttons">
                  <button className="metal-nav prev" onClick={handlePrev}>
                    <MetalArrowIcon direction="left" />
                  </button>
                  <button className="metal-nav next" onClick={handleNext}>
                    <MetalArrowIcon direction="right" />
                  </button>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={5}>
            <div className="metal-project-details">
              <div className="project-counter">
                <span className="current">{activeIndex + 1}</span>
                <span className="divider">/</span>
                <span className="total">{projects.length}</span>
              </div>
              
              <h3 className="project-title">{projects[activeIndex].title}</h3>
              <p className="project-description">{projects[activeIndex].description}</p>
              
              <div className="project-specs">
                <h4>Технические характеристики:</h4>
                <ul>
                  {projects[activeIndex].features.map((feature, i) => (
                    <li key={i}>
                      <MetalCheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
     <button className="metal-cta-button">
  <span><Link to="/post_project" className="plain-link">Заказать проект</Link></span>
  <MetalArrowIcon direction="right" />
</button>
              
              <div className="metal-dots">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === activeIndex ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                  >
                    <div className="dot-inner"></div>
                  </button>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

// Компоненты иконок
const MetalArrowIcon = ({ direction }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" className={`arrow-${direction}`}>
    <path d={direction === "left" ? "M15 18L9 12L15 6" : "M9 18L15 12L9 6"} 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"/>
  </svg>
);

const MetalCheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M5 13L9 17L19 7" 
          stroke="#c5a059" 
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"/>
  </svg>
);

export default Pop_Project;