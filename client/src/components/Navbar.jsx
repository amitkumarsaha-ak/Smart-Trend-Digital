import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Globe, Phone, Mail, Clock, Sun, Moon } from 'lucide-react';
import Logo from './Logo.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { company } from '../data/company.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/services', label: t.nav.services },
    { to: '/quotation', label: t.nav.quotation },
    { to: '/case-studies', label: t.nav.caseStudies },
    { to: '/packages', label: t.nav.packages },
    { to: '/contact', label: t.nav.contact },
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
            {/* Desktop Navigation */}
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

            {/* Direct CTA (Start a Project) */}
            <Link to="/quotation" className="btn btn-primary nav-cta">
              {t.nav.cta}
            </Link>

            {/* Quick Language Toggle (Now after Start a Project) */}
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

            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title={isDark ? (lang === 'bn' ? 'লাইট মোড চালু করুন' : 'Switch to Light Mode') : (lang === 'bn' ? 'ডার্ক মোড চালু করুন' : 'Switch to Dark Mode')}
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun size={17} className="theme-icon sun" /> : <Moon size={17} className="theme-icon moon" />}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className="nav-mobile-toggle"
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="mobile-drawer animate-in">
          <div className="container mobile-drawer-inner">
            <div className="mobile-drawer-header">
              <Logo />
              <button
                type="button"
                className="btn-close-drawer"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="mobile-links">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="mobile-drawer-actions">
              <Link
                to="/quotation"
                className="btn btn-primary mobile-cta-btn"
                onClick={() => setOpen(false)}
              >
                {t.nav.cta}
              </Link>

              <button
                type="button"
                className="mobile-lang-switch-btn"
                onClick={() => {
                  toggleLang();
                  setOpen(false);
                }}
              >
                <Globe size={18} />
                <span>{lang === 'en' ? 'বাংলা সংস্করণ দেখুন' : 'Switch to English'}</span>
              </button>

              <button
                type="button"
                className="mobile-theme-switch-btn"
                onClick={toggleTheme}
              >
                {isDark ? <Sun size={18} className="theme-icon sun" /> : <Moon size={18} className="theme-icon moon" />}
                <span>{isDark ? (lang === 'bn' ? 'লাইট মোড চালু করুন' : 'Switch to Light Mode') : (lang === 'bn' ? 'ডার্ক মোড চালু করুন' : 'Switch to Dark Mode')}</span>
              </button>

              <div className="mobile-drawer-contact">
                <p>
                  <Phone size={14} className="drawer-icon" />
                  <strong>{lang === 'bn' ? 'ফোন:' : 'Phone:'}</strong>
                  <a href={company.phoneHref}>{company.phone}</a>
                </p>
                <p>
                  <Mail size={14} className="drawer-icon" />
                  <strong>{lang === 'bn' ? 'ইমেইল:' : 'Email:'}</strong>
                  <a href={company.emailHref}>{company.email}</a>
                </p>
                <p>
                  <Clock size={14} className="drawer-icon" />
                  <span>{lang === 'bn' ? company.hoursBn : company.hours}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
