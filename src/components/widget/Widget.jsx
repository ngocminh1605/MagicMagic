import React, {useState, useEffect} from 'react';
import "./widget.scss"
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import TimelapseOutlinedIcon from "@mui/icons-material/TimelapseOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import {Link} from "react-router-dom";
import axios from "axios";

const Widget = () =>
{
    const [giatri, setGaitri] = useState({
        tongNV: 0,
        tongPB: 0,
        tongDA: 0,
        tongLuong: 0
    });
    console.log("Gia trị là ", giatri);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () =>
    {
        const resultNV = await axios('http://localhost:8080/api/nhanvien');
        const resultPB = await axios('http://localhost:8080/api/phongban');
        const resultDA = await axios('http://localhost:8080/api/duan');
        const resultLuong = await axios('http://localhost:8080/api/luong');
        let tongNV = resultNV.data.length;
        let tongPB = resultPB.data.length;
        let tongDA = resultDA.data.length;
        let temp = resultLuong.data.map((item) => item.luongThucLanh)
        let tongLuong = temp.reduce(tinhLuong, 0);
        console.log("Gía trị mới là", tongNV, tongPB, tongDA, tongLuong);
        setGaitri({
            tongNV: tongNV,
            tongPB: tongPB,
            tongDA: tongDA,
            tongLuong: tongLuong
        })
    }, [])

    function tinhLuong(accumulator, a)
    {
        return accumulator + a;
    }

    let data;
    
    switch (type)
    {
        case "nhansu":
            data = {
                title: "TỔNG NHÂN VIÊN",
                counter: giatri.tongNV,
                link: "Xem tất cả",
                path: "nhanvien",
                icon: (<PersonOutlinedIcon className="icon"
                                           style={{color: "crimson", backgroundColor: "rgba(230, 124, 124, 0.75)"}}/>)
            };
            break;
        case "phongban":
            data = {
                title: "TỔNG PHÒNG BAN",
                counter: giatri.tongPB,
                link: "Xem tất cả",
                path: "phongban",
                icon: (<BusinessOutlinedIcon className="icon" style={{
                    color: "darkblue",
                    backgroundColor: "rgba(115, 169, 232, 0.84)"
                }}/>)
            };
            break;
        case "duan":
            data = {
                title: "TỔNG DỰ ÁN",
                counter: giatri.tongDA,
                link: "Xem tất cả",
                path: "duan",
                icon: (<AccountTreeOutlinedIcon className="icon" style={{
                    color: "forestgreen",
                    backgroundColor: "rgba(77, 199, 91, 0.9)"
                }}/>)
            };
            break;
        case "chamcong":
            data = {
                title: "TỔNG NGÀY LÀM",
                counter: giatri.tongLuong,
                link: "Xem tất cả",
                icon: (<TimelapseOutlinedIcon className="icon" style={{
                    color: "orangered",
                    backgroundColor: "rgba(244, 173, 100, 0.87)"
                }}/>)
            };
            break;
        case "luong":
            data = {
                title: "TỔNG LƯƠNG",
                counter: giatri.tongLuong,
                link: "Xem tất cả",
                path: "luong",
                icon: (<PaidOutlinedIcon className="icon"
                                         style={{color: "rebeccapurple", backgroundColor: "rgba(164, 95, 227, 0.9)"}}/>)
            };
            break;
        default:
            break;
    }

    function numberWithCommas(x)
    {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <div className="widget">

            <div className="left">
                <span className="title">
                    {data.title}
                </span>
                <span className="counter" style={{color: '#6076BE', fontWeight: '500px'}}>
                    {numberWithCommas(data.counter)}
                </span>
                <span className="link">
                    <Link to={`${data.path}`} style={{textDecoration: "none"}}>{data.link}</Link>
                </span>
            </div>

            <div className="right">
                {/*<div className="percentage positive">*/}
                {/*    <KeyboardArrowUpOutlinedIcon/>*/}
                {/*    Up*/}
                {/*</div>*/}
                {data.icon}
                {/*<PersonOutlinedIcon />*/}
            </div>

        </div>
    );
};

export default Widget;