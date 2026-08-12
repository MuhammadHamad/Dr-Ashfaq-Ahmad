import React, { useState } from 'react';
import { initialReviews } from '../data/reviewsData';
import { Star, Quote, CheckCircle, Plus, X, MessageSquare } from 'lucide-react';

export default function Testimonials({ currentLang }) {
  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewLocation, setNewReviewLocation] = useState('Mardan');
  const [newReviewProcedure, setNewReviewProcedure] = useState('Dental Consultation');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReviewName || !newReviewComment) return;

    const newObj = {
      id: Date.now(),
      name: newReviewName,
      location: newReviewLocation,
      rating: newReviewRating,
      date: 'Just now',
      procedure: newReviewProcedure,
      comment: newReviewComment,
      verified: true,
      avatar: newReviewName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    };

    setReviewsList([newObj, ...reviewsList]);
    setShowReviewModal(false);
    setNewReviewName('');
    setNewReviewComment('');
  };

  return (
    <section id="reviews" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">
            {currentLang === 'UR' ? 'مریضوں کی رائے' : 'Patient Reviews'}
          </span>
          <h2 className="section-title">
            {currentLang === 'UR' ? 'مردان کے شہریوں کے تاثرات' : 'Trusted by Thousands of Smiles in Mardan'}
          </h2>
          <p className="section-desc">
            Read real patient feedback from residents across Mardan, Sheikh Maltoon, Shamsi Road, and Baghdada.
          </p>

          <button 
            onClick={() => setShowReviewModal(true)}
            className="btn-outline" 
            style={{ marginTop: '1.5rem', padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}
          >
            <Plus size={16} />
            <span>Write a Patient Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {reviewsList.map((rev) => (
            <div 
              key={rev.id}
              className="glass-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Rating & Procedure */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>

                  <span className="badge-teal" style={{ fontSize: '0.75rem' }}>
                    {rev.procedure}
                  </span>
                </div>

                <p style={{
                  fontSize: '0.95rem',
                  color: '#E2E8F0',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                  fontStyle: 'italic'
                }}>
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-teal), var(--navy-light))',
                  border: '1px solid rgba(0, 194, 203, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: '#FFF'
                }}>
                  {rev.avatar}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontWeight: 700, color: '#FFF', fontSize: '0.95rem' }}>{rev.name}</span>
                    {rev.verified && <CheckCircle size={14} color="var(--accent-cyan)" />}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {rev.location} • {rev.date}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Leave Review Modal */}
      {showReviewModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 3000,
          background: 'rgba(11, 25, 44, 0.85)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="glass-card" style={{
            maxWidth: '500px',
            width: '100%',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowReviewModal(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#FFF',
                padding: '0.4rem',
                borderRadius: '50%'
              }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF', marginBottom: '1rem' }}>
              Share Your Experience
            </h3>

            <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Your Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Full Name" 
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.15)', color: '#FFF' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Area / Neighborhood</label>
                <input 
                  type="text" 
                  placeholder="e.g. Shamsi Road / Sheikh Maltoon" 
                  value={newReviewLocation}
                  onChange={(e) => setNewReviewLocation(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.15)', color: '#FFF' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Procedure Received</label>
                <input 
                  type="text" 
                  placeholder="e.g. Root Canal / Whitening / Consultation" 
                  value={newReviewProcedure}
                  onChange={(e) => setNewReviewProcedure(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.15)', color: '#FFF' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Star Rating</label>
                <select 
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.15)', color: '#FFF' }}
                >
                  <option value={5}>5 Stars (Excellent)</option>
                  <option value={4}>4 Stars (Good)</option>
                  <option value={3}>3 Stars (Average)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Review Comments *</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Describe your treatment experience with Dr. Ashfaq Ahmad..." 
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.15)', color: '#FFF' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
