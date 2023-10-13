import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';



function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const art_v = 'https://site-71233493.bcvp0rtal.com/detail/videos/chronicle-playlist/video/6310494955112/carlos-rol%C3%B3n:-working-with-assistants-watermark'

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    // 'http://localhost:3000/users/signin'

    axios.post('https://art-v-login.onrender.com', { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push(API_BASE_URL);
      // props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div>
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;