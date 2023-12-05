import React, {useState, useEffect, useContext} from 'react';
import "./chamcongnew.scss"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import NhanVienDA from "../../components/datatable/NhanVienDA_TableNV";
import MenuItem from "@mui/material/MenuItem";
import {ChucNangContext} from "../../components/datatable/NhanVienDuAnTable";
import {InputAdornment} from "@material-ui/core";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const NhanVienDuAnNew = (props) =>
{
    let dk = useContext(ChucNangContext);
    console.log("Diều kiên là ", dk);

    const [res, setRes] = useState([]);
    const [ttcc, setTtcc] = useState([]);
    // const [dlBD, setDlBd] = useState({
    //     trangThaiChamCongId: 1,
    //     ngayChamCong: ''
    // });

    const [dlSauSua, setDlSauSua] = useState({
        trangThaiChamCong: {
            trangThaiChamCongId: 0,
            tenTrangThai: "",
            status: 0
        }
    });
    console.log('----------->', dlSauSua);

    // useEffect(async () =>
    // {
    //     const listTT = await axios('http://localhost:8080/api/');
    //     const kqListTT = listTT.data.map(items =>
    //     {
    //         return {...items}
    //     });
    //     setDlSauSua({...dlSauSua, ...dk.dlCC});
    //     setTtcc(kqListTT);

    // }, [dk]);

    const handleClose = () =>
    {
        dk.flag = false;
        props.resetFlag(dk.flag);
    };


    // const handleInputChange = (e) =>
    // {
    //     if (dk.chucnang === 1)
    //     {
    //         const {name, value} = e.target;
    //         setDlBd(
    //             {
    //                 ...dlBD, [name]: value,
    //             });
    //     } else
    //     {
    //         let giatri = e.target.value;
    //         setDlSauSua({
    //             ...dlSauSua,
    //             trangThaiChamCong: {
    //                 trangThaiChamCongId: giatri,
    //                 tenTrangThai: giatri.toString(),
    //                 status: 1
    //             },
    //         })
    //     }
    // };

    const getNvList = (listNv, listAPI) =>
    {
        console.log("Bấm ok ra là", listNv, listAPI);
        const temp = listAPI.filter(el =>
        {
            return listNv.find(element =>
            {
                return element.nhanVienId === el.nhanVienId;
            });
        });
        console.log("Đây là dữ liệu được cập nhật mỗi khi chọn:", temp);
        setRes(temp);
    }


    ///Thêm Chấm Công
    const addNVDA = () =>
    {

        console.log("Đây là dữ liệu đc chọn", res);
        axios.post(`http://localhost:8080/api/nhanvienduan/add/${props.duAnId}`, res).then(res =>
        {
            // a = Object.assign(res.data);
            if (res.data.length > 0)
            {
                props.themData(res.data);
                alert("Thêm thành công!")
            } else
            {
                alert("Thêm thất bại!!")
            }
        }).catch(err => alert(`Thêm thất bài r huhu1!! ${err}`))
    }

    ////Sửa Chấm Công
    // const suaChamCong = (dlSauSua) =>
    // {
    //     axios.put(`http://localhost:8080/api/chamcong/${dlSauSua.chamCongId}`, dlSauSua)
    //         .then(res =>
    //         {
    //             alert("Đã cập nhật chấm công này!!");
    //             props.resetData(res.data);
    //         })
    //         .catch(err => alert(`Cập nhật  thất bai!! ${err}`))
    // }


    ////Thực Thi
    const thucthi = () =>
    {
        // if (dk.chucnang === 1)
        // {
        //     // console.log("Cần kết hơp ", dlBD.trangThaiChamCongId, dlBD.ngayChamCong, res);
        //     // console.log(res);
        //     let a;
        //     if (dlBD.ngayChamCong.length > 0)
        //     {
        //         if (res.length > 0)
        //         {
        //             a = res.map(nhanVien => ({
        //                 nhanVien,
        //                 trangThaiChamCong: {
        //                     trangThaiChamCongId: dlBD.trangThaiChamCongId,
        //                     tenTrangThai: ttcc.filter(item => item.trangThaiChamCongId === dlBD.trangThaiChamCongId)[0].tenTrangThai
        //                 },
        //                 ngayChamCong: dlBD.ngayChamCong
        //             }))
        //             //addChamCong(a);
        //             //handleClose();
        //         } else
        //         {
        //             alert('Hãy chọn nhân viên chấm công!!😏😏')
        //         }
        //     } else
        //     {
        //         alert('Hãy chọn ngày chấm công 😭😭');
        //     }
        //     console.log("Kêt quả cúi cùng là ", a);
        // } else
        // {
        //     //suaChamCong(dlSauSua);
        //     //handleClose();
        // }


        console.log("them them them");
        // addChamCong(a);

    }

    // const matchTenTrangThai = (ten) =>
    // {
    //     // let tentt;
    //     switch (ten)
    //     {
    //         case '1':
    //             return "Đi làm";
    //         case '2':
    //             return "Nghỉ có phép";
    //         case '3':
    //             return "Nghỉ không phép";
    //     }
    // }

    if (dk.chucnang === 1)
    {
        return (
            <Dialog open={dk.flag} onClose={handleClose} className="dialogCC" maxWidth="xl">

                <DialogTitle className="dialogTitleCC">Danh Sách Nhân Viên</DialogTitle>

                <DialogContent className="dialogContentCC">

                    {/* <div style={{
                        display: 'flex',
                        marginTop: '10px',
                        marginBottom: '10px',
                        gap: '20px',
                        alignItems: 'center',
                        justifyContent: 'right'
                    }}>
                        <div>
                            <TextField sx={{
                                input: {color: '#335371'},
                                width: '200px',
                                height: '50px'
                            }}
                                       id="filled-select-currency"
                                       select
                                       label="Trạng Thái Chấm Công"
                                       name="trangThaiChamCongId"
                                       value={dlBD.trangThaiChamCongId}
                                       onChange={handleInputChange}
                                       variant="outlined"
                            >
                                {ttcc.map((option) => (
                                    <MenuItem key={option.trangThaiChamCongId} value={option.trangThaiChamCongId}>
                                        {matchTenTrangThai(option.tenTrangThai)}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <div>
                            <input className="ngaySinhCC"
                                   type="date"
                                   onChange={handleInputChange}
                                   value={dlBD.ngayChamCong} name='ngayChamCong'/>
                        </div>
                    </div> */}

                    <NhanVienDA duAnId={props.duAnId} getNvList={getNvList}/>

                </DialogContent>

                <DialogActions className="dichuyenBtnCC">
                    <div className="dichuyenCC">
                        <Button onClick={handleClose} className="cancelCC">Hủy</Button>
                        <Button
                            className="okCC" onClick={addNVDA}>OK</Button>
                    </div>
                </DialogActions>
            </Dialog>
        );
    }
    // else
    // {
    //     return (
    //         <Dialog open={dk.flag} onClose={handleClose} className="dialogCCSua" maxWidth="xl">

    //             <DialogTitle className="dialogTitleCCSua">Sửa thông tin Chấm Công</DialogTitle>

    //             <DialogContent className="dialogContentCCSua">

    //                 <div className="div1SuaCC">
    //                     <TextField
    //                         id="outlined-read-only-input"
    //                         label="Chấm Công ID"
    //                         InputProps={{
    //                             readOnly: true,
    //                             startAdornment: (
    //                                 <InputAdornment position="start">
    //                                     <ArrowRightIcon style={{color: '#3D5E7C', marginLeft: '-10'}}/>
    //                                 </InputAdornment>
    //                             ),
    //                         }}
    //                         value={dlSauSua.chamCongId}
    //                     />
    //                 </div>

    //                 <div className="div2SuaCC">
    //                     <TextField id="outlined-basi112c" label="Nhân Viên ID" variant="outlined"
    //                                InputProps={{
    //                                    readOnly: true,
    //                                    startAdornment: (
    //                                        <InputAdornment position="start">
    //                                            <ArrowRightIcon style={{color: '#3D5E7C', marginLeft: '-10'}}/>
    //                                        </InputAdornment>
    //                                    ),
    //                                }}
    //                                value={dlSauSua.nhanVienId}
    //                     />
    //                 </div>

    //                 <div className="div3SuaCC">
    //                     <TextField id="outlined-basi2c" label="Ngày Chấm Công" variant="outlined"
    //                                InputProps={{
    //                                    readOnly: true,
    //                                    startAdornment: (
    //                                        <InputAdornment position="start">
    //                                            <ArrowRightIcon style={{color: '#3D5E7C', marginLeft: '-10'}}/>
    //                                        </InputAdornment>
    //                                    ),
    //                                }}
    //                                value={dlSauSua.ngayChamCong}
    //                     />
    //                 </div>

    //                 <div className="div4SuaCC">
    //                     <TextField sx={{
    //                         input: {color: '#335371'},
    //                         width: '235px',
    //                         height: '50px'
    //                     }}
    //                                select
    //                                label="Trạng Thái Chấm Công"
    //                                value={dlSauSua.trangThaiChamCong.tenTrangThai}
    //                                onChange={handleInputChange}
    //                                variant="outlined"
    //                     >
    //                         {ttcc.map((option) => (
    //                             <MenuItem key={option.trangThaiChamCongId} value={option.trangThaiChamCongId}>
    //                                 {matchTenTrangThai(option.tenTrangThai)}
    //                             </MenuItem>
    //                         ))}
    //                     </TextField>
    //                 </div>
    //             </DialogContent>

    //             <DialogActions className="dichuyenBtnCCSua">
    //                 <div className="dichuyenCCSua">
    //                     <Button onClick={handleClose} className="cancelCCSua">Hủy</Button>
    //                     <Button
    //                         className="okCCSua" onClick={thucthi}>OK</Button>
    //                 </div>
    //             </DialogActions>
    //         </Dialog>
    //     );
    // }


};

export default NhanVienDuAnNew;