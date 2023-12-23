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
    const [goodCode, setGoodCode] = useState('');
    const [message, setMessage] = useState('');

    const handleClick = async () => {
        try {
            const response = await fetch(`http://localhost:3001/goods/checkExist?goodCode=${goodCode}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                if (data.data) {
                    navigate(`/search/${goodCode}`);
                } else {
                    setMessage("Không tìm thấy thông tin đơn hàng.\nMã đơn hàng không hợp lệ hoặc không tồn tại. Vui lòng thử lại.");
                }
            } else {
                console.error('Lỗi lấy dữ liệu theo Mã QR:', response.statusText);
                return;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleClick();
        }
    }
    

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
                                onChange={(e) => setGoodCode(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />
                            <span className='idk'>
                                <Button
                                    onClick={handleClick}
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
            {message && <div style={{ color: 'red', whiteSpace: 'pre-line' }}>{message}</div>}
        </div>
    );
};

export default Main;