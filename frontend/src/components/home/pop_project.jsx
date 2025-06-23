import React, { useRef, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import '@/assets/style/home/Pop_Project.css';

gsap.registerPlugin(ScrollTrigger);

const DirectionCard = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
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

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: false }));
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
              {loadedImages[index] === false ? (
                <div className="image-error-placeholder">
                  <span>Изображение недоступно</span>
                </div>
              ) : (
                <img 
                  src={`http://localhost:5000${img}`}
                  alt={`${data.title} пример ${index+1}`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageError(index)}
                  style={{ display: loadedImages[index] ? 'block' : 'none' }}
                />
              )}
              {!loadedImages[index] && loadedImages[index] !== false && (
                <div className="image-loading-placeholder">
                  <div className="loading-spinner"></div>
                </div>
              )}
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

const Pop_Project = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [directions, setDirections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDirections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/project-cards');
        // Фильтруем карточки, у которых есть хотя бы одно изображение
        const validCards = response.data.filter(card => 
          card.images && card.images.length > 0
        );
        setDirections(validCards);
        setError(null);
      } catch (err) {
        console.error('Error fetching directions:', err);
        setError('Не удалось загрузить данные. Пожалуйста, попробуйте позже.');
        setDirections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDirections();
  }, []);

  useEffect(() => {
    if (directions.length === 0) return;

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
  }, [directions]);

  if (loading) {
    return (
      <section className="directions-section">
        <Container>
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="directions-section">
        <Container>
          <div className="error-message">
            {error}
          </div>
        </Container>
      </section>
    );
  }

  if (directions.length === 0) {
    return (
      <section className="directions-section">
        <Container>
          <div className="empty-message">
            Нет доступных направлений
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="directions-section" ref={sectionRef}>
      <Container>
        <div className="section-header" ref={titleRef}>
          <h2 className="section-title">Ключевые <span className="highlight">направления</span></h2>
          <p className="section-subtitle">Профессиональные решения в области металлоконструкций и строительства</p>
        </div>

        <div className="directions-grid">
          {directions.map((direction) => (
            <DirectionCard key={direction._id} data={direction} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Pop_Project;