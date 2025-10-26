'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showResendVerification, setShowResendVerification] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const loginUser = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Error: Email and password are required.');
            return;
        }

        setLoading(true);
        setShowResendVerification(false);

        try {

            console.log("Login successful!");
            alert(`Welcome back, ${email}! Redirecting to the home page...`);
            window.location.href = '/Home';
        } catch (error) {
            console.error("Login Error:", error);
            alert('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const resendVerificationEmail = async () => {
        if (!email || !password) {
            alert('Please enter your email and password first.');
            return;
        }

        setLoading(true);

        try {
            alert('Verification email sent! Please check your inbox and verify your email before logging in.');
            setShowResendVerification(false);
        } catch (error) {
            console.error("Resend verification error:", error);
            alert('Failed to send verification email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loginBox = document.querySelector('.login-box');
        if (loginBox) {
            loginBox.style.transform = 'translateY(20px)';
            loginBox.style.opacity = '0';

            setTimeout(() => {
                loginBox.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
                loginBox.style.transform = 'translateY(0)';
                loginBox.style.opacity = '1';
            }, 100);
        }
    }, []);

    return (
        <>
            <Head>
                <title>Login - CommuniTrade</title>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            </Head>

            <div className="flex justify-center items-center min-h-screen w-full p-5 bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url('/assets/background.png')" }}>
            <div className="container">
                    <div className="left-panel">
                        <div className="decoration-circle circle-1"></div>
                        <div className="decoration-circle circle-2"></div>
                        <div className="decoration-circle circle-3"></div>
                        <div className="decoration-circle circle-4"></div>
                        
                        <div>
                        <div className="logo-circle">
                            <Image 
                                src="/assets/CommuniTrade.png" 
                                alt="CommuniTrade Logo" 
                                width={220}
                                height={220}
                                className="logo-circle"
                            />
                            </div>
                        </div>
                        <h1 className="brand-name">CommuniTrade</h1>
                    </div>
                    
                    <div className="right-panel">
                        <div className="login-box">
                            <div className="login-header">
                                <h2>Welcome Back</h2>
                                <p>Log in to track your offers and connect with those in need.</p>
                            </div>
                            
                            <form onSubmit={loginUser}>
                                <div className="input-group">
                                    <i className="fas fa-envelope"></i> 
                                    <input 
                                        type="email" 
                                        placeholder="Email Address" 
                                        required 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    /> 
                                </div>
                                
                                <div className="input-group password-container">
                                    <i className="fas fa-lock"></i>
                                    <input 
                                        type={showPassword ? 'text' : 'password'} 
                                        placeholder="Password" 
                                        required 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    /> 
                                    <i 
                                        className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'} toggle-eye`}
                                        onClick={togglePassword}
                                    ></i>
                                </div>
                                
                                <button type="submit" className="login-button" disabled={loading}>
                                    {loading ? (
                                        <span>
                                            <i className="fas fa-spinner fa-spin"></i> Logging in...
                                        </span>
                                    ) : (
                                        <span>Login</span>
                                    )}
                                </button>
                                
                                <div className="signup-text">
                                    Don't have an account? <a href="/register" className="signup-link">Sign Up</a> 
                                </div>

                                {showResendVerification && (
                                    <div className="resend-verification">
                                        <p>Your email is not verified. <a href="#" onClick={resendVerificationEmail}>Resend verification email</a></p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .container {
                    display: flex;
                    width: 850px;
                    height: 550px;
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 20px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 
                                0 5px 10px rgba(0, 0, 0, 0.05);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 4px solid rgba(255, 255, 255);
                    overflow: hidden;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    margin: 0 auto;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
  

                .left-panel {
                    flex: 1;
                    background: linear-gradient(135deg, #121731, #728a9c 100%);
                    color: white;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 40px;
                    position: relative;
                    overflow: hidden;
                }

                .logo-circle {
                    width: 220px;
                    height: 220px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 25px;
                    backdrop-filter: blur(5px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .brand-name {
                    font-size: 35px;
                    font-weight: 700;
                    margin-top: 10px;
                    text-align: center;
                    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                    color: #EEEEEE;
                }

                .right-panel {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 40px;
                }

                .login-box {
                    width: 100%;
                    max-width: 380px;
                }

                .login-header {
                    margin-bottom: 35px;
                }

                .login-header h2 {
                    font-size: 40px;
                    font-weight: 600;
                    text-align: center;
                    background: linear-gradient(90deg, #182848, #4d6699);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    color: transparent;
                }

                .login-header p {
                    color: #7f8c8d;
                    margin-top: 8px;
                    font-size: 18px;
                    text-align: center;
                }

                .input-group {
                    margin-bottom: 25px;
                    position: relative;
                }

                .password-container {
                    position: relative;
                }

                .toggle-eye {
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    color: #555;
                    z-index: 2;
                    font-size: 18px;
                }

                .toggle-eye:hover {
                    color: #000;
                }

                .input-group input {
                    width: 100%;
                    padding: 15px 45px 15px 45px;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    font-size: 16px;
                    outline: none;
                    transition: all 0.3s ease;
                    background: #fff;
                    color: #333;
                    box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
                    box-sizing: border-box;
                }

                .input-group input:hover {
                    border-color: #728a9c;
                    background: #EEEEEE;
                }

                .input-group input:focus {
                    border-color: #728a9c;
                    box-shadow: 0 0 6px rgba(75, 108, 183, 0.25);
                    background: #fff;
                }

                .input-group i:not(.toggle-eye) {
                    position: absolute;
                    left: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #728a9c;
                    font-size: 18px;
                    z-index: 2;
                }

                .login-button {
                    width: 100%;
                    padding: 15px;
                    background: linear-gradient(135deg, #121731, #728a9c 100%);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 4px 10px rgba(75, 108, 183, 0.3);
                }

                .login-button:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 15px rgba(75, 108, 183, 0.4);
                    background: linear-gradient(135deg, #728a9c, #121731); 
                }

                .login-button:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                }

                .signup-text {
                    text-align: center;
                    margin-top: 25px;
                    color: #7f8c8d;
                    font-size: 15px;
                }

                .signup-link {
                    color: #728a9c;
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s;
                }

                .signup-link:hover {
                    color: #182848;
                    text-decoration: underline;
                }

                .resend-verification {
                    text-align: center;
                    margin-top: 15px;
                    padding: 10px;
                    background-color: #fff3cd;
                    border: 1px solid #ffeaa7;
                    border-radius: 8px;
                    font-size: 14px;
                }

                .resend-verification p {
                    margin: 0;
                    color: #856404;
                }

                .resend-verification a {
                    color: #007bff;
                    text-decoration: none;
                    font-weight: 600;
                }

                .resend-verification a:hover {
                    text-decoration: underline;
                }

                .fa-spin {
                    margin-right: 8px;
                }

                .decoration-circle {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                }

                .circle-1 {
                    width: 150px;
                    height: 150px;
                    top: -90px;
                    left: 20%;
                }

                .circle-2 {
                    width: 140px;
                    height: 140px;
                    bottom: -50px;
                    right: -30px;
                }

                .circle-3 {
                    width: 70px;
                    height: 70px;
                    top: 50%;
                    left: -35px;
                }

                .circle-4 {
                    width: 80px;
                    height: 80px;
                    top: 25%;
                    left: 380px;
                }

                @media (max-width: 992px) {
                    .container {
                        flex-direction: column;
                        max-width: 500px;
                        height: auto;
                    }
                    
                    .left-panel {
                        padding: 30px;
                        min-height: 250px;
                    }
                    
                    .logo-circle {
                        width: 120px;
                        height: 120px;
                    }
                    
                    .brand-name {
                        font-size: 24px;
                    }
                    
                    .circle-4 {
                        left: 80%;
                    }
                }
                
                @media (max-width: 768px) {
                    .container {
                        border-radius: 15px;
                    }
                    
                    .left-panel, .right-panel {
                        padding: 25px;
                    }
                    
                    .login-header h2 {
                        font-size: 28px;
                    }
                    
                    .login-header p {
                        font-size: 14px;
                    }
                    
                    .input-group input {
                        padding: 12px 12px 12px 40px;
                        font-size: 14px;
                    }
                    
                    .login-button {
                        padding: 12px;
                        font-size: 15px;
                    }
                    
                    .circle-1, .circle-2, .circle-3, .circle-4 {
                        display: none; 
                    }

                    .resend-verification {
                        font-size: 13px;
                        padding: 8px;
                    }
                }
                
                @media (max-width: 480px) {
                    .container {
                        border-width: 2px;
                        border-radius: 12px;
                    }
                    
                    .left-panel, .right-panel {
                        padding: 20px;
                    }
                    
                    .logo-circle {
                        width: 100px;
                        height: 100px;
                        margin-bottom: 15px;
                    }
                    
                    .brand-name {
                        font-size: 20px;
                    }
                    
                    .login-header {
                        margin-bottom: 25px;
                    }
                    
                    .login-header h2 {
                        font-size: 24px;
                    }
                    
                    .input-group {
                        margin-bottom: 20px;
                    }
                    
                    .signup-text {
                        font-size: 14px;
                    }

                    .resend-verification {
                        font-size: 12px;
                    }
                }
                
                @media (max-width: 360px) {
                    .left-panel {
                        min-height: 200px;
                    }
                    
                    .logo-circle {
                        width: 80px;
                        height: 80px;
                    }
                    
                    .login-header h2 {
                        font-size: 22px;
                    }
                    
                    .input-group input {
                        padding: 10px 10px 10px 35px;
                    }
                    
                    .input-group i {
                        font-size: 16px;
                        left: 12px;
                    }
                }
            `}</style>
        </>
    );
}