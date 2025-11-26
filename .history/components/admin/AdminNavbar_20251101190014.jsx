'use client';

export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <div className="logo-container">
            <img 
              src="../assets/CommuniTrade.png" 
              alt="CommuniTrade Logo" 
              className="logo-img"
            />
            <p className="logo-text">Communi<span className="logo-text1">Trade</span></p>
          </div>
        </div>
        
        <div className="navbar-right">
          <button className="hamburger-btn" onClick={toggleSidebar}>
            <span className="material-icons">menu</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          background-color: #728a9c;
          color: #ffffff;
          z-index: 98;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .navbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          padding: 0 1rem;
        }
        
        .navbar-left {
          display: flex;
          align-items: center;
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
          width: 52px;
          height: 52px;
          object-fit: contain;
          margin-left: 0.3rem;
        }
        
        .logo-text1 {
          font-weight: bold;
          font-size: 1.2rem;
          color: #ffffff;
        }
        
        .logo-text {
          font-weight: bold;
          font-size: 1.2rem;
          color: #121731;
        }
        
        .hamburger-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transition: all 0.3s ease;
          color: #ffffff;
        }
        
        .hamburger-btn:hover {
          color: #121731;
          transform: rotate(180deg);
        }
        
        /* Instead, adjust font size for very small screens */
        @media (max-width: 480px) {
          .logo-text {
            font-size: 1rem;
          }
          
          .logo-img {
            width: 35px;
            height: 35px;
          }
        }
        
        @media (max-width: 360px) {
          .logo-text {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </nav>
  );
}