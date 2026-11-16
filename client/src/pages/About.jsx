import React from 'react';
import { Link } from 'react-router-dom';
import { company } from '../data/company.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { ShieldCheck, Award, MapPin, Phone, Mail, Globe, CheckCircle2, ArrowRight, Sparkles, Building2, Users } from 'lucide-react';

export default function About() {
  const { t, lang } = useLanguage();

  return (
    <div className="page about-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h1>{t.about.title}</h1>
          <p className="lead">{t.about.subtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="container split-about">
          <div className="about-narrative-col">
            <h2>{lang === 'bn' ? 'আমাদের গল্প ও দর্শন' : 'Who We Are'}</h2>
            <p>
              {lang === 'bn'
                ? `স্মার্ট ট্রেন্ড ডিজিটাল (এসটিডি) প্রতিষ্ঠিত হয়েছে ${company.founder} এর নেতৃত্বে। বাংলাদেশে প্রযুক্তিগত উদ্ভাবন, আধুনিক ডিজাইন এবং বিল্ডিং ফ্যাসিলিটি ইঞ্জিনিয়ারিংয়ের সমন্বয় করে আমরা প্রতিষ্ঠানগুলোকে আরও দক্ষ ও আকর্ষণীয় করে তুলি।`
                : `Smart Trend Digital (STD) was founded by ${company.founder} to bring strategic clarity, visual craft, and hard-nosed engineering into one accountable team. Too many businesses in Bangladesh still struggle with vendor fragmentation — hiring separate designers, marketers, coders, and MEP technicians. STD eliminates that friction.`}
            </p>
            <p>
              {lang === 'bn'
                ? `আমাদের অফিস ঢাকার বাণিজ্যিক প্রাণকেন্দ্র গুলশান এভিনিউতে অবস্থিত সিম্পলট্রি অট্টালিকার ১৯ তলায়। এখান থেকে আমরা দেশের শীর্ষ ক্লাব, জাতীয় অ্যাওয়ার্ড অনুষ্ঠান এবং প্রবৃদ্ধিশীল কোম্পানিগুলোকে সেবা দিয়ে আসছি।`
                : `Operating from our corporate office at ${company.address}, we serve high-profile clubs, national innovation awards, commercial real estate developers, and ambitious SMEs who demand international digital standards paired with deep local understanding.`}
            </p>

            <div className="about-credentials-box">
              <h3>{lang === 'bn' ? 'স্বীকৃতি ও প্রাতিষ্ঠানিক সদস্যপদ' : 'Institutional Memberships'}</h3>
              <div className="cred-cards-grid">
                <div className="cred-item-card">
                  <ShieldCheck size={24} className="cred-icon" />
                  <div>
                    <strong>BASIS Member</strong>
                    <p>Bangladesh Association of Software and Information Services</p>
                  </div>
                </div>
                <div className="cred-item-card">
                  <Award size={24} className="cred-icon" />
                  <div>
                    <strong>BIIN Partner</strong>
                    <p>Strategic Partner & Digital Campaign Provider for BIIN Awards 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="about-card-col">
            <div className="about-image-card">
              <div className="about-image-header">
                <div className="about-badge-row">
                  <span className="pulse-indicator" />
                  <span className="about-hub-title">{lang === 'bn' ? 'এসটিডি ইনোভেশন ও টেকনিক্যাল হাব' : 'STD Innovation & Engineering Hub'}</span>
                </div>
              </div>

              <div className="about-photo-wrapper">
                <img
                  src="/std-team.jpg"
                  alt="Smart Trend Digital Team Collaboration"
                  className="about-team-photo"
                />
              </div>

              <div className="about-card-details">
                <h4>Smart Trend Digital (STD)</h4>
                <p className="about-card-address">
                  <MapPin size={14} className="pin-icon" />
                  <span>Simpletree Attalika (Level 19), 134 Gulshan Avenue, Dhaka</span>
                </p>
                <div className="about-stats-mini">
                  <div className="mini-stat">
                    <strong>8+</strong>
                    <span>{lang === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Years Experience'}</span>
                  </div>
                  <div className="mini-stat">
                    <strong>40+</strong>
                    <span>{lang === 'bn' ? 'সেবাসমূহ' : 'Specialized Services'}</span>
                  </div>
                  <div className="mini-stat">
                    <strong>24/7</strong>
                    <span>{lang === 'bn' ? 'ইঞ্জিনিয়ারিং সাপোর্ট' : 'Engineering SLA'}</span>
                  </div>
                </div>
                <div className="about-card-tags">
                  <span className="tag-chip">BASIS Certified</span>
                  <span className="tag-chip">BIIN Strategic Partner</span>
                  <span className="tag-chip">Full-Stack Digital + MEP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PRINCIPLES */}
      <section className="section muted-section">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">{t.about.visionTitle}</p>
            <h2>{lang === 'bn' ? 'আমাদের কাজের ৩টি মূল ভিত্তি' : 'Our Three Operating Pillars'}</h2>
          </div>

          <div className="values-grid">
            <article className="value-card">
              <span className="value-num">01</span>
              <h3>{t.about.p1}</h3>
              <p>{t.about.p1Desc}</p>
            </article>
            <article className="value-card">
              <span className="value-num">02</span>
              <h3>{t.about.p2}</h3>
              <p>{t.about.p2Desc}</p>
            </article>
            <article className="value-card">
              <span className="value-num">03</span>
              <h3>{t.about.p3}</h3>
              <p>{t.about.p3Desc}</p>
            </article>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="section stats-strip-section">
        <div className="container stats-flex">
          {company.stats.map((s, idx) => (
            <div key={idx} className="stat-unit">
              <strong>{s.value}</strong>
              <span>{lang === 'bn' ? s.labelBn : s.labelEn}</span>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="section">
        <div className="container center-copy">
          <h2>{lang === 'bn' ? 'চলুন আপনার পরবর্তী উদ্যোগ শুরু করি' : 'Let us build the next chapter of your brand'}</h2>
          <p>
            {lang === 'bn' 
              ? 'ওয়েবসাইট, ডিজিটাল ক্যাম্পেইন কিংবা সেন্ট্রাল ফ্যাসিলিটি সার্ভিস — আমাদের বিশেষজ্ঞ দল প্রস্তুত।'
              : 'Whether you require a new web platform, a high-converting growth campaign, or full facility MEP contracts.'}
          </p>
          <Link to="/contact" className="btn btn-primary">
            {t.nav.contact} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
