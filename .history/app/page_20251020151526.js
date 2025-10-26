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

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* Navigation */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 70px;
          background-color: rgba(114, 138, 156, 0.9);
          color: #728a9c;
          z-index: 1000;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
          padding: 0 2rem;
        }

        .navbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 15rem;
        }

        .navbar-right {
          display: flex;
          align-items: center;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-img {
          width: 50px;
          height: 50px;
          object-fit: contain;
        }

        .logo-text {
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--primary);
        }

        .logo-text1 {
          font-weight: 700;
          color: #ffffff;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: #ffffff;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 0;
          position: relative;
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          color: var(--primary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--primary);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .login-btn {
          background-color: var(--primary);
          color: white;
          border: none;
          padding: 0.6rem 1.5rem;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .login-btn:hover {
          background-color: var(--light);
          color: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          justify-content: space-around;
          width: 30px;
          height: 25px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          margin-left: 15px;
        }

        .mobile-menu-btn span {
          width: 100%;
          height: 3px;
          background-color: var(--primary);
          border-radius: 5px;
          transition: all 0.3s ease;
        }

        /* Sidebar */
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .sidebar-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: -300px;
          width: 300px;
          height: 100%;
          background-color: var(--grey);
          z-index: 1000;
          transition: left 0.3s ease;
          overflow-y: auto;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
        }

        .sidebar.active {
          left: 0;
        }

        .sidebar-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .sidebar-links {
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
        }

        .sidebar-link {
          color: #ffffff;
          text-decoration: none;
          padding: 0.8rem 1.2rem;
          font-weight: 500;
          display: block;
          border-radius: 8px;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .sidebar-link:hover {
          color: var(--primary);
          background: var(--light);
          transform: translateX(5px);
        }

        /* Hero Section */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 0 4rem 2rem;
          background-color: #ffffff;
          margin-top: -12px;
        }

        .hero-content {
          flex: 1;
        }

        .hero-container {
          padding: 0 2rem;
          max-width: 1200px;
          margin: -10px auto;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--grey);
          text-align: center;
        }

        .highlight {
          color: var(--primary);
        }

        .hero-subtitle {
          font-size: 1.3rem;
          margin-bottom: 2.5rem;
          color: var(--dark-alt);
          line-height: 1.8;
          max-width: 100%;
          text-align: justify;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          align-items: center;
        }

        .hero-image {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .image-container {
          position: relative;
          border-radius: 20px;
          padding: 2rem;
          max-width: 600px;
          width: 100%;
          margin: 0 auto;
          background: 
            linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 245, 0.9)) padding-box,
            linear-gradient(135deg, #121731, #728a9c) border-box;
          border: 3px solid transparent;
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12), 
                      0 4px 8px rgba(0, 0, 0, 0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .image-container:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 35px rgba(0, 0, 0, 0.15), 
                      0 6px 12px rgba(0, 0, 0, 0.08);
          background: 
            linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 245, 0.9)) padding-box,
            linear-gradient(135deg, #728a9c, #EEEEEE) border-box;
        }

        .hero-img {
          width: 100%;
          max-width: 600px;
          height: auto;
          object-fit: contain;
        }

        .image-quote {
          margin-top: 1.5rem;
          font-size: 2rem;
          color: var(--primary);
          text-align: center;
          font-weight: 500;
          max-width: 90%;
          line-height: 1.3;
        }

        .cta-button {
          padding: 1rem 2rem;
          border-radius: 30px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          text-decoration: none;
          outline: none;
        }

        .cta-button.primary {
          background: linear-gradient(135deg, #121731, #728a9c);
          color: #EEEEEE;
          padding: 0.8rem 1.6rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 1.1rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 15px rgba(18, 23, 49, 0.25);
          text-decoration: none;
          display: inline-block;
        }

        .cta-button.primary:hover {
          background: linear-gradient(135deg, #728a9c, #EEEEEE);
          color: #121731;
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(114, 138, 156, 0.4);
        }

        .design {
          color: var(--grey);
          font-style: italic;
        }

        .container2 {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1px;
        }

        /* Services Section */
        .services-section {
          padding: 2rem 0;
          max-width: 1200px;
          margin: 0 auto;
          margin-bottom: 67px;
        }

        .section-title {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 1rem;
          font-weight: 700;
          color: #121731;
          letter-spacing: 0.5px;
        }

        .section-subtitle {
          text-align: center;
          font-size: 1.2rem;
          color: #728a9c;
          max-width: 700px;
          margin: 0 auto 3rem;
          line-height: 1.6;
          font-weight: 400;
        }

        /* Services Grid */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          padding: 0 20px;
        }

        /* Flip Card Container */
        .flip-card {
          background-color: transparent;
          width: 100%;
          height: 250px;
          perspective: 1000px;
          border-radius: 15px;
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.6s;
        }

        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        /* Flip Card Inner */
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
          border-radius: 15px;
        }

        /* Front and Back of the Card */
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .flip-card-front {
          background-color: #ffffff;
          color: #121731;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .flip-card-back {
          background: linear-gradient(135deg, #121731, #728a9c);
          color: white;
          transform: rotateY(180deg);
        }

        .flip-card-back h3 {
          margin-bottom: 10px;
          font-size: 1.5rem;
        }

        .flip-card-back p {
          font-size: 0.95rem;
          opacity: 0.9;
        }

        .service-icon {
          font-size: 3rem;
          color: #728a9c;
          margin-bottom: 15px;
          transition: color 0.3s;
        }

        .flip-card-front h3 {
          font-size: 1.3rem;
          font-weight: 600;
        }

        .flip-card:hover .service-icon {
          color: #121731;
        }

        /* Guide Section */
        .guide-section {
          padding: 80px 0;
          background-color: #f7f9fc;
        }

        .section-title1 {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 1rem;
          font-weight: 700;
          color: #121731;
        }

        .section-subtitle1 {
          text-align: center;
          font-size: 1.2rem;
          color: #728a9c;
          max-width: 700px;
          margin: 0 auto 3rem;
          line-height: 1.6;
        }

        .steps-container {
          display: flex;
          gap: 40px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .steps-column {
          flex: 1;
          min-width: 300px;
          max-width: 450px;
        }

        .step {
          display: flex;
          align-items: flex-start;
          margin-bottom: 35px;
          padding: 20px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          border-left: 5px solid #728a9c;
          transition: all 0.3s ease;
        }

        .step:hover {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          transform: translateY(-5px);
          border-left-color: #121731;
        }

        .step-number {
          font-size: 2rem;
          font-weight: 700;
          color: #121731;
          margin-right: 20px;
          min-width: 40px;
          text-align: center;
          padding-top: 5px;
        }

        .step-content h3 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #121731;
          margin-bottom: 5px;
        }

        .step-content p {
          font-size: 0.95rem;
          color: #555;
          line-height: 1.5;
        }

        /* CTA Section */
        .cta-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #121731, #728a9c);
          color: white;
          text-align: center;
        }

        .cta-section h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .cta-section p {
          font-size: 1.2rem;
          margin-bottom: 30px;
          opacity: 0.9;
        }

        .cta-button.large {
          font-size: 1.2rem;
          padding: 1rem 2.5rem;
          background-color: #ffffff;
          color: #121731;
          font-weight: 700;
          border: 2px solid #ffffff;
        }

        .cta-button.large:hover {
          background-color: transparent;
          color: #ffffff;
          border-color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(255, 255, 255, 0.3);
        }

        /* Footer */
        .footer {
          background-color: #121731;
          color: #ffffff;
          padding: 40px 0 20px;
        }

        .container3 {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 20px;
          margin-bottom: 20px;
        }

        .footer-section, .footer-section1, .footer-section2 {
          flex: 1;
          min-width: 200px;
          margin-bottom: 20px;
        }

        .logo-container3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 10px;
        }

        .logo-img3 {
          width: 50px;
          height: 50px;
          object-fit: contain;
        }

        .logo-text3 {
          font-weight: 700;
          font-size: 1.5rem;
          color: #728a9c;
        }

        .logo-text4 {
          font-weight: 700;
          color: #ffffff;
        }

        .footer-section h3, .footer-section1 h3, .footer-section2 h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 15px;
          color: #ffffff;
        }

        .footer-section1 p, .footer-section2 p {
          margin-bottom: 10px;
          font-size: 0.95rem;
          opacity: 0.8;
        }

        .footer-section1 i {
          margin-right: 8px;
          color: #728a9c;
        }

        .social-links a {
          color: #ffffff;
          font-size: 1.5rem;
          margin-right: 15px;
          transition: color 0.3s;
        }

        .social-links a:hover {
          color: #728a9c;
        }

        .footer-bottom {
          text-align: center;
          font-size: 0.85rem;
          opacity: 0.7;
        }

        /* Responsive Design */
        @media (max-width: 1100px) {
          .navbar-left {
            gap: 5rem;
          }
        }

        @media (max-width: 992px) {
          .navbar {
            padding: 0 1rem;
          }
          
          .nav-links {
            display: none;
          }
          
          .mobile-menu-btn {
            display: flex;
          }
          
          .hero-section {
            padding: 0 2rem 2rem;
          }
          
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .steps-container {
            flex-direction: column;
            align-items: center;
          }
          
          .steps-column {
            max-width: 90%;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .image-quote {
            font-size: 1.5rem;
          }
          
          .services-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .flip-card {
            height: 200px;
          }
          
          .section-title, .section-title1, .cta-section h2 {
            font-size: 2rem;
          }
          
          .section-subtitle, .section-subtitle1, .cta-section p {
            font-size: 1rem;
          }
          
          .step {
            padding: 15px;
          }
          
          .footer-content {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          
          .footer-section, .footer-section1, .footer-section2 {
            min-width: auto;
            width: 100%;
            margin-bottom: 20px;
          }
          
          .footer-section1 {
            order: 3;
          }

          .footer-section2 {
            order: 2;
          }
          
          .social-links {
            justify-content: center;
            display: flex;
          }
        }

        @media (max-width: 576px) {
          .logo-text, .logo-text1 {
            font-size: 1.3rem;
          }
          
          .logo-img {
            width: 40px;
            height: 40px;
          }
          
          .login-btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1rem;
          }
          
          .cta-button.primary {
            padding: 0.6rem 1.2rem;
          }
          
          .image-quote {
            font-size: 1.3rem;
          }
          
          .flip-card-front h3 {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 1200px) {
          .hero-section {
            padding: 0 3rem 2rem;
          }
          
          .hero-title {
            font-size: 3rem;
          }
          
          .hero-subtitle {
            font-size: 1.3rem;
          }
          
          .image-container {
            max-width: 500px;
            padding: 1.8rem;
          }
          
          .hero-img {
            max-width: 320px;
          }
          
          .image-quote {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 992px) {
          .hero-section {
            flex-direction: column;
            text-align: center;
            margin-top: -60px;
            gap: 3rem;
            padding: 0 3rem 2rem;
          }
          
          .hero-content, .hero-image {
            width: 100%;
          }
          
          .hero-container {
            padding: 0 1.5rem;
            margin: 0 auto;
          }
          
          .hero-subtitle {
            text-align: center;
            max-width: 100%;
          }
          
          .image-container {
            max-width: 500px;
            margin: 0 auto;
            padding: 1.5rem;
          }
          
          .hero-img {
            max-width: 300px;
          }
          
          .image-quote {
            font-size: 1.7rem;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 0 2rem 2rem;
            margin-top: -40px;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.2rem;
            line-height: 1.6;
          }
          
          .hero-container {
            padding: 0 1rem;
          }
          
          .image-container {
            padding: 1.2rem;
            max-width: 450px;
          }
          
          .hero-img {
            max-width: 280px;
          }
          
          .image-quote {
            font-size: 1.6rem;
            margin-top: 1.2rem;
          }
          
          .cta-button.primary {
            padding: 0.7rem 1.4rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 576px) {
          .hero-section {
            padding: 0 1.5rem 2rem;
            margin-top: -30px;
            gap: 2.5rem;
          }
          
          .hero-title {
            font-size: 2.2rem;
            margin-bottom: 1.2rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
            margin-bottom: 2rem;
          }
          
          .image-container {
            padding: 1rem;
            max-width: 100%;
            border-width: 2px;
          }
          
          .hero-img {
            max-width: 250px;
          }
          
          .image-quote {
            font-size: 1.4rem;
            margin-top: 1rem;
            max-width: 95%;
          }
          
          .cta-button.primary {
            padding: 0.6rem 1.2rem;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 400px) {
          .hero-section {
            padding: 0 1rem 1.5rem;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1rem;
          }
          
          .image-container {
            padding: 0.8rem;
          }
          
          .hero-img {
            max-width: 220px;
          }
          
          .image-quote {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </>
  );
}