import React, { useState } from 'react';
import './nhanviennew.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import { axiosInstance } from '../../constant/axios';


const NhanVienNew = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [office, setOffice] = useState('');
    const [position, setPosition] = useState('');
    const navigate = useNavigate();

    const IsValidate = () => {
        let isProceed = true;
        let errorMessage = 'Please enter the value in ';
        if (!username) {
            isProceed = false;
            errorMessage += 'Username';
        }

        if (!password) {
            isProceed = false;
            errorMessage += 'Password';
        }

        if (!email) {
            isProceed = false;
            errorMessage += 'Email';
        }

        if (!isProceed) {
            // setAlert({ status: 'error', title: 'Error', description: 'Please enter the value in' });
            alert('Vui lòng điền đầy đủ thông tin !');
        } else {
            if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
                isProceed = false;
                // setAlert({ status: 'error', title: 'Error', description: 'Please enter a valid email' });
                alert('Vui lòng điền đúng định dạng email !');
            }
        }

        return isProceed;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!IsValidate()) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }
        try {
            const response = await axiosInstance.post('users/register', {
                username: username,
                password: password,
                email: email,
                officeID: office,
                Title: position,
            });
            if (response.status === 201) {
                alert('Thêm nhân viên thành công :3');
                navigate('/nhanvien');
            } else {
                // Registration failed
                console.log("fails");
            }
        } catch (error) {
            alert('Thêm nhân viên thất bại hãy kiểm tra các trường thông tin!');
            console.error('Error during registration:', error);

        }
    };

    return (
        <div className="add">
            <Sidebar />
            <div className="container">
                <div className="title">Employee</div>
                
                <form className="offset-lg-1 col-lg-8" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="content2">
                            <div className="form-group">
                                <InputLabel htmlFor="username">User Name <span className="errmsg">*</span></InputLabel>
                                <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" />
                            </div>

                            <div className="form-group">
                                <InputLabel htmlFor="password">Password <span className="errmsg">*</span></InputLabel>
                                <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
                            </div>
                        </div>

                        <div className="content1">
                            <div className="form-group2">
                                <InputLabel htmlFor="email">Email <span className="errmsg">*</span></InputLabel>
                                <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                            </div>
                        </div>

                        <div className="content2">

                            <div className="form-group">
                                <InputLabel htmlFor="office">Office <span className="errmsg">*</span></InputLabel>
                                <select id="office" value={office} onChange={(e) => setOffice(e.target.value)} className="form-control">
                                    <option value="">-- Select Office --</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <InputLabel htmlFor="position">Position <span className="errmsg">*</span></InputLabel>
                                <select id="position" value={position} onChange={(e) => setPosition(e.target.value)} className="form-control">
                                    <option value="">-- Select Title--</option>
                                    <option value="Trưởng điểm">Trưởng điểm</option>
                                    <option value="Nhân viên giao dịch">Nhân viên giao dịch</option>
                                    <option value="Nhân viên tập kết">Nhân viên tập kết</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="card-footer">
                        <button type="submit" className="btn1" onClick={handleSubmit}>Add</button>
                        <button className="btn2"><Link to={'/nhanvien'} style={{ textDecoration: 'none', color: 'grey' }}>Back</Link></button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default NhanVienNew;
