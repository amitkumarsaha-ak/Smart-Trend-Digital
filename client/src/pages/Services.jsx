import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { serviceCategories, allServices } from '../data/servicesData.js';
import ServiceIcon from '../components/ServiceIcon.jsx';
import { Search, ArrowRight, CheckCircle2, ChevronRight, Filter } from 'lucide-react';

export default function Services() {
  const { t, lang } = useLanguage();
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    return allServices.filter(s => {
      const matchCat = selectedCat === 'all' || s.categoryId === selectedCat;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchCat;

      const matchText = 
        s.titleEn.toLowerCase().includes(q) ||
        s.titleBn.toLowerCase().includes(q) ||
        s.shortEn.toLowerCase().includes(q) ||
        s.shortBn.toLowerCase().includes(q) ||
        s.categoryNameEn.toLowerCase().includes(q) ||
        s.categoryNameBn.toLowerCase().includes(q);

      return matchCat && matchText;
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
              placeholder={lang === 'bn' ? 'যেকোনো সেবা খুঁজুন (যেমন: SEO, Chiller, React, Chatbot, AC)...' : 'Search any of our 40+ services (e.g. SEO, Chiller, React, Chatbot, AC)...'}
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
          {/* CATEGORY PILL FILTER */}
          <div className="category-filter-bar">
            <button
              type="button"
              className={`filter-pill ${selectedCat === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCat('all')}
            >
              <Filter size={15} />
              <span>{t.services.allTab} ({allServices.length})</span>
            </button>
            {serviceCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`filter-pill ${selectedCat === c.id ? 'active' : ''}`}
                onClick={() => setSelectedCat(c.id)}
              >
                <ServiceIcon slug={c.services[0]?.slug} size={15} />
                <span>{lang === 'bn' ? c.nameBn : c.nameEn} ({c.services.length})</span>
              </button>
            ))}
          </div>

          {/* RESULTS COUNT */}
          <p className="results-count-text">
            {lang === 'bn' 
              ? `মোট ${filteredServices.length}টি সেবা প্রদর্শিত হচ্ছে`
              : `Showing ${filteredServices.length} specialized services`}
          </p>

          {/* ALL FILTERED SERVICES GRID */}
          <div className="services-master-grid">
            {filteredServices.map((service) => (
              <div key={service.slug} className="master-service-card" id={service.slug}>
                <div className="card-header-line">
                  <span className="card-category-tag">
                    {lang === 'bn' ? service.categoryNameBn : service.categoryNameEn}
                  </span>
                  <span className="card-price-pill">
                    <small>{t.services.startingFrom}</small>
                    <strong>৳ {service.startingPriceBdt}</strong>
                  </span>
                </div>

                <div className="service-title-row">
                  <span className="service-icon-box">
                    <ServiceIcon slug={service.slug} size={22} />
                  </span>
                  <h3>{lang === 'bn' ? service.titleBn : service.titleEn}</h3>
                </div>

                <p className="service-desc-text">
                  {lang === 'bn' ? service.shortBn : service.shortEn}
                </p>

                <div className="deliverables-block">
                  <span className="deliverables-title">{t.services.featuresLabel}:</span>
                  <ul>
                    {(lang === 'bn' ? service.featuresBn : service.featuresEn).map((f, i) => (
                      <li key={i}>
                        <CheckCircle2 size={13} className="check-bullet" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-bottom-actions">
                  <Link
                    to={`/quotation?category=${service.categoryId}&service=${service.slug}`}
                    className="btn btn-primary btn-sm"
                  >
                    <span>{t.services.getQuoteForThis}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
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
