import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import DoctorProfile from './components/DoctorProfile';
import ServicesGrid from './components/ServicesGrid';
import BeforeAfter from './components/BeforeAfter';
import CostCalculator from './components/CostCalculator';
import Testimonials from './components/Testimonials';
import LocationMap from './components/LocationMap';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import { MessageSquare, PhoneCall } from 'lucide-react';
import { clinicData } from './data/clinicData';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [initialServiceForModal, setInitialServiceForModal] = useState('');
  const [currentLang, setCurrentLang] = useState('EN'); // 'EN' or 'UR'

  const handleOpenBooking = (serviceName = '') => {
    setInitialServiceForModal(typeof serviceName === 'string' ? serviceName : '');
    setIsBookingOpen(true);
  };

  const handleToggleLang = () => {
    setCurrentLang(prev => prev === 'EN' ? 'UR' : 'EN');
  };

  return (
    <div className={currentLang === 'UR' ? 'lang-ur' : 'lang-en'} style={{ minHeight: '100vh' }}>
      {/* Navigation Header */}
      <Navbar 
        onOpenBooking={() => handleOpenBooking()} 
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
      />

      {/* Main Content Sections */}
      <main>
        <Hero 
          onOpenBooking={() => handleOpenBooking()} 
          currentLang={currentLang} 
        />
        
        <TrustBadges />
        
        <DoctorProfile 
          onOpenBooking={() => handleOpenBooking()} 
          currentLang={currentLang} 
        />
        
        <ServicesGrid 
          onSelectService={(serviceName) => handleOpenBooking(serviceName)} 
          currentLang={currentLang} 
        />
        
        <BeforeAfter 
          currentLang={currentLang} 
        />
        
        <CostCalculator 
          onOpenBookingWithServices={(servicesList) => {
            const joined = Array.isArray(servicesList) ? servicesList.join(', ') : servicesList;
            handleOpenBooking(joined);
          }} 
          currentLang={currentLang} 
        />
        
        <Testimonials 
          currentLang={currentLang} 
        />
        
        <LocationMap 
          onOpenBooking={() => handleOpenBooking()} 
          currentLang={currentLang} 
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenBooking={() => handleOpenBooking()} 
        currentLang={currentLang} 
      />

      {/* Interactive Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={initialServiceForModal}
      />

      {/* Floating Action Buttons (Sticky WhatsApp & Call Buttons) */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem'
      }}>
        {/* Floating WhatsApp Button */}
        <a 
          href={`https://wa.me/${clinicData.contact.whatsappNumber}?text=Assalam%20o%20Alaikum%20Dr.%20Ashfaq%20Dental%20Clinic,%20I%20want%20to%20book%20an%20appointment.`}
          target="_blank"
          rel="noreferrer"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#25D366',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(37, 211, 102, 0.5)',
            transition: 'var(--transition)'
          }}
          title="Direct WhatsApp Doctor Inquiry"
        >
          <MessageSquare size={28} />
        </a>

        {/* Floating Phone Call Button */}
        <a 
          href={`tel:${clinicData.contact.phonePrimary}`}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-teal), var(--accent-cyan))',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(0, 168, 181, 0.5)',
            transition: 'var(--transition)'
          }}
          title="Call Clinic Emergency Hotline"
        >
          <PhoneCall size={24} />
        </a>
      </div>

    </div>
  );
}
