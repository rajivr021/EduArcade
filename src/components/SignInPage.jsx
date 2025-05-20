import { SignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // ✅ Import Link from React Router
import BeeDay from '/BeeDay.gif';

import './SignInPage.css';

const SignInPage = () => {
    const navigate = useNavigate();

    return (
        <div className="sign-in-container">
            {/* Decorative elements */}
            {/*  <div className="mushroom-decoration"></div>
            <div className="leaf-decoration leaf-1"></div>
            <div className="leaf-decoration leaf-2"></div> */}

            <div className="forest-welcome">
                <h2>🌿 Welcome to the EduArcade! 🌿</h2>
                <p className='forestwelcomeParagraph'>Please sign in to continue your magical journey.</p>
            </div>

            <div className="clerk-signin">
                <SignIn
                    path="/sign-in"
                    routing="path"
                    signUpUrl="/sign-up"
                    afterSignInUrl="/"
                    appearance={{
                        elements: {
                            card: 'custom-signin-card',
                            formButtonPrimary: 'custom-signin-button',
                            footer: 'hidden',
                        },
                    }}
                />
                <p className="switch-auth">
                    Don't have an account?<Link to="/sign-up">Sign Up</Link>
                </p>
            </div>
            <div className="BeeDayimgContainer">
                <img src={BeeDay} alt="BeeDay" />
            </div>
        </div>
    );
};

export default SignInPage;
