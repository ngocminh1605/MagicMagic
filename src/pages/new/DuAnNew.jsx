import React, {useState, useEffect} from 'react';
import "./duannew.scss"
import "./nhanviennew.scss"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {InputAdornment} from "@material-ui/core";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import axios from "axios";

const CongViecNew = (props) => {
    console.log("Dl của props", props.giatri, props.chucNang);
    let open = props.giatri.flag;
    let tenForm;
    props.chucNang === 1 ? tenForm = "Cập Nhật Dự Án" : tenForm = "Thêm Dự Án";

    const [dlBD, setDlBd] = useState(props.giatri);
    // if (props.giatri === 1)
    // {
    //     // setOpen(true);
    //     open = true;
    // }
    // setDlBd(props.giatri);
    useEffect(() => {
        return setDlBd(props.giatri);
    }, [props.giatri])

    console.log("dl của new ", dlBD);

    const handleClose = () => {
        const temp = {...props.giatri, flag: false};
        props.resetFlag(temp);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setDlBd(
            {
                ...dlBD, [name]: value,
            });
        
    };

    const thucthi = (event) => {
        event.preventDefault();
        if (props.chucNang === 1) {
            const dlmoi = {
                duAnId: props.giatri.duAnId,
                tenDuAn: dlBD.tenDuAn,
                ngayBatDau:dlBD.ngayBatDau,
                ngayKetThuc:dlBD.ngayKetThuc,
                thuongDuAn: dlBD.thuongDuAn,
                
            }
            console.log("Dl sau câp nhật", dlmoi);
            updateCV(dlmoi);
            props.resetData(dlmoi);
            handleClose();
        } else {
            alert("Them nè");
            const dlmoi = {
                tenDuAn: dlBD.tenDuAn,
                thuongDuAn: parseFloat(dlBD.thuongDuAn),
                ngayBatDau:dlBD.ngayBatDau,
                ngayKetThuc:dlBD.ngayKetThuc,
                status: 1
            }
            console.log("Dl vừa thêm", dlmoi);
            addCV(dlmoi);
            handleClose();
        }
    }

    function updateCV(cv) {
        // event.preventDefault();
        // const newCv = {...cv, status: 0};
        console.log(cv);
        axios.put(`http://localhost:8080/api/duan/${cv.duAnId}`, cv)
            .then(res => alert("Đã cập nhật công việc này!!"))
            .catch(err => alert(`Cập nhật  thất bai!! ${err}`));
    }

    const addCV = (cv) => {
        axios.post("http://localhost:8080/api/duan", cv).then(res => {
            // a = Object.assign(res.data);

            props.themData(res.data);
        }).then({}).catch(err => alert(`Thêm thất bài r huhu1!! ${err}`))
    }

    return (
        <Dialog open={open} onClose={handleClose} className="dialog" maxWidth="md">

            <DialogTitle className="dialogTitle">{tenForm} </DialogTitle>

            <DialogContent className="dialogContent">

                <form onSubmit={thucthi}>
                    

                    <div className="div2" style={props.chucNang === 1 ? {} : {marginTop: 20}}>
                        <TextField id="outlined-basi112c" label="Tên Dự Án" variant="outlined"
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <ArrowRightIcon style={{color: '#3D5E7C', marginLeft: '-10'}}/>
                                           </InputAdornment>
                                       ),
                                   }}
                                   value={dlBD.tenDuAn}
                                   name="tenDuAn"
                                   onChange={handleInputChange}
                        />
                    </div>

                    <div className="div3da">
                        <TextField id="outlined-basi2c" label="Thưởng Dự Án" variant="outlined"
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <ArrowRightIcon style={{color: '#3D5E7C', marginLeft: '-10'}}/>
                                           </InputAdornment>
                                       ),
                                   }}
                                   value={dlBD.thuongDuAn}
                                   name="thuongDuAn"
                                   onChange={handleInputChange}
                        />
                    </div>

                    <div className="div3da">
                    <p style={{marginTop: '-18px'}}> Ngày Bắt Đầu</p>
                                    <input className="ngaySinhda"
                                           type="date"
                                           onChange={handleInputChange}
                                           value={dlBD.ngayBatDau} name='ngayBatDau'/>

                    </div>
                    <div className="div3da">
                    <p style={{marginTop: '-18px'}}> Ngày Kết Thúc</p>
                                    <input className="ngaySinhda"
                                           type="date"
                                           onChange={handleInputChange}
                                           value={dlBD.ngayKetThuc} name='ngayKetThuc'/>

                    </div>
                </form>
            </DialogContent>

            <DialogActions className="dichuyenBtn">
                <div className="dichuyen">
                    <Button onClick={handleClose} className="cancel">Hủy</Button>
                    <Button onClick={thucthi}
                            className="ok">OK</Button>
                </div>
            </DialogActions>
        </Dialog>
    );


};

export default CongViecNew;