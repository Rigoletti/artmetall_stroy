// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from '@/components/portfolio/Portfolio';
import Contact from '@/components/contact/Contact';
import Services from '@/components/services/Services';
import HomeSection from '@/components/home/HomeSection';
import PostProject from '@/components/post_project/PostProject';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import Profile from '@/components/profile/Profile';
import AdminPanel from '@/components/admin/AdminPanel';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminRoute from '@/components/auth/AdminRoute';
// направления
import ArtObjects from './components/directions/art_objects';
import Fasade from './components/directions/facade';
import IndustrialConstruction from './components/directions/industrial_construction';
import MetalStructures from './components/directions/metal_structures';
import MetalSigns from './components/directions/metall_signs';
const App = () => {
  return (
    <Router basename="/">
      <Routes>
        {/* Публичные маршруты */}
        <Route path="/" element={<HomeSection />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/post_project" element={<PostProject />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/artobject" element={<ArtObjects />} />
        <Route path="/fasade" element={<Fasade />} />
        <Route path="/industrial" element={<IndustrialConstruction />} />
        <Route path="/metalstructures" element={<MetalStructures />} />
        <Route path="/metalsigns" element={<MetalSigns />} />
        {/* Защищенные маршруты (только для авторизованных) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        
        {/* Админские маршруты (только для админов) */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
        
        {/* Неизвестные маршруты */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;