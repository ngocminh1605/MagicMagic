import React, { useState, useEffect } from 'react';
import './widget.scss';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import TimelapseOutlinedIcon from '@mui/icons-material/TimelapseOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { Link } from 'react-router-dom';

const Widget = ({ type }) => {
    const [giatri, setGaitri] = useState({
        tongNV: 0,
        tongPB: 0,
        tongDA: 0,
        tongLuong: 0,
    });

    useEffect(() => {
        // Dữ liệu mô phỏng cho mục đích minh họa
        const simulatedData = {
            tongNV: 10,
            tongPB: 5,
            tongDA: 8,
            tongLuong: 100000000, // Giá trị ví dụ, thay thế bằng logic thực tế
        };

        setGaitri(simulatedData);
    }, []);

    let data;

    switch (type) {
        case 'nhansu':
            data = {
                title: 'TỔNG QUẢN LÝ',
                counter: giatri.tongNV,
                link: 'Xem tất cả',
                path: 'nhanvien',
               
            };
            break;
        case 'phongban':
            data = {
                title: 'TỔNG NHÂN VIÊN',
                counter: giatri.tongPB,
                link: 'Xem tất cả',
                path: 'phongban',
            
            };
            break;
        case 'duan':
            data = {
                title: 'TỔNG PHÒNG BAN',
                counter: giatri.tongDA,
                link: 'Xem tất cả',
                path: 'duan',
                // icon: (
                //     <AccountTreeOutlinedIcon
                //         className="icon"
                //         style={{ color: 'forestgreen', backgroundColor: 'rgba(77, 199, 91, 0.9)' }}
                //     />
                // ),
            };
            break;   
        default:
            data = {
                title: 'TỔNG ĐƠN HÀNG',
                counter: giatri.tongLuong, // Lưu ý: Có thể cần điều chỉnh giatri.tongLuong thành giá trị chính xác
                link: 'Xem tất cả',
                // icon: (
                //     <TimelapseOutlinedIcon
                //         className="icon"
                //         style={{ color: 'orangered', backgroundColor: 'rgba(244, 173, 100, 0.87)' }}
                //     />
                // ),
            };
            break;
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">
                    {numberWithCommas(data.counter)}
                </span>
                <span className="link">
                    <Link to={`${data.path}`} style={{ textDecoration: 'none' }}>
                        {data.link}
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default Widget;
