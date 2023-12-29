import React, { useState, useEffect } from 'react';
import './editProfile.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import { axiosInstance } from '../../constant/axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";

const EditProfile = () => {
    const [userID, setUserID] = useState('');
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        FullName: '',
        birthday: '',
        gender: '',
        address: '',
        Phone: '',
        email: ''
    });
    console.log(userID)
    useEffect(() => {
        const fetchDefaultInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/users/info/${userID}`);
                if (response.status === 200) {
                    setUserData(response.data[0]);
                } else {
                    console.error('Request failed with status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching default data:', error);
            }
        };
        fetchDefaultInfo();
    }, [userID]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(
            userData.FullName,
            userData.Phone,
        )
        try {
            const response = await axios.put(`http://localhost:3001/users/info1/${userID}`, {
                fullname: userData.FullName,
                birthday: userData.birthday,
                gender: userData.gender,
                phone: userData.Phone,
                email: userData.email,
                address: userData.address
            });

            if (response.status === 201) {
                alert("Đã sửa đổi thông tin thành công")
                navigate('/home');
            } else {
                console.error('Update failed with status:', response.status);
            }
        } catch (error) {
            alert("Sửa đổi thông tin thất bại vui lòng kiểm tra lại")
            console.error('Error updating data:', error);
        }
    };

    return (
        <div className="add">
            <Sidebar setUserID={setUserID} />
            <div className="container">
                <div className="title">Profile</div>
                <form className="offset-lg-1 col-lg-8" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="content1">
                            <div className="form-group2">
                                <InputLabel htmlFor="fullname">Full Name <span className="errmsg">*</span></InputLabel>
                                <input id="fullname" value={userData.FullName} onChange={(e) => setUserData({ ...userData, FullName: e.target.value })} className="form-control" />
                            </div>
                        </div>

                        <div className="content2" >
                            <div className="form-group" >
                                <InputLabel htmlFor="birth">Birth<span className="errmsg">*</span></InputLabel>
                                <DatePicker id="birth"
                                    selected={userData.birth ? new Date(userData.birth) : new Date()}
                                    onChange={(e) => setUserData({ ...userData, birthday: e.target.value })}
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <InputLabel htmlFor="gender">Gender <span className="errmsg">*</span></InputLabel>
                                <select id="gender" value={userData.gender} onChange={(e) => setUserData({ ...userData, gender: e.target.value })} className="form-control">
                                    <option value="">-- Select Office --</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                            </div>
                        </div>

                        <div className="content2">
                            <div className="form-group">
                                <InputLabel htmlFor="address">Address<span className="errmsg">*</span></InputLabel>
                                <input id="address" value={userData.address} onChange={(e) => setUserData({ ...userData, address: e.target.value })} className="form-control" />
                            </div>

                            <div className="form-group">
                                <InputLabel htmlFor="phone">Phone <span className="errmsg">*</span></InputLabel>
                                <input id="phone" value={userData.Phone ? userData.Phone : "0903336476"} onChange={(e) => setUserData({ ...userData, Phone: e.target.value })} type="text" className="form-control" />
                            </div>
                        </div>

                        <div className="content1">
                            <div className="form-group2">
                                <InputLabel htmlFor="email">Email <span className="errmsg">*</span></InputLabel>
                                <input id="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} className="form-control" />
                            </div>
                        </div>

                    </div>

                    <div className="card-footer">
                        <button type="submit" className="btn1" onClick={handleSubmit}>Save</button>
                        <button className="btn2"><Link to={'/home'} style={{ textDecoration: 'none', color: 'grey' }}>Cancel</Link></button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default EditProfile;
