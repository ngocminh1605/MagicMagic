import React, { useState, useEffect } from 'react';
import '../../pages/new/nhanviennew.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import { axiosInstance } from '../../constant/axios';
import { useParams } from 'react-router-dom';
import axios from "axios";

const NhanVienEdit = () => {
    const { userID } = useParams();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        UserName: '',
        email: '',
        title: '',
        OfficeId: '',
    });

    useEffect(() => {
        const fetchDefaultUserInfo = async () => {
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
        fetchDefaultUserInfo();
    }, [userID]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(userData.UserName,
            userData.email,
            userData.OfficeId,
            userData.title)
        try {
            const response = await axios.put(`http://localhost:3001/users/info/${userID}`, {
                username: userData.UserName,
                email: userData.email,
                officeid: userData.OfficeId,
                title: userData.title,
            });

            if (response.status === 201) {
                alert("Đã sửa đổi thông tin thành công")
                navigate('/nhanvien');
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
            <Sidebar />
            <div className="container">
                <div className="title">Employee</div>
                <form className="offset-lg-1 col-lg-8" onSubmit={handleUpdate}>
                    <div className="row">
                        <div className="content2">
                            <div className="form-group">
                                <InputLabel htmlFor="username">User Name<span className="errmsg">*</span></InputLabel>
                                <input
                                    id="username"
                                    value={userData.UserName}
                                    onChange={(e) => setUserData({ ...userData, UserName: e.target.value })}
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="content1">
                            <div className="form-group2">
                                <InputLabel htmlFor="email">Email <span className="errmsg">*</span></InputLabel>
                                <input id="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} className="form-control" />
                            </div>
                        </div>

                        <div className="content2">
                            <div className="form-group">
                                <InputLabel htmlFor="office">Office <span className="errmsg">*</span></InputLabel>
                                <input
                                    id="office"
                                    value={userData.OfficeId}
                                    onChange={(e) => setUserData({ ...userData, OfficeId: e.target.value })}
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <InputLabel htmlFor="position">Position <span className="errmsg">*</span></InputLabel>
                                <select
                                    id="position"
                                    value={userData.title}
                                    onChange={(e) => setUserData({ ...userData, title: e.target.value })}
                                    className="form-control"
                                >
                                    <option value="">-- Select Title--</option>
                                    <option value="Trưởng điểm">Trưởng điểm</option>
                                    <option value="Nhân viên giao dịch">Nhân viên giao dịch</option>
                                    <option value="Nhân viên tập kết">Nhân viên tập kết</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="card-footer">
                        <button type="submit" className="btn1">Save</button>
                        <button className="btn2" onclick={() => navigate("/nhanvien")}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default NhanVienEdit;
