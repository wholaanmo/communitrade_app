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
    const links = document.querySelectorAll('.nav-link, .sidebar-link');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 70,
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Add click event for mobile devices to ensure flip works on touch devices
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
      card.addEventListener('touchstart', function() {
        if (window.innerWidth < 768) {
          this.classList.toggle('flipped');
        }
      });
    });

    return () => {
      links.forEach(link => link.removeEventListener('click', () => {}));
      flipCards.forEach(card => card.removeEventListener('touchstart', () => {}));
    };
  }, []);

  return (
    <>
      <Head>
        <title>CommuniTrade</title>
        <meta name="description" content="Community-based trading and sharing platform" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </Head>

      <div className="min-h-screen font-poppins">
        {/* Navigation */}
        <nav className="navbar fixed top-0 left-0 right-0 h-[70px] bg-[#728a9c] bg-opacity-90 text-[#728a9c] z-50 shadow-lg px-8">
          <div className="navbar-content flex items-center justify-between h-full max-w-[1200px] mx-auto">
            <div className="navbar-left flex items-center gap-[15rem]">
              <div className="logo-container flex items-center gap-2">
                <img src="/assets/CommuniTrade.png" alt="CommuniTrade Logo" className="logo-img w-[50px] h-[50px] object-contain" />
                <p className="logo-text font-bold text-xl text-[#121731]">
                  Communi<span className="logo-text1 font-bold text-white">Trade</span>
                </p>
              </div>
              
              <div className="nav-links flex gap-8">
                <a href="#home" className="nav-link text-white font-medium py-2 relative transition-all duration-300 hover:text-[#121731] hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#121731] after:transition-all after:duration-300">
                  Home
                </a>
                <a href="#services" className="nav-link text-white font-medium py-2 relative transition-all duration-300 hover:text-[#121731] hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#121731] after:transition-all after:duration-300">
                  Services
                </a>
                <a href="#guide" className="nav-link text-white font-medium py-2 relative transition-all duration-300 hover:text-[#121731] hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#121731] after:transition-all after:duration-300">
                  Guide
                </a>
                <a href="#footer" className="nav-link text-white font-medium py-2 relative transition-all duration-300 hover:text-[#121731] hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#121731] after:transition-all after:duration-300">
                  Contact Us
                </a>
              </div>
            </div>
            
            <div className="navbar-right flex items-center">
              <button 
                onClick={navigateToLogin}
                className="login-btn bg-[#121731] text-white border-none py-2 px-6 rounded-full font-semibold cursor-pointer transition-all duration-300 shadow-md hover:bg-white hover:text-[#121731] hover:-translate-y-0.5 hover:shadow-lg"
              >
                Login
              </button>
              <button 
                onClick={toggleSidebar}
                className="mobile-menu-btn hidden flex-col justify-around w-[30px] h-[25px] bg-transparent border-none cursor-pointer p-0 ml-4"
              >
                <span className="w-full h-1 bg-[#121731] rounded transition-all duration-300"></span>
                <span className="w-full h-1 bg-[#121731] rounded transition-all duration-300"></span>
                <span className="w-full h-1 bg-[#121731] rounded transition-all duration-300"></span>
              </button>
            </div>
          </div>
        </nav>

        {/* Sidebar Overlay */}
        <div 
          className={`sidebar-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 transition-all duration-300 ${
            sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={closeSidebar}
        ></div>

        {/* Sidebar */}
        <div 
          className={`sidebar fixed top-0 left-[-300px] w-[300px] h-full bg-[#728a9c] z-50 transition-all duration-300 overflow-y-auto shadow-xl ${
            sidebarOpen ? 'left-0' : ''
          }`}
        >
          <div className="sidebar-header p-6 border-b border-black border-opacity-10">
            <div className="logo-container flex items-center gap-2">
              <img src="/assets/CommuniTrade.png" alt="CommuniTrade Logo" className="logo-img w-[50px] h-[50px] object-contain" />
              <p className="logo-text font-bold text-xl text-[#121731]">
                Communi<span className="logo-text1 font-bold text-white">Trade</span>
              </p>
            </div>
          </div>
          <div className="sidebar-links flex flex-col p-6">
            <a href="#home" className="sidebar-link text-white font-medium py-3 px-4 block rounded transition-all duration-300 border-b border-black border-opacity-10 hover:text-[#121731] hover:bg-white hover:translate-x-1" onClick={closeSidebar}>
              Home
            </a>
            <a href="#services" className="sidebar-link text-white font-medium py-3 px-4 block rounded transition-all duration-300 border-b border-black border-opacity-10 hover:text-[#121731] hover:bg-white hover:translate-x-1" onClick={closeSidebar}>
              Services
            </a>
            <a href="#guide" className="sidebar-link text-white font-medium py-3 px-4 block rounded transition-all duration-300 border-b border-black border-opacity-10 hover:text-[#121731] hover:bg-white hover:translate-x-1" onClick={closeSidebar}>
              Guide
            </a>
            <a href="#footer" className="sidebar-link text-white font-medium py-3 px-4 block rounded transition-all duration-300 border-b border-black border-opacity-10 hover:text-[#121731] hover:bg-white hover:translate-x-1" onClick={closeSidebar}>
              Contact Us
            </a>
          </div>
        </div>
        
        {/* Hero Section */}
        <section id="home" className="hero-section min-h-screen flex items-center px-16 pb-8 bg-white -mt-3">
          <div className="hero-content flex-1">
            <div className="hero-container px-8 max-w-[1200px] mx-auto -my-2.5">
              <h1 className="hero-title text-5xl font-bold mb-6 text-[#728a9c] text-center">
                Welcome to <span className="highlight text-[#121731]">CommuniTrade</span>
              </h1>
              <p className="hero-subtitle text-xl mb-10 text-[#555] leading-relaxed max-w-full text-justify">
                Your platform for community-based trading and sharing of skills and services without using money. Connect with your neighbors to exchange what you can do, share resources, and build a stronger community together.
              </p>
              <div className="hero-buttons flex gap-4 justify-center items-center">
                <a href="#services" className="cta-button primary bg-gradient-to-br from-[#121731] to-[#728a9c] text-[#EEEEEE] py-3 px-6 rounded-xl font-semibold text-lg border-none cursor-pointer transition-all duration-300 shadow-lg hover:bg-gradient-to-br hover:from-[#728a9c] hover:to-[#EEEEEE] hover:text-[#121731] hover:-translate-y-1 hover:shadow-xl no-underline inline-block">
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div className="hero-image flex-1 flex flex-col items-center justify-center p-4">
            <div className="image-container relative rounded-2xl p-8 max-w-[600px] w-full mx-auto bg-gradient-to-br from-white from-95% to-gray-50 to-90% border-3 border-transparent bg-clip-padding shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center">
              <img src="/assets/picture.png" alt="CommuniTrade Illustration" className="hero-img w-full max-w-[600px] h-auto object-contain" />
              <p className="image-quote mt-6 text-3xl text-[#121731] text-center font-medium max-w-[90%] leading-tight">
                A <span className="design text-[#728a9c] italic">Money-Free</span> Way <br /> to Exchange <span className="design text-[#728a9c] italic">Skills</span>
              </p>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section id="services" className="services-section py-8 max-w-[1200px] mx-auto mb-16 mt-12">
          <div className="container2 max-w-[1200px] mx-auto px-0.5">
            <h2 className="section-title text-4xl text-center mb-4 font-bold text-[#121731] tracking-wide">
              Our Services
            </h2>
            <p className="section-subtitle text-center text-xl text-[#728a9c] max-w-[700px] mx-auto mb-12 leading-relaxed font-normal">
              CommuniTrade offers a variety of services to help you engage with your community
            </p>
            
            <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-5">
              {/* Flip Card 1 */}
              <div className="flip-card bg-transparent w-full h-[250px] perspective-1000 rounded-2xl shadow-lg transition-transform duration-600">
                <div className="flip-card-inner relative w-full h-full text-center transition-transform duration-600 transform-style-preserve-3d rounded-2xl hover:rotate-y-180">
                  <div className="flip-card-front absolute w-full h-full backface-hidden rounded-2xl flex flex-col justify-center items-center p-5 border border-black border-opacity-5 bg-white text-[#121731] shadow-md">
                    <div className="service-icon text-5xl text-[#728a9c] mb-4 transition-colors duration-300">
                      <i className="fas fa-handshake"></i>
                    </div>
                    <h3 className="text-xl font-semibold">Skill & Service Exchange</h3>
                  </div>
                  <div className="flip-card-back absolute w-full h-full backface-hidden rounded-2xl flex flex-col justify-center items-center p-5 bg-gradient-to-br from-[#121731] to-[#728a9c] text-white transform rotate-y-180">
                    <h3 className="mb-2 text-xl">Skill & Service Exchange</h3>
                    <p className="text-sm opacity-90">
                      Easily trade your skills and services with others without using money. Build connections while meeting your needs through fair exchanges.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Flip Card 2 */}
              <div className="flip-card bg-transparent w-full h-[250px] perspective-1000 rounded-2xl shadow-lg transition-transform duration-600">
                <div className="flip-card-inner relative w-full h-full text-center transition-transform duration-600 transform-style-preserve-3d rounded-2xl hover:rotate-y-180">
                  <div className="flip-card-front absolute w-full h-full backface-hidden rounded-2xl flex flex-col justify-center items-center p-5 border border-black border-opacity-5 bg-white text-[#121731] shadow-md">
                    <div className="service-icon text-5xl text-[#728a9c] mb-4 transition-colors duration-300">
                      <i className="fas fa-file-alt"></i>
                    </div>
                    <h3 className="text-xl font-semibold">Request Job Posting</h3>
                  </div>
                  <div className="flip-card-back absolute w-full h-full backface-hidden rounded-2xl flex flex-col justify-center items-center p-5 bg-gradient-to-br from-[#121731] to-[#728a9c] text-white transform rotate-y-180">
                    <h3 className="mb-2 text-xl">Request Job Posting</h3>
                    <p className="text-sm opacity-90">
                      Post requests for the help you need and highlight what you can offer in return, making it simple to connect with the right people.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Flip Card 3 */}
              <div className="flip-card bg-transparent w-full h-[250px] perspective-1000 rounded-2xl shadow-lg transition-transform duration-600">
                <div className="flip-card-inner relative w-full h-full text-center transition-transform duration-600 transform-style-preserve-3d rounded-2xl hover:rotate-y-180">
                  <div className="flip-card-front absolute w-full h-full backface-hidden rounded-2xl flex flex-col justify-center items-center p-5 border border-black border-opacity-5 bg-white text-[#121731] shadow-md">
                    <div className="service-icon text-5xl text-[#728a9c] mb-4 transition-colors duration-300">
                      <i className="fas fa-tools"></i>
                    </div>
                    <h3 className="text-xl font-semibold">Skill/Service Listings</h3>
                  </div>
                  <div className="flip-card-back absolute w-full h-full backface-hidden rounded-2xl flex flex-col justify-center items-center p-5 bg-gradient-to-br from-[#121731] to-[#728a9c] text-white transform rotate-y-180">
                    <h3 className="mb-2 text-xl">Skill/Service Listings</h3>
                    <p className="text-sm opacity-90">
                      Create a personal listing of your skills and services so others can quickly discover and reach out to you for exchanges.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Flip Card 4 */}
              <div className="flip-card bg-transparent w-full h-[250px] perspective-1000 rounded-2xl shadow-lg transition-transform duration-600">
                <div className="flip-card-inner relative w-full h-full text-center transition-transform duration-600 transform-style-preserve-3d rounded-2xl hover:rotate-y-180">
                  <div className="flip-card-front absolute w-full h-full backface-hidden rounded-2xl flex flex-col justify-center items-center p-5 border border-black border-opacity-5 bg-white text-[#121731] shadow-md">
                    <div className="service-icon text-5xl text-[#728a9c] mb-4 transition-colors duration-300">
                      <i className="fas fa-comment-dots"></i>
                    </div>
                    <h3 className="text-xl font-semibold">Direct Messaging</h3>
                  </div>
                  <div className="flip-card-back absolute w-full h-full backface-hidden rounded-2xl flex flex-col justify-center items-center p-5 bg-gradient-to-br from-[#121731] to-[#728a9c] text-white transform rotate-y-180">
                    <h3 className="mb-2 text-xl">Direct Messaging</h3>
                    <p className="text-sm opacity-90">
                      Use a secure chat system to communicate, discuss details, and confirm agreements before starting an exchange.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guide Section */}
        <section id="guide" className="guide-section py-20 bg-[#f7f9fc]">
          <div className="container max-w-[1200px] mx-auto px-6">
            <h2 className="section-title1 text-4xl text-center mb-4 font-bold text-[#121731]">
              How It Works
            </h2>
            <p className="section-subtitle1 text-center text-xl text-[#728a9c] max-w-[700px] mx-auto mb-12 leading-relaxed">
              Begin your CommuniTrade experience with ease
            </p>
            
            <div className="steps-container flex gap-10 justify-center flex-wrap">
              <div className="steps-column flex-1 min-w-[300px] max-w-[450px]">
                <div className="step flex items-start mb-9 p-5 bg-white rounded-xl shadow-lg border-l-4 border-[#728a9c] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-l-[#121731]">
                  <div className="step-number text-3xl font-bold text-[#121731] mr-5 min-w-[40px] text-center pt-1">1</div>
                  <div className="step-content">
                    <h3 className="text-lg font-semibold text-[#121731] mb-1">Sign Up and Create a Profile</h3>
                    <p className="text-sm text-[#555] leading-relaxed">
                      Start by registering on CommuniTrade. Build your profile by adding your skills, services, and any experience you'd like to share.
                    </p>
                  </div>
                </div>
                
                <div className="step flex items-start mb-9 p-5 bg-white rounded-xl shadow-lg border-l-4 border-[#728a9c] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-l-[#121731]">
                  <div className="step-number text-3xl font-bold text-[#121731] mr-5 min-w-[40px] text-center pt-1">2</div>
                  <div className="step-content">
                    <h3 className="text-lg font-semibold text-[#121731] mb-1">Post What You Need or What You Can Offer</h3>
                    <p className="text-sm text-[#555] leading-relaxed">
                      Create a Job Posting to request the service you need and offer something in return, or use the Job Seeker Posting to showcase your skills and make them available to others.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="steps-column flex-1 min-w-[300px] max-w-[450px]">
                <div className="step flex items-start mb-9 p-5 bg-white rounded-xl shadow-lg border-l-4 border-[#728a9c] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-l-[#121731]">
                  <div className="step-number text-3xl font-bold text-[#121731] mr-5 min-w-[40px] text-center pt-1">3</div>
                  <div className="step-content">
                    <h3 className="text-lg font-semibold text-[#121731] mb-1">Browse and Search</h3>
                    <p className="text-sm text-[#555] leading-relaxed">
                      Use the Search function to explore available skills and services. You can filter by category, location, or keywords to quickly find what matches your needs.
                    </p>
                  </div>
                </div>
                
                <div className="step flex items-start mb-9 p-5 bg-white rounded-xl shadow-lg border-l-4 border-[#728a9c] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-l-[#121731]">
                  <div className="step-number text-3xl font-bold text-[#121731] mr-5 min-w-[40px] text-center pt-1">4</div>
                  <div className="step-content">
                    <h3 className="text-lg font-semibold text-[#121731] mb-1">Connect with Other Members</h3>
                    <p className="text-sm text-[#555] leading-relaxed">
                      When you find someone offering what you need, view their User Profile to check their skills, and use Direct Messaging to securely communicate and discuss the details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="cta-section py-20 bg-gradient-to-br from-[#121731] to-[#728a9c] text-white text-center">
          <div className="container max-w-[1200px] mx-auto px-6">
            <h2 className="text-4xl font-bold mb-2">Ready to Join Your Community?</h2>
            <p className="text-xl mb-8 opacity-90">Start trading and building connections today</p>
            <a href="/register" className="cta-button large text-lg py-4 px-10 bg-white text-[#121731] font-bold border-2 border-white rounded-full no-underline inline-block transition-all duration-300 hover:bg-transparent hover:text-white hover:-translate-y-1 hover:shadow-lg">
              Sign Up Now
            </a>
          </div>
        </section>
        
        {/* Footer */}
        <footer id="footer" className="footer bg-[#121731] text-white py-10">
          <div className="container3 max-w-[1200px] mx-auto px-5">
            <div className="footer-content flex justify-between flex-wrap border-b border-white border-opacity-10 pb-5 mb-5">
              <div className="footer-section flex-1 min-w-[200px] mb-5">
                <div className="logo-container3 flex items-center gap-2 mb-2">
                  <img src="/assets/CommuniTrade.png" alt="CommuniTrade Logo" className="logo-img3 w-[50px] h-[50px] object-contain" />
                  <div className="design1">
                    <p className="logo-text3 font-bold text-xl text-[#728a9c]">
                      Communi<span className="logo-text4 font-bold text-white">Trade</span>
                    </p>
                  </div>
                </div>
                <p className="ml-4">Building stronger communities through sharing and trading.</p>
              </div>
              
              <div className="footer-section1 flex-1 min-w-[200px] mb-5">
                <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
                <p className="mb-2 text-sm opacity-80"><i className="fas fa-envelope mr-2 text-[#728a9c]"></i> CommuniTrade@gmail.com</p>
                <p className="text-sm opacity-80"><i className="fas fa-phone mr-2 text-[#728a9c]"></i> 0912-345-6789</p>
              </div>
              
              <div className="footer-section2 flex-1 min-w-[200px] mb-5">
                <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
                <div className="social-links">
                  <a href="#" className="text-white text-xl mr-4 transition-colors duration-300 hover:text-[#728a9c]"><i className="fab fa-facebook"></i></a>
                  <a href="#" className="text-white text-xl mr-4 transition-colors duration-300 hover:text-[#728a9c]"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="text-white text-xl mr-4 transition-colors duration-300 hover:text-[#728a9c]"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom text-center text-sm opacity-70">
              <p>© 2025 CommuniTrade. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          margin-top: 60px;
          scrollbar-width: thin;
          scrollbar-color: #728a9c #f0f0f0;
        }

        #services {
          scroll-margin-top: 70px;
          margin-top: 50px;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Poppins', sans-serif;
          background-color: #ffffff;
          color: #555;
          line-height: 1.6;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        /* Mobile menu button visibility */
        @media (max-width: 992px) {
          .mobile-menu-btn {
            display: flex !important;
          }
          
          .nav-links {
            display: none !important;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 1100px) {
          .navbar-left {
            gap: 5rem;
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
          .services-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .flip-card {
            height: 200px;
          }
          
          .footer-content {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }

        @media (max-width: 576px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .logo-text, .logo-text1 {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </>
  );
}