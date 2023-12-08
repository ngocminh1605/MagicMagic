import React, { useState } from 'react';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


import { useNavigate } from 'react-router-dom';
import './login.scss';

const Login = () => {




  return (
    <div className='login-page'>
      <div className='page'>
        <div className='cover'>


          <h1>Login</h1>


          <div className='login-form'>
            <PersonOutlinedIcon className='icon' />
            <input type='text' placeholder='Username'/>
            {/* <label >Username</label> */}

          </div>


          <div className='login-form'>
            <LockOutlinedIcon className='icon' />
            <input type='password' placeholder='Password' />
            {/* <label>Password</label> */}
          </div>


          <div className='rmb-fg'>
            <label>
              <input type='checkbox' />
              <div>Remember me</div>
            </label>
            <div className='forget'>Forget password</div>
          </div>


          <button>Login</button>
          {/* <div className='login-btn'>Login</div> */}


        </div>
      </div>
    </div>
  )
}

export default Login;
