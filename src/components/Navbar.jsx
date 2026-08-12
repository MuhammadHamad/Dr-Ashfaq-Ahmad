import React, { useState, useEffect } from 'react';
import { Phone, Calendar, MapPin, Menu, X, Shield, MessageSquare, Globe } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export default function Navbar({ onOpenBooking, currentLang, onToggleLang }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);

    const checkOpenStatus = () => {
      const now = new Date();
      const dayIndex = now.getDay();
      const timeInMinutes = now.getHours() * 60 + now.getMinutes();
      setIsOpenNow(dayIndex !== 0 && timeInMinutes >= 930 && timeInMinutes <= 1260);
    };

    checkOpenStatus();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const statusBadge = (
    <span className="nav-status-badge" style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.35rem',
      padding: '0.2rem 0.65rem',
      borderRadius: 'var(--radius-pill)',
      background: isOpenNow ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
      border: `1px solid ${isOpenNow ? '#10B981' : '#EF4444'}`,
      color: isOpenNow ? '#34D399' : '#F87171',
      fontWeight: 600,
      fontSize: '0.725rem',
      whiteSpace: 'nowrap'
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        backgroundColor: isOpenNow ? '#34D399' : '#F87171',
        boxShadow: isOpenNow ? '0 0 6px #34D399' : 'none',
        display: 'inline-block'
      }} />
      {isOpenNow ? 'Open (3:30–9 PM)' : 'Closed'}
    </span>
  );

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>

      {/* ── DESKTOP TOP BAR (hidden on mobile via CSS class) ── */}
      <div className="desktop-only" style={{
        background: '#060F1E',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '0.4rem 0',
        fontSize: '0.8rem'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
              <MapPin size={13} color="var(--accent-cyan)" />
              {clinicData.location.facility}, {clinicData.location.address}
            </span>
            {statusBadge}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href={`tel:${clinicData.contact.phonePrimary}`} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
              color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.8rem'
            }}>
              <Phone size={12} />
              {clinicData.contact.phonePrimary}
            </a>
            <button onClick={onToggleLang} style={{
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
              color: '#FFF', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-pill)',
              fontSize: '0.725rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem'
            }}>
              <Globe size={11} />
              {currentLang === 'EN' ? 'اردو' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <nav style={{
        background: isScrolled ? 'rgba(10,25,47,0.97)' : 'rgba(10,25,47,0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: isScrolled ? '1px solid rgba(0,168,181,0.2)' : '1px solid rgba(255,255,255,0.06)',
        boxShadow: isScrolled ? '0 8px 30px rgba(0,0,0,0.35)' : 'none',
        transition: 'var(--transition)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px'
        }}>

          {/* LOGO */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', flexShrink: 0 }}>
            <div className="flex-center" style={{
              width: 38, height: 38, borderRadius: 10, flexShrink: 0,
              background: 'linear-gradient(135deg, var(--accent-teal), var(--accent-cyan))',
              boxShadow: '0 4px 12px rgba(0,168,181,0.35)'
            }}>
              <Shield size={20} color="#FFF" />
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800,
                color: '#FFF', lineHeight: 1.15, whiteSpace: 'nowrap'
              }}>Dr. Ashfaq Ahmad</div>
              <div style={{
                fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 600,
                letterSpacing: '0.04em', whiteSpace: 'nowrap'
              }}>Dental Clinic • Mardan</div>
            </div>
          </a>

          {/* ── DESKTOP CENTER NAV LINKS ── */}
          <div className="desktop-only" style={{
            display: 'flex', alignItems: 'center', gap: '2.5rem'
          }}>
            <a href="#about" className="nav-link">About Doctor</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#before-after" className="nav-link">Results</a>
            <a href="#cost-calculator" className="nav-link">Fee Estimator</a>
            <a href="#location" className="nav-link">Location</a>
          </div>

          {/* ── DESKTOP RIGHT CTAs ── */}
          <div className="desktop-only" style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0
          }}>
            <a
              href={`https://wa.me/${clinicData.contact.whatsappNumber}?text=Assalam%20o%20Alaikum%20Dr.%20Ashfaq%20Dental%20Clinic,%20I%20want%20to%20inquire%20about%20an%20appointment.`}
              target="_blank" rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                background: '#25D366', color: '#FFF', padding: '0.6rem 1.15rem',
                borderRadius: 'var(--radius-pill)', fontWeight: 600, fontSize: '0.85rem',
                boxShadow: '0 4px 14px rgba(37,211,102,0.3)'
              }}
            >
              <MessageSquare size={15} />
              WhatsApp
            </a>
            <button onClick={onOpenBooking} className="btn-primary"
              style={{ padding: '0.6rem 1.3rem', fontSize: '0.85rem' }}>
              <Calendar size={15} />
              Book Appointment
            </button>
          </div>

          {/* ── MOBILE RIGHT: status + hamburger ── */}
          <div className="mobile-only" style={{
            display: 'none', alignItems: 'center', gap: '0.6rem', flexShrink: 0
          }}>
            {statusBadge}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              className="flex-center"
              style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#FFF'
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </nav>

      {/* ── MOBILE SLIDE-DOWN DRAWER ── */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-view animate-slide-down" style={{
          background: 'rgba(7,19,34,0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '2px solid var(--accent-cyan)',
          padding: '1.5rem 1.25rem 1.75rem',
          boxShadow: '0 30px 60px rgba(0,0,0,0.6)'
        }}>
          {/* Links */}
          {[
            { href: '#about', label: 'About Doctor', emoji: '👨‍⚕️' },
            { href: '#services', label: 'Services & Treatments', emoji: '🦷' },
            { href: '#before-after', label: 'Smile Transformations', emoji: '✨' },
            { href: '#cost-calculator', label: 'Fee Estimator (PKR)', emoji: '🧮' },
            { href: '#location', label: 'Location & Hours', emoji: '📍' }
          ].map((item, i, arr) => (
            <a key={item.href} href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'block', padding: '0.85rem 0', fontSize: '1.05rem',
                fontWeight: 600, color: '#FFF',
                borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none'
              }}
            >
              {item.emoji}  {item.label}
            </a>
          ))}

          {/* Divider + Actions */}
          <div style={{
            marginTop: '1rem', paddingTop: '1.25rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', flexDirection: 'column', gap: '0.75rem'
          }}>
            <button onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '0.95rem' }}>
              <Calendar size={18} />
              Book Appointment
            </button>

            <a href={`https://wa.me/${clinicData.contact.whatsappNumber}`}
              target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                background: '#25D366', color: '#FFF', padding: '0.85rem',
                borderRadius: 'var(--radius-pill)', fontWeight: 700, fontSize: '0.95rem'
              }}
            >
              <MessageSquare size={18} />
              WhatsApp {clinicData.contact.whatsappDisplay}
            </a>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.5rem 0', fontSize: '0.8rem', color: 'var(--text-muted)'
            }}>
              <a href={`tel:${clinicData.contact.phonePrimary}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-cyan)'
              }}>
                <Phone size={13} /> {clinicData.contact.phonePrimary}
              </a>
              <button onClick={onToggleLang} style={{
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#FFF', padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-pill)',
                fontSize: '0.725rem', fontWeight: 600
              }}>
                {currentLang === 'EN' ? 'اردو' : 'English'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
