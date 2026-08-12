import React, { useState, useRef } from 'react';
import { beforeAfterCases } from '../data/beforeAfterData';
import { Sparkles, SlidersHorizontal, ArrowLeftRight } from 'lucide-react';

export default function BeforeAfter({ currentLang }) {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const activeCase = beforeAfterCases[activeCaseIndex];

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section id="before-after" style={{ padding: 'clamp(4rem, 8vh, 6rem) 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-tag">
            {currentLang === 'UR' ? 'علاج کے نتائج' : 'Smile Transformations'}
          </span>
          <h2 className="section-title">
            {currentLang === 'UR' ? 'حقیقی تبدیلی کا جائزہ لیں' : 'Interactive Before & After Gallery'}
          </h2>
          <p className="section-desc">
            Drag the handle left or right to see actual dental restoration and aesthetic procedure results performed at our clinic.
          </p>

          {/* Procedure selector tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginTop: '1.75rem',
            flexWrap: 'wrap'
          }}>
            {beforeAfterCases.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPosition(50);
                }}
                className={activeCaseIndex === idx ? 'btn-primary' : 'btn-outline'}
                style={{ fontSize: '0.85rem', padding: '0.55rem 1.1rem' }}
              >
                <Sparkles size={15} />
                {c.title}
              </button>
            ))}
          </div>
        </div>

        {/* Slider Container Box */}
        <div className="glass-card" style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: 'clamp(1rem, 3vw, 1.5rem)',
          borderRadius: 'var(--radius-lg)'
        }}>
          {/* Info Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFF' }}>
                {activeCase.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Patient Age: {activeCase.patientAge} • Procedure Time: {activeCase.duration}
              </p>
            </div>
            <span className="badge-gold" style={{ fontSize: '0.8rem' }}>
              <SlidersHorizontal size={14} /> Drag Slider to Compare
            </span>
          </div>

          {/* Drag Image Container */}
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchStart={(e) => handleTouchMove(e)}
            style={{
              position: 'relative',
              height: 'clamp(260px, 45vh, 420px)',
              width: '100%',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              userSelect: 'none',
              cursor: 'ew-resize',
              border: '1px solid rgba(0, 168, 181, 0.3)',
              touchAction: 'none'
            }}
          >
            {/* After Image (Background) */}
            <img 
              src={activeCase.afterImg} 
              alt={activeCase.afterLabel}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />

            {/* After Label */}
            <div style={{
              position: 'absolute',
              top: '0.85rem',
              right: '0.85rem',
              background: 'rgba(16, 185, 129, 0.9)',
              color: '#FFF',
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: 700,
              fontSize: '0.75rem',
              backdropFilter: 'blur(4px)',
              zIndex: 5
            }}>
              AFTER: {activeCase.afterLabel}
            </div>

            {/* Before Image (Clipped Overlay) */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${sliderPosition}%`,
              overflow: 'hidden',
              borderRight: '3px solid var(--accent-cyan)',
              zIndex: 3
            }}>
              <img 
                src={activeCase.beforeImg} 
                alt={activeCase.beforeLabel}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(25%) sepia(20%)'
                }}
              />

              {/* Before Label */}
              <div style={{
                position: 'absolute',
                top: '0.85rem',
                left: '0.85rem',
                background: 'rgba(239, 68, 68, 0.9)',
                color: '#FFF',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-pill)',
                fontWeight: 700,
                fontSize: '0.75rem',
                backdropFilter: 'blur(4px)'
              }}>
                BEFORE: {activeCase.beforeLabel}
              </div>
            </div>

            {/* Slider Handle Divider Knob */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: `${sliderPosition}%`,
              transform: 'translate(-50%, -50%)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-teal), var(--accent-cyan))',
              border: '3px solid #FFF',
              boxShadow: '0 0 15px rgba(0, 194, 203, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              pointerEvents: 'none'
            }}>
              <ArrowLeftRight size={18} color="#FFF" />
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '0.85rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {activeCase.details}
          </div>

        </div>

      </div>
    </section>
  );
}
