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

    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
    const [confirmPasswordHasFocus, setConfirmPasswordHasFocus] = useState(false);
    const [termsLinkClicked, setTermsLinkClicked] = useState(false);
    
    const [hasMinLength, setHasMinLength] = useState(false);
    const [hasUpperCase, setHasUpperCase] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);

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
        setTermsLinkClicked(true);
    };
    
    const hideTermsModal = () => {
        setShowTerms(false);
        setTermsLinkClicked(false);
    };
    
    const acceptTerms = () => {
        setTermsAccepted(true);
        hideTermsModal();
    };
    
    const validatePassword = () => {
        const pwd = password;
        
        setHasMinLength(pwd.length >= 8);
        setHasUpperCase(/[A-Z]/.test(pwd));
        setHasNumber(/\d/.test(pwd));
        setHasSpecialChar(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd));
    };
    
    const hidePasswordRequirements = () => {
        setTimeout(() => {
            if (password === '') {
                setShowPasswordRequirements(false);
            }
        }, 300);
    };
    
    const validatePasswordRequirements = (pwd) => {
        const hasMinLength = pwd.length >= 8;
        const hasUpperCase = /[A-Z]/.test(pwd);
        const hasNumber = /\d/.test(pwd);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);
        return hasMinLength && hasUpperCase && hasNumber && hasSpecialChar;
    };
    
    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };
    
    const getErrorMessage = (error) => {
        const errorCode = error.code;
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return 'Email address is already in use. Please use a different email or login.';
            case 'auth/invalid-email':
                return 'The email address is invalid.';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters and meet all requirements.';
            case 'auth/network-request-failed':
                return 'Network error. Please check your internet connection.';
            case 'auth/too-many-requests':
                return 'Too many attempts. Please try again later.';
            default:
                return error.message || 'An unexpected error occurred. Please try again.';
        }
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
        
        if (!validatePasswordRequirements(password)) {
            return alert('Password must meet all requirements:\n- At least 8 characters\n- At least 1 uppercase letter\n- At least 1 number\n- At least 1 special character');
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
            alert(getErrorMessage(error));
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

        const handleClick = (event) => {
            const passwordInput = document.querySelector('.password-container input');
            const isClickInsidePassword = passwordInput && passwordInput.contains(event.target);
            const isClickOnTermsLink = event.target.closest('.terms-group a');
            
            if (!isClickInsidePassword && !isClickOnTermsLink) {
                setShowPasswordRequirements(false);
            }
        };

        const handleKeydown = (event) => {
            if (event.key === 'Escape' && showTerms) {
                hideTermsModal();
            }
        };

        document.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.body.classList.remove('register-page-body');
            document.removeEventListener('click', handleClick);
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

            <div className="flex justify-center items-center min-h-screen w-full p-5 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/background.png')" }}>
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
                                        onFocus={() => setShowPasswordRequirements(true)}
                                        onBlur={hidePasswordRequirements}
                                        onInput={validatePassword}
                                    />
                                    <i 
                                        className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'} toggle-eye`}
                                        onClick={togglePassword}
                                    ></i>
                                </div>

                                {showPasswordRequirements && !confirmPasswordHasFocus && !termsLinkClicked && (
                                    <div className="password-requirements">
                                        <div className={hasMinLength ? 'valid' : ''}>
                                            <i className={hasMinLength ? 'fas fa-check' : 'fas fa-times'}></i>
                                            At least 8 characters
                                        </div>
                                        <div className={hasUpperCase ? 'valid' : ''}>
                                            <i className={hasUpperCase ? 'fas fa-check' : 'fas fa-times'}></i>
                                            At least 1 uppercase letter
                                        </div>
                                        <div className={hasNumber ? 'valid' : ''}>
                                            <i className={hasNumber ? 'fas fa-check' : 'fas fa-times'}></i>
                                            At least 1 number
                                        </div>
                                        <div className={hasSpecialChar ? 'valid' : ''}>
                                            <i className={hasSpecialChar ? 'fas fa-check' : 'fas fa-times'}></i>
                                            At least 1 special character
                                        </div>
                                    </div>
                                )}
                                
                                <div className="input-group password-container">
                                    <i className="fas fa-lock"></i>
                                    <input 
                                        type={showConfirmPassword ? 'text' : 'password'} 
                                        placeholder="Confirm Password" 
                                        required 
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        onFocus={() => setConfirmPasswordHasFocus(true)}
                                        onBlur={() => setConfirmPasswordHasFocus(false)}
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
                    width: 85%;
                    max-width: 750px;
                    height: 600px;
                    min-height: 450px;
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 18px;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15), 
                                0 4px 8px rgba(0, 0, 0, 0.05);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 3px solid rgba(255, 255, 255);
                    overflow: hidden;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                  
                    /* Center it */
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                

                .left-panel {
                    flex: 1.2;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 25px;
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
                }

                .register-box {
                    width: 100%;
                    max-width: 380px;
                }

                .register-header {
                    margin-bottom: 18px;
                }

                .register-header h2 {
                    font-size: 26px;
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
                    font-size: 13px;
                    text-align: center;
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
                    padding: 10px 32px 10px 32px;
                    border: 1px solid #ccc;
                    border-radius: 7px;
                    font-size: 13px;
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
                    box-shadow: 0 0 5px rgba(75, 108, 183, 0.25);
                    background: #fff;
                }

                .input-group i:not(.toggle-eye) {
                    position: absolute;
                    left: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #728a9c;
                    font-size: 14px;
                    z-index: 2;
                }

                .terms-group {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 12px;
                    font-size: 12px;
                    color: #7f8c8d;
                    text-align: center;
                }

                .terms-group input {
                    margin-right: 6px;
                    width: 12px;
                    height: 12px;
                }

                .terms-group a {
                    color: #728a9c;
                    text-decoration: none;
                    font-weight: 600;
                }

                .terms-group a:hover {
                    text-decoration: underline;
                }

                .register-button {
                    width: 100%;
                    padding: 10px;
                    background: linear-gradient(135deg, #121731, #728a9c 100%);
                    color: white;
                    border: none;
                    border-radius: 7px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 3px 8px rgba(75, 108, 183, 0.3);
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
                    font-size: 12px;
                }

                .login-link {
                    color: #728a9c;
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s;
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
                    font-size: 12px;
                    transition: all 0.3s;
                }

                .about-system:hover {
                    color: #182848;
                    text-decoration: underline;
                }

                .logo-circle {
                    width: 200px;
                    height: 200px;
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
                    font-size: 28px;
                    font-weight: 700;
                    margin-top: 8px;
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

                .password-requirements {
                    font-size: 0.7rem;
                    margin: 0.25rem 0 0.4rem 0;
                    color: #555;
                    padding: 0.4rem;
                    background-color: #f8f9fa;
                    border-radius: 4px;
                    border-left: 3px solid #0a3160;
                }

                .password-requirements div {
                    margin-bottom: 0.15rem;
                    display: flex;
                    align-items: center;
                    transition: color 0.3s ease;
                }

                .password-requirements div.valid {
                    color: #28a745;
                }

                .password-requirements div i {
                    margin-right: 6px;
                    font-size: 10px;
                    width: 10px;
                }

                .password-requirements div.valid i.fa-check {
                    color: #28a745;
                }

                .password-requirements div:not(.valid) i.fa-times {
                    color: #97170c;
                }

                .terms-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(18, 23, 49, 0.3);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    animation: fadeIn 0.3s ease;
                    backdrop-filter: blur(10px);
                  }

                  .terms-modal {
                    background: var(--light);
                    border-radius: 14px;
                    width: 90%;
                    max-width: 650px;
                    max-height: 75vh;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
                    animation: slideUp 0.3s ease;
                    overflow: hidden;
                  }

                  .terms-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 18px 22px;
                    background: linear-gradient(135deg, var(--primary), var(--grey));
                    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
                  }

                  .terms-modal-header h2 {
                    color: var(--light);
                    margin: 0;
                    font-size: 22px;
                    font-weight: 600;
                    letter-spacing: 0.3px;
                  }

                  .close-button {
                    background: rgba(255, 255, 255, 0.1);
                    border: none;
                    color: var(--light);
                    font-size: 18px;
                    cursor: pointer;
                    padding: 6px;
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.25s ease;
                  }

                  .close-button:hover {
                    background-color: rgba(255, 255, 255, 0.25);
                    transform: rotate(90deg);
                  }
                  
                  .terms-modal-content {
                    flex: 1;
                    overflow-y: auto;
                    padding: 22px;
                    background: #f3f6fa;
                  }

                  .terms-content {
                    background: var(--light);
                    padding: 22px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(18, 23, 49, 0.1);
                    border: 1px solid rgba(18, 23, 49, 0.05);
                  }

                  .terms-content h3 {
                    color: var(--primary);
                    margin: 18px 0 8px 0;
                    font-size: 16px;
                    font-weight: 600;
                  }

                .terms-content h3:first-child {
                    margin-top: 0;
                }

                .terms-content p {
                    color: #555;
                    line-height: 1.6;
                    margin-bottom: 12px;
                    font-size: 14px;
                  }
                  
                  .terms-content strong {
                    color: var(--primary);
                  }
                  
                  .terms-modal-footer {
                    padding: 18px 22px;
                    border-top: 1px solid #e9ecef;
                    background: var(--light);
                    text-align: center;
                  }

                  .agree-button {
                    background: linear-gradient(135deg, var(--primary), var(--grey));
                    color: var(--light);
                    border: none;
                    padding: 10px 25px;
                    border-radius: 7px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 3px 8px rgba(18, 23, 49, 0.25);
                  }
                  
                  .agree-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 12px rgba(18, 23, 49, 0.35);
                    background: linear-gradient(135deg, var(--grey), var(--primary));
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

                @media (max-width: 992px) {
                    .container {
                        flex-direction: column;
                        max-height: 90vh;
                        overflow: hidden;
                    }
                    
                    .left-panel {
                        order: 2;
                        padding: 12px;
                        flex: 1;
                        overflow-y: auto;
                    }
                    
                    .right-panel {
                        order: 1;
                        padding: 18px;
                        flex: 0.6;
                    }
                    
                    .register-box {
                        max-width: 100%;
                        transform: scale(0.85);
                    }
                    
                    .circle-4 {
                        left: 80%;
                    }
                    
                    .logo-circle {
                        width: 90px;
                        height: 90px;
                    }
                    
                    .brand-name {
                        font-size: 22px;
                    }

                    .terms-modal {
                        width: 95%;
                        max-height: 80vh;
                    }
                }

                @media (max-width: 768px) {
                    .container {
                        border-radius: 12px;
                        max-height: 90vh;
                    }
                    
                    .left-panel {
                        padding: 12px;
                    }
                    
                    .right-panel {
                        padding: 12px;
                    }
                    
                    .register-header h2 {
                        font-size: 20px;
                        }
                    
                    .brand-name {
                        font-size: 18px;
                    }
                    
                    .logo-circle {
                        width: 70px;
                        height: 70px;
                    }
                    
                    .circle-1, .circle-2, .circle-3, .circle-4 {
                        display: none;
                    }
                    
                    .input-group {
                        margin-bottom: 8px;
                    }
                    
                    .input-group input {
                        padding: 7px 7px 7px 25px;
                        font-size: 11px;
                    }
                    
                    .toggle-eye {
                        font-size: 11px;
                        right: 8px;
                    }
                    
                    .input-group i:not(.toggle-eye) {
                        font-size: 11px;
                        left: 8px;
                    }
                    
                    .password-requirements {
                        font-size: 0.65rem;
                        padding: 0.35rem;
                    }

                    .terms-modal-header {
                        padding: 12px 18px;
                    }

                    .terms-modal-header h2 {
                        font-size: 18px;
                    }

                    .terms-modal-content {
                        padding: 18px;
                    }

                    .terms-content {
                        padding: 18px;
                    }

                    .terms-content h3 {
                        font-size: 14px;
                    }
                }

                @media (max-width: 576px) {
                    .container {
                        border-width: 2px;
                        max-height: 90vh;
                    }
                    
                    .left-panel {
                        padding: 8px;
                    }
                    
                    .register-box {
                        transform: scale(0.8);
                    }
                    
                    .terms-group {
                        flex-wrap: wrap;
                        font-size: 10px;
                    }
                    
                    .register-button {
                        padding: 7px;
                        font-size: 11px;
                    }
                    
                    .login-text, .about-system {
                        font-size: 10px;
                    }
                    
                    .right-panel {
                        padding: 8px;
                    }
                    
                    .logo-circle {
                        width: 60px;
                        height: 60px;
                    }
                    
                    .brand-name {
                        font-size: 16px;
                    }

                    .terms-modal {
                        width: 98%;
                        max-height: 85vh;
                    }

                    .terms-modal-header {
                        padding: 10px 12px;
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
                        padding: 8px 18px;
                        font-size: 12px;
                    }
                }

                @media (max-width: 400px) {
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
                    
                    .register-box {
                        transform: scale(0.75);
                    }

                    .input-group input {
                        padding: 7px 22px 7px 22px;
                        }
                    
                    .toggle-eye {
                        font-size: 10px;
                        right: 6px;
                    }
                }

                @media (max-width: 350px) {
                    .terms-group {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    
                    .terms-group input {
                        margin-bottom: 3px;
                    }
                    
                    .register-box {
                        transform: scale(0.7);
                    }
                    
                    .input-group input {
                        padding: 5px 20px 5px 20px;
                        font-size: 10px;
                    }
                    
                    .toggle-eye {
                        font-size: 9px;
                        right: 5px;
                    }
                }
                @media (min-height: 1000px) {
                    .container {
                        min-height: 550px;
                        max-height: 75vh;
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