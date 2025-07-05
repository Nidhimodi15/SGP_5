import React from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();

  const handleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/user/signin',
        {
          token: credentialResponse.credential,
        },
        {
          withCredentials: true,
        }
      );

      localStorage.setItem('token', res.data.data.refreshToken);
      console.log('User Info:', res.data.data.User);
      alert('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark text-text-light px-4">
      <div className="w-full max-w-md bg-bg-card rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-sm mb-6 text-text-muted">
          Sign in to continue to <span className="text-accent">SaaSFlow</span>
        </p>

        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => {
            console.log('Google Login Failed');
          }}
          useOneTap
        />

        <p className="mt-6 text-center text-sm text-text-muted">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
