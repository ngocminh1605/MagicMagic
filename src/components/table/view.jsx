import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import InputLabel from '@mui/material/InputLabel';
import { axiosInstance } from '../../constant/axios';
import './view.scss';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';


const NhanVienDetail = () => {
    const navigate = useNavigate();
    const list = {
        ID: 1,
        FullName: 'Nguyễn Thị Ngọc Minh',
        Gender: 'nữ',
        Birth: '02/08/2003',
        Phone: '0963282003',
        Email: 'hyung301295@gmail.com',
        IdentityCard: '001303011618',
        StartDate: '20/12/2003',
        OfficeID: 1,
        Position: 'boss'
    };

    const listItems = Object.entries(list).map(([key, value]) => (
        <li key={key}>
            <strong>{key}:</strong> {value}
        </li>
    ));

    return (
        <div className="add">
            <Sidebar />

            <div className="container">

                <div className="title">Employee</div>
                <div className='content'>
                    <div className='Card'>
                      
                
                            <CloseIcon onClick={() => navigate('/nhanvien')}
                            style={{
                                textTransform: 'none',
                                display: 'flex',
                                color: 'black',
                                width: 40,
                                alignSelf:'flex-end',
                                borderRadius: '10px',
                                height: 40,
                            }}/>
                    
                        <div className='image-container'>
                            <img src='/nv1.jpg' height="160px" width="120px" />
                        </div>
                        <div className='card-content'>
                            <ul
                                style={{
                                    listStyleType: 'none',
                                    padding: 0,
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, auto)',
                                    gap: '1.5rem',
                                    marginLeft: '1rem',
                                    textAlign: 'start',
                                }}
                            >
                                {listItems}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NhanVienDetail;
