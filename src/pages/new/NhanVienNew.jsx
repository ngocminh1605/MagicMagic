// import React, { useState, useEffect } from 'react';
// import "./nhanviennew.scss"
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
// import { useLocation } from "react-router-dom";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
// // import { InputAdornment } from "@material-ui/core";
// import MenuItem from '@mui/material/MenuItem';
// import AddIcon from '@mui/icons-material/Add';
// import FileUploadIcon from '@mui/icons-material/FileUpload';
// import nv4 from '../images/nv4.jpg';

// const NhanVienNew = () => {




//     return (
//         <div className="singleNV">
//             <Sidebar />
//             <div className="singleContainerNV">
//                 <Navbar />
//                 <div className="topNV">
//                     <div className="leftNV">
//                         <h1 className="titleNV"></h1>

//                         <div>
//                             <Button variant="text" className="editBtnNV"
//                                 style={{ maxWidth: "50px", maxHeight: "50px", minWidth: "30px", minHeight: "30px" }}
//                             >
//                             </Button>
//                         </div>

//                         <div className="itemNV">

//                             <div style={{
//                                 display: 'flex',
//                                 flexFlow: 'column',
//                                 alignItems: 'center',
//                                 gap: '20px'
//                             }}>
//                                 <img
//                                     alt="Nhân ziên này chưa có avartar" className="itemImgNV" />

//                                 <Button
//                                     style={{
//                                         maxWidth: "50px",
//                                         maxHeight: "50px",
//                                         minWidth: "30px",
//                                         minHeight: "30px"
//                                     }}
//                                     className="chonHinhAnh">
//                                     <FileUploadIcon />
//                                 </Button>
//                                 <input id="layHinhAnh"
//                                     style={{ display: 'none' }}
//                                     type="file" name="image-upload" accept="image/*" />
//                             </div>

//                             <div className="detailsNV">
//                                 <div className="itemTitleNV1">

//                                     <div >
//                                         <TextField
//                                             sx={{ input: { color: '#335371' } }}
//                                             id="outlined-read-only-input"
//                                             label="Nhân Viên ID"
//                                             InputProps={{
//                                                 readOnly: true,
//                                                 // startAdornment: (
//                                                 //     <InputAdornment position="start">
//                                                 //         <ArrowRightIcon
//                                                 //             style={{ color: '#3D5E7C', marginLeft: '-10' }} />
//                                                 //     </InputAdornment>
//                                                 // ),
//                                             }}
//                                             name="nhanVienId"
//                                         />
//                                     </div>

//                                     <TextField sx={{ input: { color: '#335371' } }}
//                                         label="Họ Nhân Viên" variant="outlined"
//                                         InputProps={{
//                                             // startAdornment: (
//                                             //     <InputAdornment position="start">
//                                             //         <ArrowRightIcon
//                                             //             style={{ color: '#3D5E7C', marginLeft: '-10' }} />
//                                             //     </InputAdornment>
//                                             // ),

//                                         }}
//                                         name='hoNhanVien'
//                                     />

//                                     <TextField sx={{ input: { color: '#335371' } }}
//                                         label="Tên Nhân Viên" variant="outlined" className="textFieldNV"
//                                         InputProps={{
//                                             startAdornment: (
//                                                 // <InputAdornment position="start">
//                                                 //     <ArrowRightIcon
//                                                 //         style={{ color: '#3D5E7C', marginLeft: '-10' }} />
//                                                 // </InputAdornment>
//                                             ),
//                                         }}
//                                         name='tenNhanVien'
//                                     />

//                                     <p className="gioitinha"> Giới Tính</p>
//                                     <div className="gioitinh">
//                                         <label style={{
//                                             textAlign: 'center',
//                                             marginTop: '15px'
//                                         }}>Nam</label>
//                                         <input className="radione"
//                                             style={{
//                                                 textAlign: 'center',
//                                                 height: '20px',
//                                                 width: '20px',
//                                                 marginTop: '15px',
//                                                 marginLeft: '-20px',
//                                                 color: 'rebeccapurple'
//                                             }}
//                                             type="radio" 
//                                             name="gioiTinh"
//                                              />

//                                         <label style={{
//                                             textAlign: 'center',
//                                             marginTop: '15px'
//                                         }}>Nữ</label>
//                                         <input className="radione"
//                                             style={{
//                                                 textAlign: 'center',
//                                                 height: '20px',
//                                                 width: '20px',
//                                                 marginTop: '15px',
//                                                 marginLeft: '-20px',
//                                                 color: 'rebeccapurple'
//                                             }}
//                                             value={0}
//                                             name="gioiTinh"
                                            
//                                             />
//                                     </div>

//                                     <TextField sx={{ input: { color: '#335371' } }}
//                                         label="Số Điện Thoại" variant="outlined" className="textFieldNV"
//                                         InputProps={{
//                                             // startAdornment: (
//                                             //     <InputAdornment position="start">
//                                             //         <ArrowRightIcon
//                                             //             style={{ color: '#3D5E7C', marginLeft: '-10' }} />
//                                             //     </InputAdornment>
//                                             // ),
//                                         }}
//                                         name='sdt'
//                                     />

//                                     <TextField sx={{ input: { color: '#335371' } }}
//                                         label="Email" variant="outlined" className="textFieldNV"
//                                         InputProps={{
//                                             // startAdornment: (
//                                             //     <InputAdornment position="start">
//                                             //         <ArrowRightIcon
//                                             //             style={{ color: '#3D5E7C', marginLeft: '-10' }} />
//                                             //     </InputAdornment>
//                                             // ),
//                                         }}
//                                         name='mail'
//                                     />


//                                 </div>

//                                 <div className="itemTitleNV2">

//                                     <TextField sx={{ input: { color: '#335371' } }}
//                                         label="Nơi Sinh" variant="outlined" className="textFieldNV"
//                                         InputProps={{
//                                             // startAdornment: (
//                                             //     <InputAdornment position="start">
//                                             //         <ArrowRightIcon
//                                             //             style={{ color: '#3D5E7C', marginLeft: '-10' }} />
//                                             //     </InputAdornment>
//                                             // ),
//                                         }}
//                                         name='noiSinh'
//                                     />

//                                     <p className="ngaysinha"> Ngày Sinh</p>
//                                     <input className="ngaySinh"
//                                         type="date"/>

//                                     <TextField sx={{ input: { color: '#335371' } }}
//                                         label="Địa Chỉ" variant="outlined" className="textFieldNV"
//                                         InputProps={{
//                                             // startAdornment: (
//                                             //     <InputAdornment position="start">
//                                             //         <ArrowRightIcon
//                                             //             style={{ color: '#3D5E7C', marginLeft: '-10' }} />
//                                             //     </InputAdornment>
//                                             // ),
//                                         }}
//                                         name='diaChi'
//                                     />

//                                     <TextField style={{ marginTop: '5px' }}
//                                         sx={{ input: { color: '#335371' } }}
//                                         label="Căn Cước" variant="outlined" className="textFieldNV"
//                                         InputProps={{
//                                             // startAdornment: (
//                                             //     <InputAdornment position="start">
//                                             //         <ArrowRightIcon
//                                             //             style={{ color: '#3D5E7C', marginLeft: '-10' }} />
//                                             //     </InputAdornment>
//                                             // ),
//                                         }}
//                                         name='canCuoc'
//                                     />

//                                     <p style={{ marginTop: '-15px' }}
//                                         className="ngaysinha"> Ngày Cấp</p>
//                                     <input className="ngaySinh"
//                                         type="date"
//                                          name='ngayCap' />

//                                     <p style={{ marginTop: '-15px' }}
//                                         className="ngaysinha"> Ngày Vào Làm</p>
//                                     <input className="ngaySinh"
//                                         type="date"
//                                         name='ngayVaoLam' />

//                                 </div>
//                                 <div className="itemTitleNV2">
//                                     <TextField sx={{ input: { color: '#335371' } }}
//                                         label="Lương Căn Bản" variant="outlined" className="textFieldNV"
//                                         InputProps={{
//                                             // startAdornment: (
//                                             //     <InputAdornment position="start">
//                                             //         <ArrowRightIcon
//                                             //             style={{ color: '#3D5E7C', marginLeft: '-10' }} />
//                                             //     </InputAdornment>
//                                             // ),
//                                         }}
//                                         name='luongCanBan'
//                                     />
//                                     <TextField sx={{ input: { color: '#335371' } }}
//                                         id="filled-select-currency"
//                                         select
//                                         label="Phòng Ban"
//                                         name="phongBanId"
//                                         variant="outlined"
//                                     >
                                       
//                                     </TextField>

//                                     <TextField sx={{ input: { color: '#335371' } }}
//                                         id="filled-select-currency"
//                                         select
//                                         label="Công Việc"
//                                         name="congViecId"
//                                         variant="outlined"
//                                     >
                                        
//                                     </TextField>

//                                     <TextField sx={{ input: { color: '#335371' } }}
//                                         id="filled-select-currency"
//                                         select
//                                         label="Chức Vụ"
//                                         name="chucVuId"
//                                         variant="outlined"
//                                     >
                                        
//                                     </TextField>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );


// };

// export default NhanVienNew;