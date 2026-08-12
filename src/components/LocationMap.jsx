import React from 'react';
import { MapPin, Clock, Phone, Navigation, Calendar, ShieldCheck, ExternalLink, CheckCircle } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function LocationMap({ onOpenBooking, currentLang }) {
  return (
    <section id="location" style={{ padding: 'clamp(3.5rem, 7vh, 6rem) 0', background: 'var(--navy-card)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag">
            {currentLang === 'UR' ? 'کلینک کا مقام اور اوقات' : 'Clinic Location & Operating Hours'}
          </span>
          <h2 className="section-title">
            {currentLang === 'UR' ? 'مرادن شمس روڈ میں ہمارے کلینک کا پتہ' : 'Visit Dr. Ashfaq Ahmad Dental Clinic'}
          </h2>
          <p className="section-desc">
            Conveniently located at Maaz Medical Center, Shamsi Road, Muslimabad, Mardan with dedicated parking and accessibility.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2.5rem',
          alignItems: 'stretch'
        }} className="location-grid">

          {/* Left Column Address & Opening Hours Table */}
          <div className="glass-card" style={{ padding: 'clamp(1.15rem, 4vw, 2rem)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'rgba(0, 168, 181, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <MapPin size={24} color="var(--accent-cyan)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>
                  {clinicData.location.facility}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                  {clinicData.location.address}, {clinicData.location.city}
                </p>
              </div>
            </div>

            {/* Direct Google Maps Action Button */}
            <a 
              href={clinicData.location.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-gold"
              style={{
                width: '100%',
                justifyContent: 'center',
                marginBottom: '1.75rem',
                padding: '0.85rem'
              }}
            >
              <Navigation size={18} />
              <span>Get Directions on Google Maps</span>
              <ExternalLink size={16} />
            </a>

            {/* Timings Matrix */}
            <h4 style={{ fontSize: '1.05rem', color: '#FFF', fontWeight: 700, marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} color="var(--accent-cyan)" />
              Weekly Clinical Operating Hours
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem' }}>
              {clinicData.hours.map((h, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: h.day === 'Sunday' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '0.85rem'
                }}>
                  <span style={{ fontWeight: 600, color: h.day === 'Sunday' ? '#F87171' : '#FFF' }}>{h.day}</span>
                  <span style={{ color: h.day === 'Sunday' ? '#F87171' : 'var(--accent-cyan)', fontWeight: 600 }}>{h.text}</span>
                </div>
              ))}
            </div>

            {/* Booking Portal Shortcuts */}
            <div style={{
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                Also Available on Medical Portals:
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <a 
                  href={clinicData.contact.marhamBookingUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="badge-teal"
                  style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
                >
                  <ExternalLink size={13} /> Book on Marham.pk
                </a>
                <a 
                  href={clinicData.contact.oladocBookingUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="badge-gold"
                  style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
                >
                  <ExternalLink size={13} /> Book on Oladoc.com
                </a>
              </div>
            </div>

          </div>

          {/* Right Column Map Embed View - Fast Official Google Maps CDN Embed Centered on Maaz Medical Center Mardan */}
          <div style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '2px solid rgba(0, 168, 181, 0.3)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            height: '100%',
            minHeight: '380px',
            position: 'relative',
            background: 'rgba(15, 23, 42, 0.8)'
          }}>
            <iframe 
              title="Dr. Ashfaq Ahmad Dental Clinic Location Mardan"
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '380px', filter: 'contrast(1.05) brightness(0.95)' }} 
              loading="eager" 
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.781878696803!2d72.04431541521404!3d34.19277018056801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dcce3d053f3d1d%3A0x6bd6acb411121231!2sMaaz%20medical%20center!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
            ></iframe>

            {/* Bottom Overlay Box - Stacks cleanly on mobile */}
            <div className="map-overlay-box" style={{
              position: 'absolute',
              bottom: '0.85rem',
              left: '0.85rem',
              right: '0.85rem',
              background: 'rgba(15, 23, 42, 0.96)',
              backdropFilter: 'blur(12px)',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
            }}>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FFF' }}>
                  Emergency Contact Hotline
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                  Call {clinicData.contact.phonePrimary}
                </div>
              </div>

              <button 
                onClick={onOpenBooking} 
                className="btn-primary"
                style={{ padding: '0.5rem 1.1rem', fontSize: '0.825rem' }}
              >
                Book Now
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
