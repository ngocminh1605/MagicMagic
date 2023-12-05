import React, {useState, useEffect} from 'react';
import "./congviecnew.scss"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {InputAdornment} from "@material-ui/core";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import axios from "axios";

const CongViecNew = (props) => {
    console.log("Dl của props", props.giatri, props.chucNang);
    let open = props.giatri.flag;
    let tenForm;
    props.chucNang === 1 ? tenForm = "Cập Nhật Công Việc" : tenForm = "Thêm Công Việc";

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
                congViecId: dlBD.congViecId,
                tenCongViec: dlBD.tenCongViec,
                heSoCongViec: dlBD.heSoCongViec,
                status: dlBD.status
            }
            console.log("Dl sau câp nhật", dlmoi);
            updateCV(dlmoi);
            props.resetData(dlmoi);
            handleClose();
        } else {
            alert("Them nè");
            const dlmoi = {
                tenCongViec: dlBD.tenCongViec,
                heSoCongViec: parseFloat(dlBD.heSoCongViec),
                status: 1
            }
            console.log("Dl vừa thêm", dlmoi);
            addCV(dlmoi);
            handleClose();
        }
    }

    const updateCV = (cv) => {
        // event.preventDefault();
        // const newCv = {...cv, status: 0};
        axios.put(`http://localhost:8080/api/congviec/${cv.congViecId}`, cv)
            .then(res => alert("Đã cập nhật công việc này!!"))
            .catch(err => alert(`Cập nhật  thất bai!! ${err}`))
    }

    const addCV = (cv) => {
        axios.post("http://localhost:8080/api/congviec", cv).then(res => {
            // a = Object.assign(res.data);
            props.themData(res.data);
        }).then({}).catch(err => alert(`Thêm thất bài r huhu1!! ${err}`))
    }

    return (
        <Dialog open={open} onClose={handleClose} className="dialog" maxWidth="md">

            <DialogTitle className="dialogTitle">{tenForm} </DialogTitle>

            <DialogContent className="dialogContent">

                <form onSubmit={thucthi}>
                    <div className="div1" hidden={props.chucNang === 1 ? false : true}>
                        <TextField
                            id="outlined-read-only-input"
                            label="ID Công Việc"
                            InputProps={{
                                readOnly: true,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ArrowRightIcon style={{color: '#3D5E7C', marginLeft: '-10'}}/>
                                    </InputAdornment>
                                ),
                            }}
                            value={dlBD.congViecId}
                            name="congViecId"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="div2" style={props.chucNang === 1 ? {} : {marginTop: 20}}>
                        <TextField id="outlined-basi112c" label="Tên Công Việc" variant="outlined"
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <ArrowRightIcon style={{color: '#3D5E7C', marginLeft: '-10'}}/>
                                           </InputAdornment>
                                       ),
                                   }}
                                   value={dlBD.tenCongViec}
                                   name="tenCongViec"
                                   onChange={handleInputChange}
                        />
                    </div>

                    <div className="div3">
                        <TextField id="outlined-basi2c" label="Hệ Số Công Việc" variant="outlined"
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <ArrowRightIcon style={{color: '#3D5E7C', marginLeft: '-10'}}/>
                                           </InputAdornment>
                                       ),
                                   }}
                                   name="heSoCongViec"
                                   value={dlBD.heSoCongViec}
                                //    name="heSoCongViec"
                                   onChange={handleInputChange}
                        />
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