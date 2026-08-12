import React from 'react';
import { Award, Users, Shield, HeartPulse } from 'lucide-react';

export default function TrustBadges() {
  const stats = [
    {
      icon: Award,
      title: "FCPS Gold Medalist",
      subtitle: "Specialist Dental Surgeon",
      color: "var(--gold-accent)"
    },
    {
      icon: Users,
      title: "12,000+ Patients",
      subtitle: "Successfully Treated in Mardan",
      color: "var(--accent-cyan)"
    },
    {
      icon: Shield,
      title: "Class B Autoclave",
      subtitle: "100% Sterilization Standard",
      color: "#34D399"
    },
    {
      icon: HeartPulse,
      title: "Single-Sitting RCT",
      subtitle: "Painless Endodontics",
      color: "#F472B6"
    }
  ];

  return (
    <section style={{
      marginTop: '-2rem',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
        }}>
          {stats.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.25rem 0'
                }}
              >
                <div className="flex-center" style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: `rgba(255, 255, 255, 0.05)`,
                  border: `1px solid ${item.color}45`,
                  flexShrink: 0
                }}>
                  <IconComponent size={24} color={item.color} />
                </div>

                <div>
                  <div style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.2
                  }}>
                    {item.title}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)'
                  }}>
                    {item.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
