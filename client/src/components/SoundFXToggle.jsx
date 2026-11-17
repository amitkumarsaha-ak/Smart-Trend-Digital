import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

class SoundSynthesizer {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playHover() {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(720, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Audio playback failsafe
    }
  }

  playClick() {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Audio playback failsafe
    }
  }

  playToggleOn() {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.07); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.14); // G5

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    } catch {
      // Audio playback failsafe
    }
  }
}

const synth = new SoundSynthesizer();

export default function SoundFXToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('std_sound_fx');
    if (saved === 'true') {
      setEnabled(true);
      synth.init();
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    synth.init();

    const handleHover = (e) => {
      const target = e.target;
      if (
        target.closest(
          'a, button, .btn, .client-badge, .pillar-main-card, .cat-card-btn, .case-study-card'
        )
      ) {
        synth.playHover();
      }
    };

    const handleClick = (e) => {
      const target = e.target;
      if (target.closest('a, button, .btn, .cat-card-btn, .deadline-btn')) {
        synth.playClick();
      }
    };

    document.addEventListener('mouseover', handleHover, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleHover);
      document.removeEventListener('click', handleClick);
    };
  }, [enabled]);

  const toggleSound = () => {
    synth.init();
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem('std_sound_fx', String(next));
    if (next) {
      synth.playToggleOn();
    }
  };

  return (
    <button
      type="button"
      className={`sound-fx-toggle-btn ${enabled ? 'sound-active' : ''}`}
      onClick={toggleSound}
      title={enabled ? 'Mute Interactive Sound' : 'Enable Interactive Sound FX'}
      aria-label={enabled ? 'Mute Sound FX' : 'Enable Sound FX'}
    >
      {enabled ? (
        <>
          <Volume2 size={15} className="sound-icon" />
          <span className="sound-wave-bars">
            <span className="bar bar-1" />
            <span className="bar bar-2" />
            <span className="bar bar-3" />
          </span>
        </>
      ) : (
        <>
          <VolumeX size={15} className="sound-icon-muted" />
          <span className="sound-label-muted">SFX</span>
        </>
      )}
    </button>
  );
}
