import React, { useState } from 'react';
import { Calculator, Check, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { servicesData } from '../data/servicesData';

export default function CostCalculator({ onOpenBookingWithServices, currentLang }) {
  const [selectedItems, setSelectedItems] = useState({
    'scaling-polishing': 1
  });

  const toggleItem = (id) => {
    setSelectedItems(prev => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = 1;
      }
      return next;
    });
  };

  const updateQuantity = (id, delta) => {
    setSelectedItems(prev => {
      const currentQty = prev[id] || 0;
      const newQty = Math.max(1, currentQty + delta);
      return { ...prev, [id]: newQty };
    });
  };

  const calculateTotal = () => {
    return Object.entries(selectedItems).reduce((sum, [id, qty]) => {
      const service = servicesData.find(s => s.id === id);
      return sum + (service ? service.startingPricePKR * qty : 0);
    }, 0);
  };

  const totalPKR = calculateTotal();

  return (
    <section id="cost-calculator" style={{ padding: 'clamp(4rem, 8vh, 6rem) 0', background: 'var(--bg-card)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-tag">
            {currentLang === 'UR' ? 'قیمت کا تخمینہ' : 'Transparent Fee Structure'}
          </span>
          <h2 className="section-title">
            {currentLang === 'UR' ? 'علاج کے اخراجات کا حظاب لگائیں' : 'Treatment Fee Estimator (PKR)'}
          </h2>
          <p className="section-desc">
            Select procedures below to calculate an instant estimated fee for your dental treatment at Dr. Ashfaq Ahmad Dental Clinic.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '2rem',
          alignItems: 'start'
        }} className="calculator-grid">

          {/* Procedures Selection List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {servicesData.map((service) => {
              const isSelected = !!selectedItems[service.id];
              const qty = selectedItems[service.id] || 1;

              return (
                <div 
                  key={service.id}
                  onClick={() => toggleItem(service.id)}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'rgba(0, 168, 181, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: `1.5px solid ${isSelected ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.08)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '6px',
                      border: `2px solid ${isSelected ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.3)'}`,
                      background: isSelected ? 'var(--accent-cyan)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {isSelected && <Check size={14} color="#FFF" />}
                    </div>

                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#FFF' }}>
                        {service.title}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        PKR {service.startingPricePKR.toLocaleString()} per unit
                      </div>
                    </div>
                  </div>

                  {isSelected ? (
                    <div 
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: 'rgba(15, 23, 42, 0.8)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-pill)',
                        border: '1px solid rgba(0, 194, 203, 0.4)',
                        flexShrink: 0
                      }}
                    >
                      <button 
                        onClick={() => updateQuantity(service.id, -1)}
                        style={{ background: 'none', border: 'none', color: '#FFF' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)', minWidth: '18px', textAlign: 'center' }}>
                        {qty}
                      </span>
                      <button 
                        onClick={() => updateQuantity(service.id, 1)}
                        style={{ background: 'none', border: 'none', color: '#FFF' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-accent)', flexShrink: 0 }}>
                      + PKR {service.startingPricePKR.toLocaleString()}
                    </span>
                  )}

                </div>
              );
            })}
          </div>

          {/* Fee Calculation Summary Card */}
          <div className="glass-card" style={{
            padding: '1.75rem',
            border: '2px solid rgba(212, 175, 55, 0.4)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--gold-accent)', fontWeight: 700, marginBottom: '1.25rem' }}>
              <Calculator size={20} />
              <span>Estimated Cost Summary</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {Object.keys(selectedItems).length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '1rem 0' }}>
                  No services selected. Click any treatment on the left to calculate.
                </p>
              ) : (
                Object.entries(selectedItems).map(([id, qty]) => {
                  const s = servicesData.find(item => item.id === id);
                  if (!s) return null;
                  return (
                    <div key={id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                      <span>{s.title} ({qty}x)</span>
                      <span style={{ fontWeight: 600 }}>PKR {(s.startingPricePKR * qty).toLocaleString()}</span>
                    </div>
                  );
                })
              )}
            </div>

            <div style={{
              borderTop: '1px dashed rgba(255, 255, 255, 0.2)',
              paddingTop: '1rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Total</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--gold-accent)' }}>
                PKR {totalPKR.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>
                *Final fee confirmed upon doctor's clinical examination.
              </div>
            </div>

            <button 
              onClick={() => {
                const names = Object.keys(selectedItems).map(id => {
                  const s = servicesData.find(item => item.id === id);
                  return s ? s.title : '';
                }).filter(Boolean);
                onOpenBookingWithServices(names);
              }}
              className="btn-gold" 
              style={{ width: '100%', justifyContent: 'center', padding: '0.9rem' }}
            >
              <span>Book Appointment For This Plan</span>
              <ArrowRight size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', justifyContent: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={15} color="var(--accent-cyan)" />
              No hidden charges • Transparent Consultation
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
