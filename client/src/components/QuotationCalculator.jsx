import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { serviceCategories } from '../data/servicesData.js';
import { company } from '../data/company.js';
import { Calculator, Check, ArrowRight, MessageCircle, Send, Printer, Sparkles, AlertCircle } from 'lucide-react';
import ServiceIcon from './ServiceIcon.jsx';

export default function QuotationCalculator({ defaultCategory = 'web-apps-platforms', defaultSlug = '' }) {
  const { t, lang } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [selectedService, setSelectedService] = useState(defaultSlug || '');
  const [scope, setScope] = useState('growth');
  const [deadline, setDeadline] = useState('month');
  const [clientInfo, setClientInfo] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  // Available services in selected category
  const activeCategory = useMemo(() => {
    return serviceCategories.find(c => c.id === selectedCategory) || serviceCategories[0];
  }, [selectedCategory]);

  // Set default selected service when category changes
  React.useEffect(() => {
    if (!selectedService || !activeCategory.services.some(s => s.slug === selectedService)) {
      setSelectedService(activeCategory.services[0]?.slug || '');
    }
  }, [selectedCategory, activeCategory]);

  const currentServiceObj = useMemo(() => {
    return activeCategory.services.find(s => s.slug === selectedService) || activeCategory.services[0];
  }, [activeCategory, selectedService]);

  const handleInputChange = (e) => {
    setClientInfo({ ...clientInfo, [e.target.name]: e.target.value });
  };

  // Generate clean formatted text for WhatsApp
  const generateQuotationSummaryText = () => {
    const catName = lang === 'bn' ? activeCategory.nameBn : activeCategory.nameEn;
    const srvName = lang === 'bn' ? currentServiceObj?.titleBn : currentServiceObj?.titleEn;
    const scopeLabel = scope === 'essential' ? t.quotation.scopeEssential : (scope === 'growth' ? t.quotation.scopeGrowth : t.quotation.scopeEnterprise);
    const deadlineLabel = deadline === 'urgent' ? t.quotation.deadlineUrgent : (deadline === 'month' ? t.quotation.deadlineMonth : t.quotation.deadlineExtended);

    return `*SMART TREND DIGITAL (STD) - Quotation Request*\n\n` +
      `*Client:* ${clientInfo.name || 'Not provided'} (${clientInfo.company || 'Organization'})\n` +
      `*Phone:* ${clientInfo.phone || 'N/A'} | *Email:* ${clientInfo.email || 'N/A'}\n\n` +
      `*Category:* ${catName}\n` +
      `*Service:* ${srvName}\n` +
      `*Project Scope:* ${scopeLabel}\n` +
      `*Timeline:* ${deadlineLabel}\n` +
      `*Quotation Type:* Custom Corporate Proposal\n\n` +
      `*Project Notes:*\n${clientInfo.notes || 'No specific notes entered.'}\n\n` +
      `Sent via www.std.com.bd`;
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(generateQuotationSummaryText());
    window.open(`https://wa.me/${company.whatsappClean}?text=${text}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSubmitApi = async (e) => {
    e.preventDefault();
    if (!clientInfo.name || !clientInfo.email || !clientInfo.phone) {
      alert(lang === 'bn' ? 'অনুগ্রহ করে নাম, ইমেইল এবং ফোন নম্বর প্রদান করুন।' : 'Please fill in your name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    const payload = {
      name: clientInfo.name,
      company: clientInfo.company,
      email: clientInfo.email,
      phone: clientInfo.phone,
      serviceCategory: activeCategory.nameEn,
      service: currentServiceObj?.titleEn,
      scope,
      deadline,
      message: clientInfo.notes || 'Quotation generated online',
      type: 'quotation_request'
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setSubmitResult({ success: true, message: t.quotation.successDesc });
      } else {
        setSubmitResult({ success: false, message: data.error || 'Submission failed. Please send via WhatsApp or email.' });
      }
    } catch {
      setSubmitResult({
        success: false,
        message: lang === 'bn' 
          ? 'সার্ভারে কানেক্ট করা যায়নি। দয়া করে সরাসরি হোয়াটসঅ্যাপে পাঠান।' 
          : 'Could not reach server. Please send via WhatsApp directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="quotation-calculator-container" id="calculator">
      <div className="calc-header">
        <div className="calc-header-copy">
          <p className="eyebrow">{t.quotation.eyebrow}</p>
          <h2>{t.quotation.title}</h2>
          <p className="calc-subtitle">{t.quotation.subtitle}</p>
        </div>
      </div>

      <div className="calc-grid">
        {/* LEFT COLUMN: CONFIGURATION STEPS */}
        <div className="calc-config-column">
          {/* STEP 1: CATEGORY */}
          <div className="calc-step-card">
            <label className="step-label">{t.quotation.step1Title}</label>
            <div className="category-select-grid">
              {serviceCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`cat-card-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span className="cat-icon-wrap">
                    <ServiceIcon slug={cat.services[0]?.slug} size={18} />
                  </span>
                  <span className="cat-title">{lang === 'bn' ? cat.nameBn : cat.nameEn}</span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2: SPECIFIC SERVICE */}
          <div className="calc-step-card">
            <label className="step-label">{t.quotation.step2Title}</label>
            <select
              className="calc-select"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              {activeCategory.services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {lang === 'bn' ? s.titleBn : s.titleEn}
                </option>
              ))}
            </select>
            <p className="service-quick-hint">
              {lang === 'bn' ? currentServiceObj?.shortBn : currentServiceObj?.shortEn}
            </p>
          </div>

          {/* STEP 3: SCOPE & SCALE */}
          <div className="calc-step-card">
            <label className="step-label">{t.quotation.step3Title}</label>
            <div className="scope-options-grid">
              <label className={`scope-option ${scope === 'essential' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="scope"
                  value="essential"
                  checked={scope === 'essential'}
                  onChange={() => setScope('essential')}
                />
                <span className="scope-title">{t.quotation.scopeEssential}</span>
                <span className="scope-desc">{lang === 'bn' ? 'প্রাথমিক বা বাজেট-বান্ধব সেটআপ' : 'Lean MVP, core features'}</span>
              </label>

              <label className={`scope-option ${scope === 'growth' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="scope"
                  value="growth"
                  checked={scope === 'growth'}
                  onChange={() => setScope('growth')}
                />
                <span className="scope-title">{t.quotation.scopeGrowth} (Recommended)</span>
                <span className="scope-desc">{lang === 'bn' ? 'গ্রোথ ফোকাসড, ফুল ফিচার সেট' : 'Balanced, high-conversion stack'}</span>
              </label>

              <label className={`scope-option ${scope === 'enterprise' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="scope"
                  value="enterprise"
                  checked={scope === 'enterprise'}
                  onChange={() => setScope('enterprise')}
                />
                <span className="scope-title">{t.quotation.scopeEnterprise}</span>
                <span className="scope-desc">{lang === 'bn' ? 'কাস্টম আর্কিটেকচার ও পূর্ণ সাপোর্ট' : 'High concurrency, bespoke SLA'}</span>
              </label>
            </div>
          </div>

          {/* STEP 4: TIMELINE */}
          <div className="calc-step-card">
            <label className="step-label">{t.quotation.step5Title}</label>
            <div className="deadline-pills">
              <button
                type="button"
                className={`deadline-btn ${deadline === 'urgent' ? 'active' : ''}`}
                onClick={() => setDeadline('urgent')}
              >
                {t.quotation.deadlineUrgent}
              </button>
              <button
                type="button"
                className={`deadline-btn ${deadline === 'month' ? 'active' : ''}`}
                onClick={() => setDeadline('month')}
              >
                {t.quotation.deadlineMonth}
              </button>
              <button
                type="button"
                className={`deadline-btn ${deadline === 'extended' ? 'active' : ''}`}
                onClick={() => setDeadline('extended')}
              >
                {t.quotation.deadlineExtended}
              </button>
              <button
                type="button"
                className={`deadline-btn ${deadline === 'flexible' ? 'active' : ''}`}
                onClick={() => setDeadline('flexible')}
              >
                {t.quotation.deadlineFlexible}
              </button>
            </div>
          </div>

          {/* STEP 5: CONTACT INFO */}
          <div className="calc-step-card contact-subform">
            <label className="step-label">{t.quotation.step6Title}</label>
            <div className="input-row">
              <input
                type="text"
                name="name"
                placeholder={t.quotation.nameLabel}
                value={clientInfo.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="company"
                placeholder={t.quotation.companyLabel}
                value={clientInfo.company}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-row">
              <input
                type="email"
                name="email"
                placeholder={t.quotation.emailLabel}
                value={clientInfo.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder={t.quotation.phoneLabel}
                value={clientInfo.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <textarea
              name="notes"
              rows="3"
              placeholder={t.quotation.notesPlaceholder}
              value={clientInfo.notes}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: DYNAMIC QUOTATION SUMMARY CARD */}
        <div className="calc-summary-column">
          <div className="summary-sticky-card printable-area">
            <div className="summary-card-header">
              <span className="summary-kicker">SMART TREND DIGITAL</span>
              <h3>{t.quotation.summaryTitle}</h3>
              <p className="summary-date">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>

            <div className="summary-breakdown">
              <div className="breakdown-row">
                <span className="meta-label">{lang === 'bn' ? 'সার্ভিস ক্যাটাগরি:' : 'Category:'}</span>
                <span className="meta-val">{lang === 'bn' ? activeCategory.nameBn : activeCategory.nameEn}</span>
              </div>
              <div className="breakdown-row highlight-service">
                <span className="meta-label">{lang === 'bn' ? 'নির্বাচিত সেবা:' : 'Selected Service:'}</span>
                <span className="meta-val font-bold">{lang === 'bn' ? currentServiceObj.titleBn : currentServiceObj.titleEn}</span>
              </div>
              <div className="breakdown-row">
                <span className="meta-label">{lang === 'bn' ? 'কাজের পরিধি:' : 'Scope:'}</span>
                <span className="meta-val capitalize">{scope}</span>
              </div>
              <div className="breakdown-row">
                <span className="meta-label">{lang === 'bn' ? 'ডেলিভারি লক্ষ্য:' : 'Timeline:'}</span>
                <span className="meta-val capitalize">{deadline}</span>
              </div>

              {/* Deliverables checklist preview */}
              <div className="summary-deliverables">
                <p className="deliverables-heading">{lang === 'bn' ? 'অন্তর্ভুক্ত ডেলিভারেবলসমূহ:' : 'Included Deliverables:'}</p>
                <ul>
                  {(lang === 'bn' ? currentServiceObj.featuresBn : currentServiceObj.featuresEn).map((f, i) => (
                    <li key={i}>
                      <Check size={14} className="check-icon" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Official Custom Quotation Scope Card */}
              <div className="summary-total-box">
                <span className="total-label">{lang === 'bn' ? 'অফিশিয়াল কোটেশন' : 'Official Proposal'}</span>
                <div className="total-price-number quote-callout">
                  {lang === 'bn' ? 'কাস্টম কোটেশন' : 'Custom Scope Quote'}
                </div>
                <small className="total-disclaimer">
                  {lang === 'bn' 
                    ? '*আপনার প্রজেক্টের রিকোয়ারমেন্ট অনুযায়ী আমাদের টিম সরাসরি আপনার সাথে যোগাযোগ করে দ্রুততম সময়ে কোটেশন প্রদান করবে।'
                    : '*Our executive team in Gulshan Avenue will review your scope and provide a formal quotation.'}
                </small>
              </div>
            </div>

            {submitResult && (
              <div className={`submit-feedback ${submitResult.success ? 'success' : 'error'}`}>
                {submitResult.success ? <Sparkles size={16} /> : <AlertCircle size={16} />}
                <span>{submitResult.message}</span>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="summary-actions no-print">
              <button
                type="button"
                className="btn-action btn-whatsapp"
                onClick={handleSendWhatsApp}
              >
                <MessageCircle size={18} />
                <span>{t.quotation.sendWhatsApp}</span>
              </button>

              <button
                type="button"
                className="btn-action btn-submit"
                onClick={handleSubmitApi}
                disabled={isSubmitting}
              >
                <Send size={18} />
                <span>{isSubmitting ? t.quotation.submitting : t.quotation.submitRequest}</span>
              </button>

              <button
                type="button"
                className="btn-action btn-print"
                onClick={handlePrint}
              >
                <Printer size={18} />
                <span>{t.quotation.printPdf}</span>
              </button>
            </div>

            <div className="summary-footer-meta">
              <span>{company.address}</span>
              <span>{company.phone} Â· {company.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
