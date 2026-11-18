import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Globe,
  Phone,
  Mail,
  Clock,
  MapPin,
  ChevronRight,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Logo from './Logo.jsx';
import SoundFXToggle from './SoundFXToggle.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { company } from '../data/company.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();
  const location = useLocation();

  // Close slide drawer whenever route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll and close on Escape key when slide drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  // Serial list of navigation items
  const links = [
    {
      to: '/',
      label: t.nav.home,
      num: '01',
      desc: lang === 'bn' ? 'হোমপেজ ও মূল পরিচিতি' : 'Digital Agency & Smart Facilities',
    },
    {
      to: '/about',
      label: t.nav.about,
      num: '02',
      desc: lang === 'bn' ? 'আমাদের পরিচিতি, দর্শন ও টিম' : 'Who We Are & Why Choose STD',
    },
    {
      to: '/services',
      label: t.nav.services,
      num: '03',
      desc: lang === 'bn' ? 'সকল ডিজিটাল ও ইঞ্জিনিয়ারিং সেবা' : 'Brand, Tech, Marketing & MEP Solutions',
    },
    {
      to: '/quotation',
      label: t.nav.quotation,
      num: '04',
      desc: lang === 'bn' ? 'অনলাইন খরচ ও বাজেট ক্যালকুলেটর' : 'Interactive Quote & Cost Calculator',
    },
    {
      to: '/case-studies',
      label: t.nav.caseStudies,
      num: '05',
      desc: lang === 'bn' ? 'বাস্তবায়িত সফল ক্লায়েন্ট প্রজেক্ট' : 'Proven Track Record & Client Success',
    },
    {
      to: '/contact',
      label: t.nav.contact,
      num: '06',
      desc: lang === 'bn' ? 'সরাসরি যোগাযোগ ও ফ্রি কনসালটেশন' : 'Reach Our Team & Book a Consultation',
    },
  ];

  return (
    <header className="site-header">
      {/* Top microbar for Contact & Office Hours */}
      <div className="header-topbar">
        <div className="container topbar-inner">
          <div className="topbar-left">
            <div className="topbar-item">
              <Clock size={13} className="topbar-icon" />
              <span className="topbar-val">{lang === 'bn' ? company.hoursBn : company.hours}</span>
            </div>
          </div>
          <div className="topbar-right">
            <a href={company.phoneHref} className="topbar-contact-link">
              <Phone size={13} className="topbar-icon" />
              <span>{company.phone}</span>
            </a>
            <span className="topbar-divider" aria-hidden="true">•</span>
            <a href={company.emailHref} className="topbar-contact-link">
              <Mail size={13} className="topbar-icon" />
              <span>{company.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="nav-main">
        <div className="container nav-inner">
          <Link to="/" className="nav-brand" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <div className="nav-right-cluster">
            {/* Desktop Navigation - for Laptop & Desktop (as before) */}
            <nav className="desktop-nav" aria-label="Main Navigation">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Direct CTA (Start a Project) - visible on Desktop */}
            <Link to="/quotation" className="btn btn-primary nav-cta">
              {t.nav.cta}
            </Link>

            {/* Interactive Sound FX Toggle */}
            <SoundFXToggle />

            {/* Quick Language Toggle */}
            <button
              type="button"
              className="lang-toggle-btn"
              onClick={toggleLang}
              title={lang === 'en' ? 'Switch to Bangla' : 'Switch to English'}
              aria-label="Toggle language"
            >
              <Globe size={15} />
              <span>{t.nav.lang}</span>
            </button>

            {/* Mobile Hamburger Button - only on mobile responsive */}
            <button
              className={`nav-mobile-toggle ${open ? 'active' : ''}`}
              type="button"
              aria-label={open ? (lang === 'bn' ? 'মেনু বন্ধ করুন' : 'Close menu') : (lang === 'bn' ? 'মেনু খুলুন' : 'Open menu')}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Slide-over Backdrop (Dimmed background overlay) */}
      <div
        className={`slide-drawer-backdrop ${open ? 'open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-over Drawer (Half-page from right on Desktop/Laptop/Tablet, responsive on Mobile) */}
      <aside
        className={`slide-drawer-panel ${open ? 'open' : ''}`}
        aria-label="Slide Menu"
        aria-hidden={!open}
      >
        <div className="slide-drawer-inner">
          {/* Drawer Header */}
          <div className="slide-drawer-header">
            <Link to="/" className="slide-drawer-logo" onClick={() => setOpen(false)}>
              <Logo />
            </Link>
            <button
              type="button"
              className="slide-drawer-close-btn"
              onClick={() => setOpen(false)}
              aria-label={lang === 'bn' ? 'মেনু বন্ধ করুন' : 'Close menu'}
            >
              <span className="close-text">{lang === 'bn' ? 'বন্ধ' : 'Close'}</span>
              <span className="close-icon"><X size={18} /></span>
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="slide-drawer-body">
            {/* Serial Navigation Section */}
            <div className="slide-section-label">
              <span>{lang === 'bn' ? 'নেভিগেশন মেনু' : 'Navigation Menu'}</span>
              <span className="slide-section-counter">01 — 06</span>
            </div>

            <nav className="slide-nav-list" aria-label="Slide Navigation">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `slide-nav-item ${isActive ? 'active' : ''}`}
                >
                  <div className="slide-nav-item-content">
                    <span className="slide-nav-num">{link.num}</span>
                    <div className="slide-nav-details">
                      <span className="slide-nav-label">{link.label}</span>
                      <span className="slide-nav-desc">{link.desc}</span>
                    </div>
                  </div>
                  <div className="slide-nav-arrow" aria-hidden="true">
                    <ChevronRight size={18} />
                  </div>
                </NavLink>
              ))}
            </nav>

            {/* Quick Actions */}
            <div className="slide-drawer-actions">
              <Link
                to="/quotation"
                className="btn btn-primary slide-cta-btn"
                onClick={() => setOpen(false)}
              >
                <Sparkles size={16} />
                <span>{t.nav.cta}</span>
                <ArrowRight size={16} />
              </Link>

              <button
                type="button"
                className="slide-lang-btn"
                onClick={() => {
                  toggleLang();
                }}
              >
                <Globe size={16} />
                <span>{lang === 'en' ? 'বাংলা সংস্করণ দেখুন' : 'Switch to English'}</span>
              </button>
            </div>

            {/* Complete Company Contact & Office Details */}
            <div className="slide-drawer-contact">
              <div className="slide-contact-title">
                {lang === 'bn' ? 'সরাসরি যোগাযোগ ও অফিস' : 'Direct Contact & Office'}
              </div>

              <div className="slide-contact-list">
                <a href={company.phoneHref} className="slide-contact-card">
                  <span className="slide-contact-icon"><Phone size={15} /></span>
                  <div className="slide-contact-info">
                    <span className="slide-contact-meta">{lang === 'bn' ? 'সরাসরি ফোন' : 'Call Directly'}</span>
                    <span className="slide-contact-val">{company.phone}</span>
                  </div>
                </a>

                <a href={company.emailHref} className="slide-contact-card">
                  <span className="slide-contact-icon"><Mail size={15} /></span>
                  <div className="slide-contact-info">
                    <span className="slide-contact-meta">{lang === 'bn' ? 'ইমেইল করুন' : 'Send an Email'}</span>
                    <span className="slide-contact-val">{company.email}</span>
                  </div>
                </a>

                <div className="slide-contact-card non-clickable">
                  <span className="slide-contact-icon"><Clock size={15} /></span>
                  <div className="slide-contact-info">
                    <span className="slide-contact-meta">{lang === 'bn' ? 'অফিস সময়' : 'Working Hours'}</span>
                    <span className="slide-contact-val">{lang === 'bn' ? company.hoursBn : company.hours}</span>
                  </div>
                </div>

                <a
                  href={company.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="slide-contact-card"
                >
                  <span className="slide-contact-icon"><MapPin size={15} /></span>
                  <div className="slide-contact-info">
                    <span className="slide-contact-meta">{lang === 'bn' ? 'প্রধান অফিস' : 'Head Office'}</span>
                    <span className="slide-contact-val">{lang === 'bn' ? company.addressBn : company.address}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </header>
  );
}
