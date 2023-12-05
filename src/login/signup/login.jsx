import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Xử lý khi đăng nhập thành công, chẳng hạn như lưu token vào localStorage
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        // Xử lý khi đăng nhập thất bại, hiển thị thông báo lỗi
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }

    
  };

  return (
    <div id="loginform">
      <FormHeader title="Login" />
      <Form handleLogin={handleLogin} />
      <OtherMethods />
    </div>
  );
};

const FormHeader = (props) => <h2 id="headerTitle">{props.title}</h2>;

const Form = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <FormInput
        description="Username"
        placeholder="Enter your username"
        type="text"
        value={username}
        onChange={handleUsernameChange}
      />
      <FormInput
        description="Password"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <FormButton title="Log in" handleLogin={() => props.handleLogin(username, password)} />
    </div>
  );
};

const FormButton = (props) => (
  <div className="row">
    <button onClick={props.handleLogin}>{props.title}</button>
  </div>
);

const FormInput = (props) => (
  <div className="row">
    <label>{props.description}</label>
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  </div>
);

const OtherMethods = (props) => <div id="alternativeLogin"><label></label></div>;

export default Login;
