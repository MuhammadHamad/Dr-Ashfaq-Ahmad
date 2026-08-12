import React from 'react';
import { MapPin, Clock, Phone, Navigation, Calendar, ShieldCheck, ExternalLink, CheckCircle } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function LocationMap({ onOpenBooking, currentLang }) {
  return (
    <section id="location" style={{ padding: '6rem 0', background: 'var(--bg-card)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'rgba(0, 168, 181, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MapPin size={24} color="var(--accent-cyan)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFF' }}>
                  {clinicData.location.facility}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
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
                marginBottom: '2rem',
                padding: '0.9rem'
              }}
            >
              <Navigation size={18} />
              <span>Get Directions on Google Maps</span>
              <ExternalLink size={16} />
            </a>

            {/* Timings Matrix */}
            <h4 style={{ fontSize: '1.1rem', color: '#FFF', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} color="var(--accent-cyan)" />
              Weekly Clinical Operating Hours
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
              {clinicData.hours.map((h, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.6rem 0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  background: h.day === 'Sunday' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '0.9rem'
                }}>
                  <span style={{ fontWeight: 600, color: h.day === 'Sunday' ? '#F87171' : '#FFF' }}>{h.day}</span>
                  <span style={{ color: h.day === 'Sunday' ? '#F87171' : 'var(--accent-cyan)', fontWeight: 600 }}>{h.text}</span>
                </div>
              ))}
            </div>

            {/* Booking Portal Shortcuts */}
            <div style={{
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Also Available on Medical Portals:
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a 
                  href={clinicData.contact.marhamBookingUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="badge-teal"
                  style={{ padding: '0.5rem 1rem' }}
                >
                  <ExternalLink size={14} /> Book on Marham.pk
                </a>
                <a 
                  href={clinicData.contact.oladocBookingUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="badge-gold"
                  style={{ padding: '0.5rem 1rem' }}
                >
                  <ExternalLink size={14} /> Book on Oladoc.com
                </a>
              </div>
            </div>

          </div>

          {/* Right Column Map Embed View */}
          <div style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '2px solid rgba(0, 168, 181, 0.3)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            height: '100%',
            minHeight: '420px',
            position: 'relative'
          }}>
            <iframe 
              title="Dr. Ashfaq Ahmad Dental Clinic Location Mardan"
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'contrast(1.1) opacity(0.9)' }} 
              loading="lazy" 
              allowFullScreen
              src={`https://maps.google.com/maps?q=${encodeURIComponent(clinicData.location.embeddedMapQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
            ></iframe>

            <div style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1rem',
              right: '1rem',
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(12px)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFF' }}>
                  Emergency Contact Hotline
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>
                  Call {clinicData.contact.phonePrimary}
                </div>
              </div>

              <button 
                onClick={onOpenBooking} 
                className="btn-primary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
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
