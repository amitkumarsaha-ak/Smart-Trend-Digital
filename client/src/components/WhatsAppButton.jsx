import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, CheckCheck, Sparkles } from 'lucide-react';
import { company } from '../data/company.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { lang } = useLanguage();
  const chatMessagesEndRef = useRef(null);

  const initialGreeting = lang === 'bn'
    ? 'আসসালামু আলাইকুম! স্মার্ট ট্রেন্ড ডিজিটাল (STD)-এ আপনাকে স্বাগতম। আপনার প্রজেক্ট বা সেবার বিষয়ে কীভাবে সাহায্য করতে পারি?'
    : 'Hello! Welcome to Smart Trend Digital. How can we help you today with your web, digital marketing, AI, or facility project?';

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: initialGreeting,
      time: 'Just now'
    }
  ]);

  const quickPrompts = [
    {
      label: lang === 'bn' ? '🌐 ওয়েব ও অ্যাপ ডেভেলপমেন্ট' : '🌐 Web & App Development',
      query: lang === 'bn' ? 'ওয়েব ও অ্যাপ ডেভেলপমেন্ট সার্ভিস সম্পর্কে জানতে চাই।' : 'Tell me about your Web & App Development services.'
    },
    {
      label: lang === 'bn' ? '🤖 এআই চ্যাটবট ও অটোমেশন' : '🤖 AI Chatbots & Automation',
      query: lang === 'bn' ? 'এআই চ্যাটবট ও অটোমেশন সল্যুশন কেমন?' : 'I need info on AI Chatbots & Business Automation.'
    },
    {
      label: lang === 'bn' ? '📈 ডিজিটাল মার্কেটিং ও এসইও' : '📈 Digital Marketing & SEO',
      query: lang === 'bn' ? 'ডিজিটাল মার্কেটিং প্যাকেজ কী কী আছে?' : 'What digital marketing & SEO packages do you offer?'
    },
    {
      label: lang === 'bn' ? '❄️ ফ্যাসিলিটি ও এইচভিএসি (MEP)' : '❄️ Facility & HVAC (MEP)',
      query: lang === 'bn' ? 'সেন্ট্রাল এসি ও ফ্যাসিলিটি ইঞ্জিনিয়ারিং সেবা সম্পর্কে বলুন।' : 'Tell me about your Facility & MEP engineering support.'
    },
    {
      label: lang === 'bn' ? '💰 প্রজেক্ট কোটেশন ও বাজেট' : '💰 Pricing & Quotation',
      query: lang === 'bn' ? 'একটি প্রজেক্টের আনুমানিক কোটেশন কীভাবে পেতে পারি?' : 'How can I get an estimated project quotation?'
    }
  ];

  const scrollToBottom = () => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setUnread(false);
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  const getBotResponse = (userText) => {
    const lower = userText.toLowerCase();

    if (lower.includes('web') || lower.includes('app') || lower.includes('ওয়েব') || lower.includes('অ্যাপ') || lower.includes('react') || lower.includes('software')) {
      return lang === 'bn'
        ? 'আমাদের সফটওয়্যার টিম কাস্টম React, Next.js, ই-কমার্স এবং মোবাইল অ্যাপ্লিকেশনে পারদর্শী। আপনি ওয়েবসাইটের "Get a Quotation" পেজে গিয়ে তাৎক্ষণিক প্রজেক্ট এস্টিমেট পেতে পারেন অথবা আমাদের সাথে সরাসরি কথা বলুন: +880 18545-55530।'
        : 'Our engineering division develops custom React, Next.js, e-commerce, and mobile applications. You can generate an instant quote on our "Get a Quotation" page, or call our team directly at +880 18545-55530.';
    }

    if (lower.includes('ai') || lower.includes('chatbot') || lower.includes('automation') || lower.includes('এআই') || lower.includes('বট') || lower.includes('অটোমেশন')) {
      return lang === 'bn'
        ? 'আমরা বাংলা ও ইংরেজি উভয় ভাষায় ইন্টেলিজেন্ট এআই চ্যাটবট এবং বিজনেস অটোমেশন ওয়ার্কফ্লো ডেভেলপ করি। আপনার বিজনেসের জন্য কাস্টম ডেমো পেতে আমাদের গুলশান অফিসে যোগাযোগ করতে পারেন।'
        : 'We design intelligent dual-language AI chatbots and automated CRM pipelines for businesses. Reach out to our Gulshan office for a custom AI architecture demo!';
    }

    if (lower.includes('mep') || lower.includes('ac') || lower.includes('hvac') || lower.includes('chiller') || lower.includes('ফ্যাসিলিটি') || lower.includes('এসি') || lower.includes('চিলার')) {
      return lang === 'bn'
        ? 'আমাদের সেন্ট্রাল ফ্যাসিলিটি ইঞ্জিনিয়ারিং টিম সেন্ট্রাল এসি, চিলার, ফায়ার প্রটেকশন ও বিএমএস মেইনটেন্যান্স (AMC) সেবা প্রদান করে। হটলাইন: +880 18545-55530।'
        : 'Our central facility MEP division handles VRF, chillers, fire detection, and 24/7 preventative maintenance contracts (AMC). Direct hotline: +880 18545-55530.';
    }

    if (lower.includes('price') || lower.includes('cost') || lower.includes('দাম') || lower.includes('খরচ') || lower.includes('বাজেট') || lower.includes('প্যাকেজ') || lower.includes('quote') || lower.includes('কোটেশন')) {
      return lang === 'bn'
        ? 'আমাদের স্ট্যান্ডার্ড ওয়েবসাইট প্যাকেজ ৩৫,০০০৳ থেকে এবং ডিজিটাল মার্কেটিং ২৫,০০০৳/মাস থেকে শুরু। আমাদের "Packages" মেনুতে গিয়ে বিস্তারিত তালিকা দেখতে পারেন।'
        : 'Our web launchpad starts from ৳35,000 and marketing packages start from ৳25,000/mo. Check out our "Packages" section for comprehensive pricing.';
    }

    if (lower.includes('marketing') || lower.includes('seo') || lower.includes('মার্কেটিং') || lower.includes('এসইও') || lower.includes('ads') || lower.includes('বিজ্ঞাপন')) {
      return lang === 'bn'
        ? 'আমরা রেজাল্ট-ড্রিভেন মেটা ও গুগল অ্যাডস, সোশ্যাল মিডিয়া গ্রোথ এবং টেকনিক্যাল এসইও সেবা দেই। আমরা BIIN Awards 2026 এর অফিসিয়াল ডিজিটাল ক্যাম্পেইন পার্টনার।'
        : 'We deliver high-ROAS Meta & Google Ads, technical SEO, and social media management. We are the official digital campaign partner for BIIN Awards 2026.';
    }

    return lang === 'bn'
      ? `ধন্যবাদ আপনার বার্তার জন্য! স্মার্ট ট্রেন্ড ডিজিটাল সাপোর্ট টিম আপনার রিকোয়েস্ট নোট করেছে। আপনি সরাসরি আমাদের সাথে যোগাযোগ করতে পারেন: ফোন ${company.phone} অথবা ইমেইল ${company.email} এ।`
      : `Thank you for reaching out! Smart Trend Digital support has logged your inquiry. You can also connect with our desk directly at ${company.phone} or ${company.email}.`;
  };

  const sendMessage = (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      time: timeStr
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const replyText = getBotResponse(text);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 650);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="whatsapp-fixed-widget">
      {isOpen && (
        <div className="whatsapp-chat-window animate-in" role="dialog" aria-modal="true">
          {/* WhatsApp Header */}
          <div className="whatsapp-chat-header">
            <div className="wa-agent-avatar">
              <img src="/logo-icon.png" alt="STD" className="wa-avatar-img" />
              <span className="wa-online-status" />
            </div>
            <div className="wa-agent-info">
              <h4>Smart Trend Digital</h4>
              <p>
                <span className="wa-status-text">
                  {lang === 'bn' ? 'সরাসরি সহায়তা • অনলাইনে আছেন' : 'Online • Typically replies instantly'}
                </span>
              </p>
            </div>
            <button
              type="button"
              className="btn-wa-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* WhatsApp Messages Scrollable Body */}
          <div className="whatsapp-chat-body">
            <div className="wa-encryption-badge">
              <span>🔒 {lang === 'bn' ? 'ওয়েবসাইটে সুরক্ষিত সরাসরি চ্যাট' : 'Direct on-site support channel'}</span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`wa-message-row ${msg.sender === 'user' ? 'outgoing' : 'incoming'}`}
              >
                <div className="wa-bubble">
                  {msg.sender === 'bot' && (
                    <span className="wa-sender-tag">STD Support</span>
                  )}
                  <p className="wa-message-text">{msg.text}</p>
                  <div className="wa-message-meta">
                    <span className="wa-timestamp">{msg.time}</span>
                    {msg.sender === 'user' && (
                      <CheckCheck size={14} className="wa-double-check" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="wa-message-row incoming">
                <div className="wa-bubble wa-typing-bubble">
                  <span className="wa-typing-dot" />
                  <span className="wa-typing-dot" />
                  <span className="wa-typing-dot" />
                </div>
              </div>
            )}

            {/* Quick action chips inside the chat */}
            <div className="wa-quick-chips">
              <span className="wa-chips-label">
                <Sparkles size={12} />
                {lang === 'bn' ? 'দ্রুত তথ্য নির্বাচন করুন:' : 'Suggested topics:'}
              </span>
              <div className="wa-chips-grid">
                {quickPrompts.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="wa-chip-btn"
                    onClick={() => sendMessage(q.query)}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            <div ref={chatMessagesEndRef} />
          </div>

          {/* WhatsApp Input Bar */}
          <div className="whatsapp-chat-footer">
            <div className="wa-input-wrapper">
              <input
                type="text"
                className="wa-text-input"
                placeholder={lang === 'bn' ? 'এখানে মেসেজ লিখুন...' : 'Type a message...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className="wa-send-btn"
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="wa-footer-caption">
              <span>Smart Trend Digital • Gulshan Avenue, Dhaka</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        className="whatsapp-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open on-site WhatsApp chat"
        title="Chat with Smart Trend Digital"
      >
        <span className="pulse-ring" />
        {unread && <span className="unread-dot" />}
        <MessageCircle size={30} />
      </button>
    </div>
  );
}
