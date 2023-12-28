import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import InputLabel from '@mui/material/InputLabel';
import { axiosInstance } from '../../constant/axios';
import './nhanviendetail.scss';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import axios from "axios";

const NhanVienDetail = () => {
    const navigate = useNavigate();
    const { userID } = useParams();
    const [userData, setUserData] = useState({
        ID_user: '',
        FullName: '',
        birthday: '',
        gender: '',
        address: '',
        Phone: '',
        email: '',
        datestart:'',
        title:'',
        Name:'',
    });
    console.log(userID);
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/users/info/${userID}`);
                if (response.status === 200) {
                    setUserData(response.data[0]);
                    console.log(userData);
                } else {
                    console.error('Request failed with status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserInfo();
    }, [userID]);
    const list = {
        ID: userData.ID_user,
        FullName: userData.FullName,
        Gender: userData.gender,
        Birth: userData.birthday,
        Phone: userData.Phone,
        Email: userData.email,
        Address: userData.address,
        StartDate: userData.datestart,
        Office: userData.Name,
        Position: userData.title
    };
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    
    const listItems = Object.entries(list).map(([key, value]) => (
        <li key={key}>
            <strong>{key}:</strong> {key === 'StartDate' ? formatDate(value) : value}
        </li>
    ));
    
    return (
        <div className="add">
            <Sidebar/>

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
