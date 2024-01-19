import { useState } from 'react';
import axios from '../../config/axiosConfig';
import './Register.css';
import { useNavigate } from 'react-router-dom';

async function userRegister(credentials, navigate) {
  try {
    const response = await axios.post('/user/register', {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
    });

    if (response.status === 201) {
      navigate("/login")
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('Invalid email and/or password');
      } else {
        throw new Error('Register failed. Please try again later.');
      }
    } else {
      throw new Error('Network error: Unable to connect to the server.');
    }
  }
}



const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState(null); // State for displaying login errors

  const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null); // Clear any previous error

      try {
        const response = await userRegister({ username, email, password }, navigate);
        console.log(response);
      } catch (error) {
        setError(error.message);
      }
    };

  return (
    <>
    <center>
      <form className='userForm' onSubmit={handleSubmit}>
        <h2>Create a new account</h2>
        <label>
          <p>Username</p>
          <input type="text" data-cy="username" name='username' onChange={(e) => setUsername(e.target.value)}/>
        </label>
        <label>
          <p>Email</p>
          <input type="text" data-cy="email" name='email' onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" data-cy="password" name='password' onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <div>
          <button data-cy="registerConfirm" type="submit">Register</button>
        </div>
        <p id='errorMessage' data-cy="errorMessage">{errorMessage}</p>
      </form>
    </center>
    </>
  );
};

export default Register;
