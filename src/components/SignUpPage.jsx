import { SignUp } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import './SignUpPage.css';
import Tree from '/Tree.gif'

const SignUpPage = () => {
  return (
    <div className="sign-up-container">
     

      <div className="forest-welcome">
        <h2>🌿 Join the EduArcade! 🌿</h2>
        <p className='forestwelcomeParagraph'>Create your magical account to begin the adventure.</p>
      </div>

      <div className="clerk-signup">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          afterSignUpUrl="/"
          appearance={{
            elements: {
              card: 'custom-signup-card',
              formButtonPrimary: 'custom-signup-button',
            },
          }}
        />

        <p className="switch-auth">
          Already registered? <Link to="/sign-in">Sign in</Link>
        </p>
      </div>
      <div className="imgContainer">
        <img src={Tree} alt="Butterfly" />
      </div>
    </div>
  );
};

export default SignUpPage;
