import React, { useEffect, useState } from 'react';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import './login.scss';
import { axiosInstance } from '../../constant/axios';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const saveToken = (token) => {
    localStorage.setItem('token', token);
  };

  const handleLogin = async () => {
    console.log('handleLogin called');
    try {
      const response = await axiosInstance.post('/users/login', {
        username: username,
        password: password,
      });
  
      if (response.status === 200) {
        // Xử lý khi đăng nhập thành công
        const token = response.data.token;
        console.log('Login successfully!');
        saveToken(token);
        console.log(token);
  
        const response2 = await axiosInstance.get('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        if (response2.status === 200) {
          navigate('/home');
        }
      } else {
        console.error('Login failed');
        alert("Sai username hoặc password :<")
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert("Sai username hoặc password :<")
    }
  };
  
  useEffect(() => {
    // Kiểm tra xem đã có token trong localStorage chưa
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      navigate('/home');
    }
  }, [navigate]);

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
        handleLogin();
    }
}

  return (
    <div className="login-page">
      <div className="page">
        <div className="cover">
          <h1>Login</h1>
          <div className="login-form">
            <PersonOutlinedIcon className="icon" />
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="login-form">
            <LockOutlinedIcon className="icon" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleEnter}
            />
          </div>
          
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
