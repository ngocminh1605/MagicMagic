import React, { useState } from 'react';
import "./nhanvienlist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import NhanVienTable from '../../components/table/NhanvienTable';

const NhanVienList = () => {
    const [officeID, setOfficeID] = useState(null);
    const [userID, setUserID] = useState(null);
    const [title,setTitle] = useState(null);
    return (
        <div className="list">
            <Sidebar setOfficeID={setOfficeID} setUserID={setUserID} setTitle= {setTitle}/>
                <div className="container">
                    <div className='title'>Nhân viên</div>
                    <NhanVienTable officeID = {officeID} userID = {userID} title = {title}/>
                </div>
            </div>
    );
};

export default NhanVienList;