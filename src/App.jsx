import React, { useEffect, useState, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Vault Preloader logic
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 800); // Hold at 100 briefly, then trigger shutter
      }
      setProgress(current);
    }, 40);

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Trigger load animations
    setTimeout(() => {
      document.body.classList.add('loaded');
    }, 100);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach(sec => observer.observe(sec));

    // Parallax & Magnetic Buttons
    let requestRef;
    let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    const handleMouseMove = (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      const dot = document.querySelector('.custom-cursor-dot');
      if (dot) {
        dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .cta-trigger, .architect-photo, details, summary')) {
        document.querySelector('.custom-cursor-dot')?.classList.add('hovering');
      }
    };
    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, .cta-trigger, .architect-photo, details, summary')) {
        document.querySelector('.custom-cursor-dot')?.classList.remove('hovering');
      }
    };
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    const animate = () => {
      const scrollY = window.scrollY;
      
      // 1. Parallax
      const heroBg = document.querySelector('.hero-bg-image');
      if (heroBg) {
        heroBg.style.transform = `scale(1.2) translateY(${scrollY * 0.3}px)`;
      }
      
      const commBg = document.querySelector('.comm-cta-img');
      if (commBg) {
        const commSection = document.querySelector('.community-section');
        if (commSection) {
          const commTop = commSection.offsetTop;
          if (scrollY + window.innerHeight > commTop) {
            const relativeScroll = scrollY - commTop;
            commBg.style.transform = `scale(1.2) translateY(${relativeScroll * 0.2}px)`;
          }
        }
      }

      // 2. Magnetic Buttons
      const ctas = document.querySelectorAll('.cta-trigger');
      ctas.forEach(cta => {
        const rect = cta.getBoundingClientRect();
        const ctaCenterX = rect.left + rect.width / 2;
        const ctaCenterY = rect.top + rect.height / 2;
        
        const distX = mousePos.x - ctaCenterX;
        const distY = mousePos.y - ctaCenterY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        // If mouse is within 150px, pull the button
        if (distance < 150) {
          const pullX = distX * 0.2;
          const pullY = distY * 0.2;
          cta.style.transform = `translate(${pullX}px, ${pullY}px) scale(1.05)`;
          cta.style.transition = 'none';
        } else {
          cta.style.transform = `translate(0px, 0px) scale(1)`;
          cta.style.transition = 'transform 0.4s cubic-bezier(0.19, 1, 0.22, 1)';
        }
      });

      // 3. Horizontal Scroll Hijacking (Services Section)
      const svcSection = document.querySelector('.services-section');
      const svcTrack = document.querySelector('.svc-track');
      if (svcSection && svcTrack) {
        const top = svcSection.offsetTop;
        const scrollDistance = window.scrollY - top;
        const maxScroll = svcSection.offsetHeight - window.innerHeight;
        
        const maxTranslate = svcTrack.scrollWidth - window.innerWidth;
        
        if (scrollDistance >= 0 && scrollDistance <= maxScroll) {
          const progress = scrollDistance / maxScroll;
          svcTrack.style.transform = `translate3d(-${progress * maxTranslate}px, 0, 0)`;
        } else if (scrollDistance < 0) {
          svcTrack.style.transform = `translate3d(0px, 0, 0)`;
        } else if (scrollDistance > maxScroll) {
          svcTrack.style.transform = `translate3d(-${maxTranslate}px, 0, 0)`;
        }
      }

      requestRef = requestAnimationFrame(animate);
    };
    requestRef = requestAnimationFrame(animate);

    return () => {
      lenis.destroy();
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(requestRef);
    };
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app-wrapper">
      
      {/* 1. THE VAULT PRELOADER */}
      <div className={`vault-preloader ${!isLoading ? 'vault-open' : ''}`}>
        <div className="vault-door vault-top"></div>
        <div className="vault-door vault-bottom"></div>
        <div className="vault-content">
          <div className="vault-brand">VJ AI MEDIA</div>
          <div className="vault-counter">{progress.toString().padStart(2, '0')}%</div>
        </div>
      </div>

      {/* NOISE OVERLAY */}
      <div className="noise-overlay"></div>
      
      {/* SMALL ANIMATED CURSOR */}
      <div className="custom-cursor-dot"></div>

      {/* Navbar */}
      <nav className="main-nav">
        <div className="logo-box">
          <img
            src="/VJaiMedia-Logo.png"
            alt="VJai Media"
            className="logo-img anim-fade"
          />
        </div>
        <div className="nav-links anim-fade delay-1">
          <a href="#services">SERVICES</a>
          <a href="#philosophy">PHILOSOPHY</a>
          <a href="#community">COMMUNITY</a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero-section">

        {/* Structural Grid Lines */}
        <div className="grid-line gl-h nav-line"></div>
        <div className="grid-line gl-v split-line"></div>
        <div className="grid-line gl-h r1-line"></div>
        <div className="grid-line gl-h r2-line"></div>

        {/* Left Column (70%) */}
        <div className="hero-left">

          {/* Subtle Background Image Masked by Ivory */}
          <div className="hero-bg-wrapper anim-fade delay-1">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" alt="Premium Office" className="hero-bg-image" />
            <div className="hero-bg-overlay"></div>
          </div>

          <div className="hero-left-content">
            <div className="hero-badge anim-up-fade">
              Growth Systems • Performance • Automation
            </div>

            <h1 className="hero-title">
              <div className="anim-up-wrapper">
                <span className="anim-up delay-1">GROWTH.</span>
              </div>
              <div className="anim-up-wrapper">
                <span className="anim-up delay-2 cyan-text">ENGINEERED.</span>
              </div>
            </h1>

          </div>
        </div>

        {/* Right Column (30%) */}
        <div className="hero-right">

          {/* Top Cell: Text instead of image */}
          <div className="cell cell-stat">
            <div className="stat-box anim-up-fade delay-2">
              <span className="stat-number scramble-text">₹5Cr+</span>
              <span className="stat-label scramble-text">REVENUE GENERATED</span>
            </div>
          </div>

          {/* Middle Cell: Subtitle */}
          <div className="cell cell-subtitle">
            <p className="subtitle-text anim-up-fade delay-3">
              Most businesses don't struggle because of ads. They struggle because sales systems are weak. We fix that.
            </p>
          </div>

          {/* Bottom Cell: CTA Button */}
          <button className="cell cell-cta cta-trigger" onClick={() => setIsModalOpen(true)}>
            <span className="cta-text anim-up-fade delay-4">
              BOOK STRATEGY<br />CALL <span className="cta-arrow">↗</span>
            </span>
            <div className="cta-hover-bg"></div>
          </button>

        </div>
      </main>

      {/* ====================================================
          TRUST BANNER (LOGO FARM)
          ==================================================== */}
      <div className="trust-section">
        <div className="trust-badge">
          <span>TRUSTED BY INDUSTRY LEADERS</span>
        </div>
        <div className="trust-marquee">
          <div className="marquee-track">
            <div className="marquee-content">
              <span className="trust-logo">TECH</span> <div className="trust-dot"></div>
              <span className="trust-logo">UMBRELLA</span> <div className="trust-dot"></div>
              <span className="trust-logo">STARK IND.</span> <div className="trust-dot"></div>
              <span className="trust-logo">ACME CORP</span> <div className="trust-dot"></div>
              <span className="trust-logo">GLOBEX</span> <div className="trust-dot"></div>
              <span className="trust-logo">SOYLENT</span> <div className="trust-dot"></div>
            </div>
            <div className="marquee-content" aria-hidden="true">
              <span className="trust-logo">TECH</span> <div className="trust-dot"></div>
              <span className="trust-logo">UMBRELLA</span> <div className="trust-dot"></div>
              <span className="trust-logo">STARK IND.</span> <div className="trust-dot"></div>
              <span className="trust-logo">ACME CORP</span> <div className="trust-dot"></div>
              <span className="trust-logo">GLOBEX</span> <div className="trust-dot"></div>
              <span className="trust-logo">SOYLENT</span> <div className="trust-dot"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. NEW SERVICES SECTION (HORIZONTAL SCROLL) */}
      <section className="services-section scroll-section" id="services">
        <div className="svc-sticky-wrapper">
          <div className="svc-track">
            
            {/* Intro Col */}
            <div className="svc-col svc-intro">
              <div className="svc-header-line"></div>
              <h2 className="svc-title">
                <div className="anim-up-wrapper">
                  <span className="scroll-anim-up">SYSTEMS WE ENGINEER</span>
                </div>
              </h2>
            </div>

            {/* Col 1 */}
            <div className="svc-col">
              <div className="svc-col-line"></div>
              <div className="svc-img-box">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop" alt="Performance Ads" className="svc-img scroll-anim-fade delay-1" />
              </div>
              <div className="svc-content">
                <span className="svc-num scroll-anim-up delay-2">01</span>
                <h3 className="svc-name scroll-anim-up delay-3">PERFORMANCE ADS</h3>
                <p className="svc-desc scroll-anim-up delay-4">We scale revenue predictably through data-driven ad systems across Meta, Google, and TikTok.</p>
              </div>
            </div>

            {/* Col 2 */}
            <div className="svc-col">
              <div className="svc-col-line"></div>
              <div className="svc-img-box">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop" alt="Sales Systems" className="svc-img scroll-anim-fade delay-2" />
              </div>
              <div className="svc-content">
                <span className="svc-num scroll-anim-up delay-3">02</span>
                <h3 className="svc-name scroll-anim-up delay-4">SALES SYSTEMS</h3>
                <p className="svc-desc scroll-anim-up delay-5">We engineer robust CRM architectures and funnels that convert traffic into closed revenue.</p>
              </div>
            </div>

            {/* Col 3 */}
            <div className="svc-col">
              <div className="svc-img-box">
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop" alt="Growth Automation" className="svc-img scroll-anim-fade delay-3" />
              </div>
              <div className="svc-content">
                <span className="svc-num scroll-anim-up delay-4">03</span>
                <h3 className="svc-name scroll-anim-up delay-5">AUTOMATION</h3>
                <p className="svc-desc scroll-anim-up delay-6">We eliminate manual bottlenecks with custom AI and Zapier workflows that scale infinitely.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NEW ARSENAL SECTION (TECH STACK) */}
      <section className="arsenal-section scroll-section" id="arsenal">
        <div className="arsenal-header">
          <div className="arsenal-badge scroll-anim-fade">
            <span>THE ARSENAL</span>
          </div>
          <h2 className="arsenal-title scroll-anim-fade delay-1">WE ENGINEER WITH<br /><span className="cyan-text">THE BEST.</span></h2>
        </div>
        <div className="arsenal-grid scroll-anim-fade delay-2">
          <div className="arsenal-item">
            <img className="arsenal-logo" src="/icons/meta.svg" alt="Meta" />
            <span className="arsenal-text">META ADS</span>
          </div>
          <div className="arsenal-item">
            <img className="arsenal-logo" src="/icons/google.svg" alt="Google" />
            <span className="arsenal-text">GOOGLE ADS</span>
          </div>
          <div className="arsenal-item">
            <img className="arsenal-logo" src="/icons/hubspot.svg" alt="CRM" />
            <span className="arsenal-text">GOHIGHLEVEL</span>
          </div>
          <div className="arsenal-item">
            <img className="arsenal-logo" src="/icons/shopify.svg" alt="Shopify" />
            <span className="arsenal-text">SHOPIFY</span>
          </div>
          <div className="arsenal-item">
            <img className="arsenal-logo" src="/icons/stripe.svg" alt="Stripe" />
            <span className="arsenal-text">STRIPE</span>
          </div>
          <div className="arsenal-item">
            <img className="arsenal-logo" src="/icons/chatgpt.svg" alt="OpenAI" />
            <span className="arsenal-text">OPENAI</span>
          </div>
          <div className="arsenal-item">
            <img className="arsenal-logo" src="/icons/zapier.svg" alt="Zapier" />
            <span className="arsenal-text">ZAPIER</span>
          </div>
          <div className="arsenal-item">
            <img className="arsenal-logo" src="/icons/make.svg" alt="Make" />
            <span className="arsenal-text">MAKE.COM</span>
          </div>
        </div>
      </section>

      {/* NEW CASE STUDIES SECTION */}
      <section className="case-studies-section scroll-section" id="proof">

        {/* Header Block */}
        <div className="cs-header">
          <div className="cs-header-line"></div>
          <div className="cs-badge scroll-anim-fade">
            <span>THE PROOF</span>
          </div>
          <h2 className="cs-title">
            <span className="scroll-anim-fade delay-1">WE BUILD SYSTEMS.</span>
            <span className="scroll-anim-fade delay-2 cyan-text">THEY PRINT MONEY.</span>
          </h2>
        </div>

        {/* 2x2 Grid */}
        <div className="cs-grid">

          <div className="cs-card">
            <div className="cs-card-inner scroll-anim-fade delay-1">
              <div className="cs-card-top">
                <span className="cs-client">ACME CORP</span>
                <span className="cs-industry">E-COMMERCE</span>
              </div>
              <div className="cs-card-metric">
                <span className="cs-number">+$2.1M</span>
                <span className="cs-label">REVENUE ADDED IN 90 DAYS</span>
              </div>
              <div className="cs-card-desc">
                Engineered a complete high-ticket funnel and scaled Meta ads with a 4.2x blended ROAS.
              </div>
            </div>
          </div>

          <div className="cs-card">
            <div className="cs-card-inner scroll-anim-fade delay-2">
              <div className="cs-card-top">
                <span className="cs-client">GLOBEX</span>
                <span className="cs-industry">B2B SAAS</span>
              </div>
              <div className="cs-card-metric">
                <span className="cs-number">+340%</span>
                <span className="cs-label">INCREASE IN QUALIFIED DEMOS</span>
              </div>
              <div className="cs-card-desc">
                Rebuilt their CRM architecture and implemented AI-driven outbound automation systems.
              </div>
            </div>
          </div>

          <div className="cs-card">
            <div className="cs-card-inner scroll-anim-fade delay-1">
              <div className="cs-card-top">
                <span className="cs-client">SOYLENT</span>
                <span className="cs-industry">DTC BRAND</span>
              </div>
              <div className="cs-card-metric">
                <span className="cs-number">65%</span>
                <span className="cs-label">LTV INCREASE</span>
              </div>
              <div className="cs-card-desc">
                Deployed advanced email flows and retention systems to drastically increase backend profitability.
              </div>
            </div>
          </div>

          <div className="cs-card">
            <div className="cs-card-inner scroll-anim-fade delay-2">
              <div className="cs-card-top">
                <span className="cs-client">INITECH</span>
                <span className="cs-industry">CONSULTING</span>
              </div>
              <div className="cs-card-metric">
                <span className="cs-number">$450K</span>
                <span className="cs-label">MONTHLY RECURRING REVENUE</span>
              </div>
              <div className="cs-card-desc">
                Automated their entire lead generation and follow-up pipeline using Zapier and custom AI.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* NEW TESTIMONIALS SECTION */}
      <section className="testimonials-section scroll-section" id="testimonials">
        <div className="test-header">
          <div className="test-badge scroll-anim-fade">
            <span>FOUNDER QUOTES</span>
          </div>
          <h2 className="test-title">
            <span className="scroll-anim-fade delay-1">THEY SPEAK</span>
            <span className="scroll-anim-fade delay-2 cyan-text">FOR THEMSELVES.</span>
          </h2>
        </div>

        <div className="test-carousel-container">
          <div className="test-track">
            {/* Duplicate track for seamless infinite scroll */}
            {[...Array(2)].map((_, trackIdx) => (
              <div className="test-content" key={trackIdx}>

                <div className="test-card">
                  <div className="quote-mark">"</div>
                  <p className="quote-text">They completely re-engineered our backend. Revenue doubled in 40 days.</p>
                  <div className="test-author">
                    <span className="author-name">ALEX J.</span>
                    <span className="author-company">ACME CORP</span>
                  </div>
                </div>

                <div className="test-card">
                  <div className="quote-mark">"</div>
                  <p className="quote-text">The only agency that actually understands high-ticket sales systems. Incredible.</p>
                  <div className="test-author">
                    <span className="author-name">SARAH M.</span>
                    <span className="author-company">GLOBEX</span>
                  </div>
                </div>

                <div className="test-card">
                  <div className="quote-mark">"</div>
                  <p className="quote-text">Our CAC dropped by 60% while volume tripled. Absolute masterclass in performance.</p>
                  <div className="test-author">
                    <span className="author-name">DAVID R.</span>
                    <span className="author-company">SOYLENT</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW GUARANTEE SECTION */}
      <section className="guarantee-section scroll-section" id="guarantee">
        <div className="guarantee-content scroll-anim-fade">
          <h2 className="guarantee-title">WE GUARANTEE A<br />POSITIVE ROI IN 90 DAYS<br />OR WE WORK FOR <span className="cyan-text">FREE.</span></h2>
          <p className="guarantee-sub">NO FLUFF. NO EXCUSES. STRICTLY PERFORMANCE.</p>
        </div>
      </section>

      {/* UPGRADED PROCESS SECTION (STICKY STACK) */}
      <section className="process-section scroll-section" id="process">
        <div className="process-header">
          <div className="process-badge scroll-anim-fade">
            <span>HOW WE WORK</span>
          </div>
          <h2 className="process-title scroll-anim-fade delay-1">THE FRAMEWORK.</h2>
        </div>

        <div className="process-ladder">

          <div className="process-card process-card-1">
            <div className="process-card-inner">
              <div className="step-num">01</div>
              <div className="step-content">
                <h3>SYSTEM AUDIT</h3>
                <p>We analyze your entire backend architecture to find exactly where you are bleeding revenue.</p>
              </div>
            </div>
          </div>

          <div className="process-card process-card-2">
            <div className="process-card-inner">
              <div className="step-num">02</div>
              <div className="step-content">
                <h3>ENGINEER</h3>
                <p>We build out a custom, high-converting funnel and automate your CRM workflows using custom AI agents.</p>
              </div>
            </div>
          </div>

          <div className="process-card process-card-3">
            <div className="process-card-inner">
              <div className="step-num">03</div>
              <div className="step-content">
                <h3>SCALE</h3>
                <p>With a bulletproof backend in place, we flood the system with highly targeted Meta & Google traffic.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* NEW ARCHITECT SECTION (FOUNDER DOSSIER) */}
      <section className="architect-section scroll-section" id="architect">
        <div className="architect-grid">
          <div className="architect-left scroll-anim-fade">
            <div className="architect-badge">THE ARCHITECT</div>
            <h2 className="architect-name" style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}>BIKASH MODI</h2>
            <div className="architect-title">FOUNDER & LEAD ENGINEER</div>
            <p className="architect-bio">
              We don't operate like a traditional agency because traditional agencies are fundamentally broken.
              They sell you vanity metrics. We engineer holistic growth architectures designed to do one thing: multiply revenue.
            </p>
            <p className="architect-bio">
              With a background in deep-tech automation and high-ticket sales psychology, I built VJ AI MEDIA to bridge the gap between traffic generation and backend conversion.
            </p>
          </div>
          <div className="architect-right scroll-anim-fade delay-1">
            <div className="architect-photo-wrapper">
              <img src="public/Bikash-Modi-Founder.webp" alt="Bikash Modi" className="architect-photo" />
              <div className="architect-glitch"></div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW PHILOSOPHY SECTION */}
      <section className="philosophy-section scroll-section" id="philosophy">
        <div className="phil-grid-line phil-gl-h phil-top-line"></div>
        <div className="phil-grid-line phil-gl-v phil-left-line"></div>
        <div className="phil-grid-line phil-gl-v phil-right-line"></div>

        <div className="phil-content">
          <div className="phil-badge scroll-anim-fade">
            <span>OUR PHILOSOPHY</span>
          </div>
          <h2 className="phil-manifesto">
            <span className="phil-line scroll-anim-fade delay-1 scramble-text">WE DON'T DO FLUFF.</span>
            <span className="phil-line scroll-anim-fade delay-2 scramble-text">WE DON'T DO VANITY METRICS.</span>
            <span className="phil-line scroll-anim-fade delay-3 scramble-text">WE ENGINEER SYSTEMS</span>
            <span className="phil-line cyan-text scroll-anim-fade delay-4 scramble-text">THAT PRINT REVENUE.</span>
          </h2>
        </div>
      </section>

      {/* UPGRADED FAQ SECTION (SPLIT SCREEN) */}
      <section className="faq-section scroll-section" id="faq">

        <div className="faq-left">
          <div className="faq-sticky-header">
            <div className="faq-badge scroll-anim-fade">
              <span>F.A.Q.</span>
            </div>
            <h2 className="faq-title scroll-anim-fade delay-1">NO<br />SURPRISES.</h2>
          </div>
        </div>

        <div className="faq-right">
          <div className="faq-list">

            <details className="faq-item visible">
              <summary className="faq-question">HOW LONG UNTIL WE SEE RESULTS?</summary>
              <div className="faq-answer">
                <p>Our systems are engineered for speed. Most clients see a positive ROI within the first 30 days of the new funnel going live.</p>
              </div>
            </details>

            <details className="faq-item visible">
              <summary className="faq-question">DO YOU HANDLE THE AD SPEND?</summary>
              <div className="faq-answer">
                <p>No, you retain full ownership and control of your ad accounts and spend. We simply manage and scale the campaigns.</p>
              </div>
            </details>

            <details className="faq-item visible">
              <summary className="faq-question">DO WE HAVE TO CHANGE OUR TECH STACK?</summary>
              <div className="faq-answer">
                <p>We integrate with most major platforms (GoHighLevel, HubSpot, Shopify), but we will recommend migrations if your current stack is a bottleneck.</p>
              </div>
            </details>

          </div>
        </div>
      </section>

      {/* NEW COMMUNITY / FOOTER SECTION */}
      <section className="community-section scroll-section" id="community">
        <div className="comm-top-line"></div>
        <div className="comm-v-line comm-left-line"></div>
        <div className="comm-v-line comm-right-line"></div>

        <div className="comm-content">
          <h2 className="comm-title">
            <span>JOIN THE ELITE.</span>
          </h2>

          <div className="comm-cta-box">
            <div className="comm-cta-img-wrapper">
              <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2000&auto=format&fit=crop" alt="Elite Mastermind" className="comm-cta-img" />
              <div className="comm-cta-overlay"></div>
            </div>
            <div className="comm-cta-text">
              <span className="comm-badge">THE NETWORK</span>
              <h3>Get our exact systems and network with 7-figure founders.</h3>
              <button className="cell-cta cta-trigger" onClick={() => setIsModalOpen(true)}>
                <span className="cta-text">
                  APPLY TO JOIN <span className="cta-arrow">↗</span>
                </span>
                <div className="cta-hover-bg"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Brutalist Footer */}
        <footer className="comm-footer">
          <div className="footer-line"></div>
          <div className="footer-content">
            <div className="footer-left">
              <img src="/VJaiMedia-Logo.png" alt="VJai Media" className="footer-logo" />
              <span className="footer-copy">© 2026 VJ AI MEDIA. ALL RIGHTS RESERVED.</span>
            </div>
            <div className="footer-right">
              <a href="#">TWITTER</a>
              <a href="#">LINKEDIN</a>
              <a href="#">INSTAGRAM</a>
            </div>
          </div>
        </footer>
      </section>

      {/* FULLSCREEN BRUTALIST CALENDLY MODAL */}
      {isModalOpen && (
        <div className="booking-modal-overlay">
          <div className="booking-modal-glitch"></div>
          <div className="booking-modal-content">
            <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
              CLOSE [X]
            </button>
            <div className="calendly-wrapper">
              <iframe
                src="https://calendly.com/ktgowtham89/new-meeting?hide_gdpr_banner=1"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Book Strategy Call"
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
