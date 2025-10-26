'use client';

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
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} 
        onClick={closeSidebar}
      ></div>
      
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
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
        </div>
        <div className="sidebar-links">
          <a href="#home" className="sidebar-link" onClick={closeSidebar}>Home</a>
          <a href="#services" className="sidebar-link" onClick={closeSidebar}>Services</a>
          <a href="#guide" className="sidebar-link" onClick={closeSidebar}>Guide</a>
          <a href="#footer" className="sidebar-link" onClick={closeSidebar}>Contact Us</a>
        </div>
      </div>
      
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-container">
            <h1 className="hero-title">Welcome to <span className="highlight">CommuniTrade</span></h1>
            <p className="hero-subtitle">Your platform for community-based trading and sharing of skills and services without using money. Connect with your neighbors to exchange what you can do, share resources, and build a stronger community together.</p>
            <div className="hero-buttons">
              <a href="#services" className="cta-button primary">Learn More</a>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-container">
            <Image 
              src="/assets/picture.png" 
              alt="CommuniTrade Illustration" 
              width={600}
              height={400}
              className="hero-img"
            />
            <p className="image-quote">A <span className="design">Money-Free</span> Way <br /> to Exchange <span className="design">Skills</span></p>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="container2">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">CommuniTrade offers a variety of services to help you engage with your community</p>
          
          <div className="services-grid">
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="service-icon">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <h3>Skill & Service Exchange</h3>
                </div>
                <div className="flip-card-back">
                  <h3>Skill & Service Exchange</h3>
                  <p>Easily trade your skills and services with others without using money. Build connections while meeting your needs through fair exchanges.</p>
                </div>
              </div>
            </div>
            
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="service-icon">
                    <i className="fas fa-file-alt"></i>
                  </div>
                  <h3>Request Job Posting</h3>
                </div>
                <div className="flip-card-back">
                  <h3>Request Job Posting</h3>
                  <p>Post requests for the help you need and highlight what you can offer in return, making it simple to connect with the right people.</p>
                </div>
              </div>
            </div>
            
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="service-icon">
                    <i className="fas fa-tools"></i>
                  </div>
                  <h3>Skill/Service Listings</h3>
                </div>
                <div className="flip-card-back">
                  <h3>Skill/Service Listings</h3>
                  <p>Create a personal listing of your skills and services so others can quickly discover and reach out to you for exchanges.</p>
                </div>
              </div>
            </div>
            
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="service-icon">
                    <i className="fas fa-comment-dots"></i>
                  </div>
                  <h3>Direct Messaging</h3>
                </div>
                <div className="flip-card-back">
                  <h3>Direct Messaging</h3>
                  <p>Use a secure chat system to communicate, discuss details, and confirm agreements before starting an exchange.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section id="guide" className="guide-section">
        <div className="container">
          <h2 className="section-title1">How It Works</h2>
          <p className="section-subtitle1">Begin your CommuniTrade experience with ease</p>
          
          <div className="steps-container">
            <div className="steps-column">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Sign Up and Create a Profile</h3>
                  <p>Start by registering on CommuniTrade. Build your profile by adding your skills, services, and any experience you'd like to share.</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Post What You Need or What You Can Offer</h3>
                  <p>Create a Job Posting to request the service you need and offer something in return, or use the Job Seeker Posting to showcase your skills and make them available to others.</p>
                </div>
              </div>
            </div>
            
            <div className="steps-column">
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Browse and Search</h3>
                  <p>Use the Search function to explore available skills and services. You can filter by category, location, or keywords to quickly find what matches your needs.</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Connect with Other Members</h3>
                  <p>When you find someone offering what you need, view their User Profile to check their skills, and use Direct Messaging to securely communicate and discuss the details.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Join Your Community?</h2>
          <p>Start trading and building connections today</p>
          <a href="/register" className="cta-button large">Sign Up Now</a>
        </div>
      </section>
      
      {/* Footer */}
      <footer id="footer" className="footer">
        <div className="container3">
          <div className="footer-content">
            <div className="footer-section">
              <div className="logo-container3">
                <Image 
                  src="/assets/CommuniTrade.png" 
                  alt="CommuniTrade Logo" 
                  width={50}
                  height={50}
                  className="logo-img3"
                />
                <div className="design1">
                  <p className="logo-text3">Communi<span className="logo-text4">Trade</span></p>
                </div>
              </div>
              <p style={{ marginLeft: '1rem' }}>Building stronger communities through sharing and trading.</p>
            </div>
            
            <div className="footer-section1">
              <h3>Contact Us</h3>
              <p><i className="fas fa-envelope"></i> CommuniTrade@gmail.com</p>
              <p><i className="fas fa-phone"></i> 0912-345-6789</p>
            </div>
            
            <div className="footer-section2">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2025 CommuniTrade. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        /* All your CSS styles from the previous response go here */
        /* I'm omitting them for brevity since they're the same as before */
        :root {
          --primary: #728a9c;
          --light: #EEEEEE;
          --grey: #121731;
          --dark-alt: #555;
        }

        html {
          scroll-behavior: smooth;
          margin-top: 60px;
        }

        #services {
          scroll-margin-top: 70px;
          margin-top: 50px;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          scrollbar-width: thin;
          scrollbar-color: #728a9c #f0f0f0;
        }

        body {
          font-family: 'Poppins', sans-serif;
          background-color: var(--light);
          color: var(--dark-alt);
          line-height: 1.6;
        }

        /* ... include all the rest of your CSS styles here ... */
      `}</style>
    </>
  );
}