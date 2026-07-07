import { useEffect, useRef } from 'react';
import { ArrowRight, BarChart, Users, Zap, CheckCircle2, Shield, Settings, TrendingUp, Instagram, Linkedin, Mail } from 'lucide-react';
import './index.css';

// Custom Hook for scroll animations
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll('.fade-up');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);
}

function App() {
  useScrollReveal();

  return (
    <>
      <div className="bg-grid">
        {/* HERO SECTION */}
        <header className="section-padding flex-col flex-center text-center container">
          <div className="fade-up">
            <span className="text-cyan text-body-s uppercase tracking-wider font-semibold mb-4 block" style={{ letterSpacing: '0.1em' }}>
              Growth Systems • Performance • Automation
            </span>
            <h1 className="h-xl mb-6">
              We Build Scalable<br />
              <span className="text-gradient">Growth Systems</span><br />
              For Modern Businesses.
            </h1>
          </div>
          
          <div className="fade-up delay-100 flex-col flex-center">
            <p className="text-body-l mb-8" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              Performance Marketing. Sales Systems. AI Automation. Revenue Infrastructure.
            </p>
          </div>

          <div className="fade-up delay-200 glass-card text-left" style={{ maxWidth: '700px', margin: '0 auto 3rem' }}>
            <h3 className="h-s mb-4 text-gradient">Most businesses don't struggle because of ads.</h3>
            <p className="text-body-m mb-4">They struggle because:</p>
            <ul className="text-body-m" style={{ listStyle: 'none', marginLeft: '0.5rem', marginBottom: '1.5rem' }}>
              <li className="flex-center" style={{ justifyContent: 'flex-start', marginBottom: '0.5rem' }}><CheckCircle2 size={18} className="text-cyan mr-3" /> sales systems are weak</li>
              <li className="flex-center" style={{ justifyContent: 'flex-start', marginBottom: '0.5rem' }}><CheckCircle2 size={18} className="text-cyan mr-3" /> follow-ups are inconsistent</li>
              <li className="flex-center" style={{ justifyContent: 'flex-start', marginBottom: '0.5rem' }}><CheckCircle2 size={18} className="text-cyan mr-3" /> operations aren't automated</li>
              <li className="flex-center" style={{ justifyContent: 'flex-start', marginBottom: '0.5rem' }}><CheckCircle2 size={18} className="text-cyan mr-3" /> growth lacks structure</li>
            </ul>
            <p className="h-s text-cyan">We fix that.</p>
          </div>

          <div className="fade-up delay-300 flex-center" style={{ gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary">Book Strategy Call <ArrowRight size={18} className="ml-2" /></button>
            <button className="btn btn-outline">Join Community — Free</button>
          </div>
        </header>
      </div>

      {/* TRUST STRIP SECTION */}
      <section className="container fade-up delay-300" style={{ paddingBottom: '4rem' }}>
        <div className="glass-card flex-center" style={{ gap: '4rem', flexWrap: 'wrap', padding: '2rem 3rem' }}>
          <div className="flex-col">
            <span className="h-m text-gradient">₹75L+</span>
            <span className="text-body-s">Monthly Ad Spend</span>
          </div>
          <div className="flex-col">
            <span className="h-m text-gradient">₹5Cr+</span>
            <span className="text-body-s">Revenue Generated</span>
          </div>
          <div className="flex-col">
            <span className="h-m text-gradient">35+</span>
            <span className="text-body-s">Brands Scaled</span>
          </div>
          <div className="flex-col">
            <span className="h-m text-gradient">0 → ₹50L+</span>
            <span className="text-body-s">Brand Scaling Exp.</span>
          </div>
        </div>
      </section>

      {/* SECTION - WHAT WE DO */}
      <section className="section-padding container">
        <div className="fade-up mb-12 text-center">
          <h2 className="h-l mb-4">Growth Beyond <span className="text-cyan">Marketing.</span></h2>
          <p className="text-body-l">We help businesses build complete ecosystems.</p>
        </div>
        <div className="grid-cols-3">
          {[
            { title: 'Customer Acquisition Systems', icon: <Users className="text-cyan mb-4" size={32} /> },
            { title: 'Conversion-Focused Funnels', icon: <TrendingUp className="text-cyan mb-4" size={32} /> },
            { title: 'Sales Workflows', icon: <ArrowRight className="text-cyan mb-4" size={32} /> },
            { title: 'CRM Infrastructure', icon: <Settings className="text-cyan mb-4" size={32} /> },
            { title: 'Automation Systems', icon: <Zap className="text-cyan mb-4" size={32} /> },
            { title: 'Scalable Growth Operations', icon: <BarChart className="text-cyan mb-4" size={32} /> }
          ].map((item, index) => (
            <div key={index} className={`glass-card fade-up delay-${(index % 3 + 1) * 100}`}>
              {item.icon}
              <h3 className="h-s mb-2">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION - RESULTS */}
      <section className="section-padding bg-grid" style={{ position: 'relative' }}>
        <div className="container">
          <div className="fade-up mb-12">
            <h2 className="h-l mb-4">Built Through <span className="text-cyan">Execution.</span></h2>
          </div>
          <div className="grid-cols-3">
             <div className="glass-card fade-up delay-100 flex-col">
                <span className="h-m text-cyan mb-2">₹75L+</span>
                <span className="text-body-m">Monthly Ad Spend Under Management</span>
             </div>
             <div className="glass-card fade-up delay-200 flex-col">
                <span className="h-m text-cyan mb-2">₹5Cr+</span>
                <span className="text-body-m">Business Revenue Generated</span>
             </div>
             <div className="glass-card fade-up delay-300 flex-col">
                <span className="h-m text-cyan mb-2">35+</span>
                <span className="text-body-m">Brands Worked Across</span>
             </div>
             <div className="glass-card fade-up delay-100 flex-col">
                <span className="h-m text-cyan mb-2">0 → ₹50L+</span>
                <span className="text-body-m">Brand Scaling Experience</span>
             </div>
             <div className="glass-card fade-up delay-200 flex-col">
                <span className="h-m text-cyan mb-2">₹5L → ₹12.5L</span>
                <span className="text-body-m">Monthly Revenue Growth</span>
             </div>
             <div className="glass-card fade-up delay-300 flex-col" style={{ borderColor: 'var(--accent-cyan)' }}>
                <span className="h-m text-gradient mb-2">10 Brands Max</span>
                <span className="text-body-m">Yearly Partnership Capacity</span>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION - WHY VJAI MEDIA */}
      <section className="section-padding container flex-center" style={{ flexDirection: 'column' }}>
        <div className="fade-up mb-12 text-center" style={{ maxWidth: '800px' }}>
          <h2 className="h-l mb-6">We Are Not A <span className="text-cyan">Traditional Agency.</span></h2>
          <p className="text-body-l mb-8">Most agencies manage campaigns. We build growth systems.</p>
          <div className="glass-card text-left flex-center" style={{ gap: '3rem', flexWrap: 'wrap' }}>
            <div className="flex-col">
              <h4 className="text-body-s uppercase tracking-wider mb-4">That means:</h4>
              <ul className="text-body-m" style={{ listStyle: 'none' }}>
                {['Strategy', 'Execution', 'Automation', 'Optimization', 'Sales Alignment', 'Infrastructure'].map((item, idx) => (
                  <li key={idx} className="flex-center mb-2" style={{ justifyContent: 'flex-start' }}>
                    <Shield size={16} className="text-cyan mr-3" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-col flex-center" style={{ flex: 1 }}>
              <div className="h-m text-cyan text-center" style={{ padding: '2rem', border: '1px solid var(--border-cyan)', borderRadius: '50%', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                All<br/>Connected
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION - PARTNERSHIP MODEL */}
      <section className="section-padding bg-grid" style={{ borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="grid-cols-2" style={{ alignItems: 'center' }}>
            <div className="fade-up delay-100">
              <h2 className="h-l mb-6">Built For <span className="text-cyan">Focused Growth.</span></h2>
              <p className="text-body-l mb-6">We onboard only 1–2 brands every 3 months.<br/><strong>Maximum: 10 brands per year.</strong></p>
              <h3 className="h-s mb-4 text-gradient">Why?</h3>
              <ul className="text-body-m mb-8" style={{ listStyle: 'none' }}>
                <li className="mb-2 opacity-70">Because growth needs focus.</li>
                <li className="mb-2 opacity-70">Not overloaded account managers.</li>
                <li className="mb-2 opacity-70">Not generic execution.</li>
                <li className="mb-2 opacity-70">Not recycled strategies.</li>
              </ul>
              <p className="h-m text-cyan">We operate like growth partners — not vendors.</p>
            </div>
            <div className="glass-card fade-up delay-200 flex-col flex-center text-center" style={{ padding: '4rem 2rem' }}>
              <Shield size={64} className="text-cyan mb-6" />
              <h3 className="h-m mb-2 text-gradient">Exclusive Focus</h3>
              <p className="text-body-m">Quality over quantity, always.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION - COMMUNITY */}
      <section className="section-padding container">
        <div className="fade-up mb-12 text-center">
          <h2 className="h-l mb-4">Built For <span className="text-cyan">Founders & Ambitious People.</span></h2>
          <p className="text-body-l">A free community for founders, marketers, freelancers, operators, creators, students, and people building something meaningful.</p>
        </div>
        
        <div className="grid-cols-2">
          <div className="glass-card fade-up delay-100">
            <h3 className="h-s mb-6 text-gradient">Inside The Community</h3>
            <ul className="text-body-m" style={{ listStyle: 'none' }}>
              {['Growth & marketing insights', 'AI & automation learnings', 'Real business discussions', 'Systems & scaling knowledge', 'Founder-focused networking', 'Behind-the-scenes execution', 'Practical strategies'].map((item, idx) => (
                <li key={idx} className="flex-center mb-3" style={{ justifyContent: 'flex-start' }}>
                  <Zap size={16} className="text-cyan mr-3" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card fade-up delay-200 flex-col flex-center text-center" style={{ borderColor: 'var(--accent-cyan)' }}>
            <h3 className="h-m mb-4 text-gradient">No Fake Gurus.</h3>
            <h3 className="h-m mb-4 text-gradient">No Hype.</h3>
            <h3 className="h-m mb-6 text-gradient">No Surface-Level Content.</h3>
            <p className="text-body-l mb-8 text-cyan">Just practical learning, execution, and growth.</p>
            <button className="btn btn-outline" style={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}>Join Community — Free</button>
          </div>
        </div>
      </section>

      {/* SECTION - FOUNDER */}
      <section className="section-padding bg-grid" style={{ borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="grid-cols-2">
             <div className="fade-up delay-100 flex-col flex-center" style={{ alignItems: 'flex-start' }}>
               <span className="text-body-s uppercase tracking-wider text-cyan mb-2">Meet The Founder</span>
               <h2 className="h-l mb-2">Bikash Modi</h2>
               <p className="text-body-l mb-6 text-gradient">Performance Marketer • Growth Systems Builder<br/>Founder — VJai Media</p>
               <div className="flex-center" style={{ gap: '1rem' }}>
                  <a href="#" className="glass-card flex-center" style={{ padding: '0.8rem', borderRadius: '50%' }}><Linkedin size={20} className="text-cyan" /></a>
                  <a href="#" className="glass-card flex-center" style={{ padding: '0.8rem', borderRadius: '50%' }}><Mail size={20} className="text-cyan" /></a>
               </div>
             </div>
             <div className="glass-card fade-up delay-200">
               <h3 className="text-body-s uppercase tracking-wider mb-6">Experience Snapshot</h3>
               <div className="flex-col" style={{ gap: '1.5rem' }}>
                  <div>
                    <div className="h-s text-gradient">35+ Brands</div>
                    <div className="text-body-s">Worked Across</div>
                  </div>
                  <div>
                    <div className="h-s text-gradient">₹75L+</div>
                    <div className="text-body-s">Monthly Ad Spend Under Management</div>
                  </div>
                  <div>
                    <div className="h-s text-gradient">₹5Cr+</div>
                    <div className="text-body-s">Business Revenue Generated</div>
                  </div>
                  <div className="pt-4 mt-4" style={{ borderTop: '1px solid var(--border-light)' }}>
                    <div className="text-body-s text-cyan">Focused On:</div>
                    <div className="text-body-m">Performance • Systems • Automation • Revenue</div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="section-padding container text-center">
        <div className="fade-up">
          <h2 className="h-xl mb-4">Growth Should Be <span className="text-cyan">Engineered.</span></h2>
          <p className="h-s text-gradient mb-8">Not guessed.</p>
          <p className="text-body-l mb-10" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
            Whether you're scaling a business, building a brand, learning growth, exploring automation, or growing as a founder — <strong>VJai Media is being built for both businesses and ambitious people.</strong>
          </p>
          <div className="flex-center" style={{ gap: '1.5rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>Book Strategy Call <ArrowRight size={20} className="ml-2" /></button>
            <button className="btn btn-outline" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>Join Community — Free</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="container" style={{ borderTop: '1px solid var(--border-light)', padding: '3rem 2rem' }}>
        <div className="grid-cols-2" style={{ alignItems: 'center' }}>
          <div>
            <h2 className="h-s mb-2 text-cyan">VJai Media</h2>
            <p className="text-body-s text-gradient mb-1">Growth. Engineered.</p>
            <p className="text-body-s">Building Better Businesses. Building Better People.</p>
          </div>
          <div className="flex-center" style={{ gap: '2rem', justifyContent: 'flex-end' }}>
             <a href="#" className="text-body-m hover:text-cyan transition" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Instagram size={18}/> Instagram</a>
             <a href="#" className="text-body-m hover:text-cyan transition" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Linkedin size={18}/> LinkedIn</a>
             <a href="#" className="text-body-m hover:text-cyan transition" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={18}/> Email</a>
          </div>
        </div>
      </footer>

      {/* STICKY CTA */}
      <div className="sticky-cta fade-up delay-300">
        <button className="btn btn-primary" style={{ borderRadius: '30px', padding: '1rem 2rem', boxShadow: '0 10px 30px rgba(17,181,217,0.3)' }}>
          Book Call
        </button>
      </div>
    </>
  );
}

export default App;
