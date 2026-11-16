import React from 'react';
import {
  Palette,
  Layout,
  Sparkles,
  BookOpen,
  Award,
  Megaphone,
  Search,
  FileText,
  Video,
  Radio,
  Vote,
  Share2,
  TrendingUp,
  Newspaper,
  Mic,
  Code,
  Globe,
  Users,
  CalendarCheck,
  Trophy,
  ShoppingCart,
  Wrench,
  Bot,
  Cpu,
  GraduationCap,
  Briefcase,
  Compass,
  Layers,
  Building2,
  Wind,
  Flame,
  ShieldAlert,
  Sliders,
  Volume2,
  UserCheck,
  ClipboardList,
  Zap,
  Droplets,
  CheckCircle,
  HardHat
} from 'lucide-react';

const iconMap = {
  // Brand & Design
  'graphics-design': Palette,
  'ux-ui-design': Layout,
  'brand-identity': Sparkles,
  'print-publication': BookOpen,
  'event-branding': Award,

  // Digital Marketing & Content
  'digital-marketing': Megaphone,
  'seo': Search,
  'content-writing': FileText,
  'video-editing': Video,
  'event-digital-campaigns': Radio,
  'election-association-campaigns': Vote,
  'social-media-management': Share2,
  'paid-ads': TrendingUp,
  'pr-press-releases': Newspaper,
  'podcast-video-production': Mic,

  // Web & Apps
  'web-app-development': Code,
  'domain-hosting': Globe,
  'club-association-portals': Users,
  'event-registration-systems': CalendarCheck,
  'awards-judging-software': Trophy,
  'ecommerce-solutions': ShoppingCart,
  'website-maintenance-packages': Wrench,

  // AI & Automation
  'ai-chatbots': Bot,
  'business-automation': Cpu,
  'ai-training-for-teams': GraduationCap,

  // Consultancy & Training
  'corporate-training': Briefcase,
  'business-consultancy': Compass,
  'digital-transformation-planning': Layers,
  'event-management-support': Award,

  // Facility & Technical Services
  'ac-fcu-servicing': Wind,
  'chiller-solutions': Building2,
  'hvac-amc': Sliders,
  'fire-detection-protection': ShieldAlert,
  'bms-integration': Cpu,
  'pa-voice-evacuation': Volume2,
  'reception-frontdesk-portal': UserCheck,
  'facility-management-portal': ClipboardList,
  'electrical-power-systems': Zap,
  'plumbing-pumps-stp': Droplets,
  'fitout-handover-support': CheckCircle,
  'technical-manpower-outsourcing': HardHat
};

export default function ServiceIcon({ slug, size = 22, className = '' }) {
  const IconComponent = iconMap[slug] || Sparkles;
  return <IconComponent size={size} className={className} />;
}
