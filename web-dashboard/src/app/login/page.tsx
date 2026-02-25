'use client';

import React, { useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';

const LoginPage = () => {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: username });
        alert("Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Auth error:", error);
      alert(error.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="login-container">
        <div className="card">
          <div className="card2">
            <form className="form" onSubmit={handleSubmit}>
              <p id="heading">{isSignUp ? 'Eco Sign Up' : 'Eco Login'}</p>

              {isSignUp && (
                <div className="field">
                  <svg viewBox="0 0 16 16" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg" className="input-icon">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Display Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="field">
                <svg viewBox="0 0 16 16" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg" className="input-icon">
                  <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                </svg>
                <input
                  type="email"
                  className="input-field"
                  placeholder="Eco Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="field">
                <svg viewBox="0 0 16 16" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg" className="input-icon">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                </svg>
                <input
                  type="password"
                  className="input-field"
                  placeholder="Seed Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="btn">
                <button type="submit" disabled={loading} className="button1">
                  {loading ? '...' : (isSignUp ? 'Join Now' : 'Login')}
                </button>
                <button
                  type="button"
                  className="button2"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? 'Has Account?' : 'Sign Up'}
                </button>
              </div>
              <button type="button" className="button3">Forgot Password</button>
            </form>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #0d1a18;
  padding: 20px;

  .login-container {
     width: 100%;
     max-width: 400px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 2.5em;
    background-color: #1B3733;
    border-radius: 25px;
  }

  #heading {
    text-align: center;
    margin: 1.5em;
    color: #10b981;
    font-size: 1.5em;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .field {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8em;
    border-radius: 20px;
    padding: 0.8em 1.2em;
    border: 1px solid rgba(16, 185, 129, 0.1);
    outline: none;
    color: #EAEEEF;
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
  }
  
  .field:focus-within {
     border-color: #10b981;
     box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.3), 0 0 15px rgba(16, 185, 129, 0.2);
  }

  .input-icon {
    height: 1.3em;
    width: 1.3em;
    fill: #10b981;
  }

  .input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: #EAEEEF;
    font-size: 0.9em;
  }

  .form .btn {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 2.5em;
  }

  .button1, .button2 {
    padding: 0.8em;
    border-radius: 12px;
    border: none;
    outline: none;
    transition: all .4s ease-in-out;
    background-image: linear-gradient(163deg, #10b981 0%, #065f46 100%);
    color: #1B3733;
    font-weight: 800;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 0.8em;
  }

  .button1:hover, .button2:hover {
    background-image: linear-gradient(163deg, #059669 0%, #065f46 100%);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.4);
  }

  .button3 {
    margin-top: 1em;
    margin-bottom: 2em;
    padding: 0.5em;
    border-radius: 10px;
    border: none;
    outline: none;
    transition: all .4s ease-in-out;
    background: transparent;
    color: #10b981;
    font-weight: 600;
    cursor: pointer;
    font-size: 0.8em;
  }

  .button3:hover {
    color: #EAEEEF;
    text-decoration: underline;
  }

  .card {
    background-image: linear-gradient(163deg, #10b981 0%, #065f46 100%);
    border-radius: 27px;
    transition: all .3s;
    padding: 1px;
  }

  .card2 {
    border-radius: 26px;
    transition: all .2s;
    background-color: #1B3733;
  }

  .card2:hover {
    transform: scale(0.99);
  }

  .card:hover {
    box-shadow: 0px 0px 40px 1px rgba(16, 185, 129, 0.25);
  }`;

export default LoginPage;
