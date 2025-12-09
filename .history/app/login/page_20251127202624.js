'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useAuthRequest } from '../../hooks/useAuthRequest';
import { useRouter } from 'next/navigation';
import { signIn, getSession } from "next-auth/react";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const { login, loading, error } = useAuthRequest();
    const router = useRouter();

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const loginUser = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Error: Email and password are required.');
            return;
        }

        try {
            const data = await login(email, password);
            
            // Store token and user data
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            
            console.log("Login successful!", data);
            alert(`Welcome back, ${data.user.firstName}! Redirecting to your account...`);
            
            // Redirect based on email
            if (email === 'floresjamaicamae30@gmail.com') {
                router.push('/admin/acc');
            } else {
                router.push('/user/account');
            }
            
        } catch (err) {
            console.error("Login Error:", err);
            alert(err.message || 'Login failed. Please check your credentials.');
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            // Sign in without redirect to handle redirection manually
            const result = await signIn('google', { 
                redirect: false 
            });

            if (result?.ok) {
                // Get the session to check user role
                const session = await getSession();
                
                if (session?.user?.email === 'floresjamaicamae30@gmail.com') {
                    router.push('/admin/acc');
                } else {
                    router.push('/user/account');
                }
            } else {
                console.error('Google Sign-In Error:', result?.error);
                alert('Google sign-in failed. Please try again.');
            }
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            alert('Google sign-in failed. Please try again.');
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
                            
                            {/* Google Sign-In Button */}
                            <div className="google-signin-section">
                                <button
                                    type="button"
                                    onClick={handleGoogleSignIn}
                                    className="google-signin-button"
                                    disabled={loading}
                                >
                                    <Image 
                                        src="/assets/google-logo.png" 
                                        alt="Google Logo" 
                                        width={20}
                                        height={20}
                                        className="google-logo"
                                    />
                                    <span>Sign in with Google</span>
                                </button>
                                
                                <div className="divider">
                                    <span>or</span>
                                </div>
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
                                        disabled={loading}
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
                                        disabled={loading}
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Your existing CSS styles remain the same */}
            <style jsx>{`
                .container {
                    display: flex;
                    width: 850px;
                    height: 600px;
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

                /* ... rest of your existing CSS styles ... */
            `}</style>
        </>
    );
}