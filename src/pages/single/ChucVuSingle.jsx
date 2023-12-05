import React, {useEffect, useState} from 'react';
import "./congviecsingle.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
// import Button from "@mui/material/Button";
import {Link, useLocation} from "react-router-dom";
// import axios from "axios";
import Nhanvien_ChucVu_Table from "../../components/datatable/Nhanvien_ChucVu_Table";


const ChucVuSingle = (props) =>
{
    const location = useLocation();

    const [newData, setNewData] = useState({
        cvID: "",
        cvName: "",
        cvHeso: "",
        cvStatus: ""
    });

    useEffect(() =>
    {
        console.log("Giá trị nhận đc là: ", location);
        setNewData((prevState) =>
        {
            return {
                ...prevState,
                cvID: location.state.cvID,
                cvName: location.state.cvName,
                cvHeso: location.state.cvHeso,
                cvStatus: location.state.cvStatus
            }
        });
    }, []);


    return (
        <div className="single">
            <Sidebar/>
            <div className="singleContainer">
                <Navbar/>
                <div className="top">

                    <div className="left" style={{
                        width: 'fit-content'
                    }}>
                        <h1 className="title">Thông tin chi tiết</h1>

                        {/*<Button variant="text" className="editBtn"*/}
                        {/*        style={{maxWidth: "50px", maxHeight: "50px", minWidth: "30px", minHeight: "30px"}}>*/}
                        {/*    <ModeEditOutlineIcon/>*/}
                        {/*</Button>*/}

                        <div className="item">
                            <img
                                src={require('../images/work.png')}
                                alt="Công việc" className="itemImg"/>

                            <div className="details">

                                <div className="itemTitle">
                                    <li>ID Chức Vụ</li>
                                    <li>Tên Chức Vụ</li>
                                    <li>Hệ Số Chức Vụ</li>
                                    <li>Trạng Thái Chức Vụ</li>
                                </div>

                                <div className="itemKey">
                                    <li>{newData.cvID}</li>
                                    <li>{newData.cvName}</li>
                                    <li>{newData.cvHeso}</li>
                                    <li style={{
                                        color: "green",
                                        fontWeight: "bold"
                                    }}>{newData.cvStatus == 1 && "Đang hiện hành"}</li>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="bottom">
                    <h1 className="title">Danh Sách Nhân Viên</h1>
                    <Nhanvien_ChucVu_Table id={location.state.cvID}/>
                </div>

            </div>
        </div>
    );
};

export default ChucVuSingle;