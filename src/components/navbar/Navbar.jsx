import React from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.scss";
import { useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import nv2 from '../navbar/nv2.jpg';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        // Add any additional logic you need for logout
        // ...

        // Navigate to the login page
        navigate('/login');
    };

    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                </div>
                <div className="items">
                    <div className="item" style={{ color: "#537895", fontWeight: "bold", fontSize: "15px", marginTop: -25, marginLeft: 10 }}>
                        Xin Chào, Admin
                    </div>
                    <div className="item">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="avatar-dropdown" style={{ backgroundColor: "transparent", border: "none", marginTop: -30 }}>
                                <img className="avatar dropdown-toggle" src={nv2} alt="Ảnh" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Sửa hồ sơ</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
