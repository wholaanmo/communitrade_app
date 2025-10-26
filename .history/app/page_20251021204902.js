"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ useRouter for navigation
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter(); // ✅ initialize router

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const navigateToLogin = () => {
    router.push("/login"); // ✅ use Next.js navigation
  };

  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleSmoothScroll = (e) => {
      const link = e.target.closest("a");
      if (link && link.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: "smooth",
          });
        }
      }
    };

    // Add click event for mobile devices to ensure flip works on touch devices
    const handleCardTouch = (e) => {
      if (window.innerWidth < 768) {
        e.currentTarget.classList.toggle("flipped");
      }
    };

    const links = document.querySelectorAll(".nav-link, .sidebar-link");
    links.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll);
    });

    const cards = document.querySelectorAll(".flip-card");
    cards.forEach((card) => {
      card.addEventListener("touchstart", handleCardTouch);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll);
      });
      cards.forEach((card) => {
        card.removeEventListener("touchstart", handleCardTouch);
      });
    };
  }, []);

  return (
    <>
      <Head>
        <title>CommuniTrade</title>
        <meta
          name="description"
          content="Your platform for community-based trading and sharing of skills and services without using money."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        />
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
              <p className="logo-text">
                Communi<span className="logo-text1">Trade</span>
              </p>
            </div>

            <div className="nav-links">
              <a href="#home" className="nav-link">
                Home
              </a>
              <a href="#services" className="nav-link">
                Services
              </a>
              <a href="#guide" className="nav-link">
                Guide
              </a>
              <a href="#footer" className="nav-link">
                Contact Us
              </a>
            </div>
          </div>

          <div className="navbar-right">
            <button className="login-btn" onClick={navigateToLogin}>
              Login
            </button>
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
              priority
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
                  <p>Start by registering for free on CommuniTrade. Build your profile by adding your skills, services, and any experience you'd like to share with others</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Post What You Can Offer</h3>
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
                  <p>When you find someone offering what you need, view their User Profile to check their skills, and use Direct Messaging to communicate and discuss details.</p>
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
          font-family: 'Poppins', sans-serif;
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
          background-color: rgba(114, 138, 156, 0.95);
          color: #728a9c;
          z-index: 1000;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
          padding: 0 1rem;
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
          gap: 2rem;
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
          width: 40px;
          height: 40px;
          object-fit: contain;
        }

        .logo-text {
          font-weight: 700;
          font-size: 1.3rem;
          color: #121731;
        }

        .logo-text1 {
          font-weight: 700;
          color: #ffffff;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
        }

        .nav-link {
          color: #ffffff;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 0;
          position: relative;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .nav-link:hover {
          color: #121731;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #121731;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
          
        }

        .login-btn {
          background-color: #121731;
          color: white;
          border: none;
          padding: 0.5rem 1.2rem;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          font-size: 0.9rem;
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
          background-color: #ffffff;
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
          width: 280px;
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
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .sidebar-links {
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
        }

        .sidebar-link {
          color: #ffffff;
          text-decoration: none;
          padding: 1rem 1.2rem;
          font-weight: 500;
          display: block;
          border-radius: 8px;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 1rem;
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
          padding: 2rem 1rem;
          background-color: #ffffff;
          margin-top: 0;
        }

        .hero-content {
          flex: 1;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-container {
          padding: 0 1rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        .hero-title {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--grey);
          text-align: left;
          line-height: 1.2;
          width: 100%;
        }

        .highlight {
          color: var(--primary);
        }

        .hero-subtitle {
          font-size: 1rem;
          margin-bottom: 2rem;
          color: var(--dark-alt);
          line-height: 1.6;
          text-align: left;
          max-width: 100%;
          width: 100%;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          width: 100%;
        }

        .hero-image {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          width: 100%;
        }

        .image-container {
          position: relative;
          border-radius: 15px;
          padding: 1.5rem;
          max-width: 100%;
          width: 100%;
          margin: 0 auto;
          background: 
            linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 245, 0.9)) padding-box,
            linear-gradient(135deg, #121731, #728a9c) border-box;
          border: 2px solid transparent;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .image-container:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
        }

        .hero-img {
          width: 100%;
          max-width: 400px;
          height: auto;
          object-fit: contain;
        }

        .image-quote {
          margin-top: 1rem;
          font-size: 1.4rem;
          color: var(--primary);
          text-align: center;
          font-weight: 500;
          max-width: 90%;
          line-height: 1.3;
        }

        .cta-button {
          padding: 0.8rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          text-decoration: none;
          outline: none;
          display: inline-block;
          text-align: center;
        }

        .cta-button.primary {
          background: linear-gradient(135deg, #121731, #728a9c);
          color: #EEEEEE;
          border: none;
          box-shadow: 0 4px 12px rgba(18, 23, 49, 0.2);
        }

        .cta-button.primary:hover {
          background: linear-gradient(135deg, #728a9c, #EEEEEE);
          color: #121731;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(114, 138, 156, 0.3);
        }

        .design {
          color: var(--grey);
          font-style: italic;
        }

        .container2 {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        /* Services Section */
        .services-section {
          padding: 3rem 0;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 2rem;
          text-align: center;
          margin-bottom: 1rem;
          font-weight: 700;
          color: #121731;
        }

        .section-subtitle {
          text-align: center;
          font-size: 1rem;
          color: #728a9c;
          max-width: 700px;
          margin: 0 auto 2rem;
          line-height: 1.5;
          font-weight: 400;
          padding: 0 1rem;
        }

        /* Services Grid */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          padding: 0 1rem;
          justify-items: center;
        }

        /* Flip Card Container */
        .flip-card {
          background-color: transparent;
          width: 100%;
          max-width: 280px;
          height: 300px;
          perspective: 1000px;
          border-radius: 12px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s;
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
          border-radius: 12px;
        }

        /* Front and Back of the Card */
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .flip-card-front {
          background-color: #ffffff;
          color: #121731;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .flip-card-back {
          background: linear-gradient(135deg, #121731, #728a9c);
          color: white;
          transform: rotateY(180deg);
        }

        .flip-card-back h3 {
          margin-bottom: 10px;
          font-size: 1.3rem;
        }

        .flip-card-back p {
          font-size: 0.9rem;
          opacity: 0.9;
          line-height: 1.4;
        }

        .service-icon {
          font-size: 2.5rem;
          color: #728a9c;
          margin-bottom: 15px;
          transition: color 0.3s;
        }

        .flip-card-front h3 {
          font-size: 1.2rem;
          font-weight: 600;
          line-height: 1.3;
        }

        .flip-card:hover .service-icon {
          color: #121731;
        }

        /* Guide Section */
        .guide-section {
          padding: 3rem 0;
          background-color: #f7f9fc;
        }

        .section-title1 {
          font-size: 2rem;
          text-align: center;
          margin-bottom: 1rem;
          font-weight: 700;
          color: #121731;
        }

        .section-subtitle1 {
          text-align: center;
          font-size: 1rem;
          color: #728a9c;
          max-width: 700px;
          margin: 0 auto 2rem;
          line-height: 1.5;
          padding: 0 1rem;
        }

        .steps-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: center;
          align-items: center;
        }

        .steps-column {
          width: 100%;
          max-width: 600px;
        }

        .step {
          display: flex;
          align-items: flex-start;
          margin-bottom: 1.5rem;
          padding: 1.5rem;
          background: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border-left: 4px solid #728a9c;
          transition: all 0.3s ease;
        }

        .step:hover {
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
          transform: translateY(-3px);
          border-left-color: #121731;
        }

        .step-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: #121731;
          margin-right: 15px;
          min-width: 35px;
          text-align: center;
          padding-top: 2px;
        }

        .step-content h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #121731;
          margin-bottom: 8px;
        }

        .step-content p {
          font-size: 0.9rem;
          color: #555;
          line-height: 1.5;
        }

        /* CTA Section */
        .cta-section {
          padding: 3rem 1rem;
          background: linear-gradient(135deg, #121731, #728a9c);
          color: white;
          text-align: center;
        }

        .cta-section h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .cta-section p {
          font-size: 1rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-button.large {
          font-size: 1rem;
          padding: 1rem 2rem;
          background-color: #ffffff;
          color: #121731;
          font-weight: 700;
          border: 2px solid #ffffff;
        }

        .cta-button.large:hover {
          background-color: transparent;
          color: #ffffff;
          border-color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(255, 255, 255, 0.2);
        }

        /* Footer */
        .footer {
          background-color: #121731;
          color: #ffffff;
          padding: 2rem 0 1rem;
        }

        .container3 {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .footer-section, .footer-section1, .footer-section2 {
          width: 100%;
          text-align: center;
        }

        .logo-container3 {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .logo-img3 {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }

        .logo-text3 {
          font-weight: 700;
          font-size: 1.3rem;
          color: #728a9c;
        }

        .logo-text4 {
          font-weight: 700;
          color: #ffffff;
        }

        .footer-section h3, .footer-section1 h3, .footer-section2 h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #ffffff;
        }

        .footer-section1 p, .footer-section2 p {
          margin-bottom: 0.8rem;
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .footer-section1 i {
          margin-right: 8px;
          color: #728a9c;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .social-links a {
          color: #ffffff;
          font-size: 1.3rem;
          transition: color 0.3s;
        }

        .social-links a:hover {
          color: #728a9c;
        }

        .footer-bottom {
          text-align: center;
          font-size: 0.8rem;
          opacity: 0.7;
        }

        /* Responsive Design */
        /* Small devices (landscape phones, 576px and up) */
        @media (min-width: 576px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .image-quote {
            font-size: 1.5rem;
          }
          
          .section-title, .section-title1, .cta-section h2 {
            font-size: 2.2rem;
          }
        }

        /* Medium devices (tablets, 768px and up) */
        @media (min-width: 768px) {
          .navbar {
            padding: 0 2rem;
          }
          
          .navbar-left {
            gap: 4rem;
          }
          
          .logo-text {
            font-size: 1.5rem;
          }
          
          .logo-img {
            width: 50px;
            height: 50px;
          }
          
          .nav-links {
            gap: 2rem;
          }
          
          .nav-link {
            font-size: 1rem;
          }
          
          .login-btn {
            padding: 0.6rem 1.5rem;
            font-size: 1rem;
          }
          
          .hero-section {
            flex-direction: row;
            padding: 0 2rem 2rem;
            margin-top: -12px;
          }
          
          .hero-container {
            padding: 0 2rem;
          }
          
          .hero-title {
            font-size: 2.8rem;
            text-align: left;
          }
          
          .hero-subtitle {
            font-size: 1.2rem;
            text-align: left;
            max-width: 90%;
          }
          
          .hero-buttons {
            justify-content: flex-start;
          }
          
          .image-container {
            padding: 2rem;
            max-width: 500px;
          }
          
          .hero-img {
            max-width: 350px;
          }
          
          .image-quote {
            font-size: 1.7rem;
            margin-top: 1.5rem;
          }
          
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
          
          .flip-card {
            height: 320px;
          }
          
          .steps-container {
            flex-direction: row;
            gap: 2rem;
          }
          
          .steps-column {
            max-width: 45%;
          }
          
          .footer-content {
            flex-direction: row;
            text-align: left;
          }
          
          .footer-section, .footer-section1, .footer-section2 {
            text-align: left;
          }
          
          .logo-container3 {
            justify-content: flex-start;
          }
          
          .social-links {
            justify-content: flex-start;
          }
        }

        /* Large devices (desktops, 992px and up) */
        @media (min-width: 992px) {
          .navbar-left {
            gap: 8rem;
          }
          
          .nav-links {
            display: flex;
          }
          
          .mobile-menu-btn {
            display: none;
          }
          
          .hero-title {
            font-size: 3.2rem;
          }
          
          .hero-subtitle {
            font-size: 1.3rem;
          }
          
          .image-container {
            max-width: 550px;
          }
          
          .hero-img {
            max-width: 400px;
          }
          
          .image-quote {
            font-size: 1.8rem;
          }
          
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
          
          .flip-card {
            max-width: 300px;
            height: 350px;
          }
          
          .section-title, .section-title1, .cta-section h2 {
            font-size: 2.5rem;
          }
        }

        /* Extra large devices (large desktops, 1200px and up) */
        @media (min-width: 1200px) {
          .navbar-left {
            gap: 10rem;
          }
          
          .hero-title {
            font-size: 3.5rem;
          }
          
          .services-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          
          .flip-card {
            max-width: 270px;
          }
        }

        /* Mobile-specific adjustments */
        @media (max-width: 767px) {
          .nav-links {
            display: none;
          }
          
          .mobile-menu-btn {
            display: flex;
          }
          
          .flip-card {
            height: 280px;
          }
          
          .flip-card-front h3 {
            font-size: 1.1rem;
          }
          
          .flip-card-back h3 {
            font-size: 1.1rem;
          }
          
          .flip-card-back p {
            font-size: 0.85rem;
          }

          /* Sidebar background color for mobile */
          .sidebar {
            background-color: #728a9c;
          }
        }

        /* Very small devices */
        @media (max-width: 380px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 0.95rem;
          }
          
          .cta-button {
            padding: 0.7rem 1.2rem;
            font-size: 0.9rem;
          }
          
          .image-quote {
            font-size: 1.2rem;
          }
          
          .services-grid {
            grid-template-columns: 1fr;
          }
          
          .step {
            padding: 1rem;
          }
          
          .step-number {
            font-size: 1.3rem;
            margin-right: 12px;
          }
        }

        /* Flip Card Styles for mobile touch */
        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }

        /* Nav Link Hover Effects */
        .nav-link {
          position: relative;
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
      `}</style>
    </>
  );
}