import React, { useState, useEffect } from 'react';
import './nhanviennew.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import { axiosInstance } from '../../constant/axios';
import Select from "react-select"

const NhanVienNew = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [office, setOffice] = useState('');
    const [position, setPosition] = useState('');
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchOfficeOptions = async () => {
            try {
                const officeData = await optionOffice();
                const mappedOptions = officeData.map(office => ({
                    value: office.ID_office,
                    label: office.Name
                }));
                setOptions(mappedOptions);
            } catch (error) {
                console.error('Error fetching office options:', error);
            }
        };

        fetchOfficeOptions();
    }, []);

    const customStyles = {
        menu: provided => ({
            ...provided,
            // maxHeight: '200px', // Set the maximum height for the dropdown
            overflowY: 'auto',  // Enable vertical scrolling if needed
        }),
    };
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
        } else {
            if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
                isProceed = false;
                // setAlert({ status: 'error', title: 'Error', description: 'Please enter a valid email' });
                alert('Vui lòng điền đúng định dạng email !');
            }
        }

        return isProceed;
    };

    const optionOffice = async () => {
        try {
          const response = await fetch('http://localhost:3001/office/allOffice', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
          });
    
          if (response.ok) {
            const data = await response.json();
            return data.data;
          } else {
            console.error('Lỗi lấy office:', response.statusText);
          }
        } catch (error) {
          console.error('Lỗi lấy office:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!IsValidate()) {
            // alert('Bạn chưa điền thông tin!');
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
                                <Select
                                    options={options}
                                    styles={customStyles}
                                    onChange={(selectedOption) => setOffice(selectedOption.value)}
                                    
                                />
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
