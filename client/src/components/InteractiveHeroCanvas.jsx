import React, { useEffect, useRef } from 'react';

export default function InteractiveHeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let isVisible = true;
    let width = 0;
    let height = 0;

    // Mouse coordinates relative to hero canvas
    const mouse = {
      x: null,
      y: null,
      radius: 140
    };

    // Particle settings
    const particleCount = 50;
    const particles = [];
    const colors = ['rgba(56, 189, 248, 0.7)', 'rgba(2, 132, 199, 0.65)', 'rgba(96, 165, 250, 0.55)', 'rgba(147, 197, 253, 0.45)'];

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1.2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.pulse = Math.random() * Math.PI;
      }

      update() {
        // Natural drift
        this.x += this.vx;
        this.y += this.vy;

        // Bounce from boundaries
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Mouse interaction: gentle repulsion / connection
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 1.5;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force;
            this.y -= Math.sin(angle) * force;
          }
        }

        this.pulse += 0.03;
      }

      draw() {
        const currentSize = this.size + Math.sin(this.pulse) * 0.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(currentSize, 0.5), 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // Draw lines between proximate particles & mouse
    const drawConnections = () => {
      const maxDist = 115;

      for (let i = 0; i < particles.length; i++) {
        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Connect to mouse cursor
        if (mouse.x !== null && mouse.y !== null) {
          const mdx = particles[i].x - mouse.x;
          const mdy = particles[i].y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouse.radius) {
            const malpha = (1 - mdist / mouse.radius) * 0.45;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${malpha})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      drawConnections();

      animationFrameId = requestAnimationFrame(animate);
    };

    handleResize();
    initParticles();
    animate();

    const handleCanvasMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleCanvasMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const parentHero = canvas.closest('.hero-section') || canvas;
    parentHero.addEventListener('mousemove', handleCanvasMouseMove, { passive: true });
    parentHero.addEventListener('mouseleave', handleCanvasMouseLeave);
    window.addEventListener('resize', handleResize);

    // Pause loop when off-screen to save battery
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        animate();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    }, { threshold: 0.05 });

    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      parentHero.removeEventListener('mousemove', handleCanvasMouseMove);
      parentHero.removeEventListener('mouseleave', handleCanvasMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-interactive-canvas"
      aria-hidden="true"
    />
  );
}
