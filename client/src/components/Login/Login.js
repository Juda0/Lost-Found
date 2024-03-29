import { useState } from 'react';
import axios from '../../config/axiosConfig';
import './Login.css';
import { useNavigate } from 'react-router-dom';

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
      if (error.response.status === 404) {
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

  const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

        try {
          const token = await userLogin({ email, password });
          if (token) {
            localStorage.setItem('authToken', token);
            navigate('/posts');
            console.log('You are now logged in!');
            window.location.reload(); // Simulate pressing F5 to refresh the page
          }else{
            console.log('token not set')
          }
        } catch (error) {
          setError(error.message);
        }
        };


      // Navigate to the registration page when the "Register" button is clicked
    const handleRegisterClick = () => {
      navigate('/register')
    };

  return (
    <>
    <center>
      <div className='userForm'>
        <form  onSubmit={handleSubmit}>
        <h2>Sign in to your account</h2>
          <label>
            <p>Email</p>
            <input required type="text" data-cy="email" name='email' onChange={(e) => setEmail(e.target.value)}/>
          </label>
          <label>
            <p>Password</p>
            <input required type="password"  autoComplete="on" data-cy="password" name='password' onChange={(e) => setPassword(e.target.value)}/>
          </label>
          <div className="button-container">
            <button type="submit" data-cy="submit" className='btnPrimary'>Login</button>
            <button onClick={handleRegisterClick} data-cy="register" className='btnSecondary'>Register</button>
          </div>
        </form>
        <p id='errorMessage'>{errorMessage}</p>
      </div>
    </center>
    </>
  );
};

export default Login;
