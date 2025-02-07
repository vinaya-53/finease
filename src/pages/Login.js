import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === '123' && password === '123') {
      navigate('/home');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="c-l">
      <h2 className="text-2xl font-bold text-purple-700">LOGIN</h2>
      <form className='form'>
        <div>
        <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="form__input"
      /> </div>
      <div><input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form__input"
      /> </div>
      <div><button
        onClick={handleLogin}
        className="btn-l w-full mt-4 bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
      >
        Submit
      </button> </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Login;