import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { ShieldCheck, Award, Building, Landmark, CheckCircle2 } from 'lucide-react';

export default function ClientStrip() {
  const { t } = useLanguage();

  return (
    <section className="client-strip-section" aria-label="Trusted Clients and Affiliations">
      <div className="container">
        <p className="client-strip-title">{t.clientStrip.title}</p>
        <div className="client-strip-grid">
          {/* BASIS Badge */}
          <div className="client-badge basis-badge">
            <span className="badge-icon-box">
              <ShieldCheck size={20} />
            </span>
            <div className="badge-meta">
              <strong>BASIS</strong>
              <small>{t.clientStrip.memberBasis}</small>
            </div>
          </div>

          {/* BIIN Badge */}
          <div className="client-badge biin-badge">
            <span className="badge-icon-box">
              <Award size={20} />
            </span>
            <div className="badge-meta">
              <strong>BIIN</strong>
              <small>{t.clientStrip.memberBiin}</small>
            </div>
          </div>

          {/* BIIN Awards 2026 */}
          <div className="client-badge">
            <span className="badge-icon-box">
              <Award size={20} />
            </span>
            <div className="badge-meta">
              <strong>BIIN Awards 2026</strong>
              <small>Campaign & Judging</small>
            </div>
          </div>

          {/* Gulshan Club */}
          <div className="client-badge">
            <span className="badge-icon-box">
              <Landmark size={20} />
            </span>
            <div className="badge-meta">
              <strong>Gulshan Club</strong>
              <small>Member Portal & Access</small>
            </div>
          </div>

          {/* Saints Club */}
          <div className="client-badge">
            <span className="badge-icon-box">
              <Building size={20} />
            </span>
            <div className="badge-meta">
              <strong>Saints Club</strong>
              <small>Tournament Engine</small>
            </div>
          </div>

          {/* Gulshan Society */}
          <div className="client-badge">
            <span className="badge-icon-box">
              <CheckCircle2 size={20} />
            </span>
            <div className="badge-meta">
              <strong>Gulshan Society</strong>
              <small>Community Platform</small>
            </div>
          </div>

          {/* Simpletree Attalika */}
          <div className="client-badge">
            <span className="badge-icon-box">
              <Building size={20} />
            </span>
            <div className="badge-meta">
              <strong>Simpletree Attalika</strong>
              <small>Level 19 Gulshan HQ</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
