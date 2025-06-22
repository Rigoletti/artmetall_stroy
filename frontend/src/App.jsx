import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from '@/components/portfolio/Portfolio';
import Contact from '@/components/contact/Contact';
import Services from '@/components/services/Services';
import HomeSection from '@/components/home/HomeSection';
import PostProject from '@/components/post_project/PostProject';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/profile/Profile';
import AdminPanel from './components/admin/AdminPanel';
const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<HomeSection />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/post_project" element={<PostProject />} />
         <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;