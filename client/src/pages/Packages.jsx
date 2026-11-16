import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { servicePackages } from '../data/packagesData.js';
import { CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Packages() {
  const { t, lang } = useLanguage();
  const [currency, setCurrency] = useState('bdt');

  return (
    <div className="page packages-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{t.packages.eyebrow}</p>
          <h1>{t.packages.title}</h1>
          <p className="lead">{t.packages.subtitle}</p>

          <div className="currency-pill-group center-pill">
            <button
              type="button"
              className={`pill-btn ${currency === 'bdt' ? 'active' : ''}`}
              onClick={() => setCurrency('bdt')}
            >
              BDT (৳)
            </button>
            <button
              type="button"
              className={`pill-btn ${currency === 'usd' ? 'active' : ''}`}
              onClick={() => setCurrency('usd')}
            >
              USD ($)
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="packages-grid">
            {servicePackages.map((pkg) => (
              <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                {pkg.popular && (
                  <span className="popular-badge">{t.packages.mostPopular}</span>
                )}
                <h4>{lang === 'bn' ? pkg.nameBn : pkg.nameEn}</h4>
                <p className="package-desc">{lang === 'bn' ? pkg.descriptionBn : pkg.descriptionEn}</p>

                <div className="package-price-wrap">
                  <span className="price-val">
                    {currency === 'bdt' ? `৳ ${pkg.priceBdt}` : `$ ${pkg.priceUsd}`}
                  </span>
                  <span className="period-val">/{lang === 'bn' ? pkg.periodBn : pkg.periodEn}</span>
                </div>

                <ul className="package-features">
                  {(lang === 'bn' ? pkg.featuresBn : pkg.featuresEn).map((f, i) => (
                    <li key={i}>
                      <CheckCircle2 size={15} className="pkg-check" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/quotation?package=${pkg.id}`}
                  className={`btn ${pkg.popular ? 'btn-primary' : 'btn-ghost'} full-width`}
                >
                  {t.packages.bookPackage}
                </Link>
              </div>
            ))}
          </div>

          <div className="packages-guarantee-strip">
            <div className="guarantee-box">
              <ShieldCheck size={28} />
              <div>
                <h4>{lang === 'bn' ? '১০০% কোয়ালিটি নিশ্চয়তা ও সাপোর্ট' : 'Quality Assurance & Dedicated Support'}</h4>
                <p>
                  {lang === 'bn' 
                    ? 'আমাদের প্রতিটি প্যাকেজের সাথে অন্তর্ভুক্ত রয়েছে ডেডিকেটেড সাপোর্ট এবং সিস্টেম ওয়ারেন্টি।'
                    : 'Every package comes backed with our documented SLA, post-delivery support, and warranty.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
