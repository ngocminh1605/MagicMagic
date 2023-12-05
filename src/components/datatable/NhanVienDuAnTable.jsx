import React, {useState, useEffect, createContext} from 'react';
import "./nhanvien_congviec.scss"
import {DataGrid} from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import clsx from "clsx";
import NhanVienDuAnNew from "../../pages/new/NhanVienDuAnNew";
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import DeleteIcon from '@mui/icons-material/Delete';
// import {Link} from 'react-router-dom'
export const ChucNangContext = createContext();

const NhanVienDuAnTable = (props) =>
{
    const [rows, setRows] = useState([]);
    // const [rows, setRows] = useState([]);
    const [dk, setDk] = useState({
        flag: false,
        chucnang: 1,
        dlDA: {}
    })
    console.log("dieu kien ban đàu", dk);

    const resetFlag = (value) =>
    {
        setDk({...dk, flag: value});
    }

    ////Xóa  nhân viên trong dự án
    const xoaNVDuAn = (da) =>
    {
        delete da.id;
        console.log(da);

        const result = axios.put(
            `http://localhost:8080/api/nhanvienduan/remove/${props.id}`, da).then(res =>
        {
            const newRows = rows.filter((a) =>
            {
                if (a.nhanVienId === da.nhanVienId)
                {
                    return false;
                }
                return true;
            });
            console.log("Dl mới là ", newRows);
            setRows(newRows);
            alert("Xóa nhân viên thành công")
        }).catch(err => alert("Xóa nhân viên thất bại"))


    }

    const columns = [
        {
            field: 'nhanVienId',
            headerName: 'Nhân Viên ID',
            width: 120,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'hoNhanVien', headerName: 'Họ Nhân Viên', width: 150, headerAlign: 'center', rowAlign: 'center',
            align: 'center'
        },
        {
            field: 'tenNhanVien', headerName: 'Tên Nhân Viên', width: 150, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'ngayVaoLam', headerName: 'Ngày Vào Làm', width: 180, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'tenPhongBan', headerName: 'Phòng Ban', width: 180, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'tenChucVu', headerName: 'Chức Vụ ', width: 180, headerAlign: 'center',
            align: 'center'
        }, {
            field: 'control', headerName: 'Chức năng', minWidth: 150, flex: 1, headerAlign: 'center',
            align: 'center',
            renderCell: (params) =>
            {
                return (
                    <div className="cellAction">
                        <Button className="delete" onClick={() =>
                        {
                            return xoaNVDuAn(params.row)
                        }}>Xóa</Button>
                    </div>
                );
            },
        }
        // {
        //     field: 'status', headerName: 'Trạng Thái', width: 180, headerAlign: 'center',
        //     align: 'center'
        // },
    ];


    useEffect(async () =>
    {
        // console.log("id nhân đc là ", props.id);

        const result = await axios(
            `http://localhost:8080/api/nhanvienduan/${props.id}`);
        // const rowData = result.data.map(items =>
        // {
        //     return {
        //         id: items.nhanVienId,
        //         nhanVienId: items.nhanVienId,
        //         hoNhanVien: items.hoNhanVien,
        //         tenNhanVien: items.tenNhanVien,
        //         ngayVaoLam: items.ngayVaoLam,
        //         tenPhongBan: items.phongBan.tenPhongBan,
        //         tenChucVu: items.chucVu.tenChucVu,
        //         // status: items.status
        //     }
        // });
        // console.log("ban dàu", rowData);
        setRows(result.data.map(items =>
        {
            return {
                id: items.nhanVienId,
                nhanVienId: items.nhanVienId,
                hoNhanVien: items.hoNhanVien,
                tenNhanVien: items.tenNhanVien,
                ngayVaoLam: items.ngayVaoLam,
                tenPhongBan: items.phongBan.tenPhongBan,
                tenChucVu: items.chucVu.tenChucVu,
                // status: items.status
            }
        }));
        console.log("sau khi chỉnh", rows);
    }, []);

    const themChamCong = () =>
    {
        setDk({
            ...dk,
            flag: true,
            chucnang: 1
        })
    }

    const themData = (dlMoi) =>
    {
        let rowData = dlMoi.map(items =>
        {
            return {
                id: items.nhanVienId,
                nhanVienId: items.nhanVienId,
                hoNhanVien: items.hoNhanVien,
                tenNhanVien: items.tenNhanVien,
                ngayVaoLam: items.ngayVaoLam,
                tenPhongBan: items.phongBan.tenPhongBan,
                tenChucVu: items.chucVu.tenChucVu,
            }
        });
        setRows((preState) => [...preState, ...rowData])
        console.log("------------->", rows);
    }

    const resetData = (dlmoi) =>
    {
        // let temp = rows.findIndex((obj => obj.chamCongId === dlmoi.chamCongId));
        // console.log("Trước update!!: ", rows[temp]);
        // rows[temp].tenTrangThai = matchTenTrangThai(dlmoi.trangThaiChamCong.tenTrangThai);
        // console.log("SAu update: ", rows[temp])
        // setRows(rows);
    }

    return (
        <div className="datatable" style={{backgroundColor: 'inherit'}}>
            <div className="addNew">
                {/*<Link to="/congviec/new" style={{textDecoration: "none"}}>*/}
                {/*</Link>*/}
                <Button className="link" onClick={themChamCong}>Thêm</Button>
            </div>
            <DataGrid className="chinhmau"
                      rows={rows}
                      columns={columns}
                      pageSize={9}
                      rowsPerPageOptions={[100]}
                      isRowSelectable={() => false}
                      disableSelectionOnClick={true}
                      sx={{
                          boxShadow: 2,

                          "& .MuiDataGrid-columnHeaders": {
                              backgroundColor: '#09203f',
                              backgroundImage: 'linear-gradient(250deg, #537895 15%, #32516F 60%)',
                              fontSize: 16,
                              color: '#ffffff',
                              borderRadius: 2
                          },

                          "& .MuiDataGrid-row": {
                              color: '#32516F',
                              fontWeight: 'bold',
                              fontSize: 16,

                              "&:nth-of-type(n)": {
                                  backgroundColor: 'white',
                                  "&:hover": {
                                      backgroundColor: 'rgba(184,198,219,0.87)'
                                  }
                              },
                              "&:nth-of-type(2n)": {
                                  backgroundColor: 'rgba(215,222,238,0.47)',
                                  "&:hover": {
                                      backgroundColor: 'rgba(184,198,219,0.87)'
                                  }
                              }
                          }
                      }}
            />
            <ChucNangContext.Provider value={dk}>
                <NhanVienDuAnNew duAnId={props.id} resetFlag={resetFlag} themData={themData} resetData={resetData}/>
            </ChucNangContext.Provider>
        </div>
    );
};

export default NhanVienDuAnTable;