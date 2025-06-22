import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUpload, FiCheckCircle, FiX, FiChevronDown } from "react-icons/fi";
import styles from '@/assets/style/post_project/PostProject.module.css';
import HomeButton from '@/components/home/HomeButton';
import { Link } from "react-router-dom";


const PostProject = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    description: "",
    files: []
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const projectTypes = [
    "Металлоконструкции",
    "Ограждения",
    "Художественная ковка",
    "Промышленные решения",
    "Арт-объекты",
    "Другое"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, files: [...prev.files, ...files] }));
    setSelectedFile(files[0]?.name || null);
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log(formData);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      projectType: "",
      description: "",
      files: []
    });
    setIsSubmitted(false);
  };

  return ( 
    <div className={styles.container}>
      <div className={styles.homeButtonWrapper}>
        <HomeButton />
      </div>

      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className={styles.textGradient}>Оформить заявку</span> на проект
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Заполните форму и мы свяжемся с вами для обсуждения деталей
          </motion.p>
        </motion.div>
      </section>

      <div className={styles.mainContent}>
        {isSubmitted ? (
          <motion.div 
            className={styles.successMessage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <FiCheckCircle className={styles.successIcon} />
            <h2>Заявка успешно отправлена!</h2>
            <p>Мы свяжемся с вами в ближайшее время для уточнения деталей.</p>
            <motion.button
              className={styles.submitButton}
              onClick={resetForm}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Отправить новую заявку
            </motion.button>
          </motion.div>
        ) : (
          <motion.form 
            className={styles.projectForm}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Ваше имя*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Телефон*</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Тип проекта*</label>
              <div 
                className={styles.customDropdown}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className={styles.dropdownHeader}>
                  {formData.projectType || "Выберите тип проекта"}
                  <FiChevronDown className={`${styles.dropdownIcon} ${isDropdownOpen ? styles.rotated : ''}`} />
                </div>
                {isDropdownOpen && (
                  <motion.div 
                    className={styles.dropdownOptions}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {projectTypes.map((type, index) => (
                      <div
                        key={index}
                        className={styles.dropdownOption}
                        onClick={() => {
                          setFormData(prev => ({ ...prev, projectType: type }));
                          setIsDropdownOpen(false);
                        }}
                      >
                        {type}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Описание проекта*</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className={styles.formTextarea}
                placeholder="Опишите ваш проект, укажите размеры, материалы и другие важные детали"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Прикрепить файлы</label>
              <div className={styles.fileUploadWrapper}>
                <input
                  type="file"
                  id="fileUpload"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                  multiple
                />
                <label htmlFor="fileUpload" className={styles.fileUploadLabel}>
                  <FiUpload className={styles.uploadIcon} />
                  <span>{selectedFile || "Выберите файлы"}</span>
                </label>
              </div>
              {formData.files.length > 0 && (
                <div className={styles.fileList}>
                  {formData.files.map((file, index) => (
                    <div key={index} className={styles.fileItem}>
                      <span>{file.name}</span>
                      <button 
                        type="button" 
                        onClick={() => removeFile(index)}
                        className={styles.removeFileButton}
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <motion.button
              type="submit"
              className={styles.submitButton}
              whileHover={{ y: -3, boxShadow: "0 10px 20px rgba(255, 179, 71, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Отправить заявку
            </motion.button>

            <p className={styles.formNote}>
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default PostProject;