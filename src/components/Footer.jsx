import React from 'react';
import { Shield, Phone, MapPin, Mail, MessageSquare, Heart, ArrowUp } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function Footer({ onOpenBooking, currentLang }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#070F1E',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      paddingTop: '5rem',
      paddingBottom: '2.5rem',
      color: 'var(--text-muted)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>

          {/* Col 1: Brand & Doctor Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--accent-teal), var(--accent-cyan))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Shield size={22} color="#FFF" />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>
                  Dr. Ashfaq Ahmad
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                  Dental Clinic • Mardan
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Premier advanced dental surgery and aesthetic restoration in Mardan. Led by FCPS Gold Medalist specialist Dr. Ashfaq Ahmad at Maaz Medical Center.
            </p>

            <span className="badge-gold">
              FCPS Gold Medalist Specialist
            </span>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ color: '#FFF', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Quick Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <a href="#about" style={{ color: 'var(--text-muted)' }}>About Dr. Ashfaq Ahmad</a>
              <a href="#services" style={{ color: 'var(--text-muted)' }}>Dental Services & Treatments</a>
              <a href="#before-after" style={{ color: 'var(--text-muted)' }}>Smile Transformation Gallery</a>
              <a href="#cost-calculator" style={{ color: 'var(--text-muted)' }}>Treatment PKR Fee Estimator</a>
              <a href="#reviews" style={{ color: 'var(--text-muted)' }}>Patient Reviews</a>
              <a href="#location" style={{ color: 'var(--text-muted)' }}>Location & Timings</a>
            </div>
          </div>

          {/* Col 3: Popular Treatments */}
          <div>
            <h4 style={{ color: '#FFF', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Key Specializations
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <span>Single-Sitting Root Canal (RCT)</span>
              <span>Permanent Titanium Dental Implants</span>
              <span>Clear Aligners & Orthodontics</span>
              <span>Laser Teeth Whitening</span>
              <span>Zirconia Crowns & Bridges</span>
              <span>Hollywood Smile Veneers</span>
            </div>
          </div>

          {/* Col 4: Contact & Hours */}
          <div>
            <h4 style={{ color: '#FFF', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Contact Clinic
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={18} color="var(--accent-cyan)" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>Maaz Medical Center, Shamsi Road, Muslimabad, Mardan, 23200</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={18} color="var(--accent-cyan)" />
                <a href={`tel:${clinicData.contact.phonePrimary}`} style={{ color: '#FFF', fontWeight: 600 }}>
                  {clinicData.contact.phonePrimary}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <MessageSquare size={18} color="#25D366" />
                <a href={`https://wa.me/${clinicData.contact.whatsappNumber}`} target="_blank" rel="noreferrer" style={{ color: '#25D366', fontWeight: 600 }}>
                  WhatsApp: {clinicData.contact.whatsappDisplay}
                </a>
              </div>
            </div>

            <button 
              onClick={onOpenBooking} 
              className="btn-primary" 
              style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center', fontSize: '0.9rem' }}
            >
              Book Appointment Now
            </button>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem'
        }}>
          <div>
            © {new Date().getFullYear()} Dr. Ashfaq Ahmad Dental Clinic. All Rights Reserved. Maaz Medical Center, Mardan.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Made with <Heart size={14} color="#EF4444" style={{ display: 'inline', verticalAlign: 'middle' }} /> for Mardan, Pakistan</span>
            <button 
              onClick={scrollToTop}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#FFF',
                padding: '0.5rem',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
