import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import AgencyMarquee from './AgencyMarquee.jsx';

const clientLogos = [
  {
    id: 'simpletree',
    name: 'Simpletree Attalika',
    nameBn: 'সিম্পলট্রি অট্টালিকা',
    logo: '/clients/simpletree.png',
    alt: 'Simpletree Attalika Logo'
  },
  {
    id: 'basis',
    name: 'BASIS',
    nameBn: 'বেসিস (BASIS)',
    logo: '/clients/basis.png',
    alt: 'BASIS Logo'
  },
  {
    id: 'gulshan-club',
    name: 'Gulshan Club',
    nameBn: 'গুলশান ক্লাব',
    logo: '/clients/gulshan-club.png',
    alt: 'Gulshan Club Logo'
  },
  {
    id: 'gulshan-society',
    name: 'Gulshan Society',
    nameBn: 'গুলশান সোসাইটি',
    logo: '/clients/gulshan-society.png',
    alt: 'Gulshan Society Logo'
  },
  {
    id: 'saints-club',
    name: 'Saints Club',
    nameBn: 'সেইন্টস ক্লাব',
    logo: '/clients/saints-club.png',
    alt: 'Saints Club Logo'
  },
  {
    id: 'biin-awards-2026',
    name: 'Bangladesh ICT & Innovation Awards 2026',
    nameBn: 'বাংলাদেশ আইসিটি অ্যান্ড ইনোভেশন অ্যাওয়ার্ডস ২০২৬',
    logo: '/clients/biin-awards-2026.png',
    alt: 'Bangladesh ICT and Innovation Awards 2026 Logo'
  },
  {
    id: 'biin',
    name: 'BIIN',
    nameBn: 'বিআইআইএন (BIIN)',
    logo: '/clients/biin.png',
    alt: 'Bangladesh ICT and Innovation Network Logo'
  }
];

export default function ClientStrip() {
  const { t, lang } = useLanguage();

  return (
    <section className="client-strip-section" aria-label="Trusted Clients and Affiliations">
      <div className="container">
        <p className="client-strip-title">{t.clientStrip.title}</p>
        <AgencyMarquee speed={32} pauseOnHover={true}>
          <div className="client-strip-grid marquee-inner-row">
            {clientLogos.map((client) => (
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
    </section>
  );
}
