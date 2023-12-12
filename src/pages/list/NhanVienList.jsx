import React, { useEffect, useState } from 'react';
import "./nhanvienlist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
//import Navbar from "../../components/navbar/Navbar";
import NhanVienTable from '../../components/table/NhanvienTable';
import Button from "@mui/material/Button";

const NhanVienList = () => {
    const [officeID, setOfficeID] = useState(null);
    const [userID, setUserID] = useState(null);
    const [title,setTitle] = useState(null);
    return (
        <div className="list">
            <Sidebar setOfficeID={setOfficeID} setUserID={setUserID} setTitle= {setTitle}/>
                <div className="container">
                    <div className='title'>Employee</div>
                    <NhanVienTable officeID = {officeID} userID = {userID} title = {title}/>
                </div>
            </div>
    );
};

export default NhanVienList;