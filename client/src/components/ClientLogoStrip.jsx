import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { Sparkles } from 'lucide-react';
import AgencyMarquee from './AgencyMarquee.jsx';

// Row 1 Client Logos (Commercial clients only - zero overlap with ClientStrip)
const row1Logos = [
  {
    id: 'ssg',
    name: 'Super Star Group (SSG)',
    nameBn: 'সুপার স্টার গ্রুপ (SSG)',
    logo: '/clients/ssg.png',
    alt: 'Super Star Group SSG Logo'
  },
  {
    id: 'ayal-corp',
    name: 'Ayal Corp Limited',
    nameBn: 'আয়াল কর্পোরেশন লিমিটেড',
    logo: '/clients/ayal-corp.png',
    alt: 'Ayal Corp Limited Logo'
  },
  {
    id: 'metronet',
    name: 'MetroNet Bangladesh',
    nameBn: 'মেট্রোনেট বাংলাদেশ',
    logo: '/clients/metronet.png',
    alt: 'MetroNet We do IT Logo'
  },
  {
    id: 'eyhost',
    name: 'EYHOST',
    nameBn: 'আইহোস্ট (EYHOST)',
    logo: '/clients/eyhost.png',
    alt: 'EYHOST Logo'
  },
  {
    id: 'flora-systems',
    name: 'Flora Systems',
    nameBn: 'ফ্লোরা সিস্টেমস',
    logo: '/clients/flora-systems.png',
    alt: 'Flora Systems Logo'
  },
  {
    id: 'srrk-it',
    name: 'SRRK IT LTD',
    nameBn: 'এসআরআরকে আইটি লিমিটেড',
    logo: '/clients/srrk-it.png',
    alt: 'SRRK IT LTD Logo'
  },
  {
    id: 'sbes-kinderland',
    name: 'Singapore School Kinderland',
    nameBn: 'সিঙ্গাপুর স্কুল কিন্ডারল্যান্ড (SBES)',
    logo: '/clients/sbes-kinderland.png',
    alt: 'Singapore School Kinderland SBES Logo'
  },
  {
    id: 'hypertag',
    name: 'HyperTAG',
    nameBn: 'হাইপারট্যাগ (HyperTAG)',
    logo: '/clients/hypertag.png',
    alt: 'HyperTAG Logo'
  }
];

// Row 2 Client Logos (Commercial clients only - zero overlap with ClientStrip)
const row2Logos = [
  {
    id: 'xii',
    name: 'XII',
    nameBn: 'এক্সআইআই (XII)',
    logo: '/clients/xii.png',
    alt: 'XII Logo'
  },
  {
    id: 'solution9',
    name: 'Solution9',
    nameBn: 'সল্যুশন৯ (Solution9)',
    logo: '/clients/solution9.png',
    alt: 'Solution9 Logo'
  },
  {
    id: 'team-success',
    name: 'Team Success',
    nameBn: 'টিম সাকসেস (Team Success)',
    logo: '/clients/team-success.png',
    alt: 'Team Success Logo'
  },
  {
    id: 'reddata',
    name: 'RedData',
    nameBn: 'রেডডাটা (RedData)',
    logo: '/clients/reddata.png',
    alt: 'RedData Logo'
  },
  {
    id: 'smart-lab',
    name: 'Smart-Lab',
    nameBn: 'স্মার্ট-ল্যাব (Smart-Lab)',
    logo: '/clients/smart-lab.png',
    alt: 'Smart-Lab Logo'
  },
  {
    id: 'fingertips',
    name: 'Fingertips Innovations',
    nameBn: 'ফিঙ্গারটিপস ইনোভেশনস লিমিটেড',
    logo: '/clients/fingertips.png',
    alt: 'Fingertips Innovations Limited Logo'
  },
  {
    id: 'digidot',
    name: 'digidot',
    nameBn: 'ডিজিডট',
    logo: '/clients/digidot.png',
    alt: 'digidot Logo'
  }
];

export default function ClientLogoStrip() {
  const { t, lang } = useLanguage();

  return (
    <section className="client-logo-strip-section" aria-label="Trusted by Leading Brands, Corporations & Institutions">
      <div className="container">
        {/* Header */}
        <div className="client-strip-header">
          <div className="client-strip-pill">
            <Sparkles size={13} className="strip-sparkle-icon" />
            <span>{t.clientLogos?.eyebrow || 'OUR CLIENTS & PARTNERS'}</span>
          </div>
          <h2 className="client-strip-main-title">
            {t.clientLogos?.title || 'Trusted by Leading Brands, Corporations & Institutions'}
          </h2>
          <p className="client-strip-subtitle">
            {t.clientLogos?.subtitle ||
              "Empowering visionary enterprises, tech pioneers, and premier organizations across Bangladesh with world-class digital solutions."}
          </p>
        </div>

        {/* 2-Row Infinite Logo Marquee (Only logos, no text) */}
        <div className="client-2row-marquee-stack">
          {/* Row 1: Scrolling Left */}
          <AgencyMarquee speed={32} direction="left" pauseOnHover={true}>
            <div className="client-pure-row marquee-inner-row">
              {row1Logos.map((client) => (
                <div
                  key={client.id}
                  className="client-badge client-logo-pure-card"
                  title={lang === 'bn' ? client.nameBn : client.name}
                >
                  <img
                    src={client.logo}
                    alt={client.alt}
                    className={`client-pure-logo-img logo-${client.id}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </AgencyMarquee>

          {/* Row 2: Scrolling Right (Reverse) */}
          <AgencyMarquee speed={34} direction="right" pauseOnHover={true}>
            <div className="client-pure-row marquee-inner-row">
              {row2Logos.map((client) => (
                <div
                  key={client.id}
                  className="client-badge client-logo-pure-card"
                  title={lang === 'bn' ? client.nameBn : client.name}
                >
                  <img
                    src={client.logo}
                    alt={client.alt}
                    className={`client-pure-logo-img logo-${client.id}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </AgencyMarquee>
        </div>
      </div>
    </section>
  );
}
