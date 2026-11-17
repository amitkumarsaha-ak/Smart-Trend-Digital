import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Facebook, Linkedin } from 'lucide-react';
import Logo from './Logo.jsx';
import { company } from '../data/company.js';
import { serviceCategories } from '../data/servicesData.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="footer">
      <div className="wave-top" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,80 C240,20 360,110 720,70 C1080,30 1200,100 1440,50 L1440,120 L0,120 Z"
            fill="#0b3a66"
          />
          <path
            d="M0,95 C280,40 480,120 780,80 C1080,40 1260,90 1440,70 L1440,120 L0,120 Z"
            fill="#071e36"
            opacity="0.95"
          />
        </svg>
      </div>

      <div className="footer-body">
        <div className="container footer-grid">
          {/* COL 1: BRAND & MISSION */}
          <div className="footer-col-brand">
            <Logo light={true} />
            <p className="footer-about">
              {t.footer.tagline}
            </p>
            <div className="footer-social-row">
              <a
                href={company.facebook}
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="Facebook"
                title="Follow Smart Trend Digital on Facebook"
              >
                <Facebook size={17} />
              </a>
              <a
                href={company.linkedin}
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn"
                title="Follow Smart Trend Digital on LinkedIn"
              >
                <Linkedin size={17} />
              </a>
            </div>
          </div>

          {/* COL 2: SERVICE AREAS */}
          <div className="footer-col">
            <h3>{t.footer.pillarsTitle}</h3>
            <ul className="footer-service-pillars">
              {serviceCategories.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/services#${cat.id}`}>
                    {lang === 'bn' ? cat.nameBn : cat.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3: QUICK LINKS & SOCIAL */}
          <div className="footer-col">
            <h3>{t.footer.quickLinks}</h3>
            <ul>
              <li><Link to="/about">{t.nav.about}</Link></li>
              <li><Link to="/services">{t.nav.services}</Link></li>
              <li><Link to="/quotation">{t.nav.quotation}</Link></li>
              <li><Link to="/case-studies">{t.nav.caseStudies}</Link></li>
              <li><Link to="/contact">{t.nav.contact}</Link></li>
              <li>
                <a
                  href={company.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link-inline-social"
                >
                  <Facebook size={14} className="social-inline-icon" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href={company.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link-inline-social"
                >
                  <Linkedin size={14} className="social-inline-icon" />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>

          {/* COL 4: CONTACT & HEADQUARTERS */}
          <div className="footer-col">
            <h3>{t.footer.contactTitle}</h3>
            <ul className="footer-contact">
              <li>
                <Phone size={16} />
                <a href={company.phoneHref}>{company.phone}</a>
              </li>
              <li>
                <Mail size={16} />
                <a href={company.emailHref}>{company.email}</a>
              </li>
              <li>
                <MapPin size={16} />
                <a href={company.mapsUrl} target="_blank" rel="noreferrer">
                  {lang === 'bn' ? company.addressBn : company.address}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} {company.name}. {t.footer.allRights}</p>
        </div>
      </div>
    </footer>
  );
}
