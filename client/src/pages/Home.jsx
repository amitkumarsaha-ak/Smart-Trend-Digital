import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  TrendingUp,
  Award,
  ShieldCheck,
  Building2,
  CalendarCheck,
  FileCheck,
  ChevronRight,
  PhoneCall,
  MessageCircle,
  Maximize2,
  X,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { company } from '../data/company.js';
import { serviceCategories } from '../data/servicesData.js';
import { caseStudies } from '../data/caseStudiesData.js';
import ClientStrip from '../components/ClientStrip.jsx';
import QuotationCalculator from '../components/QuotationCalculator.jsx';
import ServiceIcon from '../components/ServiceIcon.jsx';
import InteractiveHeroCanvas from '../components/InteractiveHeroCanvas.jsx';
import AnimatedCounter from '../components/AnimatedCounter.jsx';

export default function Home() {
  const { t, lang } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <InteractiveHeroCanvas />
        <div className="hero-ambient-glow" />
        <div className="container hero-layout">
          <div className="hero-copy-block">
            <div className="hero-badge">
              <Sparkles size={14} className="badge-spark" />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="hero-title">
              {t.hero.titleStart}
              <span className="hero-title-gradient">{t.hero.titleHighlight}</span>
            </h1>

            <p className="hero-lead-text">
              {t.hero.lead}
            </p>

            <div className="hero-cta-group">
              <a href="#calculator" className="btn btn-primary btn-hero">
                <span>{t.hero.getQuotation}</span>
                <ArrowRight size={18} />
              </a>
              <Link to="/services" className="btn btn-ghost btn-hero">
                <span>{t.hero.exploreServices}</span>
              </Link>
            </div>

            <ul className="hero-feature-checks">
              {t.hero.highlights.map((item, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} className="check-bullet" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-image-column">
            <div className="hero-image-showcase">
              <div className="hero-image-frame">
                <div className="hero-image-topbar">
                  <div className="window-dots">
                    <span className="w-dot red" />
                    <span className="w-dot yellow" />
                    <span className="w-dot green" />
                  </div>
                  <span className="window-caption">Smart Trend Digital • Corporate HQ</span>
                  <button
                    type="button"
                    className="btn-view-blueprint"
                    onClick={() => setIsModalOpen(true)}
                    title={lang === 'bn' ? 'সম্পূর্ণ এসটিডি ব্লুপ্রিন্ট দেখুন' : 'View Full STD Blueprint'}
                  >
                    <Maximize2 size={13} />
                    <span>{lang === 'bn' ? 'পূর্ণাঙ্গ চিত্র' : 'Full Preview'}</span>
                  </button>
                </div>

                <div className="hero-image-container" onClick={() => setIsModalOpen(true)}>
                  <img
                    src="/std-hero.jpg"
                    alt="Smart Trend Digital Corporate Headquarters and Digital Agency Workspace"
                    className="hero-main-photo"
                  />
                  <div className="hero-image-overlay">
                    <span className="overlay-pill">
                      <ExternalLink size={13} />
                      {lang === 'bn' ? 'বড় করে দেখতে ক্লিক করুন' : 'Click to View Full STD Blueprint'}
                    </span>
                  </div>
                </div>

                <div className="hero-image-footer">
                  <div className="hq-tag">
                    <span className="live-status-dot" />
                    <span>Gulshan Avenue, Dhaka</span>
                  </div>
                  <div className="hq-badges">
                    <span className="hq-pill">BASIS Member</span>
                    <span className="hq-pill">BIIN Partner</span>
                    <span className="hq-pill">8+ Yrs Exp</span>
                  </div>
                </div>
              </div>

              {/* Decorative floating metric cards */}
              <div className="floating-metric-card top-float">
                <Sparkles size={16} className="metric-sparkle" />
                <div>
                  <strong><AnimatedCounter value="98%" /></strong>
                  <span>{lang === 'bn' ? 'ক্লায়েন্ট সন্তুষ্টি' : 'Satisfaction Rate'}</span>
                </div>
              </div>

              <div className="floating-metric-card bottom-float">
                <ShieldCheck size={16} className="metric-shield" />
                <div>
                  <strong><AnimatedCounter value="500+" /></strong>
                  <span>{lang === 'bn' ? 'সফল প্রজেক্ট' : 'Projects Done'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FULL STD IMAGE LIGHTBOX MODAL */}
        {isModalOpen && (
          <div className="std-modal-backdrop" onClick={() => setIsModalOpen(false)}>
            <div className="std-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="std-modal-header">
                <div className="std-modal-title">
                  <Sparkles size={16} />
                  <h3>{lang === 'bn' ? 'স্মার্ট ট্রেন্ড ডিজিটাল (এসটিডি) পূর্ণাঙ্গ প্ল্যাটফর্ম' : 'Smart Trend Digital (STD) Platform Blueprint'}</h3>
                </div>
                <div className="std-modal-actions">
                  <a
                    href="/std.jpeg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-white btn-sm"
                  >
                    <ExternalLink size={14} />
                    <span>{lang === 'bn' ? 'নতুন ট্যাবে খুলুন' : 'Open in New Tab'}</span>
                  </a>
                  <button
                    type="button"
                    className="std-modal-close"
                    onClick={() => setIsModalOpen(false)}
                    aria-label="Close preview"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="std-modal-body">
                <img
                  src="/std.jpeg"
                  alt="Smart Trend Digital Complete Platform & Service Ecosystem"
                  className="std-full-image"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CLIENT LOGO STRIP & AFFILIATIONS */}
      <ClientStrip />

      {/* 6 BUSINESS PILLARS SHOWCASE */}
      <section className="section services-showcase-section">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">{t.services.eyebrow}</p>
            <h2>{t.services.title}</h2>
            <p className="section-sub">{t.services.subtitle}</p>
          </div>

          {/* 6 MAIN HEAD CATEGORIES WITH BULLET-POINT SERVICES */}
          <div className="pillars-main-grid">
            {serviceCategories.map((cat, idx) => (
              <div key={cat.id} className="pillar-main-card" id={cat.id}>
                <div className="pillar-card-head">
                  <div className="pillar-icon-box">
                    <ServiceIcon slug={cat.services[0]?.slug} size={28} />
                  </div>
                  <div className="pillar-head-title">
                    <h3>{lang === 'bn' ? cat.nameBn : cat.nameEn}</h3>
                  </div>
                </div>

                <p className="pillar-desc">{lang === 'bn' ? cat.summaryBn : cat.summaryEn}</p>

                <div className="pillar-bullet-section">
                  <span className="bullet-section-title">
                    {lang === 'bn' ? 'বিশেষায়িত সেবাসমূহ:' : 'Specialized Services:'}
                  </span>
                  <ul className="pillar-bullet-list">
                    {cat.services.map((service) => (
                      <li key={service.slug}>
                        <CheckCircle2 size={16} className="pillar-check-icon" />
                        <span>{lang === 'bn' ? service.titleBn : service.titleEn}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pillar-card-actions">
                  <Link
                    to={`/quotation?category=${cat.id}`}
                    className="btn btn-primary btn-sm full-width"
                  >
                    <span>{lang === 'bn' ? 'কোটেশন রিকোয়েস্ট' : 'Request Quotation'}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="services-footer-cta">
            <Link to="/services" className="btn btn-secondary">
              {lang === 'bn' ? 'সকল সার্ভিস এরিয়াস ও বিশেষায়িত সেবা দেখুন' : 'Explore All Service Areas & Capabilities'}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* INTERACTIVE QUOTATION CALCULATOR SECTION */}
      <section className="section calculator-section">
        <div className="container">
          <QuotationCalculator />
        </div>
      </section>

      {/* CASE STUDIES WITH NUMBERS */}
      <section className="section case-studies-section">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">{t.caseStudies.eyebrow}</p>
            <h2>{t.caseStudies.title}</h2>
            <p className="section-sub">{t.caseStudies.subtitle}</p>
          </div>

          <div className="case-studies-grid">
            {caseStudies.map((cs) => (
              <article key={cs.id} className="case-study-card">
                <div className="case-card-header">
                  <div className="case-tag-list">
                    {cs.tags.map(tag => (
                      <span key={tag} className="case-tag-pill">{tag}</span>
                    ))}
                  </div>
                  <span className="case-year">{cs.year}</span>
                </div>

                <h3>{lang === 'bn' ? cs.titleBn : cs.titleEn}</h3>

                <div className="case-client-meta">
                  <p><strong>{t.caseStudies.clientLabel}:</strong> {lang === 'bn' ? cs.clientBn : cs.clientEn}</p>
                  <p><strong>{t.caseStudies.roleLabel}:</strong> {lang === 'bn' ? cs.roleBn : cs.roleEn}</p>
                </div>

                <p className="case-highlight-text">
                  {lang === 'bn' ? cs.highlightBn : cs.highlightEn}
                </p>

                {/* Quantitative Metric Numbers Strip */}
                <div className="case-metrics-grid">
                  {cs.metrics.map((m, idx) => (
                    <div key={idx} className="metric-cell">
                      <strong className="metric-number"><AnimatedCounter value={m.value} /></strong>
                      <span className="metric-label">{lang === 'bn' ? m.labelBn : m.labelEn}</span>
                    </div>
                  ))}
                </div>

                <div className="case-card-action">
                  <Link to="/case-studies" className="btn-read-case">
                    <span>{t.caseStudies.viewFullCase}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* LEADERSHIP & HQ SHOWCASE BANNER */}
      <section className="section leadership-banner-section">
        <div className="container">
          <div className="leadership-box">
            <div className="leadership-copy">
              <span className="eyebrow-accent">{t.about.cardTitle}</span>
              <h2>{company.founder}</h2>
              <p className="leadership-role">{lang === 'bn' ? company.titleBn : company.title}</p>
              <p className="leadership-bio">
                {lang === 'bn'
                  ? 'স্মার্ট ট্রেন্ড ডিজিটালকে একটি উচ্চ-দক্ষতাসম্পন্ন প্রযুক্তিনির্ভর কোম্পানি হিসেবে গড়ে তোলার প্রত্যয়ে আমরা প্রতিটি ক্লায়েন্টকে দীর্ঘমেয়াদী পার্টনার হিসেবে মূল্যায়ন করি। ঢাকার গুলশান এভিনিউস্থ আমাদের হেডকোয়ার্টার থেকে আমরা দেশি ও বিদেশি উভয় ব্র্যান্ডকে আধুনিক ক্রিয়েটিভ ডিজাইন, সফটওয়্যার প্ল্যাটফর্ম ও টেকনিক্যাল ফ্যাসিলিটি ইঞ্জিনিয়ারিং সেবা প্রদান করছি।'
                  : 'Leading Smart Trend Digital from our corporate office at Simpletree Attalika, Gulshan. We combine strategic creative intelligence, enterprise-grade software engineering, and mission-critical MEP facility maintenance under one roof — ending vendor fragmentation for forward-looking organizations.'}
              </p>
              <div className="leadership-affiliations">
                <span className="affil-item"><ShieldCheck size={16} /> BASIS Official Member</span>
                <span className="affil-item"><Award size={16} /> BIIN Strategic Partner</span>
                <span className="affil-item"><Building2 size={16} /> Simpletree Attalika (Level 19)</span>
              </div>
              <div className="leadership-actions">
                <a href={company.phoneHref} className="btn btn-primary">
                  <PhoneCall size={16} />
                  <span>Call {company.phone}</span>
                </a>
                <a href={company.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-outline-white">
                  <MessageCircle size={16} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="leadership-visual">
              <div className="office-card-preview">
                <div className="office-card-head">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                  <span className="terminal-title">STD Corporate Office</span>
                </div>
                <div className="office-card-body">
                  <p><strong>Address:</strong> {lang === 'bn' ? company.addressBn : company.address}</p>
                  <p><strong>Email:</strong> {company.email}</p>
                  <p><strong>Hotline:</strong> {company.phone}</p>
                  <p><strong>Uptime SLA:</strong> 99.98% Monitored</p>
                  <div className="badges-row">
                    <span className="office-badge">BASIS Certified</span>
                    <span className="office-badge">BIIN Partner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA STRIP */}
      <section className="section final-cta-section">
        <div className="container center-copy">
          <h2>{lang === 'bn' ? 'আপনার প্রজেক্টের জন্য প্রস্তুত?' : 'Ready to Transform Your Digital & Facility Operations?'}</h2>
          <p>
            {lang === 'bn'
              ? 'আমাদের সাথে এখনই আলোচনা শুরু করুন। আপনার প্রজেক্টের উপযুক্ত কোটেশন ও পরামর্শ পেতে আমাদের বিশেষজ্ঞ টিমের সাথে যোগাযোগ করুন।'
              : 'Get in touch with our team in Gulshan Avenue for a prompt quotation and consultation.'}
          </p>
          <div className="cta-actions-cluster">
            <Link to="/quotation" className="btn btn-primary btn-large">
              {t.hero.getQuotation} <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn-ghost btn-large">
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
