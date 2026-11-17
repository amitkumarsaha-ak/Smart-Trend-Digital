import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { serviceCategories } from '../data/servicesData.js';
import ServiceIcon from '../components/ServiceIcon.jsx';
import { Search, ArrowRight, CheckCircle2, Filter } from 'lucide-react';

export default function Services() {
  const { t, lang } = useLanguage();
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const displayedCategories = useMemo(() => {
    return serviceCategories.filter(cat => {
      const matchCat = selectedCat === 'all' || cat.id === selectedCat;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchCat;

      const matchCatName = 
        cat.nameEn.toLowerCase().includes(q) ||
        cat.nameBn.toLowerCase().includes(q) ||
        cat.summaryEn.toLowerCase().includes(q) ||
        cat.summaryBn.toLowerCase().includes(q);

      const matchServices = cat.services.some(s => 
        s.titleEn.toLowerCase().includes(q) ||
        s.titleBn.toLowerCase().includes(q) ||
        s.shortEn.toLowerCase().includes(q) ||
        s.shortBn.toLowerCase().includes(q)
      );

      return matchCat && (matchCatName || matchServices);
    });
  }, [selectedCat, searchQuery]);

  return (
    <div className="page services-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{t.services.eyebrow}</p>
          <h1>{t.services.title}</h1>
          <p className="lead">{t.services.subtitle}</p>

          {/* SEARCH BAR */}
          <div className="services-search-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder={lang === 'bn' ? 'যেকোনো সেবা খুঁজুন (যেমন: SEO, Chiller, React, Chatbot, AC)...' : 'Search across all 6 core pillars (e.g. SEO, Chiller, React, Chatbot, AC)...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* CATEGORY FILTER BAR */}
          <div className="category-filter-bar">
            <button
              type="button"
              className={`filter-pill ${selectedCat === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCat('all')}
            >
              <Filter size={15} />
              <span>{t.services.allTab} (6)</span>
            </button>
            {serviceCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`filter-pill ${selectedCat === c.id ? 'active' : ''}`}
                onClick={() => setSelectedCat(c.id)}
              >
                <ServiceIcon slug={c.services[0]?.slug} size={15} />
                <span>{lang === 'bn' ? c.nameBn : c.nameEn}</span>
              </button>
            ))}
          </div>

          {/* 6 MAIN HEAD CATEGORIES WITH BULLET-POINT SERVICES */}
          <div className="pillars-main-grid">
            {displayedCategories.map((cat, idx) => (
              <div key={cat.id} className="pillar-main-card" id={cat.id}>
                <div className="pillar-card-head">
                  <div className="pillar-icon-box">
                    <ServiceIcon slug={cat.services[0]?.slug} size={28} />
                  </div>
                  <div>
                    <span className="pillar-label-badge">{lang === 'bn' ? `পিলার ০${idx + 1}` : `Pillar 0${idx + 1}`}</span>
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

          {displayedCategories.length === 0 && (
            <div className="no-results-box">
              <p>{lang === 'bn' ? 'কোনো সেবা পাওয়া যায়নি। অনুসন্ধান পরিবর্তন করুন।' : 'No services matched your search query. Try clearing the filter.'}</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => { setSelectedCat('all'); setSearchQuery(''); }}
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
