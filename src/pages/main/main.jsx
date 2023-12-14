import React, { useEffect, useState } from 'react';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './main.scss';
import { axiosInstance } from '../../constant/axios';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo1 from '../../assets/logo/express-delivery.png';
import img1 from '../../assets/view.jpg'



const Main = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <div className="main-page">

                <div className='nav-bar'>
                    <div className='logo1'>
                        <img src={logo1} alt='' />
                        <span>
                            Magic<span>Magic</span>
                        </span>
                    </div>
                    <Button
                        onClick={() => navigate('login')}
                        style={{
                            textTransform: 'none',
                            backgroundColor: "#FF9AA2",
                            color: 'white',
                            width: 150,
                            marginRight: '5rem',
                            marginTop: '1rem',
                            borderRadius: 10,
                            height: 40,
                            marginLeft: 'auto',
                            fontWeight: 'bold',
                            fontSize: 20

                        }}
                    >
                        Đăng nhập
                    </Button>

                </div>
                <div className='main-content'>
                    <div className='track'>
                        Theo dõi đơn hàng
                    </div>
                    <div className='track-wrap'>
                        <div className='input-wrap'>
                            <input
                                type="text"
                                placeholder="Nhập mã đơn hàng"
                            />
                            <span className='idk'>
                                <Button
                                    onClick={() => navigate('login')}
                                    style={{
                                        textTransform: 'none',
                                        backgroundColor: "#FF9AA2",
                                        color: 'white',
                                        width: 150,
                                        marginRight: '0',
                                        // marginTop: '1rem',
                                        borderRadius: 10,
                                        height: '64px',
                                        marginLeft: 'auto',
                                        fontWeight: 'bold',
                                        fontSize: 20

                                    }}
                                >
                                    Theo dõi
                                </Button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;