import React, { useRef, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@/assets/style/home/Pop_Project.css';

// Импорты изображений
import construction1 from '@/assets/img/projects/stroitelstvo.jpg';
import construction2 from '@/assets/img/projects/metalstructures.webp';
import construction3 from '@/assets/img/projects/facades.jpg';

import metal1 from '@/assets/img/projects/metalstructures.webp';
import metal2 from '@/assets/img/projects/metalstructures.webp';
import metal3 from '@/assets/img/projects/metalstructures.webp';

import facade1 from '@/assets/img/projects/facades.jpg';
import facade2 from '@/assets/img/projects/facades.jpg';
import facade3 from '@/assets/img/projects/facades.jpg';

import art1 from '@/assets/img/projects/construction.jpg';
import art2 from '@/assets/img/projects/construction.jpg';
import art3 from '@/assets/img/projects/construction.jpg';

import signs1 from '@/assets/img/projects/project8.jpg';
import signs2 from '@/assets/img/projects/project8.jpg';
import signs3 from '@/assets/img/projects/project8.jpg';

gsap.registerPlugin(ScrollTrigger);

const Pop_Project = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  
  const directions = [
    {
      id: 1,
      title: "Промышленное строительство",
      category: "Строительство",
      description: "Полный цикл от проектирования до сдачи объекта",
      color: "#FF5E1A",
      icon: "🏗️",
      images: [construction1, construction2, construction3]
    },
    {
      id: 2,
      title: "Металлоконструкции",
      category: "Металл",
      description: "Изготовление и монтаж любой сложности",
      color: "#00C2FF",
      icon: "🔩",
      images: [metal1, metal2, metal3]
    },
    {
      id: 3,
      title: "Фасадные решения",
      category: "Фасады",
      description: "Современные материалы и технологии",
      color: "#FF0A6C",
      icon: "🏢",
      images: [facade1, facade2, facade3]
    },
    {
      id: 4,
      title: "Арт-объекты",
      category: "Арт",
      description: "Уникальные решения для публичных пространств",
      color: "#9D00FF",
      icon: "🎨",
      images: [art1, art2, art3]
    },
    {
      id: 5,
      title: "Металлические таблички",
      category: "Таблички",
      description: "Элитная навигация и идентификация",
      color: "#00FFA3",
      icon: "📍",
      images: [signs1, signs2, signs3]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !titleRef.current) return;
      
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.from(".direction-card", {
        scrollTrigger: {
          trigger: ".directions-grid",
          start: "top 70%"
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power1.out"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const DirectionCard = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const trackRef = useRef(null);
    const sliderRef = useRef(null);

    const nextSlide = () => {
      const newIndex = (currentIndex + 1) % data.images.length;
      goToSlide(newIndex);
    };

    const prevSlide = () => {
      const newIndex = (currentIndex - 1 + data.images.length) % data.images.length;
      goToSlide(newIndex);
    };

    const goToSlide = (index) => {
      if (!trackRef.current || !sliderRef.current) return;
      
      const slideWidth = sliderRef.current.offsetWidth;
      gsap.to(trackRef.current, {
        x: `-${index * slideWidth}px`,
        duration: 0.4,
        ease: "power2.out"
      });
      setCurrentIndex(index);
    };

    useEffect(() => {
      const handleResize = () => {
        if (trackRef.current && sliderRef.current) {
          const slideWidth = sliderRef.current.offsetWidth;
          gsap.set(trackRef.current, { x: `-${currentIndex * slideWidth}px` });
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [currentIndex]);

    return (
      <div 
        className="direction-card"
        style={{ '--accent-color': data.color }}
      >
        <div className="direction-header">
          <div className="direction-icon">{data.icon}</div>
          <div className="direction-title-wrapper">
            <span className="direction-category">{data.category}</span>
            <h3 className="direction-title">{data.title}</h3>
          </div>
        </div>
        
        <p className="direction-description">{data.description}</p>
        
        <div className="direction-slider" ref={sliderRef}>
          <div className="slider-track" ref={trackRef}>
            {data.images.map((img, index) => (
              <div key={index} className="slider-slide">
                <img 
                  src={img} 
                  alt={`${data.title} пример ${index+1}`} 
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          
          <button 
            className="slider-nav prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button 
            className="slider-nav next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="slider-dots">
            {data.images.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="directions-section" ref={sectionRef}>
      <Container>
        <div className="section-header" ref={titleRef}>
          <h2 className="section-title">Ключевые <span className="highlight">направления</span></h2>
          <p className="section-subtitle">Профессиональные решения в области металлоконструкций и строительства</p>
        </div>

        <div className="directions-grid">
          {directions.map((direction) => (
            <DirectionCard key={direction.id} data={direction} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Pop_Project;