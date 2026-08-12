import React from 'react';
import { Award, GraduationCap, Check, Stethoscope, Sparkles, Building, Calendar } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function DoctorProfile({ onOpenBooking, currentLang }) {
  return (
    <section id="about" style={{ padding: 'clamp(3.5rem, 7vh, 6rem) 0', position: 'relative' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr',
          gap: '3.5rem',
          alignItems: 'center'
        }} className="doctor-profile-grid">

          {/* Left Column Graphic & Image Frame */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '2px solid rgba(212, 175, 55, 0.3)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              position: 'relative'
            }}>
              <img 
                src="/assets/dr_ashfaq_portrait.png" 
                alt="Dr. Ashfaq Ahmad Dental Specialist" 
                style={{ width: '100%', height: 'clamp(340px, 45vh, 480px)', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(0deg, rgba(11,25,44,0.95) 0%, rgba(11,25,44,0) 60%)'
              }}></div>
              
              <div style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                right: '1.25rem'
              }}>
                <div className="badge-gold" style={{ marginBottom: '0.5rem' }}>
                  <Award size={16} /> Gold Medalist Specialist
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFF' }}>
                  Dr. Ashfaq Ahmad
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
                  BDS, FCPS (Dentistry) • Specialist Surgeon
                </p>
              </div>
            </div>

            {/* Background Glow */}
            <div style={{
              position: 'absolute',
              top: '-10%',
              left: '-10%',
              width: '120%',
              height: '120%',
              background: 'radial-gradient(circle, rgba(0,168,181,0.12) 0%, transparent 70%)',
              zIndex: -1,
              pointerEvents: 'none'
            }}></div>
          </div>

          {/* Right Column Bio & Credentials */}
          <div>
            <span className="section-tag">
              {currentLang === 'UR' ? 'ڈاکٹر کے بارے میں' : 'Meet Your Dentist'}
            </span>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', textAlign: 'left', margin: 0, marginBottom: '1.25rem' }}>
              {currentLang === 'UR' ? (
                <>ڈاکٹر اشفاق احمد — <span style={{ color: 'var(--accent-cyan)' }}>ایف سی پی ایس گولڈ میڈلسٹ</span></>
              ) : (
                <>Dr. Ashfaq Ahmad — <span style={{ color: 'var(--accent-cyan)' }}>FCPS Gold Medalist Specialist</span></>
              )}
            </h2>

            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              {clinicData.doctor.bio}
            </p>

            {/* Qualifications Card - Stacks on mobile */}
            <div className="doctor-qualifications-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div className="glass-card" style={{ padding: '1.15rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--gold-accent)', fontWeight: 700, marginBottom: '0.4rem' }}>
                  <GraduationCap size={20} />
                  FCPS Dentistry
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                  Fellow of the College of Physicians & Surgeons Pakistan (Gold Medal Awardee)
                </p>
              </div>

              <div className="glass-card" style={{ padding: '1.15rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '0.4rem' }}>
                  <Building size={20} />
                  Maaz Medical Center
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                  Consultant Dental Surgeon, Shamsi Road, Muslimabad, Mardan
                </p>
              </div>
            </div>

            {/* Checklist of Specializations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {clinicData.doctor.highlights.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'rgba(0, 194, 203, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Check size={14} color="var(--accent-cyan)" />
                  </div>
                  <span style={{ fontSize: '0.925rem', color: 'var(--text-main)', fontWeight: 500 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions - Stacks cleanly on mobile */}
            <div className="doctor-action-group" style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button onClick={onOpenBooking} className="btn-gold">
                <Calendar size={18} />
                <span>{currentLang === 'UR' ? 'ڈاکٹر سے مشورہ بک کریں' : 'Book Specialist Consultation'}</span>
              </button>

              <a 
                href={clinicData.contact.marhamBookingUrl} 
                target="_blank" 
                rel="noreferrer" 
                style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', textDecoration: 'underline', fontWeight: 600, whiteSpace: 'nowrap' }}
              >
                View Marham Profile
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
