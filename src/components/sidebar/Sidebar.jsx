import React from 'react';
import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import TimelapseOutlinedIcon from '@mui/icons-material/TimelapseOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import RadarOutlinedIcon from '@mui/icons-material/RadarOutlined';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import {Link} from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="top">
                <span className="logo">MagicMagic</span>
            </div>
            <hr/>
            <div className="center">
                <ul>
                    <p className="title">
                        MAIN
                    </p>
                    <Link to="/" style={{textDecoration: "none"}}>
                        <ListItemButton className="listItem">
                            <ListItemIcon>
                                <DashboardIcon className="icon"/>
                            </ListItemIcon>
                            <ListItemText primary="Trang Chủ" className="itemText"/>
                        </ListItemButton>
                    </Link>
                    <p className="title">
                        MENU
                    </p>
                    <Link to="/nhanvien" style={{textDecoration: "none"}}>
                        <ListItemButton className="listItem">
                            <ListItemIcon>
                                <AccountCircleOutlinedIcon className="icon"/>
                            </ListItemIcon>
                            <ListItemText primary="Nhân Viên" className="itemText"/>
                        </ListItemButton>
                    </Link>
                    <Link to="/phongban" style={{textDecoration: "none"}}>
                        <ListItemButton className="listItem">
                            <ListItemIcon>
                                <BusinessOutlinedIcon className="icon"/>
                            </ListItemIcon>
                            <ListItemText primary="Phòng Ban" className="itemText"/>
                        </ListItemButton>
                    </Link>
                    <Link to="/donhang" style={{textDecoration: "none"}}>
                        <ListItemButton className="listItem">
                            <ListItemIcon>
                                <AccountTreeOutlinedIcon className="icon"/>
                            </ListItemIcon>
                            <ListItemText primary="Đơn Hàng" className="itemText"/>
                        </ListItemButton>
                    </Link>
                </ul>
            </div>
            <hr className="rr"/>
        </div>
    );
};

export default Sidebar;