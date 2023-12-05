import React, {useState, useEffect} from 'react';
import "./nhanvien_congviec.scss"
import {DataGrid} from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import clsx from "clsx";
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import DeleteIcon from '@mui/icons-material/Delete';
// import {Link} from 'react-router-dom'


const Nhanvien_PhongBan_Table = (props) =>
{
    const columns = [
        // {
        //     field: 'phongBanId',
        //     headerName: 'Phòng Ban ID',
        //     width: 120,
        //     headerAlign: 'center',
        //     align: 'center'
        // },
        {
            field: 'nhanVienId', headerName: 'Nhân Viên ID', flex: 1, headerAlign: 'center', rowAlign: 'center',
            align: 'center'
        },
        {
            field: 'hoNhanVien', headerName: 'Họ Nhân Viên', flex: 1, headerAlign: 'center', rowAlign: 'center',
            align: 'center'
        },
        {
            field: 'tenNhanVien', headerName: 'Tên Nhân Viên', flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'ngayVaoLam', headerName: 'Ngày Vào Làm', flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'tenCongViec', headerName: 'Công Việc', flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'tenChucVu', headerName: 'Chức Vụ ', flex: 1, headerAlign: 'center',
            align: 'center'
        },
    ];

    const [rows, setRowData] = useState([]);

    useEffect(async () =>
    {
        // console.log("id nhân đc là ", props.id);

        const result = await axios(
            `http://localhost:8080/api/phongban/nvpb/${props.id}`);
        const rowData = result.data.map(items =>
        {
            return {
                id: items.nhanVienId,
                nhanVienId: items.nhanVienId,
                hoNhanVien: items.hoNhanVien,
                tenNhanVien: items.tenNhanVien,
                ngayVaoLam: items.ngayVaoLam,
                tenCongViec: items.congViec.tenCongViec,
                tenChucVu: items.chucVu.tenChucVu,
                // status: items.status
            }
        });
        console.log("ban dàu", rowData);
        setRowData(rowData);
        console.log("sau khi chỉnh", rows);
    }, []);


    return (
        <div className="datatable" style={{backgroundColor: 'inherit'}}>
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
        </div>
    );
};

export default Nhanvien_PhongBan_Table;