import React, { useState } from 'react';
import './editProfile.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import { axiosInstance } from '../../constant/axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const EditProfile = () => {
    const [fullname, setFullName] = useState('Nguyễn Phương Linh');
    const [gender, setGender] = useState('Nữ');
    const [birth, setBirth] = useState(new Date());
    const [iden, setIden] = useState('001303011618');

    const [phone, setPhone] = useState('0963282003');
    const [email, setEmail] = useState('ely@gmail.com');

    const navigate = useNavigate();

    const IsValidate = () => {
        let isProceed = true;
        let errorMessage = 'Please enter the value in ';
        if (!phone) {
            isProceed = false;
            errorMessage += 'Phone';
        }

        if (!fullname) {
            isProceed = false;
            errorMessage += 'Full Name';
        }

        if (!email) {
            isProceed = false;
            errorMessage += 'Email';
        }

        if (!isProceed) {
            // setAlert({ status: 'error', title: 'Error', description: 'Please enter the value in' });
        } else {
            if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
                isProceed = false;
                // setAlert({ status: 'error', title: 'Error', description: 'Please enter a valid email' });
            }
        }

        return isProceed;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!IsValidate()) {
            return;
        }
        try {
            const response = await axiosInstance.post('users/register', {
                fullname: fullname,
                gender: gender,
                birth: birth,
                email: email,
                phone: phone,
                iden: iden,
            });
            if (response.status === 201) {
                navigate('/nhanvien');
            } else {
                // Registration failed
                console.log("fails");
            }
        } catch (error) {

            console.error('Error during registration:', error);

        }
    };

    return (
        <div className="add">
            <Sidebar />
            <div className="container">
                <div className="title">Profile</div>

                <form className="offset-lg-1 col-lg-8" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="content1">
                            <div className="form-group2">
                                <InputLabel htmlFor="fullname">Full Name <span className="errmsg">*</span></InputLabel>
                                <input id="fullname" value={fullname} onChange={(e) => setFullName(e.target.value)} className="form-control" />
                            </div>
                        </div>

                        <div className="content2" >

                            <div className="form-group">
                                <InputLabel htmlFor="gender">Gender <span className="errmsg">*</span></InputLabel>
                                <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="form-control">
                                    <option value="">-- Select Office --</option>
                                    <option value="1">Nam</option>
                                    <option value="2">Nữ</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <InputLabel htmlFor="birth">Birth <span className="errmsg">*</span></InputLabel>
                                <DatePicker id="birth" selected={birth} onChange={date => setBirth(date)}   className="form-control" />

                            </div>
                        </div>

                        <div className="content2">
                            <div className="form-group">
                                <InputLabel htmlFor="iden">Identity Card<span className="errmsg">*</span></InputLabel>
                                <input id="iden" value={iden} onChange={(e) => setIden(e.target.value)} className="form-control" />
                            </div>

                            <div className="form-group">
                                <InputLabel htmlFor="phone">Phone <span className="errmsg">*</span></InputLabel>
                                <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className="form-control" />
                            </div>
                        </div>

                        <div className="content1">
                            <div className="form-group2">
                                <InputLabel htmlFor="email">Email <span className="errmsg">*</span></InputLabel>
                                <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                            </div>
                        </div>

                    </div>

                    <div className="card-footer">
                        <button type="submit" className="btn1" onClick={handleSubmit}>Save</button>
                        <button className="btn2"><Link to={'/nhanvien'} style={{ textDecoration: 'none', color: 'grey' }}>Cancel</Link></button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default EditProfile;
