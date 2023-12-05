import React, {useEffect, useState} from 'react';
import "./congviecsingle.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
// import Button from "@mui/material/Button";
import {Link, useLocation} from "react-router-dom";
// import axios from "axios";
import Nhanvien_PhongBan_Table from "../../components/datatable/Nhanvien_PhongBan_Table";


const PhongBanSingle = (props) =>
{
    const location = useLocation();

    const [newData, setNewData] = useState({
        pbID: "",
        pbName: "",
        pbSDT: "",
        pbStatus: ""
    });

    useEffect(() =>
    {
        console.log("Giá trị nhận đc là: ", location);
        setNewData((prevState) =>
        {
            return {
                ...prevState,
                pbID: location.state.pbID,
                pbName: location.state.pbName,
                pbSDT: location.state.pbSDT,
                pbStatus: location.state.pbStatus
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
                                alt="phòng ban" className="itemImg"/>

                            <div className="details">

                                <div className="itemTitle">
                                    <li>ID Phòng Ban</li>
                                    <li>Tên Phòng Ban</li>
                                    <li>SDT Phòng Ban</li>
                                    <li>Trạng Thái Phòng Ban</li>
                                </div>

                                <div className="itemKey">
                                    <li>{newData.pbID}</li>
                                    <li>{newData.pbName}</li>
                                    <li>{newData.pbSDT}</li>
                                    <li style={{
                                        color: "green",
                                        fontWeight: "bold"
                                    }}>{newData.pbStatus == 1 && "Đang hiện hành"}</li>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="bottom">
                    <h1 className="title">Danh Sách Phòng Ban</h1>
                    <Nhanvien_PhongBan_Table id={location.state.pbID}/>
                </div>

            </div>
        </div>
    );
};

export default PhongBanSingle;