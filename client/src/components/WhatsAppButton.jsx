import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, CheckCheck, Sparkles, ExternalLink } from 'lucide-react';
import { company } from '../data/company.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const [input, setInput] = useState('');
  const { lang } = useLanguage();
  const chatMessagesEndRef = useRef(null);

  const initialGreeting = lang === 'bn'
    ? 'আসসালামু আলাইকুম! কোনো নাম্বার সেভ না করেই স্মার্ট ট্রেন্ড ডিজিটালের সাথে সরাসরি হোয়াটসঅ্যাপে কথা বলতে পারবেন। নিচের বিষয়ে ক্লিক করুন অথবা মেসেজ লিখে পাঠান।'
    : 'Hello! You can chat directly with Smart Trend Digital on WhatsApp without saving our number. Choose a suggested topic below or type your message.';

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
      query: lang === 'bn' ? 'ওয়েব ও অ্যাপ ডেভেলপমেন্ট সার্ভিস সম্পর্কে বিস্তারিত জানতে চাই।' : 'Tell me about your Web & App Development services.'
    },
    {
      label: lang === 'bn' ? '🤖 এআই চ্যাটবট ও অটোমেশন' : '🤖 AI Chatbots & Automation',
      query: lang === 'bn' ? 'বিজনেস এআই চ্যাটবট ও অটোমেশন সল্যুশন কেমন?' : 'I need info on AI Chatbots & Business Automation.'
    },
    {
      label: lang === 'bn' ? '📈 ডিজিটাল মার্কেটিং ও এসইও' : '📈 Digital Marketing & SEO',
      query: lang === 'bn' ? 'ডিজিটাল মার্কেটিং ও এসইও প্যাকেজ সম্পর্কে জানতে চাই।' : 'What digital marketing & SEO packages do you offer?'
    },
    {
      label: lang === 'bn' ? '❄️ সেন্ট্রাল এসি ও MEP সার্ভিস' : '❄️ Central AC & MEP Services',
      query: lang === 'bn' ? 'সেন্ট্রাল এসি ও ফ্যাসিলিটি ইঞ্জিনিয়ারিং সেবা সম্পর্কে বলুন।' : 'Tell me about your Facility & MEP engineering support.'
    },
    {
      label: lang === 'bn' ? '💰 প্রজেক্ট কোটেশন ও বাজেট' : '💰 Pricing & Quotation',
      query: lang === 'bn' ? 'একটি নতুন প্রজেক্টের আনুমানিক কোটেশন ও বাজেট কীভাবে পেতে পারি?' : 'How can I get an estimated project quotation?'
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
  }, [isOpen, messages]);

  // Direct Click-to-Chat without saving phone number (Opens official WhatsApp)
  const openWhatsApp = (customText) => {
    const text = (typeof customText === 'string' ? customText : input).trim();
    const targetUrl = text
      ? `https://wa.me/${company.whatsappClean}?text=${encodeURIComponent(text)}`
      : company.whatsappHref;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (text) {
      const userMsg = {
        id: Date.now(),
        sender: 'user',
        text,
        time: timeStr
      };

      const systemReply = {
        id: Date.now() + 1,
        sender: 'bot',
        text: lang === 'bn'
          ? 'আপনার মেসেজটি নিয়ে সরাসরি WhatsApp খোলা হচ্ছে। যদি স্বয়ংক্রিয়ভাবে ওপেন না হয়, নিচের বাটনে চাপ দিন:'
          : 'Opening WhatsApp with your message. If it did not launch automatically, please tap below:',
        actionUrl: targetUrl,
        time: timeStr
      };

      setMessages((prev) => [...prev, userMsg, systemReply]);
    }

    setInput('');

    // Open WhatsApp directly without saving number
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      openWhatsApp();
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
                  {lang === 'bn' ? 'হোয়াটসঅ্যাপ হটলাইন • অনলাইনে আছেন' : 'WhatsApp Hotline • Online Now'}
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
            {/* Direct 1-Click WhatsApp Launch Button at Top */}
            <a
              href={company.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-direct-launch-btn"
            >
              <MessageCircle size={18} />
              <span>
                {lang === 'bn'
                  ? 'সরাসরি হোয়াটসঅ্যাপে চ্যাট করুন (কোনো নাম্বার সেভ ছাড়া)'
                  : 'Start Chat on WhatsApp (No number save required)'}
              </span>
              <ExternalLink size={14} className="wa-launch-arrow" />
            </a>

            <div className="wa-encryption-badge">
              <span>🔒 {lang === 'bn' ? 'অফিশিয়াল হোয়াটসঅ্যাপ সংযোগ (+880 18545-55530)' : 'Official WhatsApp Link (+880 18545-55530)'}</span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`wa-message-row ${msg.sender === 'user' ? 'outgoing' : 'incoming'}`}
              >
                <div className="wa-bubble">
                  {msg.sender === 'bot' && (
                    <span className="wa-sender-tag">STD WhatsApp Support</span>
                  )}
                  <p className="wa-message-text">{msg.text}</p>
                  {msg.actionUrl && (
                    <a
                      href={msg.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wa-fallback-link"
                    >
                      <span>{lang === 'bn' ? '📲 হোয়াটসঅ্যাপ ওপেন করুন' : '📲 Open WhatsApp'}</span>
                    </a>
                  )}
                  <div className="wa-message-meta">
                    <span className="wa-timestamp">{msg.time}</span>
                    {msg.sender === 'user' && (
                      <CheckCheck size={14} className="wa-double-check" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Quick action chips that open WhatsApp with topic prefilled */}
            <div className="wa-quick-chips">
              <span className="wa-chips-label">
                <Sparkles size={12} />
                {lang === 'bn' ? 'সরাসরি হোয়াটসঅ্যাপে জানতে চান?' : 'Quick topics for WhatsApp:'}
              </span>
              <div className="wa-chips-grid">
                {quickPrompts.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="wa-chip-btn"
                    onClick={() => openWhatsApp(q.query)}
                  >
                    <span>{q.label}</span>
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
                placeholder={lang === 'bn' ? 'মেসেজ লিখুন (সরাসরি হোয়াটসঅ্যাপে যাবে)...' : 'Type message to send on WhatsApp...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className="wa-send-btn"
                onClick={() => openWhatsApp()}
                disabled={!input.trim()}
                aria-label="Send message to WhatsApp"
                title={lang === 'bn' ? 'হোয়াটসঅ্যাপে পাঠান' : 'Send to WhatsApp'}
              >
                <Send size={16} />
              </button>
            </div>
            <div className="wa-footer-caption">
              <span>{company.phone} • Simpletree Attalika, Gulshan</span>
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
        title="Chat on WhatsApp with Smart Trend Digital"
      >
        <span className="pulse-ring" />
        {unread && <span className="unread-dot" />}
        <MessageCircle size={30} />
      </button>
    </div>
  );
}