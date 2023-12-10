import React, { useState, useEffect } from 'react';
import "./nhanviennew.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputLabel from '@mui/material/InputLabel';

const NhanVienNew = () => {
    const [id, idchange] = useState("");
    const [password, passwordchange] = useState("");
    const [email, emailchange] = useState("");
    const [office, officechange] = useState("");
    const [position, positionchange] = useState("");

    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (id === null || id === '') {
            isproceed = false;
            errormessage += ' Username';
        }

        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }

        if (!isproceed) {
            toast.warning(errormessage)
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {

            } else {
                isproceed = false;
                toast.warning('Please enter the valid email')
            }
        }
        return isproceed;
    }

    return (
        <div className='add'>
            <Sidebar />
            <div className="container">
                <div className="title">
                    Employee
                </div>
                <form className="offset-lg-1 col-lg-8" >
                    <div className="row">
                        <div className="content2">
                            <div className="form-group">
                                <InputLabel htmlFor="username">User Name <span className="errmsg">*</span></InputLabel>
                                <input id="username" value={id} onChange={e => idchange(e.target.value)} className="form-control" />
                            </div>

                            <div className="form-group">
                                <InputLabel htmlFor="password">Password <span className="errmsg">*</span></InputLabel>
                                <input id="password" value={password} onChange={e => passwordchange(e.target.value)} type="password" className="form-control" />
                            </div>
                        </div>

                        <div className="content1">
                            <div className="form-group2">
                                <InputLabel htmlFor="email">Email <span className="errmsg">*</span></InputLabel>
                                <input id="email" value={email} onChange={e => emailchange(e.target.value)} className="form-control" />
                            </div>
                        </div>

                        <div className="content2">
                            <div className="form-group">
                                <InputLabel htmlFor="office">OfficeID <span className="errmsg">*</span></InputLabel>
                                <select id="office" value={office} onChange={e => officechange(e.target.value)} className="form-control">
                                    <option value="office1">Office 1</option>
                                    <option value="office2">Office 2</option>
                                    <option value="office3">Office 3</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <InputLabel htmlFor="position">Position <span className="errmsg">*</span></InputLabel>
                                <select id="position" value={position} onChange={e => positionchange(e.target.value)} className="form-control">
                                    <option value="giaodichvien">Giao dịch viên</option>
                                    <option value="nhanvien">Nhân Viên</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="card-footer">
                        <button type="submit" className="btn1">Add</button>
                        <button className="btn2"><Link to={'/login'} style={{ textDecoration: 'none', color: 'grey' }}>Back</Link></button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NhanVienNew;
