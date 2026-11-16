import React, { useState } from 'react';
import { Mail, MapPin, Phone, Globe, MessageCircle, Send, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import { company } from '../data/company.js';
import { allServices } from '../data/servicesData.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const emptyForm = { name: '', email: '', phone: '', service: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [sending, setSending] = useState(false);
  const { t, lang } = useLanguage();

  function update(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    setSending(true);
    setStatus({ type: '', text: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus({ type: 'error', text: data.error || 'Something went wrong.' });
      } else {
        setStatus({ type: 'ok', text: data.message });
        setForm(emptyForm);
      }
    } catch {
      setStatus({
        type: 'error',
        text: lang === 'bn' ? 'সার্ভারে কানেক্ট করা যায়নি। দয়া করে সরাসরি ফোন বা হোয়াটসঅ্যাপ করুন।' : 'Network error. Please call or email us directly.',
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="page contact-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h1>{t.contact.title}</h1>
          <p className="lead">{t.contact.subtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          {/* CONTACT FORM */}
          <form className="contact-form-card" onSubmit={submit}>
            <h3>{t.contact.formTitle}</h3>
            
            <div className="form-row">
              <label>
                <span>{t.contact.name} *</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={update}
                  placeholder="e.g. Tanvir Ahmed"
                  required
                />
              </label>
              <label>
                <span>{t.contact.email} *</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={update}
                  placeholder="e.g. tanvir@company.com"
                  required
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                <span>{t.contact.phone} *</span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={update}
                  placeholder="+880 1..."
                  required
                />
              </label>
              <label>
                <span>{t.contact.serviceInterest}</span>
                <select name="service" value={form.service} onChange={update}>
                  <option value="">{lang === 'bn' ? '-- সেবা নির্বাচন করুন --' : '-- Select a service --'}</option>
                  {allServices.map((s) => (
                    <option key={s.slug} value={s.titleEn}>
                      {lang === 'bn' ? s.titleBn : s.titleEn}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="full">
              <span>{t.contact.message} *</span>
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={update}
                placeholder={lang === 'bn' ? 'আপনার প্রজেক্টের সংক্ষিপ্ত বিবরণ লিখুন...' : 'Tell us about your project requirements or challenges...'}
                required
              />
            </label>

            {status.text && (
              <p className={`form-status ${status.type}`}>{status.text}</p>
            )}

            <div className="form-submit-row">
              <button className="btn btn-primary btn-submit-contact" type="submit" disabled={sending}>
                <Send size={16} />
                <span>{sending ? t.contact.sending : t.contact.sendBtn}</span>
              </button>

              <a
                href={company.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp-direct"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Direct</span>
              </a>
            </div>
          </form>

          {/* ASIDE CONTACT DETAILS & MAP */}
          <aside className="contact-aside-card">
            <h3>{t.contact.asideTitle}</h3>
            
            <ul className="contact-info-list">
              <li>
                <div className="contact-icon-bubble"><Phone size={18} /></div>
                <div>
                  <span className="contact-label">{t.contact.phoneDirect}</span>
                  <a href={company.phoneHref} className="contact-val">{company.phone}</a>
                </div>
              </li>

              <li>
                <div className="contact-icon-bubble"><MessageCircle size={18} /></div>
                <div>
                  <span className="contact-label">WhatsApp Hotline</span>
                  <a href={company.whatsappHref} target="_blank" rel="noreferrer" className="contact-val">
                    {company.whatsapp}
                  </a>
                </div>
              </li>

              <li>
                <div className="contact-icon-bubble"><Mail size={18} /></div>
                <div>
                  <span className="contact-label">{t.contact.emailDirect}</span>
                  <a href={company.emailHref} className="contact-val">{company.email}</a>
                </div>
              </li>

              <li>
                <div className="contact-icon-bubble"><Globe size={18} /></div>
                <div>
                  <span className="contact-label">Official Website</span>
                  <span className="contact-val">{company.website}</span>
                </div>
              </li>

              <li>
                <div className="contact-icon-bubble"><MapPin size={18} /></div>
                <div>
                  <span className="contact-label">{t.contact.addressTitle}</span>
                  <a href={company.mapsUrl} target="_blank" rel="noreferrer" className="contact-val">
                    {lang === 'bn' ? company.addressBn : company.address}
                  </a>
                </div>
              </li>
            </ul>

            <div className="membership-seals">
              <h4>{t.contact.membershipsTitle}</h4>
              <div className="seals-cluster">
                <span className="seal-badge"><ShieldCheck size={16} /> BASIS Official Member</span>
                <span className="seal-badge"><Award size={16} /> BIIN Partner</span>
              </div>
            </div>

            {/* Google Maps Embed Styled Container */}
            <div className="map-embed-wrapper">
              <iframe
                title="STD Office Location Simpletree Attalika"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.139615560965!2d90.41684307598858!3d23.778044788046808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c77174661845%3A0xea224a1329c2cfc9!2sSimpletree%20Attalika!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                width="100%"
                height="190"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
