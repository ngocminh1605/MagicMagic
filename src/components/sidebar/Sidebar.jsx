import React, { useState } from 'react';
import './sidebar.scss';
import logo from '../../assets/logo/express-delivery.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import nv2 from '../navbar/nv2.jpg';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const menuItems = [
    { icon: <DashboardIcon />, text: 'Home', path: '/' },
    { icon: <AccountCircleOutlinedIcon />, text: 'Employee', path: '/nhanvien' },
    { icon: <BusinessOutlinedIcon />, text: 'Office', path: '/' },
    { icon: <WorkOutlinedIcon />, text: 'Position', path: '/' },
    { icon: <AccountTreeOutlinedIcon />, text: 'Orders', path: '/' },
  ];

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
    <div className='sidebar'>
      <div className='logo'>
        <img src={logo} alt='' />
        <span>
          Magic<span>Magic</span>
        </span>
      </div>

      <div className='menu'>
        {menuItems.map((item, index) => (
          <Link to={item.path} style={{ textDecoration: 'none' }} key={index}>
            <div
              className={`menuItem ${activeItem === index ? 'active' : ''}`}
              onClick={() => handleItemClick(index)}
            >
              <div>{item.icon}</div>
              <span>{item.text}</span>
            </div>
          </Link>
        ))}
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
  );
};

export default Sidebar;
