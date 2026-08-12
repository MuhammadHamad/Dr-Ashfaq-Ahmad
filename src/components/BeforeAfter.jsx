import React, { useState, useRef, useCallback, useEffect } from 'react';
import { beforeAfterCases } from '../data/beforeAfterData';
import { Sparkles, SlidersHorizontal, ArrowLeftRight } from 'lucide-react';

export default function BeforeAfter({ currentLang }) {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const activeCase = beforeAfterCases[activeCaseIndex];

  const getPosition = useCallback((clientX) => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    return Math.max(0, Math.min(100, percentage));
  }, []);

  // ── Mouse drag handlers ──
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    const pos = getPosition(e.clientX);
    if (pos !== null) setSliderPosition(pos);
  }, [getPosition]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const pos = getPosition(e.clientX);
    if (pos !== null) setSliderPosition(pos);
  }, [isDragging, getPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // ── Touch drag handlers ──
  const handleTouchStart = useCallback((e) => {
    setIsDragging(true);
    if (e.touches.length > 0) {
      const pos = getPosition(e.touches[0].clientX);
      if (pos !== null) setSliderPosition(pos);
    }
  }, [getPosition]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      const pos = getPosition(e.touches[0].clientX);
      if (pos !== null) setSliderPosition(pos);
    }
  }, [isDragging, getPosition]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Attach global mouseup/mousemove so dragging works even outside the container
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

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
            Click and drag the handle left or right to see actual dental restoration results performed at our clinic.
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
              <SlidersHorizontal size={14} /> Click & Drag to Compare
            </span>
          </div>

          {/* Drag Image Container */}
          <div 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{
              position: 'relative',
              height: 'clamp(260px, 45vh, 420px)',
              width: '100%',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              cursor: isDragging ? 'grabbing' : 'grab',
              border: '1px solid rgba(0, 168, 181, 0.3)',
              touchAction: 'none'
            }}
          >
            {/* After Image (Background) */}
            <img 
              src={activeCase.afterImg} 
              alt={activeCase.afterLabel}
              draggable={false}
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none'
              }}
            />

            {/* After Label */}
            <div style={{
              position: 'absolute',
              top: '0.85rem', right: '0.85rem',
              background: 'rgba(16, 185, 129, 0.9)',
              color: '#FFF',
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: 700, fontSize: '0.75rem',
              backdropFilter: 'blur(4px)',
              zIndex: 5,
              pointerEvents: 'none'
            }}>
              AFTER: {activeCase.afterLabel}
            </div>

            {/* Before Image (Clipped Overlay) */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0,
              height: '100%',
              width: `${sliderPosition}%`,
              overflow: 'hidden',
              borderRight: '3px solid var(--accent-cyan)',
              zIndex: 3,
              pointerEvents: 'none'
            }}>
              <img 
                src={activeCase.beforeImg} 
                alt={activeCase.beforeLabel}
                draggable={false}
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              {/* Before Label */}
              <div style={{
                position: 'absolute',
                top: '0.85rem', left: '0.85rem',
                background: 'rgba(239, 68, 68, 0.9)',
                color: '#FFF',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-pill)',
                fontWeight: 700, fontSize: '0.75rem',
                backdropFilter: 'blur(4px)'
              }}>
                BEFORE: {activeCase.beforeLabel}
              </div>
            </div>

            {/* Slider Handle Knob */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: `${sliderPosition}%`,
              transform: 'translate(-50%, -50%)',
              width: '42px', height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-teal), var(--accent-cyan))',
              border: '3px solid #FFF',
              boxShadow: isDragging
                ? '0 0 20px rgba(0, 194, 203, 1), 0 0 40px rgba(0, 194, 203, 0.4)'
                : '0 0 15px rgba(0, 194, 203, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              pointerEvents: 'none',
              transition: isDragging ? 'none' : 'box-shadow 0.3s ease'
            }}>
              <ArrowLeftRight size={18} color="#FFF" />
            </div>

            {/* Vertical guide line */}
            <div style={{
              position: 'absolute',
              top: 0, bottom: 0,
              left: `${sliderPosition}%`,
              width: '3px',
              background: 'var(--accent-cyan)',
              zIndex: 4,
              pointerEvents: 'none',
              transform: 'translateX(-50%)',
              opacity: 0.6
            }} />
          </div>

          <div style={{ textAlign: 'center', marginTop: '0.85rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {activeCase.details}
          </div>

        </div>

      </div>
    </section>
  );
}
