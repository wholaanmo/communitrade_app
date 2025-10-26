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
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
                    max-width: 850px;
                    min-height: 500px;
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 18px;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15), 
                                0 4px 8px rgba(0, 0, 0, 0.05);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 3px solid rgba(255, 255, 255);
                    overflow: hidden;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .left-panel {
                    flex: 1.2;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 25px 20px;
                }

                .right-panel {
                    flex: 1;
                    background: linear-gradient(135deg, #121731, #728a9c 100%);
                    color: white;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 30px 20px;
                    position: relative;
                    overflow: hidden;
                }

                .register-box {
                    width: 100%;
                    max-width: 380px;
                    padding: 0 10px;
                }

                .register-header {
                    margin-bottom: 20px;
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
                    margin-top: 8px;
                    font-size: clamp(12px, 2vw, 13px);
                    text-align: center;
                    line-height: 1.4;
                }

                .input-group {
                    margin-bottom: 12px;
                    position: relative;
                }

                .password-container {
                    position: relative;
                }

                .toggle-eye {
                    position: absolute;
                    right: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    color: #555;
                    z-index: 2;
                    font-size: 14px;
                }

                .toggle-eye:hover {
                    color: #000;
                }

                .input-group input {
                    width: 100%;
                    padding: 12px 35px 12px 35px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    font-size: 14px;
                    outline: none;
                    transition: all 0.3s ease;
                    background: #fff;
                    color: #333;
                    box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
                    box-sizing: border-box;
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
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #728a9c;
                    font-size: 14px;
                    z-index: 2;
                }

                .terms-group {
                    display: flex;
                    align-items: center;
                    margin-bottom: 15px;
                    font-size: 13px;
                    color: #7f8c8d;
                    gap: 8px;
                }

                .terms-group input {
                    margin: 0;
                    width: 14px;
                    height: 14px;
                    flex-shrink: 0;
                }

                .terms-group label {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 4px;
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
                    padding: 14px;
                    background: linear-gradient(135deg, #121731, #728a9c 100%);
                    color: white;
                    border: none;
                    border-radius: 7px;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 3px 8px rgba(75, 108, 183, 0.3);
                    margin-bottom: 15px;
                }

                .register-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 12px rgba(75, 108, 183, 0.4);
                    background: linear-gradient(135deg, #728a9c, #121731); 
                }

                .login-text {
                    text-align: center;
                    margin-top: 15px;
                    color: #7f8c8d;
                    font-size: 13px;
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
                    margin-top: 10px;
                }

                .about-system {
                    color: #728a9c;
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 13px;
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
                    margin-bottom: 15px;
                    backdrop-filter: blur(5px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    overflow: hidden;
                }

                .brand-name {
                    font-size: clamp(20px, 4vw, 28px);
                    font-weight: 700;
                    margin-top: 10px;
                    text-align: center;
                    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                    color: #EEEEEE;
                }

                .decoration-circle {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                }

                .circle-1 {
                    width: 80px;
                    height: 80px;
                    top: -25px;
                    left: 20%;
                }

                .circle-2 {
                    width: 150px;
                    height: 150px;
                    bottom: -80px;
                    right: -40px;
                }

                .circle-3 {
                    width: 70px;
                    height: 70px;
                    top: 45%;
                    left: -50px;
                }

                .circle-4 {
                    width: 80px;
                    height: 80px;
                    top: 15%;
                    left: 250px;
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
                    width: 100%;
                    max-width: 650px;
                    max-height: 80vh;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
                    animation: slideUp 0.3s ease;
                }

                .terms-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 25px;
                    border-bottom: 1px solid #e9ecef;
                    background: linear-gradient(135deg, #121731, #728a9c);
                    border-radius: 12px 12px 0 0;
                }

                .terms-modal-header h2 {
                    color: white;
                    margin: 0;
                    font-size: clamp(18px, 4vw, 22px);
                    font-weight: 600;
                }

                .close-button {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease;
                    flex-shrink: 0;
                }

                .close-button:hover {
                    background-color: rgba(255, 255, 255, 0.2);
                }

                .terms-modal-content {
                    flex: 1;
                    overflow-y: auto;
                    padding: 25px;
                    background: #f8f9fa;
                }

                .terms-content {
                    background: white;
                    padding: 25px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                .terms-content h3 {
                    color: #121731;
                    margin: 20px 0 10px 0;
                    font-size: clamp(14px, 3vw, 16px);
                    font-weight: 600;
                }

                .terms-content h3:first-child {
                    margin-top: 0;
                }

                .terms-content p {
                    color: #555;
                    line-height: 1.5;
                    margin-bottom: 15px;
                    font-size: clamp(12px, 2vw, 14px);
                }

                .terms-content strong {
                    color: #121731;
                }

                .terms-modal-footer {
                    padding: 20px 25px;
                    border-top: 1px solid #e9ecef;
                    background: white;
                    border-radius: 0 0 12px 12px;
                    text-align: center;
                }

                .agree-button {
                    background: linear-gradient(135deg, #121731, #728a9c);
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 7px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 3px 8px rgba(75, 108, 183, 0.3);
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
                @media (min-width: 1200px) {
                    .container {
                        max-width: 900px;
                        height: 650px;
                    }
                }

                /* Tablet and Small Desktop */
                @media (max-width: 1024px) {
                    .container {
                        width: 90%;
                        max-width: 800px;
                    }
                    
                    .left-panel {
                        padding: 20px 15px;
                    }
                    
                    .right-panel {
                        padding: 25px 15px;
                    }
                }

                /* Tablet */
                @media (max-width: 768px) {
                    .container {
                        flex-direction: column;
                        width: 90%;
                        max-height: 85vh;
                        min-height: auto;
                    }
                    
                    .left-panel {
                        order: 2;
                        padding: 20px;
                        flex: 1;
                        overflow-y: auto;
                        min-height: 300px;
                    }
                    
                    .right-panel {
                        order: 1;
                        padding: 20px;
                        flex: 0 0 auto;
                        min-height: 180px;
                    }
                    
                    .register-box {
                        max-width: 100%;
                        padding: 0 5px;
                    }
                    
                    .circle-4 {
                        left: 80%;
                    }
                    
                    .logo-circle {
                        width: 100px;
                        height: 100px;
                    }
                    
                    .brand-name {
                        font-size: 22px;
                    }

                    .terms-modal {
                        width: 95%;
                        max-height: 80vh;
                    }
                }

                /* Mobile Landscape */
                @media (max-width: 768px) and (orientation: landscape) {
                    .container {
                        max-height: 90vh;
                        flex-direction: row;
                    }
                    
                    .left-panel {
                        order: 1;
                        min-height: 250px;
                    }
                    
                    .right-panel {
                        order: 2;
                        min-height: 250px;
                    }
                }

                /* Mobile */
                @media (max-width: 480px) {
                    .container {
                        width: 95%;
                        border-radius: 12px;
                        max-height: 90vh;
                    }
                    
                    .left-panel {
                        padding: 15px;
                    }
                    
                    .right-panel {
                        padding: 15px;
                        min-height: 150px;
                    }
                    
                    .register-header h2 {
                        font-size: 20px;
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
                        margin-bottom: 10px;
                    }
                    
                    .input-group input {
                        padding: 10px 30px 10px 30px;
                        font-size: 14px;
                    }
                    
                    .toggle-eye {
                        font-size: 13px;
                        right: 10px;
                    }
                    
                    .input-group i:not(.toggle-eye) {
                        font-size: 13px;
                        left: 10px;
                    }

                    .terms-modal-header {
                        padding: 15px 20px;
                    }

                    .terms-modal-header h2 {
                        font-size: 18px;
                    }

                    .terms-modal-content {
                        padding: 15px;
                    }

                    .terms-content {
                        padding: 15px;
                    }

                    .terms-content h3 {
                        font-size: 15px;
                    }
                    
                    .register-button {
                        padding: 12px;
                        font-size: 14px;
                    }
                }

                /* Small Mobile */
                @media (max-width: 360px) {
                    .container {
                        width: 98%;
                        max-height: 95vh;
                    }
                    
                    .left-panel {
                        padding: 12px 10px;
                    }
                    
                    .register-box {
                        padding: 0;
                    }
                    
                    .terms-group {
                        flex-wrap: wrap;
                        font-size: 12px;
                        justify-content: flex-start;
                    }
                    
                    .terms-group label {
                        font-size: 12px;
                    }
                    
                    .register-button {
                        padding: 11px;
                        font-size: 13px;
                    }
                    
                    .login-text, .about-system {
                        font-size: 12px;
                    }
                    
                    .right-panel {
                        padding: 12px 10px;
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
                        max-height: 85vh;
                    }

                    .terms-modal-header {
                        padding: 12px 15px;
                    }

                    .terms-modal-header h2 {
                        font-size: 16px;
                    }

                    .terms-modal-content {
                        padding: 12px;
                    }

                    .terms-content {
                        padding: 12px;
                    }

                    .agree-button {
                        padding: 10px 20px;
                        font-size: 13px;
                    }
                }

                /* Extra Small Mobile */
                @media (max-width: 320px) {
                    .register-header h2 {
                        font-size: 18px;
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
                        padding: 8px 25px 8px 25px;
                        font-size: 13px;
                    }
                    
                    .toggle-eye {
                        font-size: 12px;
                        right: 8px;
                    }
                    
                    .input-group i:not(.toggle-eye) {
                        font-size: 12px;
                        left: 8px;
                    }
                }

                /* Tall Mobile Screens */
                @media (min-height: 1000px) and (max-width: 768px) {
                    .container {
                        min-height: 600px;
                        max-height: 70vh;
                    }
                }

                /* Short Screens */
                @media (max-height: 700px) {
                    .container {
                        height: 95vh;
                        max-height: 95vh;
                    }
                    
                    .left-panel {
                        overflow-y: auto;
                        padding: 15px;
                    }
                    
                    .right-panel {
                        padding: 15px;
                    }
                }

                .left-panel::-webkit-scrollbar {
                    width: 0;
                    background: transparent;
                }

                .register-button:disabled {
                    cursor: not-allowed;
                    transform: none !important;
                }

                .fa-spin {
                    margin-right: 8px;
                }
            `}</style>
        </>
    );
}