import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import styles from '@/assets/style/admin/AdminPanel.module.css';

// Список доступных иконок
const ICONS = [
  '🏗️', '🔩', '🏢', '🎨', '📍', '⚙️', '🔧', '🏭', '🛠️', '🏛️',
  '🔨', '🏗', '🏘️', '🏡', '🏠', '🏤', '🏥', '🏦', '🏨', '🏪'
];

const AdminPanel = () => {
  const { user, loading, isAdmin } = useAuth();
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    color: '#FF5E1A',
    icon: '🏗️',
    images: []
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAdmin()) {
      fetchCards();
    }
  }, [isAdmin]);

  const fetchCards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/project-cards');
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 3) {
      alert('Максимум можно загрузить 3 изображения');
      return;
    }

    setFormData(prev => ({ ...prev, images: files }));

    // Создаем превью изображений
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('color', formData.color);
    formDataToSend.append('icon', formData.icon);
    
    // Добавляем изображения
    formData.images.forEach(image => {
      formDataToSend.append('images', image);
    });

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/project-cards/${editingId}`,
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
          }
        );
      } else {
        await axios.post(
          'http://localhost:5000/api/project-cards',
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
          }
        );
      }
      await fetchCards();
      resetForm();
    } catch (error) {
      console.error('Error saving card:', error);
      alert('Ошибка при сохранении карточки');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      color: '#FF5E1A',
      icon: '🏗️',
      images: []
    });
    setPreviewImages([]);
    setEditingId(null);
  };

  const editCard = (card) => {
    setFormData({
      title: card.title,
      category: card.category,
      description: card.description,
      color: card.color,
      icon: card.icon,
      images: [] // Очищаем новые изображения при редактировании
    });
    setPreviewImages(card.images.map(img => `http://localhost:5000${img}`));
    setEditingId(card._id);
  };

  const deleteCard = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту карточку?')) {
      try {
        await axios.delete(
          `http://localhost:5000/api/project-cards/${id}`,
          { withCredentials: true }
        );
        await fetchCards();
      } catch (error) {
        console.error('Error deleting card:', error);
      }
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.container}>
      <h1>Админ-панель - Карточки проектов</h1>
      
      <div className={styles.adminContent}>
        <div className={styles.formSection}>
          <h2>{editingId ? 'Редактировать карточку' : 'Добавить новую карточку'}</h2>
          <form onSubmit={handleSubmit} className={styles.cardForm}>
            <div className={styles.formGroup}>
              <label>Название</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Категория</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Описание</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Цвет</label>
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Иконка</label>
              <div className={styles.iconGrid}>
                {ICONS.map((icon, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${styles.iconButton} ${formData.icon === icon ? styles.selectedIcon : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, icon }))}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label>Изображения (максимум 3)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                required={!editingId || previewImages.length === 0}
              />
              
              <div className={styles.imagePreviews}>
                {previewImages.map((img, index) => (
                  <div key={index} className={styles.imagePreview}>
                    <img src={img} alt={`Preview ${index}`} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className={styles.formActions}>
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Сохранение...' : 'Сохранить карточку'}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm}>
                  Отмена
                </button>
              )}
            </div>
          </form>
        </div>
        
        <div className={styles.cardsSection}>
          <h2>Существующие карточки</h2>
          <div className={styles.cardsList}>
            {cards.map((card) => (
              <div key={card._id} className={styles.cardPreview}>
                <div 
                  className={styles.cardHeader}
                  style={{ backgroundColor: card.color }}
                >
                  <div className={styles.cardIcon}>{card.icon}</div>
                  <div>
                    <div className={styles.cardCategory}>{card.category}</div>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                  </div>
                </div>
                <p className={styles.cardDescription}>{card.description}</p>
                <div className={styles.cardImages}>
                  {card.images.slice(0, 3).map((img, i) => (
                    <img 
                      key={i} 
                      src={`http://localhost:5000${img}`} 
                      alt={`${card.title} ${i}`} 
                      className={styles.cardImage}
                    />
                  ))}
                </div>
                <div className={styles.cardActions}>
                  <button onClick={() => editCard(card)}>Редактировать</button>
                  <button onClick={() => deleteCard(card._id)}>Удалить</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;