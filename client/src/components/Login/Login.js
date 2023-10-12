import { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import './Login.css';
import { json } from 'react-router-dom';

async function userLogin(credentials) {
  try {
    const response = await axios.post('/user/login', {
      email: credentials.email,
      password: credentials.password,
    });

    if (response.status === 200) {
      return response.data.token;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('Invalid email and/or password');
      } else {
        throw new Error('Login failed. Please try again later.');
      }
    } else {
      throw new Error('Network error: Unable to connect to the server.');
    }
  }
}



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState(null); // State for displaying login errors

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null); // Clear any previous error

      try {
        const token = await userLogin({ email, password });
        if (token) {
          localStorage.setItem('authToken', token);
          console.log('You are now logged in!');
        }
      } catch (error) {
        setError(error.message);
      }
    };

  return (
    <>
    <center>
      <form className='userForm' onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" name='email' onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" name='password' onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Login</button>
        </div>
        <p id='errorMessage'>{errorMessage}</p>
      </form>
    </center>
    </>
  );
};

export default Login;
