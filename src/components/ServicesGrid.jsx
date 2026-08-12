import React, { useState } from 'react';
import { servicesData } from '../data/servicesData';
import { Activity, Shield, Sparkles, Sun, Award, Droplets, Scissors, Smile, Clock, CheckCircle, ArrowRight, X } from 'lucide-react';

const iconMap = {
  Activity,
  Shield,
  Sparkles,
  Sun,
  Award,
  Droplets,
  Scissors,
  Smile
};

export default function ServicesGrid({ onSelectService, currentLang }) {
  const [selectedModalService, setSelectedModalService] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Endodontics', 'Implantology', 'Orthodontics', 'Cosmetics', 'Restorative', 'Preventive'];

  const filteredServices = filterCategory === 'All'
    ? servicesData
    : servicesData.filter(s => s.category === filterCategory);

  return (
    <section id="services" style={{ padding: '6rem 0', background: 'var(--navy-card)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag">
            {currentLang === 'UR' ? 'ہماری علاج معالجے کی خدمات' : 'Specialized Dental Treatments'}
          </span>
          <h2 className="section-title">
            {currentLang === 'UR' ? 'جدید اور مکمل ڈینٹل خدمات' : 'Comprehensive Advanced Dental Care'}
          </h2>
          <p className="section-desc">
            State-of-the-art procedures executed by FCPS Gold Medalist Dr. Ashfaq Ahmad using modern painless techniques.
          </p>

          {/* Category Filter Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.6rem',
            flexWrap: 'wrap',
            marginTop: '2rem'
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                style={{
                  padding: '0.55rem 1.25rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  background: filterCategory === cat ? 'linear-gradient(135deg, var(--accent-teal), var(--accent-cyan))' : 'rgba(255, 255, 255, 0.05)',
                  color: filterCategory === cat ? '#FFF' : 'var(--text-muted)',
                  border: filterCategory === cat ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'var(--transition)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.75rem'
        }}>
          {filteredServices.map((service) => {
            const IconComponent = iconMap[service.icon] || Activity;
            return (
              <div 
                key={service.id}
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%'
                }}
              >
                <div>
                  {/* Card Header: Icon Centered + Badge */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.25rem'
                  }}>
                    {/* Centered Icon Container */}
                    <div className="flex-center" style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      background: 'rgba(0, 168, 181, 0.12)',
                      border: '1px solid rgba(0, 194, 203, 0.35)',
                      flexShrink: 0
                    }}>
                      <IconComponent size={26} color="var(--accent-cyan)" />
                    </div>

                    <span className="badge-teal">
                      {service.category}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#FFF', marginBottom: '0.65rem' }}>
                    {service.title}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    {service.shortDesc}
                  </p>
                </div>

                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    marginBottom: '1.25rem'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Starts from</span>
                      <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gold-accent)' }}>
                        PKR {service.startingPricePKR.toLocaleString()}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <Clock size={14} color="var(--accent-cyan)" />
                      {service.duration}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button 
                      onClick={() => setSelectedModalService(service)}
                      className="btn-outline"
                      style={{ flex: 1, padding: '0.65rem 0.5rem', fontSize: '0.875rem', justifyContent: 'center' }}
                    >
                      Details
                    </button>
                    <button 
                      onClick={() => onSelectService(service.title)}
                      className="btn-primary"
                      style={{ flex: 1, padding: '0.65rem 0.5rem', fontSize: '0.875rem', justifyContent: 'center' }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Service Details Modal */}
      {selectedModalService && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          background: 'rgba(10, 25, 47, 0.88)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="glass-card" style={{
            maxWidth: '650px',
            width: '100%',
            padding: '2rem',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            border: '2px solid rgba(0, 194, 203, 0.4)'
          }}>
            <button
              onClick={() => setSelectedModalService(null)}
              className="flex-center"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#FFF',
                padding: '0.5rem',
                borderRadius: '50%'
              }}
            >
              <X size={20} />
            </button>

            <span className="badge-teal" style={{ marginBottom: '0.75rem' }}>
              {selectedModalService.category}
            </span>

            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFF', marginBottom: '1rem' }}>
              {selectedModalService.title}
            </h3>

            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              {selectedModalService.fullDesc}
            </p>

            <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>
              Key Benefits & Features:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {selectedModalService.benefits.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem', color: '#E2E8F0' }}>
                  <CheckCircle size={16} color="var(--accent-cyan)" />
                  {b}
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem'
            }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Starting Fee</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--gold-accent)' }}>
                  PKR {selectedModalService.startingPricePKR.toLocaleString()}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Recovery Period</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFF' }}>
                  {selectedModalService.recovery}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => {
                  const title = selectedModalService.title;
                  setSelectedModalService(null);
                  onSelectService(title);
                }}
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Book Appointment For {selectedModalService.title}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
