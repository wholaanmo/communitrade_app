import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const navigateToLogin = () => {
    window.location.href = '/login';
  };

  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleSmoothScroll = (e) => {
      const link = e.target.closest('a');
      if (link && link.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      }
    };

    // Add click event for mobile devices to ensure flip works on touch devices
    const handleCardTouch = (e) => {
      if (window.innerWidth < 768) {
        e.currentTarget.classList.toggle('flipped');
      }
    };

    const links = document.querySelectorAll('.nav-link, .sidebar-link');
    links.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    const cards = document.querySelectorAll('.flip-card');
    cards.forEach(card => {
      card.addEventListener('touchstart', handleCardTouch);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
      cards.forEach(card => {
        card.removeEventListener('touchstart', handleCardTouch);
      });
    };
  }, []);

  return (
    <>
      <Head>
        <title>CommuniTrade - Community-Based Trading</title>
        <meta name="description" content="Your platform for community-based trading and sharing of skills and services without using money." />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      </Head>

      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <div className="logo-container">
              <Image 
                src="/assets/CommuniTrade.png" 
                alt="CommuniTrade Logo" 
                width={50}
                height={50}
                className="logo-img"
              />
              <p className="logo-text">Communi<span className="logo-text1">Trade</span></p>
            </div>
            
            <div className="nav-links">
              <a href="#home" className="nav-link">Home</a>
              <a href="#services" className="nav-link">Services</a>
              <a href="#guide" className="nav-link">Guide</a>
              <a href="#footer" className="nav-link">Contact Us</a>
            </div>
          </div>
          
          <div className="navbar-right">
            <button className="login-btn" onClick={navigateToLogin}>Login</button>
            <button className="mobile-menu-btn" onClick={toggleSidebar}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
