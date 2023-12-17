import React, { useState, useEffect, useCallback } from 'react';
import './sidebar.scss';
import logo from '../../assets/logo/express-delivery.png';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import ShippingIcon from '@mui/icons-material/LocalShippingOutlined';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import nv from '../navbar/nv.png';
import { axiosInstance } from '../../constant/axios';


const Sidebar = ({ setOfficeID, setUserID, setTitle }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // chỉnh lại nếu token hết hạn thì remove luôn
          navigate("/");
          return;
        }
        const response = await axiosInstance.get('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const { userId, username, title, officeID } = response.data.user;
          setUserInfo({ userId, username, title, officeID });
          if (setUserID) {
            setUserID(userId);
          }
          if(setOfficeID) {
            setOfficeID(officeID);
          }
          if (setTitle) {
            setTitle(title);
          }
        } else {
          console.error('Failed to fetch user info:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, [setOfficeID, setUserID, setTitle, navigate]);

  const handleItemClick = (index) => {
    setActiveItem(index);
    const path = menuItems[index].path;
    navigate(path);
  };

  useEffect(() => {
  }, [activeItem])

  // const handleLinkClick = (e, index) => {
  //   e.preventDefault(); 
  //   handleItemClick(index);
  // };

  const menuItems = [
    { icon: <HomeIcon />, text: 'Home', path: '/home' },
    { icon: <AccountCircleOutlinedIcon />, text: 'Employee', path: '/nhanvien' },
    { icon: <BusinessOutlinedIcon />, text: 'Office', path: '/office' },
    { icon: <WorkOutlinedIcon />, text: 'Position', path: '/position' },
    { icon: <ListAltIcon />, text: 'Orders', path: '/orders' },
  ];

  const menuItems2 = [
    { icon: <HomeIcon />, text: 'Home', path: '/home' },
    { icon: <AccountCircleOutlinedIcon />, text: 'Employee', path: '/nhanvien' },
    { icon: <ListAltIcon />, text: 'Orders', path: '/orders' },
  ];

  const menuItems3 = [
    { icon: <HomeIcon />, text: 'Home', path: '/home' },
    { icon: <ShippingIcon />, text: 'Transfer', path: `/create` },
    { icon: <InventoryOutlinedIcon />, text: 'Confirm', path: `/receive`},
  ];

  const menuItems4 = [
    { icon: <HomeIcon />, text: 'Home', path: '/home' },
    { icon: <ListAltIcon />, text: 'Orders', path: '/orders' },
    { icon: <AddBoxIcon />, text: 'Create', path: `/orders/add/${userInfo.userId}` },
    { icon: <ShippingIcon />, text: 'Transfer', path: `/create` },
    { icon: <InventoryOutlinedIcon />, text: 'Confirm', path: `/receive`},
    { icon: <ContactMailIcon />, text: 'Return', path: `/return`},
  ];

  // console.log(userInfo.title)
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      const response = await axiosInstance.get('/users/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        localStorage.removeItem("token");
        console.log(localStorage.getItem("token"))
        navigate("/");
      } else {
        console.error('Logout failed:', response.data.message);
        // Optionally handle other failure scenarios
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Token expired or unauthorized, redirect to login
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.error('Error during logout:', error);
      }
    }
  };
  return (
    <div>
      <div>
        <div className='sidebar'>
          <div className='logo'>
            <img src={logo} alt='' />
            <span>
              Magic<span>Magic</span>
            </span>
          </div>
          {userInfo.title === 'admin' && (
            <div className='menu'>
              {menuItems.map((item, index) => (
                <Link to={item.path} style={{ textDecoration: 'none' }} key={index}>
                  <div
                    key={index}
                    className={`menuItem ${index === activeItem ? 'active' : ''}`}
                    onClick={() => handleItemClick(index)}
                  >
                    <div>{item.icon}</div>
                    <span>{item.text}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {userInfo.title === 'Trưởng điểm' && (
            <div className='menu'>
              {menuItems2.map((item, index) => (
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
          )}

          {userInfo.title === 'Nhân viên tập kết' && (
            <div className='menu'>
              {menuItems3.map((item, index) => (
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
          )}
          {userInfo.title === 'Nhân viên giao dịch' && (
            <div className='menu'>
              {menuItems4.map((item, index) => (
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
          )}


          <div className="items">
            <div className="item">
              <Dropdown className='custom-dropdown'>
                <Dropdown.Toggle variant="success" id="avatar-dropdown" style={{ backgroundColor: "transparent", border: "none", marginTop: -30 }}>
                  <img className="avatar dropdown-toggle" src={nv} alt="Ảnh" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <EditIcon />
                    <span>Sửa hồ sơ</span>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>
                    <LogoutOutlinedIcon />
                    <span>Đăng xuất</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {userInfo.title === 'admin' && (
              <div className="position" style={{ fontWeight: "bold", fontSize: "20px", paddingBottom: "2rem" }}>
                Lãnh đạo
              </div>
            )}
            {userInfo.title === 'Trưởng điểm' && (
              <div className="position" style={{ fontWeight: "bold", fontSize: "20px", paddingBottom: "2rem" }}>
                Trưởng điểm
              </div>
            )}
            {userInfo.title === 'Nhân viên giao dịch' && (
              <div className="position" style={{ fontWeight: "bold", fontSize: "20px", paddingBottom: "2rem" }}>
                Nhân viên<br />giao dịch
              </div>
            )}
            {userInfo.title === 'Nhân viên tập kết' && (
              <div className="position" style={{ fontWeight: "bold", fontSize: "20px", paddingBottom: "2rem" }}>
                Nhân viên<br />tập kết
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;