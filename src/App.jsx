import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import './index.css';

function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="accordion-item animate-on-scroll">
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="heading-md">{title}</h3>
        <span className="text-accent">{isOpen ? '-' : '+'}</span>
      </div>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Scroll Animations Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      lenis.destroy();
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <nav className="navbar flex-between">
        <div className="logo text-sm text-accent">VJ AI Media</div>
        <div className="nav-links text-sm">
          <a href="#philosophy">Philosophy</a>
          <a href="#services">Services</a>
          <a href="#community">Community</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main>
        {/* 1. The Hero Hook */}
        <header className="hero container">
          <video autoPlay loop muted playsInline className="hero-video-bg">
            <source src="https://cdn.pixabay.com/video/2020/05/25/40141-424784964_large.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
          
          <div className="animate-on-scroll" style={{ zIndex: 1 }}>
            <h1 className="display-massive">Growth.</h1>
            <div className="flex-between" style={{ alignItems: 'flex-start', marginTop: '-2vw' }}>
              <h1 className="display-massive" style={{ marginLeft: '10vw' }}>Engineered.</h1>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', textAlign: 'right', marginRight: '4vw' }}>
                <p className="text-lg">
                  We Build Scalable Growth Systems For Modern Businesses.
                </p>
                <p className="text-sm text-secondary">
                  Growth Systems • Performance • Automation
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* 2. The Showreel */}
        <section className="section container">
          <div className="showreel-container animate-on-scroll">
            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" alt="Showreel Cover" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
            <div className="play-btn">Play</div>
          </div>
        </section>

        {/* 3. The Proof (Numbers) */}
        <section className="section container animate-on-scroll">
          <div className="stats-grid">
            <div className="stat-item">
              <h2 className="display-huge text-accent">₹75L+</h2>
              <span className="text-sm">Monthly Ad Spend</span>
            </div>
            <div className="stat-item">
              <h2 className="display-huge">₹5Cr+</h2>
              <span className="text-sm">Revenue Generated</span>
            </div>
            <div className="stat-item">
              <h2 className="display-huge">35+</h2>
              <span className="text-sm">Brands Scaled</span>
            </div>
          </div>
        </section>

        {/* 4. The Client Roster */}
        <section className="section container animate-on-scroll">
          <div className="logo-wall">
            <h2>Brand 01</h2>
            <h2>Brand 02</h2>
            <h2>Brand 03</h2>
            <h2>Brand 04</h2>
            <h2>Brand 05</h2>
            <h2>Brand 06</h2>
          </div>
        </section>

        {/* 5. The Manifesto */}
        <section id="philosophy" className="section container animate-on-scroll">
          <div className="grid-2">
            <div>
              <span className="text-sm text-accent">The Philosophy</span>
            </div>
            <div>
              <h2 className="heading-md" style={{ marginBottom: '2vw' }}>
                We are not a traditional agency.
              </h2>
              <p className="text-lg mb-4" style={{ marginBottom: '1.5rem' }}>
                Most businesses don't struggle because of ads. They struggle because sales systems are weak, follow-ups are inconsistent, operations aren't automated, and growth lacks structure.
              </p>
              <p className="text-lg font-bold text-accent">
                We fix that.
              </p>
            </div>
          </div>
        </section>

        {/* 6. The Ecosystem (Services) */}
        <section id="services" className="section container">
          <div className="flex-between animate-on-scroll" style={{ alignItems: 'flex-end', paddingBottom: '4vw' }}>
            <h2 className="display-large">Growth Beyond<br />Marketing.</h2>
            <p className="text-lg" style={{ maxWidth: '400px' }}>
              We help businesses build complete ecosystems that convert attention into revenue seamlessly.
            </p>
          </div>

          <div className="animate-on-scroll" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <div className="service-item">
              <div>
                <h3 className="heading-md">Customer Acquisition Systems</h3>
                <p className="text-secondary mt-2" style={{ maxWidth: '600px', marginTop: '1rem' }}>Scalable frameworks designed to attract, engage, and retain high-value customers consistently.</p>
              </div>
              <span className="text-sm">01</span>
            </div>
            <div className="service-item">
              <div>
                <h3 className="heading-md">Conversion Funnels & Sales</h3>
                <p className="text-secondary mt-2" style={{ maxWidth: '600px', marginTop: '1rem' }}>Optimized for maximum ROI and streamlining the path to purchase.</p>
              </div>
              <span className="text-sm">02</span>
            </div>
            <div className="service-item">
              <div>
                <h3 className="heading-md">AI & Automation Systems</h3>
                <p className="text-secondary mt-2" style={{ maxWidth: '600px', marginTop: '1rem' }}>Eliminating manual bottlenecks with advanced CRM infrastructure and automation workflows.</p>
              </div>
              <span className="text-sm">03</span>
            </div>
          </div>
        </section>

        {/* 7. The Math */}
        <section className="section container animate-on-scroll">
          <div style={{ textAlign: 'center', padding: '5vw 0', backgroundColor: '#F8F9FA', borderRadius: '1vw' }}>
            <span className="text-sm text-accent" style={{ display: 'block', marginBottom: '2vw' }}>The Growth Formula</span>
            <h2 className="display-huge">Traffic</h2>
            <h2 className="display-huge">× Conv. Rate</h2>
            <h2 className="display-huge">× LTV</h2>
            <h2 className="display-large text-accent" style={{ marginTop: '2vw' }}>= Engineered Growth</h2>
          </div>
        </section>

        {/* 8. The Process */}
        <section className="section container">
          <span className="text-sm text-accent animate-on-scroll" style={{ display: 'block', marginBottom: '4vw' }}>The Methodology</span>
          <AccordionItem title="Phase 01: The Audit">
            <p className="text-lg">We deep dive into your current ecosystem, tearing down your funnels, ads, and operational bottlenecks to find the hidden revenue.</p>
          </AccordionItem>
          <AccordionItem title="Phase 02: Infrastructure">
            <p className="text-lg">Before driving traffic, we build the machine. This includes CRM setups, AI automation workflows, and high-converting landing pages.</p>
          </AccordionItem>
          <AccordionItem title="Phase 03: Scale">
            <p className="text-lg">With the foundation set, we inject capital into performance marketing, scaling aggressively while maintaining ROI.</p>
          </AccordionItem>
        </section>

        {/* 9. The Tech Stack Marquee */}
        <section className="animate-on-scroll">
          <div className="marquee-container">
            <div className="marquee-content">
              <span className="marquee-item">Meta Ads API</span>
              <span className="marquee-item">OpenAI</span>
              <span className="marquee-item">Salesforce</span>
              <span className="marquee-item">Shopify Plus</span>
              <span className="marquee-item">HubSpot</span>
              <span className="marquee-item">Klaviyo</span>
            </div>
            <div className="marquee-content" style={{ animationDelay: '-10s' }}>
              <span className="marquee-item">Meta Ads API</span>
              <span className="marquee-item">OpenAI</span>
              <span className="marquee-item">Salesforce</span>
              <span className="marquee-item">Shopify Plus</span>
              <span className="marquee-item">HubSpot</span>
              <span className="marquee-item">Klaviyo</span>
            </div>
          </div>
        </section>

        {/* 10. Results/Testimonials */}
        <section className="section container animate-on-scroll">
          <div style={{ padding: '8vw 0', textAlign: 'center' }}>
            <span className="text-sm text-accent" style={{ display: 'block', marginBottom: '2vw' }}>Built Through Execution</span>
            <h2 className="heading-md" style={{ fontStyle: 'italic', maxWidth: '1000px', margin: '0 auto 4vw' }}>
              "0 → ₹50L+ Brand Scaling Experience. We let our numbers do the talking. Real results driven by engineered systems."
            </h2>
            <p className="text-sm text-secondary">₹5L → ₹12.5L Monthly Revenue Growth Average</p>
          </div>
        </section>

        {/* 11. The Partnership Model */}
        <section className="section container animate-on-scroll">
          <div className="grid-2" style={{ backgroundColor: '#F8F9FA', padding: '6vw', borderRadius: '1vw' }}>
            <div>
              <h2 className="display-large">10 Brands.</h2>
              <h2 className="display-large text-accent">Max.</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 className="heading-md mb-4" style={{ marginBottom: '1.5rem' }}>Focused Growth.</h3>
              <p className="text-lg" style={{ marginBottom: '1rem' }}>
                We onboard only 1–2 brands every 3 months. Maximum 10 brands per year.
              </p>
              <p className="text-lg text-secondary">
                Why? Because growth needs focus. Not overloaded account managers. Not generic execution. Not recycled strategies. We operate like growth partners — not vendors. Strategy, execution, and automation. All connected.
              </p>
            </div>
          </div>
        </section>

        {/* 12. The Community */}
        <section id="community" className="section container animate-on-scroll">
          <div style={{ position: 'relative', padding: '10vw 4vw', borderRadius: '1vw', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Community" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15, zIndex: -1 }} />
            <h2 className="display-huge">No Fake Gurus.</h2>
            <h2 className="display-huge">No Hype.</h2>
            <h2 className="display-huge text-accent">Just Growth.</h2>
            <p className="text-lg" style={{ marginTop: '2vw', maxWidth: '500px' }}>A free community for founders, marketers, operators, and creators building something meaningful. Get inside for growth insights, AI automation tips, and systems scaling.</p>
            <a href="#" style={{ display: 'inline-block', marginTop: '3vw', borderBottom: '1px solid #000', paddingBottom: '0.5vw', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Join Community — Free</a>
          </div>
        </section>

        {/* 13. FAQ */}
        <section className="section container">
          <span className="text-sm text-accent animate-on-scroll" style={{ display: 'block', marginBottom: '4vw' }}>FAQ</span>
          <AccordionItem title="Do you work with startups?">
            <p className="text-lg">We typically work with brands that have proven product-market fit and are ready to scale infrastructure. If you are pre-revenue, our free community is the best place to start.</p>
          </AccordionItem>
          <AccordionItem title="What is the minimum ad spend?">
            <p className="text-lg">Our systems are designed for scale. We recommend a minimum monthly ad spend of ₹5L to see the full effect of our engineering.</p>
          </AccordionItem>
          <AccordionItem title="How long until we see results?">
            <p className="text-lg">While we often see quick wins in the first 30 days during the audit phase, our comprehensive growth systems are built for massive 90-180 day scaling arcs.</p>
          </AccordionItem>
        </section>

        {/* 14. Founder Story */}
        <section className="section container animate-on-scroll">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div style={{ paddingRight: '4vw' }}>
              <span className="text-sm text-accent" style={{ display: 'block', marginBottom: '2vw' }}>The Founder</span>
              <h2 className="heading-md" style={{ marginBottom: '2vw' }}>Bikash Modi</h2>
              <p className="text-lg">
                Building Better Businesses. Building Better People. Bikash founded VJ AI Media to bridge the gap between creative marketing and hardcore data infrastructure.
              </p>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop" alt="Bikash Modi" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '1vw' }} />
            </div>
          </div>
        </section>
      </main>

      {/* 15. Footer / CTA */}
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-top animate-on-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '4vw', alignItems: 'flex-start' }}>
            <div style={{ textAlign: 'left', marginBottom: '4vw' }}>
              <h2 className="display-large" style={{ textTransform: 'none' }}>Growth Should Be <span className="text-accent" style={{ fontStyle: 'italic' }}>Engineered.</span></h2>
              <p className="text-lg text-secondary">Not guessed.</p>
            </div>
            <div className="flex-between" style={{ width: '100%', alignItems: 'flex-end' }}>
              <h2 className="display-massive text-accent">Let's<br />Talk.</h2>
              <div className="footer-contact">
                <a href="mailto:hello@vjaimedia.com">hello@vjaimedia.com</a>
                <a href="tel:+919876543210">+91 98765 43210</a>
                <p className="text-lg" style={{ marginTop: '2rem' }}>Mumbai, India</p>
              </div>
            </div>
          </div>

          <div className="footer-bottom animate-on-scroll">
            <span className="text-sm">© {new Date().getFullYear()} VJ AI Media.</span>
            <div className="nav-links text-sm">
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
              <a href="#">Twitter</a>
            </div>
            <span className="text-sm">Site by VJ AI Media</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
