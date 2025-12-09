

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
                    margin-bottom: 25px;
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

                /* Google Sign-In Styles */
                .google-signin-section {
                    margin-bottom: 25px;
                }

                .google-signin-button {
                    width: 100%;
                    padding: 12px 16px;
                    background: white;
                    color: #333;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    font-size: 15px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .google-signin-button:hover:not(:disabled) {
                    background: #f8f9fa;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                    transform: translateY(-1px);
                }

                .google-signin-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .google-logo {
                    width: 20px;
                    height: 20px;
                }

                .divider {
                    display: flex;
                    align-items: center;
                    margin: 20px 0;
                    color: #7f8c8d;
                    font-size: 14px;
                }

                .divider::before,
                .divider::after {
                    content: '';
                    flex: 1;
                    border-bottom: 1px solid #ddd;
                }

                .divider span {
                    padding: 0 15px;
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

                .input-group input:hover:not(:disabled) {
                    border-color: #728a9c;
                    background: #EEEEEE;
                }

                .input-group input:focus {
                    border-color: #728a9c;
                    box-shadow: 0 0 6px rgba(75, 108, 183, 0.25);
                    background: #fff;
                }

                .input-group input:disabled {
                    background-color: #f5f5f5;
                    cursor: not-allowed;
                    opacity: 0.7;
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