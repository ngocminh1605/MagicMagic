import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
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

const Form = (props) => (
  <div>
    <FormInput description="Username" placeholder="Enter your username" type="text" />
    <FormInput description="Password" placeholder="Enter your password" type="password" />
    <FormButton title="Log in" handleLogin={props.handleLogin} />
  </div>
);

const FormButton = (props) => (
  <div className="row">
    <button onClick={props.handleLogin}>{props.title}</button>
  </div>
);

const FormInput = (props) => (
  <div className="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder} />
  </div>
);
const OtherMethods = props => (
  <div id="alternativeLogin">
    <label></label>
  </div>
);



export default Login;
