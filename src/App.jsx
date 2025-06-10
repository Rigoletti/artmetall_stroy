import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from '@/components/portfolio/Portfolio';
import Contact from '@/components/contact/Contact';
import Services from '@/components/services/Services';
import HomeSection from '@/components/home/HomeSection';
import PostProject from '@/components/post_project/PostProject';

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<HomeSection />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/post_project" element={<PostProject />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;