import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';

import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Quotation from './pages/Quotation.jsx';
import CaseStudies from './pages/CaseStudies.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app-shell">
          <ScrollToTop />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/quotation" element={<Quotation />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/packages" element={<Navigate to="/services" replace />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <WhatsAppButton />
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
