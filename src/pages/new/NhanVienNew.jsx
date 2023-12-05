import React, {useState, useEffect} from 'react';
import "./nhanviennew.scss"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import axios from "axios";
import {useLocation} from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import {InputAdornment} from "@material-ui/core";
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import nv4 from '../images/nv4.jpg';

const NhanVienNew = () =>
{
    console.log();
    const location = useLocation();
    console.log("Dữ liệu lấy dơợc ", location.state.chiTiet, location.state.chucNang);

    let tenForm;
    location.state.chucNang === 0 ? tenForm = "Cập Nhật Nhân Viên" : tenForm = "Thêm Nhân Viên";
    const [dlBD, setDlBd] = useState(location.state.chiTiet);
    const [gioiTinh, setGioiTinh] = useState(location.state.chiTiet.gioiTinh)
    const [hinhAnh, setHinhAnh] = useState(location.state.chiTiet.hinhAnh);
    const [dspb, setDspb] = useState([]);
    const [dscviec, setDscongviec] = useState([]);
    const [dscvu, setDschucvu] = useState([]);

    useEffect(async () =>
    {
        const resultPB = await axios('http://localhost:8080/api/phongban');
        const resultCViec = await axios('http://localhost:8080/api/congviec');
        const resultCVu = await axios('http://localhost:8080/api/chucvu');
        const kqPB = resultPB.data.map(items =>
        {
            return {...items}
        });
        const kqCViec = resultCViec.data.map(items =>
        {
            return {...items}
        });
        const kqCVu = resultCVu.data.map(items =>
        {
            return {...items}
        });
        console.log("Lấy đc từ API ", kqPB, kqCViec, kqCVu);
        setDspb(kqPB);
        setDscongviec(kqCViec);
        setDschucvu(kqCVu);
    }, []);

    console.log("dl ban 0ầu", dlBD, `gioiTinh la ${gioiTinh}`, hinhAnh);
    console.log("Dl của 3 tb sau khi đã Set là ", dspb, dscviec, dscvu);
    // const handleClose = () => {
    //     const temp = {...props.giatri, flag: false};
    //     props.resetFlag(temp);
    // };

    const thaydoiAnh = (e) =>
    {
        if (e.target.files.length !== 0)
        {
            setHinhAnh(URL.createObjectURL(e.target.files[0]));
        }
    }
    const upLoadAnh = () =>
    {
        document.getElementById('layHinhAnh').click();
    }

    const handleInputChange = (e) =>
    {
        const {name, value} = e.target;
        setDlBd(
            {
                ...dlBD, [name]: value,
            });

    };

    const thucthi = (event) =>
    {
        event.preventDefault();
        if (location.state.chucNang === 0)
        {
            const dlmoi = {
                nhanVien: {
                    nhanVienId: dlBD.nhanVienId,
                    hoNhanVien: dlBD.hoNhanVien,
                    tenNhanVien: dlBD.tenNhanVien,
                    ngayVaoLam: dlBD.ngayVaoLam,
                    luongCanBan: dlBD.luongCanBan
                },
                chiTietNhanVien: {
                    hinhAnh: hinhAnh,
                    sdt: dlBD.sdt,
                    mail: dlBD.mail,
                    gioiTinh: gioiTinh, ///luưu ý
                    ngaySinh: dlBD.ngaySinh,
                    noiSinh: dlBD.noiSinh,
                    diaChi: dlBD.diaChi,
                    canCuoc: dlBD.canCuoc,
                    ngayCap: dlBD.ngaySinh
                },
                phongBanId: dlBD.phongBanId,
                chucVuId: dlBD.chucVuId,
                congViecId: dlBD.congViecId
            }
            console.log("Dl sau câp nhật", dlmoi);
            updateNV(dlmoi);
        } else
        {
            alert("Them nè");
            const dlmoi = {
                nhanVien: {
                    hoNhanVien: dlBD.hoNhanVien,
                    tenNhanVien: dlBD.tenNhanVien,
                    ngayVaoLam: dlBD.ngayVaoLam,
                    luongCanBan: dlBD.luongCanBan
                },
                chiTietNhanVien: {
                    hinhAnh: hinhAnh,
                    sdt: dlBD.sdt,
                    mail: dlBD.mail,
                    gioiTinh: gioiTinh, ///luưu ý
                    ngaySinh: dlBD.ngaySinh,
                    noiSinh: dlBD.noiSinh,
                    diaChi: dlBD.diaChi,
                    canCuoc: dlBD.canCuoc,
                    ngayCap: dlBD.ngaySinh
                },
                phongBanId: dlBD.phongBanId,
                chucVuId: dlBD.chucVuId,
                congViecId: dlBD.congViecId
            }
            console.log("Dl muốn thêm", dlmoi);
            addNV(dlmoi);
            // handleClose();
        }
    }

    const updateNV = (nv) =>
    {
        // event.preventDefault();
        // const newCv = {...cv, status: 0};
        axios.put(`http://localhost:8080/api/nhanvien/${nv.nhanVien.nhanVienId}`, nv)
            .then(res => alert("Đã cập nhật nhân viên này!!"))
            .catch(err => alert(`Cập nhật  thất bai!! ${err}`))
    }

    const addNV = (nv) =>
    {
        axios.post("http://localhost:8080/api/nhanvien", nv).then(res => alert("Đã thêm  nhân viên này!!"))
            .catch(err => alert(`Cập nhật  thất bai!! ${err}`))
    }


    return (
        <div className="singleNV">
            <Sidebar/>
            <div className="singleContainerNV">
                <Navbar/>
                <div className="topNV">
                    <div className="leftNV">
                        <h1 className="titleNV">{tenForm}</h1>

                        <div>
                            <Button variant="text" className="editBtnNV"
                                    style={{maxWidth: "50px", maxHeight: "50px", minWidth: "30px", minHeight: "30px"}}
                                    onClick={thucthi}
                            >
                                {location.state.chucNang === 1 ? <AddIcon/> : <AutoFixHighIcon/>}
                            </Button>
                        </div>

                        <div className="itemNV">

                            <div style={{
                                display: 'flex',
                                flexFlow: 'column',
                                alignItems: 'center',
                                gap: '20px'
                            }}>
                                <img
                                    src={hinhAnh}
                                    alt="Nhân ziên này chưa có avartar" className="itemImgNV"/>

                                <Button onClick={upLoadAnh}
                                        style={{
                                            maxWidth: "50px",
                                            maxHeight: "50px",
                                            minWidth: "30px",
                                            minHeight: "30px"
                                        }}
                                        className="chonHinhAnh">
                                    <FileUploadIcon/>
                                </Button>
                                <input id="layHinhAnh"
                                       style={{display: 'none'}}
                                       onChange={thaydoiAnh}
                                       type="file" name="image-upload" accept="image/*"/>
                            </div>

                            <div className="detailsNV">
                                <div className="itemTitleNV1">

                                    <div hidden={location.state.chucNang === 1}>
                                        <TextField
                                            sx={{input: {color: '#335371'}}}
                                            id="outlined-read-only-input"
                                            label="Nhân Viên ID"
                                            InputProps={{
                                                readOnly: true,
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <ArrowRightIcon
                                                            style={{color: '#3D5E7C', marginLeft: '-10'}}/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            value={dlBD.nhanVienId}
                                            name="nhanVienId"
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <TextField sx={{input: {color: '#335371'}}}
                                               label="Họ Nhân Viên" variant="outlined"
                                               InputProps={{
                                                   startAdornment: (
                                                       <InputAdornment position="start">
                                                           <ArrowRightIcon
                                                               style={{color: '#3D5E7C', marginLeft: '-10'}}/>
                                                       </InputAdornment>
                                                   ),

                                               }}
                                               value={dlBD.hoNhanVien}
                                               name='hoNhanVien'
                                               onChange={handleInputChange}
                                    />

                                    <TextField sx={{input: {color: '#335371'}}}
                                               label="Tên Nhân Viên" variant="outlined" className="textFieldNV"
                                               InputProps={{
                                                   startAdornment: (
                                                       <InputAdornment position="start">
                                                           <ArrowRightIcon
                                                               style={{color: '#3D5E7C', marginLeft: '-10'}}/>
                                                       </InputAdornment>
                                                   ),
                                               }}
                                               value={dlBD.tenNhanVien}
                                               name='tenNhanVien'
                                               onChange={handleInputChange}
                                    />

                                    <p className="gioitinha"> Giới Tính</p>
                                    <div className="gioitinh">
                                        <label style={{
                                            textAlign: 'center',
                                            marginTop: '15px'
                                        }}>Nam</label>
                                        <input className="radione"
                                               style={{
                                                   textAlign: 'center',
                                                   height: '20px',
                                                   width: '20px',
                                                   marginTop: '15px',
                                                   marginLeft: '-20px',
                                                   color: 'rebeccapurple'
                                               }}
                                               type="radio" checked={gioiTinh === 1}
                                               value={1}
                                               name="gioiTinh"
                                               onChange={(e) =>
                                               {
                                                   setGioiTinh(parseInt(e.target.value))
                                               }}/>

                                        <label style={{
                                            textAlign: 'center',
                                            marginTop: '15px'
                                        }}>Nữ</label>
                                        <input className="radione"
                                               style={{
                                                   textAlign: 'center',
                                                   height: '20px',
                                                   width: '20px',
                                                   marginTop: '15px',
                                                   marginLeft: '-20px',
                                                   color: 'rebeccapurple'
                                               }}
                                               type="radio" checked={gioiTinh === 0}
                                               value={0}
                                               name="gioiTinh"
                                               onChange={(e) =>
                                               {
                                                   setGioiTinh(parseInt(e.target.value))
                                               }}/>
                                    </div>

                                    <TextField sx={{input: {color: '#335371'}}}
                                               label="Số Điện Thoại" variant="outlined" className="textFieldNV"
                                               InputProps={{
                                                   startAdornment: (
                                                       <InputAdornment position="start">
                                                           <ArrowRightIcon
                                                               style={{color: '#3D5E7C', marginLeft: '-10'}}/>
                                                       </InputAdornment>
                                                   ),
                                               }}
                                               value={dlBD.sdt}
                                               name='sdt'
                                               onChange={handleInputChange}
                                    />

                                    <TextField sx={{input: {color: '#335371'}}}
                                               label="Email" variant="outlined" className="textFieldNV"
                                               InputProps={{
                                                   startAdornment: (
                                                       <InputAdornment position="start">
                                                           <ArrowRightIcon
                                                               style={{color: '#3D5E7C', marginLeft: '-10'}}/>
                                                       </InputAdornment>
                                                   ),
                                               }}
                                               value={dlBD.mail}
                                               name='mail'
                                               onChange={handleInputChange}
                                    />


                                </div>

                                <div className="itemTitleNV2">

                                    <TextField sx={{input: {color: '#335371'}}}
                                               label="Nơi Sinh" variant="outlined" className="textFieldNV"
                                               InputProps={{
                                                   startAdornment: (
                                                       <InputAdornment position="start">
                                                           <ArrowRightIcon
                                                               style={{color: '#3D5E7C', marginLeft: '-10'}}/>
                                                       </InputAdornment>
                                                   ),
                                               }}
                                               value={dlBD.noiSinh}
                                               name='noiSinh'
                                               onChange={handleInputChange}
                                    />

                                    <p className="ngaysinha"> Ngày Sinh</p>
                                    <input className="ngaySinh"
                                           type="date"
                                           onChange={handleInputChange}
                                           value={dlBD.ngaySinh} name='ngaySinh'/>

                                    <TextField sx={{input: {color: '#335371'}}}
                                               label="Địa Chỉ" variant="outlined" className="textFieldNV"
                                               InputProps={{
                                                   startAdornment: (
                                                       <InputAdornment position="start">
                                                           <ArrowRightIcon
                                                               style={{color: '#3D5E7C', marginLeft: '-10'}}/>
                                                       </InputAdornment>
                                                   ),
                                               }}
                                               value={dlBD.diaChi}
                                               name='diaChi'
                                               onChange={handleInputChange}
                                    />

                                    <TextField style={{marginTop: '5px'}}
                                               sx={{input: {color: '#335371'}}}
                                               label="Căn Cước" variant="outlined" className="textFieldNV"
                                               InputProps={{
                                                   startAdornment: (
                                                       <InputAdornment position="start">
                                                           <ArrowRightIcon
                                                               style={{color: '#3D5E7C', marginLeft: '-10'}}/>
                                                       </InputAdornment>
                                                   ),
                                               }}
                                               value={dlBD.canCuoc}
                                               name='canCuoc'
                                               onChange={handleInputChange}
                                    />

                                    <p style={{marginTop: '-15px'}}
                                       className="ngaysinha"> Ngày Cấp</p>
                                    <input className="ngaySinh"
                                           type="date"
                                           onChange={handleInputChange}
                                           value={dlBD.ngayCap} name='ngayCap'/>

                                    <p style={{marginTop: '-15px'}}
                                       className="ngaysinha"> Ngày Vào Làm</p>
                                    <input className="ngaySinh"
                                           type="date"
                                           onChange={handleInputChange}
                                           value={dlBD.ngayVaoLam} name='ngayVaoLam'/>

                                </div>
                                <div className="itemTitleNV2">
                                    <TextField sx={{input: {color: '#335371'}}}
                                               label="Lương Căn Bản" variant="outlined" className="textFieldNV"
                                               InputProps={{
                                                   startAdornment: (
                                                       <InputAdornment position="start">
                                                           <ArrowRightIcon
                                                               style={{color: '#3D5E7C', marginLeft: '-10'}}/>
                                                       </InputAdornment>
                                                   ),
                                               }}
                                               value={dlBD.luongCanBan}
                                               name='luongCanBan'
                                               onChange={handleInputChange}
                                    />
                                    <TextField sx={{input: {color: '#335371'}}}
                                               id="filled-select-currency"
                                               select
                                               label="Phòng Ban"
                                               name="phongBanId"
                                               value={dlBD.phongBanId}
                                               onChange={handleInputChange}
                                               variant="outlined"
                                    >
                                        {dspb.map((option) => (
                                            <MenuItem key={option.phongBanId} value={option.phongBanId}>
                                                {option.tenPhongBan}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField sx={{input: {color: '#335371'}}}
                                               id="filled-select-currency"
                                               select
                                               label="Công Việc"
                                               name="congViecId"
                                               value={dlBD.congViecId}
                                               onChange={handleInputChange}
                                               variant="outlined"
                                    >
                                        {dscviec.map((option) => (
                                            <MenuItem key={option.congViecId} value={option.congViecId}>
                                                {option.tenCongViec}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField sx={{input: {color: '#335371'}}}
                                               id="filled-select-currency"
                                               select
                                               label="Chức Vụ"
                                               name="chucVuId"
                                               value={dlBD.chucVuId}
                                               onChange={handleInputChange}
                                               variant="outlined"
                                    >
                                        {dscvu.map((option) => (
                                            <MenuItem key={option.chucVuId} value={option.chucVuId}>
                                                {option.tenChucVu}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );


};

export default NhanVienNew;