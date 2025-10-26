'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const [showTerms, setShowTerms] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter();

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    
    const goToLogin = () => { router.push('/login'); };
    const goToLanding = () => { router.push('/'); };
    
    const showTermsModal = () => {
        setShowTerms(true);
    };
    
    const hideTermsModal = () => {
        setShowTerms(false);
    };
    
    const acceptTerms = () => {
        setTermsAccepted(true);
        hideTermsModal();
    };
    
    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const registerUser = async (e) => {
        e.preventDefault();
        if (loading) return;

        if (!isValidEmail(email)) {
            return alert('Please enter a valid email address.');
        }
        
        if (password !== confirmPassword) {
            return alert('Error: Passwords do not match.');
        }
        
        if (!termsAccepted) {
            return alert('Error: You must agree to the Terms & Conditions.');
        }

        setLoading(true);

        try {
            // Firebase authentication code would go here
            // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // const user = userCredential.user;

            // await updateProfile(user, { 
            //     displayName: username 
            // });

            // await sendEmailVerification(user);
            // console.log("Email verification sent!");

            // Firestore code would go here
            // await setDoc(doc(db, "users", user.uid), {
            //     uid: user.uid,
            //     firstName: firstName,
            //     lastName: lastName,
            //     username: username,
            //     email: email,
            //     phoneNumber: phoneNumber || '',
            //     emailVerified: false,
            //     registrationDate: new Date(),
            //     role: 'basic'
            // });

            // await signOut(auth);
            
            alert("Account created successfully! Please check your email to verify your email address before logging in. You will be redirected to the login page.");
            router.push('/login');
            
        } catch (error) {
            console.error("Registration Error:", error);
            alert(error.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    useEffect(() => {
        document.body.classList.add('register-page-body');
        
        const registerBox = document.querySelector('.register-box');
        if (registerBox) {
            registerBox.style.transform = 'translateY(20px)';
            registerBox.style.opacity = '0';
            
            setTimeout(() => {
                registerBox.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
                registerBox.style.transform = 'translateY(0)';
                registerBox.style.opacity = '1';
            }, 100);
        }

        const handleKeydown = (event) => {
            if (event.key === 'Escape' && showTerms) {
                hideTermsModal();
            }
        };

        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.body.classList.remove('register-page-body');
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [showTerms]);

    return (
        <>
            <Head>
                <title>Register - CommuniTrade</title>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            </Head>

            <div className="flex justify-center items-center min-h-screen w-full p-4 sm:p-5 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/background.png')" }}>
                <div className="container">
                    <div className="left-panel">
                        <div className="register-box">
                            <div className="register-header">
                                <h2>Create Account</h2>
                                <p>Join CommuniTrade to start trading and helping your community.</p>
                            </div>
                            
                            <form onSubmit={registerUser}>
                                <div className="input-group">
                                    <i className="fas fa-user"></i>
                                    <input 
                                        type="text" 
                                        placeholder="First Name" 
                                        required 
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                
                                <div className="input-group">
                                    <i className="fas fa-user"></i>
                                    <input 
                                        type="text" 
                                        placeholder="Last Name" 
                                        required 
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>

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
                                
                                <div className="input-group">
                                    <i className="fas fa-user"></i>
                                    <input 
                                        type="text" 
                                        placeholder="Username" 
                                        required 
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
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
                                
                                <div className="input-group password-container">
                                    <i className="fas fa-lock"></i>
                                    <input 
                                        type={showConfirmPassword ? 'text' : 'password'} 
                                        placeholder="Confirm Password" 
                                        required 
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <i 
                                        className={`fas ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'} toggle-eye`}
                                        onClick={toggleConfirmPassword}
                                    ></i>
                                </div>
                                
                                <div className="terms-group">
                                    <input 
                                        type="checkbox" 
                                        id="terms" 
                                        required 
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                    />
                                    <label htmlFor="terms">I agree to the <a href="#" onClick={showTermsModal}>Terms & Conditions</a></label>
                                </div>
                                
                                <button type="submit" className="register-button" disabled={loading}>
                                    {loading ? (
                                        <span>
                                            <i className="fas fa-spinner fa-spin"></i> Creating Account...
                                        </span>
                                    ) : (
                                        <span>Create Account</span>
                                    )}
                                </button>
                                
                                <div className="login-text">
                                    Already have an account? 
                                    <a href="#" className="login-link" onClick={goToLogin}> Log In</a>
                                </div>
                                
                                <div className="about-link">
                                    <a href="#" className="about-system" onClick={goToLanding}>About CommuniTrade System</a>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <div className="right-panel">
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
                                    priority
                                />
                            </div>
                        </div>
                        <h1 className="brand-name">CommuniTrade</h1>
                    </div>

                    {showTerms && (
                        <div className="terms-modal-overlay" onClick={hideTermsModal}>
                            <div className="terms-modal" onClick={(e) => e.stopPropagation()}>
                                <div className="terms-modal-header">
                                    <h2>Terms & Conditions</h2>
                                    <button className="close-button" onClick={hideTermsModal}>
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                <div className="terms-modal-content">
                                    <div className="terms-content">
                                        <p><strong>Last Updated:</strong> {currentDate}</p>
                                        
                                        <h3>1. Acceptance of Terms</h3>
                                        <p>By creating an account with CommuniTrade, you agree to be bound by these Terms and Conditions.</p>
                                        
                                        <h3>2. Account Registration</h3>
                                        <p>You must provide accurate and complete information when creating your account. You are responsible for maintaining the confidentiality of your account credentials.</p>
                                        
                                        <h3>3. Service Exchange</h3>
                                        <p>CommuniTrade facilitates the exchange of skills and services without monetary transactions. Users are responsible for negotiating and fulfilling service agreements.</p>
                                        
                                        <h3>4. User Responsibilities</h3>
                                        <p>You agree to provide accurate information about your skills and services. You are responsible for the quality and completion of services you offer.</p>
                                        
                                        <h3>5. Community Guidelines</h3>
                                        <p>Users must maintain respectful communication and professional conduct. Any form of harassment, discrimination, or inappropriate behavior will not be tolerated.</p>
                                        
                                        <h3>6. Privacy</h3>
                                        <p>Your personal information will be handled in accordance with our Privacy Policy. We implement security measures but cannot guarantee absolute security.</p>
                                        
                                        <h3>7. Service Modifications</h3>
                                        <p>CommuniTrade reserves the right to modify or discontinue the service at any time without notice.</p>
                                        
                                        <h3>8. Termination</h3>
                                        <p>We may suspend or terminate your account if you violate these terms or for any other reason at our discretion.</p>
                                        
                                        <h3>9. Disclaimer</h3>
                                        <p>CommuniTrade is provided "as is" without warranties of any kind. We are not responsible for disputes between users regarding service exchanges.</p>
                                        
                                        <h3>10. Limitation of Liability</h3>
                                        <p>CommuniTrade shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
                                        
                                        <p>By creating an account, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
                                    </div>
                                </div>
                                <div className="terms-modal-footer">
                                    <button className="agree-button" onClick={acceptTerms}>I Understand & Agree</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .container {
                    display: flex;
                    width: 95%;
                    max-width: 900px;
                    height: auto;
                    min-height: 500px;
                    max-height: 90vh;
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 18px;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15), 
                                0 4px 8px rgba(0, 0, 0, 0.05);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 3px solid rgba(255, 255, 255);
                    overflow: hidden;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    margin: 20px auto;
                }

                .left-panel {
                    flex: 1.2;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                    min-height: 500px;
                }

                .right-panel {
                    flex: 1;
                    background: linear-gradient(135deg, #121731, #728a9c 100%);
                    color: white;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 30px;
                    position: relative;
                    overflow: hidden;
                    min-height: 300px;
                }

                .register-box {
                    width: 100%;
                    max-width: 380px;
                    padding: 10px;
                }

                .register-header {
                    margin-bottom: 18px;
                }

                .register-header h2 {
                    font-size: clamp(22px, 4vw, 26px);
                    font-weight: 600;
                    text-align: center;
                    background: linear-gradient(90deg, #182848, #4d6699);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    color: transparent;
                }

                .register-header p {
                    color: #7f8c8d;
                    margin-top: 6px;
                    font-size: clamp(11px, 2vw, 13px);
                    text-align: center;
                    line-height: 1.4;
                }

                .input-group {
                    margin-bottom: 10px;
                    position: relative;
                }

                .password-container {
                    position: relative;
                }

                .toggle-eye {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    color: #555;
                    z-index: 2;
                    font-size: clamp(12px, 2vw, 13px);
                }

                .toggle-eye:hover {
                    color: #000;
                }

                .input-group input {
                    width: 100%;
                    padding: 10px 32px 10px 32px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    font-size: clamp(12px, 2vw, 14px);
                    outline: none;
                    transition: all 0.3s ease;
                    background: #fff;
                    color: #333;
                    box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
                    box-sizing: border-box;
                    min-height: 44px;
                }

                .input-group input:hover {
                    border-color: #728a9c;
                    background: #EEEEEE;
                }

                .input-group input:focus {
                    border-color: #728a9c;
                    box-shadow: 0 0 4px rgba(75, 108, 183, 0.25);
                    background: #fff;
                }

                .input-group i:not(.toggle-eye) {
                    position: absolute;
                    left: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #728a9c;
                    font-size: clamp(12px, 2vw, 13px);
                    z-index: 2;
                }

                .terms-group {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 12px;
                    font-size: clamp(11px, 2vw, 12px);
                    color: #7f8c8d;
                    text-align: center;
                    flex-wrap: wrap;
                    gap: 5px;
                }

                .terms-group input {
                    margin-right: 6px;
                    width: 14px;
                    height: 14px;
                    min-width: 14px;
                }

                .terms-group a {
                    color: #728a9c;
                    text-decoration: none;
                    font-weight: 600;
                    white-space: nowrap;
                }

                .terms-group a:hover {
                    text-decoration: underline;
                }

                .register-button {
                    width: 100%;
                    padding: 12px;
                    background: linear-gradient(135deg, #121731, #728a9c 100%);
                    color: white;
                    border: none;
                    border-radius: 7px;
                    font-size: clamp(13px, 2vw, 14px);
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 3px 8px rgba(75, 108, 183, 0.3);
                    min-height: 44px;
                }

                .register-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 12px rgba(75, 108, 183, 0.4);
                    background: linear-gradient(135deg, #728a9c, #121731); 
                }

                .login-text {
                    text-align: center;
                    margin-top: 12px;
                    color: #7f8c8d;
                    font-size: clamp(11px, 2vw, 12px);
                    line-height: 1.4;
                }

                .login-link {
                    color: #728a9c;
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s;
                    margin-left: 4px;
                }

                .login-link:hover {
                    color: #182848;
                    text-decoration: underline;
                }

                .about-link {
                    text-align: center;
                    margin-top: 8px;
                }

                .about-system {
                    color: #728a9c;
                    text-decoration: none;
                    font-weight: 500;
                    font-size: clamp(11px, 2vw, 12px);
                    transition: all 0.3s;
                }

                .about-system:hover {
                    color: #182848;
                    text-decoration: underline;
                }

                .logo-circle {
                    width: clamp(80px, 20vw, 220px);
                    height: clamp(80px, 20vw, 220px);
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 12px;
                    backdrop-filter: blur(5px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    overflow: hidden;
                }

                .brand-name {
                    font-size: clamp(18px, 4vw, 28px);
                    font-weight: 700;
                    margin-top: 8px;
                    text-align: center;
                    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                    color: #EEEEEE;
                    line-height: 1.2;
                }

                .decoration-circle {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                }

                .circle-1 {
                    width: 60px;
                    height: 60px;
                    top: -20px;
                    left: 15%;
                }

                .circle-2 {
                    width: 120px;
                    height: 120px;
                    bottom: -60px;
                    right: -30px;
                }

                .circle-3 {
                    width: 50px;
                    height: 50px;
                    top: 45%;
                    left: -30px;
                }

                .circle-4 {
                    width: 60px;
                    height: 60px;
                    top: 15%;
                    left: 60%;
                }

                .terms-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(255, 255, 255, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    animation: fadeIn 0.3s ease;
                    backdrop-filter: blur(50px);
                    padding: 20px;
                    box-sizing: border-box;
                }

                .terms-modal {
                    background: white;
                    border-radius: 12px;
                    width: 95%;
                    max-width: 650px;
                    max-height: 85vh;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
                    animation: slideUp 0.3s ease;
                }

                .terms-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 18px 22px;
                    border-bottom: 1px solid #e9ecef;
                    background: linear-gradient(135deg, #121731, #728a9c);
                    border-radius: 12px 12px 0 0;
                }

                .terms-modal-header h2 {
                    color: white;
                    margin: 0;
                    font-size: clamp(18px, 3vw, 22px);
                    font-weight: 600;
                }

                .close-button {
                    background: none;
                    border: none;
                    color: white;
                    font-size: clamp(16px, 3vw, 18px);
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease;
                    min-width: 32px;
                }

                .close-button:hover {
                    background-color: rgba(255, 255, 255, 0.2);
                }

                .terms-modal-content {
                    flex: 1;
                    overflow-y: auto;
                    padding: 18px;
                    background: #f8f9fa;
                }

                .terms-content {
                    background: white;
                    padding: 18px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                .terms-content h3 {
                    color: #121731;
                    margin: 16px 0 8px 0;
                    font-size: clamp(14px, 2.5vw, 16px);
                    font-weight: 600;
                }

                .terms-content h3:first-child {
                    margin-top: 0;
                }

                .terms-content p {
                    color: #555;
                    line-height: 1.5;
                    margin-bottom: 12px;
                    font-size: clamp(12px, 2vw, 14px);
                }

                .terms-content strong {
                    color: #121731;
                }

                .terms-modal-footer {
                    padding: 16px 22px;
                    border-top: 1px solid #e9ecef;
                    background: white;
                    border-radius: 0 0 12px 12px;
                    text-align: center;
                }

                .agree-button {
                    background: linear-gradient(135deg, #121731, #728a9c);
                    color: white;
                    border: none;
                    padding: 12px 25px;
                    border-radius: 7px;
                    font-size: clamp(13px, 2vw, 14px);
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 3px 8px rgba(75, 108, 183, 0.3);
                    min-height: 44px;
                    min-width: 160px;
                }

                .agree-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 12px rgba(75, 108, 183, 0.4);
                    background: linear-gradient(135deg, #728a9c, #121731);
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(25px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Large Desktop */
                @media (min-width: 1440px) {
                    .container {
                        max-width: 1000px;
                        height: 650px;
                    }
                    
                    .left-panel {
                        padding: 30px;
                    }
                    
                    .right-panel {
                        padding: 40px;
                    }
                }

                /* Tablet Landscape */
                @media (max-width: 1024px) {
                    .container {
                        width: 90%;
                        max-height: 85vh;
                    }
                    
                    .left-panel {
                        padding: 15px;
                    }
                    
                    .right-panel {
                        padding: 20px;
                    }
                    
                    .register-box {
                        max-width: 320px;
                    }
                }

                /* Tablet Portrait */
                @media (max-width: 992px) {
                    .container {
                        flex-direction: column;
                        width: 90%;
                        max-height: 90vh;
                        height: auto;
                        min-height: auto;
                    }
                    
                    .left-panel {
                        order: 2;
                        padding: 20px 15px;
                        flex: 1;
                        overflow-y: auto;
                        min-height: 400px;
                    }
                    
                    .right-panel {
                        order: 1;
                        padding: 20px 15px;
                        flex: 0;
                        min-height: 200px;
                    }
                    
                    .register-box {
                        max-width: 100%;
                        padding: 0;
                    }
                    
                    .logo-circle {
                        width: 100px;
                        height: 100px;
                    }
                    
                    .brand-name {
                        font-size: 22px;
                    }
                    
                    .circle-4 {
                        left: 80%;
                    }
                }

                /* Small Tablet */
                @media (max-width: 768px) {
                    .container {
                        width: 95%;
                        max-height: 92vh;
                        border-radius: 16px;
                    }
                    
                    .left-panel {
                        padding: 15px 12px;
                    }
                    
                    .right-panel {
                        padding: 15px 12px;
                        min-height: 180px;
                    }
                    
                    .register-header h2 {
                        font-size: 22px;
                    }
                    
                    .brand-name {
                        font-size: 20px;
                    }
                    
                    .logo-circle {
                        width: 80px;
                        height: 80px;
                    }
                    
                    .circle-1, .circle-2, .circle-3, .circle-4 {
                        display: none;
                    }
                    
                    .input-group {
                        margin-bottom: 8px;
                    }
                    
                    .input-group input {
                        padding: 10px 30px 10px 30px;
                    }
                    
                    .terms-modal {
                        width: 98%;
                        max-height: 90vh;
                    }
                    
                    .terms-modal-header {
                        padding: 15px 18px;
                    }
                    
                    .terms-modal-content {
                        padding: 15px;
                    }
                    
                    .terms-content {
                        padding: 15px;
                    }
                }

                /* Mobile Landscape */
                @media (max-width: 667px) and (orientation: landscape) {
                    .container {
                        max-height: 85vh;
                    }
                    
                    .left-panel {
                        min-height: 300px;
                        padding: 10px;
                    }
                    
                    .right-panel {
                        min-height: 120px;
                        padding: 10px;
                    }
                    
                    .logo-circle {
                        width: 60px;
                        height: 60px;
                    }
                    
                    .brand-name {
                        font-size: 18px;
                    }
                }

                /* Mobile */
                @media (max-width: 576px) {
                    .container {
                        width: 98%;
                        max-height: 95vh;
                        border-width: 2px;
                        margin: 10px auto;
                    }
                    
                    .left-panel {
                        padding: 12px 10px;
                        min-height: 450px;
                    }
                    
                    .right-panel {
                        padding: 15px 10px;
                        min-height: 150px;
                    }
                    
                    .register-box {
                        padding: 0 5px;
                    }
                    
                    .terms-group {
                        font-size: 11px;
                        justify-content: flex-start;
                    }
                    
                    .register-button {
                        padding: 10px;
                    }
                    
                    .logo-circle {
                        width: 70px;
                        height: 70px;
                    }
                    
                    .brand-name {
                        font-size: 18px;
                    }
                    
                    .terms-modal {
                        width: 98%;
                        max-height: 92vh;
                    }
                    
                    .terms-modal-header {
                        padding: 12px 15px;
                    }
                    
                    .terms-modal-content {
                        padding: 12px;
                    }
                    
                    .terms-content {
                        padding: 12px;
                    }
                    
                    .agree-button {
                        padding: 10px 20px;
                        min-width: 140px;
                    }
                }

                /* Small Mobile */
                @media (max-width: 400px) {
                    .container {
                        width: 99%;
                        border-radius: 14px;
                    margin: 5px auto;
                    max-height: 98vh;
                    min-height: 450px;
                    height: 95vh;
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: none;
                        -ms-overflow-style: none;
                    }

                    .container::-webkit-scrollbar {
                        display: none;
                    }
                    
                    .left-panel {
                        padding: 10px 8px;
                        min-height: auto;
                    }
                    
                    .right-panel {
                        padding: 12px 8px;
                        min-height: 120px;
                    }
                    
                    .register-header h2 {
                        font-size: 20px;
                    }
                    
                    .register-header p {
                        font-size: 11px;
                    }
                    
                    .brand-name {
                        font-size: 16px;
                    }
                    
                    .logo-circle {
                        width: 60px;
                        height: 60px;
                    }
                    
                    .input-group input {
                        padding: 8px 28px 8px 28px;
                        font-size: 12px;
                        min-height: 40px;
                    }
                    
                    .toggle-eye {
                        font-size: 12px;
                        right: 8px;
                    }
                    
                    .input-group i:not(.toggle-eye) {
                        font-size: 12px;
                        left: 8px;
                    }
                    
                    .terms-group {
                        font-size: 10px;
                        flex-direction: row;
                        align-items: center;
                    }
                    
                    .terms-group input {
                        width: 12px;
                        height: 12px;
                        min-width: 12px;
                    }
                }

                /* Very Small Mobile */
                @media (max-width: 350px) {
                    .container {
                        border-radius: 12px;
                    width: 100%;
                        height: 100vh;
                        max-height: 100vh;
                        margin: 0;
                        border: none;
                        border-radius: 0;
                    }
                    
                    .left-panel {
                        padding: 8px 6px;
                    }
                    
                    .right-panel {
                        padding: 10px 6px;
                        min-height: 100px;
                    }
                    
                    .register-header h2 {
                        font-size: 18px;
                    }
                    
                    .register-header p {
                        font-size: 10px;
                    }
                    
                    .brand-name {
                        font-size: 14px;
                    }
                    
                    .logo-circle {
                        width: 50px;
                        height: 50px;
                    }
                    
                    .input-group input {
                        padding: 6px 26px 6px 26px;
                        font-size: 11px;
                        min-height: 38px;
                    }
                    
                    .register-button {
                        padding: 8px;
                        font-size: 12px;
                        min-height: 40px;
                    }
                    
                    .terms-group {
                        font-size: 9px;
                    }
                    
                    .login-text, .about-system {
                        font-size: 10px;
                    }
                }

                /* Tall Mobile */
                @media (max-height: 700px) and (orientation: portrait) {
                    .container {
                        max-height: 98vh;
                        height: 98vh;
                    }
                    
                    .left-panel {
                        overflow-y: auto;
                        padding: 10px;
                    min-height: 350px;
                    }
                    
                    .right-panel {
                        min-height: 120px;
                    }
                }

                /* Very Tall Screens */
                @media (min-height: 1000px) {
                    .container {
                        min-height: 600px;
                        max-height: 70vh;
                    }
                    
                    .left-panel {
                        min-height: 450px;
                    }
                    
                    .right-panel {
                        min-height: 200px;
                    }
                }

                .left-panel::-webkit-scrollbar {
                    width: 0;
                    background: transparent;
                }

                .register-button:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none !important;
                }

                .fa-spin {
                    margin-right: 6px;
                }
            `}</style>
        </>
    );
}