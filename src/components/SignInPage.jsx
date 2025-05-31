import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/clerk-react';
import { Link } from 'react-router-dom'; // ✅ Import Link from React Router
import BeeDay from '/BeeDay.gif';

import './SignInPage.css';

const SignInPage = () => {


    return (
        <div className="sign-in-container">


            <div className="forest-welcome">
                <h2>🌿 Welcome to the EduArcade! 🌿</h2>
                <p className='forestwelcomeParagraph'>Please sign in to continue your magical journey.</p>
            </div>

            <div className="clerk-signin">
                <ClerkLoading>
                    <div className="SignInLoader">
                        <span>
                            <i></i><i></i><i></i><i></i>
                        </span>
                    </div>
                </ClerkLoading>


                <ClerkLoaded>
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
                </ClerkLoaded>
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
