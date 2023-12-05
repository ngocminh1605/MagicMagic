import React, {useEffect, useState} from 'react';
import "./nhanvienlist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import NhanVienTable from '../../components/table/NhanvienTable';
import Button from "@mui/material/Button";

const NhanVienList = () =>
{
    return (
        <div className="list">
            <Sidebar/>
            <div className="listContainer">
                <Navbar/>
            <NhanVienTable/>
            </div>
        </div>
    );
};

export default NhanVienList;