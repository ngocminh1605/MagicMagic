import React, {useEffect, useState} from 'react';
import "./congviecsingle.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
// import Button from "@mui/material/Button";
import {Link, useLocation} from "react-router-dom";
// import axios from "axios";
import NhanVienDuAnTable from "../../components/datatable/NhanVienDuAnTable";


const CongViecSingle = (props) =>
{
    const location = useLocation();

    const [newData, setNewData] = useState({
        daID: "",
        daName: "",
        daThuong: "",
        daStart: "",
        daEnd: "",
        daStatus: ""
    });

    useEffect(() =>
    {
        console.log("Giá trị nhận đc là: ", location);
        setNewData((prevState) =>
        {
            return {
                ...prevState,
                daID: location.state.daID,
                daName: location.state.daName,
                daThuong: location.state.daThuong,
                daStart: location.state.daStart,
                daEnd: location.state.daEnd,
                daStatus: location.state.daStatus

            }
        });
        console.log("Dữ liệu đc truyền", newData);
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
                                alt="Dự Án" className="itemImg"/>

                            <div className="details">

                                <div className="itemTitle">
                                    <li>ID Dự</li>
                                    <li>Tên Dự Án</li>
                                    <li>Thưởng Dự Án</li>
                                    <li>Thời Gian Bắt Đầu</li>
                                    <li>Thời Gian Kết Thúc</li>
                                </div>

                                <div className="itemKey">
                                    <li>{newData.daID}</li>
                                    <li>{newData.daName}</li>
                                    <li>{newData.daThuong}</li>
                                    <li style={{
                                        color: "green",
                                        fontWeight: "bold"
                                    }}>{newData.daStart}</li>
                                    <li style={{
                                        color: "green",
                                        fontWeight: "bold"
                                    }}>{newData.daEnd}</li>
                                    {/*<li style={{*/}
                                    {/*    color: "green",*/}
                                    {/*    fontWeight: "bold"*/}
                                    {/*}}>{newData.cvStatus == 1 && "Đang hiện hành"}</li>*/}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="bottom">
                    <h1 className="title" style={{fontSize: '18px'}}>Danh Sách Nhân Viên</h1>
                    <NhanVienDuAnTable id={location.state.daID}/>
                </div>

            </div>
        </div>
    );
};

export default CongViecSingle;