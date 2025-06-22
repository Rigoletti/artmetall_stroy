import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectModal from '@/components/portfolio/ProjectModal';
import styles from '@/assets/style/portfolio/Portfolio.module.css';
import { useNavigate } from "react-router-dom";
import HomeButton from '@/components/home/HomeButton';
import { motion, useInView, AnimatePresence } from "framer-motion";

import project1 from '@/assets/img/projects/project1.jpg';
import project2 from '@/assets/img/projects/project2.jpg';
import project3 from '@/assets/img/projects/project3.jpg';
import project4 from '@/assets/img/projects/project4.jpg';
import project5 from '@/assets/img/projects/project5.jpg';
import project6 from '@/assets/img/projects/project6.jpg';
import project7 from '@/assets/img/projects/project7.jpg';
import project8 from '@/assets/img/projects/project8.jpg';

const Portfolio = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef();
  const galleryRef = useRef();
  const isHeroInView = useInView(heroRef, { once: true });
  const isGalleryInView = useInView(galleryRef, { once: true, margin: "-100px" });

  const projects = [
    {
      id: 1,
      title: "Вывеска 'Саюри'",
      category: "signs",
      material: "Нержавеющая сталь",
      description: "Современная вывеска для суши-ресторана с японской эстетикой",
      fullDescription: "Изготовление вывески из нержавеющей стали с LED-подсветкой. Толщина металла 3 мм, антикоррозийная обработка, гравировка лазером. Проект включал разработку дизайна и монтаж.",
      image: project1,
      features: ["Толщина металла: 3мм", "LED-подсветка", "Антикоррозийная обработка"],
      year: "2023",
      color: "linear-gradient(135deg, #434343 0%, #000000 100%)"
    },
    {
      id: 2,
      title: "Ограждение ресторана",
      category: "fences",
      material: "Кованая сталь",
      description: "Эксклюзивное кованое ограждение для премиум ресторана",
      fullDescription: "Художественная ковка по индивидуальному эскизу. Элементы ручной работы, патинирование, защитное покрытие. Общая длина ограждения 28 метров.",
      image: project2,
      features: ["Ручная ковка", "Патинирование", "Длина 28м"],
      year: "2022",
      color: "linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%)"
    },
    {
      id: 3,
      title: "Промышленные ворота",
      category: "gates",
      material: "Оцинкованная сталь",
      description: "Автоматические секционные ворота для склада",
      fullDescription: "Изготовление и установка автоматических секционных ворот размером 5х4 метра. Оцинкованная сталь с порошковым покрытием, утепление пенополиуретаном.",
      image: project3,
      features: ["Размер 5х4м", "Автоматика", "Утепление"],
      year: "2023",
      color: "linear-gradient(135deg, #4b4b4b 0%, #2b2b2b 100%)"
    },
    {
      id: 4,
      title: "Лестничные ограждения",
      category: "railings",
      material: "Сталь и стекло",
      description: "Современные ограждения для бизнес-центра",
      fullDescription: "Комбинированные ограждения из стали и закаленного стекла. 5 этажей, общая длина 120 метров. Порошковое покрытие в цвет RAL 7016.",
      image: project4,
      features: ["Сталь + стекло", "Длина 120м", "RAL 7016"],
      year: "2021",
      color: "linear-gradient(135deg, #5a5a5a 0%, #3a3a3a 100%)"
    },
    {
      id: 5,
      title: "Навес для авто",
      category: "structures",
      material: "Стальной профиль",
      description: "Козырек над парковкой премиум-класса",
      fullDescription: "Каркас из стального профиля с поликарбонатным покрытием. Размеры 12х6 метров, 4 опорные колонны. Антикоррозийная обработка всех элементов.",
      image: project5,
      features: ["Размер 12х6м", "Поликарбонат", "4 опоры"],
      year: "2022",
      color: "linear-gradient(135deg, #6b6b6b 0%, #4b4b4b 100%)"
    },
    {
      id: 6,
      title: "Арт-объект 'Волна'",
      category: "art",
      material: "Нержавеющая сталь",
      description: "Скульптура для городского парка",
      fullDescription: "Художественная скульптура из нержавеющей стали высотой 3.5 метра. Сложная пространственная форма, полировка до зеркального блеска.",
      image: project6,
      features: ["Высота 3.5м", "Зеркальная полировка", "Антивандальное крепление"],
      year: "2023",
      color: "linear-gradient(135deg, #7b7b7b 0%, #5b5b5b 100%)"
    },
    {
      id: 7,
      title: "Торговое оборудование",
      category: "commerce",
      material: "Сталь и дерево",
      description: "Стойки ресепшен для офисного центра",
      fullDescription: "Серия стоек ресепшен из комбинации стали и натурального дуба. 6 комплектов с индивидуальной адаптацией под каждый офис.",
      image: project7,
      features: ["Сталь + дуб", "6 комплектов", "Индивидуальный дизайн"],
      year: "2021",
      color: "linear-gradient(135deg, #8c8c8c 0%, #6c6c6c 100%)"
    },
    {
      id: 8,
      title: "Балконные ограждения",
      category: "railings",
      material: "Алюминий",
      description: "Ограждения для жилого комплекса",
      fullDescription: "Серийное производство балконных ограждений для жилого комплекса. Всего 248 комплектов. Порошковое покрытие, быстрый монтаж.",
      image: project8,
      features: ["248 комплектов", "Алюминий", "Порошковое покрытие"],
      year: "2022",
      color: "linear-gradient(135deg, #9c9c9c 0%, #7c7c7c 100%)"
    }
  ];

  const categories = [
    { id: "all", name: "Все работы" },
    { id: "signs", name: "Вывески" },
    { id: "fences", name: "Ограждения" },
    { id: "gates", name: "Ворота" },
    { id: "railings", name: "Перила" },
    { id: "structures", name: "Конструкции" },
    { id: "art", name: "Арт-объекты" },
    { id: "commerce", name: "Торговое оборудование" }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  // Анимация для букв заголовка
  const titleText = "Наше портфолио".split("");
  const subtitleText = "Реализованные проекты из металла, которые говорят сами за себя".split("");

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

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.8 + i * 0.1,
        type: "spring",
        stiffness: 100
      }
    })
  };

  return (
    <div className={styles.page}>
      <div className={styles.buttonContainer}>
        <HomeButton />
      </div>
      
      <section 
        className={styles.hero}
        ref={heroRef}
      >
        <div className={styles.heroParticles} id="particles-js"></div>
        <div className={styles.heroOverlay}></div>
        
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <motion.h1 
                className={styles.heroTitle}
                initial="hidden"
                animate={isHeroInView ? "visible" : "hidden"}
              >
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
              
              <motion.p
                className={styles.heroSubtitle}
                initial="hidden"
                animate={isHeroInView ? "visible" : "hidden"}
              >
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
            </Col>
            
            <Col lg={6} className="text-lg-end">
              <motion.div 
                className={styles.statsBox}
                initial="hidden"
                animate={isHeroInView ? "visible" : "hidden"}
              >
                {[
                  { number: "120+", label: "проектов" },
                  { number: "15", label: "лет опыта" },
                  { number: "98%", label: "клиентов довольны" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className={styles.statItem}
                    custom={index}
                    variants={statVariants}
                  >
                    <span className={styles.statNumber}>{stat.number}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </Col>
          </Row>
        </Container>
        
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

      <section 
        className={styles.filters}
        style={{
          background: isHovered 
            ? "linear-gradient(90deg, #0a0a0a 0%, #1a1a1a 100%)"
            : "linear-gradient(90deg, #1a1a1a 0%, #0a0a0a 100%)"
        }}
      >
        <Container>
          <motion.div 
            className={styles.filterScroll}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {categories.map(category => (
              <motion.button
                key={category.id}
                className={`${styles.filterBtn} ${filter === category.id ? styles.filterBtnActive : ''}`}
                onClick={() => setFilter(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </Container>
      </section>

      <section 
        className={styles.gallery}
        ref={galleryRef}
      >
        <Container>
          <Row className="g-4">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <Col key={project.id} md={6} lg={4} xl={3}>
                  <motion.div
                    className={styles.projectCard}
                    onClick={() => openModal(project)}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isGalleryInView ? { 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: index * 0.1 }
                    } : {}}
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    style={{ background: project.color }}
                  >
                    <div className={styles.projectImage}>
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className={styles.projectImg}
                      />
                      <div className={styles.projectOverlay}>
                        <span className={styles.projectMaterial}>{project.material}</span>
                      </div>
                    </div>
                    <div className={styles.projectInfo}>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <p className={styles.projectDesc}>{project.description}</p>
                      <div className={styles.projectYear}>{project.year}</div>
                    </div>
                    <div className={styles.projectHoverEffect}></div>
                  </motion.div>
                </Col>
              ))}
            </AnimatePresence>
          </Row>
        </Container>
      </section>

      {selectedProject && (
        <ProjectModal 
          show={showModal}
          onHide={closeModal}
          project={selectedProject}
        />
      )}
    </div>
  );
};

export default Portfolio;