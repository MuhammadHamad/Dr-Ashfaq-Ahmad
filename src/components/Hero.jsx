import React from 'react';
import { Calendar, Award, Star, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function Hero({ onOpenBooking, currentLang }) {
  return (
    <section id="hero" style={{
      paddingTop: 'clamp(5.5rem, 12vh, 10.5rem)',
      paddingBottom: 'clamp(3rem, 6vh, 5rem)',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at 10% 20%, rgba(0,168,181,0.12) 0%, transparent 50%), radial-gradient(ellipse at 85% 80%, rgba(212,175,55,0.08) 0%, transparent 40%)'
    }}>
      <div className="container">
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '3rem',
          alignItems: 'center'
        }}>

          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Badges */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <span className="badge-gold">
                <Award size={14} /> FCPS Gold Medalist
              </span>
              <span className="badge-teal">
                <ShieldCheck size={14} /> Maaz Medical Center
              </span>
            </div>

            <h1 style={{ fontWeight: 800, color: '#FFF', marginBottom: '1.15rem' }}>
              {currentLang === 'UR' ? (
                <>مردان میں جدید اور درد سے پاک <span style={{ color: 'var(--accent-cyan)' }}>ڈینٹل کیئر</span></>
              ) : (
                <>Excellence in Advanced &{' '}
                  <span style={{
                    background: 'linear-gradient(135deg, #00C2CB, #34D399)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>Pain-Free Dentistry</span>
                </>
              )}
            </h1>

            <p style={{
              color: 'var(--text-muted)', marginBottom: '1.75rem', lineHeight: 1.65,
              maxWidth: '540px'
            }}>
              {currentLang === 'UR'
                ? `ڈاکٹر اشفاق احمد (گولڈ میڈلسٹ ڈینٹل سرجن) کے زیرِ نگرانی جدید روٹ کینال، ڈینٹل امپلانٹس، اور ہالی ووڈ مسکراہٹ کے علاج۔`
                : `Spearheaded by ${clinicData.doctor.name} (${clinicData.doctor.titles}, ${clinicData.doctor.distinction}). Experience cutting-edge implants, single-sitting root canals, aligners, and cosmetic veneers with 100% painless technology.`
              }
            </p>

            {/* CTAs */}
            <div className="hero-cta-row" style={{
              display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '2rem'
            }}>
              <button onClick={onOpenBooking} className="btn-primary"
                style={{ padding: '0.9rem 1.75rem', fontSize: '1rem' }}>
                <Calendar size={18} />
                {currentLang === 'UR' ? 'مشورہ بک کریں' : 'Book Consultation'}
                <ArrowRight size={16} />
              </button>
              <a href="#services" className="btn-outline"
                style={{ padding: '0.9rem 1.5rem', fontSize: '0.95rem' }}>
                {currentLang === 'UR' ? 'تمام علاج دیکھیں' : 'View Treatments'}
              </a>
            </div>

            {/* Trust pills */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '1.25rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(255,255,255,0.08)'
            }}>
              {['99.8% Painless', 'Class B Autoclave', '3D Intraoral Scanner'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--accent-cyan)" />
                  <span style={{ fontSize: '0.85rem', color: '#CBD5E1', fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN – DOCTOR IMAGE ── */}
          <div style={{ position: 'relative' }}>
            <div className="glass-card" style={{
              position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
              border: '2px solid rgba(0,168,181,0.3)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)'
            }}>
              <img
                src="/assets/dr_ashfaq_portrait.png"
                alt="Dr. Ashfaq Ahmad – BDS, FCPS Gold Medalist Dental Surgeon"
                style={{
                  width: '100%', display: 'block',
                  height: 'clamp(320px, 46vh, 480px)',
                  objectFit: 'cover', objectPosition: 'top center'
                }}
              />

              {/* Gradient Overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 55%, rgba(10,25,47,0.92) 100%)'
              }} />

              {/* Bottom Info Bar */}
              <div style={{
                position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: 'rgba(10,25,47,0.88)', backdropFilter: 'blur(12px)',
                padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255,255,255,0.12)'
              }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#FFF' }}>
                    {clinicData.doctor.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                    {clinicData.doctor.titles} • {clinicData.doctor.distinction}
                  </div>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                  background: 'rgba(212,175,55,0.15)', padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--radius-pill)', border: '1px solid rgba(212,175,55,0.3)'
                }}>
                  <Star size={13} fill="#F59E0B" color="#F59E0B" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--gold-accent)' }}>4.9</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
