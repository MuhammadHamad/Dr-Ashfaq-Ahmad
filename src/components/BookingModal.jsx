import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, MapPin, CheckCircle, MessageSquare, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { clinicData } from '../data/clinicData';
import { servicesData } from '../data/servicesData';

export default function BookingModal({ isOpen, onClose, initialService = '' }) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(initialService || 'General Dental Consultation');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('04:30 PM');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientArea, setPatientArea] = useState('Mardan');
  const [notes, setNotes] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split('T')[0]);
  }, [initialService, isOpen]);

  if (!isOpen) return null;

  const timeSlots = [
    '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM'
  ];

  const handleNextStep = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && !selectedDate) return;
    if (step === 3) {
      if (!patientName || !patientPhone) {
        alert('Please fill in your name and contact phone number.');
        return;
      }
      // Trigger Confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setBookingConfirmed(true);
      return;
    }
    setStep(prev => prev + 1);
  };

  const generateWhatsAppUrl = () => {
    const text = `*New Appointment Request - Dr. Ashfaq Ahmad Dental Clinic*%0A` +
      `*Patient Name:* ${patientName}%0A` +
      `*Phone:* ${patientPhone}%0A` +
      `*Area:* ${patientArea}%0A` +
      `*Service:* ${selectedService}%0A` +
      `*Date:* ${selectedDate}%0A` +
      `*Time Slot:* ${selectedTime}%0A` +
      `*Notes:* ${notes || 'None'}`;
    return `https://wa.me/${clinicData.contact.whatsappNumber}?text=${text}`;
  };

  const handleCloseAll = () => {
    setStep(1);
    setBookingConfirmed(false);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 3000,
      background: 'rgba(11, 25, 44, 0.88)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-card" style={{
        maxWidth: '580px',
        width: '100%',
        padding: 'clamp(1.25rem, 3vw, 2rem)',
        borderRadius: 'var(--radius-lg)',
        position: 'relative',
        border: '2px solid rgba(0, 168, 181, 0.4)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {/* Close Button */}
        <button
          onClick={handleCloseAll}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#FFF',
            padding: '0.4rem',
            borderRadius: '50%',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {!bookingConfirmed ? (
          <>
            {/* Header & Step Indicator */}
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="badge-teal" style={{ marginBottom: '0.4rem', fontSize: '0.75rem' }}>
                <Calendar size={13} /> Dr. Ashfaq Ahmad Dental Clinic
              </span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF' }}>
                Book Your Dental Appointment
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Maaz Medical Center, Shamsi Road, Muslimabad, Mardan
              </p>

              {/* Progress Bar */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginTop: '1rem'
              }}>
                {[1, 2, 3].map((s) => (
                  <div key={s} style={{
                    flex: 1,
                    height: '5px',
                    borderRadius: '3px',
                    background: s <= step ? 'linear-gradient(90deg, var(--accent-teal), var(--accent-cyan))' : 'rgba(255, 255, 255, 0.1)'
                  }}></div>
                ))}
              </div>
            </div>

            {/* STEP 1: SELECT SERVICE */}
            {step === 1 && (
              <div>
                <h4 style={{ fontSize: '1rem', color: 'var(--accent-cyan)', marginBottom: '0.85rem' }}>
                  Step 1: Select Dental Treatment
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '0.6rem',
                  maxHeight: '260px',
                  overflowY: 'auto',
                  paddingRight: '0.25rem'
                }}>
                  <div
                    onClick={() => setSelectedService('General Dental Consultation')}
                    style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      background: selectedService === 'General Dental Consultation' ? 'rgba(0, 168, 181, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      border: `1px solid ${selectedService === 'General Dental Consultation' ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.08)'}`,
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.9rem'
                    }}
                  >
                    🩺 General Dental Checkup & Consultation
                  </div>

                  {servicesData.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service.title)}
                      style={{
                        padding: '0.85rem',
                        borderRadius: 'var(--radius-md)',
                        background: selectedService === service.title ? 'rgba(0, 168, 181, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        border: `1px solid ${selectedService === service.title ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.08)'}`,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.9rem'
                      }}
                    >
                      <span style={{ fontWeight: 600, color: '#FFF' }}>{service.title}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--gold-accent)', fontWeight: 700 }}>
                        From PKR {service.startingPricePKR.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: DATE & TIME SLOT */}
            {step === 2 && (
              <div>
                <h4 style={{ fontSize: '1rem', color: 'var(--accent-cyan)', marginBottom: '0.85rem' }}>
                  Step 2: Choose Preferred Date & Time
                </h4>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                    Select Preferred Date:
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#FFF',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Available Afternoon/Evening Slots (Mardan Clinic):
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
                  gap: '0.5rem'
                }}>
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      style={{
                        padding: '0.55rem 0.3rem',
                        borderRadius: 'var(--radius-sm)',
                        background: selectedTime === slot ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.05)',
                        color: selectedTime === slot ? '#0F172A' : '#FFF',
                        fontWeight: selectedTime === slot ? 700 : 500,
                        border: 'none',
                        fontSize: '0.8rem'
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: PATIENT INFORMATION */}
            {step === 3 && (
              <div>
                <h4 style={{ fontSize: '1rem', color: 'var(--accent-cyan)', marginBottom: '0.85rem' }}>
                  Step 3: Patient Contact Information
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                      Patient Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Muhammad Hamad / Syeda Khan"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFF',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="0333 1234567"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFF',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                      City / Area in Mardan
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Shamsi Rd / Sheikh Maltoon / Baghdada"
                      value={patientArea}
                      onChange={(e) => setPatientArea(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFF',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1.5rem',
              paddingTop: '0.85rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(prev => prev - 1)}
                  className="btn-outline"
                  style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              <button
                type="button"
                onClick={handleNextStep}
                className="btn-primary"
                style={{ padding: '0.65rem 1.5rem', fontSize: '0.9rem' }}
              >
                {step === 3 ? 'Confirm & Book Appointment' : 'Next Step'}
              </button>
            </div>
          </>
        ) : (
          /* CONFIRMATION SUCCESS VIEW */
          <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid #34D399',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <CheckCircle size={32} color="#34D399" />
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF', marginBottom: '0.4rem' }}>
              Appointment Reserved!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Thank you, <strong>{patientName}</strong>. Your request has been created for <strong>{selectedService}</strong> on <strong>{selectedDate} at {selectedTime}</strong>.
            </p>

            <div className="glass-card" style={{ padding: '1rem', textAlign: 'left', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '0.3rem' }}>
                Clinic Location Details:
              </div>
              <div style={{ fontSize: '0.85rem', color: '#FFF', fontWeight: 600 }}>
                Dr. Ashfaq Ahmad Dental Clinic
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Maaz Medical Center, Shamsi Road, Muslimabad, Mardan
              </div>
            </div>

            {/* Instant WhatsApp Dispatch Button */}
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="btn-gold"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '0.85rem',
                fontSize: '0.95rem',
                marginBottom: '0.75rem'
              }}
            >
              <MessageSquare size={18} />
              <span>Send Instant Confirmation via WhatsApp</span>
            </a>

            <button
              onClick={handleCloseAll}
              className="btn-outline"
              style={{ width: '100%', justifyContent: 'center', padding: '0.65rem' }}
            >
              Done / Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
