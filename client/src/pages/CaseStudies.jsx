import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { caseStudies } from '../data/caseStudiesData.js';
import { ArrowRight, Trophy, Landmark, Users, Building, ShieldCheck, CheckCircle2 } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter.jsx';

export default function CaseStudies() {
  const { t, lang } = useLanguage();

  return (
    <div className="page case-studies-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{t.caseStudies.eyebrow}</p>
          <h1>{t.caseStudies.title}</h1>
          <p className="lead">{t.caseStudies.subtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="case-studies-detail-list">
            {caseStudies.map((cs, idx) => (
              <article key={cs.id} id={cs.id} className="case-study-deep-card">
                <div className="deep-card-grid">
                  <div className="deep-card-main">
                    <div className="deep-card-tag-row">
                      <span className="case-index-pill">0{idx + 1}</span>
                      {cs.tags.map(t => (
                        <span key={t} className="deep-tag">{t}</span>
                      ))}
                      <span className="deep-year">{cs.year}</span>
                    </div>

                    <h2>{lang === 'bn' ? cs.titleBn : cs.titleEn}</h2>

                    <div className="client-role-bar">
                      <p><strong>{t.caseStudies.clientLabel}:</strong> {lang === 'bn' ? cs.clientBn : cs.clientEn}</p>
                      <p><strong>{t.caseStudies.roleLabel}:</strong> {lang === 'bn' ? cs.roleBn : cs.roleEn}</p>
                    </div>

                    <div className="case-narrative">
                      <p className="case-lead-p">{lang === 'bn' ? cs.highlightBn : cs.highlightEn}</p>
                      <p>{lang === 'bn' ? cs.storyBn : cs.storyEn}</p>
                    </div>

                    <div className="deep-card-cta">
                      <Link to="/quotation" className="btn btn-primary">
                        <span>{lang === 'bn' ? 'অনুরূপ প্রজেক্টের জন্য কোটেশন নিন' : 'Request Similar Solution'}</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>

                  <div className="deep-card-aside">
                    <h4>{lang === 'bn' ? 'ফলাফল ও মূল পরিসংখ্যান' : 'Key Quantitative Results'}</h4>
                    <div className="metrics-vertical-stack">
                      {cs.metrics.map((m, i) => (
                        <div key={i} className="metric-box-large">
                          <span className="metric-val-big"><AnimatedCounter value={m.value} /></span>
                          <span className="metric-label-big">{lang === 'bn' ? m.labelBn : m.labelEn}</span>
                        </div>
                      ))}
                    </div>

                    <div className="verified-badge">
                      <ShieldCheck size={16} />
                      <span>{lang === 'bn' ? 'এসটিডি দ্বারা ভেরিফাইড কেস স্টাডি' : 'STD Verified Implementation'}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
