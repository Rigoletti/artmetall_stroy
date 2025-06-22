import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import '@/assets/style/portfolio/ProjectModal.css';

const ProjectModal = ({ show, onHide, project }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="project-modal"
      backdropClassName="project-modal-backdrop"
      scrollable={true}
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-3">{project.title}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="pt-0">
        <div className="modal-project-image mb-4 rounded-3 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-100 h-auto"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
        
        <div className="d-flex gap-3 mb-4 flex-wrap">
          <div className="meta-card bg-light p-3 rounded-3 flex-grow-1">
            <span className="d-block text-muted small">Материал</span>
            <span className="fw-semibold">{project.material}</span>
          </div>
          <div className="meta-card bg-light p-3 rounded-3 flex-grow-1">
            <span className="d-block text-muted small">Год</span>
            <span className="fw-semibold">{project.year}</span>
          </div>
        </div>
        
        <div className="modal-project-description mb-4">
          <h4 className="fw-bold mb-3">О проекте</h4>
          <p className="text-muted lh-lg">{project.fullDescription}</p>
        </div>
        
        <div className="modal-project-features mb-3">
          <h4 className="fw-bold mb-3">Особенности</h4>
          <ul className="list-unstyled">
            {project.features.map((feature, index) => (
              <li key={index} className="d-flex align-items-start mb-2">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  className="me-2 mt-1 flex-shrink-0"
                  fill="#c5a059"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <span className="text-muted">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </Modal.Body>
      
      <Modal.Footer className="border-0">
        <Button 
          variant="outline-secondary" 
          onClick={onHide}
          className="px-4 py-2 rounded-pill"
        >
          Закрыть
        </Button>
        <Button 
          variant="primary" 
          className="modal-cta-btn px-4 py-2 rounded-pill fw-semibold"
          style={{ backgroundColor: "#c5a059", borderColor: "#c5a059" }}
        >
          Обсудить проект
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectModal;