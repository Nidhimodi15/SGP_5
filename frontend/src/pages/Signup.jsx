import React from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (credentialResponse) => {
    try {
      console.log(credentialResponse)
      const res = await axios.post(
        'http://localhost:3000/api/v1/user/signup',
        {
          token: credentialResponse.credential,
        },
        {
          withCredentials: true,
        }
      );

      localStorage.setItem('token', res.data.data.refreshToken);
      console.log('User Info:', res.data.data.User);
      alert('Signup successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark text-text-light px-4">
      <div className="w-full max-w-md bg-bg-card rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-2">Create an Account</h2>
        <p className="text-center text-sm mb-6 text-text-muted">
          Sign up with{' '}
          <span className="text-accent font-medium">Google</span> to get started
        </p>

        <GoogleLogin
          onSuccess={handleSignup}
          onError={() => {
            console.log('Google Signup Failed');
          }}
          useOneTap
        />

        <p className="mt-6 text-center text-sm text-text-muted">
          Already have an account?{' '}
          <Link to="/signin" className="text-accent hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
