import React from 'react';
import { useSearchParams } from 'react-router-dom';
import QuotationCalculator from '../components/QuotationCalculator.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { ShieldCheck, MessageCircle, Phone, Clock } from 'lucide-react';
import { company } from '../data/company.js';

export default function Quotation() {
  const [searchParams] = useSearchParams();
  const defaultCategory = searchParams.get('category') || 'web-apps-platforms';
  const defaultSlug = searchParams.get('service') || '';
  const { lang, t } = useLanguage();

  return (
    <div className="page quotation-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{t.quotation.eyebrow}</p>
          <h1>{t.quotation.title}</h1>
          <p className="lead">{t.quotation.subtitle}</p>

          <div className="quotation-guarantees">
            <span className="guarantee-item">
              <Clock size={16} />
              <span>{lang === 'bn' ? '২ কর্মঘণ্টার মধ্যে রেসপন্স' : '2-Hour Response SLA'}</span>
            </span>
            <span className="guarantee-item">
              <ShieldCheck size={16} />
              <span>{lang === 'bn' ? 'স্বচ্ছ ও নির্ভরযোগ্য প্রস্তাবনা' : '100% Transparent Proposals'}</span>
            </span>
            <span className="guarantee-item">
              <MessageCircle size={16} />
              <span>{lang === 'bn' ? 'সরাসরি হোয়াটসঅ্যাপ সাপোর্ট' : 'Direct WhatsApp Follow-up'}</span>
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <QuotationCalculator
            defaultCategory={defaultCategory}
            defaultSlug={defaultSlug}
          />
        </div>
      </section>
    </div>
  );
}
