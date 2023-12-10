import React, { useState } from 'react';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../../constant/axios';
import './login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
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
        const response2 = await axiosInstance.get('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response2.status === 200) {
          navigate('/home');
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

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
            />
          </div>
          <div className="rmb-fg">
            <label>
              <input type="checkbox" />
              <div>Remember me</div>
            </label>
            <div className="forget">Forget password</div>
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};
export default Login;
