import React, {useState, useEffect, useRef} from 'react';
import "./nhanvien_chamcong.scss"
import {DataGrid} from '@mui/x-data-grid';
import axios from 'axios';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import DeleteIcon from '@mui/icons-material/Delete';
// import {Link} from 'react-router-dom'


const Nhanvien_CongViec_Table = (props) =>
{

    const [listAPI, setListAPI] = useState([]);
    const [rows, setRowData] = useState([]);
    const columns = [
        {
            field: 'nhanVienId',
            headerName: 'Nhân Viên ID',
            minWidth: 120,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'hoNhanVien', headerName: 'Họ Nhân Viên', minWidth: 150, flex: 1, headerAlign: 'center', rowAlign: 'center',
            align: 'center'
        },
        {
            field: 'tenNhanVien', headerName: 'Tên Nhân Viên', minWidth: 150, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'tenPhongBan', headerName: 'Phòng Ban', minWidth: 180, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'tenChucVu', headerName: 'Chức Vụ ', minWidth: 180, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'tenCongViec', headerName: 'Công Việc ', minWidth: 180, headerAlign: 'center',
            align: 'center'
        },
    ];

    console.log("DS ", listAPI, rows);

    useEffect(async () =>
    {
        // console.log("id nhân đc là ", props.id);

        const result = await axios(
            `http://localhost:8080/api/nhanvien`);
        const rowData = result.data.map(items =>
        {
            return {
                id: items.nhanVienId,
                nhanVienId: items.nhanVienId,
                hoNhanVien: items.hoNhanVien,
                tenNhanVien: items.tenNhanVien,
                tenPhongBan: items.phongBan.tenPhongBan,
                tenChucVu: items.chucVu.tenChucVu,
                tenCongViec: items.congViec.tenCongViec,
            }
        });
        setListAPI(result.data);
        setRowData(rowData);
    }, []);


    return (
        <div className="datatableCC">
            <DataGrid className="chinhmauCCNV"
                      rows={rows}
                      columns={columns}
                      pageSize={4}
                      rowsPerPageOptions={[100]}
                      // isRowSelectable={() => true}
                      // isRowSelected={false}
                      disableSelectionOnClick={true}
                      checkboxSelection
                      onSelectionModelChange={(ids) =>
                      {
                          const selectedIDs = new Set(ids);
                          const selectedRows = rows.filter((row) =>
                              selectedIDs.has(row.id),
                          );
                          props.getNvList(selectedRows, listAPI);
                      }}
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

export default Nhanvien_CongViec_Table;