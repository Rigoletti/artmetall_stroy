import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import styles from '@/assets/style/admin/AdminPanel.module.css';
import HomeButton from '@/components/home/HomeButton';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCalendar, FiBox } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

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

const AdminPanel = () => {
  const { user, loading, isAdmin } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
    materials: '',
    category: 'industrial',
    image: null,
    previewImage: null
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`${API_BASE_URL}/api/projects?category=industrial`, {
          withCredentials: true
        });
        
        setProjects(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Ошибка загрузки проектов:', error);
        setError('Не удалось загрузить проекты');
        toast.error('Не удалось загрузить проекты');
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (formData.previewImage && !currentProject) {
        URL.revokeObjectURL(formData.previewImage);
      }
      
      setFormData(prev => ({
        ...prev,
        image: file,
        previewImage: URL.createObjectURL(file)
      }));
    }
  };

  const openModal = (project = null) => {
    if (project) {
      setCurrentProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        year: project.year,
        materials: project.materials,
        category: project.category,
        image: null,
        previewImage: project.image ? `${API_BASE_URL}/api/project-images/${project.image}` : null
      });
    } else {
      setCurrentProject(null);
      setFormData({
        title: '',
        description: '',
        year: '',
        materials: '',
        category: 'industrial',
        image: null,
        previewImage: null
      });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    if (formData.previewImage && !currentProject) {
      URL.revokeObjectURL(formData.previewImage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('year', formData.year);
    data.append('materials', formData.materials);
    data.append('category', formData.category);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      setIsLoading(true);
      if (currentProject) {
        await axios.put(`${API_BASE_URL}/api/projects/${currentProject._id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        });
        toast.success('Проект успешно обновлен');
      } else {
        await axios.post(`${API_BASE_URL}/api/projects`, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        });
        toast.success('Проект успешно создан');
      }
      
      const response = await axios.get(`${API_BASE_URL}/api/projects?category=industrial`, {
        withCredentials: true
      });
      setProjects(Array.isArray(response.data) ? response.data : []);
      closeModal();
    } catch (error) {
      console.error('Ошибка сохранения проекта:', error);
      toast.error(`Ошибка: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = (project) => {
    setProjectToDelete(project);
    setDeleteConfirmModal(true);
  };

  const cancelDelete = () => {
    setProjectToDelete(null);
    setDeleteConfirmModal(false);
  };

    const handleDelete = async () => {
    if (!projectToDelete) return;
    
    try {
      setIsLoading(true);
      const { data } = await axios.delete(`${API_BASE_URL}/api/projects/${projectToDelete._id}`, { 
        withCredentials: true 
      });
      
      if (data.success) {
        toast.success('Проект успешно удален');
        // Удаляем проект из состояния без повторного запроса
        setProjects(prev => prev.filter(project => project._id !== projectToDelete._id));
      } else {
        toast.error('Ошибка при удалении проекта');
      }
    } catch (error) {
      console.error('Ошибка удаления проекта:', error);
      toast.error(`Ошибка: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
      setDeleteConfirmModal(false);
      setProjectToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Загрузка данных пользователя...</p>
      </div>
    );
  }

  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.homeButtonWrapper}>
          <HomeButton />
        </div>
        
        <div className={styles.headerContent}>
          <h1 className={styles.mainTitle}>
            <span className={styles.titleAccent}>АДМИНИСТРИРОВАНИЕ</span>
            <span className={styles.titleMain}>Промышленные проекты</span>
          </h1>

          <motion.button
            className={styles.addButton}
            onClick={() => openModal()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={isLoading}
          >
            <FiPlus className={styles.buttonIcon} />
            Добавить проект
          </motion.button>
        </div>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <svg className={styles.errorIcon} viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"/>
          </svg>
          {error}
        </div>
      )}

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Загрузка проектов...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className={styles.emptyState}>
          <svg className={styles.emptyIcon} viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,3H5C3.89,3,3,3.89,3,5v14c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.89,20.1,3,19,3z M19,19H5V5h14V19z M17,12h-3V8h-2v4H7l4,4L17,12z"/>
          </svg>
          <p>Проекты не найдены</p>
          <button 
            className={styles.emptyAction}
            onClick={() => openModal()}
          >
            Создать первый проект
          </button>
        </div>
      ) : (
        <div className={styles.projectsGrid}>
          <AnimatePresence>
            {projects.map((project) => (
              <motion.div 
                key={project._id}
                className={styles.projectCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <div className={styles.projectImage}>
                  <ImageWithFallback 
                    src={project.image ? `${API_BASE_URL}/api/project-images/${project.image}` : '/images/default-project.jpg'}
                    alt={project.title || 'Изображение проекта'}
                  />
                  <div className={styles.projectOverlay}>
                    <button 
                      className={styles.editButton}
                      onClick={() => openModal(project)}
                      disabled={isLoading}
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className={styles.deleteButton}
                      onClick={() => confirmDelete(project)}
                      disabled={isLoading}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <div className={styles.projectContent}>
                  <h3>{project.title || 'Без названия'}</h3>
                  <p>{project.description || 'Описание отсутствует'}</p>
                  <div className={styles.projectMeta}>
                    <div className={styles.metaItem}>
                      <FiCalendar className={styles.metaIcon} />
                      <span>{project.year || 'Не указан'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <FiBox className={styles.metaIcon} />
                      <span>{project.materials || 'Не указаны'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Модальное окно редактирования/создания */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
        shouldCloseOnOverlayClick={!isLoading}
      >
        <div className={styles.modalHeader}>
          <h2>{currentProject ? 'Редактирование проекта' : 'Создание проекта'}</h2>
          <button 
            onClick={closeModal}
            className={styles.modalClose}
            disabled={isLoading}
          >
            <FiX />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Название</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Описание</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Год реализации</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Материалы</label>
              <input
                type="text"
                name="materials"
                value={formData.materials}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label>Категория</label>
            <div className={styles.selectWrapper}>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                disabled={isLoading}
              >
                <option value="industrial">Промышленный</option>
                <option value="commercial">Коммерческий</option>
                <option value="residential">Жилой</option>
              </select>
              <div className={styles.selectArrow}>
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M7,10L12,15L17,10H7Z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label>Изображение</label>
            <div className={styles.fileUpload}>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isLoading}
              />
              <label htmlFor="imageUpload">
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M8,15V13H16V15H8M8,11V9H13V11H8M8,19V17H16V19H8Z"/>
                </svg>
                <span>{formData.image ? formData.image.name : 'Выберите изображение'}</span>
              </label>
            </div>
            {formData.previewImage && (
              <div className={styles.imagePreview}>
                <ImageWithFallback 
                  src={formData.previewImage} 
                  alt="Предпросмотр" 
                />
              </div>
            )}
          </div>
          
          <div className={styles.modalActions}>
            <button 
              type="button" 
              className={styles.cancelButton}
              onClick={closeModal}
              disabled={isLoading}
            >
              Отмена
            </button>
            <button 
              type="submit" 
              className={styles.saveButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className={styles.spinner}></span>
              ) : currentProject ? 'Сохранить изменения' : 'Создать проект'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Модальное окно подтверждения удаления */}
      <Modal
        isOpen={deleteConfirmModal}
        onRequestClose={cancelDelete}
        className={styles.confirmModal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.confirmContent}>
          <h3>Подтверждение удаления</h3>
          <p>Вы уверены, что хотите удалить проект "{projectToDelete?.title}"?</p>
          <p className={styles.warningText}>Это действие нельзя отменить!</p>
          
          <div className={styles.confirmButtons}>
            <button 
              onClick={cancelDelete}
              className={styles.cancelButton}
              disabled={isLoading}
            >
              Отмена
            </button>
            <button 
              onClick={handleDelete}
              className={styles.deleteConfirmButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className={styles.spinner}></span>
              ) : 'Удалить'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminPanel;